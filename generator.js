import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetch } from 'undici';
import { createRequire } from 'module';

// Get current directory (ESM equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const IONIC_CORE_JSON = 'https://unpkg.com/@ionic/docs/core.json';
const OUTPUT_DIR = path.join(__dirname, './dist');
const PACKAGE_JSON_PATH = path.join(__dirname, 'package.json');

/**
 * Ensures output directory exists
 */
async function ensureOutputDir() {
  try {
    // Make sure the main output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Also create the components subdirectory
    await fs.mkdir(path.join(OUTPUT_DIR, 'components'), { recursive: true });
  } catch (err) {
    console.error('Error creating output directories:', err);
    throw err;
  }
}

/**
 * Downloads the Ionic components definition JSON using fetch API
 * @returns {Promise<{data: Object, version: string}>} The parsed JSON data and extracted version
 */
async function downloadIonicDefinition() {
  try {
    console.log(`Fetching from: ${IONIC_CORE_JSON}`);

    const response = await fetch(IONIC_CORE_JSON, {
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`Failed to download: Status code ${response.status}`);
    }

    // Extract version from the redirected URL
    // The URL pattern is typically: https://unpkg.com/@ionic/docs@8.5.1/core.json
    const finalUrl = response.url;
    console.log(`Successfully downloaded from: ${finalUrl}`);

    // Extract version using regex
    const versionMatch = finalUrl.match(/@ionic\/docs@([^/]+)/);
    const version = versionMatch ? versionMatch[1] : null;

    if (version) {
      console.log(`Detected Ionic Docs version: ${version}`);
    } else {
      console.warn('Could not determine Ionic version from URL. Using latest.');
    }

    return {
      data: await response.json(),
      version
    };
  } catch (error) {
    console.error(`Error downloading from ${IONIC_CORE_JSON}: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Converts a component tag to pascal case (e.g., ion-button => IonButton)
 * @param {string} tag - The component tag
 * @returns {string} The pascal case name
 */
function toPascalCase(tag) {
  return tag.split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Updates package.json to set the correct Ionic version
 * @param {string} version - The version to set
 */
async function updatePackageJson(version) {
  if (!version) {
    console.log('No version provided, skipping package.json update.');
    return;
  }

  try {
    console.log(`Updating package.json with Ionic version ${version}...`);

    // Check if package.json exists
    let packageJson;
    try {
      const packageJsonContent = await fs.readFile(PACKAGE_JSON_PATH, 'utf8');
      packageJson = JSON.parse(packageJsonContent);
    } catch (err) {
      // If package.json doesn't exist or can't be parsed, create a new one
      console.log('Creating new package.json file...');
      packageJson = {
        name: "ionic-web-components",
        version: "1.0.0",
        description: "Web Component wrappers for Ionic UI components",
        type: "module",
        dependencies: {},
        peerDependencies: {}
      };
    }

    // Update dependencies and peerDependencies
    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.peerDependencies = packageJson.peerDependencies || {};

    packageJson.dependencies['@ionic/core'] = `^${version}`;
    packageJson.peerDependencies['@ionic/core'] = `^${version}`;

    // Write updated package.json
    await fs.writeFile(
      PACKAGE_JSON_PATH,
      JSON.stringify(packageJson, null, 2),
      'utf8'
    );
    console.log('package.json updated successfully.');

  } catch (err) {
    console.error('Error updating package.json:', err.message);
  }
}

/**
 * Generates individual component files
 * @param {Array} components - The component definitions
 */
async function generateComponentFiles(components) {
  console.log('Generating individual component files...');

  for (const component of components) {
    const componentTag = component.tag;
    const jsFileName = path.join(OUTPUT_DIR, 'components', `${componentTag}.js`);

    // Create component directory if it doesn't exist
    await fs.mkdir(path.dirname(jsFileName), { recursive: true });

    let componentCode = `// Import and define ${componentTag}\n`;
    componentCode += `import { defineCustomElement } from '@ionic/core/components/${componentTag}.js';\n\n`;

    // Add JSDoc comment with component description if available
    if (component.docs) {
      componentCode += `/**\n * ${component.docs}\n */\n`;
    }

    componentCode += `// Initialize the component\ndefineCustomElement();\n`;

    // Write this component to its own file
    await fs.writeFile(jsFileName, componentCode);
  }

  // Create an "all.js" file that imports all components
  let allImports = `// Import all Ionic components\n`;
  components.forEach(component => {
    allImports += `import './components/${component.tag}.js';\n`;
  });

  await fs.writeFile(path.join(OUTPUT_DIR, 'all.js'), allImports);
  console.log('Generated all.js with imports for all components');
}

/**
 * Generates the main index.js file with initialization function
 * @returns {string} JavaScript code for index.js
 */
async function generateIndexFile() {
  let indexCode = `// Ionic Web Components main entry point\n\n`;

  // Import required CSS files
  indexCode += `// Import Ionic core CSS\n`;
  indexCode += `import '@ionic/core/css/core.css';\n`;
  indexCode += `import '@ionic/core/css/normalize.css';\n`;
  indexCode += `import '@ionic/core/css/structure.css';\n`;
  indexCode += `import '@ionic/core/css/typography.css';\n\n`;

  // Add theme CSS imports
  indexCode += `// Optional theme CSS\n`;
  indexCode += `import '@ionic/core/css/padding.css';\n`;
  indexCode += `import '@ionic/core/css/float-elements.css';\n`;
  indexCode += `import '@ionic/core/css/text-alignment.css';\n`;
  indexCode += `import '@ionic/core/css/text-transformation.css';\n`;
  indexCode += `import '@ionic/core/css/flex-utils.css';\n`;
  indexCode += `import '@ionic/core/css/display.css';\n\n`;

  // import Ionic initialize function
  indexCode += `import { initialize as ionicInit } from "@ionic/core/components";\n\n`;

  // Export initialize function
  indexCode += `export function initialize(config) {\n`;
  indexCode += `  ionicInit(config)\n`;
  indexCode += `\n`;
  indexCode += `  if (typeof document !== "undefined") {\n`;
  indexCode += `    document.documentElement.classList.add("ion-ce");\n`;
  indexCode += `  }\n`;
  indexCode += `}\n\n`;

  await fs.writeFile(path.join(OUTPUT_DIR, 'index.js'), indexCode);

  console.log('Generated index.js with initialization function');

  return indexCode;
}

/**
 * Generates TypeScript definition file for index.js
 * @returns {string} TypeScript definition content
 */
async function generateIndexDefs() {
  let indexDefs = `// Type definitions for Ionic Web Components\n\n`;

  indexDefs += `export { initialize } from "@ionic/core/components";\n`;

  await fs.writeFile(path.join(OUTPUT_DIR, 'index.d.ts'), indexDefs);

  console.log('Generated index.d.ts with initialization function types');
}

/**
 * Main function to process the Ionic components and generate files
 */
async function main() {
  try {
    await ensureOutputDir();

    console.log('Downloading Ionic components definition...');
    const { data: ionicDef, version } = await downloadIonicDefinition();

    console.log(`Found ${ionicDef.components.length} components to process`);

    // Generate individual component files
    await generateComponentFiles(ionicDef.components);

    // Generate the main index.js file
    await generateIndexFile();

    // Generate TypeScript definitions
    await generateIndexDefs();

    // Update root package.json with the detected version
    await updatePackageJson(version);

    console.log('\nSuccessfully generated tree-shakeable components for Ionic web components!');
    console.log(`Output directory: ${path.resolve(OUTPUT_DIR)}`);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the main function
main();

// todo - using https://unpkg.com/@ionic/docs@6.3.8/core.json
// todo - using https://unpkg.com/@ionic/docs@6.4.2/core.json
// todo - using https://unpkg.com/@ionic/docs@6.5.3/core.json

// using https://unpkg.com/@ionic/docs@6.6.0/core.json
// using https://unpkg.com/@ionic/docs@7.0.2/core.json
// using https://unpkg.com/@ionic/docs@7.0.3/core.json
// using https://unpkg.com/@ionic/docs@8.2.2/core.json
// using https://unpkg.com/@ionic/docs@8.5.2/core.json

const fs = require("fs");
const https = require("https");

const kebabize = (str) => {
  return str
    .split("")
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? "-" : ""}${letter.toLowerCase()}`
        : letter;
    })
    .join("");
};

function toPascalCase(text) {
  return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

function clearAndUpper(text) {
  return text.replace(/-/, "").toUpperCase();
}

const doStuff = () => {
  // load static
  const coreJson = require("./core.json");

  var dir = "./generated";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const { components } = coreJson;

  console.log("Component count", components.length);

  let typingOutput = "";
  let baseTemplate = `
  // Generated by scripts/generator.js
  // https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error
 
  /* eslint-disable */
  /* tslint:disable */
  import type { HTMLAttributes } from 'svelte/elements';
  import type { AccordionGroupChangeEventDetail, ActionSheetButton, AlertButton, AlertInput, BreadcrumbCollapsedClickEventDetail, CheckboxChangeEventDetail, ComponentProps, DatetimeChangeEventDetail, InputChangeEventDetail, InputInputEventDetail, ItemReorderEventDetail, ModalBreakpointChangeEventDetail, NavComponent, NavComponentWithProps, NavOptions, OverlayEventDetail, PickerButton, PickerColumn, RadioGroupChangeEventDetail, RangeChangeEventDetail, RangeKnobMoveEndEventDetail, RangeKnobMoveStartEventDetail, RefresherEventDetail, RouterEventDetail, ScrollBaseDetail, ScrollDetail, SearchbarChangeEventDetail, SearchbarInputEventDetail, SegmentChangeEventDetail, SelectChangeEventDetail, TextareaChangeEventDetail, TextareaInputEventDetail, ToastButton, ToggleChangeEventDetail, TransitionDoneFn, ViewController } from "@ionic/core";
  import type { DatetimeHighlight, IonicConfig, IonicSafeString } from "@ionic/core";
  import { SvelteComponent } from 'svelte';
  import { DatetimeHighlightStyle } from '@ionic/core/dist/types/components/datetime/datetime-interface';
  
  export function setupIonicSvelte(config?: IonicConfig);
  export function setupIonicBase(config?: IonicConfig);
  export function registerMenu(menuId: string);
  export function createNavPageFromSvelte(
    component: new (...args: any) => SvelteComponent,
    componentProps: {}
  )
 
  export { default as IonTabs } from "./components/IonTabs.svelte";
  // export { default as IonTabsLegacy } from "./components/IonTabsLegacy.svelte";
  export { default as IonPage } from "./components/IonPage.svelte";
  export { default as IonNav } from "./components/IonNav.svelte";

  // thank you ChatGPT!
export const navController: {
  canGoBack: (view?: ViewController) => boolean | undefined;
  getActive: () => ViewController | undefined;
  getByIndex: (index: number) => ViewController | undefined;
  getPrevious: (view?: ViewController) => ViewController | undefined;
  insert: <T extends NavComponent>(insertIndex: number, component: T, componentProps?: ComponentProps<T> | null, opts?: NavOptions | null, done?: TransitionDoneFn) => Promise<boolean> | undefined;
  insertPages: (insertIndex: number, insertComponents: NavComponent[] | NavComponentWithProps[], opts?: NavOptions | null, done?: TransitionDoneFn) => Promise<boolean> | undefined;
  pop: (opts?: NavOptions | null, done?: TransitionDoneFn) => Promise<boolean> | undefined;
  popTo: (indexOrViewCtrl: number | ViewController, opts?: NavOptions | null, done?: TransitionDoneFn) => Promise<boolean> | undefined;
  popToRoot: (opts?: NavOptions | null, done?: TransitionDoneFn) => Promise<boolean> | undefined;
  push: <T extends NavComponent>(component: T, componentProps?: ComponentProps<T>, opts?: NavOptions, done?: TransitionDoneFn) => Promise<boolean> | undefined;
  removeIndex: (startIndex: number, removeCount?: number, opts?: NavOptions | null, done?: TransitionDoneFn) => Promise<boolean> | undefined;
  setPages: (views: NavComponent[] | NavComponentWithProps[], opts?: NavOptions | null, done?: TransitionDoneFn) => Promise<boolean> | undefined;
  setRoot: <T extends NavComponent>(component: T, componentProps?: ComponentProps<T>, opts?: NavOptions, done?: TransitionDoneFn) => Promise<boolean> | undefined;
}

// we overload (modalcontroller and popovercontroller) from ionic-core with same types, so let's mirror these
export {
  modalController, popoverController, actionSheetController,
  alertController,
  loadingController,
  menuController,
  pickerController,
  toastController
} from "@ionic/core";

// platforms
declare const PLATFORMS_MAP: {
  [key: string]: boolean;
};

declare type Platforms = keyof typeof PLATFORMS_MAP;

export function getPlatforms(win?: any): string[];
export function setupPlatforms(win: any);

interface IsPlatformSignature {
  (plt: Platforms): boolean;
  (win: Window, plt: Platforms): boolean;
}
export function isPlatform(
  winOrPlatform: Window | Platforms | undefined,
  platform?: Platforms
): IsPlatformSignature;

export function testUserAgent(win: Window, expr: RegExp);


  // not exported by @ionic/core
  export type NavigationHookResult = boolean | NavigationHookOptions;
  export interface NavigationHookOptions {
    redirect: string;
 }
  export interface HTMLBaseAttributes extends HTMLAttributes<HTMLBaseElement> {
  }
  
  declare global {

    namespace svelteHTML {
   
    <COMPONENTTYPES>

      interface IntrinsicElements {
      <COMPONENTDECLARATIONS>
      }
    }
  }     
  `;

  //
  // PART 1 - Typings file
  //
  let componentTypes = ``;
  let componentDeclarations = "";

  components
    //  .filter(component => component.tag == 'ion-button')
    .forEach((component) => {
      const { props, events, tag } = component;

      const tagWithoutIon = component.tag.replace("ion-", "");
      const tagAsPascal = toPascalCase(component.tag);

      // pre-amble of this tag
      console.log("Processing ", component.tag, toPascalCase(component.tag));
      componentDeclarations =
        componentDeclarations +
        `'${component.tag}': ${tagAsPascal} & HTMLBaseAttributes; \n`;
      /**
       * ${component.tag}
       * More info: https://ionicframework.com/docs/api/${tagWithoutIon}
       */

      // slots support
      componentTypes = componentTypes + `interface ${tagAsPascal} {\n`; //  extends EventTarget

      // let's dump the props
      // console.log('has props', props);
      props.forEach((prop) => {
        //   "disabled"?: boolean;
        componentTypes =
          componentTypes +
          `
          /**
          * ${prop.docs.replace(/\n/g, " ")}
          * API info: https://ionicframework.com/docs/api/${tagWithoutIon}#${prop.name.toLowerCase()}
          */
          "${kebabize(prop.name)}"?: ${prop.type};
        `;
      });

      // let's dump the events
      // console.log('has props', events);
      events.forEach((event) => {
        //     "on:ionSlideReachEnd"?: () => void;

        const htmlElementType = "HTML" + toPascalCase(tag) + "Element";

        const entryToAdd =
          event.detail !== "void"
            ? `
        /**
        * (event : ${event.detail}) => void :  ${event.docs.replace(/\n/g, " ")}
        */
        "on:${event.event}"?: (event : CustomEvent<${
                event.detail
              }> & { target: ${htmlElementType} } ) => void;
      `
            : `
      /**
      * () => void :  ${event.docs.replace(/\n/g, " ")}
      */
      "on:${event.event}"?: () => void;
    `;
        componentTypes = componentTypes + entryToAdd;
      });

      // close definition
      componentTypes = componentTypes + `\n}\n\n`;
    });

  // generate final template
  typingOutput = baseTemplate
    .replace("<COMPONENTTYPES>", componentTypes)
    .replace("<COMPONENTDECLARATIONS>", componentDeclarations);

  // console.log('Typings output', typingOutput)

  fs.writeFile("../index.d.ts", typingOutput, function (err) {
    if (err) return console.log(err);
  });

  //
  // PART 2 - Code splitted imports
  //
  // create the module imports
  let allImportsCode = ``;
  components
    // .filter(component => component.tag == 'ion-input')
    .forEach((component) => {
      const { tag } = component;
      const componentCode = `import { defineCustomElement } from '@ionic/core/components/${tag}';\ndefineCustomElement();`;

      allImportsCode =
        allImportsCode + `import 'ionic-svelte/components/${tag}';\n`;

      fs.writeFile(`../components/${tag}.js`, componentCode, function (err) {
        if (err) return console.log(err);
      });
    });

  // all code imports
  fs.writeFile(`../components/all.js`, allImportsCode, function (err) {
    if (err) return console.log(err);
  });
};

function download(res) {
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });
  res.on("end", () => {
    fs.writeFile(file, data, (err) => {
      if (err) throw err;
      console.log(`File saved as ${file} - length ${data.length}`);
      doStuff();
    });
  });
}

function extractVersion(url) {
  const regex = /@(\d+\.\d+\.\d+)/;
  const match = url.match(regex);

  if (match) {
    const version = match[1];
    // console.log(version); // Output: "7.0.3"
    return version;
  } else {
    console.log("No version number found");
    return "ERROR";
  }
}

function bumpPackageJson(version) {
  const currentDirectory = process.cwd();

  if (currentDirectory.includes("script")) {
    console.log(
      "Current directory contains the word 'script' - that is how we want it"
    );
  } else {
    console.log(
      "Current directory does not contain the word 'script' - aborting"
    );
    process.exit();
  }

  const filePath = "../package.json";
  const packageName = "ionic-svelte";

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) throw err;

    // make backup
    fs.writeFile(filePath + ".bak", data, "utf-8", (err) => {
      if (err) throw err;
      console.log(`Backup created of ${filePath}`);
    });

    const packageJson = JSON.parse(data);

    if (packageJson.dependencies && packageJson.dependencies[packageName]) {
      packageJson.dependencies[packageName] = version;
    } else if (
      packageJson.devDependencies &&
      packageJson.devDependencies[packageName]
    ) {
      packageJson.devDependencies[packageName] = version;
    } else {
      console.log(
        `Package ${packageName} not found in dependencies or devDependencies`
      );
    }

    const updatedPackageJson = JSON.stringify(packageJson, null, 2);

    fs.writeFile(filePath, updatedPackageJson, "utf-8", (err) => {
      if (err) throw err;
      console.log(
        `Version of package ${packageName} updated to ${version}\n${updatedPackageJson}`
      );
    });
  });
}

const url = "https://unpkg.com/@ionic/docs/core.json";
const file = "core.json";

https.get(url, (res) => {
  if (res.statusCode >= 300 && res.statusCode <= 399 && res.headers.location) {
    // Redirect detected

    console.log("redirect", res.headers.location);
    const version = extractVersion(res.headers.location);
    console.log("Version found", version);

    bumpPackageJson(version);
    // bumpCreatorPackages(version, '../packages/create-capacitor-svelte-app/src/creator.js');
    // bumpCreatorPackages(version,'../packages/create-ionic-svelte-app/src/creator.js');

    https.get("https://unpkg.com" + res.headers.location, (res) => {
      download(res);
    });
  } else {
    download(res);
  }
});

function bumpCreatorPackages(version, fileName) {
  // Read the contents of the creator.js file

  fs.readFile(fileName, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // make backup
    fs.writeFile(fileName + ".bak", data, "utf-8", (err) => {
      if (err) throw err;
      console.log(`Backup created of ${fileName}`);
    });

    // Define the search and replace strings
    const searchStr = "['@ionic/core@";
    const replaceStr = "['@ionic/core@" + version;

    // Use a regular expression to search and replace the desired string
    const regex = new RegExp(`${searchStr}\\d+\\.\\d+\\.\\d+'`, "g");
    const newData = data.replace(regex, replaceStr);

    // Write the updated contents back to the file
    fs.writeFile("creasssstor.js", newData, "utf8", (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log("File updated successfully!");
    });
  });
}

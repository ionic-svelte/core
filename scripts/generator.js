// using https://unpkg.com/@ionic/docs@8.5.2/core.json
import fs from "fs";

const core_dir = "scripts/core.json";

function loadCoreJson() {
  const coreJson = fs.readFileSync(core_dir, "utf8");
  return JSON.parse(coreJson);
}

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
  // console log what this script is doing
  console.log("Generating typings and components imports");
  console.log("Loading core.json from Ionic Core");
  console.log("Generating typings and components imports");

  // var dir = "./generated";

  // if (!fs.existsSync(dir)) {
  //   fs.mkdirSync(dir);
  // }

  const coreJson = loadCoreJson();

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
      // console.log("Processing ", component.tag, toPascalCase(component.tag));
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

    console.log("Writing to index.d.ts and components/*.js files");
    console.log(
      "Do us a favor - open index.d.ts and pretty save it in your editor!",
    );

    // Add a slight delay to ensure all file operations complete
    setTimeout(() => {
      console.log("All operations completed. Exiting.");
      process.exit(0);
    }, 100);
  });
};

function doHTTPstuff() {
  const url = "https://unpkg.com/@ionic/docs/core.json";

  import("https")
    .then((httpsModule) => {
      const https = httpsModule.default;

      console.log(`Fetching ${url}`);
      https
        .get(url, (res) => {
          if (
            res.statusCode >= 300 &&
            res.statusCode < 400 &&
            res.headers.location
          ) {
            // Redirect detected
            const redirectUrl = new URL(
              res.headers.location,
              "https://unpkg.com",
            ).href;
            console.log(`Redirected to: ${redirectUrl}`);
            console.log("Replace the versions for the generator scripts");

            // Follow the redirect
            https
              .get(redirectUrl, (redirectRes) => {
                let data = "";

                redirectRes.on("data", (chunk) => {
                  data += chunk;
                });

                redirectRes.on("end", () => {
                  try {
                    const jsonData = JSON.parse(data);
                    console.log("JSON data received:");
                    console.log(
                      JSON.stringify(jsonData, null, 2).substring(0, 80) +
                        "...",
                    );
                    console.log(`Total length: ${data.length} characters`);

                    // Optionally write to file
                    fs.writeFileSync(core_dir, data);
                    console.log("Data saved to core.json file");
                    doStuff(); // Add this line to call doStuff() after the redirect path completes
                  } catch (error) {
                    console.error("Error parsing JSON:", error);
                  }
                });
              })
              .on("error", (err) => {
                console.error(`Error following redirect: ${err.message}`);
              });
          } else {
            // No redirect, process the response directly
            let data = "";

            res.on("data", (chunk) => {
              data += chunk;
            });

            res.on("end", () => {
              try {
                const jsonData = JSON.parse(data);
                console.log("JSON data received:");
                console.log(
                  JSON.stringify(jsonData, null, 2).substring(0, 500) + "...",
                );
                console.log(`Total length: ${data.length} characters`);

                // Optionally write to file
                fs.writeFileSync(core_dir, data);
                console.log("Data saved to core.json file");
                doStuff();
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            });
          }
        })
        .on("error", (err) => {
          console.error(`Error making request: ${err.message}`);
        });
    })
    .catch((err) => {
      console.error("Error importing https module:", err);
    });
}

doHTTPstuff();

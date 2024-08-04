// todo - using https://unpkg.com/@ionic/docs@6.3.8/core.json
const fs = require('fs');

const kebabize = (str) => {
	return str
		.split('')
		.map((letter, idx) => {
			return letter.toUpperCase() === letter
				? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
				: letter;
		})
		.join('');
};

function toPascalCase(text) {
	return text.replace(/(^\w|-\w)/g, clearAndUpper);
}

function clearAndUpper(text) {
	return text.replace(/-/, '').toUpperCase();
}

// load static
const coreJson = require('./core.json'); // 6.3.8 downloaded

// const axios = require('axios');

// axios.get('https://unpkg.com/@ionic/doc/core.json',
//   {
//     timeout: 1000
//   }).then(function (response) {
//     // handle success
//     console.log(response);
//   })

// const request = require('request');

// request('https://unpkg.com/@ionic/docs@6.3.8/core.json', { json: true }, (err, res, body) => {
//   if (err) { return console.log(err); }
//   console.log(body.url);
//   console.log(body.explanation);
// });

// const https = require('https');

// https.get('https://unpkg.com/@ionic/docs@6.3.8/core.json', (resp) => {
//   let data = '';

//   // A chunk of data has been received.
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });

//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
//     console.log(JSON.parse(data).explanation);
//   });

// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });

// taken from stencil-public-runtime.d.ts
const DOMAttributes = `
/**
 * slots - See documentation for parent component on available slots
 */
"slot"?: string | undefined; 
"part"?:string | undefined;
"exportparts"?:string | undefined;
"on:copy"?: (event: ClipboardEvent) => void;
"on:copycapture"?: (event: ClipboardEvent) => void;
"on:cut"?: (event: ClipboardEvent) => void;
"on:cutcapture"?: (event: ClipboardEvent) => void;
"on:paste"?: (event: ClipboardEvent) => void;
"on:pastecapture"?: (event: ClipboardEvent) => void;
"on:compositionend"?: (event: CompositionEvent) => void;
"on:compositionendcapture"?: (event: CompositionEvent) => void;
"on:compositionstart"?: (event: CompositionEvent) => void;
"on:compositionstartcapture"?: (event: CompositionEvent) => void;
"on:compositionupdate"?: (event: CompositionEvent) => void;
"on:compositionupdatecapture"?: (event: CompositionEvent) => void;
"on:focus"?: (event: FocusEvent) => void;
"on:focuscapture"?: (event: FocusEvent) => void;
"on:focusin"?: (event: FocusEvent) => void;
"on:focusincapture"?: (event: FocusEvent) => void;
"on:focusout"?: (event: FocusEvent) => void;
"on:focusoutcapture"?: (event: FocusEvent) => void;
"on:blur"?: (event: FocusEvent) => void;
"on:blurcapture"?: (event: FocusEvent) => void;
"on:change"?: (event: Event) => void;
"on:changecapture"?: (event: Event) => void;
"on:input"?: (event: Event) => void;
"on:inputcapture"?: (event: Event) => void;
"on:reset"?: (event: Event) => void;
"on:resetcapture"?: (event: Event) => void;
"on:submit"?: (event: Event) => void;
"on:submitcapture"?: (event: Event) => void;
"on:invalid"?: (event: Event) => void;
"on:invalidcapture"?: (event: Event) => void;
"on:load"?: (event: Event) => void;
"on:loadcapture"?: (event: Event) => void;
"on:error"?: (event: Event) => void;
"on:errorcapture"?: (event: Event) => void;
"on:keydown"?: (event: KeyboardEvent) => void;
"on:keydowncapture"?: (event: KeyboardEvent) => void;
"on:keypress"?: (event: KeyboardEvent) => void;
"on:keypresscapture"?: (event: KeyboardEvent) => void;
"on:keyup"?: (event: KeyboardEvent) => void;
"on:keyupcapture"?: (event: KeyboardEvent) => void;
"on:auxclick"?: (event: MouseEvent) => void;
"on:click"?: (event: MouseEvent) => void;
"on:clickcapture"?: (event: MouseEvent) => void;
"on:contextmenu"?: (event: MouseEvent) => void;
"on:contextmenucapture"?: (event: MouseEvent) => void;
"on:dblclick"?: (event: MouseEvent) => void;
"on:dblclickcapture"?: (event: MouseEvent) => void;
"on:drag"?: (event: DragEvent) => void;
"on:dragcapture"?: (event: DragEvent) => void;
"on:dragend"?: (event: DragEvent) => void;
"on:dragendcapture"?: (event: DragEvent) => void;
"on:dragenter"?: (event: DragEvent) => void;
"on:dragentercapture"?: (event: DragEvent) => void;
"on:dragexit"?: (event: DragEvent) => void;
"on:dragexitcapture"?: (event: DragEvent) => void;
"on:dragleave"?: (event: DragEvent) => void;
"on:dragleavecapture"?: (event: DragEvent) => void;
"on:dragover"?: (event: DragEvent) => void;
"on:dragovercapture"?: (event: DragEvent) => void;
"on:dragstart"?: (event: DragEvent) => void;
"on:dragstartcapture"?: (event: DragEvent) => void;
"on:drop"?: (event: DragEvent) => void;
"on:dropcapture"?: (event: DragEvent) => void;
"on:mousedown"?: (event: MouseEvent) => void;
"on:mousedowncapture"?: (event: MouseEvent) => void;
"on:mouseenter"?: (event: MouseEvent) => void;
"on:mouseleave"?: (event: MouseEvent) => void;
"on:mousemove"?: (event: MouseEvent) => void;
"on:mousemovecapture"?: (event: MouseEvent) => void;
"on:mouseOut"?: (event: MouseEvent) => void;
"on:mouseOutcapture"?: (event: MouseEvent) => void;
"on:mouseover"?: (event: MouseEvent) => void;
"on:mouseovercapture"?: (event: MouseEvent) => void;
"on:mouseup"?: (event: MouseEvent) => void;
"on:mouseupcapture"?: (event: MouseEvent) => void;
"on:touchcancel"?: (event: TouchEvent) => void;
"on:touchcancelcapture"?: (event: TouchEvent) => void;
"on:touchend"?: (event: TouchEvent) => void;
"on:touchendcapture"?: (event: TouchEvent) => void;
"on:touchmove"?: (event: TouchEvent) => void;
"on:touchmovecapture"?: (event: TouchEvent) => void;
"on:touchstart"?: (event: TouchEvent) => void;
"on:touchstartcapture"?: (event: TouchEvent) => void;
"on:pointerdown"?: (event: PointerEvent) => void;
"on:pointerdowncapture"?: (event: PointerEvent) => void;
"on:pointermove"?: (event: PointerEvent) => void;
"on:pointermovecapture"?: (event: PointerEvent) => void;
"on:pointerup"?: (event: PointerEvent) => void;
"on:pointerupcapture"?: (event: PointerEvent) => void;
"on:pointercancel"?: (event: PointerEvent) => void;
"on:pointercancelcapture"?: (event: PointerEvent) => void;
"on:pointerenter"?: (event: PointerEvent) => void;
"on:pointerentercapture"?: (event: PointerEvent) => void;
"on:pointerleave"?: (event: PointerEvent) => void;
"on:pointerleavecapture"?: (event: PointerEvent) => void;
"on:pointerover"?: (event: PointerEvent) => void;
"on:pointerovercapture"?: (event: PointerEvent) => void;
"on:pointerout"?: (event: PointerEvent) => void;
"on:pointeroutcapture"?: (event: PointerEvent) => void;
"on:gotpointercapture"?: (event: PointerEvent) => void;
"on:gotpointercapturecapture"?: (event: PointerEvent) => void;
"on:lostpointercapture"?: (event: PointerEvent) => void;
"on:lostpointercapturecapture"?: (event: PointerEvent) => void;
"on:scroll"?: (event: UIEvent) => void;
"on:scrollcapture"?: (event: UIEvent) => void;
"on:wheel"?: (event: WheelEvent) => void;
"on:wheelcapture"?: (event: WheelEvent) => void;
"on:animationstart"?: (event: AnimationEvent) => void;
"on:animationstartcapture"?: (event: AnimationEvent) => void;
"on:animationend"?: (event: AnimationEvent) => void;
"on:animationendcapture"?: (event: AnimationEvent) => void;
"on:animationIteration"?: (event: AnimationEvent) => void;
"on:animationiterationcapture"?: (event: AnimationEvent) => void;
"on:transitionend"?: (event: TransitionEvent) => void;
"on:transitionendcapture"?: (event: TransitionEvent) => void;
`;

const doStuff = () => {
	var dir = './generated';

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	const { components } = coreJson;

	console.log('Component count', components.length);

	let typingOutput = '';
	let baseTemplate = `
  // Generated by scripts/generate_ionicsvelte_typings.js
  // need to merge some more stuff from https://github.com/sveltejs/language-tools/blob/master/packages/svelte2tsx/svelte-jsx.d.ts in here
  /* eslint-disable */
  /* tslint:disable */
 
interface JSXAttributes<T = Element> { // removed export
  key?: string | number;
  ref?: (elm?: T) => void;
}

interface HTMLStencilElement extends HTMLElement {
  componentOnReady(): Promise<this>;
}


interface DOMAttributes<T> extends JSXAttributes<T> {

  /**
   * slots - See documentation for parent component on available slots
   */
  "slot"?: string | undefined;
  "part"?: string | undefined;
  "exportparts"?: string | undefined;
  "on:copy"?: (event: ClipboardEvent) => void;
  "on:copycapture"?: (event: ClipboardEvent) => void;
  "on:cut"?: (event: ClipboardEvent) => void;
  "on:cutcapture"?: (event: ClipboardEvent) => void;
  "on:paste"?: (event: ClipboardEvent) => void;
  "on:pastecapture"?: (event: ClipboardEvent) => void;
  "on:compositionend"?: (event: CompositionEvent) => void;
  "on:compositionendcapture"?: (event: CompositionEvent) => void;
  "on:compositionstart"?: (event: CompositionEvent) => void;
  "on:compositionstartcapture"?: (event: CompositionEvent) => void;
  "on:compositionupdate"?: (event: CompositionEvent) => void;
  "on:compositionupdatecapture"?: (event: CompositionEvent) => void;
  "on:focus"?: (event: FocusEvent) => void;
  "on:focuscapture"?: (event: FocusEvent) => void;
  "on:focusin"?: (event: FocusEvent) => void;
  "on:focusincapture"?: (event: FocusEvent) => void;
  "on:focusout"?: (event: FocusEvent) => void;
  "on:focusoutcapture"?: (event: FocusEvent) => void;
  "on:blur"?: (event: FocusEvent) => void;
  "on:blurcapture"?: (event: FocusEvent) => void;
  "on:change"?: (event: Event) => void;
  "on:changecapture"?: (event: Event) => void;
  "on:input"?: (event: Event) => void;
  "on:inputcapture"?: (event: Event) => void;
  "on:reset"?: (event: Event) => void;
  "on:resetcapture"?: (event: Event) => void;
  "on:submit"?: (event: Event) => void;
  "on:submitcapture"?: (event: Event) => void;
  "on:invalid"?: (event: Event) => void;
  "on:invalidcapture"?: (event: Event) => void;
  "on:load"?: (event: Event) => void;
  "on:loadcapture"?: (event: Event) => void;
  "on:error"?: (event: Event) => void;
  "on:errorcapture"?: (event: Event) => void;
  "on:keydown"?: (event: KeyboardEvent) => void;
  "on:keydowncapture"?: (event: KeyboardEvent) => void;
  "on:keypress"?: (event: KeyboardEvent) => void;
  "on:keypresscapture"?: (event: KeyboardEvent) => void;
  "on:keyup"?: (event: KeyboardEvent) => void;
  "on:keyupcapture"?: (event: KeyboardEvent) => void;
  "on:auxclick"?: (event: MouseEvent) => void;
  "on:click"?: (event: MouseEvent) => void;
  "on:clickcapture"?: (event: MouseEvent) => void;
  "on:contextmenu"?: (event: MouseEvent) => void;
  "on:contextmenucapture"?: (event: MouseEvent) => void;
  "on:dblclick"?: (event: MouseEvent) => void;
  "on:dblclickcapture"?: (event: MouseEvent) => void;
  "on:drag"?: (event: DragEvent) => void;
  "on:dragcapture"?: (event: DragEvent) => void;
  "on:dragend"?: (event: DragEvent) => void;
  "on:dragendcapture"?: (event: DragEvent) => void;
  "on:dragenter"?: (event: DragEvent) => void;
  "on:dragentercapture"?: (event: DragEvent) => void;
  "on:dragexit"?: (event: DragEvent) => void;
  "on:dragexitcapture"?: (event: DragEvent) => void;
  "on:dragleave"?: (event: DragEvent) => void;
  "on:dragleavecapture"?: (event: DragEvent) => void;
  "on:dragover"?: (event: DragEvent) => void;
  "on:dragovercapture"?: (event: DragEvent) => void;
  "on:dragstart"?: (event: DragEvent) => void;
  "on:dragstartcapture"?: (event: DragEvent) => void;
  "on:drop"?: (event: DragEvent) => void;
  "on:dropcapture"?: (event: DragEvent) => void;
  "on:mousedown"?: (event: MouseEvent) => void;
  "on:mousedowncapture"?: (event: MouseEvent) => void;
  "on:mouseenter"?: (event: MouseEvent) => void;
  "on:mouseleave"?: (event: MouseEvent) => void;
  "on:mousemove"?: (event: MouseEvent) => void;
  "on:mousemovecapture"?: (event: MouseEvent) => void;
  "on:mouseOut"?: (event: MouseEvent) => void;
  "on:mouseOutcapture"?: (event: MouseEvent) => void;
  "on:mouseover"?: (event: MouseEvent) => void;
  "on:mouseovercapture"?: (event: MouseEvent) => void;
  "on:mouseup"?: (event: MouseEvent) => void;
  "on:mouseupcapture"?: (event: MouseEvent) => void;
  "on:touchcancel"?: (event: TouchEvent) => void;
  "on:touchcancelcapture"?: (event: TouchEvent) => void;
  "on:touchend"?: (event: TouchEvent) => void;
  "on:touchendcapture"?: (event: TouchEvent) => void;
  "on:touchmove"?: (event: TouchEvent) => void;
  "on:touchmovecapture"?: (event: TouchEvent) => void;
  "on:touchstart"?: (event: TouchEvent) => void;
  "on:touchstartcapture"?: (event: TouchEvent) => void;
  "on:pointerdown"?: (event: PointerEvent) => void;
  "on:pointerdowncapture"?: (event: PointerEvent) => void;
  "on:pointermove"?: (event: PointerEvent) => void;
  "on:pointermovecapture"?: (event: PointerEvent) => void;
  "on:pointerup"?: (event: PointerEvent) => void;
  "on:pointerupcapture"?: (event: PointerEvent) => void;
  "on:pointercancel"?: (event: PointerEvent) => void;
  "on:pointercancelcapture"?: (event: PointerEvent) => void;
  "on:pointerenter"?: (event: PointerEvent) => void;
  "on:pointerentercapture"?: (event: PointerEvent) => void;
  "on:pointerleave"?: (event: PointerEvent) => void;
  "on:pointerleavecapture"?: (event: PointerEvent) => void;
  "on:pointerover"?: (event: PointerEvent) => void;
  "on:pointerovercapture"?: (event: PointerEvent) => void;
  "on:pointerout"?: (event: PointerEvent) => void;
  "on:pointeroutcapture"?: (event: PointerEvent) => void;
  "on:gotpointercapture"?: (event: PointerEvent) => void;
  "on:gotpointercapturecapture"?: (event: PointerEvent) => void;
  "on:lostpointercapture"?: (event: PointerEvent) => void;
  "on:lostpointercapturecapture"?: (event: PointerEvent) => void;
  "on:scroll"?: (event: UIEvent) => void;
  "on:scrollcapture"?: (event: UIEvent) => void;
  "on:wheel"?: (event: WheelEvent) => void;
  "on:wheelcapture"?: (event: WheelEvent) => void;
  "on:animationstart"?: (event: AnimationEvent) => void;
  "on:animationstartcapture"?: (event: AnimationEvent) => void;
  "on:animationend"?: (event: AnimationEvent) => void;
  "on:animationendcapture"?: (event: AnimationEvent) => void;
  "on:animationIteration"?: (event: AnimationEvent) => void;
  "on:animationiterationcapture"?: (event: AnimationEvent) => void;
  "on:transitionend"?: (event: TransitionEvent) => void;
  "on:transitionendcapture"?: (event: TransitionEvent) => void;
}


interface HTMLAttributes<HTMLElement> { //  extends DOMAttributes<T>  DOMAttributes

  innerHTML?: string;
  accessKey?: string;
  class?: string | {
      [className: string]: boolean;
  };
  contentEditable?: boolean | string;
  contenteditable?: boolean | string;
  contextMenu?: string;
  contextmenu?: string;
  dir?: string;
  draggable?: boolean;
  hidden?: boolean;
  id?: string;
  lang?: string;
  spellcheck?: 'true' | 'false' | any;
  style?: {
      [key: string]: string | undefined;
  };
  tabIndex?: number;
  tabindex?: number | string;
  title?: string;
  inputMode?: string;
  inputmode?: string;
  enterKeyHint?: string;
  enterkeyhint?: string;
  is?: string;
  radioGroup?: string;
  radiogroup?: string;
  role?: string;
  about?: string;
  datatype?: string;
  inlist?: any;
  prefix?: string;
  property?: string;
  resource?: string;
  typeof?: string;
  vocab?: string;
  autoCapitalize?: any;
  autocapitalize?: any;
  autoCorrect?: string;
  autocorrect?: string;
  autoSave?: string;
  autosave?: string;
  color?: string;
  itemProp?: string;
  itemprop?: string;
  itemScope?: boolean;
  itemscope?: boolean;
  itemType?: string;
  itemtype?: string;
  itemID?: string;
  itemid?: string;
  itemRef?: string;
  itemref?: string;
  results?: number;
  security?: string;
  unselectable?: boolean;
}
 
 
  declare namespace svelte.JSX {

    import type { AccordionGroupChangeEventDetail, ActionSheetAttributes, ActionSheetButton, AlertButton, AlertInput, AnimationBuilder, AutocompleteTypes, BreadcrumbCollapsedClickEventDetail, CheckboxChangeEventDetail, Color, ComponentProps, ComponentRef, DatetimeChangeEventDetail, DatetimePresentation, DomRenderFn, FooterHeightFn, FrameworkDelegate, HeaderFn, HeaderHeightFn, InputChangeEventDetail, ItemHeightFn, ItemRenderFn, ItemReorderEventDetail, LoadingAttributes, MenuChangeEventDetail, ModalAttributes, ModalBreakpointChangeEventDetail, ModalHandleBehavior, NavComponent, NavComponentWithProps, NavOptions, OverlayEventDetail, PickerAttributes, PickerButton, PickerColumn, PopoverAttributes, PopoverSize, PositionAlign, PositionReference, PositionSide, RadioGroupChangeEventDetail, RangeChangeEventDetail, RangeKnobMoveEndEventDetail, RangeKnobMoveStartEventDetail, RangeValue, RefresherEventDetail, RouteID, RouterDirection, RouterEventDetail, RouterOutletOptions, RouteWrite, ScrollBaseDetail, ScrollDetail, SearchbarChangeEventDetail, SegmentButtonLayout, SegmentChangeEventDetail, SelectChangeEventDetail, SelectInterface, SelectPopoverOption, Side, SpinnerTypes, StyleEventDetail, SwipeGestureHandler, TabBarChangedEventDetail, TabButtonClickEventDetail, TabButtonLayout, TextareaChangeEventDetail, TextFieldTypes, TitleSelectedDatesFormatter, ToastButton, ToggleChangeEventDetail, TransitionDoneFn, TransitionInstruction, TriggerAction, ViewController } from "@ionic/core/toast-interface";
    import type { IonicSafeString, AlertAttributes, CounterFormatter, PickerColumnItem, PickerInternalChangeEventDetail, PinFormatter, NavigationHookCallback, SelectCompareFn, ToastAttributes, ToastPosition } from "@ionic/core";

    <COMPONENTTYPES>

    interface IntrinsicElements {

     <COMPONENTDECLARATIONS>

    }
  }
      
  `;

	//
	// PART 1 - Typings file
	//
	let componentTypes = ``;
	let componentDeclarations = '';

	components
		//  .filter(component => component.tag == 'ion-button')
		.forEach((component) => {
			const { props, events } = component;

			const tagWithoutIon = component.tag.replace('ion-', '');
			const tagAsPascal = toPascalCase(component.tag);

			// pre-amble of this tag
			console.log('Processing ', component.tag, toPascalCase(component.tag));
			componentDeclarations =
				componentDeclarations +
				`
  /**
   * ${component.tag}
   * More info: https://ionicframework.com/docs/api/${tagWithoutIon}
   */    
  '${component.tag}': HTMLAttributes<${tagAsPascal}> & ${tagAsPascal}; \n`;

			// slots support
			componentTypes = componentTypes + `interface ${tagAsPascal} {\n` + DOMAttributes;

			// let's dump the props
			console.log('has props', props);
			props.forEach((prop) => {
				//   "disabled"?: boolean;
				componentTypes =
					componentTypes +
					`
          /**
          * ${prop.docs.replace(/\n/g, ' ')}
          * API info: https://ionicframework.com/docs/api/${tagWithoutIon}#${prop.name.toLowerCase()}
          */
          "${kebabize(prop.name)}"?: ${prop.type};
        `;
			});

			// let's dump the events
			console.log('has props', events);
			events.forEach((event) => {
				//     "on:ionSlideReachEnd"?: () => void;
				componentTypes =
					componentTypes +
					`
              /**
              * (event : ${event.detail}) => void :  ${event.docs.replace(/\n/g, ' ')}
              */
              "on:${event.event}"?: (event : ${event.detail}) => void;
            `;
			});

			// close definition
			componentTypes = componentTypes + `\n}\n\n`;
		});

	// generate final template
	typingOutput = baseTemplate
		.replace('<COMPONENTTYPES>', componentTypes)
		.replace('<COMPONENTDECLARATIONS>', componentDeclarations);

	// console.log('Typings output', typingOutput)

	fs.writeFile('../experimental_index.d.ts', typingOutput, function (err) {
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

			allImportsCode = allImportsCode + `import 'ionic-svelte/components/${tag}';\n`;

			fs.writeFile(`../components/${tag}.js`, componentCode, function (err) {
				if (err) return console.log(err);
			});
		});

	// all code imports
	fs.writeFile(`../components/all.js`, allImportsCode, function (err) {
		if (err) return console.log(err);
	});
};

doStuff();

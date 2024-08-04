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

// load static
const coreJson = require('../core.json'); // 6.3.8 downloaded

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

"class"?:string | undefined;
"style"?:string | undefined;
"part"?:string | undefined;
"exportparts"?:string | undefined;
"on:Copy"?: (event: ClipboardEvent) => void;
"on:CopyCapture"?: (event: ClipboardEvent) => void;
"on:Cut"?: (event: ClipboardEvent) => void;
"on:CutCapture"?: (event: ClipboardEvent) => void;
"on:Paste"?: (event: ClipboardEvent) => void;
"on:PasteCapture"?: (event: ClipboardEvent) => void;
"on:CompositionEnd"?: (event: CompositionEvent) => void;
"on:CompositionEndCapture"?: (event: CompositionEvent) => void;
"on:CompositionStart"?: (event: CompositionEvent) => void;
"on:CompositionStartCapture"?: (event: CompositionEvent) => void;
"on:CompositionUpdate"?: (event: CompositionEvent) => void;
"on:CompositionUpdateCapture"?: (event: CompositionEvent) => void;
"on:Focus"?: (event: FocusEvent) => void;
"on:FocusCapture"?: (event: FocusEvent) => void;
"on:Focusin"?: (event: FocusEvent) => void;
"on:FocusinCapture"?: (event: FocusEvent) => void;
"on:Focusout"?: (event: FocusEvent) => void;
"on:FocusoutCapture"?: (event: FocusEvent) => void;
"on:Blur"?: (event: FocusEvent) => void;
"on:BlurCapture"?: (event: FocusEvent) => void;
"on:Change"?: (event: Event) => void;
"on:ChangeCapture"?: (event: Event) => void;
"on:Input"?: (event: Event) => void;
"on:InputCapture"?: (event: Event) => void;
"on:Reset"?: (event: Event) => void;
"on:ResetCapture"?: (event: Event) => void;
"on:Submit"?: (event: Event) => void;
"on:SubmitCapture"?: (event: Event) => void;
"on:Invalid"?: (event: Event) => void;
"on:InvalidCapture"?: (event: Event) => void;
"on:Load"?: (event: Event) => void;
"on:LoadCapture"?: (event: Event) => void;
"on:Error"?: (event: Event) => void;
"on:ErrorCapture"?: (event: Event) => void;
"on:KeyDown"?: (event: KeyboardEvent) => void;
"on:KeyDownCapture"?: (event: KeyboardEvent) => void;
"on:KeyPress"?: (event: KeyboardEvent) => void;
"on:KeyPressCapture"?: (event: KeyboardEvent) => void;
"on:KeyUp"?: (event: KeyboardEvent) => void;
"on:KeyUpCapture"?: (event: KeyboardEvent) => void;
"on:AuxClick"?: (event: MouseEvent) => void;
"on:Click"?: (event: MouseEvent) => void;
"on:ClickCapture"?: (event: MouseEvent) => void;
"on:ContextMenu"?: (event: MouseEvent) => void;
"on:ContextMenuCapture"?: (event: MouseEvent) => void;
"on:DblClick"?: (event: MouseEvent) => void;
"on:DblClickCapture"?: (event: MouseEvent) => void;
"on:Drag"?: (event: DragEvent) => void;
"on:DragCapture"?: (event: DragEvent) => void;
"on:DragEnd"?: (event: DragEvent) => void;
"on:DragEndCapture"?: (event: DragEvent) => void;
"on:DragEnter"?: (event: DragEvent) => void;
"on:DragEnterCapture"?: (event: DragEvent) => void;
"on:DragExit"?: (event: DragEvent) => void;
"on:DragExitCapture"?: (event: DragEvent) => void;
"on:DragLeave"?: (event: DragEvent) => void;
"on:DragLeaveCapture"?: (event: DragEvent) => void;
"on:DragOver"?: (event: DragEvent) => void;
"on:DragOverCapture"?: (event: DragEvent) => void;
"on:DragStart"?: (event: DragEvent) => void;
"on:DragStartCapture"?: (event: DragEvent) => void;
"on:Drop"?: (event: DragEvent) => void;
"on:DropCapture"?: (event: DragEvent) => void;
"on:MouseDown"?: (event: MouseEvent) => void;
"on:MouseDownCapture"?: (event: MouseEvent) => void;
"on:MouseEnter"?: (event: MouseEvent) => void;
"on:MouseLeave"?: (event: MouseEvent) => void;
"on:MouseMove"?: (event: MouseEvent) => void;
"on:MouseMoveCapture"?: (event: MouseEvent) => void;
"on:MouseOut"?: (event: MouseEvent) => void;
"on:MouseOutCapture"?: (event: MouseEvent) => void;
"on:MouseOver"?: (event: MouseEvent) => void;
"on:MouseOverCapture"?: (event: MouseEvent) => void;
"on:MouseUp"?: (event: MouseEvent) => void;
"on:MouseUpCapture"?: (event: MouseEvent) => void;
"on:TouchCancel"?: (event: TouchEvent) => void;
"on:TouchCancelCapture"?: (event: TouchEvent) => void;
"on:TouchEnd"?: (event: TouchEvent) => void;
"on:TouchEndCapture"?: (event: TouchEvent) => void;
"on:TouchMove"?: (event: TouchEvent) => void;
"on:TouchMoveCapture"?: (event: TouchEvent) => void;
"on:TouchStart"?: (event: TouchEvent) => void;
"on:TouchStartCapture"?: (event: TouchEvent) => void;
"on:PointerDown"?: (event: PointerEvent) => void;
"on:PointerDownCapture"?: (event: PointerEvent) => void;
"on:PointerMove"?: (event: PointerEvent) => void;
"on:PointerMoveCapture"?: (event: PointerEvent) => void;
"on:PointerUp"?: (event: PointerEvent) => void;
"on:PointerUpCapture"?: (event: PointerEvent) => void;
"on:PointerCancel"?: (event: PointerEvent) => void;
"on:PointerCancelCapture"?: (event: PointerEvent) => void;
"on:PointerEnter"?: (event: PointerEvent) => void;
"on:PointerEnterCapture"?: (event: PointerEvent) => void;
"on:PointerLeave"?: (event: PointerEvent) => void;
"on:PointerLeaveCapture"?: (event: PointerEvent) => void;
"on:PointerOver"?: (event: PointerEvent) => void;
"on:PointerOverCapture"?: (event: PointerEvent) => void;
"on:PointerOut"?: (event: PointerEvent) => void;
"on:PointerOutCapture"?: (event: PointerEvent) => void;
"on:GotPointerCapture"?: (event: PointerEvent) => void;
"on:GotPointerCaptureCapture"?: (event: PointerEvent) => void;
"on:LostPointerCapture"?: (event: PointerEvent) => void;
"on:LostPointerCaptureCapture"?: (event: PointerEvent) => void;
"on:Scroll"?: (event: UIEvent) => void;
"on:ScrollCapture"?: (event: UIEvent) => void;
"on:Wheel"?: (event: WheelEvent) => void;
"on:WheelCapture"?: (event: WheelEvent) => void;
"on:AnimationStart"?: (event: AnimationEvent) => void;
"on:AnimationStartCapture"?: (event: AnimationEvent) => void;
"on:AnimationEnd"?: (event: AnimationEvent) => void;
"on:AnimationEndCapture"?: (event: AnimationEvent) => void;
"on:AnimationIteration"?: (event: AnimationEvent) => void;
"on:AnimationIterationCapture"?: (event: AnimationEvent) => void;
"on:TransitionEnd"?: (event: TransitionEvent) => void;
"on:TransitionEndCapture"?: (event: TransitionEvent) => void;
`;

const doStuff = () => {
	var dir = './generated';

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	const { components } = coreJson;

	console.log('Component count', components.length);

	let typingOutput = `
  // Generated by scripts/generate_ionicsvelte_typings.js
  // need to merge some more stuff from https://github.com/sveltejs/language-tools/blob/master/packages/svelte2tsx/svelte-jsx.d.ts in here
  declare namespace svelte.JSX {

    interface IntrinsicElements {
      
  `;

	components
		//  .filter(component => component.tag == 'ion-button')
		.forEach((component) => {
			const { props, events } = component;

			const tagWithoutIon = component.tag.replace('ion-', '');
			// const tagCapitalFirstLetter = tagWithoutIon.charAt(0).toUpperCase() + tagWithoutIon.slice(1);

			// if (props.length > 0) {
			// pre-amble of this tag
			console.log('Processing ', component.tag);
			typingOutput =
				typingOutput +
				`
  /**
   * ${component.tag}
   * More info: https://ionicframework.com/docs/api/${tagWithoutIon}
   */    
  '${component.tag}': {
      `;

			// slots support
			typingOutput = typingOutput + DOMAttributes;

			// let's dump the props
			console.log('has props', props);
			props.forEach((prop) => {
				//   "disabled"?: boolean;
				typingOutput =
					typingOutput +
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
				typingOutput =
					typingOutput +
					`
              /**
              * (event : ${event.detail}) => void :  ${event.docs.replace(/\n/g, ' ')}
              */
              "on:${event.event}"?: (event : ${event.detail}) => void;
            `;
			});

			// close definition
			typingOutput =
				typingOutput +
				`}

  `;
			//   }
		});

	typingOutput =
		typingOutput +
		`    }
  }
    `;

	// console.log('Typings output', typingOutput)

	fs.writeFile('../index.d.ts', typingOutput, function (err) {
		if (err) return console.log(err);
	});

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

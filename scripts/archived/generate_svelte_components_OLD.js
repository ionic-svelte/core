const https = require('https');
const fs = require('fs');

// load static
let components = require('./ioncomponents.json');
const svelteTemplate = require('./sveltetemplate');
const importListKeys = require('./importkeys.json');
const extra = require('./extra');

// global props
const allSlots = [];

// bij undefined of null in prop -> dan null assignen
function isMatch(searchOnString, searchText) {
	searchText = searchText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	return searchOnString.match(new RegExp('\\b' + searchText + '\\b', 'i')) != null;
}

function pascalize(str) {
	let arr = str.split('-');
	let capital = arr.map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase());
	let capitalString = capital.join('');

	return capitalString;
}

const doStuff = () => {
	var dir = './generated';

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	// testing purposes
	// components = ['ion-item', 'ion-label'];

	components.forEach((component, i) => {
		// console.log('Getting component', component, i);
		setTimeout(() => {
			getDataFromGithub(component);
		}, i * 1000);
	});

	// Empty slot - very rude way to do this
	setTimeout(
		() => {
			let emptyTekst = '<slot/>\n';
			allSlots.forEach((slot) => {
				emptyTekst =
					emptyTekst +
					`<slot name='${slot}' />
        `;
			});

			console.log('Empty component\n', emptyTekst, allSlots);

			fs.writeFile('generated/Empty.svelte', emptyTekst, function (err) {
				if (err) return console.log(err);
			});
		},
		(components.length + 2) * 1000
	);
};

// https://raw.githubusercontent.com/ionic-team/ionic-framework/main/core/src/components/card/card.tsx
const getDataFromGithub = async (ionlabel, component) => {
	// https://semaphore.co/api/v4/messages?apikey=d9d65c9fc85bbc9a6de478d0e63dee03&limit=1000
	// https://semaphore.co/docs - page	Specifies which page of the results to return. The default is 1.

	let label = ionlabel.replace('ion-', '');
	const url = `https://raw.githubusercontent.com/ionic-team/ionic-framework/main/core/src/components/${label}/${label}.tsx`;

	console.log('Requesting ', url);
	const request = https.request(url, (response) => {
		let data = '';
		response.on('data', (chunk) => {
			data = data + chunk.toString();
		});

		response.on('end', async () => {
			// .. const body = JSON.parse(data);

			// console.log('SADADSA', data.split(/\n?\r/))
			if (data == undefined) {
				console.log('Table has nothing', tableName);
			}
			if (data != undefined) {
				const lines = data.split('\n');
				const events = [];
				const props = [];
				const propdeclrs = [];
				const slots = [];
				let importsToInclude = [];
				//   console.log('Lines', lines, lines.length);
				lines.map((line) => {
					let item = '';

					line = line.replace('protected ', '');

					// find events
					if (line.includes('@Event')) {
						if (line.includes('eventName')) {
							const stuff = line.trim().split(' ');
							const item = stuff[2].replace("'", '').replace("'", '').trim();
							// console.log(stuff, item);

							if (item.includes('ion')) events.push(item);
						} else {
							const stuff = line.trim().split(' ');
							const item = stuff[1].replace(':', '').replace('!', '').trim();
							//     console.log(stuff, item);
							if (item.includes('ion')) events.push(item);
						}
					}

					// Find properties reserved keyword appearing in IonSelect
					if (line.includes('@Prop') && !line.includes('interface')) {
						// clean a bit
						line = line.replace('@Prop({ reflect: true })', '@Prop()');
						line = line.replace('@Prop({ mutable: true })', '@Prop()');
						line = line.replace('@Prop({ reflect: true, mutable: true })', '@Prop()');
						line = line.replace('!', '');
						line = line.replace('this.pullMin', 'pullMin');
						line = line.replace(
							'config.get("backButtonIcon", arrowBackSharp) as string;',
							'arrowBackSharp'
						);
						//

						// checkbox,ionDateTime, ionInput, ionRadio, ionRadioGroup
						line = line.replace('this.inputId', `'label'+Date.now()`);

						// lets find the variable name
						let stuff = line.trim().split(' ');
						const propitem = stuff[1].replace("'", '').replace("'", '').trim().replace(':', '');

						// we can store this for now
						props.push(propitem.replace('?', ''));

						// optional props - generic ones/defined as undefined - we can assign directly
						if (line.includes('undefined')) {
							line = line.replace('?', '').replace(';', ' = undefined;');
						}

						// the ? item - we just assign undefined
						if (propitem.includes('?') && !line.includes('undefined')) {
							// we assign undefined if there is no assignment
							if (!line.includes('='))
								line = line.replace('?', '').replace(';', ' = ' + 'undefined' + ';'); // stuff[2]
							if (line.includes('=')) line = line.replace('?', ''); // stuff[2]
							//    console.log('STUFF', line, stuff)
						}

						// clean stuff
						line = line.replace(';;', ';');
						line = line.replace('?', '');
						line = line
							.replace('= Color', `='primary'`)
							.replace(`= 'primary' = undefined`, `= 'primary'`)
							.replace('ids++', 'Date.now()')
							.replace(`= undefined = undefined`, `= undefined`);

						propdeclrs.push('//@ts-ignore');
						propdeclrs.push(line.replace('@Prop()', 'export let'));
						// console.log(line, props, propdeclrs);

						importListKeys.forEach((importkey) => {
							if (isMatch(line, importkey)) importsToInclude.push(importkey);
							//     if (line.includes(importkey)) importsToInclude.push(importkey)
						});
					}

					//Find slots
					// slot name=
					if (line.includes('slot name=')) {
						//      if (line.includes('time-label')) {
						//         console.log('cccccccccccCCCC', line, ionlabel)
						//         throw "STOP"
						//    }
						// rude way to parse the slot
						let slotRaw = line.replace('return', '').replace('Time').replace('Select Date', '');
						slotRaw = slotRaw
							//    .replace('return', '') // date-time has special slot
							//    .replace('Time') // date-time has special slot
							.replace('<slot name="', '')
							.replace('"></slot>', '')

							//   .replace('">', '')
							//   .replace('>Select Date</slot>', '/>')
							//   .replace(`">undefined</slot>;'`, '')
							.trim()
							.replace(`">undefined</slot>;`, '')
							.replace('">', '')
							.replace('">');

						if (!slots.includes(slotRaw)) slots.push(slotRaw);
						if (!allSlots.includes(slotRaw)) allSlots.push(slotRaw);
					}
					//
				});
				//    console.log('Events', ionlabel, events, props, propdeclrs);

				// let's populate the component template
				let code = svelteTemplate;
				const component = pascalize(ionlabel);

				// first generate the SLOT stuff
				let slotTemplate = require('./slotTemplate');

				//  the overall slot (not named)
				let slotCode =
					`
                {#if ionSlot === undefined}
                ` + slotTemplate.replace('<SLOTNAME>', '');

				// then all slots present
				slots.forEach((slot) => {
					slotCode =
						slotCode +
						`
                    {:else if ionSlot === '${slot}'}
                    <Empty>
                    ` +
						slotTemplate.replace(/<SLOTNAME>/g, `slot='${slot}'`) +
						`
                    </Empty>`;
				});

				slotCode =
					slotCode +
					`
                {:else}
            	Unknown slot '{ionSlot}' in ${component}
                {/if}`;
				code = code.replace(/<SLOTCODE>/g, slotCode);

				if (slots.length > 1) {
					code = code.replace(
						/<EMPTYIMPORT>/g,
						`import { Empty } from "ionic-svelte/experimental";`
					);
				} else code = code.replace(/<EMPTYIMPORT>/g, ``);

				// do here the magic for the other tags - to check if we want to do a global replace here
				code = code.replace(/<TAG>/g, ionlabel);
				code = code.replace(/<COMPONENT>/g, component);

				let ioneventslabel = '';
				events.forEach((event) => {
					// console.log('EVENT', event, ioneventslabel)
					ioneventslabel = ioneventslabel + ' on:' + event + '\n';
				});
				code = code.replace(/<IONEVENTS>/g, ioneventslabel);

				let proplabel = '';
				props.forEach((event) => {
					// console.log('EVENT', event, ioneventslabel)
					proplabel = proplabel + '{' + event + '}\n ';
				});
				code = code.replace(/<PROPS>/g, proplabel);

				let decllabel = '';
				propdeclrs.forEach((event) => {
					// console.log('EVENT', event, decllabel)
					decllabel = decllabel + event + '\n ';
				});
				// console.log('EVENT', decllabel)
				code = code.replace(/<DECLRS>/g, decllabel);

				let importlabel = importsToInclude.length == 0 ? '' : `import type {`;
				importsToInclude = [...new Set(importsToInclude)];
				importsToInclude.forEach((event) => {
					// console.log('EVENT', event, decllabel)
					importlabel = importlabel + event + ',';
				});
				if (importsToInclude.length > 0) {
					importlabel = importlabel + `} from '@ionic/core';`;
				}
				//  console.log('EVENT', importlabel)
				code = code.replace(/<IMPORTS>/g, importlabel.replace(',}', '}'));

				//  console.log('Code', code)
				let extralabel = '';
				if (extra[component] !== undefined) extralabel = extra[component];
				code = code.replace(/<EXTRA>/g, extralabel);

				// and some more cleaning
				if (code.includes('const ionChange')) {
					code = code.replace('on:ionChange\n', 'on:ionChange={ionChange}\n');
				}

				console.log('Writing ', component);
				fs.writeFile('generated/' + component + '.svelte', code, function (err) {
					if (err) return console.log(err);
				});
			}
		});
	});

	request.on('error', (error) => {
		console.log('An error', error);
	});

	request.end();
};

doStuff();

/*

Script to generate exports

components.forEach(component => {
    const toPascal = pascalize(component);
    console.log('// @ts-ignore')
    console.log(`export { default as ${toPascal} } from './components/${toPascal}.svelte';`)
});

*/

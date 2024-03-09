<script lang="ts">
	import type { AlertOptions } from '@ionic/core';
	import { alertController } from 'ionic-svelte';

	import SourceButton from '$lib/components/SourceButton.svelte';
	import { IonPage } from 'ionic-svelte';

	const showAlert = async (options: AlertOptions) => {
		const alert = await alertController.create(options);
		alert.present();
	};

	const showInputAlert = async () => {
		const options: AlertOptions = {
			cssClass: 'my-custom-class',
			header: 'Prompt!',
			inputs: [
				{
					name: 'name1',
					type: 'text',
					placeholder: 'Placeholder 1'
				},
				{
					name: 'name2',
					type: 'text',
					id: 'name2-id',
					value: 'hello',
					placeholder: 'Placeholder 2'
				},
				// multiline input.
				{
					name: 'paragraph',
					id: 'paragraph',
					type: 'textarea',
					placeholder: 'Placeholder 3'
				},
				{
					name: 'name3',
					value: 'http://ionicframework.com',
					type: 'url',
					placeholder: 'Favorite site ever'
				},
				// input date with min & max
				{
					name: 'name4',
					type: 'date',
					min: '2017-03-01',
					max: '2018-01-12'
				},
				// input date without min nor max
				{
					name: 'name5',
					type: 'date'
				},
				{
					name: 'name6',
					type: 'number',
					min: -5,
					max: 10
				}
			],
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('Confirm Cancel');
					}
				},
				{
					text: 'Ok',
					handler: () => {
						console.log('Confirm Ok');
					}
				}
			]
		};

		return showAlert(options);
	};

	const showSimpleAlert = async () => {
		const options = {
			header: 'Prompt!',
			subHeader: 'Subtitle',
			message: 'This is an alert message.',
			buttons: ['OK']
		};

		return showAlert(options);
	};

	const showRadioAlert = async () => {
		const options = {
			header: 'Radio',
			subHeader: 'Subtitle',
			message: 'This is an alert message.',
			inputs: [
				{
					type: 'radio',
					label: 'Radio 1',
					value: 'value1',
					checked: true
				},
				{
					type: 'radio',
					label: 'Radio 2',
					value: 'value2'
				},
				{
					type: 'radio',
					label: 'Radio 3',
					value: 'value3'
				},
				{
					type: 'radio',
					label: 'Radio 4',
					value: 'value4'
				},
				{
					type: 'radio',
					label: 'Radio 5',
					value: 'value5'
				},
				{
					type: 'radio',
					label: 'Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 Radio 6 ',
					value: 'value6'
				}
			],
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('Confirm Cancel');
					}
				},
				{
					text: 'Ok',
					handler: (data) => {
						console.log('Confirm Ok', data);
					}
				}
			]
		};

		return showAlert(options as AlertOptions);
	};

	const showCheckboxAlert = async () => {
		const options = {
			header: 'Radio',
			subHeader: 'Subtitle',
			message: 'This is an alert message.',
			inputs: [
				{
					type: 'checkbox',
					label: 'Checkbox 1',
					value: 'value1',
					checked: true
				},
				{
					type: 'checkbox',
					label: 'Checkbox 2',
					value: 'value2'
				},
				{
					type: 'checkbox',
					label: 'Checkbox 3',
					value: 'value3'
				},
				{
					type: 'checkbox',
					label: 'Checkbox 4',
					value: 'value4'
				},
				{
					type: 'checkbox',
					label: 'Checkbox 5',
					value: 'value5'
				},
				{
					type: 'checkbox',
					label: 'Checkbox 6',
					value: 'value6'
				}
			],
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('Confirm Cancel');
					}
				},
				{
					text: 'Ok',
					handler: (data) => {
						console.log('Confirm Ok', data);
					}
				}
			]
		};

		return showAlert(options as AlertOptions);
	};
</script>

<svelte:head>
	<title>Ionic Companion - Alerts</title>
</svelte:head>

<IonPage>
	<ion-header translucent={true}>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-menu-button />
			</ion-buttons>
			<ion-buttons slot="end">
				<SourceButton name="Alert" />
			</ion-buttons>
			<ion-title>Alerts</ion-title>
		</ion-toolbar>
	</ion-header>

	<ion-content fullscreen class="ion-padding">
		<h1>Click me stuff below!</h1>
		<ion-button expand="block" on:click={showSimpleAlert}> Show Simple Alert </ion-button>
		<ion-button expand="block" on:click={showRadioAlert}> Show Radio Alert </ion-button>
		<ion-button expand="block" on:click={showCheckboxAlert}> Show Checkbox Alert </ion-button>
		<ion-button expand="block" on:click={showInputAlert}> Show Input Alert </ion-button>
	</ion-content>
</IonPage>

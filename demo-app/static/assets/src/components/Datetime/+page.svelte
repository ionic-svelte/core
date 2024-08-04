<script lang="ts">
	import SourceButton from '$lib/components/SourceButton.svelte';
	import { IonPage } from 'ionic-svelte';

	let modalOpen = false;

	const changeValue = (event) => {
		console.log('Change of value', event.detail);
	};
</script>

<svelte:head>
	<title>Ionic Companion - Datetime</title>
</svelte:head>

<IonPage>
	<ion-header translucent={true}>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-menu-button />
			</ion-buttons>
			<ion-buttons slot="end">
				<SourceButton name="Datetime" />
			</ion-buttons>
			<ion-title>DateTime</ion-title>
		</ion-toolbar>
	</ion-header>

	<ion-content fullscreen>
		<ion-button
			expand="block"
			on:click={() => {
				modalOpen = true;
			}}>Open Datetime Modal</ion-button>
		<ion-modal is-open={modalOpen}>
			<ion-content force-overscroll="false">
				<ion-datetime />
				<ion-button
					expand="block"
					on:click={() => {
						modalOpen = false;
					}}>Close</ion-button>
			</ion-content>
		</ion-modal>
		<ion-list>
			<ion-item>
				<ion-label>Start Date</ion-label>
				<ion-datetime on:ionChange={changeValue} value="1990-02-19" placeholder="Select Date" />
			</ion-item>
			<ion-item>
				<ion-label>Start Time</ion-label>
				<ion-datetime
					on:ionChange={changeValue}
					display-format="h:mm A"
					picker-format="h:mm A"
					value="1990-02-19T07:43Z" />
			</ion-item>
			<ion-item>
				<ion-label>Ends</ion-label>
				<ion-datetime on:ionChange={changeValue} value="1990-02-20" placeholder="Select Date" />
			</ion-item>
			<ion-item>
				<ion-label>Repeat</ion-label>
				<ion-datetime placeholder="Never" disabled />
			</ion-item>
			<ion-item>
				<ion-label>Travel Time</ion-label>
				<ion-datetime placeholder="None" disabled />
			</ion-item>
			<ion-item-divider />
			<ion-item>
				<ion-label>Alert</ion-label>
				<ion-datetime placeholder="None" disabled />
			</ion-item>
		</ion-list>
	</ion-content>
</IonPage>

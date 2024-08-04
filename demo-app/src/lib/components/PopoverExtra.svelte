<script lang="ts">
	import { popoverController } from 'ionic-svelte';

	export let firstName = undefined;
	export let lastName = undefined;
	export let middleInitial = undefined;

	console.log('Received props', firstName, lastName, middleInitial);

	const closeOverlay = (data) => {
		console.log('dasd', data);
		popoverController.dismiss(data);
	};
</script>

<svelte:head>
	<title>Ionic Companion - Popover extra</title>
</svelte:head>
<ion-list>
	<ion-list-header>Ionic</ion-list-header>
	<ion-item
		button
		on:click={() => {
			closeOverlay('Learn Ionic');
		}}>
		Learn Ionic
	</ion-item>
	<ion-item
		button
		on:click={() => {
			closeOverlay('Documentation');
		}}>
		Documentation
	</ion-item>
	<ion-item
		button
		on:click={() => {
			closeOverlay('Showcase');
		}}>
		Showcase
	</ion-item>
	<ion-item
		button
		on:click={() => {
			closeOverlay('Github');
		}}>
		GitHub Repo
	</ion-item>
</ion-list>

<ion-button
	expand="block"
	on:click={() => {
		closeOverlay(undefined);
	}}>
	Close
</ion-button>

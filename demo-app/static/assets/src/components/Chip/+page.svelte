<script lang="ts">
	import { pin, wine, checkmarkCircle, closeCircle, restaurant, videocam } from 'ionicons/icons';
	import SourceButton from '$lib/components/SourceButton.svelte';
	import { IonPage } from 'ionic-svelte';
</script>

<svelte:head>
	<title>Ionic Companion - Chips</title>
</svelte:head>

<IonPage>
	<ion-header translucent={true}>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-menu-button />
			</ion-buttons>
			<ion-buttons slot="end">
				<SourceButton name="Chip" />
			</ion-buttons>
			<ion-title>Chip</ion-title>
		</ion-toolbar>
	</ion-header>

	<ion-content fullscreen>
		<ion-list-header>Basic</ion-list-header>
		<p>
			<ion-chip>
				<ion-label>Default</ion-label>
			</ion-chip>
			<ion-chip>
				<ion-icon icon={checkmarkCircle} />
				<ion-label>Icon</ion-label>
			</ion-chip>
			<ion-chip>
				<ion-avatar>
					<img
						alt="avatar"
						src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjYzVkYmZmIiBkPSJNMCAwaDUxMnY1MTJIMHoiLz48cGF0aCBkPSJNMjU2IDMwNGM2MS42IDAgMTEyLTUwLjQgMTEyLTExMlMzMTcuNiA4MCAyNTYgODBzLTExMiA1MC40LTExMiAxMTIgNTAuNCAxMTIgMTEyIDExMnptMCA0MGMtNzQuMiAwLTIyNCAzNy44LTIyNCAxMTJ2NTZoNDQ4di01NmMwLTc0LjItMTQ5LjgtMTEyLTIyNC0xMTJ6IiBmaWxsPSIjODJhZWZmIi8+PC9zdmc+" />
				</ion-avatar>
				<ion-label>Avatar</ion-label>
			</ion-chip>
		</p>

		<ion-list-header>Colors</ion-list-header>
		<p>
			<ion-chip color="primary">
				<ion-label>Primary</ion-label>
			</ion-chip>
			<ion-chip color="secondary">
				<ion-label>Secondary</ion-label>
			</ion-chip>
			<ion-chip color="tertiary">
				<ion-label>Tertiary</ion-label>
			</ion-chip>
			<ion-chip color="success">
				<ion-label>Success</ion-label>
			</ion-chip>
			<ion-chip color="warning">
				<ion-label>Warning</ion-label>
			</ion-chip>
			<ion-chip color="danger">
				<ion-label>Danger</ion-label>
			</ion-chip>
		</p>

		<ion-list-header>Outline</ion-list-header>
		<p>
			<ion-chip outline color="primary">
				<ion-label>Primary</ion-label>
			</ion-chip>
			<ion-chip outline color="secondary">
				<ion-label>Secondary</ion-label>
			</ion-chip>
			<ion-chip outline color="tertiary">
				<ion-label>Tertiary</ion-label>
			</ion-chip>
			<ion-chip outline color="success">
				<ion-label>Success</ion-label>
			</ion-chip>
			<ion-chip outline color="warning">
				<ion-label>Warning</ion-label>
			</ion-chip>
			<ion-chip outline color="danger">
				<ion-label>Danger</ion-label>
			</ion-chip>
		</p>

		<ion-list-header>Icons</ion-list-header>
		<p>
			<ion-chip outline color="primary">
				<ion-icon icon={pin} />
				<ion-label>Madison</ion-label>
				<ion-icon icon={closeCircle} />
			</ion-chip>
			<ion-chip outline color="secondary">
				<ion-icon icon={wine} />
				<ion-label>Nightlife</ion-label>
				<ion-icon icon={closeCircle} />
			</ion-chip>
			<ion-chip outline color="tertiary">
				<ion-icon icon={restaurant} />
				<ion-label>Dining</ion-label>
				<ion-icon icon={closeCircle} />
			</ion-chip>
			<ion-chip outline color="dark">
				<ion-icon icon={videocam} />
				<ion-label>Entertainment</ion-label>
				<ion-icon icon={closeCircle} />
			</ion-chip>
		</p>
	</ion-content>
</IonPage>

<style>
	p {
		margin-left: 16px;
		margin-top: 0;
	}
</style>

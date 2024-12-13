<script lang="ts">
	import SourceButton from '$lib/components/SourceButton.svelte';
	import { IonPage } from 'ionic-svelte';

	const toggleAction = (event) => {
		console.log('Toggle action', event.detail, event.srcElement.name);
	};
</script>

<style>
	ion-label{
		position: relative;
		z-index: -10;
	}
</style>

<IonPage>
	<ion-header translucent={true}>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-menu-button />
			</ion-buttons>
			<ion-buttons slot="end">
				<SourceButton name="Toggle" />
			</ion-buttons>
			<ion-title>Toggle</ion-title>
		</ion-toolbar>
	</ion-header>

	<ion-content fullscreen>
		<ion-list>
			<ion-item>
				<ion-label>Blueberry</ion-label>
				<ion-toggle on:ionChange={toggleAction} slot="start" name="blueberry" checked />
			</ion-item>

			<ion-item>
				<ion-label>Apple</ion-label>
				<ion-toggle
					on:ionChange={toggleAction}
					slot="start"
					name="apple"
					color="secondary"
					checked />
			</ion-item>

			<ion-item>
				<ion-label>Grape</ion-label>
				<ion-toggle
					on:ionChange={toggleAction}
					slot="start"
					name="grape"
					color="tertiary"
					checked />
			</ion-item>

			<ion-item>
				<ion-label>Kiwi</ion-label>
				<ion-toggle on:ionChange={toggleAction} slot="start" name="kiwi" color="success" checked />
			</ion-item>

			<ion-item>
				<ion-label>Orange</ion-label>
				<ion-toggle
					on:ionChange={toggleAction}
					slot="start"
					name="banana"
					color="warning"
					checked />
			</ion-item>

			<ion-item>
				<ion-label>Cherry</ion-label>
				<ion-toggle on:ionChange={toggleAction} slot="start" name="cherry" color="danger" checked />
			</ion-item>

			<ion-item>
				<ion-label>Banana</ion-label>
				<ion-toggle on:ionChange={toggleAction} slot="start" name="banana" color="light" checked />
			</ion-item>

			<ion-item>
				<ion-label>Cantaloupe</ion-label>
				<ion-toggle
					on:ionChange={toggleAction}
					slot="start"
					name="cantaloupe"
					color="medium"
					checked />
			</ion-item>

			<ion-item>
				<ion-label>Blackberry</ion-label>
				<ion-toggle
					on:ionChange={toggleAction}
					slot="start"
					name="blackberry"
					color="dark"
					checked />
			</ion-item>
		</ion-list>
	</ion-content>
</IonPage>

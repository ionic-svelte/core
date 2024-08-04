<script lang="ts">
	import SourceButton from '$lib/components/SourceButton.svelte';
	import { IonPage } from 'ionic-svelte';

	const toggleAction = (event) => {
		console.log('Toggle action', event.detail, event.srcElement.name);
	};
</script>

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
				<ion-label>Color: Primary</ion-label>
				<ion-toggle on:ionChange={toggleAction} slot="start" name="primary" checked />
			</ion-item>

			<ion-item>
				<ion-label>Color: Secondary</ion-label>
				<ion-toggle
					on:ionChange={toggleAction}
					slot="start"
					name="secondary"
					color="secondary"
					checked
				/>
			</ion-item>

			<ion-item>
				<ion-label>Color: Tertiary</ion-label>
				<ion-toggle
					on:ionChange={toggleAction}
					slot="start"
					name="tertiary"
					color="tertiary"
					checked
				/>
			</ion-item>

			<ion-item>
				<ion-label>Color: Success</ion-label>
				<ion-toggle on:ionChange={toggleAction} slot="start" name="success" color="success" checked />
			</ion-item>

			<ion-item>
				<ion-label>Color: Warning</ion-label>
				<ion-toggle
					on:ionChange={toggleAction}
					slot="start"
					name="warning"
					color="warning"
					checked
				/>
			</ion-item>

			<ion-item>
				<ion-label>Color: Danger</ion-label>
				<ion-toggle on:ionChange={toggleAction} slot="start" name="danger" color="danger" checked />
			</ion-item>

			<ion-item>
				<ion-label>Color: Light</ion-label>
				<ion-toggle on:ionChange={toggleAction} slot="start" name="light" color="light" checked />
			</ion-item>

			<ion-item>
				<ion-label>Color: Medium</ion-label>
				<ion-toggle
					on:ionChange={toggleAction}
					slot="start"
					name="medium"
					color="medium"
					checked
				/>
			</ion-item>

			<ion-item>
				<ion-label>Color: Dark</ion-label>
				<ion-toggle
					on:ionChange={toggleAction}
					slot="start"
					name="dark"
					color="dark"
					checked
				/>
			</ion-item>
		</ion-list>
	</ion-content>
</IonPage>

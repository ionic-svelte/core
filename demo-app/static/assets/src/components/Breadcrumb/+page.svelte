<script lang="ts">
	import { arrowForward, home, folder } from 'ionicons/icons';
	import SourceButton from '$lib/components/SourceButton.svelte';

	import { onMount } from 'svelte';
	import { IonPage } from 'ionic-svelte';
	import type { BreadcrumbCollapsedClickEventDetail } from '@ionic/core';

	let expandBreadcrumb: HTMLIonBreadcrumbsElement;
	let popoverBreadcrumb;
	let popover: HTMLIonPopoverElement;

	onMount(() => {
		expandBreadcrumb.maxItems = 4;
	});

	const expandCollapsedClick = () => {
		expandBreadcrumb.maxItems = undefined;
	};

	const popoverCollapsedClick = (ev) => {
		popover.present(ev);
	};
</script>

<IonPage>
	<ion-header translucent={true}>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-menu-button />
			</ion-buttons>
			<ion-buttons slot="end">
				<SourceButton name="Breadcrumb" />
			</ion-buttons>
			<ion-title>Breadcrumb</ion-title>
		</ion-toolbar>
	</ion-header>

	<ion-content fullscreen>
		<ion-list inset={true}>
			<ion-list-header>Basic</ion-list-header>
			<ion-breadcrumbs>
				<ion-breadcrumb href="#"> Home </ion-breadcrumb>
				<ion-breadcrumb href="#electronics"> Electronics </ion-breadcrumb>
				<ion-breadcrumb href="#photography"> Photography </ion-breadcrumb>
			</ion-breadcrumbs>
		</ion-list>

		<ion-list inset={true}>
			<ion-list-header>Colors</ion-list-header>
			<ion-breadcrumbs color="secondary">
				<ion-breadcrumb href="#"> Home </ion-breadcrumb>
				<ion-breadcrumb href="#electronics"> Electronics </ion-breadcrumb>
				<ion-breadcrumb href="#photography"> Photography </ion-breadcrumb>
			</ion-breadcrumbs>
		</ion-list>

		<ion-list inset={true}>
			<ion-list-header>Icons - Start</ion-list-header>
			<ion-breadcrumbs>
				<ion-breadcrumb href="#">
					<ion-icon slot="start" icon={home} />
					Home
				</ion-breadcrumb>
				<ion-breadcrumb href="#files">
					<ion-icon slot="start" icon={folder} />
					Files
				</ion-breadcrumb>
				<ion-breadcrumb href="#projects">
					<ion-icon slot="start" icon={folder} />
					Projects
				</ion-breadcrumb>
			</ion-breadcrumbs>
		</ion-list>

		<ion-list inset={true}>
			<ion-list-header>Icons - End</ion-list-header>
			<ion-breadcrumbs>
				<ion-breadcrumb href="#">
					Home <ion-icon slot="end" icon={home} />
				</ion-breadcrumb>
				<ion-breadcrumb href="#files">
					Files <ion-icon slot="end" icon={folder} />
				</ion-breadcrumb>
				<ion-breadcrumb href="#projects">
					Projects <ion-icon slot="end" icon={folder} />
				</ion-breadcrumb>
			</ion-breadcrumbs>
		</ion-list>

		<ion-list inset={true}>
			<ion-list-header>Custom Separator - Icon</ion-list-header>
			<ion-breadcrumbs>
				<ion-breadcrumb href="#">
					Home
					<ion-icon slot="separator" icon={arrowForward} />
				</ion-breadcrumb>
				<ion-breadcrumb href="#electronics">
					Electronics
					<ion-icon slot="separator" icon={arrowForward} />
				</ion-breadcrumb>
				<ion-breadcrumb href="#photography">
					Photography
					<ion-icon slot="separator" icon={arrowForward} />
				</ion-breadcrumb>
			</ion-breadcrumbs>
		</ion-list>

		<ion-list inset={true}>
			<ion-list-header>Max Items</ion-list-header>
			<ion-breadcrumbs max-items={4}>
				<ion-breadcrumb href="#"> Home </ion-breadcrumb>
				<ion-breadcrumb href="#electronics"> Electronics </ion-breadcrumb>
				<ion-breadcrumb href="#photography"> Photography </ion-breadcrumb>
				<ion-breadcrumb href="#cameras"> Cameras </ion-breadcrumb>
				<ion-breadcrumb href="#film"> Film </ion-breadcrumb>
				<ion-breadcrumb> 35 mm </ion-breadcrumb>
			</ion-breadcrumbs>
		</ion-list>

		<ion-list inset={true}>
			<ion-list-header>Items Before Collapse</ion-list-header>
			<ion-breadcrumbs max-items={4} items-before-collapse={2}>
				<ion-breadcrumb href="#"> Home </ion-breadcrumb>
				<ion-breadcrumb href="#electronics"> Electronics </ion-breadcrumb>
				<ion-breadcrumb href="#photography"> Photography </ion-breadcrumb>
				<ion-breadcrumb href="#cameras"> Cameras </ion-breadcrumb>
				<ion-breadcrumb href="#film"> Film </ion-breadcrumb>
				<ion-breadcrumb> 35 mm </ion-breadcrumb>
			</ion-breadcrumbs>
		</ion-list>

		<ion-list inset={true}>
			<ion-list-header>Items After Collapse</ion-list-header>
			<ion-breadcrumbs max-items={4} items-after-collapse={3}>
				<ion-breadcrumb href="#"> Home </ion-breadcrumb>
				<ion-breadcrumb href="#electronics"> Electronics </ion-breadcrumb>
				<ion-breadcrumb href="#photography"> Photography </ion-breadcrumb>
				<ion-breadcrumb href="#cameras"> Cameras </ion-breadcrumb>
				<ion-breadcrumb href="#film"> Film </ion-breadcrumb>
				<ion-breadcrumb> 35 mm </ion-breadcrumb>
			</ion-breadcrumbs>
		</ion-list>

		<ion-list inset={true}>
			<ion-list-header>Items Before And After Collapse</ion-list-header>
			<ion-breadcrumbs max-items={4} items-before-collapse={0} items-after-collapse={3}>
				<ion-breadcrumb href="#"> Home </ion-breadcrumb>
				<ion-breadcrumb href="#electronics"> Electronics </ion-breadcrumb>
				<ion-breadcrumb href="#photography"> Photography </ion-breadcrumb>
				<ion-breadcrumb href="#cameras"> Cameras </ion-breadcrumb>
				<ion-breadcrumb href="#film"> Film </ion-breadcrumb>
				<ion-breadcrumb> 35 mm </ion-breadcrumb>
			</ion-breadcrumbs>
		</ion-list>

		<ion-list inset={true}>
			<ion-list-header>Expand on Collapsed Indicator Click</ion-list-header>
			<ion-breadcrumbs
				id="expand"
				bind:this={expandBreadcrumb}
				on:ionCollapsedClick={expandCollapsedClick}>
				<ion-breadcrumb href="#"> Home </ion-breadcrumb>
				<ion-breadcrumb href="#electronics"> Electronics </ion-breadcrumb>
				<ion-breadcrumb href="#photography"> Photography </ion-breadcrumb>
				<ion-breadcrumb href="#cameras"> Cameras </ion-breadcrumb>
				<ion-breadcrumb href="#film"> Film </ion-breadcrumb>
				<ion-breadcrumb> 35 mm </ion-breadcrumb>
			</ion-breadcrumbs>

			<ion-popover alignment="center" bind:this={popover}>
				<ion-content>
					<ion-list inset={true}>
						<ion-item href="#electronics">
							<ion-label>Electronics</ion-label>
						</ion-item>
						<ion-item href="#photography">
							<ion-label>Photography</ion-label>
						</ion-item>
						<ion-item href="#cameras">
							<ion-label>Cameras</ion-label>
						</ion-item>
						<ion-item href="#film">
							<ion-label>Film</ion-label>
						</ion-item>
					</ion-list>
				</ion-content>
			</ion-popover>
		</ion-list>

		<ion-list inset={true}>
			<ion-list-header>Popover on Collapsed Indicator Click</ion-list-header>
			<ion-breadcrumbs
				max-items={4}
				id="popover"
				bind:this={popoverBreadcrumb}
				on:ionCollapsedClick={popoverCollapsedClick}>
				<ion-breadcrumb href="#"> Home </ion-breadcrumb>
				<ion-breadcrumb href="#electronics"> Electronics </ion-breadcrumb>
				<ion-breadcrumb href="#photography"> Photography </ion-breadcrumb>
				<ion-breadcrumb href="#cameras"> Cameras </ion-breadcrumb>
				<ion-breadcrumb href="#film"> Film </ion-breadcrumb>
				<ion-breadcrumb> 35 mm </ion-breadcrumb>
			</ion-breadcrumbs>
		</ion-list>
	</ion-content>
</IonPage>

<style>
	:root {
		--ion-safe-area-top: 20px;
		--ion-safe-area-bottom: 22px;
	}

	ion-breadcrumbs.ios {
		padding: 6px 8px;
	}

	ion-breadcrumbs.md {
		padding: 0 4px;
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import { goto } from '$app/navigation';

	export let ionTabsDidChange = () => {};
	export let ionTabsWillChange = () => {};
	export let slot = 'bottom';

	let ionTabBarElement: HTMLIonTabsElement;

	export let tabs: {
		label: string;
		icon: string;
		tab: string;
	}[] = [];

	let controller: HTMLIonTabsElement;
	onMount(async () => {
		// reassignment needed after onMount
		controller = ionTabBarElement;
		const { pathname } = $page.url;
		let tabInPathName = pathname.split('/').at(-1);

		if (tabInPathName && tabs.length > 0) {
			// if we have don't have a route to a tab, let's take the first one
			if (!tabs.map((tab) => tab.tab).includes(tabInPathName)) {
				await goto(tabInPathName + '/' + tabs[0]?.tab);
				controller.select(tabs[0]?.tab);
			}
		} else {
			// panic - incorrect route or no tabs provided
			console.warn('Incorrect route or no tabs supplied for IonTabs', $page.url, tabs);
			goto('/');
			return;
		}
	});

	const tabBarClick = async (selectedTab: string) => {
		await goto(selectedTab);
		controller.select(selectedTab);
	};
</script>

<ion-tabs
	on:ionTabsDidChange={ionTabsDidChange}
	on:ionTabsWillChange={ionTabsWillChange}
	bind:this={ionTabBarElement}
>
	<slot />

	{#if slot === 'bottom' || slot === ''}
		<ion-tab-bar slot="bottom">
			{#each tabs as tab}
				<ion-tab-button
					tab={tab.tab}
					on:keydown={() => {
						tabBarClick(tab.tab);
					}}
					on:click={() => {
						tabBarClick(tab.tab);
					}}
				>
					<ion-label>{tab.label}</ion-label>
					<ion-icon icon={tab.icon} />
				</ion-tab-button>
			{/each}
		</ion-tab-bar>
	{/if}

	{#if slot === 'top'}
		<ion-tab-bar slot="top">
			{#each tabs as tab}
				<ion-tab-button
					tab={tab.tab}
					on:keydown={() => {
						tabBarClick(tab.tab);
					}}
					on:click={() => {
						tabBarClick(tab.tab);
					}}
				>
					<ion-label>{tab.label}</ion-label>
					<ion-icon icon={tab.icon} />
				</ion-tab-button>
			{/each}
		</ion-tab-bar>
	{/if}
</ion-tabs>

<script>
	// @ts-nocheck
	import { navigating, page } from '$app/stores';
	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';

	export let ionTabsDidChange = () => {};
	export let ionTabsWillChange = () => {};
	export let slot = 'bottom';

	/**
    An array of tab objects containing label, icon, and tab properties.
    @type {{label: string; icon: string; tab: string;}[]}
    */
	export let tabs = [];

	let ionTabBarElement;
	let controller;

	// we need relative path for the goto to function properly and to allow for relative tab definitions
	const { pathname } = $page.url;
	const cleanedPath = pathname.replace(/\/+$/, ''); // Strip trailing slashes, so we can get the last part of the path correctly. (e.g. /pages/homepage/ -> /pages/homepage)
	const pathSplit = cleanedPath.split('/');
	let currentTabName = pathSplit[pathSplit.length - 1]; // we don't want to use at(-1) because of old browsers
	let relativePath = cleanedPath.replace(currentTabName, '');

	// we need to capture the router changes - to support a-href navigation and other stuff
	$: if ($navigating && $navigating.to) {
		tabs.forEach(async (tab) => {
			if ($navigating.to.url.pathname.includes(relativePath + tab.tab)) {
				currentTabName = tab.tab;
				await goto($navigating.to.url.pathname);
				controller.select(tab.tab);
			}
		});
	}

	onMount(async () => {
		// reassignment needed after onMount
		controller = ionTabBarElement;
		controller.select(currentTabName);
	});

	const tabBarClick = async (selectedTab) => {
		currentTabName = selectedTab;
		await goto(relativePath + selectedTab);
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

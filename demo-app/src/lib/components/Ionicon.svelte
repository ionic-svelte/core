<script lang="ts">
	import { addIcons } from 'ionicons';
	import type { IonIcon } from 'ionicons/components/ion-icon';
	import { onMount, tick } from 'svelte';

	let component: IonIcon;
	let componentIsReady = false;
	let cssClass = undefined;

	export { cssClass as class };

	export let color = undefined;
	export let flipRtl: boolean | undefined = undefined;
	export let icon: string | undefined = undefined;
	export let ios: string | undefined = undefined;
	export let lazy = false;
	export let md: string | undefined = undefined;
	export let mode = undefined;
	export let name: string | undefined = undefined;
	export let sanitize = true;
	export let size: 'large' | 'small' | undefined = undefined;
	export let src: string | undefined = undefined;

	export let iosIcon: string | undefined = undefined;
	export let mdIcon: string | undefined = undefined;

	export let toSlot = undefined;

	export const addNamedSlot = (element: HTMLElement, slot) => {
		if (element && slot) {
			element.setAttribute('slot', slot);
		}
	};

	export const componentOnReady = (element: any, callback: any) => {
		if (element && element?.componentOnReady) {
			element.componentOnReady().then((resolvedElement: any) => callback(resolvedElement));
		} else {
			raf(() => callback(element));
		}
	};

	export const defineCustomElement = (tagName: string, customElement: any): void => {
		if (typeof customElements === 'undefined') return;

		if (!customElements.get(tagName)) {
			customElements.define(tagName, customElement);
		}
	};

	export const raf = (h: any): number => {
		if (typeof requestAnimationFrame === 'function') {
			return requestAnimationFrame(h);
		}
		return setTimeout(h);
	};

	onMount(async () => {
		const IonIcon = (await import('ionicons/components/ion-icon')).IonIcon;

		defineCustomElement('ion-icon', IonIcon);

		if (iosIcon && ios) {
			addIcons({
				[ios]: iosIcon
			});
		}

		if (mdIcon && md) {
			addIcons({
				[md]: mdIcon
			});
		}

		componentIsReady = true;

		await tick();

		addNamedSlot(component, toSlot);
	});
</script>

{#if componentIsReady}
	<ion-icon
		class={cssClass}
		{color}
		flip-rtl={flipRtl}
		{ios}
		{icon}
		{lazy}
		{md}
		{mode}
		{name}
		{sanitize}
		{size}
		{src}
		bind:this={component}
		on:click />
{/if}

<style>
</style>

<script lang="ts">
	import { onMount, type SvelteComponent } from 'svelte';

	export let root: any;
	export let animated = true;
	export let animation: ((baseEl: any, opts?: any) => Animation) | undefined = undefined;
	export let rootParams: undefined | { [key: string]: any } = undefined;
	export let swipeGesture: boolean | undefined = undefined;

	//@ts-ignore - if we export ionNav, then the root element actually has access to ion-nav via this variable
	let ionNav: HTMLIonNavElement = undefined;

	const createHTMLCompFromSvelte = (
		component: new (...args: any) => SvelteComponent,
		componentProps: { [key: string]: any } = {}
	) => {
		const divWrapper = document.createElement('div');
		const contentID = 'id' + Date.now();
		divWrapper.id = contentID;

		let navContent = document.createElement('div');
		navContent.id = contentID + '-content';
		navContent.style.height = '100%';

		divWrapper.appendChild(navContent);
		document.body.appendChild(divWrapper);

		const props = {
			...componentProps,
			ionNav
		};

		const svelteComponent = new component({
			target: navContent,
			props
		});

		return divWrapper;
	};

	let rootComponent: HTMLElement;

	onMount(() => {
		//@ts-ignore
		rootComponent = createHTMLCompFromSvelte(root, {});
	});
</script>

<ion-nav
	bind:this={ionNav}
	{animated}
	{animation}
	root-params={rootParams}
	swipe-gesture={swipeGesture}
	root={rootComponent}
	on:ionNavDidChange
	on:ionNavWillChange
/>

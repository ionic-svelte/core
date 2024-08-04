<script>
	import { onMount } from 'svelte';

	/**
	 * The root component of a Svelte app.
	 * @type {SvelteComponent}
	 */
	export let root;

	/**
	 * Whether or not the component is animated.
	 * @type {boolean|undefined}
	 */
	export let animated = true;

	/**
	 * An animation function that takes a base element and optional options and returns an Animation object.
	 * @type {((baseEl: any, opts?: any) => Animation)|undefined}
	 */
	export let animation;

	/**
	 * Optional parameters for the root component.
	 * @type {undefined|{[key: string]: any}}
	 */
	export let rootParams;

	/**
	 * Whether or not swipe gesture is enabled.
	 * @type {boolean|undefined}
	 */
	export let swipeGesture;

	let ionNav;
	let rootComponent;

	const createHTMLCompFromSvelte = (component, componentProps = {}) => {
		const divWrapper = document.createElement('div');
		const contentID = 'id' + Date.now();
		divWrapper.id = contentID;

		let navContent = document.createElement('div');

		divWrapper.appendChild(navContent);
		document.body.appendChild(divWrapper);

		const props = {
			...componentProps
		};

		const svelteComponent = new component({
			target: navContent,
			props
		});

		return divWrapper;
	};

	onMount(() => {
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

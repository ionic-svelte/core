<script>
	import { fly } from 'svelte/transition';

	import { onDestroy, onMount } from 'svelte';
	// import { beforeNavigate } from "@sveltejs/kit/src/runtime/app/navigation"; // gives error - https://github.com/sveltejs/kit/issues/5879

	export const ionViewWillEnter = () => {};
	export const ionViewDidEnter = () => {};
	export const ionViewWillLeave = undefined; // unsupported as we cannot use beforeNavigate in npm library
	export const ionViewDidLeave = () => {};
	export let animation = { in: { x: 1000, duration: 300 }, out: { x: -1000, duration: 300 } };

	ionViewWillEnter();

	// to include when beforeNavigate issue is fixed
	//  beforeNavigate(() => {
	//    ionViewWillLeave();
	//    return true;
	//  });

	onMount(() => {
		ionViewDidEnter();
	});

	onDestroy(() => {
		if (ionViewWillLeave != undefined) {
			console.warn(
				`ionViewWillLeave is not implemented - use beforeNavigate in $app/navigation. See  https://github.com/sveltejs/kit/issues/5879`
			);
		}

		ionViewDidLeave();
	});
</script>

<div class="ion-page" in:fly={animation.in} out:fly={animation.out}>
	<slot />
</div>

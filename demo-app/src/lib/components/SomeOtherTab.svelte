<script lang="ts">
	import { scale } from 'svelte/transition';
	import { elasticInOut } from 'svelte/easing';
	import { tick, onMount, afterUpdate } from 'svelte';

	let show = false;

	// restart of animation not working - need page events like ionViewWillEnter
	onMount(async () => {
		console.log('sutff');
		show = false;
		await tick();
		show = true;
	});

	afterUpdate(() => {
		console.log('Afterupdate');
	});
</script>

<ion-content>
	<br />
	<br />
	<br />
	<br />

	<div class="ion-text-center">
		{#key show}
			<img
				src="/assets/svelte-ionic-logo.png"
				alt="Great success"
				in:scale={{ duration: 1900, easing: elasticInOut }} />

			<div in:scale={{ delay: 400, duration: 1900, easing: elasticInOut }}>Great success!</div>
		{/key}
	</div>
</ion-content>

<style>
	img {
		width: 60%;
		max-width: 90vw;
		max-height: 90vh;
	}
</style>

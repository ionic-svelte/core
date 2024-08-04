<script lang="ts">
	import SourceButton from '$lib/components/SourceButton.svelte';
	import { IonPage } from 'ionic-svelte';
	import { spring } from 'svelte/motion';

	let coords = spring(
		{ x: 50, y: 50 },
		{
			stiffness: 0.1,
			damping: 0.25
		}
	);

	let size = spring(10);
</script>

<svelte:head>
	<title>Ionic Companion - Svelte Spring</title>
</svelte:head>

<IonPage>
	<ion-header translucent={true}>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-menu-button />
			</ion-buttons>
			<ion-buttons slot="end">
				<SourceButton name="SvelteSpring" />
			</ion-buttons>
			<ion-title>Svelte Spring </ion-title>
		</ion-toolbar>
	</ion-header>

	<ion-content fullscreen class="ion-padding">
		<p>
			Svelte spring is part of Svelte's nifty runtime features to easily add animation to DOM
			elements.This code comes from the Svelte Tutorial on <a
				href="https://svelte.dev/tutorial/spring"
				target="_blank"
				>https://svelte.dev/tutorial/spring
			</a>
		</p>
		"The spring function is an alternative to tweened that often works better for values that are frequently
		changing. In this example we have two stores — one representing the circle's coordinates, and one
		representing its size. Let's convert them to springs."
		<br /><br />Waggle your mouse around, and try dragging the sliders to get a feel for how they
		affect the spring's behaviour. Notice that you can adjust the values while the spring is still
		in motion.
		<br /><br />

		<div style="position: absolute; right: 1em;">
			<label>
				<h3>stiffness ({coords.stiffness})</h3>
				<input bind:value={coords.stiffness} type="range" min="0" max="1" step="0.01" />
			</label>

			<label>
				<h3>damping ({coords.damping})</h3>
				<input bind:value={coords.damping} type="range" min="0" max="1" step="0.01" />
			</label>
		</div>

		<svg
			on:mousemove={(e) => {
				console.log('Coords', e);
				coords.set({ x: e.clientX, y: e.clientY });
			}}
			on:mousedown={() => size.set(30)}
			on:mouseup={() => size.set(10)}>
			<circle cx={$coords.x} cy={$coords.y} r={$size} />
		</svg>
	</ion-content>
</IonPage>

<style>
	svg {
		width: 100%;
		height: 100%;
		background: gray;
	}
	circle {
		fill: #ff3e00;
	}
</style>

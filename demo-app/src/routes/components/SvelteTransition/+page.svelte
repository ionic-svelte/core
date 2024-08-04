<script lang="ts">
	import SourceButton from '$lib/components/SourceButton.svelte';
	import { IonPage } from 'ionic-svelte';

	import { elasticOut } from 'svelte/easing';

	import { fade, fly, slide } from 'svelte/transition';

	let status = 'waiting...';
	let visible = true;

	function spin(node, { duration }) {
		return {
			duration,
			css: (t) => {
				const eased = elasticOut(t);

				return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					color: hsl(
						${Math.trunc(t * 360)},
						${Math.min(100, 1000 - 1000 * t)}%,
						${Math.min(50, 500 - 500 * t)}%
					);`;
			}
		};
	}

	function typewriter(node, { speed = 1 }) {
		const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: (t) => {
				const i = Math.trunc(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}

	let showItems = true;
	let i = 5;
	let items = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

	let number = 0;
</script>

<svelte:head>
	<title>Ionic Companion - Svelte Transition</title>
</svelte:head>

<IonPage>
	<ion-header translucent={true}>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-menu-button />
			</ion-buttons>
			<ion-buttons slot="end">
				<SourceButton name="SvelteTransition" />
			</ion-buttons>
			<ion-title>Svelte Transition </ion-title>
		</ion-toolbar>
	</ion-header>

	<ion-content fullscreen class="ion-padding">
		<p>
			Svelte transition is part of Svelte's nifty runtime features to easily add animation to DOM
			elements.This code comes from the Svelte Tutorial on <a
				href="https://svelte.dev/tutorial/transition"
				target="_blank"
				>https://svelte.dev/tutorial/transition
			</a>
		</p>
		<br />

		"We can make more appealing user interfaces by gracefully transitioning elements into and out of
		the DOM. Svelte makes this very easy with the transition directive."
		<br /><br />Click the checkbox to see the transitions
		<br /><br />
		<label>
			<input type="checkbox" bind:checked={visible} />
			visible - event listener status: {status}
		</label>
		{#if visible}
			<p transition:fade>Fades in and out</p>

			<p transition:fly={{ y: 2000, duration: 2000 }}>Flies in and out</p>

			<p in:fly={{ y: 200, duration: 2000 }} out:fade>Flies in, fades out</p>

			<div class="centered" in:spin={{ duration: 8000 }} out:fade>
				<div class="span">transitions!</div>
			</div>

			<p transition:typewriter>The quick brown fox jumps over the lazy dog</p>

			<p
				transition:fly={{ y: 200, duration: 2000 }}
				on:introstart={() => (status = 'intro started')}
				on:outrostart={() => (status = 'outro started')}
				on:introend={() => (status = 'intro ended')}
				on:outroend={() => (status = 'outro ended')}>
				Flies in and out with event listener
			</p>
		{/if}

		<br /><br />
		<label>
			<input type="checkbox" bind:checked={showItems} />
			Local transitions demo - Show List
		</label>
		<br />
		Move slider
		<label>
			<input type="range" bind:value={i} max="10" />
		</label>
		{#if showItems}
			{#each items.slice(0, i) as item}
				<div class="numberlist" transition:slide|local>
					{item}
				</div>
			{/each}
		{/if}

		<div>
			<h2>
				Key block demo - The number is:
				{#key number}
					<span style="display: inline-block" in:fly={{ y: -20 }}>
						{number}
					</span>
				{/key}
			</h2>
		</div>
		<br />
		<ion-button
			on:click={() => {
				number += 1;
			}}>
			Increment number of transitions demo
		</ion-button>
	</ion-content>
</IonPage>

<style>
	.centered {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.span {
		position: absolute;
		transform: translate(-50%, -50%);
		font-size: 4em;
	}

	.numberlist {
		padding: 0.5em 0;
		border-top: 1px solid #eee;
	}
</style>

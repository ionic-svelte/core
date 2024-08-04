<script lang="ts">
	import SourceButton from '$lib/components/SourceButton.svelte';
	import { IonPage } from 'ionic-svelte';
	import { trash } from 'ionicons/icons';

	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 2000),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	let uid = 1;

	let todos = [
		{ id: uid++, done: false, description: 'write some docs' },
		{ id: uid++, done: false, description: 'start writing blog post' },
		{ id: uid++, done: true, description: 'buy some milk' },
		{ id: uid++, done: false, description: 'mow the lawn' },
		{ id: uid++, done: false, description: 'feed the turtle' },
		{ id: uid++, done: false, description: 'fix some bugs' }
	];

	function add(input) {
		const todo = {
			id: uid++,
			done: false,
			description: input.value
		};

		todos = [todo, ...todos];
		input.value = '';
	}

	//    <ion-icon class="button" icon={trash} on:click={() => remove(todo)} slot="end" /> - not working
	function remove(todo) {
		todos = todos.filter((t) => t !== todo);
	}

	function mark(todo, done) {
		todo.done = done;
		remove(todo);
		todos = todos.concat(todo);
	}
</script>

<svelte:head>
	<title>Ionic Companion - Svelte Animate</title>
</svelte:head>

<IonPage>
	<ion-header translucent={true}>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-menu-button />
			</ion-buttons>
			<ion-buttons slot="end">
				<SourceButton name="SvelteAnimate" />
			</ion-buttons>
			<ion-title>Svelte Animate </ion-title>
		</ion-toolbar>
	</ion-header>

	<ion-content fullscreen class="ion-padding">
		<p>
			Svelte aninate is part of Svelte's nifty runtime features to easily add animation to DOM
			elements.This code comes from the Svelte Tutorial on <a
				href="https://svelte.dev/tutorial/animate"
				target="_blank"
				>https://svelte.dev/tutorial/animate
			</a>
		</p>
		<br />

		"In the previous chapter, we used deferred transitions to create the illusion of motion as
		elements move from one todo list to the other. To complete the illusion, we also need to apply
		motion to the elements that aren't transitioning. For this, we use the animate directive."
		<br /><br />Add items using the input and/or click have them move on the kanban board.
		<br /><br />

		<div class="board">
			<div class="left">
				<h2>Todos</h2>
				<ion-input
					placeholder="what needs to be done?"
					on:keydown={(e) => e.key === 'Enter' && add(e.target)} />
				{#each todos.filter((t) => !t.done) as todo (todo.id)}
					<ion-item in:receive={{ key: todo.id }} out:send={{ key: todo.id }} animate:flip>
						<label>
							<input type="checkbox" on:change={() => mark(todo, true)} />
							{todo.description}
						</label>
					</ion-item>
				{/each}
			</div>

			<div class="right">
				<h2>Done</h2>
				{#each todos.filter((t) => t.done) as todo (todo.id)}
					<ion-item in:receive={{ key: todo.id }} out:send={{ key: todo.id }} animate:flip>
						<label class="done">
							<input type="checkbox" checked on:change={() => mark(todo, false)} />
							{todo.description}
						</label>
					</ion-item>
				{/each}
			</div>
		</div>
	</ion-content>
</IonPage>

<style>
	.board {
		display: grid;
		grid-template-columns: 50% 50%;
		grid-template-areas: 'left right';
		grid-gap: 1em;
		max-width: 36em;
		margin: 0 auto;
	}

	.left {
		grid-area: left;
	}

	.right {
		grid-area: right;
	}

	h2 {
		font-size: 2em;
		font-weight: 200;
		user-select: none;
		margin: 0 0 0.5em 0;
	}

	label {
		position: relative;
		line-height: 1.2;
		padding: 0.5em 2.5em 0.5em 2em;
		margin: 0 0 0.5em 0;
		border-radius: 2px;
		user-select: none;
		border: 1px solid hsl(240, 8%, 70%);
		background-color: hsl(240, 8%, 93%);
		color: #333;
	}

	input[type='checkbox'] {
		position: absolute;
		left: 0.5em;
		top: 0.6em;
		margin: 0;
	}

	.done {
		border: 1px solid hsl(240, 8%, 90%);
		background-color: hsl(240, 8%, 98%);
	}
</style>

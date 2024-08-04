<script lang="ts">
	import { onMount } from 'svelte';
	import { users } from '$lib/services/users';

	import SourceButton from '$lib/components/SourceButton.svelte';
	import { IonPage } from 'ionic-svelte';

	let length = 0;
	let infiniteScroll: HTMLIonInfiniteScrollElement;
	let itemList: {
		name: string;
		avatar: string;
		created: string;
	}[] = [];

	onMount(() => {
		appendItems(20);
	});

	const infiniteAction = async () => {
		if (length < users.length) {
			console.log('Loading data...');
			await wait(500);
			infiniteScroll.complete();
			appendItems(5);
			console.log('Done');
		} else {
			console.log('No More Data');
			infiniteScroll.disabled = true;
		}
	};

	function appendItems(count: number) {
		console.log('length is', length);
		const originalLength = length;

		for (let i = 0; i < count; i++) {
			const newItem = {
				name: users[i + originalLength].name,
				avatar: `https://www.gravatar.com/avatar/${i + originalLength}?d=monsterid&f=y`,
				created: users[i + originalLength].created
			};

			itemList = [...itemList, newItem];
			length++;
		}
	}

	function wait(time: number) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(undefined);
			}, time);
		});
	}
</script>

<svelte:head>
	<title>Ionic Companion - Infinitescroll</title>
</svelte:head>

<IonPage>
	<ion-header translucent={true}>
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-menu-button />
			</ion-buttons>
			<ion-buttons slot="end">
				<SourceButton name="Infinitescroll" />
			</ion-buttons>
			<ion-title>Accounts - Scroll down to see it work!</ion-title>
		</ion-toolbar>
	</ion-header>

	<ion-content fullscreen>
		<ion-list>
			{#each itemList as item}
				<ion-item>
					<ion-avatar slot="start">
						<img src={item.avatar} alt={item.name} />
					</ion-avatar>
					<ion-label>
						<h2>{item.name}</h2>
						<p>Created {item.created}</p>
					</ion-label>
				</ion-item>
			{/each}
		</ion-list>

		<ion-infinite-scroll
			on:ionInfinite={infiniteAction}
			threshold="100px"
			bind:this={infiniteScroll}>
			<ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Loading more data..." />
		</ion-infinite-scroll>
	</ion-content>
</IonPage>

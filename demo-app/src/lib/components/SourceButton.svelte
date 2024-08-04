<script lang="ts">
	import { code } from 'ionicons/icons';

	import SourceViewer from '$lib/components/SourceViewer.svelte';

	export let name: string;
	let pulseSourceViewer = false;
	let isOpen = false;

	const showSource = async () => {
		isOpen = true;
	};

	setTimeout(() => {
		pulseSourceViewer = true;
		// and stop the pulse
		setTimeout(() => {
			pulseSourceViewer = false;
		}, 10000);
	}, 20000);
</script>

<div on:click={showSource} on:keyup={showSource}>
	<ion-icon icon={code} class:pulseSourceViewer />
</div>

<ion-modal
	is-open={isOpen}
	on:ionModalDidDismiss={() => {
		isOpen = false;
	}}>
	<SourceViewer {name} />
</ion-modal>

<style>
	ion-icon {
		font-size: 200%;
	}

	@keyframes shadow-pulse {
		0% {
			box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2);
		}
		100% {
			box-shadow: 0 0 0 135px rgba(0, 0, 0, 0);
		}
	}

	.pulseSourceViewer {
		border-radius: 50%;
		animation: shadow-pulse 1s infinite;
	}

	ion-modal {
		--width: 100%;
		--height: 100%;
	}
</style>

<script>
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
			
</script>

<Navigation />
<slot></slot>

<style></style>

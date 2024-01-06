<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/** @type {Asset} */ export let asset;
</script>

<img
	class="object-contain max-h-full max-w-full"
	src={asset.avatar.url}
	alt={asset.file_name}
	on:error={() => dispatch('had-error')}
/>

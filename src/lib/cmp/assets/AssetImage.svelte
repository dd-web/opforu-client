<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/** @type {Asset} */ export let asset;
	/**
	 * @TODO !!! This is using Source for Avatar previews currently because making avatars is not yet implemented.
	 */
</script>

<img
	class="object-contain max-h-full max-w-full"
	src={asset.source.url}
	alt={asset.file_name}
	on:error={() => dispatch('had-error')}
/>

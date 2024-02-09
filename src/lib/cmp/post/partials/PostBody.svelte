<script>
	import AssetGrid from '$lib/cmp/assets/AssetGrid.svelte';

	/** @type {IAsset[]} */ export let assets = [];
	/** @type {string} */ export let content = '';
</script>

<div class="px-4 my-2">
	{#if assets && assets?.length > 0}
		<div class="aspect-square max-w-xs w-full float-left mr-8">
			<AssetGrid {assets} />
		</div>
	{/if}

	<div class="ml-4" class:col-span-2={assets && assets?.length === 0}>
		{@html content}
	</div>
	<slot />
</div>

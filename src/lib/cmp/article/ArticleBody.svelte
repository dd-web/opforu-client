<script>
	import AssetGrid from '$lib/cmp/assets/AssetGrid.svelte';

	/** @type {Article} */ export let article;
</script>

<div class="px-4 my-2">
	{#if article?.assets && article?.assets instanceof Array && article?.assets?.length > 0}
		<div class="aspect-square max-w-xs w-full float-left mr-8">
			<AssetGrid assets={article.assets} />
		</div>
	{/if}

	{@html article.body}
</div>

<script>
	import AssetGrid from '$lib/cmp/assets/AssetGrid.svelte';

	/** @type {IArticleComment} */ export let comment;
</script>

<div class="px-4 my-2">
	<slot name="assets">
		{#if comment?.assets && comment?.assets instanceof Array && comment?.assets?.length > 0}
			<div class="aspect-square max-w-xs w-full float-left mr-8">
				<AssetGrid assets={comment?.assets} />
			</div>
		{/if}
	</slot>

	<slot name="body">
		<div>
			{@html comment?.body}
		</div>
	</slot>
</div>

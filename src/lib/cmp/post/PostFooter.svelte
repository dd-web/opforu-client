<script>
	import TagList from '../partials/TagList.svelte';

	/** @type {Date|string} */ export let createdAt;
	/** @type {Date|string} */ export let updatedAt;
	/** @type {string[]} */ export let tagList = [];
</script>

<footer class="clear-left flex p-2 items-center justify-between">
	{#if tagList && tagList?.length > 0}
		<TagList tags={tagList} />
	{/if}

	<div>
		<span class="text-sm text-zinc-500" title={new Date(createdAt).toLocaleTimeString()}>
			Created
			<span class="italic text-zinc-400">
				{new Date(createdAt).toLocaleDateString()}
			</span>
		</span>

		<span class="text-zinc-500 mx-2">|</span>

		<span class="text-sm text-zinc-500" title={new Date(updatedAt).toLocaleTimeString()}>
			Updated
			<span class="italic text-zinc-400">
				{new Date(updatedAt).toLocaleDateString()}
			</span>
		</span>
	</div>
</footer>

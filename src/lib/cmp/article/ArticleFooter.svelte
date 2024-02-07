<script>
	import TagList from '../partials/TagList.svelte';

	/** @type {Article} */ export let article;
</script>

<footer class="clear-left flex p-2 items-center justify-between">
	{#if article && article?.tags instanceof Array}
		<TagList tags={article.tags} />
	{/if}

	<div>
		<span class="text-sm text-zinc-500" title={new Date(article.created_at).toLocaleTimeString()}>
			Created
			<span class="italic text-zinc-400">
				{new Date(article.created_at).toLocaleDateString()}
			</span>
		</span>

		<span class="text-zinc-500 mx-2">|</span>

		<span class="text-sm text-zinc-500" title={new Date(article.updated_at).toLocaleTimeString()}>
			Updated
			<span class="italic text-zinc-400">
				{new Date(article.updated_at).toLocaleDateString()}
			</span>
		</span>
	</div>
</footer>

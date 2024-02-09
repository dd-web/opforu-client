<script>
	import TagList from '$lib/cmp/partials/TagList.svelte';
	import PostDateDisplay from '$lib/cmp/post/partials/PostDateDisplay.svelte';

	/** @type {IArticle} */ export let article;
</script>

<footer class="clear-left flex p-2 items-center justify-between">
	{#if article && article?.tags instanceof Array}
		<TagList tags={article.tags} />
	{/if}

	<PostDateDisplay createdAt={article?.created_at} updatedAt={article?.updated_at} deletedAt={article?.deleted_at} />
</footer>

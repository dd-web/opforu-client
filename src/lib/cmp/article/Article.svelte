<script>
	import ArticleHeader from '$lib/cmp/article/partials/ArticleHeader.svelte';
	import ArticleBody from '$lib/cmp/article/partials/ArticleBody.svelte';
	import ArticleFooter from '$lib/cmp/article/partials/ArticleFooter.svelte';

	/** @type {IArticle} */ export let article;

	/**
	 * Context menu handler
	 * @param {CustomEvent} event
	 */
	function handleCtx(event) {
		console.log('article context event:', event.detail);
	}
</script>

<article class="bg-zinc-900 rounded-md">
	<slot name="header">
		<ArticleHeader on:article-ctx={handleCtx} {article} />
	</slot>

	<slot name="body">
		<ArticleBody {article} />
	</slot>

	<slot name="footer">
		<ArticleFooter {article} />
	</slot>
</article>

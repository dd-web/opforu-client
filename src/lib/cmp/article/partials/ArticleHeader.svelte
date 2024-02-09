<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import CircularIconBtn from '$lib/cmp/global/CircularIconBtn.svelte';
	import Hamburger from '$lib/icons/Hamburger.svelte';
	import ArticleSubHeader from '$lib/cmp/article/partials/ArticleSubHeader.svelte';

	/** @type {IArticle} */ export let article;

	/** Context menu handler (unused currently) */
	function handleArticleCtxMenu() {
		dispatch('article-ctx', { slug: article?.slug });
	}
</script>

<header>
	<div class="flex items-center gap-4 p-2">
		<slot name="left">
			<div class="-mb-1 pl-2">
				<CircularIconBtn on:click={handleArticleCtxMenu}>
					<Hamburger />
				</CircularIconBtn>
			</div>
		</slot>

		<slot name="center">
			<h2 class="text-limit text-title text-attention link">
				<a href="/news/{article.slug}">{article.title}</a>
			</h2>
		</slot>

		<slot name="right">
			<div class="ml-auto mr-2">
				<span class="text-sm text-zinc-500">
					<span class="italic text-zinc-400">{article?.comments?.length ?? 0}</span>
					Comments
				</span>
			</div>
		</slot>
	</div>

	<slot name="sub-header">
		<ArticleSubHeader author={article?.author} co_authors={article?.co_authors} />
	</slot>
</header>

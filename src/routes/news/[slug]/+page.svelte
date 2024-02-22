<script>
	import { newActionBarItem } from '$lib/utils/resolvers';
	import { goto } from '$app/navigation';

	import Article from '$lib/cmp/article/Article.svelte';
	import ContentActionBar from '$lib/cmp/layout/ContentActionBar.svelte';
	import ArticleHeader from '$lib/cmp/article/partials/ArticleHeader.svelte';
	import ArticleSubHeader from '$lib/cmp/article/partials/ArticleSubHeader.svelte';
	import ArticleComment from '$lib/cmp/article/ArticleComment.svelte';
	import CommentForm from '$lib/cmp/form/CommentForm.svelte';

	/** @type {import('./$types').PageData} */ export let data;

	$: console.log('news data', data);

	$: title = `${data?.article?.title[0].toUpperCase() + data?.article?.title?.slice(1)}`;

	/** @type {Record<string, any>} */
	let componentMap = {
		commentForm: CommentForm
	};

	/** @type {typeof CommentForm|null} */ let component = null;

	let actionButtons = [newActionBarItem('new-comment', 'commentForm', 'Comment')];

	/**
	 * Handle action bar events
	 * @param {CustomEvent} event
	 */
	const handleActionEvent = (event) => {
		if (event.detail === 'commentForm' && !data?.account) {
			const qs = new URLSearchParams();
			qs.append('next', 'article');
			qs.append('id', data?.article?.slug);
			goto(`/login?${qs.toString()}`);
		} else {
			component = component === componentMap[event.detail] ? null : componentMap[event.detail];
		}
	};

	/** Resets the current component to null, rendering nothing */
	const handleResetComponent = () => {
		component = null;
	};

	/**
	 * Context menu handler
	 * @param {CustomEvent} event
	 */
	const handleArticleCtx = (event) => {
		console.log('article context evnet (single article (root))', event.detail);
	};
</script>

<svelte:head>
	<title>OPforU News - {title}</title>
</svelte:head>

<div class="px-8">
	<h1 class="text-4xl mt-4 text-center capitalize text-blue-100">News</h1>
	<p class="text-base italic text-center text-neutral-300">Latest news and information</p>

	<hr class="my-8 opacity-20" />
	<h2 class="text-2xl mt-4 text-center capitalize text-zinc-200">{data?.article?.title}</h2>
	<hr class="my-8 opacity-20" />

	<ContentActionBar on:new-comment={handleActionEvent} items={actionButtons} />

	<svelte:component this={component} on:close={handleResetComponent} />

	<Article article={data?.article}>
		<ArticleHeader on:article-ctx={handleArticleCtx} article={data?.article} slot="header">
			<div slot="center">
				<ArticleSubHeader author={data?.article?.author} co_authors={data?.article?.co_authors} />
			</div>

			<div slot="sub-header">
				<span />
			</div>
		</ArticleHeader>
	</Article>

	<section class="py-8 flex flex-col gap-8">
		{#each data?.article?.comments as comment (comment._id)}
			<ArticleComment {comment} />
		{:else}
			<p>Article has no comments yet</p>
		{/each}
	</section>
</div>

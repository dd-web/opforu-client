<script>
	import ArticleHeader from './ArticleHeader.svelte';
	import ArticleBody from './ArticleBody.svelte';
	import ArticleFooter from './ArticleFooter.svelte';

	/** @type {Article} */ export let article;

	// temporary type fix until assets implemented on articles
	/** @type {Article & {assets: Asset[]}} */
	$: articleTypeFix = Object.assign(article, { assets: [] });

	$: console.log('article', article);
</script>

<article class="bg-zinc-900 rounded-md">
	<ArticleHeader {article} />

	<ArticleBody article={articleTypeFix} />

	<ArticleFooter {article} />
</article>

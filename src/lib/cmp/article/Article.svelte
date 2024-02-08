<script>
	import ArticleHeader from './ArticleHeader.svelte';
	import ArticleBody from './ArticleBody.svelte';
	import ArticleFooter from './ArticleFooter.svelte';

	/** @type {Article} */ export let article;
</script>

<article class="bg-zinc-900 rounded-md">
	<ArticleHeader {article} />

	<ArticleBody {article} />

	<ArticleFooter {article} />
</article>

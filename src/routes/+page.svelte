<script>
	import { browser } from '$app/environment';

	import ArticleListItem from '$lib/cmp/article/ArticleListItem.svelte';
	import Pagination from '$lib/cmp/global/Pagination.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	console.log('root +page.svelte', data);

	// $: if (browser) console.log('articles', data);
</script>

<div>
	<h1 class="text-4xl mt-4 text-center capitalize text-blue-100">OPforU News</h1>
	<h2 class="text-base italic text-center text-neutral-300">Latest news and information from the team</h2>

	<section class="pt-8 flex flex-col gap-8">
		{#each data.articles as article (article._id)}
			<ArticleListItem {article} />
		{:else}
			<p>No Articles Found</p>
		{/each}
	</section>
	<Pagination paginator={data.pagination} path="/" />
</div>

<script>
	import Pagination from '$lib/cmp/global/Pagination.svelte';
	import Article from '$lib/cmp/article/Article.svelte';

	/** @type {import('./$types').PageData} */ export let data;
</script>

<svelte:head>
	<title>OPforU News</title>
	<meta name="description" content="OPforU - Latest news and information" />
</svelte:head>

<div class="px-8">
	<h1 class="text-4xl mt-4 text-center capitalize text-blue-100">News</h1>
	<p class="text-base italic text-center text-neutral-300">Latest news and information</p>

	<section class="pt-8 flex flex-col gap-8">
		{#each data.articles as article (article._id)}
			<Article {article} />
		{:else}
			<p>No Articles Found</p>
		{/each}
	</section>
	<Pagination paginator={data.pagination} path="/" />
</div>

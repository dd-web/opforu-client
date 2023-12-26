<script>
	import { browser } from '$app/environment';

	import Pagination from '$lib/cmp/global/Pagination.svelte';
	import StaffTag from '$lib/cmp/global/StaffTag.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	$: if (browser) console.log('root +page.svelte', data);
</script>

<svelte:head>
	<title>OPforU News</title>
	<meta name="description" content="OPforU - Latest news and information" />
</svelte:head>

<div class="px-8">
	<h1 class="text-4xl mt-4 text-center capitalize text-blue-100">OPforU News</h1>
	<h2 class="text-base italic text-center text-neutral-300">Latest news and information from the team</h2>

	<section class="pt-8 flex flex-col gap-8">
		{#each data.articles as article (article._id)}
			<article class="bg-zinc-900">
				<StaffTag account={article.author} />
				<div>
					<h3 title={article.title} class="text-2xl font-semibold">
						<a href="/news/{article.slug}">{article.title}</a>
					</h3>
				</div>
			</article>
		{:else}
			<p>No Articles Found</p>
		{/each}
	</section>
	<Pagination paginator={data.pagination} path="/" />
</div>

<script>
	import Pagination from '$lib/cmp/global/Pagination.svelte';
	import Article from '$lib/cmp/article/Article.svelte';
	import StaffTag from '$lib/cmp/identity/StaffTag.svelte';

	import AdminTag from '$lib/cmp/global/AdminTag.svelte';
	import ModTag from '$lib/cmp/global/ModTag.svelte';

	/** @type {import('./$types').PageData} */ export let data;
</script>

<svelte:head>
	<title>OPforU News</title>
	<meta name="description" content="OPforU - Latest news and information" />
</svelte:head>

<div class="px-8">
	<h1 class="text-4xl mt-4 text-center capitalize text-blue-100">News</h1>
	<h2 class="text-base italic text-center text-neutral-300">Latest news and information</h2>

	<section class="pt-8 flex flex-col gap-8">
		{#each data.articles as article (article._id)}
			<!-- <article class="bg-zinc-900">
				<div>
					<h3 title={article.title} class="text-2xl font-semibold px-2">
						<a href="/news/{article.slug}">{article.title}</a>
					</h3>
					<div class="flex gap-2 px-4">
						<span class="italic text-zinc-500">Written by</span>
						<AdminTag account={article.author} />
						{#each article.co_authors as coauthor, i (coauthor.username + i)}
							{#if coauthor.role === 'admin'}
								<AdminTag account={coauthor} />
							{:else if coauthor.role === 'mod'}
								<ModTag account={coauthor} />
							{/if}
						{/each}
					</div>
				</div>
			</article> -->
			<Article {article} />
		{:else}
			<p>No Articles Found</p>
		{/each}
	</section>
	<Pagination paginator={data.pagination} path="/" />
</div>

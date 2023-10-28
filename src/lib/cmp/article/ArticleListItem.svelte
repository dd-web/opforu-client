<script>
	import StaffTag from '../global/StaffTag.svelte';

	/** @type {Article} */
	export let article;
</script>

<article id="article-{article.slug}" class="mx-2 relative">
	<!-- article header -->
	<header class="bg-neutral-900 pt-2 pb-4 px-4 rounded-t-lg">
		<h3
			title={article.title}
			class="text-blue-200 text-lg capitalize whitespace-nowrap overflow-hidden text-ellipsis w-full"
		>
			<a href="/articles/{article.slug}">{article.title}</a>
		</h3>

		<hr class="mb-3 mt-1 opacity-20" />

		<div class="flex gap-2 items-center">
			<p>
				Author: <StaffTag account={article.author} />
				{#if article.co_authors.length > 0}
					Co-Authors:
					{#each article.co_authors as co_author (co_author.username)}
						<StaffTag account={co_author} />
					{/each}
				{/if}
			</p>
		</div>
	</header>

	<!-- content -->
	<div class="py-2 px-4 bg-zinc-700 text-zinc-200">
		<!-- media -->
		<div />

		<!-- body -->
		<div>
			{@html article.body}
		</div>
	</div>

	<!-- article footer -->
	<footer class="py-2 px-4 bg-neutral-900 rounded-b-lg">
		<p>{article.created_at}</p>
	</footer>
</article>

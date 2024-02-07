<script>
	import StaffTag from '../identity/StaffTag.svelte';
	import CircularIconBtn from '$lib/cmp/global/CircularIconBtn.svelte';
	import Hamburger from '$lib/icons/Hamburger.svelte';

	/** @type {Article} */ export let article;
</script>

<header>
	<div class="flex items-center gap-4 p-2 h-12">
		<div class="-mb-1 pl-2">
			<CircularIconBtn>
				<Hamburger />
			</CircularIconBtn>
		</div>

		<h3 class="text-limit text-title text-attention link">
			<a href="/news/{article.slug}">{article.title}</a>
		</h3>
	</div>

	<div class="px-4 inline-flex gap-2 py-2">
		<StaffTag account={article.author} />
		{#if article?.co_authors instanceof Array && article?.co_authors?.length > 0}
			<span class="italic font-thin text-zinc-700"> |</span>
		{/if}
		{#each article?.co_authors as coauthor (coauthor.username)}
			<StaffTag account={coauthor} />
		{/each}
		<span />
	</div>
</header>

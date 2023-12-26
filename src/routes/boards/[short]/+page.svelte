<script>
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	// import ThreadListItem from '$lib/cmp/board/ThreadListItem.svelte';
	import ThreadPreview from '$lib/cmp/board/ThreadPreview.svelte';
	import Pagination from '$lib/cmp/global/Pagination.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	$: title = `${data.board.title[0].toUpperCase() + data.board.title.slice(1)}`;
	// $: if (browser) console.log('data (short)', data);
</script>

<svelte:head>
	<title>{title} - OPforU</title>
	<meta name="description" content={data.board.description} />
</svelte:head>

<div class="px-8">
	<h1 class="text-4xl mt-4 text-center capitalize text-blue-100">{data.board.title}</h1>
	<h2 class="text-base italic text-center text-neutral-300">{data.board.description}</h2>
	<!-- <hr class="mx-12 mt-4 opacity-25" /> -->

	<section class="mt-8">
		{#each data.threads as thread (thread._id)}
			<ThreadPreview {thread} />
		{:else}
			<p>No Threads Found</p>
		{/each}
	</section>
	<Pagination paginator={data.pagination} path="/boards/{data.board.short}/" />
</div>

<style lang="postcss">
</style>

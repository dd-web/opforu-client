<script>
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import ThreadListItem from '$lib/cmp/board/ThreadListItem.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	$: if (browser) console.log('data (short)', data);
</script>

<div>
	<h1 class="text-4xl mt-4 text-center capitalize text-blue-100">{data.board.title}</h1>
	<h2 class="text-base italic text-center text-neutral-300">{data.board.description}</h2>
	<hr class="mx-12 mt-4 opacity-25" />

	<section class="py-8">
		{#each data.threads.records as thread (thread._id)}
			<ThreadListItem {thread} />
		{:else}
			<p>No Threads Found</p>
		{/each}
	</section>
</div>

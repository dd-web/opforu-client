<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	import ThreadContent from '$lib/cmp/thread/ThreadContent.svelte';
	import PostContent from '$lib/cmp/thread/PostContent.svelte';
	import ReplyForm from '$lib/cmp/thread/ReplyForm.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	$: boardTitle = `${data.board.title[0].toUpperCase() + data.board.title.slice(1)}`;
	$: threadTitle = `${data.thread.title
		.split(' ')
		.map((word) => word[0]?.toUpperCase() + word.slice(1))
		.join(' ')
		.replace('undefined', '')}`;

	$: if (browser) console.log('data (thread)', data, threadTitle);
</script>

<svelte:head>
	<title>{boardTitle} - {threadTitle} - OPforU</title>
	<meta name="description" content={data.thread.title} />
</svelte:head>

<div class="px-8">
	<h1 class="text-4xl mt-4 text-center capitalize text-blue-100">{data.board.title}</h1>
	<h2 class="text-base italic text-center text-neutral-300">{data.board.description}</h2>
	<hr class="my-8 opacity-20" />
	<h3 class="text-2xl mt-4 text-center capitalize text-zinc-200">{data.thread.title}</h3>
	<hr class="my-8 opacity-20" />
	<div class="my-8">
		<!-- <ReplyForm /> -->
	</div>

	<section class="mt-8 mb-4 flex flex-col gap-4">
		<ThreadContent thread={data.thread} />

		{#each data?.thread?.posts as post (post.post_number)}
			<PostContent {post} thread={data?.thread} />
		{/each}
	</section>
</div>

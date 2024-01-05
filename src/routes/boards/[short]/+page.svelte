<script>
	import ThreadPreview from '$lib/cmp/board/ThreadPreview.svelte';
	import Pagination from '$lib/cmp/global/Pagination.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	$: title = `${data.board.title[0].toUpperCase() + data.board.title.slice(1)}`;

	let showThreadForm = false;
	const toggleThreadFormVis = () => (showThreadForm = !showThreadForm);
</script>

<svelte:head>
	<title>{title} - OPforU</title>
	<meta name="description" content={data.board.description} />
</svelte:head>

<div class="px-8">
	<h1 class="text-4xl mt-4 text-center capitalize text-blue-100">{data.board.title}</h1>
	<h2 class="text-base italic text-center text-neutral-300">{data.board.description}</h2>

	<div class="my-8 p-4 bg-zinc-900 rounded-md">
		<button on:click={toggleThreadFormVis} type="button" class="btn-primary h-10 px-4 rounded-md font-semibold"
			>New Thread</button
		>
	</div>

	{#if showThreadForm}
		<form class="bg-zinc-900 rounded-md p-4">
			<div class="grid grid-cols-[1fr,_1fr] gap-2">
				<div>
					<label for="title">Title</label>
					<input type="text" id="title" name="title" required class="w-full" />

					<label for="content">Content</label>
					<textarea id="content" name="content" required rows="10" class="w-full resize-none" />
				</div>

				<div>
					<label for="image">Image</label>
					<input type="file" id="image" name="image" />
				</div>
			</div>
			<button type="submit" class="btn-primary h-10 px-4 rounded-md font-semibold">Post</button>
		</form>
	{/if}

	<section class="mt-8 mb-4 flex flex-col gap-4">
		{#each data.threads as thread (thread._id)}
			<ThreadPreview {thread} />
		{:else}
			<p>No Threads Found</p>
		{/each}
	</section>
	<Pagination paginator={data.pagination} path="/boards/{data.board.short}/" />
</div>

<style lang="postcss">
	input,
	textarea {
		@apply px-2 py-1 rounded-md border-none outline-none ring-2 ring-zinc-600 text-black;
		@apply focus-visible:ring-blue-300;
	}

	label::after {
		@apply mx-[0.1rem] text-zinc-200;
		content: ':';
	}
</style>

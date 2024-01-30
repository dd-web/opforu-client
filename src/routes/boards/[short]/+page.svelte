<script>
	import { goto, invalidateAll } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';

	import ThreadPreview from '$lib/cmp/board/ThreadPreview.svelte';
	import Pagination from '$lib/cmp/global/Pagination.svelte';
	import FileUploadArea from '$lib/cmp/global/FileUploadArea.svelte';
	import { createFileAttachmentData } from '$lib/utils/localfile';

	/** @type {import('./$types').PageData} */ export let data;
	/** @type {import('./$types').ActionData }*/ export let form;
	/** @type {boolean} */ let showThreadForm = false;
	/** @type {LocalFileInfo[]} */ let newThreadFiles = [];

	$: title = `${data.board.title[0].toUpperCase() + data.board.title.slice(1)}`;

	/** Toggle's thread form visibility */
	const toggleThreadFormVis = () => (showThreadForm = !showThreadForm);

	/**
	 * Handles new thread form submissions
	 * @param {{ currentTarget: EventTarget & HTMLFormElement }} event
	 */
	async function handleNewThread(event) {
		const formData = new FormData(event.currentTarget);
		const fileData = newThreadFiles.map((data) => createFileAttachmentData(data));
		formData.append('assets', JSON.stringify(fileData));

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidateAll();
			await goto(`/boards/${data.board.short}/${result?.data?.thread_id}`);
		}

		applyAction(result);
	}
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
		<form method="POST" on:submit|preventDefault={handleNewThread} action="?/newThread" class="bg-zinc-900 rounded-md">
			<div class="grid grid-cols-[50%,50%]">
				<div class="mx-2">
					<label for="title">Title</label>
					<input type="text" id="title" name="title" required class="w-full" />

					<label for="content">Content</label>
					<textarea id="content" name="content" required rows="10" class="w-full resize-none" />
				</div>

				<FileUploadArea bind:filesAttached={newThreadFiles} />
			</div>
			<button type="submit" class="btn-primary h-10 px-4 rounded-md font-semibold m-2">Post</button>
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

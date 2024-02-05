<script>
	import { goto, invalidateAll } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import { createFileAttachmentData } from '$lib/utils/localfile';

	import Thread from '$lib/cmp/thread/Thread.svelte';
	import FileUploadArea from '$lib/cmp/global/FileUploadArea.svelte';

	/** @type {import('./$types').PageData} */ export let data;
	/** @type {import('./$types').ActionData }*/ export let form;

	$: console.log('FORM? (thread)', form);
	$: console.log('thread', data?.thread);

	$: boardTitle = `${data.board.title[0].toUpperCase() + data.board.title.slice(1)}`;
	$: threadTitle = `${data.thread.title
		.split(' ')
		.map((word) => word[0]?.toUpperCase() + word.slice(1))
		.join(' ')
		.replace('undefined', '')}`;

	/** @type {boolean} */ let showReplyForm = false;
	/** @type {LocalFileInfo[]} */ let replyFiles = [];

	/** Toggle reply form visibility */
	const toggleReplyFormVis = () => (showReplyForm = !showReplyForm);

	// $: if (browser) console.log('data (thread)', data, threadTitle);

	/**
	 * Handles new reply form submissions
	 * @param {{ currentTarget: EventTarget & HTMLFormElement }} event
	 */
	async function handleNewReply(event) {
		const formData = new FormData(event.currentTarget);
		const fileData = replyFiles.map((data) => createFileAttachmentData(data));
		formData.append('assets', JSON.stringify(fileData));

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: formData
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidateAll();
			await goto(
				`/boards/${data.board.short}/${data.thread.slug}#post-${data.thread.slug}-${result?.data?.post_number}`
			);
		}

		applyAction(result);
	}
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

	<div class="my-8 p-4 bg-zinc-900 rounded-md">
		<button on:click={toggleReplyFormVis} type="button" class="btn-primary h-10 px-4 rounded-md font-semibold"
			>Reply</button
		>
	</div>

	{#if showReplyForm}
		<form method="POST" on:submit|preventDefault={handleNewReply} action="?/reply" class="bg-zinc-900 rounded-md">
			<div class="grid grid-cols-[50%,50%]">
				<div class="mx-2">
					<label for="content">Content</label>
					<textarea id="content" name="content" required rows="10" class="w-full resize-none" />
				</div>

				<FileUploadArea uploadPath={`/boards/${data.board.short}?/fileUpload`} bind:filesAttached={replyFiles} />
			</div>
			<button type="submit" class="btn-primary h-10 px-4 rounded-md font-semibold m-2">Post</button>
		</form>
	{/if}
	<Thread thread={data?.thread} />
</div>

<style lang="postcss">
	textarea {
		@apply px-2 py-1 rounded-md border-none outline-none ring-2 ring-zinc-600 text-black;
		@apply focus-visible:ring-blue-300;
	}

	label::after {
		@apply mx-[0.1rem] text-zinc-200;
		content: ':';
	}
</style>

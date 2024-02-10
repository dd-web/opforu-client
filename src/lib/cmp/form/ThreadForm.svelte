<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { goto, invalidateAll } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import { createFileAttachmentData } from '$lib/utils/localfile';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	import FileUploadArea from '$lib/cmp/global/FileUploadArea.svelte';

	/** @type {ILocalFileInfo[]} */ let newThreadFiles = [];
	/** @type {HTMLFormElement=}*/ let formElement;

	/**
	 * Handle new thread form submission
	 * @param {IFormEvent} event
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
			resetForm();
			applyAction(result);
			await invalidateAll();
			dispatch('close');
			await goto(`/boards/${$page.data.board.short}/${result?.data?.thread_id}`);
		}
	}

	/** Handles resetting form fields including files to empty values */
	const resetForm = () => {
		if (!browser || !formElement) return;
		formElement.reset();
		newThreadFiles = [];
	};
</script>

<form
	bind:this={formElement}
	method="POST"
	on:submit|preventDefault={handleNewThread}
	action="?/newThread"
	class="bg-zinc-900 rounded-md"
>
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

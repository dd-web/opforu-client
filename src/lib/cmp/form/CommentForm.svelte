<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { goto, invalidateAll } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import { createFileAttachmentData } from '$lib/utils/localfile';
	import { browser } from '$app/environment';

	import FileUploadArea from '$lib/cmp/global/FileUploadArea.svelte';

	/** @type {ILocalFileInfo[]} */ let replyFiles = [];
	/** @type {HTMLFormElement=}*/ let formElement;

	/**
	 * Handles new reply form submissions
	 * @param {IFormEvent} event
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
			resetForm();
			applyAction(result);
			await invalidateAll();
			dispatch('close');
			await goto(`/news/${result?.data?.article_id}#comment-${result?.data?.comment_number}`);
		}
	}

	/** Handles resetting form fields including files to empty values */
	const resetForm = () => {
		if (!browser || !formElement) return;
		formElement.reset();
		replyFiles = [];
	};
</script>

<form
	bind:this={formElement}
	method="POST"
	on:submit|preventDefault={handleNewReply}
	action="?/comment"
	class="bg-zinc-900 rounded-md mb-4"
>
	<div class="grid grid-cols-[50%,50%]">
		<div class="mx-2">
			<label class="anotize" for="content">Content</label>
			<textarea id="content" name="content" required rows="12" class="w-full resize-none" />
		</div>

		<FileUploadArea bind:filesAttached={replyFiles} />
	</div>

	<div class="flex justify-between items-center p-2">
		<button type="submit" class="btn-primary h-10 px-4 rounded-md font-semibold">Post</button>

		<div class="">
			<input type="checkbox" name="anonymize" id="staff-anonimity-select" />
			<label for="staff-anonimity-select">Post Anonymously</label>
		</div>
	</div>
</form>

<style lang="postcss">
	textarea {
		@apply px-2 py-1 rounded-md border-none outline-none ring-2 ring-zinc-600 text-black;
		@apply focus-visible:ring-blue-300;
	}

	label.anotize::after {
		@apply mx-[0.1rem] text-zinc-200;
		content: ':';
	}
</style>

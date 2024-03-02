<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { goto, invalidateAll } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import { createFileAttachmentData } from '$lib/utils/localfile';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	import FileUploadArea from '$lib/cmp/global/FileUploadArea.svelte';
	import Modal from '$lib/cmp/layout/Modal.svelte';
	import Gear from '$lib/icons/Gear.svelte';

	/** @type {ILocalFileInfo[]} */ let newThreadFiles = [];
	/** @type {HTMLFormElement=}*/ let formElement;
	let threadFlags = {
		nsfw: false,
		nsfl: false,
		media_required: false
	};

	let flagModalVisible = false;

	/**
	 * Handle new thread form submission
	 * @param {IFormEvent} event
	 */
	async function handleNewThread(event) {
		const formData = new FormData(event.currentTarget);
		const fileData = newThreadFiles.map((data) => createFileAttachmentData(data));
		formData.append('assets', JSON.stringify(fileData));
		formData.append('flags', JSON.stringify(threadFlags));

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

	const handleShowFlagsModal = () => {
		console.log('flags', threadFlags);
		flagModalVisible = true;
	};

	const handleHideFlagsModal = () => {
		console.log('flags', threadFlags);
		flagModalVisible = false;
	};
</script>

{#if flagModalVisible}
	<Modal bind:visible={flagModalVisible}>
		<ul>
			<li>
				<label for="nsfw">Not Safe For Work (NSFW)</label>
				<span />
				<input type="checkbox" name="nsfw" id="nsfw" bind:checked={threadFlags['nsfw']} />
			</li>
			<li>
				<label for="nsfl">Not Safe For Life (NSFL)</label>
				<span />
				<input type="checkbox" name="nsfl" id="nsfl" bind:checked={threadFlags['nsfl']} />
			</li>
			<li>
				<label for="reqmedia">Replies Require Media</label>
				<input type="checkbox" name="media_required" id="reqmedia" bind:checked={threadFlags['media_required']} />
			</li>
		</ul>
		<button type="button" class="btn-primary h-8 px-4 block mx-auto mt-4" on:click={handleHideFlagsModal}>Done</button>
	</Modal>
{/if}

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

	<div class="flex items-center">
		<button type="submit" class="btn-primary h-10 px-4 font-semibold m-2">Post</button>
		<button type="reset" class="btn-generic h-10 px-4 bg-zinc-800" on:click={resetForm}>Clear</button>

		<button
			type="button"
			class="btn-generic h-8 w-8 ml-auto mr-2 fill-zinc-600 hover:fill-zinc-500 focus-visible:fill-zinc-500 bg-zinc-800 p-1"
			on:click={handleShowFlagsModal}
		>
			<Gear />
		</button>
	</div>
</form>

<style lang="postcss">
	input[type='text'],
	textarea {
		@apply px-2 py-1 rounded-md border-none outline-none ring-2 ring-zinc-600 text-black;
		@apply focus-visible:ring-blue-300;
	}

	label::after {
		@apply mx-[0.1rem] text-zinc-200;
		content: ':';
	}

	ul {
		@apply flex flex-col gap-2;
	}

	ul li {
		@apply flex justify-between items-center gap-2;
	}
</style>

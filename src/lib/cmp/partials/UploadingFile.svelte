<script>
	import { createEventDispatcher } from 'svelte';
	import { clickoutside } from '$lib/actions/clickoutside';
	import { autofocus } from '$lib/actions/autofocus';
	const dispatch = createEventDispatcher();

	import CircularIconBtn from '../global/CircularIconBtn.svelte';
	import EllipsisVertical from '$lib/icons/EllipsisVertical.svelte';
	import FileSizeFormatter from '../global/FileSizeFormatter.svelte';

	import Modal from '../layout/Modal.svelte';

	/** @type {LocalFileInfo?=} */ export let file;

	let contextMenuVisible = false;
	let modalVisible = false;
	let descriptText = file?.description ?? '';

	/** Description save handler */
	const handleSaveDescription = () => {
		dispatch('update', { ...file, description: descriptText });
		modalVisible = false;
		contextMenuVisible = false;
	};

	/** Description cancel handler */
	const handleCancelDescription = () => {
		descriptText = file?.description ?? '';
		modalVisible = false;
		contextMenuVisible = false;
	};

	/** Context menu handler for description modal */
	const handleShowDescriptionModal = () => {
		modalVisible = true;
		contextMenuVisible = false;
	};
</script>

{#if modalVisible}
	<Modal handleClickOutside={handleCancelDescription} bind:visible={modalVisible}>
		<div class="flex flex-col">
			<label for="desscription">Set description</label>
			<input
				use:autofocus
				on:keypress={(/** @type {KeyboardEvent} */ e) => e.key === 'Enter' && handleSaveDescription()}
				bind:value={descriptText}
				on:submit={() => console.log('submitted')}
				id="description"
				name="description"
				type="text"
			/>
		</div>
		<div class="flex justify-between mt-4">
			<button type="button" class="btn-primary px-2 py-1 hover:text-white" on:click={handleSaveDescription}>Save</button
			>
			<button type="button" class="btn-generic bg-zinc-700 px-2 py-1" on:click={handleCancelDescription}>Cancel</button>
		</div>
	</Modal>
{/if}

{#if file}
	<div class="max-w-[12rem] bg-zinc-800 px-2 flex flex-col mb-4">
		<div class="flex px-2 pt-2 gap-2 items-center justify-between relative">
			<span title={file.name} class="block whitespace-nowrap overflow-hidden text-ellipsis text-blue-100 text-sm"
				>{file.name}</span
			>
			<CircularIconBtn on:click={() => (contextMenuVisible = true)}>
				<EllipsisVertical />
			</CircularIconBtn>

			{#if contextMenuVisible}
				<div
					class="absolute flex flex-col gap-2 bg-zinc-900 p-2 -right-2 top-8 rounded-md border border-zinc-700"
					use:clickoutside
					on:clickoutside={() => (contextMenuVisible = false)}
				>
					<button
						type="button"
						class="btn-generic bg-zinc-700 px-2 text-sm py-1 w-full"
						on:click={() => dispatch('remove', file?.local_id)}>Remove</button
					>
					<button
						type="button"
						class="btn-generic bg-zinc-700 px-2 text-sm py-1 w-full"
						on:click={handleShowDescriptionModal}
						>Set description
					</button>
				</div>
			{/if}
		</div>
		<div class="flex justify-between items-center px-2">
			<span class="text-xs italic text-zinc-400">{file?.file?.type}</span>
			<span class="text-xs text-zinc-400">
				<FileSizeFormatter size={file?.file?.size} />
			</span>
		</div>

		<img class="max-h-32 m-auto" src={file.poster} alt={file.name} />
	</div>
{:else}
	<div>
		<span>could not load file</span>
	</div>
{/if}

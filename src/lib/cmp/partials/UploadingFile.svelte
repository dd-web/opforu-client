<script>
	import { createEventDispatcher } from 'svelte';
	import { clickoutside } from '$lib/actions/clickoutside';
	const dispatch = createEventDispatcher();

	import CircularIconBtn from '../global/CircularIconBtn.svelte';
	import EllipsisVertical from '$lib/icons/EllipsisVertical.svelte';

	/** @type {LocalFileInfo?=} */ export let file;

	let contextMenuVisible = false;
</script>

{#if file}
	<div class="max-w-[12rem] bg-zinc-800 px-2 flex flex-col">
		<div class="flex p-2 gap-2 items-center justify-between relative">
			<span class="block whitespace-nowrap overflow-hidden text-ellipsis">{file.name}</span>
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
					<!-- <button type="button" class="btn-generic bg-zinc-700 px-2 text-sm py-1 w-full">Set description </button> -->
				</div>
			{/if}
		</div>

		<img class="max-h-32 m-auto" src={file.poster} alt={file.name} />
	</div>
{:else}
	<div>
		<span>could not load file</span>
	</div>
{/if}

<script>
	/** @type {LocalFileInfo?=} */ export let file;
</script>

{#if file}
	<div class="max-w-[12rem] bg-zinc-800 px-2 flex flex-col">
		<span class="block whitespace-nowrap overflow-hidden text-ellipsis">{file.name}</span>
		<img class="max-h-32 m-auto" src={file.poster} alt={file.name} />
	</div>
{:else}
	<div>
		<span>could not load file</span>
	</div>
{/if}

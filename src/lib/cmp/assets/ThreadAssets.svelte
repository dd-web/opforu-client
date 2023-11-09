<script>
	/** @type {Asset[]} */
	export let assets = [];
</script>

<div class="grid grid-cols-3 grid-rows-3 aspect-square items-center justify-center gap-1.5">
	{#each assets as asset, i (`asset-${i}-${asset.file_name}`)}
		<div class="bg-zinc-800 p-1 w-full h-full flex flex-col justify-center rounded-md">
			<img class="w-full" src={asset.avatar.url} alt={asset.file_name} />
		</div>
	{/each}
</div>

<script>
	/** @type {Asset[]} */
	export let assets = [];
</script>

<!-- <div class="bg-zinc-800/50 max-h-32 overflow-x-auto overflow-y-hidden">
	<div class="flex justify-between items-center gap-4 w-max">
		{#each assets as asset, i (`asset-${i}-${asset.file_name}`)}
			<div>
				<img class="max-h-20 w-full" src={asset.avatar.url} />
				<p>asset here</p>
				<p>{asset.file_name}</p>
			</div>
		{/each}
	</div>
</div> -->

<div class="grid grid-cols-3 grid-rows-3 aspect-square items-center justify-center gap-2">
	{#each assets as asset, i (`asset-${i}-${asset.file_name}`)}
		<div class="bg-zinc-800 p-2 w-full h-full flex flex-col justify-center rounded-md">
			<img class="w-full" src={asset.avatar.url} alt={asset.file_name} />
		</div>
	{/each}
</div>

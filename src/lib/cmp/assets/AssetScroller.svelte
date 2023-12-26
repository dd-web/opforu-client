<script>
	/** @type {Asset[]} */
	export let assets = [];

	let displaying = assets && assets.length > 0 ? assets[0] : null;
</script>

<div class="group">
	{#if displaying}
		<div>
			<img class="m-auto" src={displaying.avatar.url} alt={displaying.file_name} />
		</div>

		{#if assets.length > 1}
			<div class="my-4 h-20">
				<ul id="asset-list" class="flex gap-8 overflow-x-auto overflow-y-hidden pb-2 px-8">
					{#each assets as asset, i (`asset-${i}-${asset.file_name}`)}
						<li class="min-w-[5rem] max-w-[8rem] max-h-[4rem] h-auto">
							<div class="relative">
								<img class="max-h-16 max-w-[5rem]" src={asset.avatar.url} alt={asset.file_name} />
								<button on:click={() => (displaying = asset)} class="absolute h-full w-full top-0" />
							</div>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	{:else}
		<p>No Assets Found</p>
	{/if}
</div>

<style lang="postcss">
	#asset-list::-webkit-scrollbar-thumb {
		@apply rounded-full bg-zinc-800 hover:bg-zinc-700;
	}

	#asset-list::-webkit-scrollbar {
		@apply h-2;
	}

	#asset-list.has-hover::-webkit-scrollbar-thumb {
		@apply !bg-zinc-800;
	}
</style>

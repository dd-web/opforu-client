<script>
	/**
	 * @TODO assets that don't load should reset the loading state from defered to immediate
	 */

	import { crossfade, scale, fade } from 'svelte/transition';
	import { formatBytes } from '$lib/utils/localfile';

	import AssetTypeResolver from './AssetTypeResolver.svelte';
	import CircleTimer from '$lib/icons/CircleTimer.svelte';
	import XMark from '$lib/icons/XMark.svelte';
	import CircularIconBtn from '../global/CircularIconBtn.svelte';

	export let /** @type {IAsset[]} */ assets = [];

	/** @type {IAsset?} */ let loadingAsset = null;
	/** @type {IAsset?} */ let focusedAsset = null;
	let croassfadeDuration = 300;
	let ctxMenuVisible = false;

	const [send, receive] = crossfade({
		duration: (d) => croassfadeDuration,
		fallback: (n, p) => scale(n, { ...p, duration: croassfadeDuration })
	});

	const loadAsset = (/** @type {IAsset} */ asset) => {
		const timeout = setTimeout(() => (loadingAsset = asset), 100);

		// possibly needs to use parent constructor (media element) to get videos preloading properly
		let localEl = asset.asset_type === 'image' ? new Image() : document.createElement('video');
		localEl.onload = () => {
			focusedAsset = asset;
			clearTimeout(timeout);
			loadingAsset = null;
		};

		localEl.src = asset.source.url;
	};

	/** handler for resetting gird */
	const resetAssetFocus = () => {
		focusedAsset = null;
	};
</script>

<div class="grid grid-rows-6 grid-cols-6 gap-2 h-full items-center justify-items-center p-2 relative">
	{#each assets as asset, index (index + (asset?.updated_at ?? ''))}
		<div
			class="sz-{assets.length} sz-{assets.length}-ct-{index} grid-asset-area"
			class:col-start-4={assets.length === 6 && index % 2 !== 0}
		>
			<AssetTypeResolver {asset} />

			{#if focusedAsset !== asset}
				<button
					on:click={() => loadAsset(asset)}
					in:receive={{ key: asset.source.url }}
					out:send={{ key: asset.source.url }}
					class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full outline-none focus-visible:ring-2 ring-zinc-200"
				/>
			{/if}
		</div>
	{:else}
		<span>No assets</span>
	{/each}

	{#if loadingAsset}
		<div
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 200 }}
			class="bg-black/80 absolute top-0 left-0 h-full w-full flex justify-center items-center fill-white"
		>
			<span class="asset-loader">
				<CircleTimer />
			</span>
		</div>
	{/if}

	{#if focusedAsset}
		<div
			in:fade={{ duration: 200 }}
			out:fade
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full bg-black/80"
		/>
		{#await focusedAsset then d}
			<div
				in:receive|global={{ key: d.source.url }}
				out:send|global={{ key: d.source.url }}
				class="flex items-center justify-center h-full w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
			>
				{#if d.asset_type === 'image'}
					<img src={d.source.url} alt="media" />
				{:else if d.asset_type === 'video'}
					<video controls loop autoplay src={d.source.url}>
						<track kind="captions" />
						<p>Could not load video</p>
					</video>
				{/if}
			</div>
		{/await}
		<div in:fade out:fade class="z-10 w-full absolute top-0 flex justify-between pt-2 px-4">
			<div>
				<a href={focusedAsset.source.url} target="_blank" class="text-blue-200 underline underline-offset-4">src</a>
			</div>

			<CircularIconBtn class="" on:click={resetAssetFocus}>
				<XMark />
			</CircularIconBtn>
		</div>

		<div in:fade out:fade class="z-10 w-full absolute bottom-0 px-2">
			<div class="flex gap-2">
				<p class="text-xs text-limit capitalize text-blue-200 font-semibold">{focusedAsset.file_name}</p>
				<span class="text-xs text-zinc-400">{formatBytes(focusedAsset.source.file_size)}</span>
			</div>
			<p title="description" class="text-xs text-limit">{focusedAsset?.description}</p>
		</div>
	{/if}
</div>

<style lang="postcss">
	.grid-asset-area {
		@apply flex max-h-full max-w-full relative;
	}

	.sz-1 {
		@apply col-span-6 row-span-6;
	}

	.sz-2 {
		@apply col-span-6 row-span-3;
	}

	.sz-3 {
		@apply col-span-6 row-span-2;
	}

	.sz-4 {
		@apply col-span-3 row-span-3;
	}

	.sz-5 {
		@apply col-span-3 row-span-2;
	}

	.sz-6 {
		@apply col-span-3 row-span-2;
	}

	.sz-7 {
		@apply col-span-2 row-span-2;
	}

	.sz-8 {
		@apply col-span-2 row-span-2;
	}

	.sz-9 {
		@apply col-span-2 row-span-2;
	}

	.sz-5-ct-0 {
		grid-row-start: 1;
		grid-column-start: 1;
	}

	.sz-5-ct-1 {
		grid-row-start: 1;
		grid-column-start: 4;
	}

	.sz-5-ct-2 {
		@apply col-span-4;
		grid-row-start: 3;
		grid-column-start: 2;
	}

	.sz-5-ct-3 {
		grid-row-start: 5;
		grid-column-start: 1;
	}

	.sz-5-ct-4 {
		grid-row-start: 5;
		grid-column-start: 4;
	}

	.sz-7-ct-0 {
		grid-row-start: 1;
		grid-column-start: 1;
	}

	.sz-7-ct-1 {
		grid-row-start: 1;
		grid-column-start: 5;
	}

	.sz-7-ct-2 {
		grid-row-start: 3;
		grid-column-start: 1;
	}

	.sz-7-ct-3 {
		@apply row-span-4;
		grid-row-start: 2;
		grid-column-start: 3;
	}

	.sz-7-ct-4 {
		grid-row-start: 3;
		grid-column-start: 5;
	}

	.sz-7-ct-5 {
		grid-row-start: 5;
		grid-column-start: 1;
	}

	.sz-7-ct-6 {
		grid-row-start: 5;
		grid-column-start: 5;
	}

	.sz-8-ct-4 {
		grid-column-start: 5;
	}

	.sz-8-ct-5 {
		grid-row-start: 5;
		grid-column-start: 1;
	}

	.sz-8-ct-6 {
		grid-row-start: 5;
		grid-column-start: 3;
	}

	.sz-8-ct-7 {
		grid-row-start: 5;
		grid-column-start: 5;
	}

	@keyframes grow-pulse {
		0% {
			transform: scale(0.9);
			opacity: 0.7;
		}
		50% {
			transform: scale(1.1);
			opacity: 1;
		}
		100% {
			transform: scale(0.9);
			opacity: 0.7;
		}
	}

	.asset-loader {
		animation: grow-pulse 1s ease-in-out infinite;
	}
</style>

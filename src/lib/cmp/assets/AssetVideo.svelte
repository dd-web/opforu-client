<script>
	import TriangleExclamation from '$lib/icons/TriangleExclamation.svelte';
	import CirclePlay from '$lib/icons/CirclePlay.svelte';

	export let /** @type {Asset} */ asset;

	let exists = true;

	/** @type {HTMLImageElement} */ let previewAvatarEl;
	/** @type {HTMLDivElement} */ let previewAvatarPlayBacksplashEl;

	const handleImageError = () => {
		exists = false;
	};

	const resizeBacksplash = () => {
		if (!previewAvatarEl || !previewAvatarPlayBacksplashEl) return;
		const { width, height } = previewAvatarEl.getBoundingClientRect();

		previewAvatarPlayBacksplashEl.style.width = `${width + 1}px`;
		previewAvatarPlayBacksplashEl.style.height = `${height + 1}px`;
	};
</script>

{#if exists}
	<div class="relative flex max-h-full max-w-full justify-center items-center">
		<img
			class="object-contain max-h-full max-w-full"
			src={asset.avatar.url}
			alt={asset.file_name}
			on:error={handleImageError}
			on:load={resizeBacksplash}
			bind:this={previewAvatarEl}
		/>
		<div
			bind:this={previewAvatarPlayBacksplashEl}
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full bg-black/80"
		/>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-white">
			<CirclePlay />
		</div>
	</div>
{:else}
	<div class="flex justify-center items-center" title="content not found">
		<span class="fill-error">
			<TriangleExclamation />
		</span>
	</div>
{/if}

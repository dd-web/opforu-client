<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import CirclePlay from '$lib/icons/CirclePlay.svelte';

	/** @type {Asset} */ export let asset;

	/** @type {HTMLImageElement=} */ let previewAvatarEl;
	/** @type {HTMLDivElement=} */ let previewAvatarPlayBacksplashEl;

	const resizeBacksplash = () => {
		if (!previewAvatarEl || !previewAvatarPlayBacksplashEl) return;
		const { width, height } = previewAvatarEl.getBoundingClientRect();

		previewAvatarPlayBacksplashEl.style.width = `${width + 1}px`;
		previewAvatarPlayBacksplashEl.style.height = `${height + 1}px`;
	};

	/**
	 * @TODO !!! This is using Source for Avatar previews currently because making avatars is not yet implemented.
	 */
</script>

<div class="relative flex max-h-full max-w-full justify-center items-center">
	<img
		class="object-contain max-h-full max-w-full"
		src={asset.source.url}
		alt={asset.file_name}
		on:error={() => dispatch('had-error')}
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

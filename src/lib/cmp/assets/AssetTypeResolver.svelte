<script>
	/**
	 * @TODO - eventually add support for more asset types such as text documents, audio, etc.
	 */

	import TriangleExclamation from '$lib/icons/TriangleExclamation.svelte';

	import AssetImage from './AssetImage.svelte';
	import AssetVideo from './AssetVideo.svelte';

	/** @type {IAsset} */ export let asset;

	let hasError = false;

	/**
	 * Resolves an asset type to it's corresponding component
	 * @param {keyof typeof EAssetType} [type='image'] - type of asset to resolve
	 * @returns {import('svelte').ComponentType}
	 */
	const resolveComponent = (type = 'image') => {
		switch (type) {
			case 'image':
				return AssetImage;
			case 'video':
				return AssetVideo;
			default:
				return AssetImage;
		}
	};
</script>

{#if !hasError}
	<svelte:component this={resolveComponent(asset.asset_type)} {asset} on:had-error={() => (hasError = true)} />
{:else}
	<div class="flex justify-center items-center" title="content not found">
		<span class="fill-error">
			<TriangleExclamation />
		</span>
	</div>
{/if}

<script>
	import AssetImage from './AssetImage.svelte';
	import AssetVideo from './AssetVideo.svelte';

	export let /** @type {Asset} */ asset;
</script>

{#if asset.asset_type === 'image'}
	<AssetImage {asset} />
{:else if asset.asset_type === 'video'}
	<AssetVideo {asset} />
{/if}

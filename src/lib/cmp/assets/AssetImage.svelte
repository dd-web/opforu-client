<script>
	import TriangleExclamation from '$lib/icons/TriangleExclamation.svelte';

	export let /** @type {Asset} */ asset;

	let exists = true;

	const handleImageError = () => {
		exists = false;
	};
</script>

{#if exists}
	<img
		class="object-contain max-h-full max-w-full"
		src={asset.avatar.url}
		alt={asset.file_name}
		on:error={handleImageError}
	/>
{:else}
	<div class="flex justify-center items-center" title="content not found">
		<span class="fill-error">
			<TriangleExclamation />
		</span>
	</div>
{/if}

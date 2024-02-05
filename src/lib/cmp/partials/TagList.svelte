<script>
	import ContentTag from '$lib/cmp/global/ContentTag.svelte';

	/** @type {string[]} */ export let tags;
</script>

<div class="flex gap-2 max-w-[50%] overflow-hidden">
	{#each tags as tag (tag)}
		<ContentTag {tag} />
	{/each}
</div>

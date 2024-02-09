<script>
	import TagList from '../../partials/TagList.svelte';
	import PostDateDisplay from '$lib/cmp/post/partials/PostDateDisplay.svelte';

	/** @type {string?=} */ export let createdAt;
	/** @type {string?=} */ export let updatedAt;
	/** @type {string[]} */ export let tagList = [];
</script>

<footer class="clear-left flex p-2 items-center justify-between">
	{#if tagList && tagList?.length > 0}
		<TagList tags={tagList} />
	{/if}

	<PostDateDisplay {createdAt} {updatedAt} />
</footer>

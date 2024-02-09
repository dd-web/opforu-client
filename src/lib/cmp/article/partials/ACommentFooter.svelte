<script>
	import PostDateDisplay from '$lib/cmp/post/partials/PostDateDisplay.svelte';

	/** @type {IArticleComment} */ export let comment;
</script>

<footer class="clear-left flex p-2 items-center justify-between">
	<PostDateDisplay createdAt={comment?.created_at} updatedAt={comment?.updated_at} />
</footer>

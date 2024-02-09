<script>
	import ACommentHeader from '$lib/cmp/article/partials/ACommentHeader.svelte';
	import ACommentBody from '$lib/cmp/article/partials/ACommentBody.svelte';
	import ACommentFooter from '$lib/cmp/article/partials/ACommentFooter.svelte';

	/** @type {IArticleComment} */ export let comment;

	/**
	 * Context menu handler
	 * @param {CustomEvent} event
	 */
	const handleCtx = (event) => {
		console.log('article comment context menu', event.detail);
	};
</script>

<article class="bg-zinc-900 rounded-md">
	<slot name="header">
		<ACommentHeader on:comment-ctx={handleCtx} {comment} />
	</slot>

	<slot name="body">
		<ACommentBody {comment} />
	</slot>

	<slot name="footer">
		<ACommentFooter {comment} />
	</slot>
</article>

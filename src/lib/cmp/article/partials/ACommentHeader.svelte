<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import CircularIconBtn from '$lib/cmp/global/CircularIconBtn.svelte';
	import Hamburger from '$lib/icons/Hamburger.svelte';
	import CommentNumber from '$lib/cmp/article/partials/CommentNumber.svelte';
	import Username from '$lib/cmp/account/Username.svelte';

	/** @type {IArticleComment} */ export let comment;

	const handleCommentCtx = () => {
		dispatch('comment-ctx', { comment_number: comment?.comment_number, _id: comment?._id });
	};
</script>

<header class="flex justify-between items-center gap-4 p-2 h-12">
	<slot name="left">
		<div class="-mb-1 pl-2">
			<CircularIconBtn on:click={handleCommentCtx}>
				<Hamburger />
			</CircularIconBtn>
		</div>
	</slot>

	<slot name="center">
		<div>
			<!-- <span>{comment?.author?.username}</span> -->
			<Username account={comment?.author} />
		</div>
	</slot>

	<slot name="right">
		<div class="ml-auto mr-2">
			<CommentNumber num={comment?.comment_number} />
		</div>
	</slot>
</header>

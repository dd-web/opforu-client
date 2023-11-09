<script>
	import { page } from '$app/stores';

	import Identity from '../global/Identity.svelte';

	/** @type {Post} */
	export let post;
</script>

<article
	id="t-{$page.params.thread}-{post.post_number}"
	class="mx-2 relative border rounded-lg border-zinc-800 shadow-lg shadow-black/20"
>
	<!-- post header -->
	<div class="bg-black/20 pt-2 pb-4 px-4 rounded-t-lg">
		<Identity identity={post.creator} />
	</div>

	<!-- post body -->
	<div>
		{@html post.body}
	</div>

	<!-- post footer -->
	<div class="py-2 px-4 bg-black/20 rounded-b-lg">
		<p>{post.created_at}</p>
	</div>
</article>

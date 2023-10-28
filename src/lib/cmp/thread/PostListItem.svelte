<script>
	import { page } from '$app/stores';

	/** @type {Post} */
	export let post;
</script>

<div id="t-{$page.params.thread}-{post.post_number}">
	<!-- post header -->
	<div>post header</div>

	<!-- post body -->
	<div>
		{@html post.body}
	</div>

	<!-- post footer -->
	<div>post footer</div>
</div>

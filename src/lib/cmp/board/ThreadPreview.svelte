<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	/** @type {Thread} */
	export let thread;

	$: if (browser) console.log('thread', thread);
</script>

<article id="thread-{$page.params.short}-{thread.slug}" class="bg-zinc-900">
	<header>
		<h3 class="text-xl font-semibold">{thread.title}</h3>
		<div>
			<p>{thread.post_count} Posts</p>
		</div>
	</header>
</article>

<style lang="postcss">
</style>

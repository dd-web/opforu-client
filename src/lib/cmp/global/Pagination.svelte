<script>
	import { page } from '$app/stores';

	export let current = 1;
	export let size = 10;
	export let pages = 1;
	export let path = `/boards/${$page.params.short}/`;
</script>

<nav>
	<ul>
		{#each Array(pages) as _, ix}
			<li>
				<a href="{path}?page={ix}&count={size}" class:current={ix === current}>{ix}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.current {
		@apply text-white;
	}
</style>

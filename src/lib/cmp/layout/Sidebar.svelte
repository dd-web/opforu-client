<script>
	import { page } from '$app/stores';

	/** @type {Board[]} */
	export let boards = [];

	/** @type {string|null}*/
	let pageCount;

	$: pageCount = $page.url.searchParams.get('count');
	$: query = `?page=1&count=${pageCount ?? 10}`;
</script>

<div class="sticky top-4 h-fit">
	<nav class="px-4 mt-4">
		<p class="text-xl tracking-widest font-bold">Board List</p>
		<hr class="mb-2 mt-1 opacity-20" />
		<ul class="flex flex-col gap-2">
			{#each boards as board, ix (board._id)}
				<li class="tracking-wider w-fit capitalize">
					<a
						href="/boards/{board.short}{pageCount && pageCount !== '10' ? query : ''}"
						class=""
						class:current-board={$page.params.short === board.short}>{board.title}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</div>

<style lang="postcss">
	.current-board {
		@apply text-blue-200;
	}
</style>

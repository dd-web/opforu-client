<script>
	import { page } from '$app/stores';

	/** @type {Board[]} */
	export let boards = [];
</script>

<aside class="sticky top-0 h-fit">
	<nav class="mx-4 mt-4">
		<p class="text-xl tracking-widest font-bold">Board List</p>
		<hr class="mb-2 mt-1 opacity-20" />
		<ul class="flex flex-col gap-2">
			{#each boards as board, ix (board._id)}
				<li class="tracking-wider w-fit capitalize">
					<a href="/boards/{board.short}" class="" class:current-board={$page.params.short === board.short}
						>{board.title}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</aside>

<style lang="postcss">
	.current-board {
		@apply text-blue-200;
	}
</style>

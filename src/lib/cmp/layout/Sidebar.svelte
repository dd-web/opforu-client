<script>
	import { page } from '$app/stores';
	import { sidebarStore } from '$lib/stores/layout';

	/** @type {Board[]} */
	export let boards = [];
</script>

{#if $sidebarStore}
	<aside
		id="sidebar"
		class="bg-zinc-900 min-w-fit max-w-fit sticky top-12 flex-auto overflow-y-scroll overscroll-contain hover:has-hover z-10"
	>
		<ul class="flex flex-col gap-2 px-8">
			{#each boards as board}
				<div
					class:current={$page.params.short === board.short}
					id="sb-board"
					class="grid grid-cols-[minmax(0,2.5rem)_1fr] items-center group gap-2"
				>
					<a class="capitalize link peer" href="/boards/{board.short}">{board.title}</a>
					<span
						class="tag-badge group-hover:border-zinc-500 group-hover:text-blue-200 peer-focus-visible:text-blue-200 peer-focus-visible:border-zinc-500"
						>{board.short}</span
					>
				</div>
			{/each}
		</ul>

		<hr class="hr-split" />

		{#each Array(50) as item}
			<p>item</p>
		{/each}
	</aside>
{/if}

<style lang="postcss">
	aside {
		height: calc(100vh - 3rem);
	}

	.current {
		@apply text-blue-200;
	}

	div.current span {
		@apply text-blue-200 border-zinc-500;
	}

	#sb-board a {
		grid-row: 1;
		grid-column: 2;
	}

	#sb-board span {
		grid-row: 1;
		grid-column: 1;
	}
</style>

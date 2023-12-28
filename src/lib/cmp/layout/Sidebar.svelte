<script>
	import { page } from '$app/stores';
	import { sidebarStore } from '$lib/stores/layout';

	/** @type {Board[]} */
	export let boards = [];
</script>

{#if $sidebarStore}
	<aside
		id="sidebar"
		class="bg-zinc-900 max-w-fit sticky top-12 flex-auto overflow-y-scroll overscroll-contain hover:has-hover z-10"
	>
		<ul class="flex flex-col gap-2 px-8">
			{#each boards as board}
				<div class="grid grid-cols-[minmax(0,2.5rem)_1fr] items-center group gap-2">
					<span class="tag-badge group-hover:text-zinc-200 group-hover:border-zinc-500">{board.short}</span>
					<a class="capitalize link" href="/boards/{board.short}">{board.title}</a>
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
</style>

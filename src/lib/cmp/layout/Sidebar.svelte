<script>
	/** @type {Board[]} */
	export let boards = [];
</script>

<aside class="sticky top-0 h-fit">
	<ul>
		<nav>
			{#each boards as board, ix (board._id)}
				<li>
					<a href="/boards/{board.short}">{board.title}</a>
				</li>
			{/each}
		</nav>
	</ul>
</aside>

<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let current = 1;
	export let pages = 1;
	export let path = `/boards/${$page.params.short}/`;

	/** @type {number} */
	let selectedSize;

	/**
	 * on page size change redirect to page 1 with new page size as to not break pagination
	 * @param {Event} e
	 * @returns {void}
	 */
	const onPageSizeChange = (e) => {
		if (!browser) return;
		goto(`${path}?page=1&count=${selectedSize}`);
	};
</script>

<nav class="flex justify-end items-center mx-2">
	<ul class="flex items-center justify-end mx-2 gap-2 py-2">
		{#each Array(pages) as _, ix}
			<li
				class="bg-zinc-900 flex h-8 w-8 items-center text-zinc-200 justify-center rounded-md border border-zinc-600"
				class:current={ix + 1 === current}
			>
				<a href="{path}?page={ix + 1}&count={selectedSize}">{ix + 1}</a>
			</li>
		{/each}
	</ul>
	<label for="page-size" class="text-zinc-200 mx-2">Page Size:</label>
	<select
		id="page-size"
		class="bg-zinc-900 h-8 text-zinc-200 border border-zinc-600 rounded-md"
		bind:value={selectedSize}
		on:change={onPageSizeChange}
	>
		<option selected value="10">10</option>
		<option value="15">15</option>
		<option value="20">20</option>
		<option value="25">25</option>
		<option value="50">50</option>
	</select>
</nav>

<style>
	.current {
		@apply bg-blue-200/10 text-white;
	}
</style>

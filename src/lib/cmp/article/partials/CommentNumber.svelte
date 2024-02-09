<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/** @type {number} */ export let num = 0;
</script>

{#if typeof num === 'number' && num > 0}
	<button
		class="btn btn-generic bg-zinc-800 border-zinc-700 border py-1 px-3 text-sm font-semibold rounded-sm font-mono"
		on:click={() => dispatch('click', num)}
	>
		{num}
	</button>
{/if}

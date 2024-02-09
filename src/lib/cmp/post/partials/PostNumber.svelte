<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/** @type {number} */ export let num = 0;
</script>

{#if typeof num === 'number' && num > 0}
	<button on:click={() => dispatch('click')} class="post-num-badge px-2">
		{num}
	</button>
{/if}

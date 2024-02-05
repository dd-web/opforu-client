<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/** @type {number} */ export let postNumber = 0;
	/** @type {boolean} */ export let isRoot = true;
	/** @type {boolean} */ export let externalThread = false;
</script>

<button on:click={() => dispatch('click')} class="post-num-badge px-2">
	{postNumber}
</button>

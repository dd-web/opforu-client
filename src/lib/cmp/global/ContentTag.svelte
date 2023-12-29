<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/** @type {string} */ export let tag = '';
</script>

<button
	on:click={() => dispatch('click')}
	class="tag-badge px-2 hover:text-blue-200 hover:border-zinc-500 outline-none focus-visible:underline underline-offset-2 focus-visible:text-blue-200 focus-visible:border-zinc-500"
>
	#{tag}
</button>

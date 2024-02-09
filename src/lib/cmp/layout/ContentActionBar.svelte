<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/** @type {IActionBarItem[]} */ export let items;
</script>

<ul class="my-8 p-4 bg-zinc-900 rounded-md">
	{#each items as btn (btn.text)}
		<li>
			<button
				class="btn-primary h-10 px-4 rounded-md font-semibold"
				type="button"
				on:click={() => dispatch(btn.event_name, btn.event_data)}>{btn.text}</button
			>
		</li>
	{:else}
		<span>Button list empty</span>
	{/each}
</ul>

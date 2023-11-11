<script>
	import { clickoutside } from '$lib/actions/clickoutside';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	/** @type {Account} */
	export let account;
</script>

<div
	use:clickoutside
	on:clickoutside={() => dispatch('close')}
	class="absolute bg-zinc-900 top-0 right-0 px-4 py-2 rounded-md shadow-md border-zinc-800 border"
>
	<span class="whitespace-nowrap text-center w-full block capitalize font-semibold tracking-wider"
		>{account.username}</span
	>
	<hr class="mb-3 mt-1 opacity-20" />

	<ul>
		<li>
			<form method="POST" action="/account?/logout">
				<button type="submit">logout</button>
			</form>
		</li>
	</ul>
</div>

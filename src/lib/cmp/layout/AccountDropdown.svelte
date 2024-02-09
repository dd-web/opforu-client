<script>
	import { clickoutside } from '$lib/actions/clickoutside';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	import UserCircled from '$lib/icons/UserCircled.svelte';
	import ArrowOut from '$lib/icons/ArrowOut.svelte';

	/** @type {IAccount} */ export let account;
</script>

<div
	use:clickoutside
	on:clickoutside={() => dispatch('close')}
	class="absolute bg-zinc-900 top-10 right-6 rounded-sm shadow-md border-zinc-800 border"
>
	<ul class="flex flex-col">
		<li class="group hover:bg-zinc-800">
			<span class="group-hover:fill-blue-200">
				<UserCircled />
			</span>
			<span class="group-hover:text-zinc-100">{account.username}</span>
		</li>

		<li class="group hover:bg-zinc-800">
			<span class="group-hover:fill-blue-200">
				<ArrowOut />
			</span>
			<form method="POST" action="/account?/logout">
				<button class="group-hover:text-zinc-100 text-zinc-400 capitalize" type="submit">logout</button>
			</form>
		</li>
	</ul>
</div>

<style lang="postcss">
	ul li {
		@apply grid grid-cols-[1.5rem_1fr] gap-2 items-center px-2 py-1 cursor-pointer;
	}

	ul li span {
		@apply fill-zinc-500 justify-self-center text-zinc-400 capitalize;
	}
</style>

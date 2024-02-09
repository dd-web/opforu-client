<script>
	import { sidebarStore } from '$lib/stores/layout';

	import Hamburger from '$lib/icons/Hamburger.svelte';
	import UserOutline from '$lib/icons/UserOutline.svelte';

	import AccountDropdown from './AccountDropdown.svelte';
	import CircularIconBtn from '../global/CircularIconBtn.svelte';

	/** @type {IAccount?} */ export let account = null;

	let dropdownVisibile = false;
</script>

<div class="bg-zinc-900 flex h-12 px-4 sticky top-0 gap-4 z-10">
	<CircularIconBtn on:click={() => ($sidebarStore = !$sidebarStore)}>
		<Hamburger />
	</CircularIconBtn>

	<div class="flex flex-col items-center justify-center">
		<a href="/news" class="text-xl link-primary -mt-0.5 font-bold">OPforU</a>
	</div>

	<div class="ml-auto flex flex-col items-center justify-center mr-2">
		{#if account}
			<CircularIconBtn on:click={() => (dropdownVisibile = !dropdownVisibile)}>
				<UserOutline />
			</CircularIconBtn>

			{#if dropdownVisibile}
				<AccountDropdown on:close={() => (dropdownVisibile = false)} {account} />
			{/if}
		{:else}
			<div>
				<a class="link-primary text-sm" href="/login">Log in</a> <span class="text-zinc-400 mx-1">/</span>
				<a class="link-primary text-sm" href="/register">Sign up</a>
			</div>
		{/if}
	</div>
</div>

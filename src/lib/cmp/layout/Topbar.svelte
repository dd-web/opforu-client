<script>
	import { sidebarStore } from '$lib/stores/layout';
	import { alerts } from '$lib/stores/alerts';

	import Hamburger from '$lib/icons/Hamburger.svelte';
	import UserOutline from '$lib/icons/UserOutline.svelte';

	import AccountDropdown from '../global/AccountDropdown.svelte';
	import CircularIconBtn from '../global/CircularIconBtn.svelte';

	export let /** @type {Account|undefined|null}*/ account;

	let accountDropdownVisible = false;

	const toggleSidebar = () => {
		$sidebarStore = !$sidebarStore;
	};

	const testAlert = () => {
		alerts.newAlert('this is a test alert', 'success');
	};
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
			<CircularIconBtn on:click={() => (accountDropdownVisible = !accountDropdownVisible)}>
				<UserOutline />
			</CircularIconBtn>

			{#if accountDropdownVisible}
				<AccountDropdown on:close={() => (accountDropdownVisible = false)} {account} />
			{/if}
		{:else}
			<div>
				<a class="link-primary text-sm" href="/login">Log in</a> <span class="text-zinc-400 mx-1">/</span>
				<a class="link-primary text-sm" href="/register">Sign up</a>
			</div>
		{/if}
	</div>

	<!-- <button on:click={testAlert}>TestAlert</button> -->
</div>

<script>
	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<h1 class="text-4xl mt-4 text-center capitalize text-blue-100">Sign in</h1>

{#if form?.success}
	<div>
		<p>Successfully signed in. Welcome back, {data.account?.username}</p>
	</div>
{:else}
	<form
		class="flex flex-col max-w-sm w-full mx-auto mt-8 bg-zinc-900 rounded-md mb-8 px-4 py-4"
		method="POST"
		action="?/login"
	>
		{#if form?.incorrect}
			<p class="text-error text-center">Invalid login details</p>
		{/if}

		<!-- username -->
		<label for="username">Username or Email:</label>
		<input type="text" id="username" name="username" autocomplete="email" required value={form?.username ?? ''} />

		<!-- password -->
		<label for="password">Password:</label>
		<input type="password" id="password" name="password" autocomplete="current-password" required />

		<!-- submit -->
		<div class="flex flex-col mt-4 items-center gap-2">
			<button type="submit" class="bg-blue-600 h-10 px-8 rounded-md">Login</button>
			<div class="text-sm text-zinc-400">
				<span>don't have an account?</span> <a class="hover:text-blue-300 text-blue-100" href="/register">sign up</a> today!
			</div>
		</div>
	</form>
{/if}

<style lang="postcss">
	input {
		@apply px-2 py-1 rounded-md border-none outline-none ring-2 ring-zinc-600 text-black;
		@apply focus-visible:ring-blue-300;
	}

	label:not(:first-of-type) {
		@apply mt-4;
	}

	label {
		@apply mb-1;
	}
</style>
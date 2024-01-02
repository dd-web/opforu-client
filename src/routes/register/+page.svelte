<script>
	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<h1 class="text-4xl mt-4 text-center capitalize text-blue-100">Create an account</h1>

{#if form?.success}
	<div>
		<p>Account created! Welcome, {form?.account?.username}</p>
	</div>
{:else}
	<form
		class="flex flex-col max-w-sm w-full mx-auto mt-8 bg-zinc-900 rounded-md mb-8 px-4 py-4"
		method="POST"
		action="?/register"
	>
		<!-- username -->
		<label for="username">Username</label>
		<input type="text" id="username" name="username" autocomplete="username" required value={form?.username ?? ''} />

		<!-- email -->
		<label for="email">Email</label>
		<input type="email" id="email" name="email" autocomplete="email" required value={form?.username ?? ''} />

		<!-- password -->
		<label for="password">Password</label>
		<input type="password" id="password" name="password" autocomplete="new-password" minlength="8" required />

		<!-- confirm password -->
		<label for="confirm-password">Confirm Password</label>
		<input
			type="password"
			id="confirm-password"
			name="confirm-password"
			autocomplete="new-password"
			minlength="8"
			required
		/>

		<div class="flex flex-col mt-4 items-center gap-2">
			<button type="submit" class="btn-primary h-10 rounded-md mt-6 px-8">Create Account</button>
		</div>
	</form>
{/if}

<style lang="postcss">
	input {
		@apply px-2 py-1 rounded-md border-none outline-none ring-2 ring-zinc-600 text-black;
		@apply focus-visible:ring-blue-300;
	}

	label::after {
		@apply mx-[0.1rem] text-zinc-200;
		content: ':';
	}

	label:not(:first-of-type) {
		@apply mt-4;
	}

	label {
		@apply mb-1;
	}
</style>

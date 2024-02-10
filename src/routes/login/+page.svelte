<script>
	import { goto, invalidateAll } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';

	/** @type {import('./$types').PageData} */ export let data;
	/** @type {import('./$types').ActionData }*/ export let form;

	let success = false;
	let invalidSubmission = false;
	/** @type {string=} */ let username;
	/** @type {number=}*/ let redirTimeout;

	/**
	 * Handle login form submission
	 * @param {IFormEvent} event
	 */
	async function handleLogin(event) {
		const formData = new FormData(event.currentTarget);

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: formData
		});

		/** @type {import('@sveltejs/kit').ActionResult<Record<'account', IAccount>>}*/
		const result = deserialize(await response.text());

		if (result.type === 'success' && result?.data?.account) {
			const acceptableRedirects = ['article', 'thread', 'board'];
			const next = $page.url.searchParams.get('next');
			const nextId = $page.url.searchParams.get('id');
			let nextUrl = '/';

			if (!!next && acceptableRedirects.includes(next) && !!nextId && typeof nextId === 'string' && nextId.length > 0) {
				switch (next) {
					case 'article':
						nextUrl = `/news/${nextId}`;
						break;
					case 'board':
						nextUrl = `/boards/${nextId}`;
						break;
					case 'thread':
						nextUrl = `/boards/${nextId.split('-')[0]}/${nextId.split('-')[1]}`;
						break;
				}
			}

			username = result?.data?.account?.username;
			success = true;

			redirTimeout = setTimeout(() => {
				goto(nextUrl);
				clearTimeout(redirTimeout);
			}, 2500);
		} else {
			invalidSubmission = true;
		}

		await invalidateAll();
		applyAction(result);
	}

	onDestroy(() => {
		clearTimeout(redirTimeout);
	});
</script>

<h1 class="text-4xl mt-4 text-center capitalize text-blue-100">Sign in</h1>

{#if success}
	<div class="flex flex-col items-center mt-8">
		<h2 class="text-2xl">
			Welcome back, <span class="capitalize text-blue-200 font-semibold">{username}</span>
		</h2>
		<span class="text-sm text-zinc-400 mt-2 italic">you will be redirected shortly</span>
	</div>
{:else}
	<form
		class="flex flex-col max-w-sm w-full mx-auto mt-8 bg-zinc-900 rounded-md mb-8 px-4 py-4"
		method="POST"
		on:submit|preventDefault={handleLogin}
		action="?/login"
	>
		<label for="username">Username or Email</label>
		<input type="text" id="username" name="username" autocomplete="email" required value={form?.username ?? ''} />

		<label for="password">Password</label>
		<input type="password" id="password" name="password" autocomplete="current-password" required />

		{#if invalidSubmission}
			<div class="mt-4">
				<p class="text-error text-center">Invalid login details</p>
			</div>
		{/if}

		<div class="flex flex-col mt-4 items-center gap-2">
			<button type="submit" class="btn-primary h-10 px-8 rounded-md">Login</button>
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

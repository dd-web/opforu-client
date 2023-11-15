<script>
	import { page } from '$app/stores';
	let content = '';
</script>

<form
	class="bg-zinc-900/50 border-zinc-700 border rounded-lg shadow-lg shadow-black/20 p-4 flex flex-col gap-2"
	method="POST"
	action="/boards/{$page.params.short}/{$page.params.thread}?/reply"
>
	<p class="text-center text-2xl text-blue-200">Post a reply</p>
	<div class="flex justify-between">
		<label for="content" class="text-blue-50">Reply Body</label>
		<button
			type="button"
			class="px-4 bg-surface py-1 text-sm rounded border border-zinc-500 outline-none focus-visible:border-blue-200 hover:bg-surface/80 active:scale-95 transition-transform duration-100"
			>Formatting help</button
		>
	</div>
	<textarea
		rows="8"
		id="content"
		name="content"
		bind:value={content}
		class="w-full rounded text-black p-2 resize-none"
	/>

	<button
		class="bg-blue-600 hover:bg-blue-500 h-10 px-8 rounded-md outline-none border border-transparent focus-visible:border-white active:opacity-75 active:scale-y-95 active:scale-x-[.99] transition-transform duration-100"
		>Submit</button
	>
</form>

<style lang="postcss">
	textarea {
		@apply outline-none border border-transparent bg-zinc-700 text-blue-50;
	}

	textarea:focus-visible {
		@apply border border-blue-200;
	}
</style>

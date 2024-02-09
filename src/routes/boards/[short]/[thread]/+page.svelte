<script>
	import { newActionBarItem } from '$lib/utils/resolvers';

	import Thread from '$lib/cmp/thread/Thread.svelte';
	import ContentActionBar from '$lib/cmp/layout/ContentActionBar.svelte';
	import ReplyForm from '$lib/cmp/form/ReplyForm.svelte';

	/** @type {import('./$types').PageData} */ export let data;
	/** @type {import('./$types').ActionData }*/ export let form;

	$: boardTitle = `${data.board.title[0].toUpperCase() + data.board.title.slice(1)}`;
	$: threadTitle = `${data.thread.title
		.split(' ')
		.map((/** @type {string} */ word) => word[0]?.toUpperCase() + word.slice(1))
		.join(' ')
		.replace('undefined', '')}`;

	/** @type {any} */
	let componentMap = {
		replyForm: ReplyForm
	};

	/** @type {typeof ReplyForm|null} */ let component = null;

	let actionButtons = [newActionBarItem('new-reply', 'replyForm', 'Reply')];

	/**
	 * Handle action bar events
	 * @param {CustomEvent} event
	 */
	const handleActionEvent = (event) => {
		component = component === componentMap[event.detail] ? null : componentMap[event.detail];
	};
</script>

<svelte:head>
	<title>{boardTitle} - {threadTitle} - OPforU</title>
	<meta name="description" content={data.thread.title} />
</svelte:head>

<div class="px-8">
	<h1 class="text-4xl mt-4 text-center capitalize text-blue-100">{data.board.title}</h1>
	<h2 class="text-base italic text-center text-neutral-300">{data.board.description}</h2>
	<hr class="my-8 opacity-20" />
	<h3 class="text-2xl mt-4 text-center capitalize text-zinc-200">{data.thread.title}</h3>
	<hr class="my-8 opacity-20" />

	<ContentActionBar on:new-reply={handleActionEvent} items={actionButtons} />

	<svelte:component this={component} />

	<Thread thread={data?.thread} />
</div>

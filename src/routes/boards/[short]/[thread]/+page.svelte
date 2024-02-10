<script>
	import { newActionBarItem } from '$lib/utils/resolvers';
	import { goto } from '$app/navigation';

	import Thread from '$lib/cmp/thread/Thread.svelte';
	import ContentActionBar from '$lib/cmp/layout/ContentActionBar.svelte';
	import ReplyForm from '$lib/cmp/form/ReplyForm.svelte';

	/** @type {import('./$types').PageData} */ export let data;

	$: boardTitle = `${data.board.title[0].toUpperCase() + data.board.title.slice(1)}`;
	$: threadTitle = `${data.thread.title
		.split(' ')
		.map((/** @type {string} */ word) => word[0]?.toUpperCase() + word.slice(1))
		.join(' ')
		.replace('undefined', '')}`;

	/** @type {Record<string, any>} */
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
		if (event.detail === 'replyForm' && !data?.account) {
			const qs = new URLSearchParams();
			qs.append('next', 'thread');
			qs.append('id', `${data?.board?.short}-${data?.thread?.slug}`);
			goto(`/login?${qs.toString()}`);
		} else {
			component = component === componentMap[event.detail] ? null : componentMap[event.detail];
		}
	};

	/** Resets the current component to null, rendering nothing */
	const handleResetComponent = () => {
		component = null;
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

	<svelte:component this={component} on:close={handleResetComponent} />

	<Thread thread={data?.thread} />
</div>

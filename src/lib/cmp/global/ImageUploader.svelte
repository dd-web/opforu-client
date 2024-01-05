<script>
	import { nanoid } from 'nanoid';

	/** @type {HTMLInputElement} */ let inputEl;
	/** @type {FileList} */ let files;
	/** @type {LocalFileInfo[]} */ let filesAttached = [];

	$: console.log('files attached', filesAttached);

	const handleFiles = async () => {
		console.log('file list:', files);
		if (files.length === 0) return;
		if (files.length + filesAttached.length > 9) {
			console.log('cannot attach more than 9 files');
			return;
		}

		await Promise.all(
			[...files].map((file) => {
				return new Promise((resolve, reject) => {
					/** @type {LocalFileInfo} */
					let fileInfo = {
						local_id: nanoid(),
						name: file.name,
						status: 'init',
						progress: 0,
						file: file,
						width: 0,
						height: 0
					};

					let shadow = new Image();
					shadow.src = URL.createObjectURL(file);
					shadow.onload = () => {
						fileInfo.width = shadow.width;
						fileInfo.height = shadow.height;
						resolve(fileInfo);
					};
					shadow.onerror = () => {
						reject('error loading image');
					};
				});
			})
		)
			.then((fileInfoValues) => {
				filesAttached = [...filesAttached, ...fileInfoValues];
			})
			.catch((error) => {
				console.log('file promise error:', error);
			});
	};
</script>

<div class="flex flex-col justify-between py-2 gap-4">
	<div class="bg-red-500 h-full">display area</div>
	<div class="relative">
		{#if filesAttached.length < 9}
			<label class="block h-20 rounded-xl outline-dashed outline-2 outline-zinc-700">
				<input
					bind:this={inputEl}
					bind:files
					on:change={handleFiles}
					disabled={filesAttached.length >= 9}
					type="file"
					accept="image/*"
					multiple
					class="h-full w-full opacity-0"
				/>
			</label>
			<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
				<button
					on:click={() => inputEl?.click()}
					type="button"
					class="btn-generic bg-zinc-800 py-1 px-2 text-zinc-400 hover:text-zinc-200 focus-visible:text-zinc-200"
					>Upload</button
				>
				<span class="text-xs mt-2 text-zinc-400">Drag and drop or click to upload</span>
			</div>
		{:else}
			<p class="text-zinc-400 text-center">Upload limit reached. Remove one or more files to add another.</p>
		{/if}
	</div>
</div>

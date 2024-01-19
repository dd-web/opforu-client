<script>
	import { alerts } from '$lib/stores/alerts';
	import { resolveFileInfo, createFormDataFromFileInfo, uploadFileInfo } from '$lib/utils/localfile';
	// import { newFileStore } from '$lib/stores/files';

	import UploadingFile from '../partials/UploadingFile.svelte';

	/** @type {HTMLInputElement} */ let inputEl;
	/** @type {FileList} */ let files;
	/** @type {LocalFileInfo[]} */ let filesAttached = [];

	$: console.log('files attached', filesAttached);

	/**
	 * Handles file input change events and resolves file info for each file
	 * @returns {Promise<void>}
	 */
	const handleFiles = async () => {
		if (files.length === 0) return;
		if (files.length + filesAttached.length > 9) {
			console.log('cannot attach more than 9 files');
			alerts.newAlert('Too many files. Total must be 9 or fewer.', 'warning');
			return;
		}

		await Promise.all([...files].map((file) => resolveFileInfo(file)))
			.then((fileInfoValues) => {
				filesAttached = [...filesAttached, ...fileInfoValues];
			})
			.catch((error) => {
				console.log('file promise error:', error);
				alerts.newAlert('Could not load file', 'error');
			})
			.finally(() => {
				for (const file of filesAttached) {
					if (file.uploaded) continue;
					const formData = createFormDataFromFileInfo(file);
					uploadFileInfo(formData, '?/fileUpload').then((res) => {
						handleUpdateFile({ ...file, uploaded: true });
						console.log('upload file resp:', res);
					});
				}
			});
	};

	/**
	 * Remove a file from attached files list by its local_id
	 * @param {string} id - local_id of file to remove
	 * @returns {void}
	 */
	const handleRemoveFile = (id) => {
		filesAttached = filesAttached.filter((file) => file.local_id !== id);
	};

	/**
	 * Update a file in attached files list
	 * @param {LocalFileInfo} file - updated file
	 * @returns {void}
	 */
	const handleUpdateFile = (file) => {
		filesAttached = filesAttached.map((f) => (f.local_id === file.local_id ? file : f));
	};
</script>

<div class="flex flex-col justify-between py-2 mx-2 gap-4">
	<div id="file-uploader" class="h-full flex gap-4 w-full overflow-x-scroll bg-zinc-900 rounded-t-md mt-4 px-4">
		{#each filesAttached as file (file.local_id)}
			<UploadingFile
				on:remove={(e) => handleRemoveFile(e.detail)}
				on:update={(e) => handleUpdateFile(e.detail)}
				{file}
			/>
		{/each}
	</div>
	<div class="relative">
		{#if filesAttached.length < 9}
			<label class="block h-16 rounded-xl outline-dashed outline-2 outline-zinc-700">
				<input
					bind:this={inputEl}
					bind:files
					on:change={handleFiles}
					disabled={filesAttached.length >= 9}
					type="file"
					accept="image/* video/*"
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

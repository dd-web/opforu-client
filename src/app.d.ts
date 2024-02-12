// See https://kit.svelte.dev/docs/types#app

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			account?: IAccount?;
			session?: ISession | string?;
		}
		// interface PageData {}
		// interface Platform {}
	}

	/*****************************/

	interface IStructMeta {
		_id?: string?;
		created_at?: string?;
		updated_at?: string?;
		deleted_at?: string?;
	}

	interface IPaginator {
		current_page: number;
		page_size: number;
		total_pages: number;
		total_records: number;
		last_page: number;
		last_page_size: number;
	}

	interface ISession {
		session_id: string;
		account_id: string;
		expires: string;
	}


	/** base data structures - more or less similar to back end */
	interface IAccount extends IStructMeta {
		username: string;
		email: string;
		role: keyof typeof EAccountRole;
		status: keyof typeof EAccountStatus;
	}

	interface IIdentity extends IStructMeta {
		name: string;
		role: keyof typeof EThreadRole;
		status: keyof typeof EIdentityStatus;
		style: string;
	}

	interface IArticle extends IStructMeta {
		author: IAccount;
		co_authors: IAccount[];
		assets: IAsset[];
		comments: IArticleComment[];
		title: string;
		body: string;
		slug: string;
		tags: string[];
		status: keyof typeof EArticleStatus;
	}

	interface IArticleComment extends IStructMeta {
		author: IAccount;
		comment_number: number;
		body: string;
		assets: IAsset[];
	}

	interface IAsset extends IStructMeta {
		asset_type: keyof typeof EAssetType;
		avatar: IAssetDetail;
		source: IAssetDetail;
		file_name: string;
		description: string;
		tags: string[];
	}

	interface IAssetDetail {
		server_file_name: string;
		height: number;
		width: number;
		file_size: number;
		url: string;
		extension: string;
		hash_md5: string;
		hash_sha256: string;
	}


	interface IBoard extends IStructMeta {
		title: string;
		short: string;
		description: string;
		threads: IThread[];
		post_ref: number;
	}

	interface IThread extends IStructMeta {
		title: string;
		body: string;
		slug: string;
		status: keyof typeof EThreadStatus;
		creator: IIdentity;
		mods: IIdentity[];
		posts: IPost[];
		assets: IAsset[];
		tags: string[];
		post_count: number;
	}

	interface IPost extends IStructMeta {
		body: string;
		creator: IIdentity;
		post_number: number;
		assets: IAsset[];
	}

	/*****************************/

	enum EAccountStatus {
		unknown = "unknown",
		active = "active",
		suspended = "suspended",
		banned = "banned",
		deleted = "deleted",
	}

	enum EAccountRole {
		unknown = "unknown",
		public = "public",
		user = "user",
		mod = "mod",
		admin = "admin",
	}

	enum EArticleStatus {
		draft = "draft",
		published = "published",
		archived = "archived",
		deleted = "deleted",
	}

	enum EIdentityStatus {
		unkown = "unknown",
		active = "active",
		suspended = "suspended",
		banned = "banned",
		deleted = "deleted",
	}

	enum EThreadStatus {
		open = "open",
		closed = "closed",
		archived = "archived",
		deleted = "deleted",
	}

	enum EThreadRole {
		user = "user",
		mod = "mod",
		creator = "creator",
	}

	enum EAssetType {
		unknown = "unknown",
		image = "image",
		video = "video",
	}

	/** front end specific types */
	/*****************************/

	enum EPostLinkType {
		"post-internal-thread" = "post-internal-thread",
		"thread-internal-board" = "thread-internal-board",
		"post-internal-board" = "post-internal-board",
		"thread-external-board" = "thread-external-board",
		"post-external-board" = "post-external-board",
	}

	enum EAlertType {
		success = "success",
		info = "info",
		warning = "warning",
		error = "error"
	}

	enum ELocalFileStatus {
		init = "init",
		uploading = "uploading",
		canceled = "canceled",
		complete = "complete",
		error = "error",
	}

	enum EModifiedContext {
		created = "created",
		updated = "updated",
		deleted = "deleted",
	}

	enum EButtonType {
		button = "button",
		submit = "submit",
		reset = "reset",
	}

	/*****************************/

	interface IActionBarItem {
		id: string;
		text: string;
		event_name: string;
		event_data: any;
	}

	interface IFormEvent {
		currentTarget: EventTarget & HTMLFormElement
	}

	interface IAlert {
		id: number;
		type: keyof typeof EAlertType;
		message: string;
		removecallback: number | NodeJS.Timeout;
	}

	interface ILocalFileInfo {
		local_id: string;
		source_id: string?; // set when response received from upload
		name: string; // filename on client machine
		status: keyof typeof ELocalFileStatus;
		description: string;
		file: File?; // actual file data
		width: number;
		height: number;
		type?: keyof typeof EAssetType;
		poster?: string?; // local image data used by preview display (base64)
		uploaded: boolean;
		signal?: AbortSignal?;
		progress: number;
	}

	interface IPostLinkData {
		link_type: keyof typeof EPostLinkType;
		post_number: number;
		board: string;
		thread: string;
	}

	/** form submission result structs */
	/***********************************/

	interface IAttachedFileData {
		source_id: string;
		description: string;
		file_name: string;
		tags: string[];
	}

	interface IPostDisplayData extends IStructMeta {
		assets: IAsset[];
		body: string;
		creator: IIdentity;
		tags?: string[];
	}

}

export { };

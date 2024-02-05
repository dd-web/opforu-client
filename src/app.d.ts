// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			account?: Account?;
			session?: Session | string?;
		}
		// interface PageData {}
		// interface Platform {}
	}

	/**
	 * These are Public API types for the most part. They are what a default public client would see, and
	 * a couple other ephemeral fields added for convenience. They do not represent the full data model or
	 * what a registered client would see. Extend from these bases when necessary.
	 */

	type Paginator = {
		current_page: number;
		page_size: number;
		total_pages: number;
		total_records: number;
		last_page: number;
		last_page_size: number;
	}

	type TimeStampGroup = {
		_id?: string;
		created_at: string;
		updated_at: string;
		deleted_at?: string;
	}

	type Account = TimeStampGroup & {
		username: string;
		email: string;
		role: AccountRole;
		status: AccountStatus;
	}

	type Article = TimeStampGroup & {
		title: string;
		body: string;
		slug: string;
		tags: string[];
		status: ArticleStatus;
		author: Account;
		co_authors: Account[];
	}

	type Board = TimeStampGroup & {
		title: string;
		short: string;
		description: string;
		threads: Thread[];
		post_ref: number;
	};

	type Thread = TimeStampGroup & {
		title: string;
		body: string;
		slug: string;
		status: ThreadStatus;
		creator: IIdentity;
		mods: IIdentity[];
		posts: Post[];
		assets: Asset[];
		tags: string[];
		post_count: number;
	}

	type Identity = TimeStampGroup & {
		name: string;
		role: ThreadRole;
		status: IdentityStatus;
		style: string;
	}

	type Post = TimeStampGroup & {
		body: string;
		creator: Identity;
		post_number: number;
		assets: Asset[];
	}

	type Session = TimeStampGroup & {
		session_id: string;
		account_id: string;
		expires: string;
	}

	type Asset = TimeStampGroup & {
		asset_type: AssetType;
		avatar: AssetDetail;
		source: AssetDetail;
		file_name: string;
		tags: string[];
	}

	type AssetDetail = {
		extension: string;
		height: number;
		width: number;
		size: number;
		size_str: string;
		url: string;
	}

	/**
	 * Enums / Constants
	 */
	enum AccountStatus {
		Unknown = 'unknown',
		Active = 'active',
		Suspended = 'suspended',
		Banned = 'banned',
		Deleted = 'deleted',
	}

	enum AccountRole {
		Unknown = 'unknown',
		Public = 'public',
		User = 'user',
		Mod = 'mod',
		Admin = 'admin',
	}

	enum ArticleStatus {
		Draft = 'draft',
		Published = 'published',
		Archived = 'archived',
		Deleted = 'deleted',
	}

	enum IdentityStatus {
		Unkown = 'unknown',
		Active = 'active',
		Suspended = 'suspended',
		Banned = 'banned',
		Deleted = 'deleted',
	}

	enum ThreadStatus {
		Open = 'open',
		Closed = 'closed',
		Archived = 'archived',
		Deleted = 'deleted',
	}

	enum ThreadRole {
		User = 'user',
		Mod = 'mod',
		Creator = 'creator',
	}


	/** Front end types */
	type AlertType = 'success' | 'info' | 'warning' | 'error';
	type AssetType = 'image' | 'video';
	type LocalFileStatus = 'init' | 'uploading' | 'canceled' | 'complete' | 'error';

	type Alert = {
		id: number;
		type: AlertType;
		message: string;
		removecallback: Timeout | null;
	}

	/** Local data structure only */
	interface LocalFileInfo {
		local_id: string; // random id for sync between client & server
		source_id: string?; // updated after a response is received from uploading (AssetSource reference)
		name: string; // filename on client machine
		status: LocalFileStatus; // state of file upload process for this file
		description: string; // client modified
		file: File?; // actual file data
		width: number;
		height: number;
		type?: AssetType?;
		poster?: string?; // local image data used by preview display (base64)
		uploaded: boolean; // skip doing it again
		signal?: AbortSignal?;
		progress: number;
	}

	/** Response object of file upload requests */
	interface AttachedFileData {
		source_id: string; // AssetSource reference
		description: string; // client modified
		file_name: string; // client modified
		tags: string[];
	}

	type PostDisplayData = TimeStampGroup & {
		assets: Asset[];
		body: string;
		creator: Identity;
		tags?: string[];
	}

	type PostLinkType = 'post-internal-thread' | 'thread-internal-board' | 'post-internal-board' | 'thread-external-board' | 'post-external-board';

	interface PostLinkData {
		link_type: PostLinkType;
		post_number: number;
		board: string;
		thread: string;
	}

}




export { };

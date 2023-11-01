// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			account?: Account | null;
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
		_id: string;
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
	}

	type Session = TimeStampGroup & {
		session_id: string;
		account_id: string;
		expires: string;
	}

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
}

/** End base type declarations */


export { };

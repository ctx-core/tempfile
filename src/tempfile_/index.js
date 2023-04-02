import { crypto_ } from '@ctx-core/crypto'
import { no_dom } from '@ctx-core/dom'
import { url__join } from '@ctx-core/uri'
/**
 * @param {string}[dir_path]
 * @param {string}[extension]
 * @returns {Promise<string>}
 * @private
 */
export async function tempfile_(dir_path, extension) {
	extension = extension.startsWith('.') ? extension : `.${extension}`
	if (dir_path == null) {
		dir_path =
			no_dom
			? await import('fs/promises')
				.then(fs=>
					import('os')
						.then(os=>
							fs.realpath(os.tmpdir())))
			: null
	}
	const crypto = await crypto_()
	return url__join([
		...(dir_path ? [dir_path] : []),
		`${crypto.randomUUID()}${
			extension
			? extension.startsWith('.') ? extension : `.${extension}`
			: ''
		}`
	])
}

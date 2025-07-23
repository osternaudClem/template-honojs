/** @type {import('prettier').Options} */
export default {
	useTabs: true,
	singleQuote: true,
	trailingComma: 'all',
	plugins: ['@trivago/prettier-plugin-sort-imports'],
	importOrder: [
		// Side-effect imports
		'^\\u0000',
		// External deps
		'^[a-zA-Z]',
		// Aliases
		'^@/(.*)$',
		// Parent imports
		'^[.]{2}/(.*)$',
		// Sibling imports
		'^[.]{1}/(.*)$',
		// Styles
		'\\.(css|scss|sass|less)$',
	],
	importOrderSeparation: true,
	// importOrderMergeDuplicateImports: true,
};

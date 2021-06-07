export const formatSlug = (slug: string): string => {
	const prefix = '/blog/'

	if (slug.includes(prefix)) {
		return slug
	}

	return prefix + slug
}

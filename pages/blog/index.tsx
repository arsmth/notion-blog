import Link from 'next/Link'

import { getBlogTable, PostType } from 'core/blog'

const Blog = ({ posts }: { posts: PostType[] }) => (
	<div>
		<h1>Blog</h1>
		{posts.map((post) => (
			<Link key={post.id} href="/blog/[slug]" as={`/blog/${post.slug}`}>
				<a>{post.title}</a>
			</Link>
		))}
	</div>
)

export const getStaticProps = async () => {
	const posts = await getBlogTable()

	return {
		props: {
			posts,
		},
		revalidate: 60,
	}
}

export default Blog

import Link from 'next/Link'

export const URL_NOTION_PAGE = `https://notion-api.splitbee.io/v1/page`
export const URL_NOTION_TABLE = `https://notion-api.splitbee.io/v1/table`
export const NOTION_TOKEN = process.env.NOTION_TOKEN
export const NOTION_BLOG_ID = process.env.NOTION_BLOG_ID

export interface Author {
	id: string
	firstName: string
	lastName: string
	fullName: string
	profilePhoto: string
}

export interface Post {
	id: string
	title: string
	slug: string
	published: boolean
	date: string
	authors: Author[]
	description: string
	category: string[]
}

const Blog = ({ posts }: { posts: Post[] }) => (
	<div>
		<h1>Blog</h1>
		{posts.map((post) => (
			<Link key={post.id} href="/blog/[slug]" as={`/blog/${post.slug}`}>
				<a>{post.title}</a>
			</Link>
		))}
	</div>
)

export const getAllPosts = async (): Promise<Post[]> => {
	const url = `${URL_NOTION_TABLE}/${NOTION_BLOG_ID}`
	return await fetch(url, {
		headers: {
			Authorization: `Bearer ${NOTION_TOKEN}`,
		},
	}).then((res) => res.json())
}

export const getStaticProps = async () => {
	const posts = await getAllPosts()

	return {
		props: {
			posts,
		},
		revalidate: 60,
	}
}

export default Blog

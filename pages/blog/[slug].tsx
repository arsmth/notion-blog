import { NotionRenderer, BlockMapType } from 'react-notion'

import { getAllPosts, NOTION_TOKEN, Post, URL_NOTION_PAGE } from '.'

interface Props {
	post: Post
	blocks: BlockMapType
}

const BlogPost = ({ post, blocks }: Props) => {
	return (
		<div>
			<h1>{post.title}</h1>
			<NotionRenderer blockMap={blocks} />
		</div>
	)
}

export async function getStaticPaths() {
	const posts = await getAllPosts()
	return {
		paths: posts.map((post) => `/blog/${post.slug}`),
		fallback: true,
	}
}

export async function getStaticProps({
	params: { slug },
}: {
	params: { slug: string }
}) {
	const posts = await getAllPosts()

	const post = posts.find((t) => t.slug === slug)

	const blocks = await fetch(`${URL_NOTION_PAGE}/${post!.id}`, {
		headers: {
			Authorization: `Bearer ${NOTION_TOKEN}`,
		},
	}).then((res) => res.json())

	return {
		props: {
			blocks,
			post,
		},
	}
}

export default BlogPost

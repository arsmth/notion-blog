import { NotionRenderer, BlockMapType } from 'react-notion'

import { getAllPosts, NOTION_TOKEN, Post, URL_NOTION_PAGE } from '.'
import { dateFormatter } from 'library/utils'

interface Props {
	post: Post
	blocks: BlockMapType
}

const BlogPost = ({ post, blocks }: Props) => {
	const postDate = new Date(post.date)

	return (
		<div className="max-w-xl mx-auto p-4">
			<div className="mb-5">
				<h1 className="mb-2 text-2xl font-bold md:text-3xl sm:text-center">
					{post.title}
				</h1>
				<div className="flex mt-3 sm:justify-center">
					<div className="flex flex-col items-center space-y-3 leading-5 text-gray-500 sm:flex-row sm:space-y-0">
						<time dateTime={postDate.toISOString()}>
							{dateFormatter.format(postDate)}
						</time>
						<div className="px-2 hidden sm:block">·</div>
						<div className="flex">
							<div className="w-5 h-5 mr-2 rounded-full overflow-hidden">
								<img
									alt={`${post.authors[0].fullName} profile photo`}
									src={post.authors[0].profilePhoto}
								/>
							</div>
							<p>{post.authors[0].fullName}</p>
						</div>
					</div>
				</div>
			</div>
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

import { BlockMapType } from 'react-notion'

export const NOTION_TOKEN = process.env.NOTION_TOKEN
export const NOTION_BLOG_ID = process.env.NOTION_BLOG_ID

export interface AuthorType {
	id: string
	firstName: string
	lastName: string
	fullName: string
	profilePhoto: string
}

export interface PostType {
	id: string
	title: string
	slug: string
	published: boolean
	date: string
	authors: AuthorType[]
	description: string
	category: string[]
}

const headers = {
	headers: {
		Authorization: `Bearer ${NOTION_TOKEN}`,
	},
}

export const getBlogTable = async (): Promise<PostType[]> =>
	fetch(
		`https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`,
		headers
	).then((res) => res.json())

export const getPageBlocks = async (pageId: string): Promise<BlockMapType> => {
	return await fetch(
		`https://notion-api.splitbee.io/v1/page/${pageId}`,
		headers
	).then((res) => res.json())
}

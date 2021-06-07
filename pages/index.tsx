import Head from 'next/head'
import Link from 'next/Link'

const Home = () => (
	<div>
		<Head>
			<title>Create Next App</title>
			<meta name="description" content="Generated by create next app" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<main>
			<h1>
				Checkout the <Link href="/blog">Blog</Link>.
			</h1>
		</main>
	</div>
)

export default Home

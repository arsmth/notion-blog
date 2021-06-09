import type { AppProps } from 'next/app'
import 'react-notion/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import 'tailwindcss/tailwind.css'

const App = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />
}

export default App

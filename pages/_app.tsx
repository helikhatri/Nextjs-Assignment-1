import './globals.css'
import header from './header';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} >
  <header/>
  </Component>
}

export default MyApp

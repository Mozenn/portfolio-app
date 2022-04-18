import '../styles/globals.scss';
import 'highlight.js/styles/tomorrow-night-bright.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

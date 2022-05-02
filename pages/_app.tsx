import '../styles/globals.scss';
import 'highlight.js/styles/tomorrow-night-bright.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { ThemeProvider } from '../hooks/useTheme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;

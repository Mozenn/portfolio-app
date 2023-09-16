import '../styles/globals.scss';
import 'highlight.js/styles/tomorrow-night-bright.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { ThemeProvider } from '../hooks/useTheme';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);

import '../styles/globals.scss';
import 'highlight.js/styles/tomorrow-night-bright.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import { ThemeProvider } from '../hooks/useTheme';
import { LocaleProvider } from '../hooks/useLocale';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);

import Head from 'next/head';
import Link from 'next/link';
import styles from './layout.module.scss';
import GoogleAnalytics from './google-analytics';
import { useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

const Layout = ({ children }: { children: JSX.Element }) => {
  const { theme, setTheme, toggleTheme, getFilterClass } = useTheme();

  useEffect(() => {
    if (
      theme === 'dark' &&
      !document.documentElement.classList.contains('darkTheme')
    ) {
      document.documentElement.classList.toggle('darkTheme');
      setTheme('dark');
    }
  });

  const onThemeButtonClicked = () => {
    toggleTheme();
  };

  const getCursorStyle = () =>
    theme === 'light' ? styles.lightCursor : styles.darkCursor;

  return (
    <div>
      {process.env.NODE_ENV === 'production' &&
        typeof window !== 'undefined' && <GoogleAnalytics />}
      <Head>
        <title>Gauthier Cassany</title>
        <link rel="icon" href="/favicons/favicon.ico" />
        <meta
          name="description"
          content="Software Engineer, Indie Game Developer"
        ></meta>
      </Head>

      <header>
        <div className={`${styles.header} ${styles.sticky}`}>
          <Link href="/" passHref>
            <img
              className={styles.headerLogo}
              src={`/images/logo-${theme}.png`}
              alt="Logo"
            />
          </Link>

          <nav className={styles.headerNavbarContainer}>
            <ul className={styles.headerNavbar}>
              <li className={styles.headerNavbarElement}>
                <Link href="/" passHref>
                  <label>Home</label>
                </Link>
              </li>
              <li className={styles.headerNavbarElement}>
                <Link href="/projects" passHref>
                  <label>Projects</label>
                </Link>
              </li>
              <li className={styles.headerNavbarElement}>
                <Link href="/posts" passHref>
                  <label>Blog</label>
                </Link>
              </li>
            </ul>
          </nav>
          <button
            className={styles.themeToggleButton}
            data-testid="theme-button"
            onClick={onThemeButtonClicked}
          >
            <img
              src="/images/moon.svg"
              alt="dark theme icon"
              className={`${getFilterClass()}`}
            />
            <img
              src="/images/sun.svg"
              alt="light theme icon"
              className={`${getFilterClass()}`}
            />
            <div className={`${styles.cursor} ${getCursorStyle()}`}></div>
          </button>
        </div>
      </header>

      <main>{children}</main>

      <footer className={styles.footer}>
        <span className={styles.footerBorder}></span>
        <div className={styles.informationBox}>
          <p className={styles.emailFooter}>gauthier.cassany@gmail.com</p>
          <div className={styles.contactList}>
            <li>
              <Link href="https://github.com/Mozenn" passHref>
                <img
                  className={`${styles.contactListIcon} ${getFilterClass()}`}
                  src="/images/github.svg"
                  alt="github icon"
                />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/gauthier-cassany-8a370b175/"
                passHref
              >
                <img
                  className={`${styles.contactListIcon} ${getFilterClass()}`}
                  src="/images/linkedin.svg"
                  alt="linkedIn icon"
                />
              </Link>
            </li>
            <li>
              <Link href="https://twitter.com/GCassany" passHref>
                <img
                  className={`${styles.contactListIcon} ${getFilterClass()}`}
                  src="/images/twitter.svg"
                  alt="twitter icon"
                />
              </Link>
            </li>
            <li>
              <Link href="/rss.xml" passHref>
                <img
                  className={`${styles.contactListIcon} ${getFilterClass()}`}
                  src="/images/rss.svg"
                  alt="rss icon"
                />
              </Link>
            </li>
          </div>

          <h3 className={styles.resumeListText}>Resume</h3>
          <ul className={styles.resumeList}>
            <li className={styles.resumeListIcon}>
              <a href="/data/resume-fr.pdf" target="_blank">
                <img src="/images/frflag.svg" alt="French Flag icon" />
              </a>
            </li>
            <li className={styles.resumeListIcon}>
              <a href="/data/resume-en.pdf" target="_blank">
                <img src="/images/ukflag.svg" alt="UK Flag icon" />
              </a>
            </li>
            <li className={styles.resumeListIcon}>
              <a href="/data/resume-en-no-picture.pdf" target="_blank">
                <img src="/images/ukflag.svg" alt="UK Flag icon" />
              </a>
            </li>
            <li>
              <label>without picture</label>
            </li>
          </ul>
        </div>
        <p>© Copyright 2022 Gauthier Cassany</p>
      </footer>
    </div>
  );
};

export default Layout;

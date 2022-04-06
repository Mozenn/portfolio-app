import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.scss";
import GoogleAnalytics from "./google-analytics";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";

const Layout = ({ children }: { children: any }) => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    if (
      theme === "dark" &&
      !document.documentElement.classList.contains("darkTheme")
    ) {
      document.documentElement.classList.toggle("darkTheme");
      setTheme("dark");
    }
  });

  const toggleTheme = () => {
    const newTheme = theme == "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("darkTheme");
  };

  const onThemeButtonClicked = () => {
    toggleTheme();
  };

  const getTheme = () => {
    const res = theme === "light" ? styles.light : styles.dark;
    return res;
  };

  const getCursorStyle = () =>
    theme === "light" ? styles.lightCursor : styles.darkCursor;

  return (
    <div>
      {process.env.NODE_ENV === "production" && process.browser && (
        <GoogleAnalytics />
      )}
      <Head>
        <title>Gauthier Cassany</title>
        <link rel='icon' href='/favicons/favicon.ico' />
      </Head>

      <header>
        <div className={`${styles.header} ${styles.sticky}`}>
          <Link href='/' passHref>
            <img
              className={styles.headerLogo}
              src={`/images/logo-${theme}.png`}
              alt='Logo'
            />
          </Link>
          <nav className={styles.headerNavbarContainer}>
            <ul className={styles.headerNavbar}>
              <li className={styles.headerNavbarElement}>
                <Link href='/' passHref>
                  <label>Home</label>
                </Link>
              </li>
              <li className={styles.headerNavbarElement}>
                <Link href='/projects' passHref>
                  <label>Projects</label>
                </Link>
              </li>
              <li className={styles.headerNavbarElement}>
                <Link href='/posts' passHref>
                  <label>Blog</label>
                </Link>
              </li>
            </ul>
          </nav>
          <button
            className={styles.themeToggleButton}
            onClick={onThemeButtonClicked}
          >
            <img
              src='/images/moon.svg'
              alt='dark theme icon'
              className={`${getTheme()}`}
            />
            <img
              src='/images/sun.svg'
              alt='light theme icon'
              className={`${getTheme()}`}
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
          <ul className={styles.contactList}>
            <li>
              <a href='https://github.com/Mozenn'>
                <img
                  className={`${styles.contactListIcon} ${getTheme()}`}
                  src='/images/github.svg'
                  alt='github icon'
                />
              </a>
            </li>
            <li>
              <a href='https://www.linkedin.com/in/gauthier-cassany-8a370b175/'>
                <img
                  className={`${styles.contactListIcon} ${getTheme()}`}
                  src='/images/linkedin.svg'
                  alt='linkedIn icon'
                />
              </a>
            </li>
            <li>
              <a href='https://twitter.com/GCassany'>
                <img
                  className={`${styles.contactListIcon} ${getTheme()}`}
                  src='/images/twitter.svg'
                  alt='twitter icon'
                />
              </a>
            </li>
            <li>
              <Link href='/rss.xml' passHref>
                <img
                  className={`${styles.contactListIcon} ${getTheme()}`}
                  src='/images/rss.svg'
                  alt='rss icon'
                />
              </Link>
            </li>
          </ul>
          <h3 className={styles.resumeListText}>Resume</h3>
          <ul className={styles.resumeList}>
            <li className={styles.resumeListIcon}>
              <a href='/data/resume-fr.pdf' target='_blank'>
                <img src='/images/frflag.svg' alt='French Flag icon' />
              </a>
            </li>
            <li className={styles.resumeListIcon}>
              <a href='/data/resume-en.pdf' target='_blank'>
                <img src='/images/ukflag.svg' alt='UK Flag icon' />
              </a>
            </li>
            <li className={styles.resumeListIcon}>
              <a href='/data/resume-en-no-picture.pdf' target='_blank'>
                <img src='/images/ukflag.svg' alt='UK Flag icon' />
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

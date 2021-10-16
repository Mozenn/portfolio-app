import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.scss";
import GoogleAnalytics from "./google-analytics";

const Layout = ({ children } : { children: any}) => {
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
              src='/images/logo.svg'
              alt='Logo'
            />
          </Link>
          <nav className={styles.headerNavbarContainer}>
            <ul className={styles.headerNavbar}>
              <li className={styles.headerNavbarElement}>
                <Link href='/'>
                  <a>Home</a>
                </Link>
              </li>
              <li className={styles.headerNavbarElement}>
                <Link href='/projects'>
                  <a>Projects</a>
                </Link>
              </li>
              <li className={styles.headerNavbarElement}>
                <Link href='/posts'>
                  <a>Blog</a>
                </Link>
              </li>
            </ul>
          </nav>
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
                  className={styles.contactListIcon}
                  src='/images/github.svg'
                  alt='github icon'
                />
              </a>
            </li>
            <li>
              <a href='https://www.linkedin.com/in/gauthier-cassany-8a370b175/'>
                <img
                  className={styles.contactListIcon}
                  src='/images/linkedin.svg'
                  alt='linkedIn icon'
                />
              </a>
            </li>
            <li>
              <a href='https://twitter.com/GCassany'>
                <img
                  className={styles.contactListIcon}
                  src='/images/twitter.svg'
                  alt='twitter icon'
                />
              </a>
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
        <p>© Copyright 2021 Gauthier Cassany</p>
      </footer>
    </div>
  );
};

export default Layout;

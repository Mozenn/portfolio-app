import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Gauthier Cassany</title>
        <link rel='icon' href='/favicons/favicon.ico' />
      </Head>

      <header>
        <div className={`${styles.header} ${styles.sticky}`}>
          <Link href='/'>
            <img
              className={styles.headerLogo}
              src='/images/Logo256.svg'
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
          <ul className={styles.resumeList}>
            <h3 className={styles.resumeListText}>Resume</h3>
            <li className={styles.resumeListIcon}>
              <a
                href='data/resume.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img src='/images/Flag.svg' alt='French Flag icon' />
              </a>
            </li>
            <li className={styles.resumeListIcon}>
              <a
                href='data/resume.pdf'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img src='/images/UKFlag.svg' alt='UK Flag icon' />
              </a>
            </li>
          </ul>
        </div>
        <p>© Copyright 2020 Cassany Gauthier</p>
      </footer>
    </div>
  );
};

export default Layout;

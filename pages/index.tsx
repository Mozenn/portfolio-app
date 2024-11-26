import Link from 'next/link';
import { GetStaticProps } from 'next';
import styles from '../styles/home.module.scss';
import ProjectCapsule from '../components/project-capsule';
import PostCapsule from '../components/posts/post-capsule';
import { getProjectsDataByPriority } from '../lib/projects';
import { getPostsDataByPriority } from '../lib/posts';
import { Project } from '../types/project';
import { Post } from '../types/post';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export const getStaticProps: GetStaticProps = async (context) => {
  const projectsToShow = getProjectsDataByPriority(2);
  const postsToShow = getPostsDataByPriority(2);
  const locale = context.locale || 'en';

  return {
    props: {
      ...(await serverSideTranslations(locale, ['home', 'layout'], null, [
        'en',
        'fr',
      ])),
      projectsToShow,
      postsToShow,
    },
  };
};

const Home = ({
  projectsToShow,
  postsToShow,
}: {
  projectsToShow: Project[];
  postsToShow: Post[];
}) => {
  const { t } = useTranslation('home');

  return (
    <>
      <section className={styles.landing}>
        <div>
          <h1 className={styles.landingName}>Mozenn</h1>
          <h2 className={styles.landingSubtitle}>{t('subtitle')}</h2>
        </div>
      </section>

      <section className={styles.about} id="about">
        <h2 className={styles.aboutTitle}>{t('about')}</h2>
        <div className={styles.aboutStory}>
          <p>
            {t('about-story-1')}
            <br />
            {t('about-story-2')}
            <br />
          </p>
        </div>
        <div className={styles.aboutStack}>
          <p>
            {t('about-stack-1')} <br /> {t('about-stack-2')}
          </p>
        </div>
      </section>

      <section className={styles.projects} id="projects">
        <h2 className={styles.projectsTitle}>{t('projects')}</h2>
        <div className={styles.projectsContainer}>
          {projectsToShow.map((project: Project) => {
            return (
              <ProjectCapsule
                key={project.id}
                id={project.id}
                title={project.title}
                imageName={project.imageName}
              />
            );
          })}
        </div>
        <div className={styles.LinkContainer}>
          <Link href="/projects" className={styles.Link}>
            {t('more')}
          </Link>
        </div>
      </section>

      <section className={styles.blog} id="blog">
        <h2 className={styles.blogTitle}>{t('blog')}</h2>
        <div className={styles.blogContainer}>
          {postsToShow.map((post: Post) => {
            return (
              <PostCapsule
                key={post.id}
                postData={post}
                scrollSnapEnabled={false}
              />
            );
          })}
        </div>
        <div className={styles.LinkContainer}>
          <Link href="/posts" className={styles.Link}>
            {t('more')}
          </Link>
        </div>
      </section>
      <section className={styles.newsletter} id="newsletter">
        <h2 className={styles.newsletterTitle}>{t('newsletter')}</h2>
        <div className={styles.newsletterText}>
          <p>{t('newsletter-text')}</p>
        </div>
        <iframe
          className={styles.newsletterContainer}
          src="https://fbbf7682.sibforms.com/serve/MUIEAL0eqLV1QfEy2tKdTPAytlukUMfKMqjiMLqcbHljqkpqkOaXmsbYjsW5Y0u9mTagIaeE5449rcGlsC9NfGVWhX2pwGG82DwJ93RXgos7A9H6UNtnvC47TtCn8ELfYMWJN5VS33h90xZRZ1Tn4PRVQCDATcDDhe3RxfoDJ1nws1VLYpLrJ3vUrqMVUs3SiQgxwNLar1Ge8Vm5"
          frameBorder="0"
          scrolling="auto"
          allowFullScreen
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '100%',
          }}
        ></iframe>
      </section>
    </>
  );
};

export default Home;

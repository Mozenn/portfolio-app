import Link from 'next/link';
import { GetStaticProps } from 'next';
import styles from '../styles/home.module.scss';
import ProjectCapsule from '../components/project-capsule';
import PostCapsule from '../components/posts/post-capsule';
import { getProjectsDataByPriority } from '../lib/projects';
import { getPostsDataByPriority } from '../lib/posts';
import { Project } from '../types/project';
import { Post } from '../types/post';

export const getStaticProps: GetStaticProps = async () => {
  const projectsToShow = getProjectsDataByPriority(2);
  const postsToShow = getPostsDataByPriority(2);

  return {
    props: {
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
  return (
    <>
      <section className={styles.landing}>
        <div>
          <h1 className={styles.landingName}>Gauthier Cassany</h1>
          <h2 className={styles.landingSubtitle}>
            Software Engineer, Indie Game Developer
          </h2>
        </div>
      </section>

      <section className={styles.about} id="about">
        <h2 className={styles.aboutTitle}>About</h2>
        <div className={styles.aboutStory}>
          <p>
            I am Gauthier, a 24 years old software engineer at Lyra Network and
            indie game developer living in Toulouse, France. <br />
            I love creating things, from games to software to world bulding and
            much more. <br />I am currently working on a game since more than
            four years as a solo developer.{' '}
          </p>
        </div>
        <div className={styles.aboutStack}>
          <p>
            I have tinkered with many technologies and can be defined as a
            T-shaped engineer. I am currently more focused on backend
            technologies like the Java ecosystem, DevOps technologies and
            practices such as CI/CD or automation, and Cloud Native
            Applications.
          </p>
        </div>
      </section>

      <section className={styles.projects} id="projects">
        <h2 className={styles.projectsTitle}>Projects</h2>
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
          <Link href="/projects">
            <a className={styles.Link}>See more ...</a>
          </Link>
        </div>
      </section>

      <section className={styles.blog} id="blog">
        <h2 className={styles.blogTitle}>Blog</h2>
        <div className={styles.blogContainer}>
          {postsToShow.map((post: Post) => {
            return <PostCapsule key={post.id} postData={post} />;
          })}
        </div>
        <div className={styles.LinkContainer}>
          <Link href="/posts">
            <a className={styles.Link}>See more ...</a>
          </Link>
        </div>
      </section>
      <section className={styles.newsletter} id="newsletter">
        <h2 className={styles.newsletterTitle}>Newsletter</h2>
        <div className={styles.newsletterText}>
          <p>
            Subscribe below to get notified when I publish a new blog post or
            when I announce something special.
          </p>
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

import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from 'next'
import styles from "../styles/home.module.scss";
import Layout from "../components/layout";
import ProjectCapsule from "../components/project-capsule";
import { getProjectsDataByPriority } from "../lib/projects";
import {Project} from "../types/project"; 

export const getStaticProps: GetStaticProps = async () => {
  const projectsToShow = getProjectsDataByPriority(2);
  return {
    props: {
      projectsToShow,
    },
  };
};

const Home = ({ projectsToShow } : {projectsToShow: Project[]} ) => {
  return (
    <Layout>
      <section className={styles.landing}>
        <div>
          <h1 className={styles.landingName}>Gauthier Cassany</h1>
          <h2 className={styles.landingSubtitle}>
            Software Engineer, Indie Game Developer
          </h2>
        </div>
      </section>

      <section className={styles.about} id='about'>
        <h2 className={styles.aboutTitle}>About</h2>
        <div className={styles.aboutStory}>
          <p>
            I am Gauthier, a 23 years old software engineer at Lyra Network and
            indie game developer living in Toulouse, France. <br />
            I love creating things, from games to software to world bulding and
            much more. <br />I am currently working on a game since more than
            two years as a solo developer.{" "}
          </p>
        </div>
        <div className={styles.aboutStack}>
          <p>
            I have tinkered with many technologies and can be defined as a
            jack-of-all-trades, but I am more attracted to backend technologies
            like the Java ecosystem, DevOps technologies and practices such as
            CI/CD or automation and software architecture.
          </p>
        </div>
      </section>

      <section className={styles.projects} id='projects'>
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
        <div className={styles.projectsLinkContainer}>
          <Link href='/projects'>
            <a className={styles.projectsLink}>See more ...</a>
          </Link>
        </div>
      </section>

      <section className={styles.blog} id='blog'>
        <h2 className={styles.blogTitle}>Blog</h2>
        <div className={styles.blogContainer}>
          <p>Coming Soon</p>
        </div>
      </section>
    </Layout>
  );
};

export default Home;

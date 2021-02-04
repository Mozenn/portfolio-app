import Head from "next/head";
import Link from "next/link";
import styles from "../styles/home.module.scss";
import Layout from "../components/layout";
import ProjectCapsule from "../components/project-capsule";
import { getProjectsDataByPriority } from "../lib/projects";

export const getStaticProps = async () => {
  const projectsToShow = getProjectsDataByPriority(2);
  return {
    props: {
      projectsToShow,
    },
  };
};

const Home = ({ projectsToShow }) => {
  return (
    <Layout>
      <section className={styles.landing}>
        <div>
          <h1 className={styles.landingName}>Cassany Gauthier</h1>
          <h2 className={styles.landingSubtitle}>
            Software Engineering Student, Indie Game Developer
          </h2>
        </div>
      </section>

      <section className={styles.about} id='about'>
        <h2 className={styles.aboutTitle}>About</h2>
        <div className={styles.aboutStory}>
          <p>
            I am Gauthier, a 22 years old software engineering student and indie
            game developer living in Toulouse, France. <br />
            I love creating things, from games to software to world bulding and
            much more. <br />I am currently working on a game since a year and a
            half as a solo developer.{" "}
          </p>
        </div>
        <div className={styles.aboutStack}>
          <p>
            I have tinkered with many technologies but here is what I am most
            familiar with :{" "}
          </p>
        </div>
      </section>

      <section className={styles.projects} id='projects'>
        <h2 className={styles.projectsTitle}>Projects</h2>
        <div className={styles.projectsContainer}>
          {projectsToShow.map((project) => {
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
          <Link href='#'>
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

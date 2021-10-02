import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from 'next'
import styles from "../styles/home.module.scss";
import Layout from "../components/layout";
import ProjectCapsule from "../components/project-capsule";
import PostCapsule from "../components/posts/post-capsule";
import { getProjectsDataByPriority } from "../lib/projects";
import { getPostsDataByPriority } from "../lib/posts";
import {Project} from "../types/project"; 
import { Post } from "../types/post";

export const getStaticProps: GetStaticProps = async () => {
  const projectsToShow = getProjectsDataByPriority(2);
  const postsToShow = getPostsDataByPriority(2);

  return {
    props: {
      projectsToShow,
      postsToShow
    },
  };
};

const Home = ({ projectsToShow, postsToShow } : {projectsToShow: Project[], postsToShow: Post[]} ) => {
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
            I have tinkered with many technologies and can be defined as
            a T-shaped engineer. I am currently more focused on backend technologies like the Java ecosystem,
            DevOps technologies and practices such as CI/CD or automation, and Cloud Native Applications, but I am ready to work my way through any interesting challenge.
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
        <div className={styles.LinkContainer}>
          <Link href='/projects'>
            <a className={styles.Link}>See more ...</a>
          </Link>
        </div>
      </section>
        
      <section className={styles.blog} id='blog'>
        <h2 className={styles.blogTitle}>Blog</h2>
        <div className={styles.blogContainer}>
        {postsToShow.map((post: Post) => {
            return (
              <PostCapsule
                key={post.id}
                postData={post}
              />
            );
          })}
        </div>
        <div className={styles.LinkContainer}>
          <Link href='/posts'>
            <a className={styles.Link}>See more ...</a>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;

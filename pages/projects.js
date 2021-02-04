import Layout from "../components/layout";
import { getAllProjectsData } from "../lib/projects";
import styles from "../styles/projects.module.scss";
import ProjectCapsule from "../components/project-capsule";

export const getStaticProps = async () => {
  const projects = getAllProjectsData();
  return {
    props: {
      projects,
    },
  };
};

const Projects = ({ projects }) => {
  return (
    <Layout>
      <div className={styles.container}>
        {projects.map((project) => {
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
    </Layout>
  );
};

export default Projects;

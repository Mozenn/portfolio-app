import { GetStaticProps } from "next";
import { getAllProjectsData } from "../lib/projects";
import styles from "../styles/projects.module.scss";
import ProjectCapsule from "../components/project-capsule";
import { Project } from "../types/project";

export const getStaticProps: GetStaticProps = async () => {
  const projects = getAllProjectsData();
  return {
    props: {
      projects,
    },
  };
};

const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <>
      <div className={styles.container}>
        {projects.map((project: Project) => {
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
    </>
  );
};

export default Projects;

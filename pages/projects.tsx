import { getAllProjectsData } from '../lib/projects';
import styles from '../styles/projects.module.scss';
import ProjectCapsule from '../components/project-capsule';
import { Project } from '../types/project';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
  const projects = getAllProjectsData();
  const locale = context.locale || 'en';

  return {
    props: {
      ...(await serverSideTranslations(locale, ['layout'], null, ['en', 'fr'])),
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

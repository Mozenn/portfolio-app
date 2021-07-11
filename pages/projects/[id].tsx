import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from 'next'
import { IdParams } from '../../types/IdParams'
import Layout from "../../components/layout";
import AccessLink from "../../components/access-link";
import { getAllProjectIds, getProjectFullData } from "../../lib/projects";
import styles from "../../styles/project.module.scss";
import { Project } from "../../types/project";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllProjectIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const {id} = context.params as IdParams
  const projectFullData = getProjectFullData(id);
  return {
    props: {
      projectFullData,
    },
  };
};

export const ProjectPage = ({ projectFullData } : {projectFullData : Project}) => {
  const {
    title,
    priority,
    imageName,
    iconName,
    stack,
    githubUrl,
    accessUrl,
    content,
  } = projectFullData;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article className={styles.container}>
        <div className={styles.heading}>
          <img
            className={styles.headingIcon}
            src={`/images/${iconName}`}
            alt={`${title.toLowerCase()} icon`}
          />
          <h2 className={styles.headingTitle}>{title}</h2>
        </div>
        <div className={styles.content}>
          <div
            className={styles.contentText}
            dangerouslySetInnerHTML={{ __html: content as string}}
          />
          <img
            className={styles.contentImage}
            src={`/images/${imageName}`}
            alt={`${title.toLowerCase()} image`}
          />
        </div>
        <div className={styles.links}>
          <p>{`Stack: ${stack}`}</p>
          {githubUrl && <AccessLink iconName='github.svg' url={githubUrl} />}
          {accessUrl && <AccessLink iconName='link.svg' url={accessUrl} />}
        </div>
      </article>
    </Layout>
  );
};

export default ProjectPage;

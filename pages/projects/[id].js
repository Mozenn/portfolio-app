import Head from "next/head";
import Layout from "../../components/layout";
import AccessLink from "../../components/access-link";
import { getAllProjectIds, getProjectFullData } from "../../lib/projects";
import styles from "../../styles/project.module.scss";

export const getStaticPaths = async () => {
  const paths = getAllProjectIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = ({ params }) => {
  const projectFullData = getProjectFullData(params.id);
  return {
    props: {
      projectFullData,
    },
  };
};

export const Project = ({ projectFullData }) => {
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
            dangerouslySetInnerHTML={{ __html: content }}
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

export default Project;

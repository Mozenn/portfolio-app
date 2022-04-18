import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import { Project } from '../types/project';

const projectsDirectory = path.join(process.cwd(), 'projects');
const md = new MarkdownIt();

const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

export const getProjectsDataByPriority = (count: number) => {
  if (count < 1) {
    throw new Error('cout must be at least 1');
  }

  return getAllProjectsData()
    .sort((pa: Project, pb: Project) => {
      if (pa.priority < pb.priority) {
        return -1;
      } else if (pa.priority > pb.priority) {
        return 1;
      } else {
        return pa.title.localeCompare(pb.title) * -1;
      }
    })
    .slice(0, count);
};

export const getAllProjectsData = (): Project[] => {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((fileName: string): Project => {
    const filePath = path.join(projectsDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const id = fileName.replace(/\.md$/, '');

    const {
      title,
      priority,
      imageName,
      iconName,
      stack,
      githubUrl,
      accessUrl,
    } = matter(fileContent).data;

    const res = {
      id,
      title,
      priority,
      imageName,
      iconName,
      stack,
      githubUrl,
      accessUrl,
    };

    getKeys(res).forEach((key) => res[key] === undefined && delete res[key]);

    return res;
  });
};

export const getProjectFullData = (id: string): Project => {
  const filePath = path.join(projectsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const matterResult = matter(fileContent);

  const content = md.render(matterResult.content);
  const { title, priority, imageName, iconName, stack, githubUrl, accessUrl } =
    matterResult.data;

  const res = {
    content,
    id,
    title,
    priority,
    imageName,
    iconName,
    stack,
    githubUrl,
    accessUrl,
  };

  getKeys(res).forEach((key) => res[key] === undefined && delete res[key]);

  return res;
};

export const getAllProjectIds = () => {
  const fileNames = fs.readdirSync(projectsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
};

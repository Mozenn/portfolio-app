import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const projectsDirectory = path.join(process.cwd(), "projects");
const md = new MarkdownIt();

export const getProjectsDataByPriority = (count) => {
  if (count < 1) {
    throw new Error("cout must be at least 1");
  }

  return getAllProjectsData()
    .sort((pa, pb) => {
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

export const getAllProjectsData = () => {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((fileName) => {
    const filePath = path.join(projectsDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const id = fileName.replace(/\.md$/, "");

    return { id, ...matter(fileContent).data };
  });
};

export const getProjectFullData = (id) => {
  const filePath = path.join(projectsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const matterResult = matter(fileContent);

  const content = md.render(matterResult.content);

  return {
    content,
    id,
    ...matterResult.data,
  };
};

export const getAllProjectIds = () => {
  const fileNames = fs.readdirSync(projectsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'game'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'odop'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

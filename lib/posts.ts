import path from "path";
import MarkdownIt from "markdown-it";
import fs from "fs";
import matter from "gray-matter";
import { Post } from "../types/post";

const postsDirectory = path.join(process.cwd(), "posts");
const md = new MarkdownIt();

const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

export const getPostsDataByPriority = (count: number) => {
  if (count < 1) {
    throw new Error("cout must be at least 1");
  }

  return getAllPostsData()
    .sort((pa: Post, pb: Post) => {
      console.log("posts")
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

export const getAllPostsData = (): Post[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName: string): Post => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const id = fileName.replace(/\.md$/, "");

    const { title, priority, tags, author, date } = matter(fileContent).data;

    const res = { id, title, priority, tags, author, date };

    getKeys(res).forEach((key) => res[key] === undefined && delete res[key]);

    return res;
  });
};

export const getAllTagsFromPosts = (posts: Post[]) => {
  const unfilteredTags = posts.reduce(
    (acc: Array<string>, post: Post): Array<string> => {
      let tags: Array<string> = post.tags;
      return [...acc, ...tags];
    },
    []
  );

  return [...new Set(unfilteredTags)];
};

export const getPostFullData = (id: string): Post => {
  const filePath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const matterResult = matter(fileContent);

  const content = md.render(matterResult.content);
  const { title, priority, tags, author, date } = matterResult.data;

  const res = {
    content,
    id,
    title,
    priority,
    author,
    tags,
    date,
  };

  getKeys(res).forEach((key) => res[key] === undefined && delete res[key]);

  return res;
};

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

import path from "path";
import MarkdownIt from "markdown-it";
import fs from "fs";
import matter from "gray-matter";
import { Post } from "../types/post";
import hljs from "highlight.js";

const postsDirectory = path.join(process.cwd(), "posts");
const md = new MarkdownIt();
md.set({highlight: (str: string, lang: string, attrs: string) => {
  if(lang && hljs.getLanguage(lang)){
    return hljs.highlight(str, {language: lang, ignoreIllegals: true}).value
  }

  return str;
}})

const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

export const getPostsDataByPriority = (count: number) => {
  if (count < 1) {
    throw new Error("cout must be at least 1");
  }

  return getAllPostsData()
    .sort((pa: Post, pb: Post) => {
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

export const getPostsDataByDate = () => {

  return getAllPostsData()
    .sort((pa: Post, pb: Post) => {
      const dateA = new Date(pa.date);
      const dateB = new Date(pb.date);
      if (dateA < dateB) {
        return 1;
      } else if (dateA > dateB) {
        return -1;
      } else {
        return pa.title.localeCompare(pb.title) * -1;
      }
    })
};

export const getAllPostsData = (): Post[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName: string): Post => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const id = fileName.replace(/\.md$/, "");

    const matterResult = matter(fileContent);

    const { title, priority, bannerPath, tags, author, date } = matterResult.data;
    const content = md.render(matterResult.content);
    const timeEstimate = computeTimeEstimateInMinutes(content);

    const res = { id, title, bannerPath, priority, tags, author, date , timeEstimate};

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
  const { title, bannerPath, priority, tags, author, date } = matterResult.data;
  const timeEstimate = computeTimeEstimateInMinutes(content);

  const res = {
    content,
    id,
    title,
    bannerPath,
    priority,
    author,
    tags,
    date,
    timeEstimate
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

const computeTimeEstimateInMinutes = (content: string) : number => {

  const wordsPerMinute = 250;
  const imageTimeMinutes = 0.25;
  let imageCount = 0;
  const wordRegex = /\w/
  const wordCount = content.split(' ').filter(word => {
    if (word.includes('<img')) {
      imageCount += 1
    }
    return wordRegex.test(word)
  }).length;

  const timeMinutes = Math.ceil((wordCount/wordsPerMinute) + imageTimeMinutes * imageCount);
  
  return timeMinutes;
}
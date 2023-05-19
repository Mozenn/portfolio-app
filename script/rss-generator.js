const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'posts');

const getAllPostsData = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .map((fileName) => {
      const filePath = path.join(postsDirectory, fileName);

      if (fs.lstatSync(filePath).isDirectory()) return undefined;

      const fileContent = fs.readFileSync(filePath, 'utf8');
      const id = fileName.replace(/\.md$/, '');

      const matterResult = matter(fileContent);

      const { title, priority, tags, author, date, description } =
        matterResult.data;

      const res = {
        id,
        title,
        priority,
        tags,
        author,
        date,
        description,
      };

      Object.keys(res).forEach(
        (key) => res[key] === undefined && delete res[key]
      );

      return res;
    })
    .filter((p) => p)
    .sort((pa, pb) => {
      const dateA = new Date(pa.date);
      const dateB = new Date(pb.date);
      if (dateA < dateB) {
        return 1;
      } else if (dateA > dateB) {
        return -1;
      } else {
        return pa.title.localeCompare(pb.title) * -1;
      }
    });
};

const postsDataToXml = (postsData) => {
  let latestPostDate = '';
  let rssItemsXml = '';
  postsData.forEach((postData) => {
    const postDate = Date.parse(postData.date);
    const postHref = `https://gauthier-cassany.com/posts/${postData.id}`;

    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = postData.date;
    }

    rssItemsXml += `
    <item>
      <title><![CDATA[${postData.title}]]></title>
      <link>${postHref}</link>
      <pubDate>${postData.date}</pubDate>
      <guid isPermaLink="false">${postHref}</guid>
      <description>
      <![CDATA[${postData.description}]]>
      </description>
    </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate,
  };
};

const getRssXml = (postsData) => {
  const { rssItemsXml, latestPostDate } = postsDataToXml(postsData);

  return `<?xml version="1.0" ?>
  <rss
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    version="2.0"
  >
    <channel>
        <title><![CDATA[Software engineering articles by Gauthier Cassany]]></title>
        <link>https://gauthier-cassany.com</link>
        <description>
          <![CDATA[Blog posts about Software Engineering by Gauthier Cassany]]>
        </description>
        <language>en</language>
        <lastBuildDate>${latestPostDate}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`;
};

const generateRss = () => {
  const postsData = getAllPostsData();
  const rssFeed = getRssXml(postsData);

  fs.writeFileSync(`${process.cwd()}/public/rss.xml`, rssFeed);
};

generateRss();

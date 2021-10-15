import { useState, useEffect } from "react"
import Layout from "../components/layout";
import { getAllPostsData, getAllTagsFromPosts } from "../lib/posts";
import styles from "../styles/posts.module.scss";
import { Post } from "../types/post";
import PostTag from "../components/posts/post-tag";
import PostCapsule from "../components/posts/post-capsule";

export const getStaticProps = async () => {
  const posts = getAllPostsData();
  const tags = getAllTagsFromPosts(posts);
  return {
    props: {
      posts,
      tags
    },
  };
};

const Posts = ({ posts, tags } : {posts: Post[], tags: string[]}) => {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);

  const onTagClicked = (tag: string) => {
    setActiveTags((prevTags: string[]) => {
      if(prevTags.includes(tag)){
        return prevTags.filter(t => t !== tag);
      } else{
        return [...prevTags,tag];
      }
    })
  }

  useEffect(() => {
    if(activeTags.length === 0){
      setFilteredPosts(posts);
    }else{
      setFilteredPosts(posts.filter(post => {
        return post.tags.some(tag => activeTags.includes(tag));
      }))
    }
  }, [activeTags,posts]);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.tagContainer}>
          {tags.map(tag => {
            return <PostTag key={tag} label={tag} onClick={onTagClicked}/>
          })}
        </div>
        <div className={styles.postContainer}>
          {filteredPosts.map(post => {
            return <PostCapsule key={post.id} postData={post}/>
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Posts;

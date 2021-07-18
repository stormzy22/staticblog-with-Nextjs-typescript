import { GetStaticProps } from "next";
import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import { Post } from "../components/Post";

export interface Posts {
  posts: [
    {
      frontmatter: {
        cover_image: string;
        date: string;
        excerpt: string;
        title: string;
      };
      slug: string;
    }
  ];
}

export default function Home({ posts }: Posts): JSX.Element {
  // console.log(posts);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <div className="posts">
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Get files from the post dir
  const files = fs.readdirSync(path.join("posts"));

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    //Create slug
    const slug = filename.replace(".md", "");

    //Get frontmatter
    const marKdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(marKdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
};

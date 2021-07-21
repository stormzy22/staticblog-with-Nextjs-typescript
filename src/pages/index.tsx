import fs from "fs";
import matter from "gray-matter";
import { GetStaticProps } from "next";
import Head from "next/head";
import path from "path";
import React from "react";
import { Post } from "../components/Post";

export interface Posts {
  posts: [];
}

export default function Home({ posts }: Posts): JSX.Element {
  // console.log(posts);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>

      <div className="posts">
        {posts?.map(
          (
            post: {
              frontmatter: {
                cover_image: string;
                date: string;
                excerpt: string;
                title: string;
              };
              slug: string;
            },
            index: React.Key | null | undefined
          ) => (
            <Post post={post} key={index} />
          )
        )}
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
      posts: posts.sort((a, b) => {
        return (
          new Date(b.frontmatter.date).valueOf() -
          new Date(a.frontmatter.date).valueOf()
        );
      }),
    },
  };
};

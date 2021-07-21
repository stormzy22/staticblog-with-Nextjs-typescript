import fs from "fs";
import matter from "gray-matter";
import marked from "marked";
import Link from "next/link";
import path from "path";
import React from "react";

interface Iparams {
  params: {
    slug: string;
  };
}

interface Mparams {
  frontmatter: {
    title: string;
    date: string;
    cover_image: string;
  };
  slug: string;
  content: string;
}

const postPage = ({
  frontmatter: { title, date, cover_image },
  // slug,
  content,
}: Mparams): JSX.Element => {
  return (
    <>
      <Link href="/">
        <a className="btn btn-back">Go Back</a>
      </Link>
      <div className="card card-page">
        <h1 className="post-title">{title}</h1>
        <div className="post-date">Posted on {date}</div>
        <img src={cover_image} alt="" />
        <div className="post-body">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </>
  );
};

export default postPage;

export const getStaticPaths = async (): Promise<unknown> => {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { slug },
}: Iparams): Promise<unknown> => {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);
  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
};

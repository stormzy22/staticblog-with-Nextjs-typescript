import Link from "next/link";
import React from "react";

interface Param {
  post: {
    frontmatter: {
      cover_image: string;
      date: string;
      excerpt: string;
      title: string;
    };
    slug: string;
  };
}

export const Post = ({ post }: Param): JSX.Element => {
  return (
    <div className="card">
      <img src={post.frontmatter.cover_image} alt="" />
      <div className="post-date">Posted on {post.frontmatter.date}</div>
      <h3>{post.frontmatter.title}</h3>
      <p>{post.frontmatter.excerpt}</p>
      <Link href={`/blog/${post.slug}`}>
        <a className="btn">Read More</a>
      </Link>
    </div>
  );
};

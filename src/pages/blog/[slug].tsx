import fs from "fs";
import { GetStaticProps } from "next";
import path from "path";

import React from "react";

const postPage = (): JSX.Element => {
  return (
    <div>
      <h1>Post</h1>
    </div>
  );
};

export default postPage;

export const getStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
  console.log(slug);
  return {
    props: {},
  };
};

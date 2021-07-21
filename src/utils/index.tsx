export const sortByDate = (
  a: { frontmatter: { date: string | number } },
  b: { frontmatter: { date: string | number } }
): number | string => {
  const value =
    new Date(b.frontmatter.date).valueOf() -
    new Date(a.frontmatter.date).valueOf();

  return value;
};

import React from "react";
import Link from "next/link";

const Header = (): JSX.Element => {
  return (
    <header>
      <div className="container">
        <Link href="/">
          <h2>Dev Blog</h2>
        </Link>
      </div>
    </header>
  );
};

export default Header;

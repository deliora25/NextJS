import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="header">
      <h1 className="logo">
        <a href="#">The Z Closet</a>
      </h1>
      <ul
        className={`main-nav ${
          !session && status === "loading" ? "loading" : "loaded"
        }`}
      >
        <li>
          <Link className="a" href="/">
            Home
          </Link>
        </li>
        {session && (
          <div>
            <li>
              <Link href="/api/auth/signout" onClick={() => signOut("github")}>
                Sign out
              </Link>
            </li>
          </div>
        )}

        {!session && status !== "loading" && (
          <div style={{ display: "flex" }}>
            <li>
              <Link className="a" href="/dashboard">
                Services
              </Link>
            </li>
            <li>
              <Link className="a" href="/blog">
                Opportunities
              </Link>
            </li>
            <li>
              <Link
                className="a"
                href="/api/auth/signin"
                onClick={() => signIn("github")}
              >
                Sign in
              </Link>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

"use client";
import Link from "next/link";
import styles from "./links.module.css";
import Image from "next/image";
import { useState } from "react";
import NavLink from "../navLink/navLink";
import { handleGithubLogout } from "@/lib/action";

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

const isAdmin = true;

const Links = ({ session }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}

        {session?.user ? (
          <>
            {session.user?.isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
            <form action={handleGithubLogout}>
            <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <NavLink item={{ title: "login", path: "/login" }} />
        )}
      </div>
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
           {session?.user ? (
          <div className={styles.mobileAuth}>
            {session.user?.isAdmin && <NavLink item={{ title: "Admin", path: "/admin" }} />}
            <form action={handleGithubLogout}>
            <button className={styles.logout}>Logout</button>
            </form>
          </div>
        ) : (
          <NavLink item={{ title: "login", path: "/login" }} />
        )}
        </div>
      )}
    </div>
  );
};

export default Links;

import React, { useState } from "react";
import styles from "./Nav.module.css";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Hamburger icon that is hidden by CSS when screen width is less than 660px */}
      <div
        className={`${styles.hamburger} ${isMenuOpen && styles.isMenuOpen}`}
        onClick={toggleMenu}
      >
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      {/* Nav Menu, shown unless screen width less than 660px, then will open when hamburger icon is clicked */}
      <nav className={`${styles.navCon} ${isMenuOpen && styles.isOpen}`}>
        <a href="/dashboard" className={styles.links}>
          Dashboard
        </a>
        <a href="/dashboard" className={styles.links}>
          Scheduled
        </a>
        <a href="/dashboard" className={styles.links}>
          Worked
        </a>
        <a href="/logout" className={styles.links}>
          Logout
        </a>
      </nav>
    </div>
  );
}

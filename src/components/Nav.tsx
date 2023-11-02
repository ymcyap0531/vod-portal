import React from "react";
import styles from '../styles/Nav.module.css'
import Image from 'next/image'

const Nav = () => {
    return (
      <nav className={styles.navbar}>
        <div className="flex justify-between max-w-[1200px] mx-auto">
          <div className={styles.logo}>
            <a href="index.html">
              <Image src="/images/logo.png" width={200} height={37} alt="logo" />
            </a>
          </div>
          <div className={`${styles.navContainer} ${styles.navPortal}`}>
            <nav>
              <ul className={styles.menu}>
                <div className={styles.useridtxt} id="accBtn">
                  [username]
                  <i className={`${styles.fa} ${styles.faUser}`} />
                </div>
                <div>
                  <li className={styles.navItem}>
                    <a href="index.html" className={styles.tab}>
                      Home
                    </a>
                  </li>
                  <li className={styles.navItem}>
                    <a href="featured.html" className={styles.tab}>
                      Featured
                    </a>
                  </li>
                  <li className={styles.navItem}>
                    <a href="genres.html" className={styles.tab}>
                      Genres
                    </a>
                  </li>
                  <li className={styles.navItem}>
                    <a href="signin_form.html" className={`${styles.tab} ${styles.tabbtn} ${styles.logout}`}>
                      Logout
                    </a>
                  </li>
                </div>
              </ul>
            </nav>
          </div>
        </div>
      </nav>
    );
}

export default Nav;

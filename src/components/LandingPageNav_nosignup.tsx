import Link from "next/link";
import React from "react";
import Image from "next/image";

const LandingPageNav = ({ styles, brand, translatedText }: any) => {
  return (
    <>
      <nav className={styles.navbar}>
        <div className=" max-w-[1200px] mx-auto left-0 right-0">
          <div className="mx-2 sm:flex justify-between">
            <div className="logo">
              <Link href="/">
                <a>
                  <Image
                    height={36}
                    width={200}
                    src={`/images/${brand.attributes.template}.png`}
                    alt="logo"
                  />
                </a>
              </Link>
            </div>
            <div className="nav-container">
              <nav>
                <ul className="menu">
                  <li className="nav-item">
                    <a href="#sec1" className="tab">
                      {translatedText.home}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#sec2" className="tab">
                      {translatedText.movies}
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link href="/Support" passHref>
                      <a target="_blank" className="tab">
                        {translatedText.support}
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="SignInForm">
                      <a className={`tab ${styles.tabbtn}`}>
                        {translatedText.login}
                      </a>
                    </Link>
                  </li>
                  
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default LandingPageNav;

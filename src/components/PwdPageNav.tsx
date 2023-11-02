import React from "react";
import Image from "next/image";
import Link from "next/link";

const PwdPageNav = ({ styles, brand, translatedText }: any) => {
  return (
    <>
      <nav className={styles.navbar}>
        <div className="container flex justify-between">
          <div className="logo">
            <Link href="/Portal">
              <a>
                <Image
                  height={36}
                  width={200}
                  src={`${process.env.NEXT_PUBLIC_CONTENT_IMAGE_URL}img/${brand.attributes.template}/logo.png`}
                  alt="logo"
                />
              </a>
            </Link>
          </div>
          <div className="nav-container">
            <nav>
              <ul className="menu">
                <li className="nav-item">
                  <Link href="/Portal">
                    <a className="tab">{translatedText.home}</a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </nav>
    </>
  );
};

export default PwdPageNav;

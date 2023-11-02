import Link from "next/link";
import React from "react";
import Image from "next/image";

const SignInOutNav = ({ styles, translatedText, brand }: any) => {
  return (
    <>
      <nav className={styles.navbar}>
        <div className="container mx-auto sm:flex justify-between">
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
              <ul className="flex list-none sm:items-right">
                <li className="nav-item">
                  <Link href="/">
                    <a className="tab">{translatedText.home}</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/Support" passHref>
                    <a target="_blank" className="tab">
                      {translatedText.support}
                    </a>
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

export default SignInOutNav;

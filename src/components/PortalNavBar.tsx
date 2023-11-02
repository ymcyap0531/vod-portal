import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { destroyCookie } from "nookies";
import { useTranslation } from "react-i18next";

import MyAccount from "./MyAccount";
import { useStore } from "../utils/userManager";
import { Brand } from "../types";

export interface PortalNavbarProps {
  styles: any;
  brand: Brand;
}

const PortalNavBar = ({ styles, brand }: PortalNavbarProps) => {
  const [showModal, setShowModal] = React.useState(false);
  const username = useStore((state) => state.username);
  const { t } = useTranslation();
  const setModal = () => {
    setShowModal(!showModal);
  };

  return (
    <nav className={styles?.navbar}>
      <div className="sm:flex justify-between max-w-[1200px] mx-auto px-[15px]">
        <div className="logo">
          <Link href="/Portal?page=1">
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
        <div className="nav-container nav-portal">
          <nav>
            <ul className="menu">
              <div className="useridtxt" id="accBtn" onClick={setModal}>
                {username}
                <FontAwesomeIcon icon={faUser} />
                {showModal && (
                  <MyAccount showModal={showModal} setModal={setModal} />
                )}
              </div>
              <div>
                <li className="nav-item">
                  <Link href="/Portal?page=1">
                    <a className="tab">{t("home")}</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/Featured">
                    <a className="tab">{t("featured")}</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="Genres">
                    <a className="tab">{t("genres")}</a>
                  </Link>
                </li>
                <li
                  className="nav-item"
                  onClick={() => destroyCookie(null, "jwt")}
                >
                  <Link href="/SignInForm">
                    <a className={`tab ${styles?.tabbtn} logout`}>
                      {t("logout")}
                    </a>
                  </Link>
                </li>
              </div>
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default PortalNavBar;

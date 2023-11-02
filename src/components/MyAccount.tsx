import React from "react";
import Link from "next/link";
import { useStore } from "../utils/userManager";

export interface MyAccountProps {
  showModal: boolean;
  setModal: () => void;
}

const MyAccount: React.FC<MyAccountProps> = ({ setModal, showModal }) => {
  const { username, email, id } = useStore();

  return (
    <div>
      {showModal && (
        <div
          className="fixed z-[50] inset-0 overflow-y-auto pt-[100px]"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white text-black m-auto max-w-[310px] sm:max-w-[500px] p-5 text-center rounded-md">
            <div
              className="modal"
              // className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity"
              aria-hidden="true"
            ></div>
            <div>
              <div
                className="text-2xl text-[#aaaaaa] font-bold text-right"
                onClick={setModal}
              >
                &times;
              </div>
              <div className="acc-detail">
                <br />
                <h3>Your Account</h3>
                <br />
                <br />
                User name: {username}
                <br />
                Email : {email}
                <br />
                <br />
                <Link
                  href={{
                    pathname: `/ChangePassword`,
                    query: { id: id },
                  }}
                  passHref
                >
                  <a target="_blank">
                    →   <u>Change password</u>
                  </a>
                </Link>
                <br />
                <Link href="/Support#contactform" scroll={false}>
                  <a target="_blank">
                    →   <u>Cancel Subscription</u>
                  </a>
                </Link>
                <br />
                <Link href="/Support" passHref>
                  <a target="_blank">
                    →   <u>Customer Care</u>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;

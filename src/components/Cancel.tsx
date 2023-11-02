import React from "react";

import { wrapTags } from "../utils/filter";
import { Articles } from "../types";
import { useStore } from "../utils/userManager";

export interface CancelProps {
  email: string;
  cancelSuccess: Articles;
  alreadyCancel: Articles;
  notFound: Articles;
  supportEmail: string;
}

const Cancel = ({
  email,
  cancelSuccess,
  alreadyCancel,
  notFound,
  supportEmail,
}: CancelProps) => {
  const { isValid, isBlocked } = useStore();
  const alreadyCancelText = wrapTags(alreadyCancel.data[0].attributes.content, {
    support_email: `${supportEmail}`,
  });
  const cancelSuccessText = wrapTags(cancelSuccess.data[0].attributes.content, {
    support_email: `${supportEmail}`,
  });
  const notFoundText = wrapTags(notFound.data[0].attributes.content, {
    support_email: `${supportEmail}`,
    user_email: `${email}`,
  });
  return (
    <div>
      {!isValid && <div> {notFoundText}</div>}
      <br />
      {isValid && isBlocked && <div>{alreadyCancelText}</div>}
      <br />
      {isValid && !isBlocked && <div>{cancelSuccessText}</div>}
    </div>
  );
};

export default Cancel;

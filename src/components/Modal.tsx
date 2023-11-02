import React from "react";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";

const Modal = ({ open, handleOpen, translatedText }: any) => {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogBody>{translatedText.click_on_iam_not_a_robot}.</DialogBody>

      <div className="flex justify-center p-2">
        <Button variant="gradient" color="green" onClick={handleOpen}>
          <span>{translatedText.ok}</span>
        </Button>
      </div>
    </Dialog>
  );
};

export default Modal;

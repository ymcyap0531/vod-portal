import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import { wrapTags } from "../utils/filter";
import styles from "../styles/Support.module.css";
import { Brand } from "../types";

export interface FaqProps {
  question: string;
  answer: string;
  brand: Brand;
  styles: any;
}

const Faq = ({ question, answer, brand, styles }: FaqProps) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const questionText = wrapTags(question, {
    domain_name: `${brand.attributes.name}`,
    support_email: `${brand.attributes.supportEmail}`,
    currency: `${brand.attributes.trial.currency}`,
    currencySymbol: `${brand.attributes.trial.currencySymbol}`,
    brand: `${brand.attributes}`
  });
  const answerText = wrapTags(answer, {
    domain_name: `${brand.attributes.name}`,
    support_email: `${brand.attributes.supportEmail}`,
    currency: `${brand.attributes.trial.currency}`,
    currencySymbol: `${brand.attributes.trial.currencySymbol}`,
    brand: `${brand.attributes}`
  });
  return (
    <div>
      <Accordion open={open === 1} onClick={() => handleOpen(1)}>
        <AccordionHeader className={`${styles.collapsible} !text-white`}>
          <button type="button" className="text-left faq text-[15px]">
            {questionText}
          </button>
        </AccordionHeader>

        <AccordionBody className={styles.content}>
          <div>
            <p className={`text-[#FFFFFF] ${styles.faq}`}>{answerText}</p>
          </div>
        </AccordionBody>
      </Accordion>
      <hr className="my-4 opacity-25" />
    </div>
  );
};

export default Faq;

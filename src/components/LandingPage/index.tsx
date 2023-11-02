import React, { useEffect, useMemo } from "react";
import MarkdownIt from "markdown-it";
import nookies from "nookies";
import { useTranslation } from "react-i18next";

import { Articles, Brand, Movies, SpecialCategories } from "../../types";
import dynamic from "next/dynamic";
import { TemplateProps } from "./types";

export interface PortalProps {
  articles: Articles;
  template: string;
  brand: Brand;
  specialCategories: SpecialCategories;
  translatedText: {};
}
let Template: React.ComponentType<TemplateProps> | null = null;

const LandingPage = ({
  articles,
  specialCategories,
  template,
  brand,
  translatedText,
}: PortalProps) => {
  const md = new MarkdownIt();
  const htmlContent = md.render(articles.data[0].attributes.content);
  const jwt = nookies.get();
  const { t } = useTranslation();
  useEffect(() => {
    if (Object.keys(jwt).length !== 0) {
      // Router.push("/Portal?page=1");
    }
  }, [jwt]);
  useMemo(() => {
    if (template) {
      Template = dynamic(
        () => import(`../../templates/${template}/LandingPage`)
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {}, [articles, specialCategories]);

  if (Template) {
    return (
      <Template
        translatedText={translatedText}
        brand={brand}
        specialCategories={specialCategories}
        htmlContent={htmlContent}
      />
    );
  }
  return null;
};

export default LandingPage;

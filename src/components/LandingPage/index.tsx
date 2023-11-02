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
  const htmlContent = "\"## Watch Anywhere. Anytime. On any device.\n\nStream unlimited movies on any device. Enjoy watching them on Your TV, computer, phone, tablet or laptop.\n\n\n` `  \n**All movie genres**\n\nDo you feel like you’ve already seen it all? Browse & discover best highly rated, less mainstream movies available for immediate streaming on our movie library\n\n` `  \n**Watch without limits**\n\nYou receive full access to our movie library and all future releases. No transfer limits, no speed restrictions - make the most of our service.\n\n` `  \n**Available on your favorite devices**\n\nComputer, TV, Game Consoles, Mobile & Tablet\n\n` `  \n**Highly rated films**\n\nWe carefully select movies which received the highest ratings both from viewers and critics. In other words: best of the best, from classics to fresh releases.\n\n` `  \n**Try it for 2 days!**\n\nWe’re sure you’ll love your time with us. That’s why we give a 2 day  trial to all our new visitors, without any strings attached.\""//md.render(articles.data[0].attributes.content);
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

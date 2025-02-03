import React, { ReactNode } from "react";
import style from "./ExternalLink.module.scss";
import IconSvg from "../Icons/IconSvg";

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
}

const ExternalLink = ({ href, children }: ExternalLinkProps) => {
  return (
    <a href={href} className={style.link} target="_blank">
      {children}
      <IconSvg name="externalLink" size={12} className={style.external} />
    </a>
  );
};

export default ExternalLink;

import { ReactNode } from "react";
import { TypographyVariant } from "./types";
import style from "./Typography.module.scss";
import clsx from "clsx";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  textType?: TypographyVariant;
  children?: ReactNode;
  className?: string;
}

const toHTMLNotation = (textType: TypographyVariant) => {
  switch (textType) {
    case TypographyVariant.extraTitle:
      return "h1";
    case TypographyVariant.title:
      return "h2";
    case TypographyVariant.subtitle:
      return "h3";
    case TypographyVariant.largeText:
      return "h4";
    default:
      return "p";
  }
};

function withTypography(
  defaultVariant: TypographyVariant = TypographyVariant.text
) {
  return function Typography({
    textType = defaultVariant,
    children,
    className,
    ...props
  }: TypographyProps) {
    const Tag = toHTMLNotation(textType);
    return (
      <Tag {...props} className={clsx(className, style.base, style[textType])}>
        {children}
      </Tag>
    );
  };
}

export const ExtraTitle = withTypography(TypographyVariant.extraTitle);
export const Title = withTypography(TypographyVariant.title);
export const SubTitle = withTypography(TypographyVariant.subtitle);
export const LargeText = withTypography(TypographyVariant.largeText);
export const Text = withTypography(TypographyVariant.text);
export const SmallText = withTypography(TypographyVariant.smallText);

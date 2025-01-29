import { HTMLAttributes } from "react";
import style from "./IconSvg.module.scss";
import clsx from "clsx";

export type IconName =
  | "close"
  | "exclamation"
  | "progress"
  | "checkmark"
  | "angle"
  | "pencil"
  | "trash"
  | "todo"
  | "add"
  | "inbox"
  | "tags";

interface IconSVGProps extends HTMLAttributes<HTMLSpanElement> {
  name: IconName;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const icons: Record<IconName, JSX.Element> = {
  close: (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.49999 9.31827L12.9548 14.7731L14.7731 12.9548L9.31826 7.5L14.7731 2.04518L12.9548 0.226901L7.49999 5.68173L2.04516 0.226902L0.226888 2.04518L5.68171 7.5L0.226888 12.9548L2.04516 14.7731L7.49999 9.31827ZM7.49999 9.31827L9.31826 7.5L7.49999 5.68173L5.68171 7.5L7.49999 9.31827Z"
        fill="currentColor"
      />
      <path
        d="M7.49999 9.31827L9.31826 7.5L7.49999 5.68173L5.68171 7.5L7.49999 9.31827Z"
        fill="currentColor"
      />
    </svg>
  ),
  progress: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.5705 16.2274C6.30281 17.3709 1.91611 14.8383 0.772579 10.5705C-0.370956 6.30282 2.1617 1.91612 6.42943 0.772587C10.6972 -0.370947 15.0839 2.16171 16.2274 6.42944L13.8126 7.07649C13.0264 4.14243 10.0105 2.40122 7.07648 3.1874C4.14242 3.97358 2.40121 6.98943 3.18739 9.9235C3.97357 12.8576 6.98943 14.5988 9.92349 13.8126L10.5705 16.2274Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.5705 16.2274C6.30281 17.3709 1.91611 14.8383 0.772579 10.5705C-0.370956 6.30282 2.1617 1.91612 6.42943 0.772587C10.6972 -0.370947 15.0839 2.16171 16.2274 6.42944L13.8126 7.07649C13.0264 4.14243 10.0105 2.40122 7.07648 3.1874C4.14242 3.97358 2.40121 6.98943 3.18739 9.9235C3.97357 12.8576 6.98943 14.5988 9.92349 13.8126L10.5705 16.2274Z"
        fill="currentColor"
        fill-opacity="0.1"
      />
    </svg>
  ),
  exclamation: (
    <svg
      width="3"
      height="19"
      viewBox="0 0 3 19"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0.5H3V13.5H0V0.5Z" fill="currentColor" />
      <path d="M0 15.5H3V18.5H0V15.5Z" fill="currentColor" />
    </svg>
  ),
  checkmark: (
    <svg
      width="19"
      height="15"
      viewBox="0 0 19 15"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.25 9.75L16.25 0.75L18.5 3L9.5 12L7.25 9.75ZM5 12L7.25 9.75L2.75 5.25L0.5 7.5L5 12Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.25 9.75L16.25 0.75L18.5 3L9.5 12L7.25 9.75ZM5 12L7.25 9.75L2.75 5.25L0.5 7.5L5 12Z"
        fill="#currentColor"
        fillOpacity="0.1"
      />
      <path d="M5 12L7.25 14.25L9.5 12L7.25 9.75L5 12Z" fill="currentColor" />
      <path
        d="M5 12L7.25 14.25L9.5 12L7.25 9.75L5 12Z"
        fill="#currentColor"
        fillOpacity="0.1"
      />
    </svg>
  ),
  angle: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="512"
      height="512"
      fill="currentColor"
    >
      <g id="_01_align_center" data-name="01 align center">
        <path d="M12,15.5a1.993,1.993,0,0,1-1.414-.585L5.293,9.621,6.707,8.207,12,13.5l5.293-5.293,1.414,1.414-5.293,5.293A1.993,1.993,0,0,1,12,15.5Z" />
      </g>
    </svg>
  ),
  pencil: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="512"
      height="512"
      fill="currentColor"
    >
      <g id="_01_align_center" data-name="01 align center">
        <path d="M22.94,1.06a3.626,3.626,0,0,0-5.124,0L0,18.876V24H5.124L22.94,6.184A3.627,3.627,0,0,0,22.94,1.06ZM4.3,22H2V19.7L15.31,6.4l2.3,2.3ZM21.526,4.77,19.019,7.277l-2.295-2.3L19.23,2.474a1.624,1.624,0,0,1,2.3,2.3Z" />
      </g>
    </svg>
  ),
  trash: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="512"
      height="512"
      fill="currentColor"
    >
      <g id="_01_align_center" data-name="01 align center">
        <path d="M22,4H17V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2ZM9,2h6V4H9Zm9,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V6H18Z" />
        <rect x="9" y="10" width="2" height="8" />
        <rect x="13" y="10" width="2" height="8" />
      </g>
    </svg>
  ),
  todo: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="m21.5,18l-2.5-2.5V2.5c0-1.379,1.121-2.5,2.5-2.5s2.5,1.121,2.5,2.5v13l-2.5,2.5ZM14,0H3C1.343,0,0,1.343,0,3v18.357c0,1.308.941,2.499,2.242,2.63,1.496.15,2.758-1.021,2.758-2.487v-3.5h12V3c0-1.657-1.343-3-3-3Zm-7.226,13.534c-.31.31-.717.465-1.124.465s-.814-.155-1.124-.465l-1.647-1.647,1.414-1.414,1.357,1.357,2.537-2.537,1.414,1.414-2.827,2.827Zm0-6c-.31.31-.717.465-1.124.465s-.814-.155-1.124-.465l-1.647-1.647,1.414-1.414,1.357,1.357,2.537-2.537,1.414,1.414-2.827,2.827Zm13.226,13.466v-1s-13,0-13,0v1.5c0,.924-.28,1.784-.76,2.5h10.76c1.657,0,3-1.343,3-3Z" />
    </svg>
  ),
  add: (
    <svg
      height="512"
      viewBox="0 0 24 24"
      width="512"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm4 13h-3v3a1 1 0 0 1 -2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 0 2z" />
    </svg>
  ),
  inbox: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="m21.721,0h-2.047l2.209,12h-5.883v2c0,1.103-.897,2-2,2h-4c-1.103,0-2-.897-2-2v-2H2.118L4.338,0h-2.051L0,12.227l.005,8.766c-.002.802.309,1.558.876,2.126s1.321.881,2.124.881h17.995c1.654,0,3-1.346,3-3v-8.5L21.721,0Zm.279,21c0,.551-.449,1-1,1H3.005c-.268,0-.519-.104-.708-.294s-.292-.441-.292-.711l-.004-6.995h3.999c0,2.206,1.794,4,4,4h4c2.206,0,4-1.794,4-4h4v7Zm-3.991-19H6.002l.37-2h11.269l.368,2Zm1.472,8H4.522l.37-2h14.221l.368,2Zm-.736-4H5.262l.37-2h12.745l.368,2Z" />
    </svg>
  ),
  tags: (
    <svg viewBox="0 0 24 24" width="512" height="512" fill="currentColor">
      <path d="M7.707,9.256c.391,.391,.391,1.024,0,1.414-.391,.391-1.024,.391-1.414,0-.391-.391-.391-1.024,0-1.414,.391-.391,1.024-.391,1.414,0Zm13.852,6.085l-.565,.565c-.027,1.233-.505,2.457-1.435,3.399l-3.167,3.208c-.943,.955-2.201,1.483-3.543,1.487h-.017c-1.335,0-2.59-.52-3.534-1.464L1.882,15.183c-.65-.649-.964-1.542-.864-2.453l.765-6.916c.051-.456,.404-.819,.858-.881l6.889-.942c.932-.124,1.87,.193,2.528,.851l7.475,7.412c.387,.387,.697,.823,.931,1.288,.812-1.166,.698-2.795-.342-3.835L12.531,2.302c-.229-.229-.545-.335-.851-.292l-6.889,.942c-.549,.074-1.052-.309-1.127-.855-.074-.547,.309-1.051,.855-1.126L11.409,.028c.921-.131,1.869,.191,2.528,.852l7.589,7.405c1.946,1.945,1.957,5.107,.032,7.057Zm-3.438-1.67l-7.475-7.412c-.223-.223-.536-.326-.847-.287l-6.115,.837-.679,6.14c-.033,.303,.071,.601,.287,.816l7.416,7.353c.569,.57,1.322,.881,2.123,.881h.01c.806-.002,1.561-.319,2.126-.893l3.167-3.208c1.155-1.17,1.149-3.067-.014-4.229Z" />
    </svg>
  ),
};

const IconSvg = ({
  name,
  size = 18,
  className,
  onClick,
  ...props
}: IconSVGProps) => {
  const IconComponent = icons[name];
  return (
    <span
      className={clsx(style.icon, className)}
      style={{ width: size, height: size }}
      {...props}
      onClick={onClick}
    >
      {IconComponent}
    </span>
  );
};

export default IconSvg;

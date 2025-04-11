import React, { useState } from "react";
import clsx from "clsx";
import style from "./style.module.scss";
import IconSvg from "../../../../components/common/Icons/IconSvg";

const Circle = () => {
  return <div className={style.circle}></div>;
};
const CircleDot = () => {
  return (
    <div className={style.circle}>
      <div className={style.dot}></div>
    </div>
  );
};

type TImage = { url: string; alt: string; text: string };

interface SliderProps {
  images: TImage[];
}

const Slider = ({ images }: SliderProps) => {
  const [imgIndex, setImgIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  const showPrevImg = () => {
    setImgIndex((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  };

  const showNextImg = () => {
    setImgIndex((index) => {
      if (index === images.length - 1) return 0;
      return index + 1;
    });
  };

  return (
    <div
      style={{ width: "100%", height: "100%", position: "relative" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {images.map((image, index) => (
          <img
            src={image.url}
            alt={image.alt}
            className={style.img}
            style={{ translate: `${-100 * imgIndex}%` }}
            key={index}
          />
        ))}
      </div>
      <button
        onClick={showPrevImg}
        className={style.button}
        style={{ left: 0 }}
      >
        <IconSvg name="angle" className={style.btnLeft} size={24} />
      </button>
      <button
        onClick={showNextImg}
        className={style.button}
        style={{ right: 0 }}
      >
        <IconSvg name="angle" className={style.btnRight} size={24} />
      </button>
      <div className={clsx(style.description, isHovered && style.visible)}>
        {images[imgIndex].text}
      </div>
      <div className={style.nav}>
        {images.map((_, index) => (
          <button
            className={style.navButton}
            key={index}
            onClick={() => setImgIndex(index)}
          >
            {index === imgIndex ? <CircleDot /> : <Circle />}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Slider;

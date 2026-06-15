import React from "react";

type GalleryTitleProps = {
  title: string;
  colorClass?: string;
};

const ItalicTitle: React.FC<GalleryTitleProps> = ({
  title,
  colorClass = "text-[#f8a44a]", // default color
}) => {
  return (
    <span
      className={`${colorClass} text-[4rem] italic font-normal leading-none font-serif`}
    >
      {title}
    </span>
  );
};

export default ItalicTitle;
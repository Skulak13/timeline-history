import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface HeaderProps {
  imageUrl: string;
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ imageUrl, title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 header-margin-w-1024 header-margin-650 m-8 flex items-start"
    >
      <Image
        src={imageUrl}
        alt="Header Image"
        width={160}
        height={160}
        className="rounded-full object-cover img-header-margin-550 img-header-margin-w-1024 img-header-margin-650 mr-10 img-header-size-w-1024 img-header-size-w-1280 img-header-size-650 img-header-size-550"
      />
      <div className="flex flex-col">
        <h1
          className="title-header-font-550 title-header-font-650 text-5xl font-bold title-header-padding-570 title-header-padding-1024  p-4 rounded-full inline-block"
          style={{
            background: "linear-gradient(45deg, #FF5F6D, #FFC371)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {title}
        </h1>
        <h2 className="subtitle-header-font-550 subtitle-header-font-570 subtitle-header-font-w-1024 text-2xl text-gray-300 pl-6">
          {subtitle}
        </h2>
      </div>
    </motion.div>
  );
};

export default Header;

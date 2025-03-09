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
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 m-4 sm:m-6 md:m-8 flex items-start"
    >
      <Image
        src={imageUrl}
        alt="Header Image"
        width={160}
        height={160}
        className="rounded-full object-cover mr-10"
      />
      <div className="flex flex-col">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white bg-red-500 p-4 rounded-full inline-block"
          style={{
            background: "linear-gradient(45deg, #FF5F6D, #FFC371)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {title}
        </h1>
        <h2 className="text-2xl text-gray-300 pl-6">{subtitle}</h2>
      </div>
    </motion.div>
  );
};

export default Header;

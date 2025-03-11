import React from "react";
import Hypher from "hypher";
import pl from "hyphenation.pl";

// Inicjalizujemy instancję raz, poza komponentem
const hypherInstance = new Hypher(pl);

interface HyphenatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const HyphenatedText: React.FC<HyphenatedTextProps> = ({
  text,
  className,
  style,
}) => {
  const hyphenatedText = hypherInstance.hyphenateText(text);
  return (
    <p className={className} style={style}>
      {hyphenatedText}
    </p>
  );
};

export default HyphenatedText;

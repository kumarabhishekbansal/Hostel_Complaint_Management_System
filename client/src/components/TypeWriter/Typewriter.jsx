import React, { useEffect, useState } from 'react';

const Typewriter=({texts})=> {
  const text = texts;
  const [displayText, setDisplayText] = useState("");
  let speed = 400; // Adjust the typing speed (milliseconds per character)
    // console.log(text);
  useEffect(() => {
    // console.log(typeof text);
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(prevText => prevText + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  return (
    <h2 className="text-white font-roboto font-bold text-2xl md:text-4xl md:text-center md:leading-normal lg:text-left">
        {displayText}
    </h2>
  );
}

export default Typewriter;

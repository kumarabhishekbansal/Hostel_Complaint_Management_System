import React, { useEffect, useState } from 'react';

const ChangeWriter=({texts})=> {
  const text = texts;
  const [displayText, setDisplayText] = useState(text[0]);
//   console.log(text[0]);
  const speed = 1500; // Adjust the typing speed (milliseconds per character)
    // console.log(text);
  useEffect(() => {
    console.log(typeof text);
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text[index]);
        index++;
      } else {
        clearInterval(timer);
        // index=0;
      }
    }, speed);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  return (
    <h1 className="font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl lg:text-center lg:max-w-[540px]">
       {displayText}
    </h1>
  );
}

export default ChangeWriter;

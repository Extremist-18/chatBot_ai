// import React from 'react';
import { TypeAnimation } from "react-type-animation";

export default function TypingAnim() {  // Changed to uppercase
  return (
    <TypeAnimation
      preRenderFirstString={true}
      sequence={[
        'Chat With your Own AI',
        1500,
        'Built With OpenAI',
        1000,
        'Customized ChatGPT',
        2000,
      ]}
      speed={50}
      style={{ fontSize: '80px', color:"white", display:"inline-block", textShadow:"1px 1px 20px #000" }}
      repeat={Infinity}
    />
  );
};
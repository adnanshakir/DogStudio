import React from "react";

const Textline = (props) => {
  return (
    <div img-title={props.img} className="flex items-start cursor-pointer title">
      <h1
        id="line"
        className="ml-12 mt-8 text-8xl font-thin leading-none text-white/30 hover:text-white transition-colors"
      >
        {props.line}
      </h1>
    </div>
  );
};

export default Textline;

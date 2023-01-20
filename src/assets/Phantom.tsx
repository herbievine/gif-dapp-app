import React from "react";
import type { SVGProps } from "react";

const Phantom: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 128 128"
      {...props}
    >
      <circle cx={64} cy={64} r={64} fill="url(#a)" />
      <path
        d="M110.584 64.914H99.142C99.142 41.765 80.173 23 56.772 23c-23.11 0-41.9 18.306-42.36 41.058C13.936 87.577 36.24 108 60.019 108h2.99c20.963 0 49.06-16.233 53.45-36.013.811-3.646-2.101-7.073-5.875-7.073Zm-70.815 1.031c0 3.096-2.56 5.628-5.689 5.628-3.13 0-5.688-2.533-5.688-5.628v-9.104c0-3.095 2.559-5.627 5.688-5.627 3.13 0 5.689 2.532 5.689 5.627v9.104Zm19.753 0c0 3.096-2.559 5.628-5.688 5.628-3.13 0-5.689-2.533-5.689-5.628v-9.104c0-3.095 2.56-5.627 5.689-5.627 3.13 0 5.688 2.532 5.688 5.627v9.104Z"
        fill="url(#b)"
      />
      <defs>
        <linearGradient
          id="a"
          x1={64}
          y1={0}
          x2={64}
          y2={128}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#534BB1" />
          <stop offset={1} stopColor="#551BF9" />
        </linearGradient>
        <linearGradient
          id="b"
          x1={65.5}
          y1={23}
          x2={65.5}
          y2={108}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff" />
          <stop offset={1} stopColor="#fff" stopOpacity={0.82} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Phantom;

import Image from "next/image";
import React from "react";

export default function Home() {
  return (
      <div>
          <h1 className="fixed text-6xl text-center mt-40 ml-[8%] font-bold leading-[70px]">CHWEYUN<br/>ARCHIVE</h1>
          <Image
              src={'/favicon.png'}
              width="1180"
              height="808"
              alt="rock"
              className="z-50 mx-auto"
          />
      </div>
  );
}

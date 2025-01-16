import Image from "next/image";
import React from "react";

export default function Home() {
    return (
        <div>
            <h1
                className="fixed text-center mt-40 ml-[8%] font-bold z-10"
                style={{
                    fontSize: "6vw",
                    lineHeight: "7vw",
                }}
            >
                CHWEYUN
                <br />
                ARCHIVE
            </h1>
            <Image src={"/favicon.png"} width="1180" height="808" alt="rock" className="z-0 mx-auto absolute top-1/2 transform -translate-y-1/2" />
        </div>
    );
}

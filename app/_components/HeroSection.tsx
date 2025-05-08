import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link";


export function HeroSection() {
     return (
        <div className="relative flex flex-col items-center justify-center pt-10 sm:pt-14 md:pt-20 lg:pt-28 h-[100vh]">
            {/* Responsive Logo */}
            <div className="w-40 sm:w-52 md:w-64 lg:w-72 xl:w-80 mx-auto mb-6 md:mb-10">
                <Image
                    src="/FalconLogo.png"
                    alt="Falcon Logo"
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain"
                    priority
                />
            </div>

            {/* Background with Beams and Title */}
            <BackgroundBeamsWithCollision className="h-[10rem] md:h-[20rem] lg:h-full flex flex-col  justify-center">
                <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold text-center text-black dark:text-white font-display tracking-tight leading-tight relative z-20">
                    Finding The Right Home{" "}
                    <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                        <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-[#ffb900] via-[#c99800] to-[#806000] [text-shadow:0_0_rgba(0,0,0,0.1)]">
                            <span>Made Easier.</span>
                        </div>
                        <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-[#ffb900] via-[#c99800] to-[#806000] py-4">
                            <span>Made Easier.</span>
                        </div>
                    </div>
                </h2>
                <Button className="mt-10 text-xl " variant="default" size="lg">
                    <Link href="/login">Login</Link>
                </Button>

            </BackgroundBeamsWithCollision>



        </div>
    );
}

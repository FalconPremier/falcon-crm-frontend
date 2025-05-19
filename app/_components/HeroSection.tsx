import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroSection() {
  return (
    <div className="relative flex h-[100vh] flex-col items-center justify-center pt-10 sm:pt-14 md:pt-20 lg:pt-28">
      {/* Responsive Logo */}
      <div className="mx-auto mb-6 w-40 sm:w-52 md:mb-10 md:w-64 lg:w-72 xl:w-80">
        <Image
          src="/FalconLogo.png"
          alt="Falcon Logo"
          width={800}
          height={600}
          className="h-auto w-full object-contain"
          priority
        />
      </div>

      <h2 className="font-display relative z-20 text-center text-xl leading-tight font-bold tracking-tight text-black sm:text-2xl md:text-4xl lg:text-6xl dark:text-white">
        Finding The Right Home{' '}
        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          <div className="absolute top-[1px] left-0 bg-gradient-to-r from-[#ffb900] via-[#c99800] to-[#806000] bg-clip-text bg-no-repeat py-4 text-transparent [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span>Made Easier.</span>
          </div>
          <div className="relative bg-gradient-to-r from-[#ffb900] via-[#c99800] to-[#806000] bg-clip-text bg-no-repeat py-4 text-transparent">
            <span>Made Easier.</span>
          </div>
        </div>
      </h2>
      <Button className="mt-10 text-xl" variant="default" size="lg">
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
}

'use client';

import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import {
  Blocks,
  Cloud,
  Code,
  Database,
  File,
  Package,
  Package2,
} from 'lucide-react';

function Mark({ className }: { className?: string }) {
  return <img src="/logo.svg" alt="Logo" className={clsx(className, 'h-32')} />;
}

function Circle({
  size,
  delay,
  opacity,
}: {
  size: number;
  delay: number;
  opacity: string;
}) {
  return (
    <motion.div
      variants={{
        idle: { width: `${size}px`, height: `${size}px` },
        active: {
          width: [`${size}px`, `${size + 10}px`, `${size}px`],
          height: [`${size}px`, `${size + 10}px`, `${size}px`],
          transition: {
            duration: 0.75,
            repeat: Infinity,
            repeatDelay: 1.25,
            ease: 'easeInOut',
            delay,
          },
        },
      }}
      style={{ '--opacity': opacity } as React.CSSProperties}
      className={clsx(
        'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full',
        'bg-[radial-gradient(circle,transparent_25%,color-mix(in_srgb,_theme(colors.blue.500)_var(--opacity),transparent)_100%)]',
        'ring-1 ring-inset ring-blue-500/[8%]',
      )}
    />
  );
}

function Circles() {
  return (
    <div className="absolute inset-0">
      <Circle size={528} opacity="3%" delay={0.45} />
      <Circle size={400} opacity="5%" delay={0.3} />
      <Circle size={272} opacity="5%" delay={0.15} />
      <Circle size={144} opacity="10%" delay={0} />
      <div className="absolute inset-0 bg-gradient-to-t from-white to-35%  dark:from-gray-950" />
    </div>
  );
}

function MainLogo() {
  return (
    <div className="absolute left-44 top-32 flex size-16 items-center justify-center rounded-full bg-white shadow ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10">
      <Mark className="h-9 fill-[#e879f9]" />
    </div>
  );
}

function Logo({
  src,
  left,
  top,
  hover,
}: {
  src: React.ReactNode | string;
  left: number;
  top: number;
  hover: { x: number; y: number; rotate: number; delay: number };
}) {
  return (
    <motion.div
      variants={{
        idle: { x: 0, y: 0, rotate: 0 },
        active: {
          x: [0, hover.x, 0],
          y: [0, hover.y, 0],
          rotate: [0, hover.rotate, 0],
          transition: {
            duration: 0.75,
            repeat: Infinity,
            repeatDelay: 1.25,
            ease: 'easeInOut',
            delay: hover.delay,
          },
        },
      }}
      style={{ left, top } as React.CSSProperties}
      className="absolute flex size-16 items-center justify-center rounded-full bg-white shadow ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10"
    >
      {typeof src === 'string' ? (
        <img src={src} alt="" className="h-3/4 w-3/4" />
      ) : (
        <div className="flex h-3/4 w-3/4 items-center justify-center">
          {src}
        </div>
      )}
    </motion.div>
  );
}

export function LogoCluster() {
  return (
    <div aria-hidden="true" className="relative h-full overflow-hidden">
      <Circles />
      <div className="absolute left-1/2 h-full w-[26rem] -translate-x-1/2">
        <MainLogo />
        <Logo
          src={<Cloud className="h-full w-full text-teal-500" />}
          left={360}
          top={144}
          hover={{ x: 6, y: 1, rotate: 5, delay: 0.38 }}
        />
        <Logo
          src={<File className="h-full w-full text-purple-500" />}
          left={285}
          top={20}
          hover={{ x: 4, y: -5, rotate: 6, delay: 0.3 }}
        />
        <Logo
          src={<Database className="h-full w-full text-amber-500" />}
          left={255}
          top={210}
          hover={{ x: 3, y: 5, rotate: 7, delay: 0.2 }}
        />
        <Logo
          src={<Code className="h-full w-full text-lime-500" />}
          left={144}
          top={40}
          hover={{ x: -2, y: -5, rotate: -6, delay: 0.15 }}
        />
        <Logo
          src={<Blocks className="h-full w-full text-rose-500" />}
          left={36}
          top={56}
          hover={{ x: -4, y: -5, rotate: -6, delay: 0.35 }}
        />
        <Logo
          src={<Package className="h-full w-full text-stone-500" />}
          left={96}
          top={176}
          hover={{ x: -3, y: 5, rotate: 3, delay: 0.15 }}
        />
      </div>
    </div>
  );
}

import Guides from './components/guides';
import Trusted from './components/trusted';
import FeatureGrid from './components/feature-grid';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Hero from '@/components/header/hero';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import Video from '@/components/video';
import { HovermeButton } from '@/components/button/hoverme';
import { generatePageMetadata } from '@/lib/utils/metadata';
import RedirectSuggest from '@/components/redirectSuggest';

const title = {
  main: 'Develop, deploy, and scale in one seamless cloud platform',
  sub: 'The Unified Cloud Platform for Developers',
};

export const metadata = generatePageMetadata();

export default function HomePage({ params }: { params: { lang: string } }) {
  return (
    <div className="h-full bg-[#EBF2FF]">
      <Header lang={params.lang} />
      <main className="custom-container pt-14">
        <Hero
          title={title}
          mainTitleEmphasis={2}
          getStartedLink="https://usw.sealos.io"
        >
          <Video url="https://youtu.be/A9mxz0JaY2o" />
          <div className="my-8 flex items-center justify-center">
            <a href="/devbox">
              <HovermeButton text="Discover DevBox" />
            </a>
          </div>
        </Hero>

        <div className="mb-[64px]  mt-[64px] h-[1px] bg-[#DDE7F7]"></div>
        <Trusted />
        <div className="mb-[64px]  mt-[64px]"></div>
        <FeatureGrid />
        <Guides />
      </main>
      <div className="mt-[140px] h-[1px] bg-[#DDE7F7]"></div>
      <Footer />
      <TailwindIndicator />
      <RedirectSuggest />
    </div>
  );
}

import React from 'react';

import { useRouter } from 'next/router';

import { Background } from '../background/Background';
import { Section } from '../layout/Section';

const Footer = () => {
  const router = useRouter();
  // const { t } = useTranslation();
  // const [query] = useLanguageQuery();

  return (
    <Background color="bg-bg_blue-0 relative overflow-hidden">
      <div className="z-10">
        <Section>
          <div className="text-lg text-center text-white flex justify-center">
            <img
              src={`${router.basePath}/assets/images/logo_bottom.png`}
              className="h-42 md:h-64"
            />
          </div>
        </Section>
      </div>
      <img
        src={`${router.basePath}/assets/images/bg.svg`}
        className="absolute max-w-none max-h-none min-h-screen opacity-20 top-0 overflow-hidden"
        style={{
          minWidth: '100vw',
          width: 'unset',
          height: 'unset',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />

      <style jsx>{`
        /* a */
      `}</style>
    </Background>
  );
};

export { Footer };

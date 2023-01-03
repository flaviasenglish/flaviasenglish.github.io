import React from 'react';

import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-export-i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Background } from '../background/Background';
import { Section } from '../layout/Section';

const Footer = () => {
  const router = useRouter();
  const { t } = useTranslation();
  // const [query] = useLanguageQuery();

  return (
    <Background color="bg-bg_blue-0 relative overflow-hidden">
      <Section>
        <div className="text-lg text-center text-white flex justify-center">
          <img
            src={`${router.basePath}/assets/images/logo_bottom.png`}
            className="h-42 md:h-64"
          />
        </div>
        <div className="text-2xl font-title text-white tracking-widest text-center mt-8">
          {t('top_contactus')}
        </div>
        <div className="text-lg text-center text-3xl flex flex-nowrap gap-8 justify-center mt-8">
          <Link legacyBehavior href="mailto:flaviasenglish@gmail.com">
            <a target="_blank">
              <FontAwesomeIcon icon={faEnvelope} color={'white'} />
            </a>
          </Link>
          <Link
            legacyBehavior
            href="https://www.linkedin.com/in/flavia-forcatho-83a53711a/"
          >
            <a target="_blank">
              <FontAwesomeIcon icon={faLinkedin} color={'white'} />
            </a>
          </Link>
        </div>
      </Section>
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

import { useTranslation } from 'next-export-i18n';
import { NextSeo } from 'next-seo';

import { Base } from '../templates/Base';
import { AppConfig } from '../utils/AppConfig';

import 'material-icons/iconfont/material-icons.css';

const Index = () => {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo
        title={AppConfig.site_name}
        description={`${t('event_description_title')} - ${t(
          'event_description_pre'
        )} R$ 60.000!`}
        canonical="https://ultrahard.info"
        openGraph={{
          url: 'https://ultrahard.info',
          title: AppConfig.site_name,
          description: `${t('event_description_title')} - ${t(
            'event_description_pre'
          )} R$ 60.000!`,
          images: [
            {
              url: `https://ultrahard.info/logo_1024.png`,
              width: 1024,
              height: 1024,
              alt: 'Flávia Forcatho English Solutions',
              type: 'image/png',
            },
            {
              url: `https://ultrahard.info/logo_256.png`,
              width: 256,
              height: 256,
              alt: 'Flávia Forcatho English Solutions',
              type: 'image/png',
            },
            {
              url: `https://ultrahard.info/logo_tt.png`,
              width: 1200,
              height: 630,
              alt: 'Flávia Forcatho English Solutions',
              type: 'image/png',
            },
          ],
          site_name: AppConfig.description,
        }}
        twitter={{
          handle: '@tryhardsmash',
          site: '@tryhardsmash',
          cardType: 'summary_large_image',
        }}
      />
      <Base />
    </>
  );
};

export default Index;

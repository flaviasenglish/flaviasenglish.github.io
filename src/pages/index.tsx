import { NextSeo } from 'next-seo';

import { Base } from '../templates/Base';
import { AppConfig } from '../utils/AppConfig';

import 'material-icons/iconfont/material-icons.css';

const Index = () => {
  // const { t } = useTranslation();

  return (
    <>
      <NextSeo
        title={AppConfig.site_name}
        description={``}
        canonical="https://www.flaviaforcatho.com.br"
        openGraph={{
          url: 'https://www.flaviaforcatho.com.br/',
          title: AppConfig.site_name,
          description: ``,
          images: [
            {
              url: `https://www.flaviaforcatho.com.br/logo_1024.png`,
              width: 1024,
              height: 1024,
              alt: 'Flávia Forcatho English Solutions',
              type: 'image/png',
            },
            {
              url: `https://www.flaviaforcatho.com.br//logo_256.png`,
              width: 256,
              height: 256,
              alt: 'Flávia Forcatho English Solutions',
              type: 'image/png',
            },
            {
              url: `https://www.flaviaforcatho.com.br/logo_tt.png`,
              width: 1200,
              height: 630,
              alt: 'Flávia Forcatho English Solutions',
              type: 'image/png',
            },
          ],
          site_name: AppConfig.description,
        }}
        twitter={{
          site: 'https://www.flaviaforcatho.com.br/',
          cardType: 'summary_large_image',
        }}
      />
      <Base />
    </>
  );
};

export default Index;
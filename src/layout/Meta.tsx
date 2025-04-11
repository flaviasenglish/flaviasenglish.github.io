import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-export-i18n';
import { NextSeo } from 'next-seo';

import { AppConfig } from '../utils/AppConfig';

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
  language: string;
};

const Meta = (props: IMetaProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <html lang={props.language}></html>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="apple-touch-icon"
          href={`${router.basePath}/favicon.png`}
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/favicon.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/favicon.png`}
          key="icon16"
        />
        <link
          rel="icon"
          href={`${router.basePath}/favicon.ico`}
          key="favicon"
        />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          title: props.title,
          description: props.description,
          url: props.canonical,
          locale: t.locale,
          site_name: AppConfig.site_name,
        }}
      />
    </>
  );
};

export { Meta };

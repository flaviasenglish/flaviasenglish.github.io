import { useEffect, useState } from 'react';

import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import CarouselModule, {
  type ButtonGroupProps,
  type DotProps,
} from 'react-multi-carousel';

import { Background } from '../background/Background';
import { BackgroundRound } from '../background/BackgroundRound';
import prices from '../data/prices.json';
import { Section } from '../layout/Section';
import useAnalyticsEventTracker from '../utils/useAnalyticsEventTracker';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { Hero } from './Hero';

// react-multi-carousel is CommonJS; depending on the interop, the default
// import can be the module object instead of the component
const Carousel =
  (CarouselModule as unknown as { default?: typeof CarouselModule }).default ??
  CarouselModule;

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
  },
};

const CustomDot = ({ onClick, active }: DotProps) => {
  return (
    <li
      className={`${
        active ? 'active' : 'inactive'
      } m-1 h-[14px] w-[14px] rounded-full border-2 border-bg_blue-0 bg-bg_blue-0 ${
        active ? 'scale-150' : ''
      } shrink-0 cursor-pointer`}
      onClick={() => onClick?.()}
    ></li>
  );
};

const CustomButtonGroup = ({ next, previous }: ButtonGroupProps) => {
  const { t } = useTranslation();
  return (
    <div className="carousel-button-group invisible absolute bottom-0 flex w-full items-center md:visible">
      <button
        type="button"
        aria-label={t('testimonials.previous')}
        className="absolute left-2 flex -translate-y-1/4 cursor-pointer rounded-full bg-bg_blue-0 p-4 shadow-md drop-shadow-md"
        onClick={() => previous?.()}
      >
        <span
          aria-hidden="true"
          className="material-icons-round text-center text-4xl! text-white xl:text-4xl!"
          style={{ WebkitTextStroke: '2px' }}
        >
          west
        </span>
      </button>
      <button
        type="button"
        aria-label={t('testimonials.next')}
        className="absolute right-2 flex -translate-y-1/4 cursor-pointer rounded-full bg-bg_blue-0 p-4 shadow-md drop-shadow-md"
        onClick={() => next?.()}
      >
        <span
          aria-hidden="true"
          className="material-icons-round text-center text-4xl! text-white xl:text-4xl!"
          style={{ WebkitTextStroke: '2px' }}
        >
          east
        </span>
      </button>
    </div>
  );
};

type Price = (typeof prices)[keyof typeof prices];

const Base = () => {
  const [price, setPrice] = useState<Price | null>(null);

  useEffect(() => {
    fetch('https://free.freeipapi.com/api/json/')
      .then((response) => response.json())
      .then((data: { countryCode?: string }) => {
        if (data.countryCode === 'BR') {
          setPrice(prices.BRL);
        } else if (data.countryCode === 'PT') {
          setPrice(prices.EUR_PT);
        } else {
          setPrice(prices.EUR);
        }
      })
      .catch((error) => {
        console.log(error);
        setPrice(prices.EUR);
      });
  }, []);

  const { t } = useTranslation();
  const gaEventTracker = useAnalyticsEventTracker('Event');

  return (
    <div className="text-textprimary-300 bg-background-500 antialiased xl:text-lg">
      <main>
        <Hero />
        <BackgroundRound color="bg-bg_blue-0 text-white" id="aboutme">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-16 2xl:gap-16">
            <div className="w-full">
              <h2 className="mb-4 font-title text-2xl tracking-wider uppercase md:text-3xl">
                {t('about_me.my_story')}
              </h2>
              <p
                className="text-justify"
                dangerouslySetInnerHTML={{
                  __html: t('about_me.my_story_text'),
                }}
              ></p>
            </div>
            <div className="w-full">
              <h2 className="mb-4 font-title text-2xl tracking-wider uppercase md:text-3xl">
                {t('about_me.certificates_title')}
              </h2>
              <div className="grid auto-rows-fr grid-cols-2 gap-2 2xl:gap-8">
                {[
                  {
                    name: t('about_me.certificates.masters_ufmg'),
                    year: 2019,
                  },
                  {
                    name: t('about_me.certificates.toefl'),
                    year: 2019,
                  },
                  {
                    name: 'IELTS: 8.5/9',
                    year: 2016,
                  },
                  {
                    name: t('about_me.certificates.graduation'),
                    year: 2015,
                  },
                  {
                    name: 'TOEFL ITP: 633/677',
                    year: 2014,
                  },
                  {
                    name: 'Cambridge CAE: GRADE A',
                    year: 2012,
                  },
                ].map((certif) => (
                  <div
                    className="flex flex-col gap-1 rounded-3xl bg-background p-2 text-black uppercase shadow-md 2xl:p-4"
                    key={certif.name}
                  >
                    <span className="material-icons text-center text-6xl! text-bg_orange-0">
                      workspace_premium
                    </span>
                    <div className="flex grow flex-col items-center justify-center font-title tracking-wide">
                      <div className="text-center text-base font-bold tracking-wider">
                        {certif.name}
                      </div>
                      <div className="text-center text-sm font-bold tracking-widest">
                        {certif.year}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </BackgroundRound>
        <Background color="">
          <Section title={t('services.title')} id={'services'}>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col overflow-hidden rounded-3xl bg-bg_white-0 text-white shadow-md">
                <div className="flex items-center gap-4 bg-bg_orange-0 p-3 px-6 2xl:p-4 2xl:px-8">
                  <span className="material-icons text-white-0 text-center text-6xl!">
                    cast_for_education
                  </span>
                  <h3 className="text-center font-title text-xl font-bold tracking-wider uppercase md:text-2xl">
                    {t('services.classes.title')}
                  </h3>
                </div>
                <div className="flex flex-col gap-8 p-4 text-justify text-black md:p-8">
                  {t('services.classes.desc')}
                  <div className="grid grid-cols-1 grid-rows-[repeat(3,auto)] gap-x-8 gap-y-4 lg:grid-flow-row lg:grid-cols-2">
                    {[
                      {
                        name: t('services.classes.classes_title'),
                        desc: t('services.classes.classes_desc'),
                        types: [
                          {
                            name: t('services.classes.classes_individual'),
                            price: price?.one ?? '',
                            metric: '/h',
                          },
                        ],
                      },
                      {
                        name: t('services.classes.exam_title'),
                        desc: t('services.classes.exam_desc'),
                        types: [
                          {
                            name: t('services.classes.exam_individual'),
                            price: price?.exam ?? '',
                            metric: '/h',
                          },
                        ],
                      },
                    ].map((type) => (
                      <div key={type.name}>
                        <h4 className="text-md rounded-full bg-bg_orange-0 p-2 text-center font-title font-bold tracking-wider text-white uppercase md:p-4 2xl:text-lg">
                          {type.name}
                        </h4>
                        <div className="my-4 px-2 md:px-4">{type.desc}</div>
                        <div className="center flex flex-col justify-center gap-2 text-white md:flex-row lg:flex-col xl:flex-row">
                          {type.types.map((subtype) => (
                            <div
                              key={subtype.name}
                              className="flex h-full w-3/4 flex-col items-center self-center overflow-hidden rounded-3xl border-4 border-solid border-bg_orange-0 bg-bg_orange-0 sm:w-1/2 lg:w-3/4 xl:w-1/2"
                            >
                              <div className="flex grow flex-col place-content-stretch justify-center p-1 text-center font-title text-lg font-bold uppercase md:p-2">
                                {subtype.name}
                              </div>
                              <div className="flex w-full justify-center self-center bg-bg_white-0 p-1 text-center tracking-normal text-textprimary md:p-2">
                                <div className="text-2xl md:text-3xl">
                                  {(price?.format ?? '').replace(
                                    '{0}',
                                    String(subtype.price),
                                  )}
                                </div>
                                <div className="text-md self-end">
                                  {subtype.metric}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col overflow-hidden rounded-3xl bg-bg_white-0 text-white shadow-md">
                <div className="flex items-center gap-4 bg-bg_orange-0 p-3 px-6 2xl:p-4 2xl:px-8">
                  <span className="material-icons text-white-0 text-center text-5xl! 2xl:text-6xl!">
                    article
                  </span>
                  <h3 className="text-center font-title text-xl font-bold tracking-wider uppercase 2xl:text-2xl">
                    {t('services.text.title')}
                  </h3>
                </div>
                <div className="flex flex-col gap-8 p-4 text-black md:p-8">
                  <div className="grid grid-cols-1 gap-6">
                    {[
                      {
                        name: t('services.text.translation'),
                        desc: t('services.text.translation_desc'),
                        icon: 'translate',
                        types: [],
                      },
                      {
                        name: t('services.text.revision'),
                        desc: t('services.text.revision_desc'),
                        icon: 'edit_note',
                        types: [],
                      },
                      {
                        name: t('services.text.subtitle'),
                        desc: t('services.text.subtitle_desc'),
                        icon: 'closed_caption',
                        types: [],
                      },
                    ].map((service) => (
                      <div className="flex flex-col gap-4" key={service.name}>
                        <div className="flex items-center gap-4 rounded-full bg-bg_orange-0 p-2 px-4 text-white md:p-4 md:px-8">
                          <span className="material-icons text-center text-2xl! md:text-3xl">
                            {service.icon}
                          </span>
                          <h4 className="text-md flex grow gap-2 text-left font-title font-bold tracking-wider uppercase 2xl:text-lg">
                            {service.name}
                          </h4>
                        </div>
                        <div className="px-4 text-justify md:px-8">
                          {service.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="items-center overflow-hidden rounded-3xl border-4 border-solid border-bg_orange-0 bg-bg_orange-0">
                    <h4 className="text-md flex grow flex-col place-content-center p-2 text-center font-title font-bold text-white uppercase 2xl:text-lg">
                      {t('services.text.budget_title')}
                    </h4>
                    <div className="flex w-full bg-bg_white-0 p-2 px-4 text-justify tracking-normal text-textprimary md:p-4 md:px-8">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: t('services.text.budget_text'),
                        }}
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </Background>
        <BackgroundRound
          color="bg-bg_blue-0 text-white"
          id="method"
          inverted={true}
        >
          <div className="grid grid-cols-1 gap-8 text-justify lg:grid-cols-2 2xl:gap-16">
            <div className="lg:col-span-2">
              <h2 className="mb-4 font-title text-2xl font-bold tracking-wider uppercase md:text-3xl">
                {t('method.title')}
              </h2>
              <p dangerouslySetInnerHTML={{ __html: t('method.desc_1') }}></p>
              <p dangerouslySetInnerHTML={{ __html: t('method.desc_2') }}></p>
            </div>
            <div className="">
              <h3 className="mb-4 font-title text-2xl font-bold tracking-wider uppercase md:text-3xl">
                {t('method.online_classes_title')}
              </h3>
              <p
                dangerouslySetInnerHTML={{ __html: t('method.online_classes') }}
              ></p>
            </div>
            <div className="">
              <h3 className="mb-4 font-title text-2xl font-bold tracking-wider uppercase md:text-3xl">
                {t('method.individual_classes_title')}
              </h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: t('method.individual_classes'),
                }}
              ></p>
            </div>
          </div>
        </BackgroundRound>
        <Section
          className="px-0 md:px-[unset]"
          title={t('testimonials.title')}
          id="testimonies"
        >
          <div className="relative pb-20">
            <Carousel
              responsive={responsive}
              // Renders the desktop layout when prerendering; the real width is
              // measured once the page loads
              ssr
              deviceType="desktop"
              partialVisible={true}
              arrows={false}
              showDots
              pauseOnHover
              renderButtonGroupOutside={true}
              customDot={<CustomDot />}
              renderDotsOutside={true}
              customButtonGroup={<CustomButtonGroup />}
            >
              {[
                { id: 'marina_marques', name: 'Marina Machado Marques' },
                { id: 'gabriel_schunk', name: 'Gabriel Schunk' },
                { id: 'lorena_lopes', name: 'Lorena Lopes' },
                { id: 'gustavo_souza', name: 'Gustavo Tanus Cesário de Souza' },
                { id: 'iara_cardeal', name: 'Iara Cardeal' },
                { id: 'gabriela_rocha', name: 'Gabriela Freitas Rocha' },
                { id: 'caroline_morato', name: 'Caroline Morato' },
                {
                  id: 'elenice_silva',
                  name: 'Elenice de Brito Teixeira Silva',
                },
                { id: 'paula_debien', name: 'Paula Debien' },
                { id: 'marcella_barros', name: 'Marcella Barros' },
                { id: 'maria_brustolini', name: 'Maria do Rosario Brustolini' },
                { id: 'adriana_mayer', name: 'Adriana Mayer' },
                { id: 'rodrigo_vasconcellos', name: 'Rodrigo de Vasconcellos' },
                { id: 'marina_guimaraes', name: 'Marina Guimarães' },
                { id: 'nilo_grego', name: 'Nilo Grego' },
                { id: 'luana_melo', name: 'Luana Melo' },
                { id: 'felipe_rocha', name: 'Felipe Rocha' },
                { id: 'daniel_conegundes', name: 'Daniel Conegundes' },
                { id: 'roberta_ferreira', name: 'Roberta Ferreira' },
                { id: 'ana_francca', name: 'Ana Cláudia Francca' },
                { id: 'leo_silva', name: 'Léo Silva' },
                { id: 'tales_cunha', name: 'Tales Cunha' },
              ].map((review) => (
                <div
                  key={review.id}
                  className="mx-4 flex h-full flex-col items-center justify-center gap-4 rounded-3xl bg-bg_blue-0 p-6 p-8 text-white select-none"
                >
                  <p className="text-justify italic">
                    <span className="material-icons text-center text-2xl! md:text-3xl">
                      format_quote
                    </span>
                    <span className="opacity-80">
                      {t(`testimonials.items.${review.id}`)}
                    </span>
                  </p>
                  <div className="self-end text-right font-title">
                    <p className="text-xl font-bold">{review.name}</p>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </Section>

        <Section id="contact">
          <div className="flex flex-col overflow-hidden rounded-[2rem] bg-bg_orange-0 p-8 text-white shadow-md md:rounded-[4rem] md:p-8 2xl:p-16">
            <div className="flex flex-col gap-16 lg:flex-row">
              <div className="w-full flex-1 shrink grow-[2]">
                <h2 className="mb-4 font-title text-2xl font-bold tracking-wider uppercase md:text-3xl">
                  {t('contact.title')}
                </h2>
                <div className="flex flex-col gap-4">
                  {[
                    {
                      icon: 'phone_in_talk',
                      name: t('contact.phone'),
                      value: (
                        <div>
                          <small className="mr-1 font-bold tracking-widest">
                            ES
                          </small>
                          +34 642 26 96 86
                        </div>
                      ),
                      url: 'tel:+34642269686',
                    },
                    {
                      icon: (
                        <FontAwesomeIcon icon={faWhatsapp} color={'white'} />
                      ),
                      name: 'WhatsApp',
                      url: 'https://wa.me/34642269686',
                    },
                    {
                      icon: 'mail',
                      name: 'E-mail',
                      value: <div>flaviasenglish@gmail.com</div>,
                      url: 'mailto:flaviasenglish@gmail.com',
                    },
                  ].map((contact) => (
                    <a
                      key={contact.name}
                      href={contact.url}
                      className="items-center rounded-full border-4 border-solid border-white p-2 px-4 md:px-6"
                      onClick={() => gaEventTracker(`click-${contact.name}`)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="mb-2 flex items-center gap-2 font-bold uppercase md:gap-4">
                        <div className="material-icons text-center text-4xl! md:text-3xl">
                          {contact.icon}
                        </div>
                        <div className="flex flex-col">
                          <div className="mt-1 font-title text-xl tracking-widest md:text-2xl">
                            {contact.name}
                          </div>
                          {contact.value && (
                            <div className="-mt-2 -mb-2 text-base font-bold normal-case md:text-lg">
                              {contact.value}
                            </div>
                          )}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="w-full flex-1 shrink grow-[3]">
                <h3 className="mb-4 font-title text-2xl font-bold tracking-wider uppercase md:text-3xl">
                  {t('contact.send_a_message')}
                </h3>
                <Contact />
              </div>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
};

export { Base };

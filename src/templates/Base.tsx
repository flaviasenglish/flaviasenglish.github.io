import React, { useEffect, useState } from 'react';

import { faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import i18n, { useSelectedLanguage, useTranslation } from 'next-export-i18n';
import { useRouter } from 'next/router';
import Carousel from 'react-multi-carousel';

import prices from '../../public/prices.json';
import { Background } from '../background/Background';
import { BackgroundRound } from '../background/BackgroundRound';
import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { AppConfig } from '../utils/AppConfig';
import useAnalyticsEventTracker from '../utils/useAnalyticsEventTracker';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { Hero } from './Hero';

import 'react-multi-carousel/lib/styles.css';

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

// @ts-ignore
const CustomDot = ({ onClick, active }) => {
  return (
    <li
      className={`${
        active ? 'active' : 'inactive'
      } w-[14px] h-[14px] bg-bg_blue-0 border-2 border-bg_blue-0 rounded-full m-1 ${
        active ? 'scale-150' : ''
      }  cursor-pointer flex-shrink-0`}
      onClick={() => onClick()}
    ></li>
  );
};

// @ts-ignore
const CustomButtonGroup = ({ next, previous, goToSlide, ...rest }: any) => {
  // @ts-ignore
  const {
    // @ts-ignore
    carouselState: { currentSlide },
  } = rest;
  return (
    <div className="carousel-button-group w-full absolute bottom-0 flex items-center invisible md:visible">
      <button
        className="absolute -translate-y-1/4 left-2 bg-bg_blue-0 p-4 flex rounded-full shadow-md drop-shadow-md"
        onClick={() => previous()}
      >
        <span
          className="material-icons-round text-center !text-4xl xl:!text-4xl text-white"
          style={{ WebkitTextStroke: '2px' }}
        >
          west
        </span>
      </button>
      <button
        className="absolute -translate-y-1/4 right-2 bg-bg_blue-0 p-4 flex rounded-full shadow-md drop-shadow-md"
        onClick={() => next()}
      >
        <span
          className="material-icons-round text-center !text-4xl xl:!text-4xl text-white"
          style={{ WebkitTextStroke: '2px' }}
        >
          east
        </span>
      </button>
    </div>
  );
};

// @ts-ignore
const getDefaultLanguage = (userI18n) => {
  let browserLang = '';
  if (
    typeof window !== 'undefined' &&
    window &&
    window.navigator &&
    (window.navigator.languages || window.navigator.language)
  ) {
    browserLang =
      (window.navigator.languages && window.navigator.languages[0]) ||
      window.navigator.language;
  }
  if (browserLang && userI18n.translations[browserLang]) {
    return browserLang;
  }
  const fallback = browserLang.split('-').shift();
  if (fallback && userI18n.translations[fallback]) {
    return fallback;
  }
  return userI18n.defaultLang;
};

const Base = () => {
  const router = useRouter();
  const i18nConfig = i18n();
  const [price, setPrice] = useState(prices.EUR);

  const getGeoInfo = () => {
    axios
      .get('https://ipapi.co/json/')
      .then((response) => {
        const { data } = response;
        console.log(data);

        if (data.country_code === 'BR') {
          setPrice(prices.BRL);
        }

        if (data.country_code === 'ES') {
          setPrice(prices.EUR_ES);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    router.push(
      {
        pathname: router.pathname,
        query: `lang=${getDefaultLanguage(i18nConfig)}`,
      },
      undefined
    );
    getGeoInfo();
  }, []);

  const { t } = useTranslation();
  const { lang } = useSelectedLanguage();
  // const [query] = useLanguageQuery();
  const gaEventTracker = useAnalyticsEventTracker('Event');

  return (
    <div className="antialiased text-textprimary-300 bg-background-500 xl:text-lg">
      <Meta
        title={AppConfig.title}
        description={AppConfig.description}
        language={lang}
      />

      <Hero />
      <BackgroundRound color="bg-bg_blue-0 text-white" id="aboutme">
        <div className="flex gap-8 lg:gap-16 2xl:gap-16 flex-col lg:flex-row">
          <div className="w-full">
            <div className="text-2xl md:text-3xl font-title mb-4 uppercase tracking-wider">
              {t('about_me.my_story')}
            </div>
            <p
              className="text-justify"
              dangerouslySetInnerHTML={{ __html: t('about_me.my_story_text') }}
            ></p>
          </div>
          <div className="w-full">
            <div className="text-2xl md:text-3xl font-title mb-4 uppercase tracking-wider">
              {t('about_me.certificates_title')}
            </div>
            <div className="grid grid-cols-2 gap-2 2xl:gap-8 auto-rows-fr">
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
                  className="rounded-3xl p-2 2xl:p-4 bg-background text-black shadow-md flex flex-col gap-1 uppercase"
                  key={certif.name}
                >
                  <span className="material-icons text-center !text-6xl text-bg_orange-0">
                    workspace_premium
                  </span>
                  <div className="flex flex-col flex-grow items-center justify-center tracking-wide font-title">
                    <div className="text-base text-center font-bold tracking-wider">
                      {certif.name}
                    </div>
                    <div className="text-sm text-center font-bold tracking-widest">
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
            <div className="rounded-3xl bg-bg_white-0 text-white shadow-md flex flex-col overflow-hidden">
              <div className="flex gap-4 items-center bg-bg_orange-0 p-3 2xl:p-4 px-6 2xl:px-8">
                <span className="material-icons text-center !text-5xl 2xl:!text-6xl text-white-0">
                  article
                </span>
                <div className="text-xl 2xl:text-2xl font-title font-bold text-center uppercase tracking-wider">
                  {t('services.text.title')}
                </div>
              </div>
              <div className="p-4 md:p-8 text-black gap-8 flex-col flex">
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
                      <div className="bg-bg_orange-0 rounded-full p-2 md:p-4 px-4 md:px-8 flex items-center text-white gap-4">
                        <span className="material-icons text-center !text-2xl md:text-3xl">
                          {service.icon}
                        </span>
                        <div className="font-bold tracking-wider font-title flex-grow text-left flex gap-2 uppercase text-md 2xl:text-lg">
                          {service.name}
                        </div>
                      </div>
                      <div className="px-4 md:px-8 text-justify">
                        {service.desc}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-bg_orange-0 rounded-3xl items-center border-solid border-4 border-bg_orange-0 overflow-hidden">
                  <div className="font-bold text-md 2xl:text-lg font-title flex-grow text-center flex flex-col place-content-center uppercase p-2 text-white">
                    {t('services.text.budget_title')}
                  </div>
                  <div className="flex bg-bg_white-0 w-full text-textprimary p-2 md:p-4 px-4 md:px-8 tracking-normal text-justify">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: t('services.text.budget_text'),
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl bg-bg_white-0 text-white shadow-md flex flex-col overflow-hidden">
              <div className="flex gap-4 items-center bg-bg_orange-0 p-3 2xl:p-4 px-6 2xl:px-8">
                <span className="material-icons text-center !text-6xl text-white-0">
                  cast_for_education
                </span>
                <div className="text-xl md:text-2xl font-title font-bold text-center uppercase tracking-wider">
                  {t('services.classes.title')}
                </div>
              </div>
              <div className="p-4 md:p-8 text-black gap-8 flex-col flex text-justify">
                {t('services.classes.desc')}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-8 lg:grid-flow-row grid-rows-[repeat(3,auto)]">
                  {[
                    {
                      name: t('services.classes.exam_title'),
                      desc: t('services.classes.exam_desc'),
                      types: [
                        {
                          name: t('services.classes.exam_individual'),
                          price: price.exam,
                          metric: '/h',
                        },
                      ],
                    },
                    {
                      name: t('services.classes.classes_title'),
                      desc: t('services.classes.classes_desc'),
                      types: [
                        {
                          name: t('services.classes.classes_individual'),
                          price: price.one,
                          metric: '/h',
                        },
                        {
                          name: t('services.classes.classes_double'),
                          subname: t('services.classes.classes_per_student'),
                          price: price.two,
                          metric: '/h',
                        },
                        {
                          name: t('services.classes.classes_group'),
                          subname: t('services.classes.classes_per_student'),
                          price: price.group,
                          metric: '/h',
                        },
                      ],
                    },
                  ].map((type) => (
                    <div key={type.name}>
                      <div className="font-bold tracking-wider font-title text-center uppercase bg-bg_orange-0 text-white rounded-full p-2 md:p-4  text-md 2xl:text-lg">
                        {type.name}
                      </div>
                      <div className="px-2 md:px-4 my-4">{type.desc}</div>
                      <div className="flex gap-2 flex-col md:flex-row lg:flex-col xl:flex-row text-white center justify-center">
                        {type.types.map((subtype) => (
                          <div
                            key={subtype.name}
                            className="bg-bg_orange-0 rounded-3xl flex flex-col items-center w-3/4 sm:w-1/2 lg:w-3/4 xl:w-1/2 self-center border-solid border-4 border-bg_orange-0 overflow-hidden h-full"
                          >
                            <div className="font-bold text-lg justify-center font-title flex-grow text-center flex flex-col place-content-stretch uppercase p-1 md:p-2">
                              {subtype.name}
                              <div className="text-xs font-bold font-title -mt-1">
                                {subtype.subname}
                              </div>
                            </div>
                            <div className="flex self-center text-center justify-center bg-bg_white-0 w-full text-textprimary p-1 md:p-2 tracking-normal">
                              <div className="text-2xl md:text-3xl">
                                {String(price.format).replace(
                                  '{0}',
                                  String(subtype.price)
                                )}
                              </div>
                              <div className="self-end text-md">
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
          </div>
        </Section>
      </Background>
      <BackgroundRound
        color="bg-bg_blue-0 text-white"
        id="method"
        inverted={true}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 2xl:gap-16 text-justify">
          <div className="lg:col-span-2">
            <div className="text-2xl md:text-3xl font-title font-bold mb-4 uppercase tracking-wider">
              {t('method.title')}
            </div>
            <p dangerouslySetInnerHTML={{ __html: t('method.desc_1') }}></p>
            <p dangerouslySetInnerHTML={{ __html: t('method.desc_2') }}></p>
          </div>
          <div className="">
            <div className="text-2xl md:text-3xl font-title font-bold mb-4 uppercase tracking-wider">
              {t('method.online_classes_title')}
            </div>
            <p
              dangerouslySetInnerHTML={{ __html: t('method.online_classes') }}
            ></p>
          </div>
          <div className="">
            <div className="text-2xl md:text-3xl font-title font-bold mb-4 uppercase tracking-wider">
              {t('method.individual_classes_title')}
            </div>
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
            partialVisible={true}
            arrows={false}
            showDots
            pauseOnHover
            renderButtonGroupOutside={true}
            // @ts-ignore
            customDot={<CustomDot />}
            renderDotsOutside={true}
            // @ts-ignore
            customButtonGroup={<CustomButtonGroup />}
          >
            {[
              {
                text: 'Recomendo fortemente a Flávia! Muito competente, atenciosa e agradável. Nas aulas, me sinto extremamente confortável - algo que não acontecia com outros professores. Com ela, melhorei significativamente minhas habilidades de leitura e fala, além de me sentir mais motivada para o aprendizado da língua inglesa.',
                name: 'Marina Machado Marques',
              },
              {
                text: 'Quando ingressei no mestrado, precisava urgentemente desenvolver habilidades de leitura em inglês. Procurei a Flávia e em pouco mais de um ano juntos, desenvolvi bastante a minha leitura e também a escuta, escrita e conversação. As aulas são ótimas, pensadas com carinho para as especificidades de cada aluno e, além de tudo, através de uma relação saudável, respeitosa, humana e amigável.',
                name: 'Gabriel Schunk',
              },
              {
                text: 'A Flávia é uma excelente professora! Super atenta ao aluno, ela consegue, por meio de uma aula tão leve quanto inteligente, nos fazer aprimorar todas as habilidades linguísticas. Ela nos incentiva e nos encoraja à expressão em língua inglesa ao mesmo tempo que cuida de consolidar essas habilidades com recursos variados de vocabulário, gramática, atividades interessantes, histórias... Recomendo demais fazer aula com a Flávia! <3',
                name: 'Lorena Lopes',
              },
              {
                text: 'Flávia é excelente tanto como professora quanto como tradutora. Pessoa sagaz, inteligente, pensa muito rápido; professora atenciosa, paciente, compreensiva. A tradutora preocupa-se muito com o trânsito dos textos, entre original e traduzido, (palavras, sentenças, ideias, conceitos), respeitando e valorizando a autoria e a recepção. Essa atenção minuciosa é o que faz com que suas traduções sejam as melhores. Será o dia em que a tradutora perderá para a professora, e é o caminho esperado; porém, não dispensaria a consultoria da profissional.',
                name: 'Gustavo Tanus Cesário de Souza',
              },
              {
                text: 'A Flávia é uma ótima professora, além de ser um ser humano incrível. Ela possui domínio total da língua inglesa, explica tintim por tintim o porquê das coisas (ela faz gramática parecer fácil), é superpaciente e dedicada (ela fala, desenha, faz mímica e dá pirueta até você aprender o que ela está ensinando), é pontual e organizada e suas aulas são dinâmicas, em um dia você está contando piada e no outro você está conversando sobre a situação econômica do país (tudo em inglês, é claro, mesmo que você não saiba corretamente como falar, ela te incentiva e te ajuda a falar tudo em inglês). ',
                name: 'Iara Cardeal',
              },
              {
                name: 'Gabriela Freitas Rocha',
                text: 'Flávia é uma professora excelente. Desde a avaliação diagnóstica já percebemos o tratamento diferenciado. Todas as aulas são programadas de acordo com as necessidades dos alunos e os materiais produzidos por ela são de altíssima qualidade, aliando o conhecimento da língua inglesa às questões culturais de diversos países de língua inglesa. As aulas são tão boas que se torna prazeroso aprender uma nova língua. Eu consegui desenvolver bastante a fala, que era meu principal objetivo, em um tempo muito menor em comparação a um curso de línguas tradicional. Por tudo isso, recomendo sempre a todos que me pedem indicação.',
              },
              {
                text: 'A Flávia é uma professora maravilhosa! Em anos estudando língua inglesa, nunca imaginei conseguir alcançar o avanço que tive nesse pouco mais de um ano tendo aulas com ela. É realmente impressionante a forma eficiente com que ela trabalha. Me impressiona, não só o conhecimento que ela tem da língua e sua forma de ensinar, mas também sua dedicação em preparar as aulas, em acompanhar e de fato se atentar e ajudar nas dificuldades especificas no processo de aprendizagem. Muito bom encontrar um profissional tão qualificado e excelente!',
                name: 'Caroline Morato',
              },
              {
                text: 'Flávia é uma excelente profissional! Uma professora dedicada, pontual e focada nas necessidades do aluno. As aulas são muito bem aproveitadas em cada segundo, o que faz com que o rendimento seja maior. Fiz aulas com ela para proficiência quando meu nível de inglês era zero. Consegui passar de primeira após 6 meses. Super recomendo.',
                name: 'Elenice de Brito Teixeira Silva',
              },
              {
                name: 'Paula Debien',
                text: 'Meu primeiro contato com a Flávia foi ainda na época do Inglês sem Fronteiras, na UFMG. Desde então, não largo mais! rs Sempre que eu preciso de uma força com o inglês, é ela quem me salva. Em 2019, participei de um processo seletivo para bolsa de doutorado sanduíche na Austrália. Eu nunca tinha feito o TOEFL iBT até então. Flávia fez um milagre em poucas aulas online! As aulas são increvelmente dinâmicas, personalizadas, objetivas e produtivas. Obtive uma nota bem maior do que eu esperava, consegui a bolsa e passei 6 meses na Austrália. Essa experiência mudou minha vida e devo muito à Flávia por isso. Recentemente, fui pedir socorro novamente para me preparar para minha defesa de doutorado. Mais uma vez, em poucas aulas ela transformou minha apresentação em motivo de elogios. Sou só gratidão! Recomendo de olhos fechados!',
              },
              {
                text: 'Desde minha primeira conversa com a Flávia eu já me encantei com a qualidade do trabalho e aula após aula a admiração só aumenta! Além de saber t-u-d-o de inglês, ela tem uma didática incrível pra ensinar, pra corrigir, pra explicar dúvida, pra tudo! Sempre pensa em algo novo pra trazer em todas as aulas (música, tema de conversa, atividade etc) e o fato da aula ser online não perde em absolutamente nada de uma aula presencial, mto pelo contrário: ela escreve, desenha (mto bem <3), fala, repete e faz de tudo pra você entender! haha Não tem erro! Obrigada Flávia por ser uma professora e uma pessoa incrível!',
                name: 'Marcella Barros',
              },
              {
                text: 'Fiquei sabendo da Flavia atraves da minha sobrinha, e resolvi reiniciar meu estudo de ingles. Flavia e uma otima professora; entende muito o aluno, ajudando-o a enfrentar suas dificuldades.Tem uma excelente didatica e acompanha tudo,passo a passo, com dedicacao e compreensao. E paciente em suas explicacoes, que vao ao encontro das minhas necessidades, visando os meus objetivos! Me encanto a cada dia mais pelas suas aulas! Didatica excelente; com muita novidade... que nos incentiva ao aprendizado!',
                name: 'Maria do Rosario Brustolini',
              },
              {
                name: 'Adriana Mayer',
                text: 'Eu super recomendo o trabalho da Flávia, pois a considero uma excelente professora. Além de estar me ensinando o idioma, ela me ensinou a gostar do processo de aprendizado, a gostar de estudar inglês, o que me parecia impossível antes de ser sua aluna. A Flávia é criativa na utilização dos diversos recursos de ensino e sempre procura abordar assuntos interessantes, que fazem o aluno querer interagir e buscar a comunicação. Com paciência e muita didática, ela vai deixando o aluno cada vez mais seguro e à vontade e quando menos se espera a gente já está conversando em inglês. Só tenho a agradecer a Flávia pelo meu aprendizado.',
              },
              {
                text: 'Flávia é uma professora muito competente, pois ela não só domina a língua como também possui uma didática eficiente e adaptável ao interesse e dificuldades do aluno. Eu tinha interesse de melhorar a minha pronúncia e fluência na minha fala e relembrar algumas coisas da gramática. Não conheço professora com pronúncia e ouvido aos detalhes melhor que a dela, o que me ajudou muito na minha pronúncia. Tivemos aulas basicamente focadas em conversação, mas ela soube sempre trabalhar certos pontos da gramática, os quais ela percebia que eu tinha dificuldade. Ela teve muito boa didática ao me ensinar e soube preparar bem as aulas. Sem dúvida, o nível de inglês que atingi com a Flávia foi decisivo para eu conseguir meu doutorado na Alemanha, e que me ajuda diariamente aqui. Sou grato e só tenho à recomendar!',
                name: 'Rodrigo de Vasconcellos',
              },
              {
                text: 'Flávia é minha professora há pouco tempo, mas já o suficiente para perceber como é competente e organizada. Conhece a estrutura da língua e tem didática para ensinar com clareza. É paciente e disponível. Estou muito satisfeita com o quanto tenho aprendido com suas aulas.',
                name: 'Marina Guimarães',
              },
              {
                text: 'Quando contratei a Flávia tinha dúvida se uma professora tão qualificada seria a melhor opção para meu nível básico. Mas, paciente e habilidosa nas técnicas pedagógicas, mostrou ter muitos recursos inclusive para níveis iniciais como o meu. Há apenas 6 meses em aula, pude experimentar uma evolução inesperada. Muito grato a essa excelente profissional.',
                name: 'Nilo Grego',
              },
              {
                text: 'Uma amiga que fala inglês muito bem me indicou a Flávia e eu amei. Gosto do método que é escolhido de acordo com a necessidade e perfil do aluno. Admiro seu conhecimento do idioma, gosto muito do material utilizado e o formato das aulas. Recomendo muito o trabalho dela!',
                name: 'Luana Melo',
              },
              {
                text: 'Ótima professora. Sempre disposta a tirar as dúvidas. Já tive aulas com professores americanos e posso dizer que não sinto diferença na pronúncia.',
                name: 'Felipe Rocha',
              },
              {
                text: 'Excelente professora! Muito competente, tem domínio total da língua inglesa! Sempre busca adequar o conteúdo às necessidades do aluno e fazer as aulas da forma mais interessante possível! Sem dúvidas aulas particulares são o melhor custo benefício para se desenvolver no idioma e a Flávia é literalmente mestre nisso!',
                name: 'Daniel Conegundes',
              },
              {
                text: 'Meu primeiro contato com a Flávia foi na disciplina "Inglês para fins acadêmicos II". Eu fiquei encantada com a sua didática! Após essa experiência, entrei em contato buscando por aulas particulares e a experiência foi melhor ainda! Ela conduz as aulas de forma leve e divertida e planeja com carinho as atividades a serem trabalhadas.',
                name: 'Roberta Ferreira',
              },
              {
                name: 'Ana Cláudia Francca',
                text: 'A Flávia não é só fodona no inglês, ela é qualificada, sabe explicar o pq das coisas, é paciente, prestativa, e tem um preço justo! Bora estudar inglês meu povo!!! Super indico!!!',
              },
              {
                text: 'Flavinha é simplesmente a melhor!!! Domínio de todas habilidades necessárias da língua inglesa.',
                name: 'Léo Silva',
              },
              {
                text: 'Excelente professora, inglês impecável com muita didática e atenção aos detalhes.',
                name: 'Tales Cunha',
              },
            ].map((review) => (
              <div
                key={review.name}
                className="bg-bg_blue-0 p-6 text-white p-8 rounded-3xl mx-4 flex flex-col items-center justify-center h-full gap-4 select-none"
              >
                <p className="italic text-justify">
                  <span className="material-icons text-center !text-2xl md:text-3xl">
                    format_quote
                  </span>
                  <span className=" opacity-80">{review.text}</span>
                </p>
                <div className="self-end  text-right font-title">
                  <p className="text-xl font-bold">{review.name}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </Section>

      <Section id="contact">
        <div className="bg-bg_orange-0 text-white shadow-md flex flex-col overflow-hidden rounded-[2rem] md:rounded-[4rem] p-8 md:p-8 2xl:p-16 ">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex-grow-[2] w-full flex-shrink flex-1">
              <div className="text-2xl md:text-3xl font-title font-bold mb-4 uppercase tracking-wider">
                {t('contact.title')}
              </div>
              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: 'phone_in_talk',
                    name: t('contact.phone'),
                    value: (
                      <div>
                        <small className="mr-1 font-bold tracking-widest">
                          PT
                        </small>
                        +351 915 204 911
                      </div>
                    ),
                    url: 'tel:+351915204911',
                  },
                  {
                    icon: <FontAwesomeIcon icon={faWhatsapp} color={'white'} />,
                    name: 'WhatsApp',
                    url: 'https://wa.me/351915204911',
                  },
                  {
                    icon: 'mail',
                    name: 'E-mail',
                    value: <div>flaviasenglish@gmail.com</div>,
                    url: 'mailto:flaviasenglish@gmail.com',
                  },
                  {
                    icon: <FontAwesomeIcon icon={faLinkedin} color={'white'} />,
                    name: 'LinkedIn',
                    value: '',
                    url: 'https://www.linkedin.com/in/flaviaforcatho/',
                  },
                ].map((contact) => (
                  <a
                    key={contact.name}
                    href={contact.url}
                    className="items-center border-solid border-4 border-white p-2 px-4 md:px-6 rounded-full"
                    onClick={() => gaEventTracker(`click-${contact.name}`)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="font-bold uppercase mb-2 flex gap-2 md:gap-4 items-center">
                      <div className="material-icons text-center !text-4xl md:text-3xl">
                        {contact.icon}
                      </div>
                      <div className="flex flex-col">
                        <div className="tracking-widest text-xl md:text-2xl font-title mt-1">
                          {contact.name}
                        </div>
                        {contact.value && (
                          <div className="text-base font-bold md:text-lg normal-case -mt-2 -mb-2">
                            {contact.value}
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="flex-grow-[3] w-full flex-shrink flex-1">
              <div className="text-2xl md:text-3xl font-title font-bold mb-4 uppercase tracking-wider">
                {t('contact.send_a_message')}
              </div>
              <Contact />
            </div>
          </div>
        </div>
      </Section>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export { Base };

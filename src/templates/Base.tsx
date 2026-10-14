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
  return (
    <div className="carousel-button-group invisible absolute bottom-0 flex w-full items-center md:visible">
      <button
        className="absolute left-2 flex -translate-y-1/4 rounded-full bg-bg_blue-0 p-4 shadow-md drop-shadow-md"
        onClick={() => previous?.()}
      >
        <span
          className="material-icons-round text-center text-4xl! text-white xl:text-4xl!"
          style={{ WebkitTextStroke: '2px' }}
        >
          west
        </span>
      </button>
      <button
        className="absolute right-2 flex -translate-y-1/4 rounded-full bg-bg_blue-0 p-4 shadow-md drop-shadow-md"
        onClick={() => next?.()}
      >
        <span
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
      <Hero />
      <BackgroundRound color="bg-bg_blue-0 text-white" id="aboutme">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16 2xl:gap-16">
          <div className="w-full">
            <div className="mb-4 font-title text-2xl tracking-wider uppercase md:text-3xl">
              {t('about_me.my_story')}
            </div>
            <p
              className="text-justify"
              dangerouslySetInnerHTML={{ __html: t('about_me.my_story_text') }}
            ></p>
          </div>
          <div className="w-full">
            <div className="mb-4 font-title text-2xl tracking-wider uppercase md:text-3xl">
              {t('about_me.certificates_title')}
            </div>
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
                <div className="text-center font-title text-xl font-bold tracking-wider uppercase md:text-2xl">
                  {t('services.classes.title')}
                </div>
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
                      <div className="text-md rounded-full bg-bg_orange-0 p-2 text-center font-title font-bold tracking-wider text-white uppercase md:p-4 2xl:text-lg">
                        {type.name}
                      </div>
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
                <div className="text-center font-title text-xl font-bold tracking-wider uppercase 2xl:text-2xl">
                  {t('services.text.title')}
                </div>
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
                        <div className="text-md flex grow gap-2 text-left font-title font-bold tracking-wider uppercase 2xl:text-lg">
                          {service.name}
                        </div>
                      </div>
                      <div className="px-4 text-justify md:px-8">
                        {service.desc}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="items-center overflow-hidden rounded-3xl border-4 border-solid border-bg_orange-0 bg-bg_orange-0">
                  <div className="text-md flex grow flex-col place-content-center p-2 text-center font-title font-bold text-white uppercase 2xl:text-lg">
                    {t('services.text.budget_title')}
                  </div>
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
            <div className="mb-4 font-title text-2xl font-bold tracking-wider uppercase md:text-3xl">
              {t('method.title')}
            </div>
            <p dangerouslySetInnerHTML={{ __html: t('method.desc_1') }}></p>
            <p dangerouslySetInnerHTML={{ __html: t('method.desc_2') }}></p>
          </div>
          <div className="">
            <div className="mb-4 font-title text-2xl font-bold tracking-wider uppercase md:text-3xl">
              {t('method.online_classes_title')}
            </div>
            <p
              dangerouslySetInnerHTML={{ __html: t('method.online_classes') }}
            ></p>
          </div>
          <div className="">
            <div className="mb-4 font-title text-2xl font-bold tracking-wider uppercase md:text-3xl">
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
            customDot={<CustomDot />}
            renderDotsOutside={true}
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
                className="mx-4 flex h-full flex-col items-center justify-center gap-4 rounded-3xl bg-bg_blue-0 p-6 p-8 text-white select-none"
              >
                <p className="text-justify italic">
                  <span className="material-icons text-center text-2xl! md:text-3xl">
                    format_quote
                  </span>
                  <span className="opacity-80">{review.text}</span>
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
              <div className="mb-4 font-title text-2xl font-bold tracking-wider uppercase md:text-3xl">
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
                          ES
                        </small>
                        +34 642 26 96 86
                      </div>
                    ),
                    url: 'tel:+34642269686',
                  },
                  {
                    icon: <FontAwesomeIcon icon={faWhatsapp} color={'white'} />,
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
              <div className="mb-4 font-title text-2xl font-bold tracking-wider uppercase md:text-3xl">
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

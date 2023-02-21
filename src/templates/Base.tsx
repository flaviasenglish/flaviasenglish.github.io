import React from 'react';

import { useSelectedLanguage } from 'next-export-i18n';
import Carousel from 'react-multi-carousel';

import { Background } from '../background/Background';
import { BackgroundRound } from '../background/BackgroundRound';
import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { AppConfig } from '../utils/AppConfig';
import { Contact } from './Contact';
import { Footer } from './Footer';
import { Hero } from './Hero';

import 'react-multi-carousel/lib/styles.css';
import { faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

const Base = () => {
  // const router = useRouter();
  // const { t } = useTranslation();
  const { lang } = useSelectedLanguage();
  // const [query] = useLanguageQuery();

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
              Minha história
            </div>
            <p className="text-justify">
              Apaixonada pela língua inglesa desde a infância, formei-me em
              Letras - Inglês pela UFMG em 2015, onde também concluí o Mestrado
              em Língua Inglesa em 2019. Minha atuação como professora começou
              em 2011. Ao longo desses 11 anos, passei por renomadas escolas de
              inglês e também lecionei como estagiária na UFMG em diferentes
              programas. Sou grata por todas essas oportunidades, que
              contribuíram imensamente para minha capacitação. Mas em 2017, já
              com boa bagagem profissional, comecei a trilhar o que sabia ser o
              meu próprio caminho: tradução, revisão e aulas particulares para o
              público adulto. Já são dezenas de alunos particulares ao longo de
              todos esses anos, e não tenho dúvidas de ter feito a escolha que
              melhor me permite compartilhar o meu conhecimento. Desde 2013,
              atuo paralelamente na tradução, revisão, transcrição e legendagem,
              tendo já trabalhado com dezenas de documentos de diversos gêneros.{' '}
              <b>
                Meu objetivo é garantir que a língua inglesa deixe de ser um
                problema na sua vida, e minha vocação é fazer isso com primor.
              </b>
            </p>
          </div>
          <div className="w-full">
            <div className="text-2xl md:text-3xl font-title mb-4 uppercase tracking-wider">
              Certificações
            </div>
            <div className="grid grid-cols-2 gap-2 2xl:gap-8 auto-rows-fr">
              {[
                {
                  name: 'Mestrado em Língua Inglesa (UFMG)',
                  year: 2019,
                },
                {
                  name: 'TOEFL iBT: 118/120',
                  year: 2019,
                },
                {
                  name: 'IELTS: 8.5/9',
                  year: 2016,
                },
                {
                  name: 'Graduação em Letras - Inglês (UFMG)',
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
                <div className="rounded-3xl p-2 2xl:p-4 bg-background text-black shadow-md flex flex-col gap-1 uppercase">
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
        <Section title={'Serviços'} id={'services'}>
          <div className="flex flex-col gap-8">
            <div className="rounded-3xl bg-bg_white-0 text-white shadow-md flex flex-col overflow-hidden">
              <div className="flex gap-4 items-center bg-bg_orange-0 p-3 2xl:p-4 px-6 2xl:px-8">
                <span className="material-icons text-center !text-5xl 2xl:!text-6xl text-white-0">
                  article
                </span>
                <div className="text-xl 2xl:text-2xl font-title font-bold text-center uppercase tracking-wider">
                  Trabalhos com textos
                </div>
              </div>
              <div className="p-4 md:p-8 text-black gap-8 flex-col flex">
                <div className="grid grid-cols-1 gap-6">
                  {[
                    {
                      name: 'Tradução',
                      desc: 'Traduzo trabalhos acadêmicos, livros, vídeos, áudios, cartas, email, cardápios, websites, etc. Inglês → Português e Português → Inglês. Não sou tradutora juramentada, portanto não traduzo documentos oficiais. Para tradução juramentada, procure a Junta Comercial do seu estado.',
                      icon: 'translate',
                      types: [],
                    },
                    {
                      name: 'Revisão',
                      desc: 'Reviso textos em inglês: trabalhos acadêmicos, livros, scripts, cartas, emails, cardápios, websites, etc. Não reviso textos em português.',
                      icon: 'edit_note',
                      types: [],
                    },
                    {
                      name: 'Legendagem',
                      desc: 'Faço transcrição de áudios e vídeos em inglês. Faço legendagem de vídeos em inglês, com legendas em inglês e/ou em português.  Faço legendagem de vídeos em português com legenda em inglês.',
                      icon: 'closed_caption',
                      types: [],
                    },
                  ].map((service) => (
                    <div className="flex flex-col gap-4">
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
                    Orçamento
                  </div>
                  <div className="flex bg-bg_white-0 w-full text-textprimary p-2 md:p-4 px-4 md:px-8 tracking-normal text-justify">
                    O orçamento dos serviços de tradução e revisão consideram a
                    extensão do material original, o nível de especificidade, e
                    o prazo. Para fazer um orçamento, basta entrar em contato
                    pelo flaviasenglish@gmail.com, anexando o texto a ser orçado
                    e especificando o prazo pretendido.
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
                  Aulas particulares de inglês
                </div>
              </div>
              <div className="p-4 md:p-8 text-black gap-8 flex-col flex text-justify">
                Curso completo, conversação, inglês para viagens, inglês
                instrumental, preparação para exames (IELTS, TOEFL ITP e iBT,
                proficiência para pós-graduação, mobilidade acadêmica, FCE, CAE
                e PTE Academic).
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-8 lg:grid-flow-col grid-rows-[repeat(3,auto)]">
                  {[
                    {
                      name: 'Preparação para exames',
                      desc: 'Preparação para TOEFL, IELTS, etc., com foco nas habilidades específicas testadas em cada exame. Inclui correção de textos, avaliação de speaking, estratégias para reading e listening, e projeção de resultados.',
                      types: [
                        {
                          name: 'Individual',
                          price: '120',
                          metric: '/h',
                        },
                      ],
                    },
                    {
                      name: 'Demais aulas',
                      desc: 'Inclui nivelamento gratuito, compartilhamento de material, plano de estudos individual e personalizado de acordo com objetivos, interesses e perfil do aluno.',
                      types: [
                        {
                          name: 'Individual',
                          price: '100',
                          metric: '/h',
                        },
                        {
                          name: 'Duplas',
                          subname: 'por aluno',
                          price: '75',
                          metric: '/h',
                        },
                        {
                          name: 'Grupos',
                          subname: 'por aluno',
                          price: '60',
                          metric: '/h',
                        },
                      ],
                    },
                  ].map((type) => (
                    <>
                      <div className="font-bold tracking-wider font-title text-center uppercase bg-bg_orange-0 text-white rounded-full p-2 md:p-4  text-md 2xl:text-lg">
                        {type.name}
                      </div>
                      <div className="px-2 md:px-4">{type.desc}</div>
                      <div className="flex gap-2 flex flex-col md:flex-row lg:flex-col xl:flex-row text-white center justify-center">
                        {type.types.map((subtype) => (
                          <div className="bg-bg_orange-0 rounded-3xl flex flex-col items-center w-3/4 sm:w-1/2 lg:w-3/4 xl:w-1/2 self-center border-solid border-4 border-bg_orange-0 overflow-hidden h-full">
                            <div className="font-bold text-lg justify-center font-title flex-grow text-center flex flex-col place-content-stretch uppercase p-1 md:p-2">
                              {subtype.name}
                              <div className="text-xs font-bold font-title -mt-1">
                                {subtype.subname}
                              </div>
                            </div>
                            <div className="flex self-center text-center justify-center bg-bg_white-0 w-full text-textprimary p-1 md:p-2 tracking-normal">
                              <div className="text-2xl md:text-3xl">
                                R${subtype.price}
                              </div>
                              <div className="self-end text-base">
                                {subtype.metric}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
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
              Método
            </div>
            <p>
              Essa é quase sempre a primeira pergunta que recebo de alunos
              interessados: “qual seu método?” No entanto, cada aluno é uma
              combinação única de perfil de aprendizagem, objetivos com a
              língua, experiências prévias de estudo, interesses, personalidade,
              prazos. É impossível que um único método atenda a todos. Por isso,
              <b>não tenho um método fixo</b>: trabalho com uma variedade de
              abordagens e materiais (incluindo material próprio), acredito em
              metodologia flexível e aulas diversificadas.
            </p>
            <p>
              Os alunos preenchem um formulário antes do início das aulas, para
              que eu possa conhecê-los melhor e pensar em um plano inicial de
              estudos. Alunos que se identificam como falantes intermediários ou
              avançados fazem um teste de nivelamento gratuito para
              identificarmos as habilidades (fala, escuta, leitura e escrita)
              que necessitam maior atenção. O teste irá precisar o nível CEFR do
              aluno em cada habilidade. Ao longo do curso, os alunos são livres
              para opinar sobre as atividades selecionadas ou sugerir uma
              mudança de rota (por exemplo, caso uma nova demanda apareça, como
              um exame de proficiência, uma viagem ao exterior, etc.) Aos poucos
              nós vamos, em conjunto, ajustando as aulas às necessidades e
              interesses do aluno. Metodologias precisam fluir, porque a vida
              flui.
            </p>
          </div>
          <div className="">
            <div className="text-2xl md:text-3xl font-title font-bold mb-4 uppercase tracking-wider">
              Aulas online
            </div>
            <p>
              Como trabalho com atendimento online desde 2015, tenho muita
              experiência em tornar a aula online o mais prática e imersiva
              possível. Utilizo o Zoom, um programa voltado para aulas, em
              conjunto com várias outras ferramentas virtuais, para proporcionar
              uma aula interativa, dinâmica e completa. Todas as anotações
              feitas em aula são enviadas depois ao aluno, juntamente com o
              material, para que a sua preocupação seja apenas o aprendizado. 😊
            </p>
          </div>
          <div className="">
            <div className="text-2xl md:text-3xl font-title font-bold mb-4 uppercase tracking-wider">
              Aulas particulares
            </div>
            <p>
              São muitas as vantagens da aula particular. Primeiramente, citaria
              a liberdade do professor em desenvolver um{' '}
              <b>plano de estudos personalizado</b> que garante resultados.
              Também a relação que é desenvolvida com cada aluno ao longo das
              aulas torna o trabalho mais pessoal e humano, o que é fundamental
              para mim - fiz verdadeiros amigos ensinando inglês. No mais, minha
              diversificada experiência profissional me permitiu atestar, sem
              sombra de dúvidas, que{' '}
              <b>
                alunos particulares aprendem mais rápido, melhor e com mais
                prazer.
              </b>{' '}
              Tenho muita paixão pelo trabalho que faço porque acredito nele;
              não mais me frustro com as conhecidas desvantagens das escolas
              tradicionais de inglês.{' '}
              <b>
                Como professora particular, sou livre para priorizar o ensino de
                qualidade.
              </b>
            </p>
          </div>
        </div>
      </BackgroundRound>
      <Section
        className="px-0 md:px-[unset]"
        title={'DEPOIMENTOS'}
        id="testimonies"
      >
        <div className="relative pb-20">
          <Carousel
            responsive={responsive}
            partialVisible={true}
            arrows={false}
            showDots
            autoPlaySpeed={15000}
            pauseOnHover
            autoPlay
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
              <div className="bg-bg_blue-0 p-6 text-white p-8 rounded-3xl mx-4 flex flex-col items-center justify-center h-full gap-4 select-none">
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
          <div className="flex flex-col md:flex-row gap-16">
            <div className="flex-grow-[2] w-full flex-shrink flex-1">
              <div className="text-2xl md:text-3xl font-title font-bold mb-4 uppercase tracking-wider">
                Contato
              </div>
              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: 'phone_in_talk',
                    name: 'Telefone',
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
                    href={contact.url}
                    className="items-center border-solid border-4 p-2 px-6 rounded-full"
                  >
                    <div className="font-bold uppercase mb-2 flex gap-4 items-center">
                      <div className="material-icons text-center !text-4xl md:text-3xl">
                        {contact.icon}
                      </div>
                      <div className="flex flex-col">
                        <div className="tracking-widest text-2xl font-title mt-1">
                          {contact.name}
                        </div>
                        {contact.value && (
                          <div className="text-lg normal-case -mt-2 -mb-2 font-normal">
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
                Envie uma mensagem
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

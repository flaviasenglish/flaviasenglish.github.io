import { useTranslation } from 'next-export-i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';

type INavbarTwoColumnsProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const NavbarTwoColumns = (props: INavbarTwoColumnsProps) => {
  const router = useRouter();

  const { t } = useTranslation();
  // const [query] = useLanguageQuery();

  const scrollToDiv = function (id: string) {
    const element = document?.getElementById(id);
    if (element != null) {
      const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
      props.setOpen(false);
    }
  };

  const menuItems = (
    <>
      <li
        onClick={() => {
          scrollToDiv('aboutme');
        }}
      >
        <Link legacyBehavior href="#" shallow={true}>
          <a>Sobre mim</a>
        </Link>
      </li>
      <li
        onClick={() => {
          scrollToDiv('services');
        }}
      >
        <Link legacyBehavior href="#">
          <a
            onClick={() => {
              props.setOpen(!props.open);
            }}
          >
            Serviços
          </a>
        </Link>
      </li>
      <li
        onClick={() => {
          scrollToDiv('testimonies');
        }}
      >
        <Link legacyBehavior href="#">
          <a
            onClick={() => {
              props.setOpen(!props.open);
            }}
          >
            Depoimentos
          </a>
        </Link>
      </li>
      <li
        onClick={() => {
          scrollToDiv('contact');
        }}
      >
        <Link legacyBehavior href="#">
          <a
            onClick={() => {
              props.setOpen(!props.open);
            }}
          >
            Contato
          </a>
        </Link>
      </li>
      <style jsx>
        {`
          li {
            @apply w-full md:w-auto text-center;
          }

          li a {
            @apply w-full flex justify-center md:inline px-4 py-2 tracking-wider font-title;
          }
        `}
      </style>
    </>
  );

  return (
    <div className="flex justify-between flex-wrap items-center flex-grow">
      <div>
        <Link legacyBehavior href="#">
          <a
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img
              src={`${router.basePath}/assets/images/logo_top.png`}
              className="h-10 lg:h-20"
            />
          </a>
        </Link>
      </div>

      <nav className="min-h-16">
        <ul className="navbar gap-0 hidden md:flex items-center font-bold tracking-wide uppercase text-sm">
          {menuItems}
        </ul>
        <ul
          className={`navbar text-xl flex gap-0 p-8 w-full h-screen items-center flex-col md:hidden fixed right-0 font-bold uppercase top-14 bg-white bottom-0 transition-all ${
            !props.open ? '-right-full' : ''
          }`}
        >
          {menuItems}
        </ul>
        {/* <!-- Mobile menu button --> */}
        <div className="md:hidden flex items-center">
          <button
            className="outline-none mobile-menu-button"
            onClick={() => props.setOpen(!props.open)}
          >
            <svg
              className="w-6 h-6 text-gray-500"
              x-show="!showMenu"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
};

export { NavbarTwoColumns };

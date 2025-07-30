import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-export-i18n';

import { scrollToDiv as globalScrollToDiv } from '../globals';

type INavbarTwoColumnsProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const NavbarTwoColumns = (props: INavbarTwoColumnsProps) => {
  const router = useRouter();

  const { t } = useTranslation();
  // const [query] = useLanguageQuery();

  const scrollToDiv = (id: string) => {
    props.setOpen(false);
    globalScrollToDiv(id);
  };

  const menuItems = (
    <>
      <li>
        <Link
          href="#"
          onClick={(event) => {
            event.preventDefault();
            scrollToDiv('aboutme');
          }}
          shallow={true}
        >
          {t('header.about_me')}
        </Link>
      </li>
      <li>
        <Link
          href="#"
          onClick={(event) => {
            event.preventDefault();
            scrollToDiv('services');
            props.setOpen(false);
          }}
        >
          {t('header.services')}
        </Link>
      </li>
      <li>
        <Link
          href="#"
          onClick={(event) => {
            event.preventDefault();
            scrollToDiv('method');
            props.setOpen(false);
          }}
        >
          {t('header.method')}
        </Link>
      </li>
      <li>
        <Link
          href="#"
          onClick={(event) => {
            event.preventDefault();
            scrollToDiv('testimonies');
            props.setOpen(false);
          }}
        >
          {t('header.testimonies')}
        </Link>
      </li>
      <li>
        <Link
          href="#"
          onClick={(event) => {
            event.preventDefault();
            scrollToDiv('contact');
            props.setOpen(false);
          }}
        >
          {t('header.contact')}
        </Link>
      </li>
      <style jsx>
        {`
          li {
            @apply w-full md:w-auto text-center;
          }

          li :global(a),
          li :global(span) {
            @apply w-full flex justify-center md:inline px-4 py-2 tracking-wider font-title;
          }
        `}
      </style>
    </>
  );

  return (
    <div className="flex justify-between flex-wrap items-center flex-grow">
      <div>
        <Link
          href="#"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img
            src={`${router.basePath}/assets/images/logo_top.png`}
            className="h-10 2xl:h-20 2xl:py-2"
          />
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

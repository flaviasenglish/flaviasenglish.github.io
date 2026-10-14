import type { MouseEvent } from 'react';

import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { scrollToDiv as globalScrollToDiv } from '../globals';
import { LanguageSelector } from './LanguageSelector';

type INavbarTwoColumnsProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const NavbarTwoColumns = (props: INavbarTwoColumnsProps) => {
  const { t } = useTranslation();

  const scrollToDiv = (event: MouseEvent, id: string) => {
    event.preventDefault();
    props.setOpen(false);
    globalScrollToDiv(id);
  };

  const menuItems = (
    <>
      {[
        { id: 'aboutme', label: t('header.about_me') },
        { id: 'services', label: t('header.services') },
        { id: 'method', label: t('header.method') },
        { id: 'testimonies', label: t('header.testimonies') },
        { id: 'contact', label: t('header.contact') },
      ].map((item) => (
        <li key={item.id}>
          <a href={`#${item.id}`} onClick={(e) => scrollToDiv(e, item.id)}>
            {item.label}
          </a>
        </li>
      ))}
    </>
  );

  return (
    <div className="flex grow items-center justify-between gap-2">
      <div className="min-w-0 shrink">
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/images/logo_top.png`}
            alt="Flávia Forcatho English Solutions"
            className="h-auto max-h-10 w-auto max-w-full 2xl:max-h-20 2xl:py-2"
          />
        </a>
      </div>

      <nav className="flex shrink-0 items-center gap-3 md:gap-2 lg:gap-4">
        <ul className="navbar hidden items-center gap-0 text-sm font-bold tracking-wide uppercase md:flex">
          {menuItems}
        </ul>
        <ul
          className={clsx(
            'navbar fixed top-14 bottom-0 flex h-screen w-full flex-col items-center gap-0 bg-white p-8 text-xl font-bold uppercase transition-all md:hidden',
            props.open ? 'right-0' : '-right-full',
          )}
        >
          {menuItems}
        </ul>
        <LanguageSelector />
        {/* <!-- Mobile menu button --> */}
        <div className="flex items-center md:hidden">
          <button
            className="mobile-menu-button cursor-pointer outline-hidden"
            aria-label="Menu"
            aria-expanded={props.open}
            onClick={() => props.setOpen(!props.open)}
          >
            <svg
              className="h-6 w-6 text-gray-500"
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

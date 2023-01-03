import React, { useEffect, useRef, useState } from 'react';

import { useTranslation } from 'next-export-i18n';
import { useRouter } from 'next/router';

import { Button } from '../button/Button';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';

const Hero = () => {
  const TopBar = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const openRef = useRef(open);

  const { t } = useTranslation();
  // const [query] = useLanguageQuery();

  const setOpacity = (value: number = -1) => {
    if (TopBar.current != null)
      if (value === -1) {
        TopBar.current.style.opacity = String(
          Math.min(window.scrollY / 100.0, 1)
        );
      } else {
        TopBar.current.style.opacity = String(value);
      }
  };

  useEffect(() => {
    if (open) {
      setOpacity(1);
    } else {
      setOpacity();
    }
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    setOpacity();
    window.addEventListener('scroll', () => {
      if (!openRef.current) {
        setOpacity();
      }
    });
  }, []);

  return (
    <>
      <div className="bg-white text-primary-500 fixed top-0 left-0 right-0 z-[9999] drop-shadow-md">
        <div
          ref={TopBar}
          className="bg-white absolute top-0 left-0 right-0 bottom-0"
          style={{ zIndex: -1 }}
        ></div>
        <div className="px-4 lg:px-16 py-2">
          <NavbarTwoColumns
            open={open}
            setOpen={(value: boolean) => setOpen(value)}
          ></NavbarTwoColumns>
        </div>
      </div>
      <div className="w-full flex-wrap items-center place-items-center overflow-hidden">
        <div className="w-full flex items-center max-h-screen h-screen overflow-hidden justify-center">
          <div className="bg-black bg-opacity-0 py-8 absolute text-textprimary-100 z-10 flex p-4 gap-8 2xl:gap-32 w-full 2xl:w-3/4 items-center flex-col lg:flex-row">
            <div className="text-4xl lg:text-6xl text-primary-500 w-full self-start text-center lg:text-right">
              <img
                src={`${router.basePath}/assets/images/pic_clip.png`}
                className="2xl:w-full max-h-[40vh] sm:max-h-[50vh] mt-16 lg:mt-0 lg:max-h-full inline-block self-center lg:self-start drop-shadow-lg"
              />
            </div>
            <div className="w-full">
              <div className="bg-white p-8 lg:p-14 rounded-[2rem] self-end drop-shadow-lg flex gap-2 lg:gap-4 flex-col items-center lg:items-start">
                <div className="text-2xl md:text-3xl lg:text-4xl font-title uppercase tracking-wide">
                  O seu passaporte para a língua inglesa
                </div>
                <div className="text-gray-600 text-base md:text-xl lg:text-2xl text-justify mb-4">
                  Tradutora, revisora e professora particular de Inglês. Mestre
                  em Língua Inglesa pela UFMG.
                </div>
                <Button>Conheça os meus serviços</Button>
              </div>
            </div>
          </div>
          <div className="flex overflow-hidden bg-bg_white-0">
            <img
              src={`${router.basePath}/assets/images/bg.svg`}
              className="max-w-none max-h-none min-h-screen opacity-20"
              style={{
                minWidth: '100vw',
                width: 'unset',
                height: 'unset',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { Hero };

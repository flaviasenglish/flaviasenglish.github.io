import React, { useEffect, useRef, useState } from 'react';

import { useTranslation } from 'next-export-i18n';
import { useRouter } from 'next/router';

import { Button } from '../button/Button';
import { scrollToDiv } from '../globals';
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
        <div className="w-full flex items-center max-h-screen h-full overflow-hidden justify-center">
          <div className="pt-[60px] pb-[120px] lg:pt-0 lg:pb-0 lg:max-h-[calc(100%-120px)] h-auto max-h-full px-4 lg:px-0 items-stretch bg-opacity-0 absolute text-textprimary-100 z-10 flex gap-1 lg:gap-16 2xl:gap-32 w-full lg:w-10/12 2xl:w-3/4 flex-col lg:flex-row">
            <div
              className="text-4xl lg:text-6xl text-primary-500 text-center lg:text-right w-full h-auto flex justify-center relative"
              style={{ aspectRatio: '1 / 1' }}
            >
              <div
                className="w-auto h-full bg-white over drop-shadow-lg absolute"
                style={{
                  aspectRatio: '2.1 / 3.4',
                  transform: 'scale(0.8) translateX(45%) rotate(2deg)',
                }}
              >
                <div className="w-full h-full p-[7.5%] pb-[18.2%] pt-[8.5%]">
                  <div
                    className="w-full h-full bg-no-repeat bg-center bg-cover"
                    style={{
                      backgroundImage: `url(${router.basePath}/assets/images/hero1.png)`,
                    }}
                  ></div>
                </div>
              </div>
              <div
                className="w-auto h-full bg-white over drop-shadow-lg absolute"
                style={{
                  aspectRatio: '2.1 / 3.4',
                  transform: 'scale(0.8) translateX(-35%) rotate(-10deg)',
                  zIndex: -1,
                }}
              >
                <div className="w-full h-full p-[7.5%] pb-[18.2%] pt-[8.5%]">
                  <div
                    className="w-full h-full bg-no-repeat bg-center bg-cover"
                    style={{
                      backgroundImage: `url(${router.basePath}/assets/images/hero2.png)`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="w-full self-center">
              <div className="bg-white p-6 2xl:p-14 rounded-[2rem] self-end drop-shadow-lg flex gap-2 lg:gap-4 flex-col items-center">
                <div className="text-lg md:text-3xl 2xl:text-4xl font-title uppercase tracking-wide text-center">
                  {t('hero.title')}
                </div>
                <div className="text-gray-600 text-base md:text-xl lg:text-2xl text-justify mb-2 lg:mb-4">
                  {t('hero.description')}
                </div>
                <Button onClick={() => scrollToDiv('services')}>
                  {t('hero.learn_more')}
                </Button>
              </div>
            </div>
          </div>
          <div
            onClick={() => scrollToDiv('aboutme')}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 drop-shadow-lg w-[60px] h-[60px] xl:w-[70px] xl:h-[70px] z-[1] cursor-pointer bg-bg_blue-0 flex items-center justify-center rounded-full select-none"
          >
            <span
              className="material-icons-round text-center !text-4xl xl:!text-4xl text-white"
              style={{ WebkitTextStroke: '2px' }}
            >
              south
            </span>
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
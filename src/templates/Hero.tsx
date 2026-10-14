import { type CSSProperties, useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { Button } from '../button/Button';
import { scrollToDiv } from '../globals';
import { NavbarTwoColumns } from '../navigation/NavbarTwoColumns';

const Hero = () => {
  const TopBar = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const openRef = useRef(open);

  const { t } = useTranslation();

  const setOpacity = (value: number = -1) => {
    if (TopBar.current != null)
      if (value === -1) {
        TopBar.current.style.opacity = String(
          Math.min(window.scrollY / 100.0, 1),
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
    const onScroll = () => {
      if (!openRef.current) {
        setOpacity();
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div className="text-primary-500 fixed top-0 right-0 left-0 z-[9999] bg-white drop-shadow-md">
        <div
          ref={TopBar}
          className="absolute top-0 right-0 bottom-0 left-0 bg-white"
          style={{ zIndex: -1 }}
        ></div>
        <div className="px-4 py-2 lg:px-16">
          <NavbarTwoColumns
            open={open}
            setOpen={(value: boolean) => setOpen(value)}
          ></NavbarTwoColumns>
        </div>
      </div>
      <div className="w-full flex-wrap place-items-center items-center overflow-hidden">
        <div className="flex h-full max-h-screen w-full items-center justify-center overflow-hidden">
          <div className="text-textprimary-100 absolute z-10 flex h-auto max-h-full w-full flex-col items-stretch gap-1 px-4 pt-[60px] pb-[120px] lg:max-h-[calc(100%-120px)] lg:w-10/12 lg:flex-row lg:gap-16 lg:px-0 lg:pt-0 lg:pb-0 2xl:w-3/4 2xl:gap-32">
            <div
              className="text-primary-500 relative flex h-auto w-full justify-center text-center text-4xl lg:text-right lg:text-6xl"
              style={{ aspectRatio: '1 / 1' }}
            >
              <div
                className="over absolute h-full w-auto animate-deal-card bg-white drop-shadow-lg"
                style={
                  {
                    aspectRatio: '2.1 / 3.4',
                    '--rest': 'scale(0.8) translateX(45%) rotate(2deg)',
                    animationDelay: '300ms',
                  } as CSSProperties
                }
              >
                <div className="h-full w-full p-[7.5%] pt-[8.5%] pb-[18.2%]">
                  <div
                    className="h-full w-full bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${import.meta.env.BASE_URL}assets/images/hero1.png)`,
                    }}
                  ></div>
                </div>
              </div>
              <div
                className="over absolute h-full w-auto animate-deal-card bg-white drop-shadow-lg"
                style={
                  {
                    aspectRatio: '2.1 / 3.4',
                    '--rest': 'scale(0.8) translateX(-35%) rotate(-10deg)',
                    animationDelay: '150ms',
                    zIndex: -1,
                  } as CSSProperties
                }
              >
                <div className="h-full w-full p-[7.5%] pt-[8.5%] pb-[18.2%]">
                  <div
                    className="h-full w-full bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${import.meta.env.BASE_URL}assets/images/hero2.png)`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="w-full self-center">
              <div className="flex flex-col items-center gap-2 self-end rounded-[2rem] bg-white p-6 drop-shadow-lg lg:gap-4 2xl:p-14">
                <div className="text-center font-title text-lg tracking-wide uppercase md:text-3xl 2xl:text-4xl">
                  {t('hero.title')}
                </div>
                <div className="mb-2 text-justify text-base text-gray-600 md:text-xl lg:mb-4 lg:text-2xl">
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
            className="absolute bottom-4 left-1/2 z-[1] flex h-[60px] w-[60px] -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-bg_blue-0 drop-shadow-lg select-none xl:h-[70px] xl:w-[70px]"
          >
            <span
              className="material-icons-round text-center text-4xl! text-white xl:text-4xl!"
              style={{ WebkitTextStroke: '2px' }}
            >
              south
            </span>
          </div>
          <div className="flex overflow-hidden bg-bg_white-0">
            <img
              src={`${import.meta.env.BASE_URL}assets/images/bg.svg`}
              className="max-h-none min-h-screen max-w-none opacity-20"
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

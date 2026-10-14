import { Section } from '../layout/Section';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-bg_blue-0">
      <div className="z-10">
        <Section>
          <div className="flex justify-center text-center text-lg text-white">
            <img
              src={`${import.meta.env.BASE_URL}assets/images/logo_bottom.png`}
              alt="Flávia Forcatho English Solutions"
              loading="lazy"
              className="h-42 md:h-64"
            />
          </div>
        </Section>
      </div>
      <img
        src={`${import.meta.env.BASE_URL}assets/images/bg.svg`}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute top-0 max-h-none min-h-screen max-w-none overflow-hidden opacity-20"
        style={{
          minWidth: '100vw',
          width: 'unset',
          height: 'unset',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />
    </footer>
  );
};

export { Footer };

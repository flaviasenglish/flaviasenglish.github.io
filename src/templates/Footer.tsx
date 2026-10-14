import { Background } from '../background/Background';
import { Section } from '../layout/Section';

const Footer = () => {
  return (
    <Background color="bg-bg_blue-0 relative overflow-hidden">
      <div className="z-10">
        <Section>
          <div className="flex justify-center text-center text-lg text-white">
            <img
              src={`${import.meta.env.BASE_URL}assets/images/logo_bottom.png`}
              className="h-42 md:h-64"
            />
          </div>
        </Section>
      </div>
      <img
        src={`${import.meta.env.BASE_URL}assets/images/bg.svg`}
        className="absolute top-0 max-h-none min-h-screen max-w-none overflow-hidden opacity-20"
        style={{
          minWidth: '100vw',
          width: 'unset',
          height: 'unset',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />
    </Background>
  );
};

export { Footer };

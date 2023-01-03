import { ReactNode } from 'react';

type ISectionProps = {
  title?: string | ReactNode;
  description?: string | ReactNode;
  yPadding?: string;
  children: ReactNode;
  id?: string;
  className?: string;
};

const Section = (props: ISectionProps) => (
  <div
    id={props.id}
    className={`max-w-screen-xl md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto px-4 md:px-16 ${
      props.yPadding ? props.yPadding : 'py-10'
    } ${props.className}`}
  >
    {(props.title || props.description) && (
      <div className="mb-8 text-center">
        {props.title && (
          <h2 className="text-4xl text-textprimary-100 font-title uppercase tracking-widest">
            {props.title}
          </h2>
        )}
        {props.description && (
          <div className="mt-4 text-xl md:px-20">{props.description}</div>
        )}
      </div>
    )}
    {props.children}
  </div>
);

export { Section };

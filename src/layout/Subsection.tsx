import { ReactNode } from 'react';

type ISubsectionProps = {
  title?: string;
  description?: string | ReactNode;
  yPadding?: string;
  children: ReactNode;
  id?: string;
  className?: string;
};

const Subsection = (props: ISubsectionProps) => (
  <div
    id={props.id}
    className={`max-w-screen-xl md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto ${
      props.yPadding ? props.yPadding : 'py-10'
    } ${props.className}`}
  >
    {(props.title || props.description) && (
      <div className="mb-10 text-center">
        {props.title && (
          <h2 className="text-3xl text-textprimary-100 font-bold font-title uppercase tracking-widest">
            {props.title}
          </h2>
        )}
        {props.description && (
          <div className="mt-2 text-2xl md:px-0">{props.description}</div>
        )}
      </div>
    )}
    {props.children}
  </div>
);

export { Subsection };

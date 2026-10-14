import type { ReactNode } from 'react';

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
    className={`mx-auto max-w-(--breakpoint-xl) px-4 md:max-w-(--breakpoint-md) md:px-16 lg:max-w-(--breakpoint-lg) xl:max-w-(--breakpoint-xl) ${
      props.yPadding ? props.yPadding : 'py-10'
    } ${props.className}`}
  >
    {(props.title || props.description) && (
      <div className="mb-8 text-center">
        {props.title && (
          <h2 className="text-textprimary-100 font-title text-4xl tracking-widest uppercase">
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

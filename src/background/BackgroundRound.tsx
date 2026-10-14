import type { ReactNode } from 'react';

type IBackgroundProps = {
  children: ReactNode;
  color: string;
  title?: string;
  inverted?: boolean;
  id?: string;
};

const BackgroundRound = (props: IBackgroundProps) => (
  <div
    id={props.id}
    className={`${
      props.color
    } mt-10 mr-4 mb-10 rounded-r-[2rem] p-8 shadow-md md:mr-16 md:rounded-r-[4rem] md:p-8 md:pr-16 md:pl-32 2xl:mr-32 2xl:p-16 2xl:pr-32 2xl:pl-64 ${
      props.inverted
        ? 'mr-0! ml-4 rounded-l-[2rem] rounded-r-none! md:rounded-l-[4rem] 2xl:ml-32 2xl:pr-64 2xl:pl-32'
        : ''
    }`}
  >
    {props.title && (
      <div className="mb-4 font-title font-bold">{props.title}</div>
    )}

    {props.children}
  </div>
);

export { BackgroundRound };

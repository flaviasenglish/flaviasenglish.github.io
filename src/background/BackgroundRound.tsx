import { ReactNode } from 'react';

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
    } rounded-r-[2rem] md:rounded-r-[4rem] mr-4 md:mr-16 2xl:mr-32 mt-10 mb-10 p-8 md:p-8 2xl:p-16 md:pl-32 2xl:pl-64 md:pr-16 2xl:pr-32 shadow-md ${
      props.inverted
        ? 'ml-4 2xl:ml-32 !mr-0 !2xl:mr-0 2xl:pl-32 2xl:pr-64 rounded-l-[2rem] md:rounded-l-[4rem] !rounded-r-none'
        : ''
    }`}
  >
    {props.title && (
      <div className="font-title font-bold mb-4">{props.title}</div>
    )}

    {props.children}
  </div>
);

export { BackgroundRound };

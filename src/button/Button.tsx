import { MouseEventHandler } from 'react';

import className from 'classnames';

type IButtonProps = {
  xl?: boolean;
  fullWidth?: boolean;
  children: string;
  onClick?: MouseEventHandler;
  secondary?: boolean;
};

const Button = (props: IButtonProps) => {
  const btnClass = className({
    btn: true,
    'btn-xl': props.xl,
    'btn-base': !props.xl,
    'btn-primary': true,
    'btn-secondary': props.secondary,
    'btn-fullwidth': !!props.fullWidth,
  });

  return (
    <div className={btnClass} onClick={props.onClick}>
      <div>{props.children}</div>

      <style jsx>
        {`
          .btn {
            @apply inline-flex font-title font-bold tracking-wider text-center cursor-pointer select-none w-full md:w-max place-items-center justify-center uppercase rounded-full md:min-w-[180px] max-w-full;
          }

          .btn-base {
            @apply text-base md:text-lg py-3 px-6;
          }

          .btn-xl {
            @apply text-base lg:text-lg py-4 px-8;
          }

          .btn-primary {
            @apply text-white bg-bg_blue-0;
          }

          .btn-primary:hover {
            @apply bg-[#5a72b9];
          }

          .btn-fullwidth {
            @apply w-full;
          }
        `}
      </style>
    </div>
  );
};

export { Button };

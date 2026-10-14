import type { MouseEventHandler } from 'react';

import clsx from 'clsx';

type IButtonProps = {
  xl?: boolean;
  fullWidth?: boolean;
  children: string;
  onClick?: MouseEventHandler;
  secondary?: boolean;
};

const Button = (props: IButtonProps) => {
  const btnClass = clsx({
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
    </div>
  );
};

export { Button };

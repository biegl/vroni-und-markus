import { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full text-gray-700 antialiased">
    {props.meta}

    <div>
      <div className="text-xl">{props.children}</div>

      <div className="py-3 text-center text-sm">
        Vroni{' '}
        <span role="img" aria-label="Love">
          ♥
        </span>{' '}
        Markus
      </div>
    </div>
  </div>
);

export { Main };

import { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full antialiased text-gray-700">
    {props.meta}

    <div>
      <div className="py-5 text-xl content">{props.children}</div>

      <div className="pb-3 text-sm text-center">
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

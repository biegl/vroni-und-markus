import { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full text-gray-700 antialiased">
    {props.meta}

    <div>
      <div className="content py-5 text-xl">{props.children}</div>

      <div className="text-center text-sm pb-3">
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

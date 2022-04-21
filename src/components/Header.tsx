import Polaroid from './Polaroid';

const Header = () => {
  return (
    <>
      <header className="my-5">
        <div className="hidden md:block">
          <Polaroid
            src="/assets/images/header01.jpg"
            caption={'Vroni&Markus'}
            className="w-1/3"
          />
          <Polaroid
            src="/assets/images/header02.jpg"
            caption={'♥'}
            className="w-1/3"
          />
          <Polaroid
            src="/assets/images/header03.jpg"
            caption={'24.09.2022'}
            className="w-1/3"
          />
        </div>
        <div className="md:hidden">
          <Polaroid
            src="/assets/images/header01.jpg"
            caption={'Vroni&Markus <br> 24.09.2022'}
          />
        </div>
        <h1 className="highlight-header p-4 pt-0 text-center">
          Zomm&apos; is anfoch schiana
        </h1>
      </header>
    </>
  );
};

export default Header;

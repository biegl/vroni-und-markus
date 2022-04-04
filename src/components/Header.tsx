import Polaroid from './Polaroid';

const Header = () => {
  return (
    <>
      <div>
        <Polaroid
          src="/public/assets/images/header01.jpg"
          caption={'Vroni&Markus'}
        />
        <Polaroid src="/public/assets/images/header02.jpg" caption={'♥'} />
        <Polaroid
          src="/public/assets/images/header03.jpg"
          caption={'24.09.2022'}
        />
      </div>
      <h1 className="pb-5 text-center highlight-header">
        Zomm&apos; is anfoch schiana
      </h1>
    </>
  );
};

export default Header;

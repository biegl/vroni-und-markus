import header01 from '../../public/assets/images/header01.jpg';
import header02 from '../../public/assets/images/header02.jpg';
import header03 from '../../public/assets/images/header03.jpg';
import Polaroid from './Polaroid';

const Header = () => {
  return (
    <>
      <div>
        <Polaroid src={header01} caption={'Vroni&Markus'} />
        <Polaroid src={header02} caption={'♥'} />
        <Polaroid src={header03} caption={'24.09.2022'} />
      </div>
      <h1 className="highlight-header pb-5 text-center">
        Zomm&apos; is anfoch schiana
      </h1>
    </>
  );
};

export default Header;

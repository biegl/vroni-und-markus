import Image from 'next/image';

type IPolaroidProps = {
  src: StaticImageData;
  caption?: string;
};

const myLoader = ({ src }: any) => {
  return `/${src}`;
};

const Polaroid = (props: IPolaroidProps) => {
  return (
    <div className="item">
      <div className="polaroid">
        <Image src={props.src} loader={myLoader} alt="Polaroid" />
        <div className="caption">{props.caption}</div>
      </div>
    </div>
  );
};

export default Polaroid;

import Image from 'next/image';

type IPolaroidProps = {
  src: StaticImageData;
  caption?: string;
};

const Polaroid = (props: IPolaroidProps) => {
  return (
    <div className="item">
      <div className="polaroid">
        <Image src={props.src} />
        <div className="caption">{props.caption}</div>
      </div>
    </div>
  );
};

export default Polaroid;

type IPolaroidProps = {
  src: string;
  caption?: string;
};

const Polaroid = (props: IPolaroidProps) => {
  return (
    <div className="item">
      <div className="polaroid">
        <img src={props.src} alt="Polaroid" />
        <div className="caption">{props.caption}</div>
      </div>
    </div>
  );
};

export default Polaroid;

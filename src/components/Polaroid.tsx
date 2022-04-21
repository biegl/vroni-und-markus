type IPolaroidProps = {
  src: string;
  caption?: string;
  className?: string;
};

const Polaroid = (props: IPolaroidProps) => {
  const classNames = ['item', props.className]
    .map((el) => (el ? el.trim() : el))
    .join(' ');
  return (
    <div className={classNames}>
      <div className="polaroid">
        <img src={props.src} alt="Polaroid" />
        <div
          className="caption pt-4"
          dangerouslySetInnerHTML={{ __html: props.caption || '' }}
        />
      </div>
    </div>
  );
};

export default Polaroid;

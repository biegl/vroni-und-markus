import { useState, useEffect } from 'react';

import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';

const ImagesGallery = (props: any) => {
  const [images, setImages] = useState(null);
  useEffect(() => {
    setImages(
      props.photos.map((url: string) => ({
        original: `${url}=w1024`,
        thumbnail: `${url}=w100`,
      }))
    );
  }, [props.photos]);

  return images ? (
    <ImageGallery
      items={images}
      lazyLoad={true}
      showNav={true}
      showThumbnails={true}
      showPlayButton={true}
      autoPlay={true}
    />
  ) : null;
};
export default ImagesGallery;

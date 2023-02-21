import ProgressiveImage from 'react-progressive-graceful-image';
import { LodingShimmer } from './LodingShimmer';

interface ImageComponentProps {
  src: string;
}

export const ImageComponent = ({ src }: ImageComponentProps) => {
  return (
    <ProgressiveImage
      src={src}
      srcSetData={{
        srcSet: `${src} 320w, ${src} 700w, ${src} 2000w`,
        sizes: '(max-width: 2000px) 100vw, 2000px',
      }}
      placeholder={<LodingShimmer />}
    >
      {(src, loading, srcSetData) => (
        <img
          src={src}
          srcSet={srcSetData?.srcSet}
          sizes={srcSetData?.sizes}
          alt="an image"
          style={{ opacity: loading ? 0.5 : 1 }}
          height={'200px'}
          width={'200px'}
        />
      )}
    </ProgressiveImage>
  );
};

import { useEffect, useState } from 'react';
import LandScape from '../assets/landscape.svg';

interface GoodImageProps {
  height?: string | number;
  width?: string | number;
  placeholderSrc?: string;
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;
}

export const GoodImage = ({
  height = 100,
  width = 100,
  placeholderSrc,
  ...props
}: GoodImageProps) => {
  const [imgSrc, setImgSrc] = useState(
    placeholderSrc || props.props.src || LandScape
  );
  // const [loading,setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const img = new Image();
    img.src = props.props.src as string;

    img.onload = () => {
      if (isMounted) {
        timeoutId = setTimeout(() => {
          setImgSrc(props.props.src as string);
        }, 2000);
      }
    };
    return () => {
      isMounted = false;
      // setLoading(false);
      clearTimeout(timeoutId);
    };
  }, [props.props.src]);

  return (
    <img
      style={{}}
      {...{
        src: imgSrc,
        height,
        width,
        loading: 'lazy',
        className:
          'h-full w-full  aspect-video animate-in fade-in duration-500',
        ...props,
      }}
    />
  );
};

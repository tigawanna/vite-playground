import { ImageGrid } from './ImageGrid';

interface ListingsProps {}

export const Listings = ({}: ListingsProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <ImageGrid />
    </div>
  );
};

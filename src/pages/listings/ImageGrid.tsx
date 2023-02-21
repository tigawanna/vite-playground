import { useQuery } from '@tanstack/react-query';
import { getPbListings } from '../../utils/api/listings';
import { TheIcon } from '@denniskinuthia/tiny-pkgs';
import { Link } from 'react-router-dom';
import { makeImageUrl } from '../../utils/api/pocketbase';
import { FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { GoodImage } from '../../shared/GoodImage';
interface ImageGridProps {}

export const ImageGrid = ({}: ImageGridProps) => {
  const query = useQuery(['listings'], () => getPbListings(''));

  const data = query.data;
  return (
    <div className="w-full h-full flex items-center justify-center ">
      <div className="w-[90%] h-full p-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-2 lg:gap-4 ">
        {data &&
          data?.items.map((land) => {
            const img_url = makeImageUrl(
              'listings',
              land.id,
              land.images[0] as string
            );
            return (
              <Link
                to={`/listings/${land.id}`}
                key={land.id}
                className=" w-full  flex flex-col items-start 
                shadow-lg border hover:shadow-lg  hover:shadow-slate-300 rounded-2xl "
              >
                <div className=" h-full w-full flex items-center justify-center ">
                  <GoodImage
                    props={{
                      src: img_url as string,
                      alt: land?.location,
                    }}
                    placeholderSrc={
                      img_url ? img_url + '?thumb=100x50' : undefined
                    }
                    height={'200px'}
                    width={'300px'}
                  />
                </div>

                <div className="font-serif p-3">
                  <h1 className="text-2xl font-bold">{land.location}</h1>
                  <p className="text-sm line-clamp-3">{land.description}</p>
                  <p className="text-sm">Owner: {land.owner}</p>
                  <p className="text-sm">{land.status}</p>
                  <p className="text-sm">{land.amenities?.type}</p>
                  <div className="border-t p-1 m-1">
                    <p className="text-sm flex font-semibold">
                      Owner: {land.expand.owner.name}
                    </p>
                    <p className="text-sm flex gap-1">
                      <TheIcon Icon={FaPhone} />
                      {land.expand.owner.phone}
                    </p>
                    <p className="text-sm flex gap-1">
                      <TheIcon Icon={FaWhatsapp} />
                      {land.expand.owner.whatsapp}
                    </p>
                    <p className="text-sm flex gap-1">
                      <TheIcon Icon={FaEnvelope} />
                      {land.expand.owner.email}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

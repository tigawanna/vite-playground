import { getPbListings } from '../../utils/api/listings';
// import ReactLeafletMapCard from "../../components/location/ReactLeafletMapCard";
import { FaWhatsapp, FaEnvelope, FaPhone } from 'react-icons/fa/index.js';
import { makeImageUrl } from '../../utils/api/pocketbase';
import { GrNext, GrPrevious } from 'react-icons/gr/index.js';

import { useEffect, useState } from 'react';
import { QueryStateWrapper, TheIcon } from '@denniskinuthia/tiny-pkgs';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { GoodImage } from './../../shared/GoodImage';
type ListingParams = { id: string };

interface ListingPageProps {}

const OneListingPage = function OneListingPage({}: ListingPageProps) {
  const params = useParams<ListingParams>();

  const query = useQuery(['listings', params.id], () =>
    getPbListings(params.id)
  );
  // console.log("product data ===> ",data)
  const [image, setImage] = useState({
    img: query?.data?.items[0]?.images[0] as string,
    idx: 0,
  });
  console.log('image ===> ', image);

  // if(!data){
  //     return <div>Loading...</div>
  // }
  const land = query?.data?.items[0];
  const land_length = land?.images.length ?? 5;

  useEffect(() => {
    setImage({ img: land?.images[0] as string, idx: 0 });
  }, [land?.images[0]]);

  const img_url = makeImageUrl(
    'listings',
    land?.id as string,
    image.img as string
  );
  return (
    <main className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <QueryStateWrapper query={query}>
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <div
            key={land?.id}
            className="w-[90%]  flex flex-col md:flex-row  items-center justify-center rounded-2xl  m-2"
          >
            <div className=" w-[90%] md:w-[50%] h-[50%] flex items-center justify-center gap-2 ">
              {image.idx !== 0 ? (
                <TheIcon
                  Icon={GrPrevious}
                  iconAction={() => {
                    setImage((prev) => {
                      if (prev.idx > 0) {
                        return {
                          img: query?.data?.items[0].images[
                            prev.idx - 1
                          ] as string,
                          idx: prev.idx - 1,
                        };
                      }
                      return prev;
                    });
                  }}
                />
              ) : null}
              <div className="w-[90%]">
                <GoodImage
                  props={{
                    className: 'w-[60%]',
                    src: img_url as string,
                    alt: land?.location,
                  }}
                  placeholderSrc={
                    img_url ? img_url + '?thumb=100x50' : undefined
                  }
                  height={'300px'}
                  width={'600px'}
                />
              </div>

              {image.idx !== land_length - 1 ? (
                <TheIcon
                  Icon={GrNext}
                  iconstyle="relative"
                  iconAction={() => {
                    setImage((prev) => {
                      if (prev.idx < (land?.images?.length ?? 0) - 1) {
                        return {
                          img: land?.images[prev.idx + 1] as string,
                          idx: prev.idx + 1,
                        };
                      }
                      return prev;
                    });
                  }}
                />
              ) : null}
            </div>

            <div className="font-serif p-5 w-[90%] md:w-[40%]">
              <h1 className="text-2xl font-bold">{land?.location}</h1>
              <p className="text-sm">{land?.description}</p>
              <div className="border-t ">
                <p className="text-sm font-semibold">
                  Owner: {land?.expand.owner.name}
                </p>
                <p className="text-sm flex gap-1">
                  <TheIcon Icon={FaPhone} />
                  {land?.expand.owner.phone}
                </p>
                <p className="text-sm flex gap-1">
                  <TheIcon Icon={FaWhatsapp} />
                  {land?.expand.owner.whatsapp}
                </p>
                <p className="text-sm flex gap-1">
                  <TheIcon Icon={FaEnvelope} />
                  {land?.expand.owner.email}
                </p>
              </div>
            </div>
          </div>

          {/* <div className="w-full">
             
                    <div className="w-[90%] p-5 flex flex-row  items-center justify-center">
                        <ClientSuspense fallback="loading" >
                        <ReactLeafletMapCard
                            display={false} coords={{ lat: land.longitude, lng: land.longitude }}
                        />
                        </ClientSuspense>
                    </div>
                </div> */}
        </div>
      </QueryStateWrapper>
    </main>
  );
};

export default OneListingPage;

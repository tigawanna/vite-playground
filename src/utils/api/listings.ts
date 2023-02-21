import { base_url, pb } from './pocketbase';

export interface LandListingProps {
  id: number;
  location: string;
  latitude: number;
  longitude: number;
  description: string;
  owner: string;
  phonw: string;
  email: string;
  extra_details: string;
  image: string;
}

type DistanceTofaclities =
  | 'less than 20 minutes away'
  | '20 to 40 minutes away'
  | 'more than 40 minutes away';

export interface ListingsOwner {
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  id: string;
  image: string;
  location: string;
  name: string;
  phone: string;
  updated: string;
  whatsapp: string;
}
export interface ListingAmenities {
  type?: 'land' | 'house' | 'apartment';
  size?: string;

  // land psecific
  water_source?: 'piped' | 'borehole' | 'other';
  elecricity_source?: 'utility pole' | 'generator' | 'other';

  closest_school?: DistanceTofaclities;
  closest_hospital?: DistanceTofaclities;
  closest_police_station?: DistanceTofaclities;
  closest_town?: DistanceTofaclities;

  //  house or appartment specific
  gated_community?: boolean;
  pavements?: boolean;
  street_lights?: boolean;
  parking?: boolean;

  bedrooms?: number;
  bathrooms?: number;
  garages?: number;
  fireplace?: number;
  swimming_pool?: number;
}

export interface PBListings {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  location: string;
  longitude: number;
  latitude: number;
  description: string;
  status: 'available' | 'sold';
  images: (string | File | null)[];
  amenities: ListingAmenities | null;
  owner?: string;
  expand: { owner: ListingsOwner };
}

export interface RootPBListings {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: PBListings[];
}

export const getListsings = async () => {
  try {
    // const response =  await fetch('https://my.api.mockaroo.com/land_listings.json?key=30509c40',{
    //     method:'GET',
    // })
    // return await response.json() as LandListingProps[];
    return await pb.collection('listings').getList<PBListings>(1, 50, {
      // filter: 'created >= "2022-01-01 00:00:00" && someField1 != someField2',
    });
  } catch (err) {
    console.log(err);
  }
};

export const getOneListing = async (id: number) => {
  try {
    const response = await fetch(
      'https://my.api.mockaroo.com/land_listings.json?key=30509c40',
      {
        method: 'GET',
      }
    );
    const lands = (await response.json()) as LandListingProps[];

    return lands && lands.filter((land) => land.id === id)[0];
  } catch (err) {
    console.log(err);
  }
};

export const getPbListings = async (id?: string) => {
  const pb_url = new URL(base_url + '/api/collections/listings/records');
  // pb_url.searchParams.set(filter=(id='abc' && created>'2022-01-01'))
  // const p_url=base_url+'/api/collections/listings/records'
  pb_url.searchParams.set('expand', 'owner');
  pb_url.searchParams.set('sort', '-created');
  if (id) {
    pb_url.searchParams.set('filter', `id="${id}"`);
  }

  const p_url = pb_url.toString();
  // console.log("pb_url  ==== ",p_url)
  try {
    const response = await fetch(p_url, {
      method: 'GET',
    });
    const lands = (await response.json()) as RootPBListings;
    // console.log("lands pb listing response",lands)
    // console.log("pb_url  ==== ",p_url)
    return lands;
  } catch (err) {
    console.log('pb listing fetch error  ', err);
  }
};

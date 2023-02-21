import { pb } from './pocketbase';

export interface OwnwerSearchResponse {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  items: OwnerResponse[];
}

export interface OwnerResponse {
  id: string;
  collectionId: string;
  collectionName: string;
  label: string;
  option: string;
  created: string;
  updated: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  image: string;
  whatsapp: string;
}

export interface AllOwnersResponse {
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

  value: string;
  label: string;

  expand: {};
}

export async function getOwner(keyword: string) {
  try {
    // you can also fetch all records at once via getFullList
    const records = await pb
      .collection('owner')
      .getFullList<AllOwnersResponse>(10 /* batch size */, {
        sort: '-created',
        filter: `name~"${keyword}"`,
      });

    // const record = await pb.collection('owner').getFirstListItem(`name~"${keyword}"`, { })
    // console.log("records ===== ", records)
    // if(records.code === 400){
    //     throw new Error("failed to search for owner",record.message)
    // }

    return records.map((record: AllOwnersResponse) => {
      record['value'] = record.id;
      record['label'] = record.name;
      return record;
    });
  } catch (error: any) {
    console.log('error', error);
    throw new Error(error);
  }
}

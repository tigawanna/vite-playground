import PocketBase from 'pocketbase';

const remote_pb = 'https://tigawanna-pocketbase.fly.dev';
const local_pb = 'http://127.0.0.1:8090';
const pb_agr_lan = 'http://192.168.0.109:8090';
export const base_url = pb_agr_lan;

// console.log("base_url  ==== ",base_url)
export const pb = new PocketBase(base_url);

// pb.afterSend = function (response, data) {
//     console.log('afterSend', response, data);
//     return Object.assign(data, {
//         // extend or modify the data after each request and before resolving the Promise data...
//         // "label": data?.name??"no name value here",
//         // "value": data.id,
//         // data.item
//     });
// };
export const makeImageUrl = (
  coll_name: string,
  record_id: string,
  media_name: string
) => {
  if (media_name) {
    return `${base_url}/api/files/${coll_name}/${record_id}/${media_name}`;
  }
  return;
};

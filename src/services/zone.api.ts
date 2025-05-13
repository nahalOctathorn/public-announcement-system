import { apiRequest } from "@/utils/fetcher";
import {
    ListParams,
    PaginatedResponse,
    ListParamsWithId,
} from "@/@types/api.type";
import {
    Zone,
} from "@/@types/zone.type";
import { Id, MessageResponse } from "@/@types/general.type";

const Zones_API_PATH = "/zones";

// export const createDevice = (creatorId: number, data: DeviceData) =>
//   apiRequest<Device>(`${Zones_API_PATH}/${creatorId}`, "POST", data);

// export const updateDevice = (params: Id) => (data: DeviceData) =>
//   apiRequest<MessageResponse>(
//     `${Zones_API_PATH}/${params.id}`,
//     "PATCH",
//     data
//   );

export const fetchZones = (
    params: ListParams,
) => {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());

    if (params.limit) queryParams.append("limit", params.limit.toString());

    if (
        params.filters &&
        typeof params.filters === "object" &&
        Object.keys(params.filters).length > 0
    ) {
        Object.entries(params.filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                queryParams.append(key, value.toString());
            }
        });
    }

    let apiPath = `${Zones_API_PATH}`;

    console.log("apiPath", apiPath);
    console.log("queryParams", queryParams.toString());
    console.log(params)

    return apiRequest<PaginatedResponse<Zone>>(
        `${apiPath}?${queryParams.toString()}`,
        "GET"
    );
};

export const fetchZone = (params: ListParamsWithId) =>
    apiRequest<Zone>(`${Zones_API_PATH}/${params.id}`, "GET");


// export const deleteDevice = (id: number) =>
//   apiRequest<void>(`${Zones_API_PATH}/${id}`, "DELETE");

// export const fetchDeviceDetails = (params: ListParamsWithId) => {
//   const queryParams = new URLSearchParams();

//   if (params.page) queryParams.append("page", params.page.toString());

//   if (params.limit) queryParams.append("limit", params.limit.toString());

//   if (
//     params.filters &&
//     typeof params.filters === "object" &&
//     Object.keys(params.filters).length > 0
//   ) {
//     Object.entries(params.filters).forEach(([key, value]) => {
//       if (value !== undefined && value !== null && value !== "") {
//         queryParams.append(key, value.toString());
//       }
//     });
//   }

//   let apiPath = "";

//   if (params.id === -1) {
//     apiPath = `${Zones_API_PATH}/device_details`;
//   } else apiPath = `${Zones_API_PATH}/${params.id}/device_details`;

//   return apiRequest<PaginatedResponse<DeviceDetailData>>(
//     `${apiPath}?${queryParams.toString()}`,
//     "GET"
//   );
// };

// export const deleteDeviceDetail = (id: number) => (deviceDetailId: number) =>
//   apiRequest<void>(
//     `${Zones_API_PATH}/${id}/device_details/${deviceDetailId}`,
//     "DELETE"
//   );

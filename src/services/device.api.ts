import { apiRequest } from "@/utils/fetcher";
import {
    ListParams,
    PaginatedResponse,
    ListParamsWithId,
} from "@/@types/api.type";
import {
    Device,
} from "@/@types/device.type";
import { Id, MessageResponse } from "@/@types/general.type";

const DEVICES_API_PATH = "/devices";

// export const createDevice = (creatorId: number, data: DeviceData) =>
//   apiRequest<Device>(`${DEVICES_API_PATH}/${creatorId}`, "POST", data);

// export const updateDevice = (params: Id) => (data: DeviceData) =>
//   apiRequest<MessageResponse>(
//     `${DEVICES_API_PATH}/${params.id}`,
//     "PATCH",
//     data
//   );

export const fetchDevices = (
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

    let apiPath = `${DEVICES_API_PATH}`;

    console.log("apiPath", apiPath);
    console.log("queryParams", queryParams.toString());
    console.log(params)

    return apiRequest<PaginatedResponse<Device>>(
        `${apiPath}?${queryParams.toString()}`,
        "GET"
    );
};

export const fetchDevice = (params: ListParamsWithId) =>
  apiRequest<Device>(`${DEVICES_API_PATH}/${params.id}`, "GET");

// export const deleteDevice = (id: number) =>
//   apiRequest<void>(`${DEVICES_API_PATH}/${id}`, "DELETE");

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
//     apiPath = `${DEVICES_API_PATH}/device_details`;
//   } else apiPath = `${DEVICES_API_PATH}/${params.id}/device_details`;

//   return apiRequest<PaginatedResponse<DeviceDetailData>>(
//     `${apiPath}?${queryParams.toString()}`,
//     "GET"
//   );
// };

// export const deleteDeviceDetail = (id: number) => (deviceDetailId: number) =>
//   apiRequest<void>(
//     `${DEVICES_API_PATH}/${id}/device_details/${deviceDetailId}`,
//     "DELETE"
//   );

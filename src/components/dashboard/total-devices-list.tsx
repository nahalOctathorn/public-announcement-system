import DeviceListCard from "./list-card";
export default function TotalDevicesList() {
    const devices = [
        {
            name: "iPhone 14 Pro",
            status: "Alpha 3",
            activeStatus: "Active",
        },
        {
            name: "MacBook Air",
            status: "Alpha 3",
            activeStatus: "Inactive",
        },
        {
            name: "Samsung Galaxy S22",
            status: "Alpha 3",
            activeStatus: "Inactive",
        },
        {
            name: "iPad Mini",
            status: "Alpha 3",
            activeStatus: "Error",
        },
        {
            name: "Apple Watch",
            status: "Alpha 3",
            activeStatus: "Error",
        },
    ];

    return <DeviceListCard Devices={devices}/>
}

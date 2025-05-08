import alphaLogo from "@/assets/alpha-logo 1.png"
import DeviceListCard from "./list-card";
export default function TotalAlpha() {
    const devices = [
        {
            name: "iPhone 14 Pro",
            status: "Alpha 3",
            activeStatus: "Active",
            image: alphaLogo,
        },
        {
            name: "MacBook Air",
            status: "Alpha 3",
            activeStatus: "Inactive",
            image: alphaLogo,
        },
        {
            name: "Samsung Galaxy S22",
            status: "Alpha 3",
            activeStatus: "Inactive",
            image: alphaLogo,
        },
        {
            name: "iPad Mini",
            status: "Alpha 3",
            activeStatus: "Error",
            image: alphaLogo,
        },
        {
            name: "Apple Watch",
            status: "Alpha 3",
            activeStatus: "Error",
        },
    ];

    return <DeviceListCard Devices={devices}/>
}

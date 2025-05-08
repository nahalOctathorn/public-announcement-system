import PrayerScheduleCard from "@/components/dashboard/prayer-schedule-card";
import AnnouncementCard from "@/components/dashboard/recent-announcements";
import SOSAlertsCard from "@/components/dashboard/sos-alert-card";
import TotalAlpha from "@/components/dashboard/total-alphas";
import TotalDevicesList from "@/components/dashboard/total-devices-list";
import CreateAnnouncement from "@/components/dashboard/app-create-announcement";
import React from "react";
export default function Dashboard() {
  return (
    <div className="w-full justify-center items-center flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 gap-4">
      <div className="lg:w-[70%] w-full flex flex-col space-y-4">
        <React.Fragment >
          <CreateAnnouncement />
        </React.Fragment>
        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
          <div className="flex flex-col lg:w-[45%] w-full space-y-4">
          <React.Fragment >
          <SOSAlertsCard />
            </React.Fragment>
            <React.Fragment >
              <PrayerScheduleCard />
            </React.Fragment >
          </div>
          <div className="lg:w-[55%] w-full"> 
            <>
            <AnnouncementCard/>
            </>
          </div>
        </div>
      </div>
      <div className="lg:w-[35%] space-y-1 h-full ">
     < TotalDevicesList/>
     <TotalAlpha/>
      </div>
    </div>
  );
}

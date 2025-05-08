interface StatusTabsProps {
    statuses: "Active" | "Inactive" | "Error";
  }
  
  export default function StatusTabs({ statuses }: StatusTabsProps) {
    const getStyles = (status: string) => {
      switch (status.toLowerCase()) {
        case "active":
          return "bg-green-100 text-green-700";
        case "inactive":
          return "bg-gray-200 text-gray-500";
        case "error":
          return "bg-red-100 text-red-600";
        default:
          return "bg-gray-100 text-gray-300";
      }
    };
  
    return (
      <span
        className={`text-xs font-medium p-2  ${getStyles(statuses)}`}
      >
        {statuses}
      </span>
    );
  }
  
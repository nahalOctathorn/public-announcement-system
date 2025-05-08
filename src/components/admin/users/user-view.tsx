import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Star, User } from "lucide-react";
import { UserWithProfile } from "@/@types/user.type";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface UserViewProps {
  data: UserWithProfile | null;
  loading: boolean;
  error: string | null;
  level: number;
}

export const UserView: React.FC<UserViewProps> = ({
  data,
  loading,
  error,
}) => {
  const navigate = useNavigate();

  if (loading) return <div>Loading user data...</div>;
  if (error) return <div className="text-destructive">Error: {error}</div>;
  if (!data) return <div>No user data available</div>;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>


          <div className="flex-1 space-y-1">
            <h2 className="text-lg font-semibold">
              {`${data.firstName} ${data.lastName}`}{" "}
            </h2>
          </div>
        </div>
        <Badge variant="outline" className="gap-1">
          <Star className="h-3 w-3" />
          Top Rated
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-5">
        <div className="space-y-1 flex-1 min-w-[150px]">
          <div className="text-muted-foreground">
            <span className="text-sm">Company Name</span>
          </div>
          <span className="text-sm">{data.profile?.llc || "N/A"}</span>
        </div>

        <div className="space-y-1 flex-1 min-w-[150px]">
          <div className="text-muted-foreground">
            <span className="text-sm">Email</span>
          </div>
          <span className="text-sm">{data.email}</span>
        </div>

        <div className="space-y-1 flex-1 min-w-[150px]">
          <div className="text-muted-foreground">
            <span className="text-sm">Contact Phone</span>
          </div>
          <span className="text-sm">{data.profile?.contactPhone || "N/A"}</span>
        </div>

        <div className="space-y-1 flex-1 min-w-[150px]">
          <div className="text-muted-foreground">
            <span className="text-sm">Address</span>
          </div>
          <span className="text-sm">{data.profile?.address || "N/A"}</span>
        </div>

        <div className="space-y-1 flex-1 min-w-[150px]">
          <div className="text-muted-foreground">
            <span className="text-sm">City, State, ZIP</span>
          </div>
          <span className="text-sm">{`${data.profile?.city || "N/A"}, ${data.profile?.state || "N/A"
            } ${data.profile?.zip || "N/A"}`}</span>
        </div>

        <div className="space-y-1 flex-1 min-w-[150px]">
          <div className="text-muted-foreground">
            <span className="text-sm">ECT</span>
          </div>
          <span className="text-sm">{data.profile?.ect || "N/A"} </span>
        </div>
      </CardContent>
    </Card>
  );
};

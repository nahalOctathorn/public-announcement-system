import { Button } from "@/components/ui/button";
import { ROOT_ROUTE } from "@/config/routes.config";
import { buildRoutePath } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Sorry, we couldn't find that page.
      </p>
      <Button
        variant="default"
        className="gap-2"
        onClick={() => navigate(buildRoutePath(ROOT_ROUTE))}
      >
        <ArrowLeft size={18} />
        Go Home
      </Button>
    </div>
  );
}

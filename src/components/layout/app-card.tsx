import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { JSX } from "react";

interface CardProps {
  title: string;
  value: number | string;
  IconComponent?: JSX.Element;
  loading: boolean;
  description?: string;
  className?: string;
  onClick?: () => void
}

export function AppCard({
  title,
  value,
  IconComponent,
  loading,
  description,
  className,
  onClick

}: CardProps) {
  return (
    <Card className={className} onClick={onClick}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {IconComponent}
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-[100px]" />
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

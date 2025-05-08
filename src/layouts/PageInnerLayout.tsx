import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  Header: React.ReactNode;

}

export default function PageInnerLayout({ Header, children }: MainLayoutProps) {
  return (
    <>
      <div className="mb-2">
        {Header}
      </div>
      {children}
    </>
  );
}

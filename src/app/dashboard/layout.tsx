import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>New Dashboard Layout</h1>
      <div> {children}</div>
    </div>
  );
}

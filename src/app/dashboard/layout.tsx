export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh h-full w-full font-dm-sans tracking-tight">
      {children}
    </div>
  );
}

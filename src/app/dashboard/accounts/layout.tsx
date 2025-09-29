export default function AccountsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-full md:max-w-5xl mx-0 md:mx-auto">{children}</div>
  );
}

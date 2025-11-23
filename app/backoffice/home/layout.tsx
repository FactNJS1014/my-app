import Sidebar from "@/app/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-1">
      <div className="bg-gray-800 h-screen text-white  w-[250px]">
        <Sidebar />
      </div>
      {children}
    </div>
  );
}

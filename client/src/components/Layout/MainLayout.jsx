import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen w-full bg-[#0c0c0e] flex overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">{children}</main>
    </div>
  );
};

export default MainLayout;

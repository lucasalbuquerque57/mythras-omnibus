import NavBar from "@/app/(protected)/_components/main-nav-bar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

// @ts-ignore
const ProtectedLayout = ({children}) => {
  return (
    <div>
      <NavBar/>
      {children}
    </div>
  );
};

export default ProtectedLayout;

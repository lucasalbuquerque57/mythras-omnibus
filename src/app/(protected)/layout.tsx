import NavBar from "@/app/(protected)/_components/main-navbar/main-nav-bar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

// @ts-expect-error no idea why
const ProtectedLayout = ({children}) => {
  return (
    <div>
      {/*<NavBar/>*/}
      {children}
    </div>
  );
};

export default ProtectedLayout;

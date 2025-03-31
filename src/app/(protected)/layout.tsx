import NavBar from "@/app/(protected)/_components/main-navbar/main-nav-bar";

/*interface ProtectedLayoutProps {
  children: React.ReactNode;
}*/

// @ts-expect-error It should be any
const ProtectedLayout = ({children}) => {
  return (
    <div className="pt-16">
      <NavBar/>
      {children}
    </div>
  );
};

export default ProtectedLayout;

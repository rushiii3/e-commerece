import NotLoggedIncart from "@/components/NotLoggedIncart";
export const withAuth = (Component) => {
  return ({ isAuthenticated, ...props }) => {
    if (!isAuthenticated) {
      return <NotLoggedIncart />;
    }
    return <Component {...props} />;
  };
};

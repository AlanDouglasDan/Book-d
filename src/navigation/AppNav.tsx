import { FC } from "react";

import { useAuth } from "store/auth/hooks";
import { BottomTabsNav } from "./bottom-tabs-nav";
import { AuthStackNav } from "./auth-stack";

const AppNav: FC = () => {
  const { accessToken } = useAuth();

  if (accessToken) return <BottomTabsNav />;

  return <AuthStackNav />;
};

export default AppNav;

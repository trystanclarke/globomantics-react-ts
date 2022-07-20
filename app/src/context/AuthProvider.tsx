import React from "react";

interface AuthContextValues {
  authInfo: AuthInfo;
  isAuthenticated: boolean;
  setAuthInfo: React.Dispatch<React.SetStateAction<AuthInfo>>;
  isAdmin: boolean;
}

export const AuthContext = React.createContext<undefined | AuthContextValues>(
  undefined
);
const Provider = AuthContext.Provider;

interface Props {
  children: React.ReactNode;
}

interface UserData {
  role: "ADMIN" | "USER";
}

interface AuthInfo {
  userData: UserData | null;
}

export function AuthProvider({ children }: Props) {
  const [authInfo, setAuthInfo] = React.useState<AuthInfo>({
    userData: null,
  });

  const isAuthenticated = !!authInfo.userData;

  const isAdmin = authInfo.userData?.role === "ADMIN";

  return (
    <Provider
      value={{
        authInfo,
        isAuthenticated,
        setAuthInfo,
        isAdmin,
      }}
    >
      {children}
    </Provider>
  );
}

export function useAuthContext() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext should be used within an AuthProvider.");
  }

  return context;
}

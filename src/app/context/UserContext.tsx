import { useSession } from "next-auth/react";
import React from "react";

type UserContextProps = {
  user: any;
};

const UserContext = React.createContext<UserContextProps>({
  user: null,
});

export default UserContext;

interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const { data, status } = useSession();

  if (status == "loading") {
    // TODO: make it better
    return <div className="text-red-300">loading</div>;
  }

  return (
    <UserContext.Provider value={{ user: data?.user }}>
      {children}
    </UserContext.Provider>
  );
};

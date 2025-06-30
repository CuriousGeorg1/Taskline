import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { fetchUserLocations } from "@/actions/userLocations";

type UserLocation = {
  id: string;
  name: string;
};

type UserLocationsContextType = {
  userLocations: UserLocation[];
  setUserLocations: (locations: UserLocation[]) => void;
};

const UserLocationsContext = createContext<
  UserLocationsContextType | undefined
>(undefined);

export const UserLocationsProvider = ({
  children,
  apiToken,
}: {
  children: ReactNode;
  apiToken: string;
}) => {
  const [userLocations, setUserLocations] = useState<UserLocation[]>([]);

  useEffect(() => {
    async function fetchLocations() {
      if (!apiToken) return;
      const locations: any = await fetchUserLocations(apiToken);
      setUserLocations(locations);
    }
    fetchLocations();
  }, [apiToken]);

  return (
    <UserLocationsContext.Provider value={{ userLocations, setUserLocations }}>
      {children}
    </UserLocationsContext.Provider>
  );
};

export const useUserLocations = () => {
  const context = useContext(UserLocationsContext);
  if (!context) {
    throw new Error(
      "userLocations must be used within a UserLocationsProvider"
    );
  }
  return context;
};

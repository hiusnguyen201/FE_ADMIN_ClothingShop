import { useAuth } from "./use-auth";

export const usePermission = () => {
  const { permissions } = useAuth();

  return (key: string | string[], type: "every" | "some" = "every") => {
    if (typeof key === "string") {
      return permissions.includes(key);
    } else {
      return key[type]((k) => permissions.includes(k));
    }
  };
};

import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";

export const useBreadcrumbs = () => {
  const location = useLocation();
  const params = useParams();
  const breadcrumbs = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean).slice(1);
    const url = ["admin"];
    const values = Object.values(params);
    return segments.map((item) => {
      const title = item.charAt(0).toUpperCase() + item.slice(1);
      url.push(item);
      return {
        title: values.includes(item) ? item : title,
        url: `/${url.join("/")}`,
      };
    });
  }, [location]);

  return { breadcrumbs };
};

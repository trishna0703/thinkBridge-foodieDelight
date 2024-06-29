import { useQueryClient } from "react-query";

const useInvalidateQuery = () => {
  const queryClient = useQueryClient();

  const invalidateQuery = (key: string) => {
    queryClient.invalidateQueries(key);
  };

  const invalidateRestaurantList = () => invalidateQuery("restaurant-list");

  return { invalidateRestaurantList };
};

export default useInvalidateQuery;

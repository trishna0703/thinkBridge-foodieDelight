import { API } from "@/constant";
import { useQuery } from "react-query";
import axios from "axios";

const useRestaurantList = ({
  page,
  limit,
}: {
  page: Number;
  limit: Number;
}) => {
  const getRestaurants = async () => {
    let list = await axios.get(`${API}getRestaurantList`, {
      params: { page, limit },
    });
    return list.data;
  };

  let data = useQuery({
    queryKey: ["restaurant-list", page, limit],
    queryFn: getRestaurants,
  });

  return data;
};

export default useRestaurantList;

import { API } from "@/constant";
import { useQuery } from "react-query";
import axios from "axios";

const useRestaurantList = () => {
  const getRestaurants = async () => {
    let list = await axios.get(`${API}getRestaurantList`);

    return list.data.data;
  };

  let data = useQuery({
    queryKey: ["restaurant-list"],
    queryFn: getRestaurants,
  });
  return data;
};

export default useRestaurantList;

import { API } from "@/constant";
import { useQuery } from "react-query";
import axios from "axios";

const useRestaurantList = () => {
  console.log({API})
  const getRestaurants = async () => {
    let list = await axios.get(`${API}getRestaurantList`);
      console.log('Request Headers:', list.headers);
      console.log('Response Data:', list.data);
    return list.data.data;
  };

  let data = useQuery({
    queryKey: ["restaurant-list"],
    queryFn: getRestaurants,
  });
  return data;
};

export default useRestaurantList;

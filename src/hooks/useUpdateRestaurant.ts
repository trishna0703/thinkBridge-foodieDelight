import { API } from "@/constant";
import { useMutation } from "react-query";
import axios from "axios";

const useUpdateRestaurant = () => {
  const update = async (body: any) => {
    let resp = await axios.put(`${API}saveRestaurant`, body);
    return resp.data;
  };
  const data = useMutation(update);
  return data;
};

export default useUpdateRestaurant;

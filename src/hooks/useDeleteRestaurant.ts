import { API } from "@/constant";
import axios from "axios";
import { useMutation } from "react-query";

const useDeleteRestaurant = () => {
  const deleteFn = async (id: any) => {
    console.log({ id });
    let resp = await axios.delete(`${API}deleteRestaurant`, { data: { id } });
    return resp.data;
  };
  const data = useMutation(deleteFn);
  return data;
};

export default useDeleteRestaurant;

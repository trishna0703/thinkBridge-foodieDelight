import { API } from "@/constant";
import { useMutation } from "react-query";
import axios from "axios";

const useUpdateRestaurant = () => {
  const update = async (body: any) => {
    const formData = new FormData();

    for (const key in body) {
      formData.append(key, body[key]);
    }
    let resp = await axios.put(`${API}saveRestaurant`,  formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return resp.data;
  };
  const data = useMutation(update);
  return data;
};

export default useUpdateRestaurant;

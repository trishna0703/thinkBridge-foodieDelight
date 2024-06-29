import { API } from "@/constant";
import { useMutation } from "react-query";
import axios from "axios";

const useAddRestaurant = () => {
  const create = async (body: any) => {
    const formData = new FormData();

    for (const key in body) {
      formData.append(key, body[key]);
    }

    try {
      const resp = await axios.post(`${API}saveRestaurant`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return resp.data;
    } catch (error) {
      throw new Error("Error saving restaurant");
    }
  };

  const mutation = useMutation(create);

  return { ...mutation };
};

export default useAddRestaurant;

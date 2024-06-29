import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantForm from "./RestaurantForm";
import { Spinner } from "react-bootstrap";
import useRestaurantList from "@/hooks/useRestaurantList";
import useDeleteRestaurant from "@/hooks/useDeleteRestaurant";
import useInvalidateQuery from "@/hooks/useInvalidateQuery";
import useUpdateRestaurant from "@/hooks/useUpdateRestaurant";

import RestaurantCard from "./RestaurantCard";
const RestaurantList = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const { data: restaurantList, isLoading: isListLoading } =
    useRestaurantList();
  const { mutateAsync: deleteRestaurant } = useDeleteRestaurant();
  const { mutateAsync: updateRestaurant } = useUpdateRestaurant();
  const { invalidateRestaurantList } = useInvalidateQuery();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [restoId, setRestoId] = useState<string>("");
  const initialValues =
    restoId != ""
      ? restaurantList.find(
          (resto: Record<string, any>) => resto._id === restoId
        )
      : null;

  const handleUpdate = async (values: Record<string, any>) => {
    console.log({ values });
    let updatedRestaurant = await updateRestaurant(values);
    if (updatedRestaurant.status == 200) {
      invalidateRestaurantList();
      console.log("Submitting new restaurant:", updatedRestaurant);
      setRestoId("");
    }
  };

  const filterRestaurants = (query: string) => {
    if (!query) {
      setFilteredRestaurants([]);
    } else {
      const filtered = restaurantList.filter(
        (restaurant: Record<string, any>) =>
          restaurant.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    }
  };

  const handleDelete = async (id: any) => {
    console.log({ id });
    await deleteRestaurant(id);
    invalidateRestaurantList();
  };

  useEffect(() => {
    if (searchQuery != "") {
      filterRestaurants(searchQuery);
    }
    if (searchQuery == "") {
      setFilteredRestaurants([]);
    }
  }, [searchQuery]);

  return (
    <>
      {restoId !== "" ? (
        <RestaurantForm
          initialValues={{ ...initialValues }}
          onSubmit={handleUpdate}
          setRestoId={setRestoId}
        />
      ) : (
        <div className="content">
          <div className="main">
            <div className="pageHeading">
              <div className="searchSection">
                <h3>Search Restaurants</h3>
                <input
                  type="text"
                  placeholder="What?"
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="text-center">{isListLoading && <Spinner />}</div>
            <div className="restoList">
              {filteredRestaurants.length > 0
                ? filteredRestaurants.map(
                    (resto: Record<string, string | any>) => {
                      return (
                        <RestaurantCard
                          {...{ resto, setRestoId, handleDelete }}
                        />
                      );
                    }
                  )
                : restaurantList?.length > 0
                ? restaurantList.map((resto: Record<string, string | any>) => {
                    return (
                      <RestaurantCard
                        {...{ resto, setRestoId, handleDelete }}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantList;

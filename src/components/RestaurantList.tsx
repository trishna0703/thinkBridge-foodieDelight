import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantForm from "./RestaurantForm";
import { Pagination, Spinner } from "react-bootstrap";
import useRestaurantList from "@/hooks/useRestaurantList";
import useDeleteRestaurant from "@/hooks/useDeleteRestaurant";
import useInvalidateQuery from "@/hooks/useInvalidateQuery";
import useUpdateRestaurant from "@/hooks/useUpdateRestaurant";
import "react-toastify/dist/ReactToastify.css";
import RestaurantCard from "./RestaurantCard";
import { Bounce, ToastContainer, toast } from "react-toastify";

const RestaurantList = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const { data: restaurantList, isLoading: isListLoading } =
    useRestaurantList();
  const { mutateAsync: deleteRestaurant } = useDeleteRestaurant();
  const { mutateAsync: updateRestaurant } = useUpdateRestaurant();
  const { invalidateRestaurantList } = useInvalidateQuery();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [restoId, setRestoId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const initialValues =
    restoId != ""
      ? restaurantList.find(
          (resto: Record<string, any>) => resto._id === restoId
        )
      : null;

  const handleUpdate = async (values: Record<string, any>) => {
    let updatedRestaurant = await updateRestaurant(values);
    if (updatedRestaurant.status == 200) {
      toast.success(updatedRestaurant.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      invalidateRestaurantList();
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
    toast.success("Restaurant Deleted.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
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

  const paginate = (items: any[], pageNumber: number, itemsPerPage: number) => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items?.slice(startIndex, endIndex);
  };

  const paginatedRestaurants = !isListLoading
    ? paginate(
        filteredRestaurants.length > 0 ? filteredRestaurants : restaurantList,
        currentPage,
        itemsPerPage
      )
    : [];

  const totalPages = Math.ceil(
    (filteredRestaurants.length > 0
      ? filteredRestaurants.length
      : restaurantList?.length || 0) / itemsPerPage
  );

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
              {paginatedRestaurants?.length > 0
                ? paginatedRestaurants?.map(
                    (resto: Record<string, string | any>) => {
                      return (
                        <RestaurantCard
                          {...{ resto, setRestoId, handleDelete }}
                        />
                      );
                    }
                  )
                : null}
            </div>
            {paginatedRestaurants?.length > 0 ? (
              <div className="paginationSection">
                <Pagination>
                  <Pagination.First
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                  />
                  <Pagination.Prev
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages).keys()].map((number) => (
                    <Pagination.Item
                      key={number + 1}
                      active={number + 1 === currentPage}
                      onClick={() => setCurrentPage(number + 1)}
                    >
                      {number + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  />
                  <Pagination.Last
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantList;

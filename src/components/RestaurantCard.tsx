import React, { Dispatch, SetStateAction } from "react";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

const RestaurantCard = ({
  resto,
  setRestoId,
  handleDelete,
}: {
  resto: Record<string, any>;
  setRestoId: Dispatch<SetStateAction<string>>;
  handleDelete: (id: any) => Promise<void>;
}) => {
  // const imageData = `data:${
  //   resto.featuredImage.contentType
  // };base64,${Buffer.from(resto.featuredImage.data.data).toString("base64")}`;
  // const imageData = `data:${resto.featuredImage.contentType};base64,${resto.featuredImage.data}`
  return (
    <div className="restoCard" key={resto.id}>
      <div className="featuredImg">
        <img src={resto.featuredImage} alt="restaurant-featured" />
      </div>
      <div className="cardBody">
        <div className="cardHead">
          <h2 className="cardTitle">{resto.name}</h2>

          <DropdownButton
            as={ButtonGroup}
            title={<img src="menu.png" alt="menu-icon" />}
            id={`menuDrop-${resto._id}`}
            className="menuDrop"
            align={{ lg: "end", md: "start" }}
          >
            <Dropdown.Item onClick={() => setRestoId(resto._id)}>
              Edit Details
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleDelete(resto._id)}>
              Delete
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <span>
          <img src="phone.png" alt="" />{" "}
          <span className="cardContent">
            <a href={`tel:+${resto.phoneNumber}`}>{resto.phoneNumber}</a>
          </span>
        </span>
        <span>
          <img src="location.png" alt="" />{" "}
          <span className="cardContent">{resto.location}</span>
        </span>
        <span>
          <img src="time.png" alt="" />{" "}
          <span className="cardContent">
            {" "}
            {resto.openingTime} to{"  "}
            {resto.closingTime} every day
          </span>
        </span>
      </div>
    </div>
  );
};

export default RestaurantCard;

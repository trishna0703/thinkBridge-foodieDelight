import React, { Dispatch, SetStateAction } from "react";

const Sidebar = ({
  setSearchQuery,
}: {
  setSearchQuery: Dispatch<SetStateAction<string>>;
}) => {
    
  return (
    <div className="sidebar">
      <div className="searchSection">
        <h3>Search Restaurants</h3>
        <input
          type="text"
          placeholder="What?"
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>
      <div className="searchBasedOnOperationalHours">

      </div>
    </div>
  );
};

export default Sidebar;

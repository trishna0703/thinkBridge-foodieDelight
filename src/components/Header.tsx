import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header>
      <div className="header">
        <div className="logo">
          <img src="restaurant.png" alt="logo" />
          <h2>F</h2>
          <span>oodie</span>
          <h2>D</h2>
          <span>elight</span>
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link href={"/explore"}>Explore</Link>
            </li>
            <li>
              <button>
                <Link href={"/register"}>Register New Restaurant</Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

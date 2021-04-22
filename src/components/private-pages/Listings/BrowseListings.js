import { useEffect, useState } from "react";

//Relative imports
import { ReactComponent as Arrow } from "../../../images/arrow.svg";
import "../../../styles/Shop.css";
import { filterAndSort } from "../../../helperFunctions/filter";
import { sortType } from "../../staticInfo";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import Post from "../../public-pages/Post";
import { authHeader } from "../../staticInfo";
import { Link } from "react-router-dom";

const Shop = () => {
  const [isLoading, setisLoading] = useState(true);
  const [displayArray, setDisplayArray] = useState([]);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterVar, setFilterVar] = useState({
    sort: "Newest First",
  });

  useEffect(() => {
    axios.get("https://flipin-store-api.herokuapp.com/listings.php", authHeader)
      .then(({ data }) => {
        setDisplayArray(data);
        setisLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleSortChange = (type, id) => {
    setFilterVar((prev) => ({ ...prev, sort: type }));
    setDisplayArray((prev) => filterAndSort(prev, false, id || 1));
    setSortOpen(false);
  };

  return (
    <div className="container">
      <div className="main">
        <h2>Browse Listings</h2>
        <div className="main__details">
          <span>{`${20} new products`}</span>
          <div className="main__details-sort browse__listings">
            <span>SORT BY: </span>
            <span>{filterVar.sort}</span>
            <Arrow onClick={() => setSortOpen((prev) => !prev)} />
            <div
              className={sortOpen ? "sort__dropdown open" : "sort__dropdown"}
            >
              <ul>
                {sortType.map((item) =>
                  item.type === "Categories" ? (
                    <></>
                  ) : (
                    <li
                      key={item.id}
                      onClick={() => handleSortChange(item.type, item.id)}
                    >
                      {item.type}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <div className="listings">
          {displayArray.map((post) => {
            return (
              <div key={post.id} className="product">
                <Link to={`/product/${post.id}`}>
                  <Post
                    img={post.img}
                    name={post.name}
                    bid={post.lowestBid}
                    location={post.location}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Shop;

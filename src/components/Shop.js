import { useEffect, useState } from 'react';

//Relative imports
import { ReactComponent as Arrow } from '../images/arrow.svg';
import Post from './Post';
import '../styles/Shop.css';
import { filterAndSort } from '../helperFunctions/filter';
import { categories, sortType } from './staticInfo';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import { TrendingUpRounded } from '@material-ui/icons';

const Shop = () => {
    const [isLoading, setisLoading] = useState(TrendingUpRounded)
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [itemsArray, setItemsArray] = useState([]);
    const [displayArray, setDisplayArray] = useState([]);
    const [sortOpen, setSortOpen] = useState(false);
    const [filterVar, setFilterVar] = useState({
        sort: "Newest First",
        categories: "All",
    });

    useEffect(() => {
        axios.get("https://flipin-store-api.herokuapp.com/shop.php")
        .then(({data}) => {
            setItemsArray(data);
            setDisplayArray(data);
            setisLoading(false);
        })
        .catch(e => console.log(e));
    }, []);

    const handleCategoryChange = (type) => {
        setFilterVar(prev => ({...prev, categories: type}));
        setDisplayArray(prev => filterAndSort(prev, true, type || "all"));
        setCategoryOpen(false);
    }

    const handleSortChange = (type, id) => {
        setFilterVar((prev) => ({ ...prev, sort: type }));
        setDisplayArray(prev => filterAndSort(prev, false, id || 1));
        setSortOpen(false);
    }

    return (
      <div className="container">
        <div className="shop__menu">
          <div
            className="shop__menu-category"
            onClick={() => setCategoryOpen((prev) => !prev)}
          >
            <span>ALL CATEGORIES</span>
            <Arrow />
          </div>
          <div
            className={
              categoryOpen ? "category__dropdown open" : "category__dropdown"
            }
          >
            <ul>
              {categories.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleCategoryChange(item.type)}
                >
                  {item.type}
                </li>
              ))}
            </ul>
          </div>
          <span>Furniture</span>
          <span>Clothing</span>
          <span>Jewellery</span>
        </div>
        <div className="main">
          <h2>Shop</h2>
          <div className="main__details">
            <span>{`${20} new products`}</span>
            <div className="main__details-sort">
              <span>SORT BY: </span>
              <span>{filterVar.sort}</span>
              <Arrow onClick={() => setSortOpen((prev) => !prev)} />
              <div
                className={sortOpen ? "sort__dropdown open" : "sort__dropdown"}
              >
                <ul>
                  {sortType.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => handleSortChange(item.type, item.id)}
                    >
                      {item.type}
                    </li>
                  ))}
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
            {
              displayArray.map((post) => {
                return (
                  <div key={post.id} className="product">
                    <Post
                      img={post.img}
                      name={post.name}
                      bid={post.lowestBid}
                      location={post.location}
                    />
                  </div>
                );
              })
            }
            </div>
          )}
      </div>
    );
};

export default Shop;

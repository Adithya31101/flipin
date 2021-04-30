import { useEffect, useState } from 'react';
//Relative imports
import { ReactComponent as Arrow } from '../../images/arrow.svg';
import Post from './Post';
import '../../styles/Shop.css';
import { filterAndSort } from '../../helperFunctions/filter';
import { categories, sortType } from '../staticInfo';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const Shop = () => {
  const { category: categoryFromUrl } = useParams();
  console.log(categoryFromUrl);
    const [isLoading, setisLoading] = useState(true);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [itemsArray, setItemsArray] = useState([]);
    const [displayArray, setDisplayArray] = useState([]);
    const [sortOpen, setSortOpen] = useState(false);
    const [filterVar, setFilterVar] = useState({
        sort: "Newest First",
        categories: "All",
    });

    useEffect(() => {
      //Post method with a json which sends the categoryFromUrl
      setisLoading(true);
        axios.post("https://flipin-store.herokuapp.com/product.php", {category: categoryFromUrl})
        .then(({data}) => {
            if (data.responseCode === 200) {
              setItemsArray(data.productItems);
              setDisplayArray(data.productItems);
              setisLoading(false);
            }
        })
        .catch(e => console.log(e));
    }, [categoryFromUrl]);

    const handleCategoryChange = (type) => {
        setFilterVar(prev => ({...prev, categories: type}));
        setDisplayArray(prev => filterAndSort(itemsArray, true, type || "all"));
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
          <Link to="/shop/Furniture">Furniture</Link >
          <Link to="/shop/Clothing">Clothing</Link >
          <Link to="/shop/Jewellery">Jewellery</Link >
        </div>
        <div className="main">
          <h2>Shop</h2>
          <div className="main__details">
            <span>{`${displayArray.length} new products`}</span>
            <div className="main__details-sort">
              <span>SORT BY: </span>
              <span>{filterVar.sort}</span>
              <Arrow onClick={() => setSortOpen((prev) => !prev)} />
              <div className={sortOpen ? "sort__dropdown open" : "sort__dropdown"}>
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

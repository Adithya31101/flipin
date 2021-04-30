import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//Relative Imports
import '../../styles/Home.css';
import Difference from './Difference';

//Media Imports
import heroImg from "../../images/heroImg.png";
import homepageGraphic from "../../images/homepage.png";
import furniture from "../../images/furniture.png";
import jewellery from "../../images/jewellery.png";
import clothing from "../../images/clothing.png";
import cosmetics from "../../images/cosmetics.png";
import footwear from "../../images/footwear.png";
import accessories from "../../images/accessories.png";
import { ReactComponent as SearchIcon } from '../../images/search.svg';
import { ReactComponent as Arrow } from '../../images/arrow.svg';



const Home = () => {
    //State 
    const [search, setSearch] = useState("");
    let categoryElements = [], x = 0, pixels = 120;
    let limitCategories = {left: 0, right: 4};
    useEffect(() => {
        categoryElements = document.getElementsByClassName('category');
        if(window.innerWidth < 500){
            pixels = 110;
            limitCategories.right = 1;
            limitCategories.left = 0;
        }
    }, [])

    //Complementary components
    const Category = (props) => {
        return (
            <div className="category">
                <img src={props.src} alt={props.title} />
                <span className="category__title">{props.title}</span>
            </div>
        );
    }

    //Handler Functions 
    const onArrowClick = (direction) => {
        if(direction === 'left'){
            if(limitCategories.left > 0){
                limitCategories.right--;
                limitCategories.left--;
                x += pixels;
            }
        } else {
            if(limitCategories.right < categoryElements.length){
                limitCategories.right++;
                limitCategories.left++;
                x -= pixels;
            }
        }
        for(let i = 0; i < categoryElements.length; i++){
            categoryElements[i].style.transform = `translateX(${x}%)`;
        }
    }

    return (
      <section className="container">
        <div className="row hero">
          <div className="hero__txt">
            <h1 className="hero__txt-header bold">
              Find the perfect sellers for your demands
              <span style={{ color: "#ffb102" }}>.</span>
            </h1>
            <div className="hero__txt-search">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <Link to={search === "" ? `/` : `/products/${search}`}>
                <SearchIcon />
              </Link>
            </div>
            <div className="hero__txt-popular">
              <span className="bold">Popular: </span>
              <Link to="/products/furniture">
                <span className="hero__txt-category">Furniture</span>
              </Link>
              <Link to="/products/hat">
                <span className="hero__txt-category">Hat</span>
              </Link>
            </div>
          </div>
          <img className="hero__img" src={heroImg} alt="Mobile shopping" />
        </div>
        <div className="row categories">
          <h2 className="categories__header">Our Popular Categories</h2>
          <div
            className="categories__carousel-button left_arrow"
            onClick={() => onArrowClick("left")}
          >
            <Arrow className="arrow" />
          </div>
          <div
            className="categories__carousel-button right_arrow"
            onClick={() => onArrowClick("right")}
          >
            <Arrow className="arrow" />
          </div>
          <div className="categories__container">
            <Category src={furniture} title="Furniture" />
            <Category src={clothing} title="Clothing" />
            <Category src={jewellery} title="Jewellery" />
            <Category src={cosmetics} title="Cosmetics" />
            <Category src={footwear} title="Footwear" />
            <Category src={accessories} title="Accessories" />
          </div>
        </div>
        <div className="marketing__container">
          <div className="marketing">
            <h2 className="marketing__header">What is different about us?</h2>
            <Difference title="Customer-Centric">
              The e-commerce we are all familiar with is the customer looks
              through the listing of the various sellers and places an order.
              But on Flipin its opposite sellers look through the listing
            </Difference>
            <Difference title="Best Price in Market">
              With the bidding system, the customer always get the best
              competitive price in the market, and the seller is also kept in
              check, as there is healthy competition
            </Difference>
            <Difference title="Ease in Processing">
              The products can be easily posted and bids can be efficiently
              converted to an order.
            </Difference>
            <Difference title="Ease in communication">
              With our chat feature, the communication can be done in an
              effective manner and many misconceptions can be avoided with the
              help of the same
            </Difference>
          </div>
          <img src={homepageGraphic} alt="A mobile with some offers" />
        </div>
      </section>
    );
}

export default Home;
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//Relative Imports
import '../../styles/Home.css';
import Difference from './Difference';

//Media Imports
import heroImg from "../../images/heroImg.png";
import furniture_img from "../../images/home_category1.png";
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
                    <h1 className="hero__txt-header bold">Find the perfect sellers for your demands<span style={{color: "#ffb102"}}>.</span></h1>
                    <div className="hero__txt-search">
                        <input type="text" onChange={e => setSearch(e.target.value)} value={search} />
                        <Link to={search===""? `/` : `/products/${search}`}><SearchIcon  /></Link>
                    </div>
                    <div className="hero__txt-popular">
                        <span className="bold">Popular: </span>
                        <Link to="/products/furniture"><span className="hero__txt-category">Furniture</span></Link>
                        <Link to="/products/hat"><span className="hero__txt-category">Hat</span></Link>
                    </div>
                </div>
                <img className="hero__img" src={heroImg} alt="Mobile shopping" />
            </div>
            <div className="row categories">
                <h2 className="categories__header">Our Popular Categories</h2>
                    <div className="categories__carousel-button left_arrow" onClick={()=>onArrowClick('left')}>
                        <Arrow className="arrow"/>
                    </div>
                    <div className="categories__carousel-button right_arrow" onClick={()=>onArrowClick('right')}>
                        <Arrow className="arrow" />
                    </div>
                <div className="categories__container">
                    <Category src={furniture_img} title="Furniture" />
                    <Category src={furniture_img} title="Clothing" />
                    <Category src={furniture_img} title="Jewellery" />
                    <Category src={furniture_img} title="Cosmetics" />
                    <Category src={furniture_img} title="Footwear" />
                    <Category src={furniture_img} title="Accessories" />
                </div>
            </div>
            <div className="row marketing">
                <h2 className="marketing__header">What is different about us?</h2>
                <Difference title="Lorem Ipsum" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</Difference>
                <Difference title="Lorem Ipsum" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</Difference>
                <Difference title="Lorem Ipsum" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</Difference>
                <Difference title="Lorem Ipsum" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</Difference>
            </div>
        </section>
    );
}

export default Home;
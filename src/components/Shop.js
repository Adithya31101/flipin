import { useState } from 'react';

//Relative imports
import { ReactComponent as Arrow } from '../images/arrow.svg';
import '../styles/Shop.css';

const Shop = () => {
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [filter, setFilter] = useState({
        price: null,
        category: null,
    })

    const staticData = {
        img: "https://wakefit-co.s3.ap-south-1.amazonaws.com/img/wardrobes/tartan/3-door/drawer/0.1.jpg",
        name: "Wardrobe",
        lowestBid: "10000",
        date: ""
    }

    return (
        <div className="container">
            <div className="shop__menu">
                <div className="shop__menu-category" onClick={()=>setCategoryOpen(prev => !prev)}>
                    <span>ALL CATEGORIES</span>
                    <Arrow />
                </div>
                <div className={categoryOpen? "category__dropdown open" : "category__dropdown"}>
                    <ul>
                        <li>Accessories</li>
                        <li>Clothing</li>
                        <li>Cosmetics</li>
                        <li>Footwear</li>
                        <li>Furniture</li>
                        <li>Jewellery</li>
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
                    <div>
                        <span>SORT BY: </span>
                        <span>{"Hello"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;

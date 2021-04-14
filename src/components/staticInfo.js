export const footerInfo = [{
    id: 1,
    header: "Categories",
    list: [{
        id: 1, name: "Accessories", to: "/shop"
    }, {
        id: 2, name: "Jewellery", to: "/shop"
    }, {
        id: 3, name: "Cosmetics", to: "/shop"
    }, {
        id: 4, name: "Clothing", to: "/shop"
    }, {
        id: 5, name: "Furniture", to: "/shop"
    }],
},{
    id: 2,
    header: "Pages",
    list: [{
        id: 1, name: "About", to: "/about",
    }, {
        id: 2, name: "Shop", to: "/shop"
    }, {
        id: 3, name: "Log in", to: "/login"
    }, {
        id: 4, name: "Sign Up", to: "/signup"
    }, {
        id: 5, name: "Contact", to: "/contact"
    }],
}];


export const categories = [
    {id: 0, type: "All"},
    {id: 1, type: "Accessories"}, 
    {id: 2, type: "Clothing"},
    {id: 3, type: "Cosmetics"}, 
    {id: 4, type: "Footwear"}, 
    {id: 5, type: "Furniture"}, 
    {id: 6, type: "Jewellery"}
];

export const sortType = [
    {id: 1, type: "Oldest First"}, 
    {id: 2, type: "Newest First"},
    {id: 3, type: "Categories"}, 
    {id: 4, type: "Bid Amount"}, 
];

export const category = [
  { id: 1, type: "Accessories" },
  { id: 2, type: "Clothing" },
  { id: 3, type: "Cosmetics" },
  { id: 4, type: "Footwear" },
  { id: 5, type: "Furniture" },
  { id: 6, type: "Jewellery" },
];

export const authHeader = {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
  },
};
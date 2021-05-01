import { useContext, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { ReactComponent as PinIcon } from '../../../images/pin.svg';
import { ReactComponent as ChatIcon } from '../../../images/chat.svg';
import Bid_seller from './Bid_seller';
import Bid_customer from './Bid_customer';
import '../../../styles/Product.css';
import { UserContext } from '../../Interface';
import Popup from '../../Popup';
import BidInput from './BidInput';
import Post from '../../public-pages/Post';
import { CheckRounded, CloseRounded, EditRounded, VisibilityOffRounded, VisibilityRounded } from '@material-ui/icons';
import axios from 'axios';
import { authHeader } from '../../staticInfo';
import { CircularProgress } from '@material-ui/core';


const Product = () => {
   //Variable
   const {id} = useParams();
   const {state} = useContext(UserContext);
   const history = useHistory();
   //State
   const [isLoading, setIsLoading] = useState(true);
   const [bidPlaced, setBidPlaced] = useState(null);
   const [openDeleteBidPopup, setOpenDeleteBidPopup] = useState(false);
   const [acceptBidOpen, setAcceptBidOpen] = useState({
      open: false,
      sellerId: undefined,
   });
   const [isBidPopOpen, setIsBidPopOpen] = useState({
         open: false,
         edit: false,
         content: {
            price: "", desc: ""
         }
      });
   const [productInfo, setProductInfo] = useState({});

   useEffect(() => {
      setIsLoading(true);
      axios.post("https://flipin-store.herokuapp.com/getproduct.php", {pid: id}, authHeader)
         .then(({data}) => {
            if(data.responseCode === 200){
               setProductInfo(data);
               setBidPlaced(data.bids.findIndex(bid => bid.sellerId === state.id));
               setIsLoading(false);
            }
         })
         .catch(e => console.log(e));
   }, [id])

   useEffect(() => {
      if(isBidPopOpen.open){
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
   }, [isBidPopOpen]);

   const handlePlaceBid = () => {
     setIsBidPopOpen(prev => ({
         ...prev,  
         open: true,
         edit: false
     })); 
   };

   const handleClose = (update = false) => {
      setIsBidPopOpen(prev => ({
         ...prev,  
         open: false,
     }));
     if(update){
      if(bidPlaced !== -1) {
         let newBids = productInfo.bids;
         newBids[bidPlaced] = {
            ...newBids[bidPlaced],
            amount: update.price,
            description: update.desc,
         }
         setProductInfo(prev => ({
            ...prev,
            bids: newBids,
         }))
      } else {
         let updatedBids = productInfo.bids;
         updatedBids.push({
            sellerId: state.id,
            logo: state.url, 
            sellerName: state.name,
            amount: update.price,
            description: update.desc
         });
         setBidPlaced(updatedBids.length - 1);
         setProductInfo(prev => ({
            ...prev,
            bids: updatedBids,
         }))
      }
     }
   }

   const handlePublish = (publish) => {
      axios.post("https://flipin-store.herokuapp.com/publish.php", {pid: id, publish}, authHeader)
      .then(({data}) => {
         if(data.responseCode === 204) {
            setProductInfo(prev => ({
            ...prev,
            active: publish
            }));
         }
      })
      .catch(e => console.error(e));
   }
   
   const handleEditListing = () => {
      history.push({
         pathname: '/create',
         state: {
         edit: true,
         pId: id,
         name: productInfo.name,
         category: productInfo.category,
         desc: productInfo.description,
         src: productInfo.image
         }
      });
   }

   const handleDeleteBid = () => {
     axios.post("https://flipin-store.herokuapp.com/closebid.php", { pid: id }, authHeader)
     .then(res => {
       if(res.data.responseCode === 204){
         let updatedBids = productInfo.bids;
         updatedBids.splice(bidPlaced, 1);
         setProductInfo((prev) => ({
           ...prev,
           bids: updatedBids,
         }));
         setOpenDeleteBidPopup(false);
         setBidPlaced(-1);
       } else {
         alert("Something Went Wrong!");
       }
     })
     .catch(e => console.error(e));
     
   }
   const handleChatWithCustomer = () => {
      history.push({
        pathname: "/inbox",
        state: {
          customer: productInfo.customerId,
          customerName: productInfo.customerName,
          seller: state.id,
          sellerName: state.name,
          sellerLogo: state.logo ? state.logo : null,
        },
      });
   }

   const handleAcceptBidCancel = () => {
      setAcceptBidOpen(false);
   }

   const handleAcceptOrder = () => {
     axios.post("https://flipin-store.herokuapp.com/acceptorder.php", {
       sid: acceptBidOpen.sellerId,
       pid: id,
     }, authHeader)
     .then(res => {
        if(res.data.responseCode === 201){
          console.log(res.data);
          setAcceptBidOpen({open: false, sellerId: null})
          history.push("/orders");
        } else {
          console.log(res.data);
        }
     })
     .catch(e => {
       console.error(e);
     });
   }

   return isLoading ? (
     <div className="loader" style={{ height: "80vh" }}>
       <CircularProgress />
     </div>
   ) : (
     <div className="product__page">
       {/* Popup for Bid */}
       <Popup open={isBidPopOpen.open} handleClose={handlePlaceBid}>
         <BidInput
           pid={id}
           edit={isBidPopOpen.edit}
           content={isBidPopOpen.content}
           handleClose={handleClose}
         />
       </Popup>
       <Popup open={openDeleteBidPopup} handleClose={() => setOpenDeleteBidPopup(false)}>
         <h1>Delete Bid?</h1>
         <p>Are you sure you want to delete this bid?</p>
         <div className="product-page__info-buttons">
           <button onClick={handleDeleteBid}>
             <CheckRounded />
             &nbsp; Yes
           </button>
           <button onClick={() => setOpenDeleteBidPopup(false)}>
             <CloseRounded />
             &nbsp; No
           </button>
         </div>
       </Popup>
       <Popup open={acceptBidOpen.open} handleClose={handleAcceptBidCancel}>
         <h1>Accept Bid and Place Order?</h1>
         <p>Are you sure you want to accept this bid?</p>
         <div className="product-page__info-buttons">
           <button onClick={handleAcceptOrder}>
             <CheckRounded />
             &nbsp; Yes
           </button>
           <button onClick={handleAcceptBidCancel}>
             <CloseRounded />
             &nbsp; No
           </button>
         </div>
       </Popup>

       {/* Section 1 - Product Info */}
       <section className="product-page__info">
         <img src={productInfo.image} alt={productInfo.name} />
         <div className="product-page__info-text-container">
           <h1>{productInfo.name}</h1>
           <div className="product-page__info-loc">
             <PinIcon />
             <h3>{productInfo.location}</h3>
           </div>
           {!state.isSeller && (
             <span
               className={`p__status ${
                 productInfo.active ? "live" : "inactive"
               }`}
             >
               {productInfo.active ? "LIVE" : "INACTIVE"}
             </span>
           )}
           <div className="product-page__info-lb">
             <h2>{`₹ ${productInfo.lowestBid}`}</h2>
             <span>LOWEST BID</span>
           </div>
           <div className="product-page__info-desc">
             <span>Product Description</span>
             <p>{productInfo.description}</p>
           </div>
           <span>{`Posted By: ${productInfo.customerName}`}</span>

           {state.isSeller ? (
             <div className="product-page__info-buttons">
               <button disabled={bidPlaced !== -1} onClick={handlePlaceBid}>
                 <span>+</span>
                 PLACE BID
               </button>
               <button onClick={handleChatWithCustomer}>
                 <ChatIcon
                   style={{ fill: "#fff", width: "20px", marginRight: "10px" }}
                 />
                 CHAT WITH CUSTOMER
               </button>
             </div>
           ) : (
             state.id === productInfo.customerId && (
               <div className="product-page__info-buttons">
                 <button onClick={handleEditListing}>
                   <EditRounded
                     style={{
                       fill: "#fff",
                       width: "20px",
                       marginRight: "10px",
                     }}
                   />
                   EDIT LISTING
                 </button>
                 {!productInfo.active ? (
                   <button onClick={() => handlePublish(true)}>
                     <VisibilityRounded
                       style={{
                         fill: "#fff",
                         width: "20px",
                         marginRight: "10px",
                       }}
                     />
                     PUBLISH
                   </button>
                 ) : (
                   <button onClick={() => handlePublish(false)}>
                     <VisibilityOffRounded
                       style={{
                         fill: "#fff",
                         width: "20px",
                         marginRight: "10px",
                       }}
                     />
                     UNPUBLISH
                   </button>
                 )}
               </div>
             )
           )}
         </div>
       </section>

       {/* Section 2 - Other seller bids */}

       {state.isSeller || state.id === productInfo.customerId ? (
         <>
           <section className="product__sections">
             <h2>Other Seller Bids</h2>
             <div className="product__bids">
               {productInfo.bids.map((bid) => (
                 <div
                   className={`bid__item ${
                     state.isSeller ? "per_seller" : "per_customer"
                   }`}
                   key={bid.id}
                 >
                   {state.isSeller ? (
                     <Bid_seller
                       setBidInput={setIsBidPopOpen}
                       sellerId={bid.sellerId}
                       logo={bid.logo}
                       name={bid.sellerName}
                       desc={bid.description}
                       amount={bid.amount}
                       setOpenDeleteBidPopup={setOpenDeleteBidPopup}
                     />
                   ) : (
                     <Bid_customer
                       active={productInfo.active}
                       acceptBidOpen={acceptBidOpen}
                       setAcceptBidOpen={setAcceptBidOpen}
                       sellerId={bid.sellerId}
                       logo={bid.logo}
                       name={bid.sellerName}
                       desc={bid.description}
                       amount={bid.amount}
                     />
                   )}
                 </div>
               ))}
             </div>
           </section>

           {/* Section 3 - Suggested bids */}
           {state.isSeller && (
             <section className="product__sections">
               <h2>Suggested Products to bid</h2>
               <hr />
               <div className="listings" style={{ margin: "0" }}>
                 {productInfo.suggestions.map((post) => {
                   return (
                     <div
                       key={post.id}
                       className="product"
                       style={{ margin: "1em 4em 2em" }}
                     >
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
               <hr style={{ marginBottom: "4rem" }} />
             </section>
           )}
         </>
       ) : (
         <></>
       )}
     </div>
   );
}

export default Product;

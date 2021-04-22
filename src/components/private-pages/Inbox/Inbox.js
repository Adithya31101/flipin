import { db, storage }  from '../../../services/firebase';
import { useState, useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { UserContext } from '../../Interface';
import "../../../styles/Inbox.css";
import { ReactComponent as SearchIcon } from '../../../images/search.svg';
import Chat from "./Chat";
import Message from "./Message";
import { AttachFileOutlined, SendRounded } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";
import sortBy from 'lodash.sortby';


const Inbox = () => {
   //Variables
   const {state} = useLocation();
   const {state: currentUser} = useContext(UserContext);
   const chatWindowRef = useRef();

   //State
   const [chats, setChats] = useState([]);
   const [loading, setLoading] = useState(false);
   const [chatDetails, setChatDetails] = useState(null);
   const [searchString, setSearchString] = useState("");
   const [chatText, setChatText] = useState("");
   const [sendDisabled, setSendDisabled] = useState(true);
   const [messages, setMessages] = useState([]);
   const [image, setImage] = useState(null);
   const [src, setSrc] = useState("");

   useEffect(() => {
      let user = currentUser.isSeller ? "seller" : "customer";
      db.collection("chatroom")
        .where(user, "==", currentUser.id)
        .onSnapshot(({ docs }) => {
          const a = docs.map((doc) => {
            const data = doc.data();
            return ({
               name: currentUser.isSeller? data.customerName : data.sellerName,
               id: doc.id,
               logo: data.sellerLogo
            });
          });
          setChats(a);
          setLoading(false);
        });
      if(state){
         db.collection("chatroom").where('customer', '==', state.customer).where('seller', '==', state.seller).get()
            .then(({docs}) => {
               if(docs.length === 0){
                  db.collection('chatroom').add(state).then(res => {
                     setChatDetails({
                        name: currentUser.isSeller? state.customerName : state.sellerName,
                        id: res.id,
                        logo: state.sellerLogo
                     })
                  });
               } else {
                  const data = docs[0].data();
                  setChatDetails({
                     name: currentUser.isSeller? data.customerName : data.sellerName,
                     id: docs[0].id,
                     logo: data.sellerLogo
                  });
               }
            });
      }
   }, []);

   useEffect(() => {
      if(chatDetails){
         db.collection('chat').where('chatroomID', '==', chatDetails.id).onSnapshot(messagesData => {
            const a = messagesData.docs.map(message => {
               const data = message.data();
               return ({
                  ...data,
                  id: message.id,
                  postedAt: new Date(data.postedAt.toDate()),
               });
            });
            setMessages(sortBy(a,'postedAt'));
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
         });
      }
   }, [chatDetails])

   //Handlers
   const handleSearchChange = (e) => {
      setSearchString(e.target.value);
   }

   const handleImageChange = (e) => {
     if(e.target.files[0]){
       setImage(e.target.files[0]);
       const reader = new FileReader();
       reader.onload = () => {
         if(reader.readyState === 2){
           setSrc(reader.result);
         }
       }
       reader.readAsDataURL(e.target.files[0]);
     }
   }

   const handleChatTextChange = (e) => {
      setChatText(e.target.value);
      if(e.target.value.trim() === ""){
         setSendDisabled(true);
      } else {
         setSendDisabled(false);
      }
   }

   const handleSend = (e) => {
      e.preventDefault();
      if(image){
         const uploadTask = storage.ref(`/images/${image.name}`).put(image);
         uploadTask.on('state_changed', 
            console.log,
            console.error,
            () => {
               storage.ref('images').child(image.name).getDownloadURL()
               .then(url => {
                  db.collection("chat")
                    .add({
                      message: chatText,
                      chatroomID: chatDetails.id,
                      from: currentUser.id,
                      mediaURL: url,
                      postedAt: new Date(),
                    })
                    .then((res) => {
                      console.log("Message sent successfully!");
                    });
                  setChatText("");
                  setSrc("");
                  setImage(null);
               })
               .catch(e => console.error(e));
            }
         );
      } else {
         db.collection("chat")
           .add({
             message: chatText,
             chatroomID: chatDetails.id,
             from: currentUser.id,
             mediaURL: null,
             postedAt: new Date(),
           })
           .then((res) => {
             console.log("Message sent successfully!");
           });
         setChatText("");
      }
      
   }

   return (
      <div className="inbox">
         <div className="inbox__container">
            <section className="inbox__chatrooms">
               <div className="chat__search">
                  <div className="chat__search-box">
                     <input type="text" value={searchString} onChange={handleSearchChange} />
                     <SearchIcon /> 
                  </div>
               </div>
               <div className="chatrooms">
                  {
                     loading === "chats"?
                     <div className="loader">
                        <CircularProgress />
                     </div>
                     :
                     chats.map(chat => (
                        <div onClick={()=>setChatDetails(chat)} className="chatroom__chat" key={chat.id}>
                           <Chat src={chat.logo} name={chat.name} />
                        </div>
                     ))
                  }
               </div>
            </section>
            <section className="chat-details">
               {
                  chatDetails?
                  (
                  <>
                  <div className="chat__name">
                     <h2>{chatDetails.name}</h2>
                  </div>
                  <div ref={chatWindowRef} className="chat__window">
                     {
                        messages.map(message => (
                           <div className={`chat__message ${message.from === currentUser.id? "from-me" : ""}`}>
                              <Message time={message.postedAt} media={message.mediaURL}>{message.message}</Message>
                           </div>
                        )) 
                     }
                  </div>
                  <div className="chat__input">
                     {
                        src && (
                           <>
                           <img src={src} alt="Image" style={{width: "50px"}}/>
                           <span style={{cursor: "pointer", color: "red"}} onClick={()=>{
                              setImage(null);
                              setSrc("");
                           }}>X</span>
                           </>
                        )
                     }
                     <label htmlFor="addImage"><AttachFileOutlined /></label>
                     <input name="addImage" id="addImage" type="file" accept="image/*" hidden onChange={handleImageChange}/>
                     <input type="text" value={chatText} onChange={handleChatTextChange} />
                     <button disabled={sendDisabled} onClick={handleSend}>
                        <SendRounded />
                        &nbsp;&nbsp;SEND
                     </button>
                  </div>
                  </>
                  )
                  :
                  (
                     <div className="no-chat-selected">
                        <h1>Please select a chat to continue</h1>
                     </div>
                  )
               }
               
            </section>
         </div>
      </div>
   );
}

export default Inbox;

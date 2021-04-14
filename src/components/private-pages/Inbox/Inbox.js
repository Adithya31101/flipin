import db from '../../../services/firebase';
import { useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router';
import { UserContext } from '../../Interface';
import "../../../styles/Inbox.css";
import { ReactComponent as SearchIcon } from '../../../images/search.svg';
import Chat from "./Chat";
import Message from "./Message";
import { AttachFileOutlined, SendRounded } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";

const Inbox = () => {
   //Variables
   const {state} = useLocation();
   const {state: currentUser} = useContext(UserContext);

   //State
   const [chats, setChats] = useState([
      {name: "Ayush", id: "C1"},
      {name: "Adithya", id: "C3"},
      {name: "Shikha", id: "C4"},
   ]);
   const [loading, setLoading] = useState(false);
   const [chatDetails, setChatDetails] = useState(null);
   const [searchString, setSearchString] = useState("");
   const [chatText, setChatText] = useState("");
   const [sendDisabled, setSendDisabled] = useState(true);
   const [messages, setMessages] = useState([]);

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
         console.time('query')
         db.collection('chat').where('chatroomID', '==', chatDetails.id).onSnapshot(messagesData => {
            const a = messagesData.docs.map(message => {
               const data = message.data();
               return ({
                  ...data,
                  id: message.id,
                  postedAt: new Date(data.postedAt.toDate()),
               });
            });
            setMessages(a);
            console.timeEnd('query');
         });
      }
   }, [chatDetails])

   //Handlers
   const handleSearchChange = (e) => {
      setSearchString(e.target.value);
   }

   const handleChatTextChange = (e) => {
      setChatText(e.target.value);
      if(e.target.value.trim() === ""){
         setSendDisabled(true);
      } else {
         setSendDisabled(false);
      }
   }

   const handleSend = () => {
      db.collection('chat').add({
         message: chatText,
         chatroomID: chatDetails.id,
         from: currentUser.id,
         mediaURL: null,
         postedAt: new Date()
      }).then(res => {
         console.log("Message sent successfully!");
      })
      setChatText("");
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
                  <div className="chat__window">
                     {
                        messages.map(message => (
                           <div className={`chat__message ${message.from === currentUser.id? "from-me" : ""}`}>
                              <Message time={message.postedAt} media={message.mediaURL}>{message.message}</Message>
                           </div>
                        ))   
                     }
                  </div>
                  <div className="chat__input">
                     <AttachFileOutlined />
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

import { Rating } from "@material-ui/lab";
import { StarBorder } from "@material-ui/icons";
import { useRef, useState } from "react";
import axios from 'axios';
import { authHeader } from "../../staticInfo";


const FeedbackInput = (props) => {
  const [rating, setRating] = useState(5);
  const messageRef = useRef();

  const handleFeedbackSubmit = () => {
    if (messageRef.current.value.trim() !== "") {
      const feedBack = {
        oid: props.id,
        rating: rating.toString(),
        message: messageRef.current.value,
      };
      console.log(feedBack);
      axios.post("https://flipin-store.herokuapp.com/feedback.php", feedBack, authHeader)
        .then(res => {
          if(res.data.responseCode === 201){
            //TODO
            console.log(res.data.message);
            //SHOW FEEDBACK RECORDED
            props.handleClose(true);
          } else {
            //ERROR
          }
        })
        .catch(e => console.error(e));
    } else {
      console.log('error');
    }
  };

  return (
      <div className="rating">
        <h1>Provide Feedback</h1>
        <div style={{ width: "80%" }}>
          <p>Rate {props.name}: </p>
          <Rating
            value={rating}
            onChange={(e, newval) => setRating(newval)}
            name="customized-empty"
            precision={0.5}
            emptyIcon={<StarBorder />}
          />
        </div>
        <div style={{ width: "80%" }}>
          <p>Message: </p>
          <textarea ref={messageRef} rows="8"></textarea>
          <br />
        </div>
        <button style={{ margin: "none" }} onClick={handleFeedbackSubmit}>
          Submit
        </button>
      </div>
  );
};

export default FeedbackInput;

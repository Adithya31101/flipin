import { Link } from "react-router-dom";
import { getAvatar } from "../../../helperFunctions/misc";

const BidDetails = (props) => {
  //Sub component
  const LabelAmount = (props) => {
    return (
      <div className="bid__head">
        <span className="bid__head-label">{props.label}</span>
        {props.isStatus ? (
          props.amount ? (
            <span className=" bid__status open">{props.amount}</span>
          ) : (
            <span className=" bid__status closed">{props.amount}</span>
          )
        ) : (
          <span className="bid__head-amount number">{props.amount}</span>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="bid__img-name">
        {props.src ? (
          <img className="avatar img" src={props.src} alt={props.name} />
        ) : (
          <div className="avatar">{getAvatar(props.name)}</div>
        )}
        <div className="bid__name">{props.name}</div>
      </div>
      <div className="bid__parttwo">
        <div className="bid__numbers">
          <LabelAmount label="Product Name" amount={props.productName} />
          <LabelAmount label="Price" amount={`₹ ${props.price}`} />
          <LabelAmount label="Status" amount={props.status} isStatus={true} />
        </div>
        <Link className="bid__viewlink" to={`/orders/${props.id}`}>
          View
        </Link>
      </div>
    </>
  );
};

export default BidDetails;

import { Link } from "react-router-dom";

const BidDetails = (props) => {
  //Sub component
  const LabelAmount = (props) => {
    return (
      <div className="bid__head">
        <span className="bid__head-label">{props.label}</span>
        {props.isStatus ? (
          props.amount ? (
            <span className=" bid__status open">OPEN</span>
          ) : (
            <span className=" bid__status closed">CLOSED</span>
          )
        ) : (
          <span className="bid__head-amount number">{"₹ " + props.amount}</span>
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
          <div className="avatar"></div>
        )}
        <div className="bid__name">{props.name}</div>
      </div>
      <div className="bid__parttwo">
        <div className="bid__numbers">
          <LabelAmount label="Lowest Bid" amount={props.lBid} />
          <LabelAmount label="Your Bid" amount={props.bid} />
          <LabelAmount label="Status" amount={props.status} isStatus={true} />
        </div>
        <Link className="bid__viewlink" to={`/product/${props.id}`}>
          View
        </Link>
      </div>
    </>
  );
};

export default BidDetails;

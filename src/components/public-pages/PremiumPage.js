import { useContext, useEffect, useState } from "react";
import axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
//import contact from '../../images/contact.png';
import "../../styles/premium.css";
import { CircularProgress, Snackbar, Tooltip } from "@material-ui/core";
import { ErrorOutline } from "@material-ui/icons";
import validation from "../../helperFunctions/validation";
import { UserContext } from "../Interface";
import shape from "../../images/shape.svg";
import { ReactComponent as TickIcon } from "../../images/tick.svg";
import tick from "../../images/tick.svg";
const Premium = () => {
  return (
    <div className="premium-page">
      <h1 className="premium-subscription">Premium Subscription</h1>
      <h6 className="premium-sub"> For seamless browing &amp; Bidding</h6>
      <div className="cards">
        <div className="card-one">
          <div className="validity-container">
            <img src={shape} alt="shape" />
            <span>3 Months</span>
          </div>
          <ul>
            <li>
              {/* <i className="fas fa-check"></i> */}
              <TickIcon />
              Bidding Option Preference
            </li>
            <li>
              {/* <i className="fas fa-check"></i> */}
              <TickIcon />
              Suggestion
            </li>
            <li>
              {/* <i className="fas fa-check"></i> */}
              <TickIcon />
              Multi-category Selection
            </li>
            <li>
              {/* <i className="fas fa-check"></i> */}
              <TickIcon />
              Premium Support
            </li>
          </ul>
          <h2 className="rate">
            {/* <i className="fas fa-rupee-sign"></i> */}₹ 1300
          </h2>
          <a target="_blank" href="https://forms.gle/ozjxiuDadxjhs8yN6" className="buy-now">
            {" "}
            BUY NOW
          </a>
        </div>
        <div className="card-two">
          <div className="validity-container">
            <img src={shape} alt="shape" />
            <span>6 Months</span>
          </div>
          <ul>
            <li>
              {/* <i className="fas fa-check"></i> */}
              <TickIcon />
              Bidding Option Preference
            </li>
            <li>
              {/* <i className="fas fa-check"></i> */}
              <TickIcon />
              Suggestion
            </li>
            <li>
              {/* <i className="fas fa-check"></i> */}
              <TickIcon />
              Multi-category Selection
            </li>
            <li>
              {/* <i className="fas fa-check"></i> */}
              <TickIcon />
              Premium Support
            </li>
          </ul>
          <h2 className="rate">
            {/* <i className="fas fa-rupee-sign"></i> */}₹ 2200
          </h2>
          <a target="_blank" href="https://forms.gle/ozjxiuDadxjhs8yN6" className="buy-now">
            {" "}
            BUY NOW
          </a>
        </div>
        <div className="card-three">
          <div className="validity-container">
            <img src={shape} alt="shape" />
            <span>12 Months</span>
          </div>
          <ul>
            <li>
              {/* <i className="fas fa-check"></i> */}
              <TickIcon />
              Bidding Option Preference
            </li>
            <li>
              {/* <i className="fas fa-check"></i> */}
              <TickIcon />
              Suggestion
            </li>
            <li>
              {/* <i className="fas fa-check"></i> */}
              <TickIcon />
              Multi-category Selection
            </li>
            <li>
              {/* <i className="fas fa-check"></i> */}
              <TickIcon />
              Premium Support
            </li>
          </ul>
          <h2 className="rate">
            {/* <i className="fas fa-rupee-sign"></i> */}₹ 4000
          </h2>
          <a target="_blank" href="https://forms.gle/ozjxiuDadxjhs8yN6" className="buy-now">
            BUY NOW
          </a>
        </div>
      </div>
    </div>
  );
};

export default Premium;

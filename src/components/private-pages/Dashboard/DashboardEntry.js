import StarIcon from "@material-ui/icons/Star";

const DashboardEntry = ({details}) => {
   return (
     <div className="entry">
       <span className="bold">{details.key}</span>
       <span style={{display: "flex", alignItems: "center"}}>
         {details.value}
         {details.key === "Rating" && <StarIcon style={{ fill: "#606060", width: "17px", marginLeft: "2px", height: "17px"}} />}
       </span>
     </div>
   );
}

export default DashboardEntry;

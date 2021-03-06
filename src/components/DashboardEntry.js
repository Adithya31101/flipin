const DashboardEntry = (props) => {
   return (
      <div className="entry">
         <span className="bold">{props.item}</span>
         <span>{props.value}</span>
      </div>
   );
}

export default DashboardEntry;

const DashboardEntry = ({details}) => {
   return (
      <div className="entry">
         <span className="bold">{details.key}</span>
         <span>{details.value}</span>
      </div>
   );
}

export default DashboardEntry;

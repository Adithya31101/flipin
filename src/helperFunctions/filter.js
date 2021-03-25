import { sortBy } from 'lodash';

export const filterAndSort = (array, isCategory, filterParam) => {
   if(isCategory) {
      if(filterParam === "All") return array;
      return array.filter(item => item.category === filterParam);
   } else {
      let newArr;
      switch(filterParam){
         case 1: {
            newArr = array.map((item) => ({
              ...item,
              Date: new Date(item.Date),
            }));
            newArr = sortBy(newArr, "Date");
            return newArr;
         }

         case 2: {
            newArr = array.map((item) => ({
              ...item,
              Date: new Date(item.Date),
            }));
            newArr = sortBy(newArr, "Date");
            return newArr.reverse();
         }

         case 3: {
            newArr = sortBy(array, "category");
            return newArr;
         }

         case 4: {
            newArr = array.map((item) => ({
              ...item,
              lowestBid: parseInt(item.lowestBid, 10),
            }));
            newArr = sortBy(newArr, "lowestBid");
            return newArr;
         }

         default: {
            return array;
         }
      }
   }
}
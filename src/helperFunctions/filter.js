export const filterAndSort = (array, isCategory, filterParam) => {
   if(isCategory) {
      if(filterParam === "All") return array;
      return array.filter(item => item.category === filterParam);
   } else {
      let newArr;
      switch(filterParam){
         case 1: {
            //Oldest first sort
             newArr = array.sort((p1,p2) => {
                  return new Date(p1.Date) - new Date(p2.Date);
            });
         }

         case 2: {
            newArr = array.sort((p1, p2) => {
              return new Date(p1) - new Date(p2);
            });
         }

         case 3: {
            return array;

         }

         case 4: {
            return array;

         }

         default: {
            return array;
         }
      }
   }
}
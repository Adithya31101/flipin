export const filterAndSort = (array, isCategory, filterParam) => {
   if(isCategory) {
      return array.filter(item => item.category === filterParam);
   } else {
      switch(filterParam){
         case 1: {
            //Oldest first sort
            // return tempArr.sort((p1,p2) => {
               
            // })
            break;
         }

         case 2: {
            break;

         }

         case 3: {
            break;

         }

         case 4: {
            break;

         }
      }
   }
}
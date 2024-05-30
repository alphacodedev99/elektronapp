import { createSlice } from "@reduxjs/toolkit";


const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        allFavorite: [],
        favoriteTotal: 0,
       
    },
    reducers: {
        updateFavoriteAction: (state, action) => {

            let copyFavorite = [...state.allFavorite];
            
            // LOGIKA
            let findIndex = null;
            // ovde proveravam da li postoji u korpi(cart)
            copyFavorite.find((item,index) => {
                if(item.id === action.payload.id){
                    findIndex = index;
                    return;
                }
            })

            // DODAJ NOVI PROZIVOD ILI UVECAJ POSTOJECI!!
            if(findIndex === null){
                copyFavorite.push({...action.payload, favoriteActive: true})
               state.favoriteTotal++;
            }else{
                copyFavorite.splice(findIndex,1);
                state.favoriteTotal--;
            }



            state.allFavorite = copyFavorite;
        }
}});



export const {updateFavoriteAction} = favoriteSlice.actions;
export default favoriteSlice.reducer;
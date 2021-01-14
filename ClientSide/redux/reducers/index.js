import {combineReducers} from "redux";
import filtersReducer from "./filters";
import housesReducer from "./houses";
import cartReducer from "./cart";
import housePage from "./housePage";

const rootReducer = combineReducers({
    filters: filtersReducer,
    houses: housesReducer,
    cart: cartReducer,
    housePage,
})

export default rootReducer;
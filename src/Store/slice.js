import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { getFoodsTenants } from "../data/api";
import { getFoodsWithTenant } from "../data/getter";

const initialState = {
    foods: [],
    tenants: [],
    foodsWithTenant: [],
    isLoading: true
}

export const foodTenantSlice = createSlice({
    name: "foodTenant",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchData.fulfilled,(state,action) => {
            state.isLoading = false
            state.foods = action.payload.foods;
            state.tenants = action.payload.tenants;

        })
    }
})

export const fetchData = createAsyncThunk(
    "foodTenant/fetch",
    async () => {
        let data = await getFoodsTenants()
        data.foods = getFoodsWithTenant(data.menus,data.tenants);
        return data
    }
)

export default foodTenantSlice.reducer;
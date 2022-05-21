import { configureStore } from '@reduxjs/toolkit'
import foodTenant from "./slice";

export const store = configureStore({
  reducer: {
      foodTenant: foodTenant
  },
})
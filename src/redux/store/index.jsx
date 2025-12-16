import { configureStore} from "@reduxjs/toolkit";
import allDevices  from "../slice/devicesSlice";
import allCategories from "../slice/categories/CategorySlice";
import allProducts from "../slice/Products/productSlice";


export function makeStore() {
  return configureStore({
    reducer: {
        allDevices: allDevices,
        allCategories:allCategories,
        allProducts:allProducts
    },
  });
}

export const store = makeStore();


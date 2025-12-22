import { configureStore} from "@reduxjs/toolkit";
import allDevices  from "../slice/devicesSlice";
import allCategories from "../slice/categories/CategorySlice";
import allProducts from "../slice/Products/productSlice";
import allBranch from "../slice/Branch/branchSlice";


export function makeStore() {
  return configureStore({
    reducer: {
        allDevices: allDevices,
        allCategories:allCategories,
        allProducts:allProducts,
        allBranch:allBranch
    },
  });
}

export const store = makeStore();


import { configureStore} from "@reduxjs/toolkit";
import allDevices  from "../slice/devicesSlice/DevicesSlice";
import allCategories from "../slice/categories/CategorySlice";
import allProducts from "../slice/Products/productSlice";
import allBranch from "../slice/Branch/branchSlice";
import allVendiSplashMachine from "../slice/VendingSplashMachine/VendingSplashMachine";


export function makeStore() {
  return configureStore({
    reducer: {
        allDevices: allDevices,
        allCategories:allCategories,
        allProducts:allProducts,
        allBranch:allBranch,
        allVendiSplashMachine:allVendiSplashMachine
    },
  });
}

export const store = makeStore();


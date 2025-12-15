import { configureStore} from "@reduxjs/toolkit";
import allDevices  from "../slice/devicesSlice";
import allCategories from "../slice/categories/CategorySlice";


export function makeStore() {
  return configureStore({
    reducer: {
        allDevices: allDevices,
        allCategories:allCategories
    },
  });
}

export const store = makeStore();


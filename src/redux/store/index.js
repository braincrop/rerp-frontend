import { configureStore } from '@reduxjs/toolkit'
import allDevices from '../slice/devicesSlice/DevicesSlice'
import allCategories from '../slice/categories/CategorySlice'
import allProducts from '../slice/Products/productSlice'
import allBranch from '../slice/Branch/branchSlice'
import allVendiSplashMachine from '../slice/VendingSplashMachine/VendingSplashMachine'
import allItemCategory from '../slice/ItemCategory/ItemCategorySlice'
import allRestuarantItem from '../slice/RestuarantItem/RestuarantItemSlice'
import allUser from '../slice/Authentication/AuthenticationSlice'
import AllUserManagement from '../slice/UserManegement/UserManagementSlice'
import allTranslation from "../slice/Translation/TranslationSlice";
export function makeStore() {
  return configureStore({
    reducer: {
      allDevices: allDevices,
      allCategories: allCategories,
      allProducts: allProducts,
      allBranch: allBranch,
      allItemCategory: allItemCategory,
      allVendiSplashMachine: allVendiSplashMachine,
      allRestuarantItem: allRestuarantItem,
      allUser: allUser,
      AllUserManagement: AllUserManagement,
      allTranslation:allTranslation
    },
  })
}

export const store = makeStore()

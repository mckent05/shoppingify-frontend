import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  loadingItems: false,
  categories: [],
  list: [],
  itemDetails: {},
};

const itemsSlice = createSlice({
  name: "itemsReducer",
  initialState,
  reducers: {
    handleLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
    loadingDetails: (state, action) => ({
      ...state,
      loadingItems: action.payload,
    }),
    getItems: (state, action) => ({
      ...state,
      list: action.payload.sort((a, b) => a.category.localeCompare(b.category)),
    }),
    getItemDetails: (state, action) => ({
      ...state,
      itemDetails: action.payload,
    }),
    deleteItem: (state, action) => {
      const itemIndex = state.list.findIndex(
        (item) =>
          item.category.name.toLowerCase() ===
          action.payload.category.toLowerCase()
      );
      const newItem = state.list[itemIndex].items.filter(
        (item) => item.id !== action.payload.id
      );
      state.list[itemIndex].items = newItem;
      return {
        ...state,
      };
    },
    addItem: (state, action) => {
      const findCategoryIndex = state.list.findIndex(
        (item) =>
          item.category.name.toLowerCase() ===
          action.payload.data.category.name.toLowerCase()
      );
      if (findCategoryIndex >= 0) {
        const existingItems = state.list[findCategoryIndex].items;
        const newItems = [...existingItems, action.payload.data.items];
        state.list[findCategoryIndex].items = newItems;
        return {
          ...state,
        };
      } else {
        const list = state.list;
        const newList = [
          ...list,
          {
            category: action.payload.data.category,
            items: [action.payload.data.items],
          },
        ];
        return {
          ...state,
          list: newList,
        };
      }
    },
    fetchCategories: (state, action) => ({
      ...state,
      categories: action.payload.sort((a, b) => a.name.localeCompare(b.name)),
    }),
    addNewCategory: (state, action) => {
      const checkCategory = state.categories.filter(
        (el) => el.name.toLowerCase() === action.payload.name.toLowerCase()
      );
      if (checkCategory.length <= 0) {
        return {
          ...state,
          categories: [...state.categories, action.payload],
        };
      }
      return state;
    },
  },
});

export const {
  handleLoading,
  loadingDetails,
  getItems,
  getItemDetails,
  deleteItem,
  addItem,
  fetchCategories,
  addNewCategory,
} = itemsSlice.actions;
export default itemsSlice.reducer;

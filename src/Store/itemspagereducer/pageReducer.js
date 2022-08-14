const GET_ITEMS = "store/itemsreducer/GET_ITEMS";
const FETCH_ITEMS_STATUS = "store/itemsreducer/FETCH_ITEMS_STATUS";
const GET_ITEM_DETAILS = "store/itemsreducer/GET_ITEMS_DETAILS";
const FETCHING_DETAILS = "store/itemsreducer/FETCHING_DETAILS";
const DELETE_ITEM = "store/itemsreducer/DELETE_ITEM";
const ADD_NEW_ITEM = "store/itemsreducer/ADD_NEW_ITEM";
const FETCH_CATEGORY = "store/itemsreducer/FETCH_CATEGORY";
const SEARCH_ITEM = "store/itemsreducer/SEARCH_ITEM";

const initialState = {
  isLoading: false,
  loadingItems: false,
  categories: [],
  list: [],
  itemDetails: {},
  serverStatus: 200,
  itemMessage: "Welcome to Shoppingify",
};

// const handleDeleteItem = (state, payload) => {
//   // const item = state.list.find(
//   //   (item) => item.category.toLowerCase() === payload.category.toLowerCase()
//   // );
//   // item.items.filter((item) => item.id !== payload.id);
//   // return state;
// };

export const handleLoading = (status) => ({
  type: FETCH_ITEMS_STATUS,
  payload: status,
});

export const loadingDetails = (status) => ({
  type: FETCHING_DETAILS,
  payload: status,
});

export const getItems = (items) => ({
  type: GET_ITEMS,
  payload: items,
});

export const getItemDetails = (details) => ({
  type: GET_ITEM_DETAILS,
  payload: details,
});

export const deleteItem = (category, id, message, serverStatus) => ({
  type: DELETE_ITEM,
  payload: { category, id, message, serverStatus },
});

export const addItem = (data) => ({
  type: ADD_NEW_ITEM,
  payload: data,
});

export const fetchCategories = (categories) => ({
  type: FETCH_CATEGORY,
  payload: categories,
});

export const searchItem = (itemName) => ({
  type: SEARCH_ITEM,
  payload: itemName,
});

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS_STATUS:
      return {
        ...state,
        isLoading: action.payload,
      };

    case FETCHING_DETAILS:
      return {
        ...state,
        loadingItems: action.payload,
      };

    case GET_ITEMS:
      return {
        ...state,
        list: action.payload.sort((a, b) =>
          a.category.localeCompare(b.category)
        ),
      };

    case GET_ITEM_DETAILS:
      return {
        ...state,
        itemDetails: action.payload,
      };

    case DELETE_ITEM:
      const itemIndex = state.list.findIndex(
        (item) =>
          item.category.toLowerCase() === action.payload.category.toLowerCase()
      );
      const newItem = state.list[itemIndex].items.filter(
        (item) => item.id !== action.payload.id
      );
      state.list[itemIndex].items = newItem;
      return {
        ...state,
        itemMessage: action.payload.message,
        serverStatus: action.payload.serverStatus,
      };

    case ADD_NEW_ITEM:
      if (action.payload.data) {
        const findCategoryIndex = state.list.findIndex(
          (item) =>
            item.category.toLowerCase() ===
            action.payload.data.category.toLowerCase()
        );
        if (findCategoryIndex > 0) {
          const existingItems = state.list[findCategoryIndex].items;
          const newItems = [...existingItems, action.payload.data.items];
          state.list[findCategoryIndex].items = newItems;
          return {
            ...state,
            itemMessage: action.payload.message,
            serverStatus: action.payload.status,
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
            itemMessage: action.payload.message,
            serverStatus: action.payload.status,
          };
        }
      } else {
        return {
          ...state,
          itemMessage: action.payload.message,
          serverStatus: action.payload.status,
        };
      }

    case FETCH_CATEGORY:
      return {
        ...state,
        categories: action.payload.sort((a, b) => a.name.localeCompare(b.name)),
      };
    case SEARCH_ITEM:
      const g = state.list.forEach((item) => {
        const y = item.items.filter(
          (el) => el.name.toLowerCase() === action.payload.toLowerCase()
        );
        if (y.length >= 1) {
          console.log(item);
        }
      });
      console.log(g);
      return {
        ...state,
        list: state.list.filter((item) =>
          item.items.some(
            (el) => el.name.toLowerCase() === action.payload.toLowerCase()
          )
        ),
      };
    default:
      return state;
  }
};

export default itemsReducer;

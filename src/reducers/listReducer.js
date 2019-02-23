import * as types from '../actions/types';

const initialState = {
    items: [],
    receiveItemsError: null,
};

const ListReducer = (state = initialState, action) => {
    let nextState;

    switch (action.type) {
        case types.RECEIVE_ITEMS:
            return {
                ...state,
                items: action.items,
                receiveItemsError: false,
            };
        case types.RECEIVE_ITEMS_ERROR:
            return {
                ...state,
                items: [],
                receiveItemsError: Date.now(),
            };
        case types.ADD_ITEM:
            return {
                ...state,
                items: [...state.items, action.item],
            };
        case types.ADD_ITEM_ERROR:
            nextState = {
                ...state,
                items: [...state.items],
            };
            for (let [index, item] of Object.entries(state.items)) {
                if (item.uuid === action.item.uuid) {
                    nextState.items.splice(index, 1);
                    break;
                }
            }
            return nextState;
        case types.EDIT_ITEM:
            for (let [index, item] of Object.entries(state.items)) {
                if (item.uuid === action.item.uuid) {
                    state.items[index] = action.item;
                    break;
                }
            }
            return state;
        case types.EDIT_ITEM_ERROR:
            nextState = {
                ...state,
                items: [...state.items],
            };
            for (let [index, item] of Object.entries(nextState.items)) {
                if (item.uuid === action.item.uuid) {
                    nextState.items[index] = action.item;
                    break;
                }
            }
            return nextState;
        case types.DELETE_ITEM:
            nextState = {
                ...state,
                items: [...state.items],
            };
            for (let [index, item] of Object.entries(state.items)) {
                if (item.uuid === action.itemUuid) {
                    nextState.items.splice(index, 1);
                    break;
                }
            }
            return nextState;
        case types.DELETE_ITEM_ERROR:
            return {
                ...state,
                items: [...state.items, action.item],
            };
        default:
            return state;
    }
};

export default ListReducer;

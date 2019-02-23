import todoApi from '../api'
import * as types from './types'

const receiveItems = items => ({
    type: types.RECEIVE_ITEMS,
    items,
});

const receiveItemsError = () => ({
    type: types.RECEIVE_ITEMS_ERROR,
});

const addItemUnsafe = item => ({
    type: types.ADD_ITEM,
    item,
});
const addItemError = item => ({
    type: types.ADD_ITEM_ERROR,
    item,
});

const editItemUnsafe = item => ({
    type: types.EDIT_ITEM,
    item,
});

const editItemError = item => ({
    type: types.EDIT_ITEM_ERROR,
    item,
});

const deleteItemUnsafe = itemUuid => ({
    type: types.DELETE_ITEM,
    itemUuid,
});

const deleteItemError = item => ({
    type: types.DELETE_ITEM_ERROR,
    item,
});

export const getAllItems = () => dispatch => {
    todoApi.getItems().then(items => {
        dispatch(receiveItems(items))
    }).catch(ex => {
        dispatch(receiveItemsError())
    });
};

export const addItem = item => dispatch => {
    dispatch(addItemUnsafe(item));
    todoApi.addItem(item).then(itemId => {
        item.id = itemId;
        // no need to dispatch redux action because this is not a reference to a cloned or extended object
        // the state will silently update and there is no further need to process the newly assigned id from the api
    }).catch(ex => {
        dispatch(addItemError(item))
    });
};

export const editItem = (nextItem, prevItem) => dispatch => {
    dispatch(editItemUnsafe(nextItem));
    todoApi.editItem(nextItem).catch(ex => {
        dispatch(editItemError(prevItem));
    });
};

export const deleteItem = item => dispatch => {
    dispatch(deleteItemUnsafe(item.uuid));
    todoApi.deleteItem(item.uuid).catch(ex => {
        dispatch(deleteItemError(item));
    });
};

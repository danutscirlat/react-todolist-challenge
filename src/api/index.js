import { ToastsStore } from 'react-toasts';

/**
 * Mocking client-server processing
 */
import todoList from './todoList.json'

const TIMEOUT = 500;
const FAIL_MUCH = 0.0; // 1 max success, 0 max fail

let lastId;
for (let item of Object.values(todoList)) {
    if (typeof lastId === 'undefined') lastId = item.id;
    if (item.id > lastId) lastId = item.id;
}
lastId++;

export default {
    getItems: () => {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                if (Math.random() >= FAIL_MUCH) {
                    ToastsStore.error('Error fetching todo list items.');
                    reject('Error loading items.');
                    return null;
                }
                ToastsStore.success('Todo list items loaded.');
                resolve(todoList);
            }, TIMEOUT);
        });
    },

    addItem: item => {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                if (Math.random() >= FAIL_MUCH) {
                    ToastsStore.error('Error adding item to list.');
                    reject('Error adding item.');
                    return null;
                }
                lastId++;
                ToastsStore.success('Item added to list.');
                resolve(lastId);
            }, TIMEOUT);
        });
    },

    editItem: (nextItem) => {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                if (Math.random() >= FAIL_MUCH) {
                    ToastsStore.error('Error editing list item.');
                    reject('Error editing item.');
                    return null;
                }
                ToastsStore.success('List item saved.');
                resolve(nextItem);
            }, TIMEOUT);
        });
    },

    deleteItem: (item) => {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                if (Math.random() > FAIL_MUCH) {
                    ToastsStore.error('Error deleting list item.');
                    reject('Error deleting item.');
                    return null;
                }
                ToastsStore.success('List item deleted.');
                resolve(item);
            }, TIMEOUT);
        });
    },
}

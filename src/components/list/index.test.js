import React from 'react';
import { mount } from 'enzyme';
import List from './index.js';

import todoList from '../../api/todoList.json';

describe('List', () => {
    it('should be defined', () => {
        expect(List).toBeDefined();
    });

    it('edits item', () => {
        const editItemFn = jest.fn();
        const deleteItemFn = jest.fn();

        const list = mount(<List
            items={todoList}
            editItem={editItemFn}
            deleteItem={deleteItemFn}
        />);
        list.find('.button.edit').first().simulate('click');
        list.find('input').simulate('change', { target: { value: 'test' } });
        expect(list.find('input').props().value).toEqual('test');
    });

    it('cancels edit', () => {
        const editItemFn = jest.fn();
        const deleteItemFn = jest.fn();

        const list = mount(<List
            items={todoList}
            editItem={editItemFn}
            deleteItem={deleteItemFn}
        />);
        list.find('.button.edit').first().simulate('click');
        list.find('input').simulate('change', { target: { value: 'test' } });
        list.find('.button.danger').simulate('click');
        expect(list.find('input').length).toEqual(0);
    });

    it('calls editItem', () => {
        const editItemFn = jest.fn();
        const deleteItemFn = jest.fn();

        const list = mount(<List
            items={todoList}
            editItem={editItemFn}
            deleteItem={deleteItemFn}
        />);
        list.find('.button.edit').first().simulate('click');
        list.find('input').simulate('change', { target: { value: 'test' } });
        list.find('.button.info').simulate('click');
        expect(editItemFn).toHaveBeenCalled();
    });
});
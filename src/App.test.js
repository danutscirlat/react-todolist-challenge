import React, { Component } from 'react';
import { mount } from 'enzyme';
import { App } from './App.js';

describe('App', () => {
    it('should be defined', () => {
        expect(App).toBeDefined();
    });

    it('calls getAllItems', () => {
        const getAllItemsFn = jest.fn();

        const app = mount(
            <App
                getAllItems={getAllItemsFn}
            />
        );

        expect(getAllItemsFn).toHaveBeenCalled();
    });

    it('calls addItem', () => {
        const getAllItemsFn = jest.fn();
        const addItemFn = jest.fn();

        const app = mount(
            <App
                getAllItems={getAllItemsFn}
                addItem={addItemFn}
            />
        );

        app.find('input').simulate('change', { target: { value: 'test' } });
        app.find('.button.add').simulate('click');

        expect(addItemFn).toHaveBeenCalled();
    });
});
import React from 'react';
import { mount } from 'enzyme';
import Input from './index.js';

describe('Input', () => {
    it('should be defined', () => {
        expect(Input).toBeDefined();
    });

    it('calls onChange event', () => {
        const onChangeFn = jest.fn();
        const input = mount(
            <Input className='button' onChange={onChangeFn}>Text</Input>
        );
        input.find('input').simulate('change');
        expect(onChangeFn).toHaveBeenCalled();
    });
});
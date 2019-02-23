import React from 'react';
import { mount } from 'enzyme';
import Button from './index.js';

describe('Button', () => {
    it('should be defined', () => {
        expect(Button).toBeDefined();
    });

    it('calls onClick event', () => {
        const onClickFn = jest.fn();
        const button = mount(
            <Button className='button' onClick={onClickFn}>Text</Button>
        );
        button.simulate('click');
        expect(onClickFn).toHaveBeenCalled();
    });
});
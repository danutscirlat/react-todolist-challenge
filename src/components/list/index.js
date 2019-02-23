import React, { Component } from "react";
import { ToastsStore } from 'react-toasts';

import './index.css';
import Button from '../button';
import Input from '../input';

import { extend } from '../../utils';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nextItem: null,
        };
    }

    editItem(item) {
        this.setState({nextItem: extend(item), prevItem: item});
    }

    cancelEdit() {
        this.setState({nextItem: null, prevItem: null});
    }

    saveItem() {
        ToastsStore.info('Editing item...');
        const nextItem = this.state.nextItem;
        const prevItem = this.state.prevItem;
        this.setState({nextItem: null, prevItem: null});
        this.props.editItem(nextItem, prevItem);
    }

    deleteItem(item) {
        ToastsStore.info('Deleting item...');
        this.props.deleteItem(item);
    }

    render() {
        const items = [];

        for (let item of this.props.items) {
            items.push(<tr key={item.uuid}>
                <td>
                    {this.state.nextItem === null || this.state.nextItem.uuid !== item.uuid ?
                        item.name
                        :
                        <Input
                            name='item'
                            onChange={val => {
                                this.setState(state => {
                                    state.nextItem.name = val;
                                    return state;
                                });
                            }}
                            onKeyPress={ev => {
                                if (ev.key !== 'Enter') return false;

                                this.saveItem();
                            }}
                            value={this.state.nextItem.name}
                        />
                    }
                </td>
                <td>
                    {this.state.nextItem === null || this.state.nextItem.uuid !== item.uuid ?
                        <React.Fragment>
                            <Button type='edit' onClick={() => this.editItem(item)}>
                                Edit
                            </Button>
                            <Button type='delete' onClick={() => this.deleteItem(item)}>
                                Delete
                            </Button>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Button type='info' onClick={this.saveItem.bind(this)}>
                                Save
                            </Button>
                            <Button type='danger' onClick={this.cancelEdit.bind(this)}>
                                Cancel
                            </Button>
                        </React.Fragment>
                    }
                </td>
            </tr>);
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th width='66%'>Item</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        );
    }
}

export default List;

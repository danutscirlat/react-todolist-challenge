import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ToastsContainer, ToastsStore } from 'react-toasts';

import './App.css';

import List from './components/list';
import Input from './components/input';
import Button from './components/button';

import { addItem, deleteItem, editItem, getAllItems } from './actions';
import { generateId } from './utils';

export const App = class extends Component {
    constructor(props) {
        super(props);
        this.hasError = false;
        this.failedRetry = false;
        this.state = {
            item: App.getNewItemState(),
            retrying: false,
        };
        this.props.getAllItems();
    }

    static getNewItemState() {
        return {
            id: null,
            uuid: generateId(),
            name: null,
        };
    }

    addItem() {
        if (this.state.item.name === null) return null;

        ToastsStore.info('Adding item...');
        this.props.addItem(this.state.item);
        this.setState({ item: App.getNewItemState() });
    }

    reload() {
        this.failedRetry = false;
        this.setState({ retrying: true });
        ToastsStore.info('Retrying...');
        this.props.getAllItems();
    }

    render() {
        if (this.props.receiveItemsError && this.props.receiveItemsError !== this.hasError) this.failedRetry = true;
        this.hasError = this.props.receiveItemsError;

        const btnDisabled = this.state.retrying && !this.failedRetry;

        return <div className='container'>
            <h1>Todo List</h1>

            <div className='add-item-to-list'>
                <Input
                    name='item'
                    disabled={this.props.receiveItemsError === false ? '' : 'disabled'}
                    onChange={val => {
                        this.setState(state => {
                            state.item.name = val;
                            return state;
                        });
                    }}
                    onKeyPress={ev => {
                        if (ev.key !== 'Enter') return false;

                        this.addItem();
                    }}
                    placeholder='New Item...'
                    value={this.state.item.name === null ? '' : this.state.item.name}
                />
                <Button
                    onClick={this.addItem.bind(this)}
                    type='add'
                >
                    Add
                </Button>
            </div>

            {this.props.receiveItemsError !== null ?
                this.props.receiveItemsError === false ?
                    <List
                        items={this.props.items}
                        editItem={this.props.editItem}
                        deleteItem={this.props.deleteItem}
                    />
                    :
                    <div className='container'>
                        <p><Button type={!btnDisabled ? 'info' : 'disabled'} disabled={!btnDisabled ? '' : 'disabled'} onClick={this.reload.bind(this)}>Retry</Button></p>
                    </div>
                :
                <div className='container'>
                    <p>Loading...</p>
                </div>
            }

            <ToastsContainer store={ToastsStore} />
        </div>;
    }
}

export default connect(
    // map state to props
    state => ({
        items: state.list.items,
        receiveItemsError: state.list.receiveItemsError,
    }),
    // map dispatch to props
    {
        addItem,
        deleteItem,
        editItem,
        getAllItems,
    },
)(App);

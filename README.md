# Todo List React App
In this repository you will find our Peak Activity "Todo List Challenge". This is a application developed in React that hasn't been completed, and we would like you to finish it. All the dependencies you will need to finish this application are already installed. The application uses the [create-react-app](https://github.com/facebook/create-react-app) boilerplate.

### Requirements
1. You must use Redux and Redux Thunk (or Redux Saga).

### What needs to be done
Below are the tasks that need to be completed in order to finish this application.

#### In `src/actions/listActions.js`, the following Redux actions need to be developed:
##### Retrieve List Items Action:
1. Make an HTTP Request to the `Todo List` microservice to retrieve a saved list of items.
2. If the HTTP Request is successful, the list of items should be stored as an array in Redux State.
3. If the HTTP Request was not successful, an error should be rendered on-screen.

##### Add List Item Action:
1. Make an HTTP Request to the `Todo List` microservice to add this item to the database.
2. Without waiting for the HTTP Request Response, add the item to the array stored in Redux State.
3. If the HTTP Request was not successful, an error should be rendered on-screen, and the item should be removed from the array in Redux State.

##### Edit List Item Action:
1. Make an HTTP Request to the `Todo List` microservice to edit the item in the database.
2. Without waiting for the HTTP Request Response, reflect the changes in the array stored in Redux State.
3. If the HTTP Request was not successful, an error should be rendered on-screen, and the edit should be reverted in the array in Redux State.

##### Delete List Item Action:
1. Make an HTTP Request to the `Todo List` microservice to delete the item passed to this action.
2. Without waiting for the HTTP Request Response, delete the item from the array in Redux State.
3. If the HTTP Request was not successful, an error should be rendered on-screen, and the deleted item should be re-added to Redux State.

#### In `src/reducers/listReducer.js` The Reducer all of the actions listed above should use.

#### In `src/list/index.js`
 - The List component needs to loop through an array of items and create a new row in the table for each item.
 - The array of items should be passed in as a prop.
 - The `Edit` and `Delete` buttons need to be hooked up to their appropriate actions.

#### In `src/App.js`
1. Wire-up this component to Redux and return the array of items stored in State as a prop.
2. Pass the array of as a prop to the `List` component.
3. Wire-up the `Input` to hold it's value in State.
4. Wire-up the `Add` button to it's appropriate action.

#### In `src/utils/index.js` Helper functions can be coded and exported.

### Tests
We would like Unit Tests to be written for each of the main components in the application. Below are the locations of where tests need to be written.
1. `src/App.test.js`
2. `src/list/index.test.js`
3. `src/input/index.test.js`
4. `src/button/index.test.js`

### Submission
Please commit the application to a new branch, once completed. After doing so, we will review the application and get back to you shortly.

### Developer Notes
1. Node version used: 8.11.3
2. Built with a 10% random fail rate for API calls to reproduce the error handlers (change this in src/api/index.js:9)
3. Check the console as well for the Redux action logs

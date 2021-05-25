import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import contactActions from './actions';

const items = createReducer([], {
  [contactActions.fetchContactsSuccess]: (_, { payload }) => payload,

  [contactActions.addContactSuccess]: (state, { payload }) => [
    ...state,
    payload,
  ],

  [contactActions.deleteContactSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),

  [contactActions.editContactSuccess]: (state, { payload }) => {
    const newState = state.filter(contact => contact.id !== payload.id);
    return [...newState, payload];
  },
});

const loading = createReducer(false, {
  [contactActions.fetchContactsRequest]: () => true,
  [contactActions.fetchContactsSuccess]: () => false,
  [contactActions.fetchContactsError]: () => false,
  [contactActions.addContactRequest]: () => true,
  [contactActions.addContactSuccess]: () => false,
  [contactActions.addContactError]: () => false,
  [contactActions.deleteContactRequest]: () => true,
  [contactActions.deleteContactSuccess]: () => false,
  [contactActions.deleteContactError]: () => false,
  [contactActions.editContactRequest]: () => true,
  [contactActions.editContactSuccess]: () => false,
  [contactActions.editContactError]: () => false,
});

const filter = createReducer('', {
  [contactActions.changeFilter]: (_, { payload }) => payload,
});

const error = createReducer(null, {});

export default combineReducers({
  items,
  filter,
  loading,
  error,
});

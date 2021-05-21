import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import contactActions from './actions';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const fetchContacts = () => dispatch => {
  dispatch(contactActions.fetchContactsRequest());
  axios
    .get('/contacts')
    .then(({ data }) => dispatch(contactActions.fetchContactsSuccess(data)))
    .catch(error => dispatch(contactActions.fetchContactsError(error)));
};
export const addContact = (name, number) => dispatch => {
  const contact = {
    id: uuidv4(),
    name,
    number,
  };

  dispatch(contactActions.addContactRequest());

  axios
    .post('/contacts', contact)
    .then(({ data }) => dispatch(contactActions.addContactSuccess(data)))
    .catch(error => dispatch(contactActions.addContactError(error)));
};
export const deleteContact = id => dispatch => {
  dispatch(contactActions.deleteContactRequest());

  axios
    .delete(`/contacts/${id}`)
    .then(() => dispatch(contactActions.deleteContactSuccess(id)))
    .catch(error => dispatch(contactActions.deleteContactError(error)));
};

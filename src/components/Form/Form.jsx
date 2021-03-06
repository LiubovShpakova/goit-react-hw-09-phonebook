import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import { getAllContacts } from '../../redux/contacts/selectors';
import { v4 as uuidv4 } from 'uuid';
import { Form, Button } from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
const Styles = styled.div`
  .btn-secondary {
    color: #d1abc4;
  }
  .form-control {
    max-width: 400px;
  }
`;

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const items = useSelector(getAllContacts);
  const dispatch = useDispatch();
  const onSubmit = useCallback(
    (name, number) => {
      dispatch(addContact(name, number));
    },
    [dispatch],
  );
  const nameInputId = uuidv4();
  const numberInputId = uuidv4();

  const createContact = () => {
    const sameName = items.find(
      el => el.name.toLowerCase() === name.toLowerCase(),
    );
    const sameNumber = items.find(el => el.number === number);
    if (sameName || sameNumber) {
      toast.error(`${name} or ${number} is already in contacts`, {
        className: 'error_toast',
      });
      return;
    } else {
      onSubmit(name, number);
    }
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    createContact();
    // console.log(name, number);
    reset();
  };

  return (
    <>
      <Styles>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              id={nameInputId}
              placeholder="Enter contact name"
              name="name"
              value={name}
              onChange={handleChange}
              pattern="^[a-zA-Z??-????-??]+(([' -][a-zA-Z??-????-?? ])?[a-zA-Z??-????-??]*)*$"
              title="?????? ?????????? ???????????????? ???????????? ???? ????????, ??????????????????, ???????? ?? ????????????????. ???????????????? Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan ?? ??. ??."
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Number</Form.Label>
            <Form.Control
              type="text"
              id={numberInputId}
              name="number"
              value={number}
              onChange={handleChange}
              placeholder="Enter contact number"
              pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
              title="?????????? ???????????????? ???????????? ???????????????? ???? 11-12  ???????? ?? ?????????? ?????????????????? ??????????, ??????????????, ????????, ?????????????? ???????????? ?? ?????????? ???????????????????? ?? +"
              required
            />
          </Form.Group>
          <Button variant="secondary" type="submit" className="mb-5">
            Add contact
          </Button>
        </Form>
      </Styles>
      <ToastContainer autoClose={3000} />
    </>
  );
}

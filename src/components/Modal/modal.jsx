import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import { editContact } from '../../redux/contacts/operations';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
const Styles = styled.div`
  .btn-secondary {
    color: #d1abc4;
  }
  .close__button {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;
const modalRoot = document.querySelector('#modal-root');

export default function Modal({ contactEdit, onClose }) {
  const [name, setName] = useState(contactEdit.name);
  const [number, setNumber] = useState(contactEdit.number);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

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
  const nameInputId = uuidv4();
  const numberInputId = uuidv4();

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  const handleSave = () => {
    const updateContact = {
      name: name ? name : contactEdit.name,
      number: number ? number : contactEdit.number,
    };
    dispatch(editContact(contactEdit.id, updateContact));
    onClose(false);
  };
  useEffect(() => {
    setName(name);
    setNumber(number);
  }, [name, number]);

  return createPortal(
    <div className="Overlay" onClick={e => handleBackdropClick(e)}>
      <div className="form__modal">
        <Styles>
          <Form>
            <Button
              variant="secondary"
              type="button"
              onClick={() => onClose(false)}
              className="close__button"
            >
              <AiFillCloseCircle size="20" />
            </Button>
            <Form.Group>
              <Form.Label>Edit contact name</Form.Label>
              <Form.Control
                type="text"
                id={nameInputId}
                placeholder={contactEdit.name}
                name="name"
                value={name}
                onChange={handleChange}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Edit contact number</Form.Label>
              <Form.Control
                type="text"
                id={numberInputId}
                name="number"
                value={number}
                onChange={handleChange}
                placeholder={contactEdit.number}
                pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
                title="Номер телефона должен состоять из 11-12  цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
                required
              />
            </Form.Group>
            <Button variant="secondary" type="button" onClick={handleSave}>
              Save
            </Button>
          </Form>
        </Styles>
      </div>
    </div>,
    modalRoot,
  );
}

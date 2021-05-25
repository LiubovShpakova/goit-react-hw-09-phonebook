import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { deleteContact } from '../../redux/contacts/operations';
import { getVisibleContacts } from '../../redux/contacts/selectors';
import PropTypes from 'prop-types';
import style from './ContactList.module.css';

import styled from 'styled-components';
const Styles = styled.div`
  .btn-secondary {
    color: #d1abc4;
  }
`;

export default function ContactList({ onOpenModal }) {
  const dispatch = useDispatch();
  const items = useSelector(getVisibleContacts);
  const onDeleteContact = useCallback(
    id => {
      dispatch(deleteContact(id));
    },
    [dispatch],
  );

  return (
    items.length > 0 && (
      <ul className={style.contact__container}>
        {items
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(contact => {
            const { id, name, number } = contact;
            return (
              <li className={style.contact_list} key={id}>
                {name}: {number}
                <Styles>
                  <Button
                    variant="secondary"
                    className="ml-1"
                    type="button"
                    onClick={() => onOpenModal(contact)}
                  >
                    <FiEdit size="20" />
                  </Button>
                  <Button
                    variant="secondary"
                    className="ml-1"
                    type="button"
                    onClick={() => onDeleteContact(id)}
                  >
                    <RiDeleteBin7Line size="20" />
                  </Button>
                </Styles>
              </li>
            );
          })}
      </ul>
    )
  );
}

ContactList.propTypes = {
  items: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

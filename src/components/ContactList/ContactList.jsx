import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { deleteContact, fetchContacts } from '../../redux/contacts/operations';
import { getVisibleContacts } from '../../redux/contacts/selectors';
import PropTypes from 'prop-types';
import style from './ContactList.module.css';

import styled from 'styled-components';
const Styles = styled.div`
  .btn-secondary {
    color: #d1abc4;
  }
`;

export default function ContactList() {
  const dispatch = useDispatch();
  const items = useSelector(getVisibleContacts);
  const onDeleteContact = useCallback(
    id => {
      dispatch(deleteContact(id));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    items.length > 0 && (
      <ul className={style.contact__container}>
        {items
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(({ id, name, number }) => {
            return (
              <li className={style.contact_list} key={id}>
                {name}: {number}
                <Styles>
                  <Button
                    variant="secondary"
                    className="ml-2"
                    type="button"
                    onClick={() => onDeleteContact(id)}
                  >
                    Delete
                  </Button>
                </Styles>
              </li>
            );
          })}
      </ul>
    )
  );
}

/*class ContactList extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }
  render() {
    const { items, onDeleteContact } = this.props;
    return (
      items.length > 0 && (
        <ul className={style.contact__container}>
          {items.map(({ id, name, number }) => {
            return (
              <li className={style.contact_list} key={id}>
                {name}: {number}
                <Styles>
                  <Button
                    variant="secondary"
                    className="ml-2"
                    type="button"
                    onClick={() => onDeleteContact(id)}
                  >
                    Delete
                  </Button>
                </Styles>
              </li>
            );
          })}
        </ul>
      )
    );
  }
}

const mapStateToProps = state => ({
  items: getVisibleContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(deleteContact(id)),
  fetchContacts: () => dispatch(fetchContacts()),
});*/

ContactList.propTypes = {
  items: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import contactActions from '../../redux/contacts/actions';
import { getFilter } from '../../redux/contacts/selectors';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

import styled from 'styled-components';
const Styles = styled.div`
  .form-control {
    max-width: 400px;
  }
`;

export default function Filter() {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();
  const onChange = useCallback(
    event => {
      dispatch(contactActions.changeFilter(event.target.value));
    },
    [dispatch],
  );
  return (
    <Styles>
      <h2>Contacts</h2>
      <Form>
        <Form.Group>
          <Form.Label>Find Contacts By Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter contact name"
            value={value}
            onChange={onChange}
          />
        </Form.Group>
      </Form>
    </Styles>
  );
}

Filter.defaultProps = {
  value: '',
};
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

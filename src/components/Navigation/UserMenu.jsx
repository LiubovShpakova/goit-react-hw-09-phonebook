import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import selectors from '../../redux/auth/auth-selectors';
import avatar from './user.png';
import operations from '../../redux/auth/auth-operations';
import styled from 'styled-components';
const Styles = styled.div`
  .btn-secondary,
  h4,
  .avatar {
    color: #d1abc4;
    margin-right: 5px;
  }
  div {
    display: flex;
  }
`;

export default function UserMenu() {
  const name = useSelector(selectors.getUsername);
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch(operations.logOut());
  }, [dispatch]);

  return (
    <>
      <Styles>
        <div>
          <img src={avatar} alt="" width="40" className="avatar" />
          <h4>Welcome, {name}</h4>
          <Button
            variant="secondary"
            className="mr-2"
            type="button"
            onClick={onLogout}
          >
            Logout
          </Button>
        </div>
      </Styles>
    </>
  );
}

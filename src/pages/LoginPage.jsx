import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import operations from '../redux/auth/auth-operations';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
const Styles = styled.div`
  .btn-secondary {
    color: #d1abc4;
  }
`;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };
  const onLogin = event => dispatch(operations.logIn(event));

  const handleSubmit = event => {
    event.preventDefault();
    if (email === '' || password === '') {
      toast.error('It is necessary to fill in the form fields', {
        className: 'error_toast',
      });
      return;
    }
    onLogin({ email, password });

    setEmail('');
    setPassword('');
  };

  return (
    <div className="form__register">
      <Styles>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="secondary" type="submit">
            Log In
          </Button>
        </Form>
      </Styles>
      <ToastContainer autoClose={3000} />
    </div>
  );
}

/*
import { connect } from 'react-redux';
import operations from '../redux/auth/auth-operations';


class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.email === '' || this.state.password === '') {
      toast.error('It is necessary to fill in the form fields', {
        className: 'error_toast',
      });
      return;
    }

    this.props.onLogin(this.state);

    this.setState({ name: '', email: '', password: '' });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="form__register">
        <Styles>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant="secondary" type="submit">
              Log in
            </Button>
          </Form>
        </Styles>
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
const mapDispatchToProps = {
  onLogin: operations.logIn,
};

export default connect(null, mapDispatchToProps)(LoginPage);*/

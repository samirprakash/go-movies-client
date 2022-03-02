import { useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../ui/form-alert.component';
import Input from '../ui/form-input.component';

const Login = ({ handleJWT }) => {
  const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value,
    };
  };

  const [login, setLogin] = useReducer(formReducer, {});
  const [errors, setErrors] = useState([]);
  const [alert, setAlert] = useState({ type: 'd-none', msg: '' });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    let errors = [];

    if (login.email === undefined) {
      errors.push('email');
    }
    if (login.password === undefined) {
      errors.push('password');
    }

    setErrors(errors);
    if (errors.length > 0) {
      return false;
    }

    const requestOptions = { method: 'POST', body: JSON.stringify(login) };
    fetch('http://localhost:4000/v1/signin', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setAlert({ type: 'alert-danger', msg: data.error.message });
        } else {
          setAlert({
            type: 'alert-success',
            msg: 'Changes saved successfully',
          });
          const token = Object.values(data)[0];
          handleJWTChange(token);
          window.localStorage.setItem('token', JSON.stringify(token));
          navigate('/');
        }
      });
  };

  const handleJWTChange = (jwt) => {
    handleJWT(jwt);
  };

  const handleChange = (event) => {
    setLogin({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  return (
    <>
      <h2>Enter your credentials</h2>
      <Alert type={alert.type} msg={alert.msg}></Alert>
      <hr />

      <form className="pt-3" onSubmit={handleSubmit}>
        <Input
          name="email"
          className={hasError('email') ? 'is-invalid' : ''}
          label="Email"
          value={login.email || ''}
          fn={handleChange}
          errorDiv={hasError('email') ? 'text-danger' : 'd-none'}
          errorMsg="Please enter your email address"
        />
        <Input
          name="password"
          className={hasError('password') ? 'is-invalid' : ''}
          label="Password"
          value={login.password || ''}
          fn={handleChange}
          errorDiv={hasError('password') ? 'text-danger' : 'd-none'}
          errorMsg="Please enter your password"
        />
        <hr />
        <button className="btn btn-primary">Save</button>
        <Link to="/" className="btn btn-warning ms-1">
          Cancel
        </Link>
      </form>
    </>
  );
};

export default Login;

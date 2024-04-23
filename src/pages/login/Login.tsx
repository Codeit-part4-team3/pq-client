import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div>
      <h1>Login Page</h1>
      <Link to='/signup'>Signup</Link>
      <br />
      <Link to='/server/1'>Chat</Link>
    </div>
  );
}

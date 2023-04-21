import React, { useState } from 'react';

function Rem() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [lastLoggedInUser, setLastLoggedInUser] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // do something with username and password

    if (rememberMe) {
      localStorage.setItem('lastLoggedInUser', username);
    } else {
      localStorage.removeItem('lastLoggedInUser');
    }
  }

  // Check if there is a last logged in user and update the state
  React.useEffect(() => {
    const lastUser = localStorage.getItem('lastLoggedInUser');
    if (lastUser) {
      setLastLoggedInUser(lastUser);
      setUsername(lastUser);
    }
  }, []);

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
      </div>
      <div>
        <label htmlFor="remember-me">
          <input type="checkbox" id="remember-me" checked={rememberMe} onChange={handleRememberMeChange} />
          Remember me
        </label>
      </div>
      <button type="submit">Login</button>
      {lastLoggedInUser && (
        <div>
          Last logged in user: {lastLoggedInUser}
        </div>
      )}
    </form>
  );
}

export default Rem;

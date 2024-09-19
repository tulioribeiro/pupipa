## Functional Requirements

### User Registration:

- [ ] The system must allow a user to register using their email and a password.
- [ ] The password must be stored securely (hashed).
- [ ] The system must check if the email is already in use before allowing registration.
- [ ] Upon successful registration, the system should return a success message.

### User Login:

- [ ] The system must allow a user to log in using their email and password.
- [ ] The system must validate the email and password combination.
- [ ] Upon successful login, the system must return a JWT token that can be used for authenticated requests.

### Password Security:

The system must enforce a minimum password length (e.g., 8 characters).
Passwords must be hashed and stored securely using a secure hashing algorithm (e.g., bcrypt).

### Token-based Authentication:

- [ ] The system must generate a JWT token after a successful login.
- [ ] The token must have an expiration time (e.g., 1 hour).
- [ ] The system must verify the token in all subsequent authenticated requests.

Profile Management:

- [ ] The user must be able to view their profile information (email, registration date).
- [ ] The user must be able to update their password.

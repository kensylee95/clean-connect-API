
### CLEAN CONNECT Authentication API Overview

#### Base URL
```
http://localhost:8000/api
```

#### Endpoints

1. **User Registration**
   - **Endpoint**: `/post/register/user`
   - **Method**: `POST`
   - **Description**: Registers a new user, sends a verification email, and saves the user's information.
   - **Request Body**:
     ```json
     {
       "fullName": "string",
       "email": "string",
       "password": "string",
       "phoneNumber": "string",
       "role": "string"  // "admin", "provider", "customer"
     }
     ```
   - **Responses**:
     - `201 Created`: User successfully registered, and a verification email was sent.
     - `500 Internal Server Error`: Various Firebase authentication errors, such as invalid email, email already exists, weak password, network issues, or other unknown errors.

2. **User Login**
   - **Endpoint**: `/post/login/user`
   - **Method**: `POST`
   - **Description**: Authenticates a user and provides a session if credentials are valid.
   - **Request Body**:
     ```json
     {
       "email": "string",
       "password": "string"
     }
     ```
   - **Responses**:
     - `200 OK`: User successfully logged in and session created.
     - `401 Unauthorized`: Authentication failed (incorrect credentials).
     - `422 Unprocessable Entity`: Email not verified.

3. **Email Verification**
   - **Endpoint**: `/get/verify/email`
   - **Method**: `GET`
   - **Description**: Handles email verification and password reset processes based on the mode.
   - **Query Parameters**:
     - `mode`: `"verifyEmail" | "resetPassword"`
     - `oobCode`: `string`
   - **Responses**:
     - **For `verifyEmail` mode**:
       - `200 OK`: Email successfully verified, and the user is notified.
       - `400 Bad Request`: Missing required parameters or invalid request.
       - `500 Internal Server Error`: Error occurred during verification.
     - **For `resetPassword` mode**:
       - `302 Found`: Redirects the user to the front-end route for password reset, including the `oobCode` as a query parameter.
       - `400 Bad Request`: Missing required parameters or invalid request.
       - `500 Internal Server Error`: Error occurred during the password reset process.

4. **Request Password Reset Email**
   - **Endpoint**: `/post/send/reset/email`
   - **Method**: `POST`
   - **Description**: Sends an email with a password reset link.
   - **Request Body**:
     ```json
     {
       "email": "string"
     }
     ```
   - **Responses**:
     - `200 OK`: A reset email has been sent if an account exists for the provided email.
     - `500 Internal Server Error`: Error occurred while sending the reset email.

5. **Password Reset**
   - **Endpoint**: `/post/reset/password`
   - **Method**: `POST`
   - **Description**: Resets the user's password using a confirmation code and a new password.
   - **Request Body**:
     ```json
     {
       "confirmationCode": "string",
       "newPassword": "string"
     }
     ```
   - **Responses**:
     - `200 OK`: Password successfully reset.
     - `500 Internal Server Error`: Error occurred during the password reset process.

6. **User Sign-Out**
   - **Endpoint**: `/user/sign-out`
   - **Method**: `GET`
   - **Description**: Signs out the currently authenticated user and destroys their session.
   - **Responses**:
     - `200 OK`: User successfully signed out.
     - `500 Internal Server Error`: Error occurred while signing out.

7. **User Dashboard**
   - **Endpoint**: `/get/user/dashboard`
   - **Method**: `GET`
   - **Description**: Retrieves the dashboard data for the authenticated user.
   - **Responses**:
     - `200 OK`: Returns dashboard data.
     - `401 Unauthorized`: User not authenticated.

#### Security
- **Authentication**: The API uses Firebase for authentication, and session management is implemented for user sessions. 

#### Error Handling
- **Structured Error Responses**: The API provides structured error responses with appropriate HTTP status codes and messages, including handling Firebase-specific errors and general errors. Errors are logged using `Winston` for tracking and debugging purposes.

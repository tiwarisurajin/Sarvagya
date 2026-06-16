Auth Technical Blueprint

---

Module

Auth

---

Purpose

This document defines the technical implementation decisions for the Auth module.

Unlike the business documentation, this document explains HOW authentication should work.

---

Authentication Strategy

Authentication Method:

- JWT (JSON Web Tokens)

Authentication Model:

- Stateless Access Tokens
- Stateful Refresh Tokens stored in the database

---

Token Strategy

Access Token

Purpose:

Authenticate API requests.

Lifetime:

15 minutes

Storage:

Client-side.

Rules:

- Must expire automatically.
- Cannot be revoked individually.
- Must contain minimal claims.

Claims:

- sub (user_id)
- type = access
- exp
- iat

---

Refresh Token

Purpose:

Maintain persistent sessions.

Lifetime:

30 days

Storage:

Database

Rules:

- Revocable
- Expirable
- Tied to a user session
- Multiple active refresh tokens allowed

Claims:

- sub (user_id)
- type = refresh
- exp
- iat

---

Session Strategy

Session Model:

Multiple sessions per user.

Examples:

- Laptop
- Mobile
- Tablet

Each session receives its own refresh token.

---

Logout Strategy

Supported:

Logout Current Session

Revokes only the current refresh token.

---

Logout All Sessions

Future Enhancement.

Revokes every active refresh token belonging to the user.

---

Password Policy

Minimum Length:

8 characters

Requirements:

- At least one letter
- At least one number

Optional:

- Special characters
- Uppercase characters

Validation occurs during registration and password changes.

---

User Status Rules

Authentication behaviour:

Active + Verified:
Allowed

Active + Unverified:
Allowed limited access

Inactive + Verified:
Denied

Inactive + Unverified:
Denied

Superuser:
Bypasses normal restrictions where appropriate.

---

Email Verification

Verification Token Expiry:

24 hours

Verification Token Rules:

- Single use
- Invalid after expiration
- Invalid after successful verification

Resend Verification Rules:

- Allowed
- Cooldown: 5 minutes

---

Password Reset

Reset Token Expiry:

1 hour

Rules:

- Single use
- Invalid after expiration
- Invalid after successful reset

After successful reset:

- Existing reset token becomes invalid.
- User may continue existing sessions in V1.

Future Enhancement:

Force logout of all sessions after password reset.

---

Authorization Dependencies

get_current_user

Purpose:

Return the authenticated user.

Raises:

- InvalidTokenError
- UserNotFoundError

---

get_current_active_user

Purpose:

Ensure the authenticated user is active.

Raises:

- InactiveUserError

---

get_current_verified_user

Purpose:

Ensure the authenticated user has verified their email.

Raises:

- UnverifiedUserError

---

require_superuser

Purpose:

Restrict access to administrative resources.

Raises:

- InsufficientPermissionsError

---

Database Relationships

User

├── RefreshToken (One-to-Many)

├── PasswordResetToken (One-to-Many)

└── EmailVerificationToken (One-to-Many)

---

Error Handling Matrix

Invalid Credentials:
401 Unauthorized

Invalid Access Token:
401 Unauthorized

Expired Access Token:
401 Unauthorized

Expired Refresh Token:
401 Unauthorized

Revoked Refresh Token:
401 Unauthorized

Email Already Registered:
409 Conflict

Username Already Taken:
409 Conflict

Inactive Account:
403 Forbidden

Unverified Account:
403 Forbidden

Invalid Verification Token:
400 Bad Request

Expired Verification Token:
400 Bad Request

Invalid Reset Token:
400 Bad Request

Expired Reset Token:
400 Bad Request

---

Security Decisions

- Passwords are hashed using bcrypt.
- Secrets are stored in environment variables.
- Access tokens expire automatically.
- Refresh tokens are revocable.
- Verification tokens expire.
- Reset tokens expire.
- Sensitive endpoints require authentication.
- Error messages must not leak sensitive information.

---

Observability

Metrics to Monitor:

- Registration Success Rate
- Registration Failure Rate
- Login Success Rate
- Login Failure Rate
- Refresh Token Usage
- Verification Completion Rate
- Password Reset Requests
- Password Reset Completion Rate

---

Implementation Order

1. models.py
2. schemas.py
3. repository.py
4. tokens.py
5. service.py
6. dependencies.py
7. router.py
8. tests.py

---

Status

Version: V1

Status: Approved for Implementation

Last Updated: 2026

---

Guiding Principle

Authentication should maximize security without creating unnecessary friction for legitimate users.
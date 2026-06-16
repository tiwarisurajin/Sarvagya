Auth Module Documentation

---

Module Name

Auth

---

Purpose

The Auth module is responsible for authentication and identity verification within Sarvagya.

Its purpose is to establish trust between users and the platform by securely identifying users and controlling access to protected resources.

Auth owns authentication workflows and authentication-related artifacts.

It does not own user profiles or user account information.

---

Vision

Authentication should feel effortless for legitimate users and difficult for malicious actors.

Users should be able to:

- Create an account easily.
- Sign in confidently.
- Stay logged in securely.
- Recover access when necessary.
- Trust that their credentials and sessions are protected.

Auth should become an invisible layer of trust throughout the Sarvagya experience.

---

Goals

- Provide secure authentication.
- Support persistent user sessions.
- Enable password recovery.
- Verify ownership of email addresses.
- Prevent unauthorized access.
- Provide reusable authorization mechanisms.
- Create a foundation capable of supporting future growth.

---

Business Responsibilities

The Auth module owns:

- User registration
- User login
- User logout
- Access token issuance
- Refresh token issuance
- Access token renewal
- Password change
- Forgot password flow
- Password reset flow
- Email verification
- Verification email resend
- Current authenticated user resolution
- Authorization dependencies

---

Non-Responsibilities

The Auth module must never own:

- User profiles
- User preferences
- Avatar management
- Username changes
- Email changes
- Notification settings
- Content ownership
- Publishing workflows
- Billing
- Analytics
- Workspace management

These responsibilities belong to their respective modules.

---

Founder Decisions

Registration

Users can create accounts using:

- Email
- Username
- Password

Registration is open to everyone.

---

Email Verification

Email verification is mandatory.

Users must verify ownership of their email address before receiving full access to Sarvagya.

---

Persistent Sessions

Users should remain authenticated across browser sessions.

Sarvagya will achieve this using refresh tokens.

---

Password Recovery

Users who forget their password must be able to regain access securely.

---

Password Changes

Authenticated users can change their passwords.

---

Social Authentication

Social authentication is excluded from Version 1.

Potential future providers include:

- Google
- GitHub
- LinkedIn

---

Authentication Strategy

Sarvagya uses JWT-based authentication.

Authentication relies on:

- Short-lived Access Tokens
- Long-lived Refresh Tokens

---

User Flows

Registration Flow

User registers
↓
Account created
↓
Verification token generated
↓
Verification email sent
↓
User verifies email
↓
Account activated

---

Login Flow

User submits credentials
↓
Credentials validated
↓
Access token generated
↓
Refresh token generated
↓
Tokens returned
↓
User authenticated

---

Refresh Flow

Access token expires
↓
Refresh token submitted
↓
Refresh token validated
↓
New access token generated
↓
User session continues

---

Logout Flow

User requests logout
↓
Refresh token revoked
↓
Session terminated

---

Forgot Password Flow

User requests password reset
↓
Reset token generated
↓
Reset email sent
↓
User submits new password
↓
Password updated
↓
Reset token invalidated

---

Email Verification Flow

Verification token generated
↓
Verification email sent
↓
User verifies ownership
↓
Email marked as verified

---

Routes

Public Routes

POST /auth/register

Purpose:
Register a new user.

---

POST /auth/login

Purpose:
Authenticate a user.

---

POST /auth/refresh

Purpose:
Issue a new access token.

---

POST /auth/forgot-password

Purpose:
Begin password recovery.

---

POST /auth/reset-password

Purpose:
Reset a forgotten password.

---

POST /auth/verify-email

Purpose:
Verify email ownership.

---

POST /auth/resend-verification

Purpose:
Resend email verification instructions.

---

Protected Routes

GET /auth/me

Purpose:
Retrieve the currently authenticated user.

---

PATCH /auth/change-password

Purpose:
Allow authenticated users to change passwords.

---

POST /auth/logout

Purpose:
Terminate the current session.

---

Database Ownership

Auth owns authentication artifacts.

Auth does not own the User entity.

---

RefreshToken

Purpose:

Maintain persistent user sessions.

Fields:

- id
- user_id
- token
- expires_at
- is_revoked
- created_at

Relationships:

- Belongs to User

Business Rules:

- Revoked tokens cannot be reused.
- Expired tokens are invalid.

---

PasswordResetToken

Purpose:

Support password recovery.

Fields:

- id
- user_id
- token
- expires_at
- used
- created_at

Relationships:

- Belongs to User

Business Rules:

- Single use only.
- Invalid after expiration.
- Invalid after successful reset.

---

EmailVerificationToken

Purpose:

Verify ownership of email addresses.

Fields:

- id
- user_id
- token
- expires_at
- used
- created_at

Relationships:

- Belongs to User

Business Rules:

- Single use only.
- Invalid after successful verification.
- Invalid after expiration.

---

External Dependencies

Internal Dependencies:

- users
- core
- db

External Services:

- Email delivery provider (future)

Possible providers:

- Resend
- SendGrid
- Amazon SES

---

Authorization Rules

Public Users:

- Can register.
- Can login.
- Can recover passwords.
- Can verify email addresses.

Authenticated Users:

- Can logout.
- Can change passwords.
- Can retrieve current identity.

Verified Users:

- Required for full Sarvagya access.

Inactive Users:

- Cannot authenticate.

Administrators:

- Governed by authorization dependencies.

---

Business Rules

- Email addresses must be unique.
- Usernames must be unique.
- Passwords are never stored in plain text.
- Verification tokens expire.
- Verification tokens are single-use.
- Reset tokens expire.
- Reset tokens are single-use.
- Refresh tokens expire.
- Revoked sessions cannot be reused.
- Unverified users have limited access.
- Inactive users cannot authenticate.

---

Security Considerations

- Passwords are hashed before persistence.
- Secrets are stored in environment variables.
- Access tokens expire.
- Refresh tokens expire.
- Verification tokens expire.
- Reset tokens expire.
- Sensitive operations require authentication.
- Sessions can be revoked.

---

Error Scenarios

Examples include:

- Invalid credentials
- User not found
- Email already registered
- Username already taken
- Expired refresh token
- Revoked refresh token
- Expired verification token
- Invalid verification token
- Expired reset token
- Invalid reset token
- Unverified account
- Inactive account

Expected Behaviour:

Return secure, user-friendly errors without exposing sensitive information.

---

Observability

Metrics worth monitoring:

- Successful registrations
- Failed registrations
- Successful logins
- Failed logins
- Password reset requests
- Password reset completions
- Verification emails sent
- Verification completions
- Refresh token usage
- Logout events

---

Future Enhancements

Excluded from Version 1:

- Google Login
- GitHub Login
- LinkedIn Login
- Two-Factor Authentication (2FA)
- Passkeys / WebAuthn
- Device Management
- Session Dashboard
- Login History
- Suspicious Login Detection

---

Relationship with Other Modules

Users owns:

- User entity
- User profiles
- Preferences
- Username changes
- Email changes

Auth owns:

- Authentication
- Session management
- Token management
- Identity verification

---

Version Information

Version:
V1

Status:
Approved for Implementation

Owner:
Sarvagya Team

Last Updated:
2026

---

Guiding Principle

Auth exists to answer one question:

"Who are you, and can you access this resource?"
Users Technical Blueprint

---

Module

Users

---

Purpose

This document defines the technical implementation decisions for the Users module.

Unlike the business documentation, this document explains HOW user accounts and profiles should work.

---

User Entity Strategy

The User entity is the central entity of Sarvagya.

Every authenticated action within the platform eventually traces back to a User.

Examples:

- Content ownership
- Publishing activities
- Workspace memberships
- Authentication artifacts

---

User Model

User

Purpose:

Represents an individual using Sarvagya.

Fields:

id

- UUID
- Primary Key

email

- String
- Unique
- Indexed
- Required

username

- String
- Unique
- Indexed
- Required

full_name

- String
- Nullable

hashed_password

- String
- Required

avatar_url

- String
- Nullable

timezone

- String
- Default: UTC

locale

- String
- Default: en

is_active

- Boolean
- Default: True

is_verified

- Boolean
- Default: False

is_superuser

- Boolean
- Default: False

created_at

- DateTime
- Automatically generated

updated_at

- DateTime
- Automatically updated

last_login_at

- DateTime
- Nullable

---

Relationships

User

1:N RefreshToken

1:N PasswordResetToken

1:N EmailVerificationToken

1:N Content

1:N PublishJob

M:N Workspace

---

Username Rules

Requirements:

- Unique
- Case insensitive uniqueness
- 3–30 characters

Allowed Characters:

- Letters
- Numbers
- Underscores

Disallowed:

- Spaces
- Special symbols

Reserved Usernames:

Examples:

admin
support
root
system
sarvagya

Future additions allowed.

---

Email Rules

Requirements:

- Unique
- Valid email format
- Case insensitive uniqueness

Changes:

- Managed by Users module
- Verification delegated to Auth

---

Full Name Rules

Requirements:

- Optional

Maximum Length:

100 characters

---

Avatar Strategy

Avatar uploads are optional.

Default Behaviour:

Use generated default avatar if none exists.

Storage:

External object storage.

Future Providers:

- AWS S3
- Cloudinary

Only avatar URL is stored in the database.

---

Preferences Strategy

Initial Preferences:

timezone
locale
notification settings

V1 Strategy:

Preferences stored directly on User.

Future Strategy:

Separate UserPreferences table if complexity grows.

---

Account Status Rules

Active + Verified

Full access.

---

Active + Unverified

Limited access.

---

Inactive + Verified

Access denied.

---

Inactive + Unverified

Access denied.

---

Superuser

Administrative privileges.

---

Account Deletion Strategy

Version 1:

Soft Delete.

Implementation:

Set:

is_active = False

Deleted accounts:

- Cannot authenticate.
- Cannot access protected resources.

Future Enhancements:

Permanent deletion workflows.

---

Authorization Rules

Authenticated Users:

Can access and modify their own data.

Administrators:

Future administrative controls.

Public Users:

No access.

---

Validation Rules

Email:

Validated using Pydantic.

Username:

Validated using Pydantic.

Profile Updates:

Only allowed fields may be modified.

Protected Fields:

Cannot be modified through normal profile updates:

- id
- is_active
- is_verified
- is_superuser
- created_at
- updated_at

---

Error Handling Matrix

User Not Found
→ 404

Email Already Exists
→ 409

Username Already Exists
→ 409

Invalid Email Format
→ 422

Invalid Username
→ 422

Unauthorized Access
→ 401

Forbidden Operation
→ 403

Inactive Account
→ 403

---

Observability

Metrics Worth Tracking

- User registrations
- Active users
- Profile updates
- Email changes
- Username changes
- Account deletion requests
- Avatar uploads

---

Future Enhancements

Excluded From V1

- Public profiles
- User activity history
- Privacy controls
- Account export
- Profile badges
- Social features
- Account restoration dashboard

---

Implementation Order

1. User SQLAlchemy Model

2. User Pydantic Schemas

3. User Repository

4. User Service

5. User Router

6. User Tests

---

Status

Version: V1

Status: Approved for Implementation

Last Updated: 2026

---

Guiding Principle

The Users module should represent the people using Sarvagya while preserving data integrity, ownership, and future scalability.
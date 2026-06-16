Users Module Documentation

---

Module Name

Users

---

Purpose

The Users module is responsible for representing and managing the people who use Sarvagya.

It owns user account information, user profiles, personal preferences, and account-level settings.

Users answers the question:

"Who is this person beyond authentication?"

---

Vision

Users should have complete control over their account information and personal experience within Sarvagya.

The Users module should provide a simple, reliable, and user-centric account management experience.

---

Goals

- Maintain user account information.
- Support profile management.
- Allow users to customize their experience.
- Enable future expansion into teams and workspaces.
- Serve as the central identity representation across Sarvagya.

---

Business Responsibilities

The Users module owns:

- User profiles
- User account information
- Profile updates
- Username management
- Email address changes
- Avatar management
- User preferences
- Notification preferences
- Timezone settings
- Locale settings
- Account deletion requests

---

Non-Responsibilities

The Users module must never own:

- Authentication
- Login
- Logout
- Password reset
- Email verification mechanisms
- Token management
- Publishing workflows
- AI generation
- Billing
- Analytics

These responsibilities belong to their respective modules.

---

Founder Decisions

Usernames

Every user must have a unique username.

Usernames may be used for future public identities and workspace collaboration.

---

Email Addresses

Every user must have a unique email address.

Email changes are owned by the Users module.

Email ownership verification is delegated to the Auth module.

---

Avatars

Users may upload profile pictures.

Avatar uploads are optional.

A default avatar should be used when none is provided.

---

Preferences

Users can customize their experience.

Examples include:

- Timezone
- Locale
- Notification preferences

---

Account Deletion

Users can request account deletion.

The exact deletion strategy will be defined in the technical blueprint.

---

User Flows

View Profile Flow

Authenticated User
↓
Requests profile
↓
Profile returned

---

Update Profile Flow

Authenticated User
↓
Submits changes
↓
Validation performed
↓
Profile updated

---

Change Email Flow

Authenticated User
↓
Requests email change
↓
Auth verifies new email ownership
↓
Email updated

---

Change Username Flow

Authenticated User
↓
Submits new username
↓
Uniqueness validated
↓
Username updated

---

Delete Account Flow

Authenticated User
↓
Requests deletion
↓
Deletion policy executed
↓
Account deactivated or removed

---

Routes

GET /users/me

Purpose:
Retrieve the current user's profile.

---

PATCH /users/me

Purpose:
Update profile information.

---

DELETE /users/me

Purpose:
Request account deletion.

---

POST /users/avatar

Purpose:
Upload or update avatar.

---

GET /users/preferences

Purpose:
Retrieve user preferences.

---

PATCH /users/preferences

Purpose:
Update user preferences.

---

PATCH /users/change-email

Purpose:
Initiate email address change.

---

PATCH /users/change-username

Purpose:
Update username.

---

Database Ownership

Users owns the User entity.

---

User

Purpose:

Represents a Sarvagya user.

Core Information:

- Identity
- Profile
- Preferences
- Status

Relationships:

- Auth Tokens
- Content Ownership
- Publishing Activities
- Workspace Memberships

---

External Dependencies

Internal Dependencies:

- auth
- core
- db

External Services:

- Avatar storage provider (future)

Examples:

- AWS S3
- Cloudinary

---

Authorization Rules

Authenticated Users:

- Can view their own profiles.
- Can update their own profiles.
- Can manage their own preferences.

Administrators:

- Future enhancement.

Public Users:

- Cannot access Users endpoints.

---

Business Rules

- Email addresses must be unique.
- Usernames must be unique.
- Users may only modify their own accounts.
- Default preferences should exist.
- Avatar uploads are optional.
- Deleted accounts cannot authenticate.

---

Future Enhancements

Excluded from Version 1:

- Public profiles
- User blocking
- User follow system
- Account export
- Advanced privacy controls
- User activity history

---

Relationship with Other Modules

Users owns:

- User entity
- Profiles
- Preferences
- Email changes
- Username changes

Auth owns:

- Authentication
- Password management
- Identity verification
- Token management

Content owns:

- User-created content.

Publishing owns:

- Content distribution activities.

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

Users exists to represent and manage the people who use Sarvagya while providing them ownership and control over their account experience.
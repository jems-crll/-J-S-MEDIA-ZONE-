# Security Specification for j s Media

## Data Invariants
- Site settings must always have a company name and contact info.
- Team members must have a name, role, and image URL.
- Only authenticated admins can modify site data.
- The bootstrapped admin is javedsayyad93@gmail.com.

## The "Dirty Dozen" Payloads (Attacks)
1. **Unauthenticated Write**: Attempting to update contact info without being logged in.
2. **Non-Admin Write**: Authenticated user (non-admin) trying to delete a team member.
3. **Invalid Email Format**: Trying to set an invalid email in site settings.
4. **Massive String Injection**: Injecting a 1MB string into the company name.
5. **Field Poisoning**: Adding a `hiddenRole: 'hacker'` field to a team member document.
6. **ID Poisoning**: Creating a team member with a junk ID like `../../secrets`.
7. **Bypassing Identity**: Trying to change the `ownerId` of a document (though we don't use ownerId here as it's global config).
8. **Null Field Injection**: Trying to set `companyName: null`.
9. **State Shortcutting**: (Not applicable here as we don't have complex states).
10. **Admin Privilege Escalation**: A user trying to add themselves to an `admins` collection.
11. **PII Leak**: (Not applicable yet, but we'll isolate settings).
12. **System Field Modification**: (Not applicable yet).

## Rule Primitives
- `isAdmin()`: Checks if `request.auth.token.email == "javedsayyad93@gmail.com" && request.auth.token.email_verified == true`.
- `isValidSiteSettings(data)`: Validates the shape of site settings.
- `isValidTeamMember(data)`: Validates the shape of a team member.

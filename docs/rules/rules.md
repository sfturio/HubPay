# HubPay – Coding Rules (Simplified)

These are lightweight rules to keep the project clean, readable, and professional.
This is a **portfolio project**, so the goal is **good engineering practices without over-engineering**.

---

# 1. General Principles

* Prefer **clarity over clever code**
* Use **descriptive names**
* Keep **methods small**
* Keep **classes focused on one responsibility**
* Avoid unnecessary complexity or abstractions

If the code is easy to read, it is usually good code.

---

# 2. Architecture

Project structure:

```
src/
  HubPay.API
  HubPay.Application
  HubPay.Domain
  HubPay.Infrastructure

tests/
  HubPay.UnitTests
  HubPay.IntegrationTests
```

Layer responsibilities:

**Domain**

* entities
* business rules
* value objects
* enums

**Application**

* use cases
* orchestration of domain logic

**Infrastructure**

* database
* repositories
* external integrations

**API**

* controllers
* HTTP endpoints
* request/response handling

Controllers should stay **thin** and call application use cases.

---

# 3. Domain Rules

The domain is the **source of truth for business rules**.

Entities should control their own behavior.

Bad:

```
payment.Status = Paid
```

Good:

```
payment.MarkAsPaid()
```

Important concepts should use **value objects** when appropriate.

Examples:

```
Money
Email
Document
```

---

# 4. REST API Structure

Follow simple REST conventions.

Examples:

```
POST   /payments
GET    /payments/{id}
GET    /payments
POST   /payments/{id}/authorize
POST   /payments/{id}/cancel
```

Use clear resource names and predictable endpoints.

Use proper HTTP status codes:

```
200 OK
201 Created
400 Bad Request
401 Unauthorized
404 Not Found
500 Internal Server Error
```

---

# 5. Security Basics

Even for a portfolio project, follow basic security practices:

* Never commit secrets to the repository
* Do not log API keys or sensitive values
* Validate request inputs
* Authenticate merchants using API keys

Secrets should be stored in:

```
environment variables
```

---

# 6. Error Handling

Use `DomainException` for business rule violations.

Examples:

* invalid payment transition
* invalid amount

The API should return **clean error responses** instead of stack traces.

---

# 7. Logging

Log useful events such as:

* payment creation
* payment status changes
* webhook failures
* unexpected errors

Do not log secrets.

---

# 8. Testing

Focus tests on **business behavior**.

Examples:

* payment starts as pending
* payment cannot be paid before authorization
* money cannot be zero or negative

Tests should verify **rules, not implementation details**.

---

# 9. Simplicity First

Because this is a portfolio project:

* avoid unnecessary design patterns
* avoid premature abstractions
* keep the architecture understandable
* prefer straightforward solutions

The goal is a **clean, realistic backend**, not an over-engineered system.

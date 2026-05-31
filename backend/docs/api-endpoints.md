# API Graveyard - API Documentation

## Base URL

```txt
http://localhost:5000/api/v1
```

---

# Authentication

## Register User

### POST

```http
/auth/register
```

### Request Body

```json
{
  "username": "Anuj",
  "email": "anuj@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "message": "User registered successfully",
  "user": {}
}
```

---

## Login User

### POST

```http
/auth/login
```

### Request Body

```json
{
  "email": "anuj@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

---

# API Registry

## Get All APIs

### GET

```http
/apis
```

### Query Params

```txt
search
category
officialStatus
page
limit
```

Example:

```http
/apis?search=stripe&page=1&limit=10
```

---

## Get Single API

### GET

```http
/Apis/:id
```

---

## Create API

### POST

```http
/apis
```

### Protected Route

Headers:

```txt
Authorization: Bearer JWT_TOKEN
```

### Request Body

```json
{
  "name": "Stripe",
  "slug": "stripe",
  "description": "Payments API",
  "category": "Payments",
  "websiteUrl": "https://stripe.com",
  "docsUrl": "https://docs.stripe.com",
  "company": "Stripe",
  "pricingModel": "Freemium",
  "officialStatus": "Stable"
}
```

---

## Trending APIs

### GET

```http
/apis/trending
```

Returns top APIs sorted by:

```txt
reviewCount DESC
averageRating DESC
```

---

# Reviews

## Create Review

### POST

```http
/apis/:id/reviews
```

### Protected Route

Request Body:

```json
{
  "rating": 5,
  "title": "Excellent API",
  "content": "Very developer friendly",
  "painLevel": 1,
  "isComplaint": false
}
```

---

## Get Reviews

### GET

```http
/apis/:id/reviews
```

### Response

```json
{
  "averageRating": 4.5,
  "reviewCount": 10,
  "reviews": []
}
```

---

# Status Reports

## Create / Update Status Report

### POST

```http
/apis/:id/status-reports
```

### Protected Route

Request Body:

```json
{
  "status": "Deprecated",
  "evidenceUrl": "https://example.com",
  "note": "Official announcement"
}
```

If the user already submitted a report, the existing report is updated.

---

## Get Status Reports

### GET

```http
/apis/:id/status-reports
```

### Response

```json
{
  "communityStatus": "Deprecated",

  "voteBreakdown": {
    "Deprecated": 5,
    "Dead": 2
  },

  "reports": []
}
```

---

# Status Values

```txt
Active
Stable
Unstable
Deprecated
Dead
Maintenance
Acquired
Rate-Limited
```

---

# Protected Routes

Require:

```txt
Authorization: Bearer JWT_TOKEN
```

Protected Endpoints:

```txt
POST /apis
POST /apis/:id/reviews
POST /apis/:id/status-reports
```

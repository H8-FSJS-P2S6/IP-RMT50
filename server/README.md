# Documentation

## Endpoints
List of available endpoints:
- `GET /allChannels`
- `GET /channel/:channelId`
- `POST /channel`
- `PUT /channel/:channelId`
- `DELETE /channel/:channelId`

- `POST /login`
- `POST /login/google`

## 1. `GET /cuisine`

*Response (200 - OK)*

```json
[
    {
        "id": 1,
        "name": "Margherita Pizza",
        "description": "Classic pizza with tomato, mozzarella, and basil",
        "price": 12000,
        "imgUrl": "https://example.com/margherita.jpg",
        "createdAt": "2024-06-24T09:53:32.238Z",
        "updatedAt": "2024-06-24T09:53:32.238Z",
        "CategoryId": 1,
        "AuthorId": 3,
        "User": {
            "username": "fingram2",
        },
        "Category" : {
            "name" : "Italian"
            }
    },
    {
        "id": 2,
        "name": "Tacos al Pastor",
        "description": "Marinated pork tacos with pineapple",
        "price": 10,
        "imgUrl": "https://example.com/alpastor.jpg",
        "createdAt": "2024-06-24T09:53:32.238Z",
        "updatedAt": "2024-06-24T09:53:32.238Z",
        "CategoryId": 2,
        "AuthorId": 1,
        "User": {
            "username": "btiltman0",
        },
        "Category" : {
            "name" : "Japanese"
            }
        
    }
    ...,
]
```

## 2. `POST /cuisine`
Request:
- body
```json
    {
      "name": "string (required)",
      "description": "string (required)",
      "price": "integer (required)",
      "imgUrl": "string (required)",
      "CategoryId": "integer (required)",
      "AuthorId": "integer (required)"
    }
```
*Response (201 - Created)*
```json
{
    "id": 22,
    "description": "dff",
    "price": 3,
    "imgUrl": "fddfd",
    "CategoryId": 1,
    "AuthorId": 1,
    "name": "jajjajajaj",
    "updatedAt": "2024-06-24T13:40:52.181Z",
    "createdAt": "2024-06-24T13:40:52.181Z"
}
```

*Response (400 - Bad Request)*
```json
{
    "message": [
        "Cuisine.name cannot be null",
        "Cuisine.description cannot be null",
        "Cuisine.price cannot be null",
        "Cuisine.imgUrl cannot be null",
        "Cuisine.CategoryId cannot be null",
        "Cuisine.AuthorId cannot be null"
    ]
}
```

## 3. `GET /cuisine/:id`

*Response (200 - OK)*

```json
{
    "id": 1,
    "name": "Margherita Pizza",
    "description": "Classic pizza with tomato, mozzarella, and basil",
    "price": 12000,
    "imgUrl": "https://example.com/margherita.jpg",
    "createdAt": "2024-06-24T09:53:32.238Z",
    "updatedAt": "2024-06-24T09:53:32.238Z",
    "CategoryId": 1,
    "AuthorId": 3
}
```
*Response (404 - Not Found)*

```json
{
    "message": "Cuisine not found"
}
```

## 4. `PUT /cuisine/:id`
*Response (200 - OK)*
```json
{
    "id": 22,
    "name": "ngeng",
    "description": "dff",
    "price": 3,
    "imgUrl": "fddfd",
    "createdAt": "2024-06-24T13:40:52.181Z",
    "updatedAt": "2024-06-24T13:48:55.550Z",
    "CategoryId": "1",
    "AuthorId": "1"
}
```

*Response (404 - Not Found)*

```json
{
    "message": "Cuisine not found"
}
```

*Response (400 - Bad Request)*
```json
{
    "message": [
        "Cuisine.name cannot be null",
        "Cuisine.description cannot be null",
        "Cuisine.price cannot be null",
        "Cuisine.imgUrl cannot be null",
        "Cuisine.CategoryId cannot be null",
        "Cuisine.AuthorId cannot be null"
    ]
}
```

## 5 `DELETE /cuisine/:id`
*Response (200 - OK)*

```json
{
    "message": "Cuisine success to delete"
}
```

*Response (404 - Not Found)*

```json
{
    "message": "Cuisine not found"
}
```

## 6 `GET /category`
*Response (200 - OK)*

```json
[
    {
        "id": 1,
        "name": "Italian",
        "createdAt": "2024-06-24T09:53:32.229Z",
        "updatedAt": "2024-06-24T09:53:32.229Z"
    },
    {
        "id": 2,
        "name": "Mexican",
        "createdAt": "2024-06-24T09:53:32.230Z",
        "updatedAt": "2024-06-24T09:53:32.230Z"
    }
    ...,
]
```

## 7 `POST /category`
Request:
- body
```json
{
    "name": "string (required)"
}
```
*Response (200 - OK)*
```json
{
    "id": 6,
    "name": "Indonesian",
    "updatedAt": "2024-06-24T14:07:33.215Z",
    "createdAt": "2024-06-24T14:07:33.215Z"
}
```

*Response (400 - Bad Request)*
```json
{
    "message": [
        "Category.name cannot be null"
    ]
}
```

## 8 `PUT /category`
*Response (200 - OK)*
```json
{
    "id": 6,
    "name": "Indonesian",
    "updatedAt": "2024-06-24T14:07:33.215Z",
    "createdAt": "2024-06-24T14:07:33.215Z"
}
```

*Response (404 - Not Found)*

```json
{
    "message": "Category not found"
}
```

*Response (400 - Bad Request)*
```json
{
    "message": [
        "Category.name cannot be null"
    ]
}
```
## 9 `DELETE /category`
*Response (200 - OK)*

```json
{
    "message": "Cuisine success to delete"
}
```


*Response (400 - Bad Request)*
```json
{
    "message": [
        "Category.name cannot be null"
    ]
}
```

## 10 `GET /cuisine/pub`
*Response (200 - OK)*

```json
[
    {
        "id": 1,
        "name": "Margherita Pizza",
        "description": "Classic pizza with tomato, mozzarella, and basil",
        "price": 12000,
        "imgUrl": "https://example.com/margherita.jpg",
        "createdAt": "2024-06-24T09:53:32.238Z",
        "updatedAt": "2024-06-24T09:53:32.238Z",
        "CategoryId": 1,
        "AuthorId": 3,
        "User": {
            "id": 3,
            "username": "fingram2",
            "email": "dhurworth2@blogspot.com",
            "role": "admin",
            "phoneNumber": "673-941-6428",
            "address": "8295 Homewood Drive",
            "createdAt": "2024-06-24T09:53:32.210Z",
            "updatedAt": "2024-06-24T09:53:32.210Z"
        }
    },
    {
        "id": 2,
        "name": "Tacos al Pastor",
        "description": "Marinated pork tacos with pineapple",
        "price": 10,
        "imgUrl": "https://example.com/alpastor.jpg",
        "createdAt": "2024-06-24T09:53:32.238Z",
        "updatedAt": "2024-06-24T09:53:32.238Z",
        "CategoryId": 2,
        "AuthorId": 1,
        "User": {
            "id": 1,
            "username": "btiltman0",
            "email": "ktheurer0@google.co.uk",
            "role": "staff",
            "phoneNumber": "490-864-0789",
            "address": "2 Rusk Hill",
            "createdAt": "2024-06-24T09:53:32.210Z",
            "updatedAt": "2024-06-24T09:53:32.210Z"
        }
    }
    ...,
]
```

## 11 `GET /cuisine/pub/:id`
*Response (200 - OK)*

```json
{
    "id": 1,
    "name": "Margherita Pizza",
    "description": "Classic pizza with tomato, mozzarella, and basil",
    "price": 12000,
    "imgUrl": "https://example.com/margherita.jpg",
    "createdAt": "2024-06-24T09:53:32.238Z",
    "updatedAt": "2024-06-24T09:53:32.238Z",
    "CategoryId": 1,
    "AuthorId": 3
}
```
*Response (404 - Not Found)*

```json
{
    "message": "Cuisine not found"
}
```

## 12 `POST /login`

Request
- Body
```json
    {
        "username" : "yayan",
        "password" : "yayan"
    }
```

*Response (200 - OK)*
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTcxOTQ5Nzc3M30.Lm1sOCDyh6LJM0KEIszikk3jHG1GjzCFzy-3saf2WeY"
}
```
*Response (400 - Bad Request)*
```json
{
    "message": "username/password is required"
}
```
## 13 `POST /add-user`
Request
- Body
```json
{"username":"tmandreyj",
"email":"mmerckj@mozilla.com",
"role":"admin",
"phoneNumber":"374-919-6195",
"address":"2081 Oneill Way"}
```
- header
```json
{
    "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTcxOTQ5Nzc3M30.Lm1sOCDyh6LJM0KEIszikk3jHG1GjzCFzy-3saf2WeY"
    }
```
*Response (200 - OK)*
```json
{"username":"tmandreyj",
"email":"mmerckj@mozilla.com",
"role":"admin",
"phoneNumber":"374-919-6195",
"address":"2081 Oneill Way"}
```
*Response (403 - Forbidden)*
```json
{"message" : "Forbidden"}
```



## Global Error
*Response (500 - Internal Server Error)*
```json
{
    "message": "Internal server error"
}
```
*Response (401 - Unauthenticated)*

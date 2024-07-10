# IP-RMT50

# Genshin API Documentation

## Endpoints

List of available endpoints:
- `POST /register`
- `POST /login`

- `GET /weapons`
- `GET /weapons/:id`

- `GET /party`
- `POST /party`
- `DELETE /party/:id`
- `POST /party/:id/team`
- `PUT /party/:id/team/:teamId`
- `DELETE /party/:id/team/:teamId`


### 1. `POST /register`

Description:

- Add new user

Request:
- req.body:

```json
{
  "name": "string (required)",
  "email": "string (required)",
  "role": "string (required)",
  "password": "string (required)"
}
```

Response (201 - Created)

```json
 [
    {
        "id": "integer",
        "email": "string",
    }
 ]
```

Response (400 - Bad Request)

```json
{
  "message": "Validation error message"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```

### 2. `POST /login`

Description:

- Login

Request:
- req.body:

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

Response (200 - OK)

```json
 [
    {
        "access_token": "integer",
    }
 ]
```

Response (400 - Bad Request)

```json
{
  "message": "Validation error message"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```

### 3. `GET /weapons`

Description:

- Show all the weapons

Response (200 - OK)

```json
 [
    {
        "id": "integer",
        "name": "string",
        "rarity": "integer",
        "TypeId": "integer",
        "baseAttack": "integer",
        "effect": "string",
        "imgUrl": "string"
    }
 ]
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```

### 4. `GET /weapons/:id`

Description:

- Show specifi weapons by id

Request:
- params:

```json
{
  "id": "integer (required)"
}
```

Response (200 - OK)

```json
 [
    {
        "id": "integer",
        "name": "string",
        "rarity": "integer",
        "TypeId": "integer",
        "baseAttack": "integer",
        "effect": "string",
        "imgUrl": "string"
    }
 ]
```

Response (404 - Not Found)

```json
{
  "message": "Weapon with id <id> not found"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```

### 5. `GET /party`

Description:

- Show all user's party

Request:

```json
{
  "req.user.id": "integer"
}
```

Response (200 - OK)

```json
[ 
    {
        "id": "integer",
        "UserId": "integer",
        "Teams": [
            {
                "CharacterId": "integer",
                "WeaponId": "integer"
            }
        ]
    }
]

```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```

### 6. `POST /party`

Description:

- Show all user's party

Request:

```json
{
  "req.user.id": "integer"
}
```

- req.body:

```json
{
  "UserId": "integer"
}
```

Response (201 - Created)

```json
 [
    {
        "id": "integer",
        "UserId": "integer",
    }
 ]
```
Response (400 - Bad Request)

```json
{
  "message": "Your party is full"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```

### 7. `DELETE /party/:id`

Description:

- Delete user's party by id

Request:

```json
{
  "req.user.id": "integer"
}
```

Response (200 - OK)

```json
 [
    {
        "message": "string",
    }
 ]
```

Response (400 - Bad Request)

```json
{
  "message": "Cannot delete party that has teams"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```

### 8. `POST /party/:id/team`

Description:

- Add team into user's party

Request:
- params:

```json
{
  "id": "integer (required)"
}
```

- req.body:
```json
{
  "CharacterId": "integer (required)",
  "WeaponId": "integer (required)"
}
```

Response (201 - Created)

```json
 [
    {
        "id": "integer",
        "CharacterId": "integer",
        "WeaponId": "integer",
        "PartyId": "integer",
    }
]
```

Response (400 - Bad Request)

```json
{
  "message": "Your team can only have 4 Character"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```

### 9. `PUT /party/:id/team/:teamId`

Description:

- Update team from user's party

Request:
- params:

```json
{
  "id": "integer (required)"
}
```

- req.body:

```json
 [
    {
        "CharacterId": "integer",
        "WeaponId": "integer",
    }
]
```

Response (200 - OK)

```json
 [
    {
        "id": "integer",
        "CharacterId": "integer",
        "WeaponId": "integer",
        "PartyId": "integer",
    }
]
```

Response (400 - Bad Request)

```json
{
  "message": "Your team can only have 4 Character"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```

### 10. `DELETE /party/:id/team/:teamId`

Description:

- Delete team from user's party

Request:
- params:

```json
{
  "id": "integer (required)"
}
```

Response (200 - OK)

```json
 [
    {
        "message": "Team with id <team.id> has been deleted",
    }
]
```

Response (400 - Bad Request)

```json
{
  "message": "Team with id <id> not found"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```

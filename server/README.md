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


## 1 `GET /allChannels`
*Response (200 - OK)*

```json
[{
    "result": [
        {
            "id": 8,
            "channelId": "UCsJsV-Uv_h5mXAjeEsqFO5A",
            "title": "Cultive",
            "description": "The Tea Is Ready!\n",
            "customUrl": "@cultive",
            "publishedAt": "2021-10-31T16:48:52.263Z",
            "thumbnails": "https://yt3.ggpht.com/P8_ElZIEN5WkLH2TpCSw7LF43FjwX36OkALLEkCNqKiMcxombDT_fTHkWFvUoKleph_VXD2ahg=s88-c-k-c0x00ffffff-no-rj",
            "country": "RU",
            "viewCount": 5308798,
            "subscriberCount": 9390,
            "videoCount": 480,
            "createdAt": "2024-07-10T13:41:25.371Z",
            "updatedAt": "2024-07-11T03:01:09.359Z",
            "ChannelView": {
                "id": 7,
                "channelName": "Cultive",
                "channelId": "UCsJsV-Uv_h5mXAjeEsqFO5A",
                "tag": "Vshojo",
                "createdAt": "2024-07-09T13:23:52.485Z",
                "updatedAt": "2024-07-09T13:23:52.485Z",
                "all_columns": {
                    "id": 7,
                    "channelName": "Cultive",
                    "channelId": "UCsJsV-Uv_h5mXAjeEsqFO5A",
                    "tag": "Vshojo",
                    "createdAt": "2024-07-09T13:23:52.485+00:00",
                    "updatedAt": "2024-07-09T13:23:52.485+00:00",
                    "2022-03-01": 4410000,
                    "2022-03-16": 4410000,
                    "2022-04-01": 4410000,
                    "2022-04-16": 4410000,
                    "2022-05-01": 4410000,
                    "2022-05-16": 4410000,
                    "2022-06-01": 4410000,
                    "2022-06-16": 4410000,
                    "2022-07-01": 4410000,
                    "2022-07-16": 4410000,
                    "2022-08-01": 4410000,
                    "2022-08-16": 4410000,
                    "2022-09-01": 4410000,
                    "2022-09-16": 4410000,
                    "2022-10-01": 4410000,
                    "2022-10-16": 4410000,
                    "2022-11-01": 4410000,
                    "2022-11-16": 4410000,
                    "2022-12-01": 4410000,
                    "2022-12-16": 4410000,
                    "2023-01-01": 4410000,
                    "2023-01-16": 4410000,
                    "2023-02-01": 4410000,
                    "2023-02-16": 4410000,
                    "2023-03-01": 4410000,
                    "2023-03-16": 4410000,
                    "2023-04-01": 4410000,
                    "2023-04-16": 4410000,
                    "2023-05-01": 4410000,
                    "2023-05-16": 4410000,
                    "2023-06-01": 4410000,
                    "2023-06-16": 4410000,
                    "2023-07-01": 4410000,
                    "2023-07-16": 4410000,
                    "2023-08-01": 4410000,
                    "2023-08-16": 4410000,
                    "2023-09-01": 4410000,
                    "2023-09-16": 4410000,
                    "2023-10-01": 4410000,
                    "2023-10-16": 4410000,
                    "2023-11-01": 4410000,
                    "2023-11-16": 4461000,
                    "2023-12-01": 4785000,
                    "2023-12-16": 4832000,
                    "2024-01-01": 4852000,
                    "2024-01-16": 4890000,
                    "2024-02-01": 5004000,
                    "2024-02-16": 5103000,
                    "2024-03-01": 5170000,
                    "2024-03-16": 5219000,
                    "2024-04-01": 5230000,
                    "2024-04-16": 5240000,
                    "2024-05-01": 5258000,
                    "2024-05-16": 5273000,
                    "2024-06-01": 5284000,
                    "2024-06-16": 5295000,
                    "2024-07-01": 5302000,
                    "2024-07-11": 5308798
                }
            },
            "growth": 6798
        },
        {
            "id": 9,
            "channelId": "UC4klhuUqpiCflZrZiot1KAA",
            "title": "NeuroClipper",
            "description": "Sometimes I clip stuff, but most of the time I'm too tired for that.\n\nPfp art by Rune!\nhttps://www.pixiv.net/en/users/25170019\n",
            "customUrl": "@neuroclipper",
            "publishedAt": "2022-12-29T15:49:57.069Z",
            "thumbnails": "https://yt3.ggpht.com/7mwI9BBfgk_ixm9QZTgDN1_1oacGFmMUhhhH3VvSdPdxs0NzN1AZ4__FvJz6SXhPB9nLZiQHGg=s88-c-k-c0x00ffffff-no-rj",
            "country": "NL",
            "viewCount": 2347148,
            "subscriberCount": 12100,
            "videoCount": 87,
            "createdAt": "2024-07-10T13:41:25.373Z",
            "updatedAt": "2024-07-11T03:01:09.407Z",
            "ChannelView": {
                "id": 8,
                "channelName": "Neuroclipper",
                "channelId": "UC4klhuUqpiCflZrZiot1KAA",
                "tag": "Neuro",
                "createdAt": "2024-07-09T13:23:52.485Z",
                "updatedAt": "2024-07-09T13:23:52.485Z",
                "all_columns": {
                    "id": 8,
                    "channelName": "Neuroclipper",
                    "channelId": "UC4klhuUqpiCflZrZiot1KAA",
                    "tag": "Neuro",
                    "createdAt": "2024-07-09T13:23:52.485+00:00",
                    "updatedAt": "2024-07-09T13:23:52.485+00:00",
                    "2022-03-01": 820000,
                    "2022-03-16": 820000,
                    "2022-04-01": 820000,
                    "2022-04-16": 820000,
                    "2022-05-01": 820000,
                    "2022-05-16": 820000,
                    "2022-06-01": 820000,
                    "2022-06-16": 820000,
                    "2022-07-01": 820000,
                    "2022-07-16": 820000,
                    "2022-08-01": 820000,
                    "2022-08-16": 820000,
                    "2022-09-01": 820000,
                    "2022-09-16": 820000,
                    "2022-10-01": 820000,
                    "2022-10-16": 820000,
                    "2022-11-01": 820000,
                    "2022-11-16": 820000,
                    "2022-12-01": 820000,
                    "2022-12-16": 820000,
                    "2023-01-01": 820000,
                    "2023-01-16": 820000,
                    "2023-02-01": 820000,
                    "2023-02-16": 820000,
                    "2023-03-01": 820000,
                    "2023-03-16": 820000,
                    "2023-04-01": 820000,
                    "2023-04-16": 1405000,
                    "2023-05-01": 1764000,
                    "2023-05-16": 1853000,
                    "2023-06-01": 1996000,
                    "2023-06-16": 2105000,
                    "2023-07-01": 2211000,
                    "2023-07-16": 2234000,
                    "2023-08-01": 2234000,
                    "2023-08-16": 2249000,
                    "2023-09-01": 2249000,
                    "2023-09-16": 2257000,
                    "2023-10-01": 2264000,
                    "2023-10-16": 2269000,
                    "2023-11-01": 2274000,
                    "2023-11-16": 2279000,
                    "2023-12-01": 2284000,
                    "2023-12-16": 2288000,
                    "2024-01-01": 2292000,
                    "2024-01-16": 2295000,
                    "2024-02-01": 2309000,
                    "2024-02-16": 2314000,
                    "2024-03-01": 2317000,
                    "2024-03-16": 2323000,
                    "2024-04-01": 2326000,
                    "2024-04-16": 2329000,
                    "2024-05-01": 2332000,
                    "2024-05-16": 2335000,
                    "2024-06-01": 2338000,
                    "2024-06-16": 2342000,
                    "2024-07-01": 2345000,
                    "2024-07-11": 2347148
                }
            },
            "growth": 2148
        },
    ...,]
    "page": 1,
    "maxPage": 8
    }
]
```


## 2 `POST /Channel`
Request:
- body
```json
{
    "link": "string (required)",
     "tag": "string (required)"
}
```
*Response (200 - OK)*
```json
{
   "message": "Zenless Zone Zero Added!"
}
```

*Response (404 - Bad Request)*
```json
{
    "message": [
        "Sorry, we can't find that channel!"
    ]
}

*Response (403 - Forbidden)*
```json
{
    "message": [
        "You must be an admin to do that"
    ]
}
```


## 3 `PUT /channel/:channelId`
Request:
- body
```json
{
    "tag": "string (required)"
}
```

*Response (200 - OK)*
```json
{
    "message": "Edit Success!",
    "result": {
        "id": 6,
        "name": "Indonesian",
        "updatedAt": "2024-06-24T14:07:33.215Z",
        "createdAt": "2024-06-24T14:07:33.215Z"
    }
}

```

*Response (404 - Not Found)*

```json
{
    "message": "Channel not found"
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
*Response (403 - Forbidden)*
```json
{
    "message": [
        "You must be an admin to do that"
    ]
}
```
## 4 `DELETE /channel/:channelId`
*Response (200 - OK)*

```json
{
    "message": "Delete Success!"
}
```

*Response (403 - Forbidden)*
```json
{
    "message": [
        "You must be an admin to do that"
    ]
}
```


## 5 `GET /channel/:channelId`
*Response (200 - OK)*

```json
{
    {
    "found": {
        "id": 8,
        "channelId": "UCsJsV-Uv_h5mXAjeEsqFO5A",
        "title": "Cultive",
        "description": "The Tea Is Ready!\n",
        "customUrl": "@cultive",
        "publishedAt": "2021-10-31T16:48:52.263Z",
        "thumbnails": "https://yt3.ggpht.com/P8_ElZIEN5WkLH2TpCSw7LF43FjwX36OkALLEkCNqKiMcxombDT_fTHkWFvUoKleph_VXD2ahg=s88-c-k-c0x00ffffff-no-rj",
        "country": "RU",
        "viewCount": 5308798,
        "subscriberCount": 9390,
        "videoCount": 480,
        "createdAt": "2024-07-10T13:41:25.371Z",
        "updatedAt": "2024-07-11T03:01:09.359Z"
    },
    "AIText": "Cultive, a YouTube channel (ID: UCsJsV-Uv_h5mXAjeEsqFO5A), was created on July 10, 2024. It boasts 9,390 subscribers and has accumulated 5,308,798 views across its 480 videos. The channel hails from Russia and features a custom URL of @cultive. Its most recent update was on July 11, 2024, at 03:01:09 UTC."
}
}
```
*Response (404 - Not Found)*

```json
{
    "message": "Channel not found"
}
```

## 6 `POST /login`

Request
- Body
```json
    {
        "username" : "raf",
        "password" : "raf"
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

## 6 `POST /login`

Request
- Body
```json
    {
        "googleToken" : "eJhbGciOiJSUzI1NiIsImtpZCI6Ijg3YmJlMDgxNWIwNjRlNmQ0NDljYWM5OTlmMGU1MGU3MmEzZTQzNzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MTI0MjA4MzU0NjYtZ3ZmZzhycTh1c2FkNzc4dDlhYWRxdjg5N3Nha2cwaGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MTI0MjA4MzU0NjYtZ3ZmZzhycTh1c2FkNzc4dDlhYWRxdjg5N3Nha2cwaGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA1NjcxNTY0NTE1Njg5MzEzOTgiLCJlbWFpbCI6InJhZmlmcmFtYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzIwNzAzOTkwLCJuYW1lIjoiUmFmaWYgUmFtYWRoYW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSlBpcjVVemlyMHk1UjJaOUhWT3YyeTIydk9DVzQ4XzhaNmt5Nmlmenowd2o2M0lRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlJhZmlmIiwiZmFtaWx5X25hbWUiOiJSYW1hZGhhbiIsImlhdCI6MTcyMDcwNDI5MCwiZXhwIjoxNzIwNzA3ODkwLCJqdGkiOiJmYjdiYTgxZjQ2YzI3ZTQ0OTZiMGIyZjU0NmE3ZjU4ODBkNzY3ODRkIn0.RGXlAPA74z-2-DYZiJmR6BCrNT47k358UQ75uYwWJOSOi9RstsE0d5EZllHe6n8Q-nD0SvcRhHeIIMgDZ_8fVLSuMoPNWzeSteCewokJB_-JIG1RwzKEMHYNNHdev4Ceg6vLSktfo8nAXtX4PM6DZF2mbNIgSeTJNIdylhObr6UDv-4GSsW4FI39V4zAuihiNoWDGk7f2uBwfeg6CJQDoPaNW5gHSeThL0xPZekz_MCiAaSLQqkqZchvFP4Yd5h1ySPt0e6BjNhrf-mQvmN_C-SIsP-Spkt3OkBPTnv9g4IQtsUCLrZGpdjtLNNz1lpyA76s4680YQJATOLMKfYq0A"
        
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





## Global Error
*Response (500 - Internal Server Error)*
```json
{
    "message": "Internal server error"
}
```
*Response (401 - Unauthenticated)*
```json
{
    "message": "Unauthenticated"
}
```

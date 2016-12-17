# chat
Chatroom website built in node.js.

# API

### POST /send

| Parameter | Type | Description |
|-----------|------|-------------|
| - | Body | JSON body containing message details. |

Body should take the following form:
```json
{
  "from": "user1"
  "content": "welcome to the world."
}
```

Send a message to the server.

### GET /messages

| Parameter | Type | Description |
|-----------|------|-------------|
| begin | Query | The first sequential message id to fetch. Defaults to the first message id. |
| end | Query | The one-past-last sequential message id to fetch. Defaults to the one-past-final message id. |

Fetch an ordered set of messages.

### GET /user

Get a random user name to use.

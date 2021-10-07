---
title: Doatask API v0.8
language_tabs:
  - javascript: JavaScript
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="doatask-api">Doatask API v0.8</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

The doatask API description. Please note that due to a swagger limitation the relations of the entities are not correctly displayed.

Base URLs:

<h1 id="doatask-api-default">Default</h1>

## LtiController_create

<a id="opIdLtiController_create"></a>

> Code samples

```javascript

fetch('/doatask/api/ltiadmin/platform',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /doatask/api/ltiadmin/platform`

<h3 id="lticontroller_create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## UsersController_create

<a id="opIdUsersController_create"></a>

> Code samples

```javascript
const inputBody = '{
  "name": "string",
  "password": "string",
  "email": "string",
  "role": "string",
  "origin": "string",
  "ltiid": 0,
  "isActive": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/doatask/api/users',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /doatask/api/users`

> Body parameter

```json
{
  "name": "string",
  "password": "string",
  "email": "string",
  "role": "string",
  "origin": "string",
  "ltiid": 0,
  "isActive": true
}
```

<h3 id="userscontroller_create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateUserDto](#schemacreateuserdto)|true|none|

> Example responses

> 201 Response

```json
{
  "submissions": 0,
  "id": 0,
  "ltiid": 0,
  "name": "string",
  "password": "string",
  "email": "string",
  "role": "string",
  "origin": "string",
  "isActive": true
}
```

<h3 id="userscontroller_create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|[User](#schemauser)|

<aside class="success">
This operation does not require authentication
</aside>

## UsersController_findAll

<a id="opIdUsersController_findAll"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/users',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/users`

> Example responses

> 200 Response

```json
[
  {
    "submissions": 0,
    "id": 0,
    "ltiid": 0,
    "name": "string",
    "password": "string",
    "email": "string",
    "role": "string",
    "origin": "string",
    "isActive": true
  }
]
```

<h3 id="userscontroller_findall-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="userscontroller_findall-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[User](#schemauser)]|false|none|none|
|» submissions|number|true|none|none|
|» id|number|true|none|none|
|» ltiid|number|true|none|none|
|» name|string|true|none|none|
|» password|string|true|none|none|
|» email|string|true|none|none|
|» role|string|true|none|none|
|» origin|string|true|none|none|
|» isActive|boolean|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## UsersController_findOne

<a id="opIdUsersController_findOne"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/users/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/users/{id}`

<h3 id="userscontroller_findone-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|number|true|none|

> Example responses

> 200 Response

```json
{
  "submissions": 0,
  "id": 0,
  "ltiid": 0,
  "name": "string",
  "password": "string",
  "email": "string",
  "role": "string",
  "origin": "string",
  "isActive": true
}
```

<h3 id="userscontroller_findone-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[User](#schemauser)|

<aside class="success">
This operation does not require authentication
</aside>

## UsersController_update

<a id="opIdUsersController_update"></a>

> Code samples

```javascript
const inputBody = '{
  "name": "string",
  "password": "string",
  "email": "string",
  "role": "string",
  "origin": "string",
  "ltiid": 0,
  "isActive": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/doatask/api/users/{id}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /doatask/api/users/{id}`

> Body parameter

```json
{
  "name": "string",
  "password": "string",
  "email": "string",
  "role": "string",
  "origin": "string",
  "ltiid": 0,
  "isActive": true
}
```

<h3 id="userscontroller_update-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|body|body|[CreateUserDto](#schemacreateuserdto)|true|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="userscontroller_update-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="userscontroller_update-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## UsersController_remove

<a id="opIdUsersController_remove"></a>

> Code samples

```javascript

fetch('/doatask/api/users/{id}',
{
  method: 'DELETE'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /doatask/api/users/{id}`

<h3 id="userscontroller_remove-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|number|true|none|

<h3 id="userscontroller_remove-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## TasksController_create

<a id="opIdTasksController_create"></a>

> Code samples

```javascript
const inputBody = '{
  "title": "string",
  "description": "string",
  "public": true,
  "plugin": "string",
  "details": {},
  "domain": 0,
  "tags": [
    "string"
  ],
  "rating": 0
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/doatask/api/tasks',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /doatask/api/tasks`

> Body parameter

```json
{
  "title": "string",
  "description": "string",
  "public": true,
  "plugin": "string",
  "details": {},
  "domain": 0,
  "tags": [
    "string"
  ],
  "rating": 0
}
```

<h3 id="taskscontroller_create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateTaskDto](#schemacreatetaskdto)|true|none|

> Example responses

> 201 Response

```json
{
  "assignmentTasks": 0,
  "submissions": 0,
  "domain": 0,
  "owner": 0,
  "id": 0,
  "title": "string",
  "description": "string",
  "public": true,
  "rating": 0,
  "tags": [
    "string"
  ],
  "plugin": "string",
  "details": {},
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="taskscontroller_create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|[Task](#schematask)|

<aside class="success">
This operation does not require authentication
</aside>

## TasksController_findAll

<a id="opIdTasksController_findAll"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/tasks',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/tasks`

> Example responses

> 200 Response

```json
[
  {
    "assignmentTasks": 0,
    "submissions": 0,
    "domain": 0,
    "owner": 0,
    "id": 0,
    "title": "string",
    "description": "string",
    "public": true,
    "rating": 0,
    "tags": [
      "string"
    ],
    "plugin": "string",
    "details": {},
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
]
```

<h3 id="taskscontroller_findall-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="taskscontroller_findall-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Task](#schematask)]|false|none|none|
|» assignmentTasks|number|true|none|none|
|» submissions|number|true|none|none|
|» domain|number|true|none|none|
|» owner|number|true|none|none|
|» id|number|true|none|none|
|» title|string|true|none|none|
|» description|string|true|none|none|
|» public|boolean|true|none|none|
|» rating|number|true|none|none|
|» tags|[string]|true|none|none|
|» plugin|string|true|none|none|
|» details|object|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|» updatedAt|string(date-time)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## TasksController_findUserAll

<a id="opIdTasksController_findUserAll"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/tasks/user/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/tasks/user/{id}`

<h3 id="taskscontroller_finduserall-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

```json
[
  {
    "assignmentTasks": 0,
    "submissions": 0,
    "domain": 0,
    "owner": 0,
    "id": 0,
    "title": "string",
    "description": "string",
    "public": true,
    "rating": 0,
    "tags": [
      "string"
    ],
    "plugin": "string",
    "details": {},
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
]
```

<h3 id="taskscontroller_finduserall-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="taskscontroller_finduserall-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Task](#schematask)]|false|none|none|
|» assignmentTasks|number|true|none|none|
|» submissions|number|true|none|none|
|» domain|number|true|none|none|
|» owner|number|true|none|none|
|» id|number|true|none|none|
|» title|string|true|none|none|
|» description|string|true|none|none|
|» public|boolean|true|none|none|
|» rating|number|true|none|none|
|» tags|[string]|true|none|none|
|» plugin|string|true|none|none|
|» details|object|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|» updatedAt|string(date-time)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## TasksController_findStudentAll

<a id="opIdTasksController_findStudentAll"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/tasks/student/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/tasks/student/{id}`

<h3 id="taskscontroller_findstudentall-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

```json
[
  {
    "assignmentTasks": 0,
    "submissions": 0,
    "domain": 0,
    "owner": 0,
    "id": 0,
    "title": "string",
    "description": "string",
    "public": true,
    "rating": 0,
    "tags": [
      "string"
    ],
    "plugin": "string",
    "details": {},
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
]
```

<h3 id="taskscontroller_findstudentall-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="taskscontroller_findstudentall-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Task](#schematask)]|false|none|none|
|» assignmentTasks|number|true|none|none|
|» submissions|number|true|none|none|
|» domain|number|true|none|none|
|» owner|number|true|none|none|
|» id|number|true|none|none|
|» title|string|true|none|none|
|» description|string|true|none|none|
|» public|boolean|true|none|none|
|» rating|number|true|none|none|
|» tags|[string]|true|none|none|
|» plugin|string|true|none|none|
|» details|object|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|» updatedAt|string(date-time)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## TasksController_findOne

<a id="opIdTasksController_findOne"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/tasks/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/tasks/{id}`

<h3 id="taskscontroller_findone-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "assignmentTasks": 0,
  "submissions": 0,
  "domain": 0,
  "owner": 0,
  "id": 0,
  "title": "string",
  "description": "string",
  "public": true,
  "rating": 0,
  "tags": [
    "string"
  ],
  "plugin": "string",
  "details": {},
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="taskscontroller_findone-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[Task](#schematask)|

<aside class="success">
This operation does not require authentication
</aside>

## TasksController_update

<a id="opIdTasksController_update"></a>

> Code samples

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/doatask/api/tasks/{id}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /doatask/api/tasks/{id}`

> Body parameter

```json
{}
```

<h3 id="taskscontroller_update-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|body|body|[UpdateTaskDto](#schemaupdatetaskdto)|true|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="taskscontroller_update-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="taskscontroller_update-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## TasksController_remove

<a id="opIdTasksController_remove"></a>

> Code samples

```javascript

fetch('/doatask/api/tasks/{id}',
{
  method: 'DELETE'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /doatask/api/tasks/{id}`

<h3 id="taskscontroller_remove-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="taskscontroller_remove-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## AssignmentsController_create

<a id="opIdAssignmentsController_create"></a>

> Code samples

```javascript
const inputBody = '{
  "title": "string",
  "description": "string",
  "dueDate": "2019-08-24T14:15:22Z"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/doatask/api/assignments',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /doatask/api/assignments`

> Body parameter

```json
{
  "title": "string",
  "description": "string",
  "dueDate": "2019-08-24T14:15:22Z"
}
```

<h3 id="assignmentscontroller_create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateAssignmentDto](#schemacreateassignmentdto)|true|none|

> Example responses

> 201 Response

```json
{
  "assignmentTasks": 0,
  "submissions": 0,
  "owner": 0,
  "id": 0,
  "title": "string",
  "description": "string",
  "type": "string",
  "public": true,
  "dueDate": "2019-08-24T14:15:22Z",
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="assignmentscontroller_create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|[Assignment](#schemaassignment)|

<aside class="success">
This operation does not require authentication
</aside>

## AssignmentsController_findAll

<a id="opIdAssignmentsController_findAll"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/assignments',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/assignments`

> Example responses

> 200 Response

```json
[
  {
    "assignmentTasks": 0,
    "submissions": 0,
    "owner": 0,
    "id": 0,
    "title": "string",
    "description": "string",
    "type": "string",
    "public": true,
    "dueDate": "2019-08-24T14:15:22Z",
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
]
```

<h3 id="assignmentscontroller_findall-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="assignmentscontroller_findall-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Assignment](#schemaassignment)]|false|none|none|
|» assignmentTasks|number|true|none|none|
|» submissions|number|true|none|none|
|» owner|number|true|none|none|
|» id|number|true|none|none|
|» title|string|true|none|none|
|» description|string|true|none|none|
|» type|string|true|none|none|
|» public|boolean|true|none|none|
|» dueDate|string(date-time)|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|» updatedAt|string(date-time)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## AssignmentsController_findUserAll

<a id="opIdAssignmentsController_findUserAll"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/assignments/user/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/assignments/user/{id}`

<h3 id="assignmentscontroller_finduserall-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

```json
[
  {
    "assignmentTasks": 0,
    "submissions": 0,
    "owner": 0,
    "id": 0,
    "title": "string",
    "description": "string",
    "type": "string",
    "public": true,
    "dueDate": "2019-08-24T14:15:22Z",
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
]
```

<h3 id="assignmentscontroller_finduserall-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="assignmentscontroller_finduserall-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Assignment](#schemaassignment)]|false|none|none|
|» assignmentTasks|number|true|none|none|
|» submissions|number|true|none|none|
|» owner|number|true|none|none|
|» id|number|true|none|none|
|» title|string|true|none|none|
|» description|string|true|none|none|
|» type|string|true|none|none|
|» public|boolean|true|none|none|
|» dueDate|string(date-time)|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|» updatedAt|string(date-time)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## AssignmentsController_findOne

<a id="opIdAssignmentsController_findOne"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/assignments/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/assignments/{id}`

<h3 id="assignmentscontroller_findone-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "assignmentTasks": 0,
  "submissions": 0,
  "owner": 0,
  "id": 0,
  "title": "string",
  "description": "string",
  "type": "string",
  "public": true,
  "dueDate": "2019-08-24T14:15:22Z",
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="assignmentscontroller_findone-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[Assignment](#schemaassignment)|

<aside class="success">
This operation does not require authentication
</aside>

## AssignmentsController_update

<a id="opIdAssignmentsController_update"></a>

> Code samples

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/doatask/api/assignments/{id}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /doatask/api/assignments/{id}`

> Body parameter

```json
{}
```

<h3 id="assignmentscontroller_update-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|body|body|[UpdateAssignmentDto](#schemaupdateassignmentdto)|true|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="assignmentscontroller_update-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="assignmentscontroller_update-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## AssignmentsController_remove

<a id="opIdAssignmentsController_remove"></a>

> Code samples

```javascript

fetch('/doatask/api/assignments/{id}',
{
  method: 'DELETE'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /doatask/api/assignments/{id}`

<h3 id="assignmentscontroller_remove-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="assignmentscontroller_remove-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## AuthController_login

<a id="opIdAuthController_login"></a>

> Code samples

```javascript

fetch('/doatask/api/auth/login',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /doatask/api/auth/login`

<h3 id="authcontroller_login-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## AuthController_ltilogin

<a id="opIdAuthController_ltilogin"></a>

> Code samples

```javascript

fetch('/doatask/api/auth/ltilogin',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /doatask/api/auth/ltilogin`

<h3 id="authcontroller_ltilogin-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## AuthController_getProfile

<a id="opIdAuthController_getProfile"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/auth/profile',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/auth/profile`

> Example responses

> 200 Response

```json
{}
```

<h3 id="authcontroller_getprofile-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="authcontroller_getprofile-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## AssignmentTasksController_create

<a id="opIdAssignmentTasksController_create"></a>

> Code samples

```javascript
const inputBody = '{
  "taskId": 0,
  "assignmentId": 0,
  "order": 0,
  "weight": 0,
  "timeLimit": 0
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/doatask/api/assignmenttasks',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /doatask/api/assignmenttasks`

> Body parameter

```json
{
  "taskId": 0,
  "assignmentId": 0,
  "order": 0,
  "weight": 0,
  "timeLimit": 0
}
```

<h3 id="assignmenttaskscontroller_create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateAssignmentTaskDto](#schemacreateassignmenttaskdto)|true|none|

> Example responses

> 201 Response

```json
{
  "task": 0,
  "assignment": 0,
  "submissions": 0,
  "id": 0,
  "order": 0,
  "weight": 0,
  "timeLimit": 0,
  "taskId": 0,
  "assignmentId": 0,
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="assignmenttaskscontroller_create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|[AssignmentTask](#schemaassignmenttask)|

<aside class="success">
This operation does not require authentication
</aside>

## AssignmentTasksController_findAll

<a id="opIdAssignmentTasksController_findAll"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/assignmenttasks',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/assignmenttasks`

> Example responses

> 200 Response

```json
[
  {
    "task": 0,
    "assignment": 0,
    "submissions": 0,
    "id": 0,
    "order": 0,
    "weight": 0,
    "timeLimit": 0,
    "taskId": 0,
    "assignmentId": 0,
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
]
```

<h3 id="assignmenttaskscontroller_findall-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="assignmenttaskscontroller_findall-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[AssignmentTask](#schemaassignmenttask)]|false|none|none|
|» task|number|true|none|none|
|» assignment|number|true|none|none|
|» submissions|number|true|none|none|
|» id|number|true|none|none|
|» order|number|true|none|none|
|» weight|number|true|none|none|
|» timeLimit|number|true|none|none|
|» taskId|number|true|none|none|
|» assignmentId|number|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|» updatedAt|string(date-time)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## AssignmentTasksController_findOne

<a id="opIdAssignmentTasksController_findOne"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/assignmenttasks/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/assignmenttasks/{id}`

<h3 id="assignmenttaskscontroller_findone-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "task": 0,
  "assignment": 0,
  "submissions": 0,
  "id": 0,
  "order": 0,
  "weight": 0,
  "timeLimit": 0,
  "taskId": 0,
  "assignmentId": 0,
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="assignmenttaskscontroller_findone-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[AssignmentTask](#schemaassignmenttask)|

<aside class="success">
This operation does not require authentication
</aside>

## AssignmentTasksController_update

<a id="opIdAssignmentTasksController_update"></a>

> Code samples

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/doatask/api/assignmenttasks/{id}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /doatask/api/assignmenttasks/{id}`

> Body parameter

```json
{}
```

<h3 id="assignmenttaskscontroller_update-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|body|body|[UpdateAssignmentTaskDto](#schemaupdateassignmenttaskdto)|true|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="assignmenttaskscontroller_update-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="assignmenttaskscontroller_update-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## AssignmentTasksController_remove

<a id="opIdAssignmentTasksController_remove"></a>

> Code samples

```javascript

fetch('/doatask/api/assignmenttasks/{id}',
{
  method: 'DELETE'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /doatask/api/assignmenttasks/{id}`

<h3 id="assignmenttaskscontroller_remove-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="assignmenttaskscontroller_remove-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## SubmissionsController_create

<a id="opIdSubmissionsController_create"></a>

> Code samples

```javascript
const inputBody = '{
  "course": "string",
  "plugin": "string",
  "solution": {},
  "task": 0,
  "assignment": 0,
  "assignmentTask": 0,
  "user": 0,
  "level": "string",
  "rated": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/doatask/api/submissions',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /doatask/api/submissions`

> Body parameter

```json
{
  "course": "string",
  "plugin": "string",
  "solution": {},
  "task": 0,
  "assignment": 0,
  "assignmentTask": 0,
  "user": 0,
  "level": "string",
  "rated": true
}
```

<h3 id="submissionscontroller_create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateSubmissionDto](#schemacreatesubmissiondto)|true|none|

> Example responses

> 201 Response

```json
{
  "task": 0,
  "assignmentTask": 0,
  "assignment": 0,
  "user": 0,
  "id": 0,
  "course": "string",
  "plugin": "string",
  "solution": {},
  "grade": 0,
  "feedback": {},
  "rated": true,
  "rating": 0,
  "level": {},
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="submissionscontroller_create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|[Submission](#schemasubmission)|

<aside class="success">
This operation does not require authentication
</aside>

## SubmissionsController_findAll

<a id="opIdSubmissionsController_findAll"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/submissions',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/submissions`

> Example responses

> 200 Response

```json
[
  {
    "task": 0,
    "assignmentTask": 0,
    "assignment": 0,
    "user": 0,
    "id": 0,
    "course": "string",
    "plugin": "string",
    "solution": {},
    "grade": 0,
    "feedback": {},
    "rated": true,
    "rating": 0,
    "level": {},
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
]
```

<h3 id="submissionscontroller_findall-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="submissionscontroller_findall-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Submission](#schemasubmission)]|false|none|none|
|» task|number|true|none|none|
|» assignmentTask|number|true|none|none|
|» assignment|number|true|none|none|
|» user|number|true|none|none|
|» id|number|true|none|none|
|» course|string|true|none|none|
|» plugin|string|true|none|none|
|» solution|object|true|none|none|
|» grade|number|true|none|none|
|» feedback|object|true|none|none|
|» rated|boolean|true|none|none|
|» rating|number|true|none|none|
|» level|object|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|» updatedAt|string(date-time)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## SubmissionsController_findOne

<a id="opIdSubmissionsController_findOne"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/submissions/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/submissions/{id}`

<h3 id="submissionscontroller_findone-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "task": 0,
  "assignmentTask": 0,
  "assignment": 0,
  "user": 0,
  "id": 0,
  "course": "string",
  "plugin": "string",
  "solution": {},
  "grade": 0,
  "feedback": {},
  "rated": true,
  "rating": 0,
  "level": {},
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="submissionscontroller_findone-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[Submission](#schemasubmission)|

<aside class="success">
This operation does not require authentication
</aside>

## SubmissionsController_update

<a id="opIdSubmissionsController_update"></a>

> Code samples

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/doatask/api/submissions/{id}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /doatask/api/submissions/{id}`

> Body parameter

```json
{}
```

<h3 id="submissionscontroller_update-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|body|body|[UpdateSubmissionDto](#schemaupdatesubmissiondto)|true|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="submissionscontroller_update-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="submissionscontroller_update-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## SubmissionsController_remove

<a id="opIdSubmissionsController_remove"></a>

> Code samples

```javascript

fetch('/doatask/api/submissions/{id}',
{
  method: 'DELETE'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /doatask/api/submissions/{id}`

<h3 id="submissionscontroller_remove-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="submissionscontroller_remove-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## DomainsController_create

<a id="opIdDomainsController_create"></a>

> Code samples

```javascript
const inputBody = '{
  "name": "string",
  "description": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/doatask/api/domains',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /doatask/api/domains`

> Body parameter

```json
{
  "name": "string",
  "description": "string"
}
```

<h3 id="domainscontroller_create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateDomainDto](#schemacreatedomaindto)|true|none|

> Example responses

> 201 Response

```json
{
  "tasks": 0,
  "id": 0,
  "name": "string",
  "description": "string",
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="domainscontroller_create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|[Domain](#schemadomain)|

<aside class="success">
This operation does not require authentication
</aside>

## DomainsController_findAll

<a id="opIdDomainsController_findAll"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/domains',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/domains`

> Example responses

> 200 Response

```json
[
  {
    "tasks": 0,
    "id": 0,
    "name": "string",
    "description": "string",
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
]
```

<h3 id="domainscontroller_findall-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="domainscontroller_findall-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Domain](#schemadomain)]|false|none|none|
|» tasks|number|true|none|none|
|» id|number|true|none|none|
|» name|string|true|none|none|
|» description|string|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|» updatedAt|string(date-time)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## DomainsController_findOne

<a id="opIdDomainsController_findOne"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/domains/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/domains/{id}`

<h3 id="domainscontroller_findone-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "tasks": 0,
  "id": 0,
  "name": "string",
  "description": "string",
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="domainscontroller_findone-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[Domain](#schemadomain)|

<aside class="success">
This operation does not require authentication
</aside>

## DomainsController_update

<a id="opIdDomainsController_update"></a>

> Code samples

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/doatask/api/domains/{id}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /doatask/api/domains/{id}`

> Body parameter

```json
{}
```

<h3 id="domainscontroller_update-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|body|body|[UpdateDomainDto](#schemaupdatedomaindto)|true|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="domainscontroller_update-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="domainscontroller_update-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## DomainsController_remove

<a id="opIdDomainsController_remove"></a>

> Code samples

```javascript

fetch('/doatask/api/domains/{id}',
{
  method: 'DELETE'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /doatask/api/domains/{id}`

<h3 id="domainscontroller_remove-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="domainscontroller_remove-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## RatingsController_create

<a id="opIdRatingsController_create"></a>

> Code samples

```javascript
const inputBody = '{
  "type": "string",
  "ownerid": 0,
  "domain": 0,
  "value": 0,
  "deviation": 0,
  "volatility": 0,
  "result": 0,
  "latest": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/doatask/api/ratings',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /doatask/api/ratings`

> Body parameter

```json
{
  "type": "string",
  "ownerid": 0,
  "domain": 0,
  "value": 0,
  "deviation": 0,
  "volatility": 0,
  "result": 0,
  "latest": true
}
```

<h3 id="ratingscontroller_create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateRatingDto](#schemacreateratingdto)|true|none|

> Example responses

> 201 Response

```json
{
  "domain": 0,
  "id": 0,
  "type": "string",
  "ownerid": 0,
  "value": 0,
  "deviation": 0,
  "volatility": 0,
  "result": 0,
  "latest": true,
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="ratingscontroller_create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|[Rating](#schemarating)|

<aside class="success">
This operation does not require authentication
</aside>

## RatingsController_findAll

<a id="opIdRatingsController_findAll"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/ratings',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/ratings`

> Example responses

> 200 Response

```json
[
  {
    "domain": 0,
    "id": 0,
    "type": "string",
    "ownerid": 0,
    "value": 0,
    "deviation": 0,
    "volatility": 0,
    "result": 0,
    "latest": true,
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
]
```

<h3 id="ratingscontroller_findall-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="ratingscontroller_findall-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Rating](#schemarating)]|false|none|none|
|» domain|number|true|none|none|
|» id|number|true|none|none|
|» type|string|true|none|none|
|» ownerid|number|true|none|none|
|» value|number|true|none|none|
|» deviation|number|true|none|none|
|» volatility|number|true|none|none|
|» result|number|true|none|none|
|» latest|boolean|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|» updatedAt|string(date-time)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## RatingsController_findUserAll

<a id="opIdRatingsController_findUserAll"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/ratings/user/{id}/all',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/ratings/user/{id}/all`

<h3 id="ratingscontroller_finduserall-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

```json
[
  {
    "domain": 0,
    "id": 0,
    "type": "string",
    "ownerid": 0,
    "value": 0,
    "deviation": 0,
    "volatility": 0,
    "result": 0,
    "latest": true,
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
]
```

<h3 id="ratingscontroller_finduserall-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="ratingscontroller_finduserall-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Rating](#schemarating)]|false|none|none|
|» domain|number|true|none|none|
|» id|number|true|none|none|
|» type|string|true|none|none|
|» ownerid|number|true|none|none|
|» value|number|true|none|none|
|» deviation|number|true|none|none|
|» volatility|number|true|none|none|
|» result|number|true|none|none|
|» latest|boolean|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|» updatedAt|string(date-time)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## RatingsController_findUserLatest

<a id="opIdRatingsController_findUserLatest"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/ratings/user/{id}/latest',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/ratings/user/{id}/latest`

<h3 id="ratingscontroller_finduserlatest-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

```json
[
  {
    "domain": 0,
    "id": 0,
    "type": "string",
    "ownerid": 0,
    "value": 0,
    "deviation": 0,
    "volatility": 0,
    "result": 0,
    "latest": true,
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
]
```

<h3 id="ratingscontroller_finduserlatest-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="ratingscontroller_finduserlatest-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Rating](#schemarating)]|false|none|none|
|» domain|number|true|none|none|
|» id|number|true|none|none|
|» type|string|true|none|none|
|» ownerid|number|true|none|none|
|» value|number|true|none|none|
|» deviation|number|true|none|none|
|» volatility|number|true|none|none|
|» result|number|true|none|none|
|» latest|boolean|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|» updatedAt|string(date-time)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## RatingsController_getTop

<a id="opIdRatingsController_getTop"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/ratings/top/{count}/{domainid}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/ratings/top/{count}/{domainid}`

<h3 id="ratingscontroller_gettop-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|count|path|number|true|none|
|domainid|path|number|true|none|

> Example responses

> 200 Response

```json
[
  {
    "domain": 0,
    "id": 0,
    "type": "string",
    "ownerid": 0,
    "value": 0,
    "deviation": 0,
    "volatility": 0,
    "result": 0,
    "latest": true,
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
]
```

<h3 id="ratingscontroller_gettop-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="ratingscontroller_gettop-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Rating](#schemarating)]|false|none|none|
|» domain|number|true|none|none|
|» id|number|true|none|none|
|» type|string|true|none|none|
|» ownerid|number|true|none|none|
|» value|number|true|none|none|
|» deviation|number|true|none|none|
|» volatility|number|true|none|none|
|» result|number|true|none|none|
|» latest|boolean|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|» updatedAt|string(date-time)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## RatingsController_findOne

<a id="opIdRatingsController_findOne"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/ratings/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/ratings/{id}`

<h3 id="ratingscontroller_findone-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "domain": 0,
  "id": 0,
  "type": "string",
  "ownerid": 0,
  "value": 0,
  "deviation": 0,
  "volatility": 0,
  "result": 0,
  "latest": true,
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="ratingscontroller_findone-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[Rating](#schemarating)|

<aside class="success">
This operation does not require authentication
</aside>

## RatingsController_update

<a id="opIdRatingsController_update"></a>

> Code samples

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/doatask/api/ratings/{id}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /doatask/api/ratings/{id}`

> Body parameter

```json
{}
```

<h3 id="ratingscontroller_update-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|body|body|[UpdateRatingDto](#schemaupdateratingdto)|true|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="ratingscontroller_update-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="ratingscontroller_update-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## RatingsController_remove

<a id="opIdRatingsController_remove"></a>

> Code samples

```javascript

fetch('/doatask/api/ratings/{id}',
{
  method: 'DELETE'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /doatask/api/ratings/{id}`

<h3 id="ratingscontroller_remove-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="ratingscontroller_remove-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

## CommentsController_create

<a id="opIdCommentsController_create"></a>

> Code samples

```javascript
const inputBody = '{
  "content": "string",
  "stars": 0,
  "owner": 0,
  "task": 0
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/doatask/api/comments',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /doatask/api/comments`

> Body parameter

```json
{
  "content": "string",
  "stars": 0,
  "owner": 0,
  "task": 0
}
```

<h3 id="commentscontroller_create-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateCommentDto](#schemacreatecommentdto)|true|none|

> Example responses

> 201 Response

```json
{
  "owner": 0,
  "task": 0,
  "id": 0,
  "content": "string",
  "stars": 0,
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="commentscontroller_create-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|[Comment](#schemacomment)|

<aside class="success">
This operation does not require authentication
</aside>

## CommentsController_findAll

<a id="opIdCommentsController_findAll"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/comments',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/comments`

> Example responses

> 200 Response

```json
[
  {
    "owner": 0,
    "task": 0,
    "id": 0,
    "content": "string",
    "stars": 0,
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
]
```

<h3 id="commentscontroller_findall-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="commentscontroller_findall-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Comment](#schemacomment)]|false|none|none|
|» owner|number|true|none|none|
|» task|number|true|none|none|
|» id|number|true|none|none|
|» content|string|true|none|none|
|» stars|number|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|» updatedAt|string(date-time)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## CommentsController_findTaskAll

<a id="opIdCommentsController_findTaskAll"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/comments/task/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/comments/task/{id}`

<h3 id="commentscontroller_findtaskall-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|number|true|none|

> Example responses

> 200 Response

```json
[
  {
    "owner": 0,
    "task": 0,
    "id": 0,
    "content": "string",
    "stars": 0,
    "createdAt": "2019-08-24T14:15:22Z",
    "updatedAt": "2019-08-24T14:15:22Z"
  }
]
```

<h3 id="commentscontroller_findtaskall-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="commentscontroller_findtaskall-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Comment](#schemacomment)]|false|none|none|
|» owner|number|true|none|none|
|» task|number|true|none|none|
|» id|number|true|none|none|
|» content|string|true|none|none|
|» stars|number|true|none|none|
|» createdAt|string(date-time)|true|none|none|
|» updatedAt|string(date-time)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## CommentsController_findOne

<a id="opIdCommentsController_findOne"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/doatask/api/comments/{id}',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /doatask/api/comments/{id}`

<h3 id="commentscontroller_findone-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "owner": 0,
  "task": 0,
  "id": 0,
  "content": "string",
  "stars": 0,
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}
```

<h3 id="commentscontroller_findone-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|[Comment](#schemacomment)|

<aside class="success">
This operation does not require authentication
</aside>

## CommentsController_update

<a id="opIdCommentsController_update"></a>

> Code samples

```javascript
const inputBody = '{}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/doatask/api/comments/{id}',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /doatask/api/comments/{id}`

> Body parameter

```json
{}
```

<h3 id="commentscontroller_update-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|
|body|body|[UpdateCommentDto](#schemaupdatecommentdto)|true|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="commentscontroller_update-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

<h3 id="commentscontroller_update-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## CommentsController_remove

<a id="opIdCommentsController_remove"></a>

> Code samples

```javascript

fetch('/doatask/api/comments/{id}',
{
  method: 'DELETE'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /doatask/api/comments/{id}`

<h3 id="commentscontroller_remove-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|string|true|none|

<h3 id="commentscontroller_remove-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|None|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_CreateUserDto">CreateUserDto</h2>
<!-- backwards compatibility -->
<a id="schemacreateuserdto"></a>
<a id="schema_CreateUserDto"></a>
<a id="tocScreateuserdto"></a>
<a id="tocscreateuserdto"></a>

```json
{
  "name": "string",
  "password": "string",
  "email": "string",
  "role": "string",
  "origin": "string",
  "ltiid": 0,
  "isActive": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|password|string|false|none|none|
|email|string|false|none|none|
|role|string|true|none|none|
|origin|string|true|none|none|
|ltiid|number|false|none|none|
|isActive|boolean|false|none|none|

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "submissions": 0,
  "id": 0,
  "ltiid": 0,
  "name": "string",
  "password": "string",
  "email": "string",
  "role": "string",
  "origin": "string",
  "isActive": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|submissions|number|true|none|none|
|id|number|true|none|none|
|ltiid|number|true|none|none|
|name|string|true|none|none|
|password|string|true|none|none|
|email|string|true|none|none|
|role|string|true|none|none|
|origin|string|true|none|none|
|isActive|boolean|true|none|none|

<h2 id="tocS_CreateTaskDto">CreateTaskDto</h2>
<!-- backwards compatibility -->
<a id="schemacreatetaskdto"></a>
<a id="schema_CreateTaskDto"></a>
<a id="tocScreatetaskdto"></a>
<a id="tocscreatetaskdto"></a>

```json
{
  "title": "string",
  "description": "string",
  "public": true,
  "plugin": "string",
  "details": {},
  "domain": 0,
  "tags": [
    "string"
  ],
  "rating": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|true|none|none|
|description|string|true|none|none|
|public|boolean|true|none|none|
|plugin|string|true|none|none|
|details|object|true|none|none|
|domain|number|true|none|none|
|tags|[string]|false|none|none|
|rating|number|false|none|none|

<h2 id="tocS_Task">Task</h2>
<!-- backwards compatibility -->
<a id="schematask"></a>
<a id="schema_Task"></a>
<a id="tocStask"></a>
<a id="tocstask"></a>

```json
{
  "assignmentTasks": 0,
  "submissions": 0,
  "domain": 0,
  "owner": 0,
  "id": 0,
  "title": "string",
  "description": "string",
  "public": true,
  "rating": 0,
  "tags": [
    "string"
  ],
  "plugin": "string",
  "details": {},
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|assignmentTasks|number|true|none|none|
|submissions|number|true|none|none|
|domain|number|true|none|none|
|owner|number|true|none|none|
|id|number|true|none|none|
|title|string|true|none|none|
|description|string|true|none|none|
|public|boolean|true|none|none|
|rating|number|true|none|none|
|tags|[string]|true|none|none|
|plugin|string|true|none|none|
|details|object|true|none|none|
|createdAt|string(date-time)|true|none|none|
|updatedAt|string(date-time)|true|none|none|

<h2 id="tocS_UpdateTaskDto">UpdateTaskDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdatetaskdto"></a>
<a id="schema_UpdateTaskDto"></a>
<a id="tocSupdatetaskdto"></a>
<a id="tocsupdatetaskdto"></a>

```json
{}

```

### Properties

*None*

<h2 id="tocS_CreateAssignmentDto">CreateAssignmentDto</h2>
<!-- backwards compatibility -->
<a id="schemacreateassignmentdto"></a>
<a id="schema_CreateAssignmentDto"></a>
<a id="tocScreateassignmentdto"></a>
<a id="tocscreateassignmentdto"></a>

```json
{
  "title": "string",
  "description": "string",
  "dueDate": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|true|none|none|
|description|string|true|none|none|
|dueDate|string(date-time)|true|none|none|

<h2 id="tocS_Assignment">Assignment</h2>
<!-- backwards compatibility -->
<a id="schemaassignment"></a>
<a id="schema_Assignment"></a>
<a id="tocSassignment"></a>
<a id="tocsassignment"></a>

```json
{
  "assignmentTasks": 0,
  "submissions": 0,
  "owner": 0,
  "id": 0,
  "title": "string",
  "description": "string",
  "type": "string",
  "public": true,
  "dueDate": "2019-08-24T14:15:22Z",
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|assignmentTasks|number|true|none|none|
|submissions|number|true|none|none|
|owner|number|true|none|none|
|id|number|true|none|none|
|title|string|true|none|none|
|description|string|true|none|none|
|type|string|true|none|none|
|public|boolean|true|none|none|
|dueDate|string(date-time)|true|none|none|
|createdAt|string(date-time)|true|none|none|
|updatedAt|string(date-time)|true|none|none|

<h2 id="tocS_UpdateAssignmentDto">UpdateAssignmentDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdateassignmentdto"></a>
<a id="schema_UpdateAssignmentDto"></a>
<a id="tocSupdateassignmentdto"></a>
<a id="tocsupdateassignmentdto"></a>

```json
{}

```

### Properties

*None*

<h2 id="tocS_CreateAssignmentTaskDto">CreateAssignmentTaskDto</h2>
<!-- backwards compatibility -->
<a id="schemacreateassignmenttaskdto"></a>
<a id="schema_CreateAssignmentTaskDto"></a>
<a id="tocScreateassignmenttaskdto"></a>
<a id="tocscreateassignmenttaskdto"></a>

```json
{
  "taskId": 0,
  "assignmentId": 0,
  "order": 0,
  "weight": 0,
  "timeLimit": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|taskId|number|true|none|none|
|assignmentId|number|true|none|none|
|order|number|true|none|none|
|weight|number|true|none|none|
|timeLimit|number|true|none|none|

<h2 id="tocS_AssignmentTask">AssignmentTask</h2>
<!-- backwards compatibility -->
<a id="schemaassignmenttask"></a>
<a id="schema_AssignmentTask"></a>
<a id="tocSassignmenttask"></a>
<a id="tocsassignmenttask"></a>

```json
{
  "task": 0,
  "assignment": 0,
  "submissions": 0,
  "id": 0,
  "order": 0,
  "weight": 0,
  "timeLimit": 0,
  "taskId": 0,
  "assignmentId": 0,
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|task|number|true|none|none|
|assignment|number|true|none|none|
|submissions|number|true|none|none|
|id|number|true|none|none|
|order|number|true|none|none|
|weight|number|true|none|none|
|timeLimit|number|true|none|none|
|taskId|number|true|none|none|
|assignmentId|number|true|none|none|
|createdAt|string(date-time)|true|none|none|
|updatedAt|string(date-time)|true|none|none|

<h2 id="tocS_UpdateAssignmentTaskDto">UpdateAssignmentTaskDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdateassignmenttaskdto"></a>
<a id="schema_UpdateAssignmentTaskDto"></a>
<a id="tocSupdateassignmenttaskdto"></a>
<a id="tocsupdateassignmenttaskdto"></a>

```json
{}

```

### Properties

*None*

<h2 id="tocS_CreateSubmissionDto">CreateSubmissionDto</h2>
<!-- backwards compatibility -->
<a id="schemacreatesubmissiondto"></a>
<a id="schema_CreateSubmissionDto"></a>
<a id="tocScreatesubmissiondto"></a>
<a id="tocscreatesubmissiondto"></a>

```json
{
  "course": "string",
  "plugin": "string",
  "solution": {},
  "task": 0,
  "assignment": 0,
  "assignmentTask": 0,
  "user": 0,
  "level": "string",
  "rated": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|course|string|true|none|none|
|plugin|string|true|none|none|
|solution|object|true|none|none|
|task|number|true|none|none|
|assignment|number|true|none|none|
|assignmentTask|number|true|none|none|
|user|number|true|none|none|
|level|string|false|none|none|
|rated|boolean|true|none|none|

<h2 id="tocS_Submission">Submission</h2>
<!-- backwards compatibility -->
<a id="schemasubmission"></a>
<a id="schema_Submission"></a>
<a id="tocSsubmission"></a>
<a id="tocssubmission"></a>

```json
{
  "task": 0,
  "assignmentTask": 0,
  "assignment": 0,
  "user": 0,
  "id": 0,
  "course": "string",
  "plugin": "string",
  "solution": {},
  "grade": 0,
  "feedback": {},
  "rated": true,
  "rating": 0,
  "level": {},
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|task|number|true|none|none|
|assignmentTask|number|true|none|none|
|assignment|number|true|none|none|
|user|number|true|none|none|
|id|number|true|none|none|
|course|string|true|none|none|
|plugin|string|true|none|none|
|solution|object|true|none|none|
|grade|number|true|none|none|
|feedback|object|true|none|none|
|rated|boolean|true|none|none|
|rating|number|true|none|none|
|level|object|true|none|none|
|createdAt|string(date-time)|true|none|none|
|updatedAt|string(date-time)|true|none|none|

<h2 id="tocS_UpdateSubmissionDto">UpdateSubmissionDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdatesubmissiondto"></a>
<a id="schema_UpdateSubmissionDto"></a>
<a id="tocSupdatesubmissiondto"></a>
<a id="tocsupdatesubmissiondto"></a>

```json
{}

```

### Properties

*None*

<h2 id="tocS_CreateDomainDto">CreateDomainDto</h2>
<!-- backwards compatibility -->
<a id="schemacreatedomaindto"></a>
<a id="schema_CreateDomainDto"></a>
<a id="tocScreatedomaindto"></a>
<a id="tocscreatedomaindto"></a>

```json
{
  "name": "string",
  "description": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|description|string|true|none|none|

<h2 id="tocS_Domain">Domain</h2>
<!-- backwards compatibility -->
<a id="schemadomain"></a>
<a id="schema_Domain"></a>
<a id="tocSdomain"></a>
<a id="tocsdomain"></a>

```json
{
  "tasks": 0,
  "id": 0,
  "name": "string",
  "description": "string",
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tasks|number|true|none|none|
|id|number|true|none|none|
|name|string|true|none|none|
|description|string|true|none|none|
|createdAt|string(date-time)|true|none|none|
|updatedAt|string(date-time)|true|none|none|

<h2 id="tocS_UpdateDomainDto">UpdateDomainDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdatedomaindto"></a>
<a id="schema_UpdateDomainDto"></a>
<a id="tocSupdatedomaindto"></a>
<a id="tocsupdatedomaindto"></a>

```json
{}

```

### Properties

*None*

<h2 id="tocS_CreateRatingDto">CreateRatingDto</h2>
<!-- backwards compatibility -->
<a id="schemacreateratingdto"></a>
<a id="schema_CreateRatingDto"></a>
<a id="tocScreateratingdto"></a>
<a id="tocscreateratingdto"></a>

```json
{
  "type": "string",
  "ownerid": 0,
  "domain": 0,
  "value": 0,
  "deviation": 0,
  "volatility": 0,
  "result": 0,
  "latest": true
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|true|none|none|
|ownerid|number|true|none|none|
|domain|number|true|none|none|
|value|number|true|none|none|
|deviation|number|true|none|none|
|volatility|number|true|none|none|
|result|number|true|none|none|
|latest|boolean|false|none|none|

<h2 id="tocS_Rating">Rating</h2>
<!-- backwards compatibility -->
<a id="schemarating"></a>
<a id="schema_Rating"></a>
<a id="tocSrating"></a>
<a id="tocsrating"></a>

```json
{
  "domain": 0,
  "id": 0,
  "type": "string",
  "ownerid": 0,
  "value": 0,
  "deviation": 0,
  "volatility": 0,
  "result": 0,
  "latest": true,
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|domain|number|true|none|none|
|id|number|true|none|none|
|type|string|true|none|none|
|ownerid|number|true|none|none|
|value|number|true|none|none|
|deviation|number|true|none|none|
|volatility|number|true|none|none|
|result|number|true|none|none|
|latest|boolean|true|none|none|
|createdAt|string(date-time)|true|none|none|
|updatedAt|string(date-time)|true|none|none|

<h2 id="tocS_UpdateRatingDto">UpdateRatingDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdateratingdto"></a>
<a id="schema_UpdateRatingDto"></a>
<a id="tocSupdateratingdto"></a>
<a id="tocsupdateratingdto"></a>

```json
{}

```

### Properties

*None*

<h2 id="tocS_CreateCommentDto">CreateCommentDto</h2>
<!-- backwards compatibility -->
<a id="schemacreatecommentdto"></a>
<a id="schema_CreateCommentDto"></a>
<a id="tocScreatecommentdto"></a>
<a id="tocscreatecommentdto"></a>

```json
{
  "content": "string",
  "stars": 0,
  "owner": 0,
  "task": 0
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|content|string|true|none|none|
|stars|number|true|none|none|
|owner|number|true|none|none|
|task|number|true|none|none|

<h2 id="tocS_Comment">Comment</h2>
<!-- backwards compatibility -->
<a id="schemacomment"></a>
<a id="schema_Comment"></a>
<a id="tocScomment"></a>
<a id="tocscomment"></a>

```json
{
  "owner": 0,
  "task": 0,
  "id": 0,
  "content": "string",
  "stars": 0,
  "createdAt": "2019-08-24T14:15:22Z",
  "updatedAt": "2019-08-24T14:15:22Z"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|owner|number|true|none|none|
|task|number|true|none|none|
|id|number|true|none|none|
|content|string|true|none|none|
|stars|number|true|none|none|
|createdAt|string(date-time)|true|none|none|
|updatedAt|string(date-time)|true|none|none|

<h2 id="tocS_UpdateCommentDto">UpdateCommentDto</h2>
<!-- backwards compatibility -->
<a id="schemaupdatecommentdto"></a>
<a id="schema_UpdateCommentDto"></a>
<a id="tocSupdatecommentdto"></a>
<a id="tocsupdatecommentdto"></a>

```json
{}

```

### Properties

*None*


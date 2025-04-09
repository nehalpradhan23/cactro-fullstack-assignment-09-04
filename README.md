
## Overview

This is the assignment for Cactro Fullstack test. The task was to create a Backend APIs for task management App.


## Features

- User registration and login
- Create Task, Update Task, Delete Task, Fetch All User Tasks
- JWT for authentication and securing endpoints. Cannot access endpoints without login.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`="add port here eg - 8000"

`MONGODB_URI`="add mongodb url here"

`JWT_SECRET`=jwtsecret

`NODE_ENV`=development


## Run Locally

Clone the project

```bash
  git clone https://github.com/nehalpradhan23/cactro-fullstack-assignment-09-04
```

Go to the project backend directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


# API Reference (local)

### Get All Tasks - (change port number)

```http
  GET http://localhost:8000/api/getAllTasks
```

### login user

````http
  POST http://localhost:8000/api/login

  body:
  {
    "email":"test@gmail.com",
    "password":"test"
  }
````

### register user

````http
  POST http://localhost:8000/api/register

  body:
  {
    "email":"test@gmail.com",
    "password":"test"
  }
````

### logout user

````http
  POST http://localhost:8000/api/logout
````

### create user task

````http
  PUT http://localhost:8000/api/createTask

  body:
  {
    "title":"task",
    "description":"title description 2",
    "status":"pending"
  }

  - status - completed, inprogress or pending
````

### update user task

````http
  PUT http://localhost:8000/api/updateTask/taskId

  add taskId

  body:
  {
    "title":"updated task",
    "description":"updated title description 2",
    "status":"completed"
  }

  - status - completed, inprogress or pending
````



# API Reference (deployed)

## Postman collection

### https://www.postman.com/satellite-meteorologist-28117469/cactro-fulstack-assignment/collection/s6znq0s/assignment-live?action=share&creator=36967244


### Get All Tasks - (change port number)

```http
  GET https://cactro-fullstack-assignment-09-04.onrender.com/api/getAllTasks
```

### login user

````http
  POST https://cactro-fullstack-assignment-09-04.onrender.com/api/login

  body:
  {
    "email":"test@gmail.com",
    "password":"test"
  }
````

### register user

````http
  POST https://cactro-fullstack-assignment-09-04.onrender.com/api/register

  body:
  {
    "email":"test@gmail.com",
    "password":"test"
  }
````

### logout user

````http
  POST https://cactro-fullstack-assignment-09-04.onrender.com/api/logout
````

### create user task

````http
  PUT https://cactro-fullstack-assignment-09-04.onrender.com/api/createTask

  body:
  {
    "title":"task",
    "description":"title description 2",
    "status":"pending"
  }

  - status - completed, inprogress or pending
````

### update user task

````http
  PUT https://cactro-fullstack-assignment-09-04.onrender.com/api/updateTask/taskId

  add taskId

  body:
  {
    "title":"updated task",
    "description":"updated title description 2",
    "status":"completed"
  }

  - status - completed, inprogress or pending
````


## Deployed API on render - 
### https://cactro-fullstack-assignment-09-04.onrender.com

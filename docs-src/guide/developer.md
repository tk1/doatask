# Developer Guide (client side)

## Architecture

Doatask consists of a client web application (browser-based user interface)  and a
server responsible for business logic and data management. The user interface
communicates with the server via a REST API.

The server is created with [Nest](https://nestjs.com/). It uses a
[PostgreSQL](https://www.postgresql.org/) database for data storage.

## Tools

### Vite

[Vite](https://vitejs.dev/) is used as a build tool.

### Vue.js

The user interface is developed with [Vue.js Version 3](https://v3.vuejs.org/).

### Primevue

The components for the user interface are taken from
[PrimeVue](https://primefaces.org/primevue/)

### LTI

Doatask can operate as a external tool provider for learning platforms such as
[Moodle](https://moodle.org). The platform must comply to Learning Tools
Interoperability 1.3 (LTI).

> The IMS Learning Tools Interoperability® (LTI®) specification allows Learning
> Management Systems (LMS) or platforms to integrate remote tools and content in
> a standard way. [ref](https://www.imsglobal.org/spec/lti/v1p3/)

The LTI integration is done by using [ltijs](https://cvmcosta.me/ltijs/). This
tool uses LTI Version 1.3.

## pgAdmin

You can inspect the structure of the database and the contents of the database
tables using the [pgAdmin](https://www.pgadmin.org/) tool. The tool is provided
as a web application.

If you want to login in pgAdmin, use the values of the environment variables
`PGADMIN_DEFAULT_EMAIL` and `PGADMIN_DEFAULT_PASSWORD`.

These and the following environment variables are defined on the server side in
the `.env` file.

pgAdmin is reachable under the default URL http://localhost:5555. The port can
be set with the environment variable `PGADMIN_PORT`.

Click on "Add New Server" under "Quick Links". You can give it any name.
In the tab "Connection" fill in the following fields:

|Field name|Value of environment variable|
|----------|-----------------------------|
|Hostname/Address|POSTGRES_HOST|
|Port|POSTGRES_PORT|
|Maintenance database|POSTGRES_DB|
|Username|POSTGRES_USER|
|Password|POSTGRES_PASSWORD|

## Develop a plugin (client side)

If you wish to add a new type of tasks you have to implement a plugin. The
plugin consists of two parts, one for the client side, one for the server side.
Here we describe the development of the client plugin. For the server plugin see
the server documentation.

In order to describe the development process, we choose an easy example. The new
task type is as follows: the student is given two numbers and has to calculate
the result of the divison. e.g. 28 and 4 are given. The result is of course 7.
When the numbers are bigger, e.g. 1,234,567 and 123, the result is not so
obvious. Therefore we will allow an estimate for the result, e.g. 10,000. If the
estimate is near enough to the true result then the student will get a grade of
100%. If it's not so near the grade could be 40%. 0% are given if the difference
is to big.

The grading will be done by the server plugin.

For the client plugin we need two Vue components: one to allow the teacher to
create and edit a new task and one to present the student the task and let him
fill in the result.

First we create a new directory for the plugin. This directory must be created as
subdirectory of the directory plugins. Let's call it `Division`.

```
cd src/plugins
mkdir Division
```

In this directory we create three files: `Edit.vue`, `Solve.vue` and
`helpers.js`. `Edit.vue` defines the component for the teacher and `Solve.vue`
defines the component for the student. `helpers.js` contains helper functions
(see below). If necessary we can create further files and import them in the
components.

### helpers.js

This file should export at least a function `describe`. This function get a
parameter `details` that contains the details of the task. It should return a
string describing the details. A generic (not task specific) implementation
could be

```js
export function describe (details) {
  return JSON.stringify(details)
}
```

This string will be used e.g. in the task list to show the details of each task.

### register

The components must be registered in the system. To do this, the `plugins/register.js` file must be extended.
The following `import` statements must be added:

```js
import DivisionEdit from './Division/Edit.vue'
import DivisionSolve from './Division/Solve.vue'
import * as DivisionHelpers from './Division/helpers.js'
```

In the `register` function a call to the `registerOne` function must be added.

```js
registerOne(app, 'Division', DivisionHelpers, [
  {
    type: 'Edit',
    component: DivisionEdit
  },
  {
    type: 'Solve',
    component: DivisionSolve
  }
])
```

::: info

It is planned that the file `register.js` will be generated automatically in the
future, so that this step will be omitted.

:::

### Edit component

Let's start with the Edit component. There is a base component which we will use
to define the Edit component. It's called `TaskEditBase`. This base component
has a number of [slots](https://v3.vuejs.org/guide/component-slots.html). The
new component can provide the content for these slots. We have at least to
provide content for the named slot `details`. This slot should have the task
specific fields that are needed to define the task.

```html{9,17}
<template>
  <TaskEditBase v-model="task">
    <template #details>
      <div class="p-fluid p-grid p-formgrid">
        <div class="p-field p-col-12 p-md-3">
          <label for="number1">Number</label>
          <InputText
            id="number1"
            v-model="task.details.number1"
            type="text"
          />
        </div>
        <div class="p-field p-col-12 p-md-3">
          <label for="number2">Number</label>
          <InputText
            id="number2"
            v-model="task.details.number2"
            type="text"
          />
        </div>
      </div>
    </template>
  </TaskEditBase>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      task: null
    }
  },
  created () {
    this.task = this.modelValue
  }
}
</script>
```

In the details for the task, we have the two numbers `number1` and `number2`.
The classes of the `div` are described in the documentation of 
[PrimeVue](https://primefaces.org/primevue/showcase/#/grid).

### describe

Now we can give a more specific implementation of the helper function
`describe`.

```js
export function describe (details) {
  return `${details.number1}/${details.number2}`
}
```

### Slots

Beside the slot `details` there are the slots named `header` and `description`.
`header` contains the header of the form and `description` the user interface
element(s) for the description of the task.

We could define:

```html
<template #header>
  <h1>Division task</h1>
</template>
```

and

```html
<template #description>
  <div class="p-field p-col-12">
    <label for="description">Description</label>
    <InputText
      id="description"
      v-model="task.description"
      type="text"
    />
  </div>
</template>
```

### Solve component

Let's continue with the Solve component. There is a base component which we will use
to define the Solve component. It's called `TaskSolveBase`. This base component
has a number of [slots](https://v3.vuejs.org/guide/component-slots.html). The
new component can provide the content for these slots. We have at least to
provide content for the named slot `details`. This slot should have the task
specific details that are needed to describe the task.

The minimal implementation for the Solve component is

```html
<template>
  <TaskSolveBase>
    <template #details="slotProps">
      <p>
        Divide {{ slotProps.task.details.number1 }}
        by {{ slotProps.task.details.number2 }}
      </p>
    </template>
  </TaskSolveBase>
</template>
```

This will show the title and the description of the task, a result field and a
submit button. The task object is exposed via `slotProps` (see [Scoped
slots](https://v3.vuejs.org/guide/component-slots.html#scoped-slots)). So we can
show the details to the student.

The `details` slot offers the slot props `task` and `alreadySubmitted`.
`alreadySubmitted` is a boolean value that is true when this task in this
assignment has already been submitted.

The base component `TaskSolveBase` has the slots:

* `header`
* `details`
* `solution`

`header` has the slot prop `task`.

`solution` is a slot that allows us to implement a non-default interface for
the submission of the solution and to give the student feedback on their
submitted solution. This slot hat the slot props

* `solution`
* `task`
* `submit`
* `submitReceived`
* `alreadySubmitted`

`solution` is an object that is given to the `submit` function. It should contain
the answer (solution) of the student. By default it has only the property `text`.

`submit` is an async function that we can use to submit the answer of the student to
the server. It has one argument that is an object with the properties `value`,
the answer of the student, and `timeNeeded`, the time in seconds that the
student needed to submit the answer. 

The `submit` function returns the result of the grading process by the server.
This result is an object with the properties `grade`, a value in the range from
0 to 1, and `feedback`, which is an object containing feedback for the student.
We will determine the content of the `feedback` object when implementing the
server plugin. When the task is rated there will be a property `rating` giving
the new rating of the student.

`submitReceived` is a function that will display a toast showing the grade the
student received.

## Develop a plugin (server side)

If you wish to add a new type of tasks you have to implement a plugin. The
plugin consists of two parts, one for the client side, one for the server side.
Here we describe the development of the client plugin. For the client plugin see
the client documentation.

In order to describe the development process, we choose an easy example. The new
task type is as follows: the student is given two numbers and has to calculate
the result of the divison. e.g. 28 and 4 are given. The result is of course 7.
When the numbers are bigger, e.g. 1,234,567 and 123, the result is not so
obvious. Therefore we will allow an estimate for the result, e.g. 10,000. If the
estimate is near enough to the true result then the student will get a grade of
100%. If it's not so near the grade could be 40%. 0% are given if the difference
is to big.

The grading will be done by the server plugin.

First we create a new directory for the plugin. This directory must be created as
subdirectory of the directory plugins. On the client side the plugin is called `Division`.
We must use the same name but in lower case.

```
cd src/plugins
mkdir division
```

In this directory we create the file `main.ts` with the content

```ts
import { Task } from 'src/tasks/task.entity'
import { Submission } from '../../submissions/submission.entity'

function evaluate(submission: Submission, task: Task): any {
  let solution: any = submission.solution
  let details: any = task.details

  let correct = Number(details.number1) / Number(details.number2)
  let solutionValue = Number(solution.value)
  let diff = Math.abs(correct - solutionValue) / correct

  let grade = Math.max(0, 1 - diff)

  return {
    grade,
    feedback: {
      correct,
      diff
    }
  };
}

export { evaluate }
```

We have to define and export a function `evaluate`. This function gets the
arguments `submission` and `task`. It has to return an object with the
properties `grade`, a value in the range from 0 to 1 (i.e. 0% to 100%), and
`feedback`, which is an object containing feedback for the student. `feedback`
may have any properties. It is the responsibility of the client plugin to
display this feedback object.

## User Roles

There are the roles `student`, `teacher` and `admin`. The `user` entity has
the field `role` which contains one of these values.

Some API endpoints are secured by a RolesGuard. The roles are hierarchical, i.e.
they are assigned as defined in `jwt.strategy.ts`:

```ts
switch (payload.user.role) {
  case 'student':
    roles = ['student']
    break;
  case 'teacher':
    roles = ['teacher', 'student']
    break;
  case 'admin':
    roles = ['admin', 'teacher', 'student']
    break;
}
```

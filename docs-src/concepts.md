# Concepts

## Overview

Here we will explain the basic concepts of Doatask such as tasks, assignments and
submissions.

## User

There are three types of users:

* student
* teacher
* admin

A student solves or practices tasks. A teacher defines the tasks and groups them
to assignments. An admin manages the system.

Users can register and log in directly to Doatask. It is also possible to use
Doatask via an LTI platform such as Moodle. The platform then transfers the log
in to Doatask.

## Domains

Each task is assigned to a knowledge domain. There is a separate rating number
for each knowledge domain for each student.

The domains should not be to narrow. For example, it could be the domains of
mathematics and geography.

## Task

Tasks are defined by teachers and solved by students.

Doatask is not limited to tasks of a certain type. The plugin system allows
adding new types of tasks. These can be e.g. multiple-choice tasks or
mathematical tasks, but also e.g. clicking cities on a map.

## Assignment

Tasks can be grouped into assignments. Each assignment thus contains one or more
tasks. Within an assignment, each task has a weight and an optional time limit.

The weight defines the percentage of the task in the evaluation of the whole
assignment. The percentage is the weight of the task in relation to the sum of
the weights of all tasks. For example, if there are three tasks with a weight of
2,3 and 5, the percentages are 20%, 30% and 50%. This makes it easy to insert
new tasks without having to recalculate the percentages.

The optional time limit is specified in seconds and is the time the student has
to solve the task. The student must then complete the task in the specified
time. Otherwise, they will not receive any points for this task.

## Ratings

Tasks are assigned to knowledge domains. Students receive a rating number per
knowledge domain that reflects their skills in that knowledge domain. The better
the skills in that knowledge domain, the higher this rating number. In addition,
each task in a knowledge domain also receives a rating number that expresses its
difficulty. The higher this rating number is, the more difficult the task is.

If a student solves a task correctly, the student's rating number will increase
and the task's rating number will decrease. If a student solves a task
incorrectly, the student's rating number will fall and the task's rating number
will rise.

The [Glicko rating
system](https://www.tandfonline.com/doi/abs/10.1080/02664760120059219) from
Glickman is used for this purpose. The Glicko rating system has proven
itself in practice. Among other things, it is used to
[evaluate](https://chesstempo.com/manual/en/manual.html#tacticratingsystem) the
abilities of chess players or chess problems.

## Submission

There are two types of submissions: the student can submit a task within an
assignment and they can submit an entire assignment.

When a task is submitted, it is graded and the student receives feedback on the
percentage achieved. An assignment should normally only be submitted if all
tasks in that assignment have already been submitted.

Doatask then calculates the grade of the assignment from the grade of the
individual tasks. The weight of the tasks within the assignment is used for the
percentage weighting of the grade.

If the student has logged in through an LTI platform such as Moodle, the grade
for this assignment will be reported to that platform.

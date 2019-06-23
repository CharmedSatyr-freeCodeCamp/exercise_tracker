# ![FCC](https://charmed.tech/fcc-32x32.png) Exercise Tracker

[![Build Status](https://travis-ci.com/charmedsatyr-freecodecamp/exercise_tracker.svg?branch=master)](https://travis-ci.com/charmedsatyr-freecodecamp/exercise_tracker) [![Greenkeeper badge](https://badges.greenkeeper.io/charmedsatyr-freecodecamp/exercise_tracker.svg)](https://greenkeeper.io/)

#### An APIs and Microservices Project for freeCodeCamp

### Author: [CharmedSatyr](https://github.com/CharmedSatyr)

### Date Completed: June 23, 2019

### Links and Resources

* [Requirements](https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/exercise-tracker)
* [GitHub Repository](https://github.com/charmedsatyr-freecodecamp/exercise_tracker)
* [Heroku Deployment](https://charmed-exercise-tracker.herokuapp.com/)


---

### Technologies

* HTML
* CSS
* Express
* Mongoose

---

### User Stories

1. I can create a user by posting form data `username` to `/api/exercise/new-user` and returned will be an object with `username` and `_id`.
1. I can get an array of all users by getting `api/exercise/users` with the same info as when creating a user.
1. I can add an exercise to any user by posting form data `userId` (`_id`), `description`, `duration`, and optionally `date` to `/api/exercise/add`. If no `date` is supplied, it will use the current date. Returned will be the user object with the `exercise` fields added.
1. I can retrieve a full exercise log of any user by getting `/api/exercise/log` with a parameter of `userId` (`_id`). Return will be the user object with added array `exercises` log and `count` (total exercise count).
1. I can retrieve part of the log of any user by also passing along optional parameters of `from`, `to`, and/or `limit`. (Date format `yyyy-mm-dd`, limit = int)
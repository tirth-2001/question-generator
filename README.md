# Question Paper Generator

## How to run

- Clone the repo using `git clone https://github.com/tirth-2001/question-generator.git`
- In the root directory of the project, run `npm install`
- After the libraries are installed, execute `npm start` command.
- Once the file run successfully, open the following URL in your browser `http://localhost:8080/doc`
- In the above page you can see the Models and API Routes which can be executed right in the browser.

## Generate Questions

- In Postman head on to the following route `http://localhost:8080/api/v1/generate-questions?totalMarks=100&easyPercentage=20`
- Executing this request will generate the questions based on requested difficulty level.
- You can change the query parameters for more testing.

## Features

- Swagger Documentation is added using `swagger-ui-express` and `swagger-autogen` libraries.
- API Health Check Route is added : `http://localhost:8080/ping`
- MVC based coding pattern
- Handling error like : `not enough questions in question store`
- Alongwith the difficulty based questions we are also generating questions grouped by `subject`
- Also the API response have a provision of `randomizedQuestions`. In which we get the questions (as per the difficulty constraints) in random order. This can be a cool utility feature for taking test.
- To extend this on large scale, the folder structure will benefit us. `services` folder contains the business logic, `models` folder consists of Collection Schema, `controller` will manage routing and handling req-res cycle.
- Currently the API is mounted on `/api/v1`. Which means in future if any major updates needs to be added, then we can mount that on `/api/v2`. This will keep both workflows separate from each other. And user can get uniteruptted service.

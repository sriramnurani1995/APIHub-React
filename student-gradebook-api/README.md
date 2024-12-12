---
# Student Gradebook API

A scalable and lightweight API for managing and retrieving student grades. The API includes functionalities for generating random gradebook data and serving it through well-defined endpoints. It is designed to be educational, providing a backend that can be consumed for assignments and projects.
---

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Endpoints](#endpoints)
4. [Installation](#installation)
5. [Running Locally](#running-locally)
6. [Docker Instructions](#docker-instructions)
7. [Deployment](#deployment)
8. [Technologies Used](#technologies-used)

---

## Introduction

The **Student Gradebook API** provides a structured backend for courses and grade management. It includes:

- Randomized data generation for students, assignments, and their grades.
- Weightage-based grade calculations and letter-grade assignments.
- API endpoints to fetch course data and gradebooks.

---

## Features

- **Randomized Data**: Automatic generation of random grades, assignments, and courses on first run.
- **Customizable Weights**: Modify weightage for Homework, Discussions, and Exams.
- **RESTful API**: Access header information and gradebook data through well-structured endpoints.
- **Dockerized Deployment**: Easily deployable using Docker and Docker Compose.

---

## Endpoints

### 1. **Get Header Information**

- **Endpoint**: `/api/header/:courseId`
- **Description**: Retrieves course-specific header information, including components and their weightage.
- **Example Request**:
  ```bash
  curl http://localhost:8000/api/header/CS500
  ```
- **Example Response**:
  ```json
  {
    "courseId": "CS500",
    "header": {
      "components": [
        { "type": "Homework", "weightage": 40, "maxMarks": 200 },
        { "type": "Discussions", "weightage": 30, "maxMarks": 50 },
        { "type": "Final Exam", "weightage": 30, "maxMarks": 100 }
      ]
    }
  }
  ```

### 2. **Get Complete Gradebook**

- **Endpoint**: `/api/gradebook/:courseId`
- **Description**: Retrieves the full gradebook for a course, including individual scores, percentages, and final grades.
- **Example Request**:
  ```bash
  curl http://localhost:8000/api/gradebook/CS500
  ```
- **Example Response**:
  ```json
  {
    "courseId": "CS500",
    "gradebook": [
      {
        "studentId": "1001",
        "name": "John Doe",
        "components": [
          {
            "type": "Homework",
            "component": "HW1",
            "marks": 90,
            "totalMarks": 100
          },
          {
            "type": "Final Exam",
            "component": "Final",
            "marks": 80,
            "totalMarks": 100
          }
        ],
        "typePercentages": { "Homework": 90, "Final Exam": 80 },
        "finalPercentage": 85,
        "finalGrade": "B"
      }
    ]
  }
  ```

---

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-repo/student-gradebook-api.git
   cd student-gradebook-api
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Server**:
   ```bash
   npm start
   ```
   Access the server at [http://localhost:8000](http://localhost:8000).

---

## Running Locally

1. **Run the Development Server**:

   ```bash
   npm run dev
   ```

2. **Test the Endpoints**:

   - Use `curl`, Postman, or a browser to hit the endpoints:
     - [http://localhost:8000/api/header/CS500](http://localhost:8000/api/header/CS500)
     - [http://localhost:8000/api/gradebook/CS500](http://localhost:8000/api/gradebook/CS500)

3. **Error Handling**:
   - Ensure required JSON files (e.g., `header.json` and `gradebook.json`) exist or are generated on the first run.

---

## Docker Instructions

1. **Build the Docker Image**:

   ```bash
   docker build -t student-gradebook-api .
   ```

2. **Run the Docker Container**:

   ```bash
   docker run -it --rm -p 8000:8000 student-gradebook-api
   ```

3. **Verify the API**:

   - Open [http://localhost:8000](http://localhost:8000) to view the landing page.
   - Test the API endpoints as described above.

4. **Stop Running Containers**:
   ```bash
   docker ps
   docker stop <container_id>
   ```

---

## Deployment

1. **Prepare for Cloud Deployment**:

   - Use **Google Cloud Run**, **AWS ECS**, or **Heroku** to deploy the Dockerized API.

2. **Push the Docker Image to a Registry**:

   ```bash
   docker tag student-gradebook-api gcr.io/<project-id>/student-gradebook-api
   docker push gcr.io/<project-id>/student-gradebook-api
   ```

3. **Deploy to Cloud Run**:

   ```bash
   gcloud run deploy student-gradebook-api \
       --image gcr.io/<project-id>/student-gradebook-api \
       --platform managed \
       --region <region> \
       --allow-unauthenticated
   ```

4. **Access the API**:
   Visit the deployed URL to test the application.

---

## Technologies Used

- **Node.js**: Backend runtime.
- **Express.js**: Web framework for API development.
- **TypeScript**: Type-safe JavaScript for maintainability.
- **Docker**: Containerization for easy deployment.
- **JSON**: Data storage and exchange format.

---

## Contribution

Contributions are welcome! Please fork the repository and submit a pull request for any improvements.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this as needed. Let me know if you'd like to add or revise any sections! 😊

**Google Drive Video Download & Upload API**

📝 Introduction
------------

Google Drive Video Download & Upload APIs enable seamless integration for retrieving and uploading video content to Google Drive, enhancing application capabilities.

This project provides APIs to interact with Google Drive for downloading and uploading video files. It simplifies the process of integrating Google Drive functionality into applications, allowing users to access and manage their video content stored on Google Drive.


🌐 Hosted Live
-----------

This project is hosted live and accessible for use. You can interact with the Google Drive Video Download & Upload APIs by visiting the following link:

[Live Demo](https://google-drive-api-e228.onrender.com/api-docs) 🚀

### 📝 Usage Instructions

1.  Access the provided link to navigate to the live demo.
    
2.  Follow the provided documentation to learn how to use the APIs for downloading and uploading video content to Google Drive.
    
3.  Enjoy the seamless integration and enhanced capabilities for managing video files with Google Drive.



🛠️ Stack Used
----------

This project utilizes the following technologies:

### 📌 NestJS 

[NestJS](https://nestjs.com/) is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It provides an organized structure for building APIs and services.

### 📌 Swagger with NestJS

[Swagger](https://swagger.io/) is used with NestJS to document and define the API endpoints. It provides a structured format for describing APIs, making them easier to understand and consume.

### 📌 PostgreSQL

[PostgreSQL](https://www.postgresql.org/) is an open-source relational database management system known for its reliability and robust feature set. It's used in this project for storing application data.

### 📌 Docker & Docker Compose

[Docker](https://www.docker.com/) and Docker Compose are used for containerization and orchestration of the application and its dependencies. They provide a consistent environment across different platforms and simplify the deployment process.

### 📌 Google APIs

Google APIs are utilized for interacting with Google Drive. This includes authentication, authorization, and accessing Google Drive's functionalities for downloading and uploading video content.


🧪 Test Cases Covered
----------
Here's a tabular representation of the test cases covered for the Google Drive Video Download & Upload API:


These test cases cover various scenarios to ensure the functionality, reliability, and error handling of the Google Drive Video Download & Upload API.

### ✅ Test Case 1: Video download and Upload Task has been initiated.

**Test URL:** https://google-drive-api-e228.onrender.com/videos/download/1thGYHGVw71UPqNeQ4gvq54ARwPb7akB2/1LgzxlGpkC5Fg-f-KL0bvucgbIVz8rkXk
<br>
**Response:** {
                "statusCode": 200,
                "message": "Video download and Upload Task has been initiated."
              }


### ✅ Test Case 2: Not Found

**Test URL:** https://google-drive-api-e228.onrender.com/videos/download/1thGYHGVw71UPqNeQ4gvq4ARwPb7akB2/1LgzxlGpkC5Fg-f-KL0bvucgbIVz8rkXk
<br>
**Response:** {
  "statusCode": 404,
  "message": "File not found: 1thGYHGVw71UPqNeQ4gvq4ARwPb7akB2."
}


### ✅ Test Case 3: API Service is under maintenance

**Test URL:** https://google-drive-api-e228.onrender.com/videos/download/1thGYHGVw71UPqNeQ4gvq54AwPb7akB2/1LgzxlGpkC5Fg-f-KL0bvucgbIVz8rkXk
<br>
**Response:** {
                "statusCode": 503,
                "message": "API is under maintenance, Please try again after some time"
              }

### ✅ Test Case 4: API Service is under maintenance

**Test URL:** https://google-drive-api-e228.onrender.com/videos/download/1thGYHGVw71UPqNeQ4gvq54AwPb7akB2/1LgzxlGpkC5Fg-f-KL0bvucgbIVz8rkXk
<br>
**Response:** {
                "statusCode": 503,
                "message": "API is under maintenance, Please try again after some time"
              }


### ✅ Test Case 5: API Service is under maintenance

**Test URL:** https://google-drive-api-e228.onrender.com/videos/download/1thGYHGVw71UPqNeQ4gvq54AwPb7akB2/1LgzxlGpkC5Fg-f-KL0bvucgbIVz8rkXk
<br>
**Response:** {
                "statusCode": 503,
                "message": "API is under maintenance, Please try again after some time"
              }


### ❗ Use the below mentioned APIs to test the use cases.


💻 Local Setup
----------

For setting up the Google Drive Video Download & Upload API project locally, follow these steps:

### 📝 Prerequisites:

1.  Node.js and npm installed on your machine.
    
2.  PostgreSQL installed and running locally.
    
3.  Docker and Docker Compose installed (optional if you prefer to run services via containers).
    

### 📝 Steps:

1. Clone the Repository.
    ```
     git clone https://github.com/your-repo/google-drive-api.git 
    ``` 
    
2.  Switch directory
    ```
        cd google-drive-api
    ``` 
    
3.  Switch directory
    ```
        npm install
    ``` 
    
4.  **🔑 Set Up api-key.json file:**
    
    *   Create a **api-key.json** file inside src > assets.
        
    *   This will allow you to test these APIs in your drives.
        
5.  Run docker command
    ```
        docker compose build
        docker compose up
    ``` 
    
6.  **🌐 Access the Application:**
    
    *   Once the application is running, you can access it via **🚀 http://localhost:3000/api-docs** or the port specified in your environment variables.


Happy integrating! 🚀
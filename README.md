### Installation Backend
## Versions
- **NodeVersion**:v22.14.0
- **MongoDB**:8.0.5

1. Clone the repository:
   ```sh
   git clone https://github.com/VikramPatel-Simform/trainee_backend
   
2. Navigate to the project directory
    ```sh
    cd trainee_backend
3. Install dependencies
     ```sh
     npm install
4. Setup .env file by rename it and changing it value
    ```sh
     mv .env.example .env
5. Start the back-end server:
   ```sh
   node server.js
6. The backend Server is started on the PORT You have specified

7. [API Endpoints]
   - POST /signup - Used to signup the user
   - POST /login - Used for login the user
   - GET /user/:id - To get the information of specific User
   - PUT /user/:id - To Update specific user
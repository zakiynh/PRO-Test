# Project Setup & Functionalities

## 1. Clone Repository

Clone the project repository from GitHub:

```sh
git clone <repository_url>
cd <project_folder>
```

## 2. Install Dependencies

Install the required dependencies for both **Backend (BE)** and **Frontend (FE)**:

```sh
cd BE
npm install  # or yarn install
cd ../FE
npm install  # or yarn install
```

## 3. Create Database using Sequelize

Copy the .env.example file to .env and set the necessary variables for both **Backend (BE)** and **Frontend (FE)**:

```sh
# For Backend (BE)
cd BE
cp .env.example .env
# Edit .env file and set the necessary variables

# For Frontend (FE)
cd ../FE
cp .env.example .env
# Edit .env file and set the necessary variables
```

## 4. Create Database using Sequelize

Run the following command to create the database:

```sh
npx sequelize db:create
```

## 5. Migrate Database using Sequelize

Apply all migrations to set up database schema:

```sh
npx sequelize db:migrate
```

## 6. Seed Initial Data (Admin User)

Run the following command to seed initial data:

```sh
npx sequelize db:seed:all
```

---

# Application Functionalities

## 1. Start the Application

Run the backend and frontend servers:

```sh
cd BE
npm run dev
cd ../FE
npm run dev
```

## 2. Login Page

- Open the login page.
- Use the admin credentials from seeding:
  ```
  Email: admin@example.com
  Password: adminpassword
  ```
- Click **Sign In** to authenticate. This will send a request to:
  ```
  POST http://{baseurl}:{host}/api/auth/login
  ```

## 3. Register Page

- If the user does not have an account, click **Sign Up**.
- Fill out the registration form.
- Click **Sign Up**, which will send a request to:
  ```
  POST http://{baseurl}:{host}/api/auth/register
  ```

## 4. Admin Panel (CMS)

If the user is an admin, they will be redirected to the **Admin Page**, which contains:

- A table displaying all users.
- A **Logout** button.
- A search bar to filter by name or email.
- A date filter (start date and end date) for user registration.
- Pagination (10 users per page).

## 5. User Table

The table consists of the following columns:

```
No | Full Name | DOB | Gender | Email | Registration Date | Actions
```

## 6. Edit User

- Click the **Edit** button to open a modal form.
- The form contains fields for:
  - Full Name
  - Email
  - Role
  - Gender
  - Date of Birth (DOB)
- Click **Save Changes** to update user data:
  ```
  PUT http://{baseurl}:{host}/api/users/:id
  ```
- Click **Cancel** to close the modal.

## 7. Delete User

- Click the **Delete** button to open a confirmation modal.
- The modal will ask:
  ```
  Are you sure you want to delete this user?
  ```
- Click **Yes, Delete** to remove the user:
  ```
  DELETE http://{baseurl}:{host}/api/users/:id
  ```
- Click **Cancel** to close the modal.

## 8. Logout

- Click **Logout**, which will:
  - Send a request to:
    ```
    POST http://{baseurl}:{host}/api/auth/logout
    ```
  - Clear cookies and session data.

## 9. Member Dashboard

- When logged in as a **member**, the user is redirected to `/dashboard`.
- The page displays:
  ```
  Welcome, (User)
  ```
- A **Logout** button is available to log out.

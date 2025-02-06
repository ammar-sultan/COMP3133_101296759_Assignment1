# GraphQL Queries and Mutations

## 1. Signup (Mutation) - Create a New Account

```graphql
mutation {
  signup(username: "tommy", email: "tommy@example.com", password: "12345678") {
    id
    username
    email
  }
}
```

## 2. Login (Query) - Authenticate User

```graphql
query {
  login(username: "tommy", password: "12345678") {
    userId
    token
  }
}
```

## 3. Get All Employees (Query)

```graphql
query {
  getAllEmployees {
    id
    first_name
    last_name
    email
  }
}
```

## 4. Add a New Employee (Mutation)

```graphql
mutation {
  addEmployee(
    first_name: "Alice"
    last_name: "Bab"
    email: "alice@example.com"
    gender: "Female"
    designation: "Developer"
    salary: 231000
    date_of_joining: "2013-01-01"
    department: "Health"
    employee_photo: "http://example.com/photo.jpg"
  ) {
    id
    first_name
    last_name
  }
}
```

## 5. Search Employee by ID (Query)

```graphql
query {
  getEmployeeById(eid: "67a5155fe7a5111b10851307") {
    id
    first_name
    last_name
    designation
    department
    salary
  }
}
```

## 6. Update Employee by ID (Mutation)

```graphql
mutation {
  updateEmployee(
    eid: "67a5155fe7a5111b10851307"
    last_name: "Liu"
    designation: "Senior Engineer"
    salary: 380000
  ) {
    id
    first_name
    last_name
    designation
    department
    salary
  }
}
```

## 7. Delete Employee by ID (Mutation)

```graphql
mutation {
  deleteEmployee(eid: "67a5155fe7a5111b10851307")
}
```

## 8. Search Employees by Designation or Department (Query)

```graphql
query {
  searchEmployee(designation: "Developer") {
    id
    first_name
    designation
    department
    salary
  }
}
```

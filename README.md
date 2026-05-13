# ToDo-List

## 📌 Overview
A full-stack ToDo List application built with Angular and .NET, following clean architecture principles (CQRS + MediatR). The system allows users to manage tasks efficiently with statuses and deadlines.

---

## ✨ Features

- ➕ Create tasks  
- ✏️ Edit tasks  
- 🗑️ Delete tasks  
- 🔄 Change task status (Todo, In Progress, Done)  
- 📅 Set deadlines using a calendar component
- 🔍 Search tasks by title or description
   
---

## 🛠️ Tech Stack

### Frontend
- HTML, CSS, TypeScript  
- Angular  
- NgRx (state management)  
- Jest (unit testing)  
- UI library: Angular Material 

### Backend
- .NET 10.0 Web API  
- Entity Framework Core  
- MediatR + CQRS pattern  
- N-layer architecture  
- xUnit (unit testing + coverage)  

### Database
- Microsoft SQL Server (MSSQL)

---

## 🧱 Architecture

The project follows a **Client–Server architecture** with a clean, layered backend design based on **Clean Architecture principles**.

### Backend (.NET 10)

The backend is structured into the following layers:

- **Presentation Layer**
  - ASP.NET Core Web API
  - Controllers (HTTP endpoints)
  - Request/Response handling

- **Application Layer**
  - CQRS pattern (Commands & Queries)
  - MediatR for request handling
  - Business use cases and application logic

- **Domain Layer**
  - Core entities
  - Business rules
  - Domain models

- **Infrastructure Layer**
  - Entity Framework Core (EF Core)
  - Database access and configuration
  - External services integration

### Frontend (Angular)

- Angular standalone components
- NgRx for state management
- Services for API communication
- Reactive forms and component-based architecture

### Key Principles

- Separation of concerns
- Dependency inversion
- Single responsibility principle
- Scalable and testable structure


## 🚀 How to Run Locally

## 1. Clone repository
```
git clone https://github.com/Shyshkanova2005/ToDo-List.git
cd ToDo-List
```

## 2. Restore dependencies
```
dotnet restore
```

## 3. Configure database
Update connection string in appsettings.json:
```
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=YOUR_DB;User Id=YOUR_USER;Password=YOUR_PASSWORD;TrustServerCertificate=True"
}
```

## 4. Apply migrations
```
dotnet ef database update --project ToDoList.Infrastructure --startup-project ToDoList.Api
```

## 5. Run application
```
dotnet run --project ToDoList.Api
```

## 6. Run tests
```
dotnet test
```

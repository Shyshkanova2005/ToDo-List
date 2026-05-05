# ToDo-List
Feature: ToDo List Functionality  

Implement a ToDo List module within the application with the following capabilities:  

Functional Requirements:

Create tasks<br>
Edit tasks<br>
Delete tasks as needed<br>
Change task status (Todo, In Progress, Done)<br>
Add a calendar component to set task deadlines<br>
Technology Stack:<br>

HTML, CSS, TypeScript<br>
Angular, Redux (Redux Toolkit)<br>
AntDesign/MUI (optional)<br>
Jest<br>
.NET 9.0 (Backend)<br>
EF Core<br>
MediatR + CQRS<br>
N-layer architecture<br>
XUnit tests + coverage<br>
Mapper (optional)<br>
Serilog (optional)<br>
Docker local setup (optional)<br>
MSSQL database<br>
(Optional) Integrate OpenTelemetry (frontend & backend), export traces and metrics to an OTLP exporter (e.g., SigNoz) to enable complete end-to-end tracing and logging<br>
Acceptance Criteria:<br>

All main ToDo List features work as described<br>
Codebase follows the listed technology stack<br>
Optional improvements are documented if not implemented in the first iteration<br>

##🚀 How to Run Locally

## 🌿 Branch

Current working branch: `feature/todo-backend`

👉 Please switch branch in GitHub to view latest changes.

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

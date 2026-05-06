using Xunit;
using Microsoft.EntityFrameworkCore;
using ToDoList.Infrastructure.Persistence;
using ToDoList.Application.Tasks.Queries;
using ToDoList.Domain.Entities;
using ToDoList.Domain.Enums;

namespace ToDoList.Tests.Queries
{
    public class TaskQueryTests
    {
        [Fact]
        public async Task GetAllTasks_Should_Return_All_Tasks()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            var context = new AppDbContext(options);

            context.Tasks.AddRange(
            new TaskItem { Id = Guid.NewGuid(), Title = "Task 1", Status = ToDoTaskStatus.Todo, CreatedAt = DateTime.UtcNow },
            new TaskItem { Id = Guid.NewGuid(), Title = "Task 2", Status = ToDoTaskStatus.Done, CreatedAt = DateTime.UtcNow }
            );

            await context.SaveChangesAsync(CancellationToken.None);

            var handler = new GetAllTasksHandler(context);

            var result = await handler.Handle(new GetAllTasksQuery(), CancellationToken.None);

            Assert.Equal(2, result.Count);

        }

        [Fact]
        public async Task GetTaskById_Should_Return_Correct_Task()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

            var context = new AppDbContext(options);

            var task = new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = "Find me",
                Status = ToDoTaskStatus.Todo,
                CreatedAt = DateTime.UtcNow
            };

            context.Tasks.Add(task);
            await context.SaveChangesAsync(CancellationToken.None);

            var handler = new GetTaskByIdHandler(context);

            var result = await handler.Handle(
                new GetTaskByIdQuery { Id = task.Id },
                CancellationToken.None
            );

            Assert.NotNull(result);
            Assert.Equal("Find me", result!.Title);
        }
    }
}

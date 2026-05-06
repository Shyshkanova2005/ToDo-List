using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory;
using ToDoList.Application.Tasks.Commands;
using ToDoList.Domain.Entities;
using ToDoList.Domain.Enums;
using ToDoList.Infrastructure.Persistence;
using Xunit;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace ToDoList.Tests.Commands
{
    public class CreateTaskCommandHandlerTests
    {
        [Fact]
        public async Task CreateTaskHandler_Should_Add_Task_To_Database()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            var context = new AppDbContext(options);
            var handler = new CreateTaskHandler(context);

            var command = new CreateTask
            {
                Title = "Test Task",
                Description = "This is a test task.",
                Deadline = DateTime.UtcNow.AddDays(7)
            };

            var result = await handler.Handle(command, CancellationToken.None);

            var task = await context.Tasks.FindAsync(result);

            Assert.NotNull(task);
            Assert.Equal("Test Task", task.Title);
        }

        [Fact]
        public async Task UpdateTask_Should_Change_Title()
        {
            var option = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            var context = new AppDbContext(option);

            var task = new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = "Old Title",
                Status = ToDoTaskStatus.Todo,
                CreatedAt = DateTime.UtcNow
            };

            context.Tasks.Add(task);
            await context.SaveChangesAsync(CancellationToken.None);

            var handler = new UpdateTaskHandler(context);
            var command = new UpdateTask
            {
                Id = task.Id,
                Title = "New title"
            };

            await handler.Handle(command, CancellationToken.None);

            var updated = await context.Tasks.FindAsync(task.Id);

            if (updated == null)
            {
                throw new Exception("Task was not found in database");
            }

            Assert.Equal("New title", updated.Title);

        }

        [Fact]
        public async Task DeleteTask_Should_Remove_Task()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

            var context = new AppDbContext(options);

            var task = new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = "To delete",
                Status = ToDoTaskStatus.Todo,
                CreatedAt = DateTime.UtcNow
            };

            context.Tasks.Add(task);
            await context.SaveChangesAsync(CancellationToken.None);

            var handler = new DeleteTaskHandler(context);
            var command = new DeleteTask
            {
                Id = task.Id
            };

            await handler.Handle(command, CancellationToken.None);

            var deleted = await context.Tasks.FindAsync(task.Id);

            Assert.Null(deleted);
        }
    }
}
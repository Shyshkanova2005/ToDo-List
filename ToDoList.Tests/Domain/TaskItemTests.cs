using Xunit;
using ToDoList.Domain.Enums;

namespace ToDoList.Tests.Domain
{
    public class TaskItemTests
    {
        [Fact]
        public void TaskStatus_Should_Be_Todo_By_Default()
        {
            var status = ToDoTaskStatus.Todo;

            Assert.Equal(ToDoTaskStatus.Todo, status);
        }

        [Fact]
        public void TaskStatus_Should_Change_Correctly()
        {
            var status = ToDoTaskStatus.Todo;

            status = ToDoTaskStatus.InProgress;

            Assert.Equal(ToDoTaskStatus.InProgress, status);
        }

        [Fact]
        public void TaskStatus_Should_Be_Done()
        {
            var status = ToDoTaskStatus.Done;

            Assert.Equal(ToDoTaskStatus.Done, status);
        }
    }
}

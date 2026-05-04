using Xunit;
using ToDoList.Application.Tasks.Commands;


namespace ToDoList.Tests.Validation
{
    public class CreateTaskValidatorTests
    {
        private readonly CreateTaskValidator _validator = new();

        [Fact]
        public void Should_Have_Error_When_Title_Is_Empty()
        {
            var command = new CreateTask
            {
                Title = "",
                Deadline = DateTime.UtcNow.AddDays(1)
            };

            var result = _validator.Validate(command);

            Assert.False(result.IsValid);
        }

        [Fact]
        public void Should_Have_Error_When_Deadline_Is_In_Past()
        {
            var command = new CreateTask
            {
                Title = "Test",
                Deadline = DateTime.UtcNow.AddDays(-1)
            };

            var result = _validator.Validate(command);

            Assert.False(result.IsValid);
        }

        [Fact]
        public void Should_Pass_When_Data_Is_Valid()
        {
            var command = new CreateTask
            {
                Title = "Valid Task",
                Deadline = DateTime.UtcNow.AddDays(1)
            };

            var result = _validator.Validate(command);

            Assert.True(result.IsValid);
        }
    }
}

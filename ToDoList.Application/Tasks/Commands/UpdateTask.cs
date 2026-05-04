using MediatR;
using ToDoList.Domain.Enums;

namespace ToDoList.Application.Tasks.Commands
{
    public class UpdateTask : IRequest
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public ToDoTaskStatus Status { get; set; }
        public DateTime? Deadline { get; set; }
    }
}

using MediatR;
using ToDoList.Domain.Enums;

namespace ToDoList.Application.Tasks.Commands
{
    public class CreateTask : IRequest<Guid>
    {
        public string Title { get; init; } = default!;
        public string? Description { get; init; }
        public DateTime? Deadline { get; init; }
        public ToDoTaskStatus Status { get; init; }
    }
}

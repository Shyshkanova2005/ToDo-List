using MediatR;
using ToDoList.Domain.Enums;

namespace ToDoList.Application.Tasks.Commands
{
    public class ChangeTaskStatus : IRequest
    {
        public Guid Id { get; set; }
        public ToDoTaskStatus Status { get; set; }
    }
}

using MediatR;

namespace ToDoList.Application.Tasks.Commands
{
    public class DeleteTask : IRequest
    {
        public Guid Id { get; set; }
    }
}

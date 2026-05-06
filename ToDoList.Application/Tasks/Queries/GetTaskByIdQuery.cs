using MediatR;
using ToDoList.Application.Tasks.DTOs;

namespace ToDoList.Application.Tasks.Queries
{
    public class GetTaskByIdQuery : IRequest<TaskDto>
    {
        public Guid Id { get; set; }
    }
}

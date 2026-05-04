using MediatR;
using ToDoList.Application.Tasks.DTOs;

namespace ToDoList.Application.Tasks.Queries
{
    public class GetAllTasksQuery : IRequest<List<TaskDto>>
    {
    }
}

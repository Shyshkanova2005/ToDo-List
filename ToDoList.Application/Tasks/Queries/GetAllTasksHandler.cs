using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDoList.Application.Common.Interfaces;
using ToDoList.Application.Tasks.DTOs;

namespace ToDoList.Application.Tasks.Queries
{
    public class GetAllTasksHandler : IRequestHandler<GetAllTasksQuery, List<TaskDto>>
    {
        private readonly IAppDbContext _context;

        public GetAllTasksHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TaskDto>> Handle(GetAllTasksQuery request, CancellationToken cancellationToken)
        {
            return await _context.Tasks
                .Select(x => new TaskDto
                {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    Status = x.Status,
                    Deadline = x.Deadline
                })
                .ToListAsync(cancellationToken);
        }
    }
}
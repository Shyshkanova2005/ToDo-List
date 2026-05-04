using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDoList.Application.Common.Interfaces;
using ToDoList.Application.Tasks.DTOs;

namespace ToDoList.Application.Tasks.Queries
{
    public class GetTaskByIdHandler : IRequestHandler<GetTaskByIdQuery, TaskDto>
    {
        private readonly IAppDbContext _context;

        public GetTaskByIdHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<TaskDto> Handle(GetTaskByIdQuery request, CancellationToken cancellationToken)
        {
            var task = await _context.Tasks
                .Where(x => x.Id == request.Id)
                .Select(x => new TaskDto
                {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    Status = x.Status,
                    Deadline = x.Deadline
                })
                .FirstOrDefaultAsync(cancellationToken);

            if (task == null)
                throw new Exception("Task not found");

            return task;
        }

    }
}

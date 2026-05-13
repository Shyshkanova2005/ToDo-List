using MediatR;
using ToDoList.Application.Common.Interfaces;
using ToDoList.Domain.Entities;
using ToDoList.Domain.Enums;

namespace ToDoList.Application.Tasks.Commands
{
    public class CreateTaskHandler : IRequestHandler<CreateTask, Guid>
    {
        private readonly IAppDbContext _context;

        public CreateTaskHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(CreateTask request, CancellationToken cancellationToken)
        {
            var task = new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                Description = request.Description,

                Status = request.Status,
                Deadline = request.Deadline,
                CreatedAt = DateTime.UtcNow
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync(cancellationToken);

            return task.Id;
        }
    }
}

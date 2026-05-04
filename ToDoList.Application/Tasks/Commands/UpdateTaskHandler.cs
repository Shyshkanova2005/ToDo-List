using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDoList.Application.Common.Interfaces;

namespace ToDoList.Application.Tasks.Commands
{
    public class UpdateTaskHandler : IRequestHandler<UpdateTask>
    {
        private readonly IAppDbContext _context;

        public UpdateTaskHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task Handle(UpdateTask request, CancellationToken cancellationToken)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (task == null)
                throw new Exception("Task not found");

            task.Title = request.Title;
            task.Description = request.Description;
            task.Status = request.Status;
            task.Deadline = request.Deadline;

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}

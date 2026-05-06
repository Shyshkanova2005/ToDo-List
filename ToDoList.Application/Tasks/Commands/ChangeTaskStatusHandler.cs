using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDoList.Application.Common.Interfaces;

namespace ToDoList.Application.Tasks.Commands
{
    public class ChangeTaskStatusHandler : IRequestHandler<ChangeTaskStatus>
    {
        private readonly IAppDbContext _context;

        public ChangeTaskStatusHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task Handle(ChangeTaskStatus request, CancellationToken cancellationToken)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (task == null)
                throw new Exception("Task not found");
            task.Status = request.Status;
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}

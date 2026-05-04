using MediatR;
using Microsoft.EntityFrameworkCore;
using ToDoList.Application.Common.Interfaces;

namespace ToDoList.Application.Tasks.Commands
{
    public class DeleteTaskHandler : IRequestHandler<DeleteTask>
    {
        private readonly IAppDbContext _context;

        public DeleteTaskHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task Handle(DeleteTask request, CancellationToken cancellationToken)
        {
            var task = await _context.Tasks
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (task == null)
                throw new Exception("Task not found");

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}

using Microsoft.EntityFrameworkCore;
using MediatR;
using ToDoList.Application.Common.Interfaces;

namespace ToDoList.Application.Tasks.Commands
{
    public class DeleteAllTasksHandler : IRequestHandler<DeleteAllTasks>
    {
        private readonly IAppDbContext _context;

        public DeleteAllTasksHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task Handle(DeleteAllTasks request, CancellationToken cancellationToken)
        {
            await _context.Tasks.ExecuteDeleteAsync();
        }
    }
}
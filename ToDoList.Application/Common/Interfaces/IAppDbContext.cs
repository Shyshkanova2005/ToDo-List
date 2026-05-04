using Microsoft.EntityFrameworkCore;
using ToDoList.Domain.Entities;

namespace ToDoList.Application.Common.Interfaces
{
    public interface IAppDbContext
    {
        DbSet<TaskItem> Tasks { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
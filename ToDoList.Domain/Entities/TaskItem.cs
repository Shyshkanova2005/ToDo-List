using System;
using System.Collections.Generic;
using System.Text;
using ToDoList.Domain.Enums;

namespace ToDoList.Domain.Entities
{
    public class TaskItem
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }

        public ToDoTaskStatus Status { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? Deadline { get; set; }
    }

}

using System;
using System.Collections.Generic;
using System.Text;
using ToDoList.Domain.Enums;

namespace ToDoList.Application.Tasks.DTOs
{
    public class TaskDto
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }

        public ToDoTaskStatus Status { get; set; }

        public DateTime? Deadline { get; set; }
    }
}

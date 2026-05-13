using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace ToDoList.Application.Tasks.Commands
{
    public class ChangeTaskStatusValidator : AbstractValidator<ChangeTaskStatus>
    {
        public ChangeTaskStatusValidator() 
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.Status).IsInEnum();
        }
    }
}

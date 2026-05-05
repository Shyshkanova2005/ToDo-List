using FluentValidation;

namespace ToDoList.Application.Tasks.Commands
{
    public class CreateTaskValidator : AbstractValidator<CreateTask>
    {
        public CreateTaskValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty()
                .WithMessage("Title is required.")
                .MinimumLength(3).WithMessage("Title must be at least 3 characters")
                .MaximumLength(100).WithMessage("Title is too long");
            RuleFor(x => x.Description)
                .MaximumLength(500).WithMessage("Description must be under 500 characters")
                .When(x => x.Description != null);
            RuleFor(x => x.Deadline)
                 .GreaterThan(DateTime.UtcNow)
                .WithMessage("Deadline must be in the future")
                .When(x => x.Deadline.HasValue);
        }

        public class UpdateTaskValidator : AbstractValidator<UpdateTask>
        {
            public UpdateTaskValidator()
            {
                RuleFor(x => x.Id)
                    .NotEmpty();
                RuleFor(x => x.Title)
                    .NotEmpty()
                    .MaximumLength(100);
                RuleFor(x => x.Deadline)
                    .Must(d => d == null || d > DateTime.UtcNow)
                    .WithMessage("Deadline must be in the future");
            }

        }
    }
}

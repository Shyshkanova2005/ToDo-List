using FluentValidation;

namespace ToDoList.Application.Tasks.Commands
{
    public class UpdateTaskValidator : AbstractValidator<UpdateTask>
    {
        public UpdateTaskValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty()
                .WithMessage("Task ID is missing.");

            RuleFor(x => x.Title)
                .NotEmpty()
                .WithMessage("Title is required.")
                .MinimumLength(3)
                .WithMessage("Title must be at least 3 characters")
                .MaximumLength(100)
                .WithMessage("Title is too long");

            RuleFor(x => x.Description)
                .MaximumLength(500)
                .WithMessage("Description must be under 500 characters")
                .When(x => x.Description != null);
        }

    }
}

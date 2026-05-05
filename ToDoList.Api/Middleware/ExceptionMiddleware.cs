using FluentValidation;
using System.Net;
using System.Text.Json;


namespace ToDoList.Api.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (ValidationException ex)
            {
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                context.Response.ContentType = "application/json";

                var errors = ex.Errors
                   .Select(e => e.ErrorMessage)
                   .ToList();

                var response = new
                {
                    Status = 400,
                    Errors = errors
                };

                await context.Response.WriteAsync(
                    JsonSerializer.Serialize(errors));
            }
        }
    }
}

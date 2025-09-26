using System;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Commamd : IRequest<string>
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Commamd, string>
    {
        public async Task<string> Handle(Commamd request, CancellationToken cancellationToken)
        {
            context.Activities.Add(request.Activity);

            await context.SaveChangesAsync(cancellationToken);

            return request.Activity.Id;

            //var success = await context.SaveChangesAsync(cancellationToken) > 0;
            //if (success) return request.Activity.Id;
            //throw new Exception("Problem saving changes");
        }
    }
}

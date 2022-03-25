using Domain;
using MediatR;
using Persistence;

namespace Application.Heroes
{
    public class Create
    {
        public class Command : IRequest
        {
            public Hero Hero { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Heroes.Add(request.Hero);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
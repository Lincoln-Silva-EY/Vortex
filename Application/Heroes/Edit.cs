using Domain;
using MediatR;
using Persistence;

namespace Application.Heroes
{
    public class Edit
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
                var hero = await _context.Heroes.FindAsync(request.Hero.Id);

                hero.Name = request.Hero.Name ?? hero.Name;

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
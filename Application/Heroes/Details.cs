using Domain;
using MediatR;
using Persistence;

namespace Application.Heroes
{
    public class Details
    {
        public class Query : IRequest<Hero>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Hero>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Hero> Handle(Query request, CancellationToken cancellationToken)
            {
               return await _context.Heroes.FindAsync(request.Id);
            }
        }
    }
}
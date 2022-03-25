using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Heroes
{
    public class List
    {
        public class Query : IRequest<List<Hero>> { }

        public class Handler : IRequestHandler<Query, List<Hero>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<Hero>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Heroes.ToListAsync();
            }
        }
    }
}
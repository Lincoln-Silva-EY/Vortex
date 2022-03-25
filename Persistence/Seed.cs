using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Lico",
                        UserName = "lico",
                        Email = "lico@test.com"
                    },

                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (context.Heroes.Any()) return;

            var heroes = new List<Hero>
            {
                new Hero
                {
                   Name = "Superman Lego",
                   Race = "Lego",
                   Universe = "DC",
                   Gender = "Male",
                   Alignment = "Good",
                   History = "Virou um lego, fim",
                   Powers = "Ser um lego",
                   PlaceBirth = "Legolandia"
                },
            };

            await context.Heroes.AddRangeAsync(heroes);
            await context.SaveChangesAsync();
        }
    }
}

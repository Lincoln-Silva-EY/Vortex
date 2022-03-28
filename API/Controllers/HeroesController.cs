using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Heroes;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class HeroesController : BaseApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<Hero>>> GetHeroes()
        {
            return await Mediator.Send(new List.Query());
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Hero>> GetHero(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> CreateHero(Hero hero)
        {
            return Ok(await Mediator.Send(new Create.Command { Hero = hero }));
        }
        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditHero(Guid id, Hero hero)
        {
            hero.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Hero = hero }));
        }
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHero(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
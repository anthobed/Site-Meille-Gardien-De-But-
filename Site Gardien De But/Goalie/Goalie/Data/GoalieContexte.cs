using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoalieApi
{
    public class GoalieContext : DbContext
    {
        public GoalieContext(DbContextOptions<GoalieContext> options)
           : base(options)
        {
        }

        public DbSet<Goalie> goalie { get; set; }
    }
}

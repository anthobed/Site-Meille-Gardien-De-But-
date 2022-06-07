using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoalieApi
{
    public class Goalie
    {
        public int Id { get; set; }
        public string Team { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public int Game { get; set; }
        public int Goal { get; set; }

    }
}

using System.Linq;

namespace GoalieApi
{
    public class DBInitializer
    {
        public static void Initializer(GoalieContext goaliecontext)
        {
            goaliecontext.Database.EnsureCreated();
            if (goaliecontext.goalie.Any()) { return; }

            var Mygoalies = new Goalie[]
            {
                new Goalie{Id=0,Team ="https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Boston_Bruins.svg/1200px-Boston_Bruins.svg.png",Name = "Jeremy",Lastname = "Swayman",Game = 11,Goal=16 },
                new Goalie{Id=1,Team ="https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Carolina_Hurricanes.svg/1200px-Carolina_Hurricanes.svg.png",Name=" Alex", Lastname = "Nedeljkovic",Game =32,Goal=66},
                new Goalie{Id=2,Team = "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Colorado_Avalanche_logo.svg/1200px-Colorado_Avalanche_logo.svg.png",Name="Philipp",Lastname="Grubauer",Game = 50 ,Goal= 103 }
            };
            foreach (Goalie i in Mygoalies)
            {
                goaliecontext.goalie.Add(i);
            }
            goaliecontext.SaveChanges();
        }
    }
}

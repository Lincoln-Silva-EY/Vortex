namespace Domain
{
    public class Hero
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Race { get; set; }
        public string Universe { get; set; }
        public string Gender { get; set; }
        public string Alignment { get; set; }
        public string History { get; set; }
        public string Powers { get; set; }
        public string PlaceBirth { get; set; }
        public DateTime CreationDate { get; set; } 
         public char RecStatus { get; set; } = 'A';
    }
}
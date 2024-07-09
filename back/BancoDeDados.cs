using Microsoft.EntityFrameworkCore;

public class BancoDeDados : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        builder.UseMySQL("server=localhost;port=3306;database=backfinal;user=root;password=");
    }

    // Passos no workbench
    //
    // 1. Crie o DB com o nome backfinal
    //
    // 2. Verifique se o DB não tem tabelas que já foram criadas antes (se for um novo 
    // DB pode pular essa etapa)
    //
    // Passos no backend
    //
    // 1. dotnet ef migrations add "VersaoInicial" (isso daqui não precisa necessaiamente
    // apenas se a pasta Migrations não tiver presente)
    //
    // 2. dotnet ef database update
    //
    // 3. dotnet run
    //
    // Passos no frontend
    //
    // 1. npm install
    // 2. npm start
    //
    // Obs: não esqueça de abrir o vscode nas pastas back e front separadamente e não na
    // pasta raiz, senão não funciona
    public DbSet<Individuo> Individuos { get; set; }
    public DbSet<Genoma> Genomas { get; set; }
}
using Microsoft.EntityFrameworkCore;

public static class GenomasApi
{
  public static void MapGenomasApi(this WebApplication app)
  {
    var group = app.MapGroup("/genomas");

    group.MapGet("/", async (BancoDeDados db) =>
      {
        return await db.Genomas.ToListAsync();
      }
    );

    group.MapPost("/", async (Genoma genoma, BancoDeDados db) =>
      {
        db.Genomas.Add(genoma);
        await db.SaveChangesAsync();
        return Results.Created($"/genomas/{genoma.Id}", genoma);
      }
    );

    group.MapPut("/{id}", async (int id, Genoma genomaAlterado, BancoDeDados db) =>
     {
       var genoma = await db.Genomas.FindAsync(id);
       if (genoma is null)
       {
         return Results.NotFound();
       }
       genoma.Sequencia = genomaAlterado.Sequencia;
       genoma.Individuo = genomaAlterado.Individuo;

       await db.SaveChangesAsync();
       return Results.NoContent();
     }
   );

    group.MapDelete("/{id}", async (int id, BancoDeDados db) =>
      {
        if (await db.Genomas.FindAsync(id) is Genoma genoma)
        {
          db.Genomas.Remove(genoma);
          await db.SaveChangesAsync();
          return Results.NoContent();
        }
        return Results.NotFound();
      }
    );

    group.MapGet("/carga", async (BancoDeDados db) =>
      {
        foreach (var genoma in await db.Genomas.ToListAsync())
        {
          db.Genomas.Remove(genoma);
        }

        Genoma genoma1 = new Genoma
        {
          Sequencia = "ABC456",
          Individuo = "Ana"
        };

        Genoma genoma2 = new Genoma
        {
          Sequencia = "XYZ123",
          Individuo = "Carlos"
        };

        db.Genomas.AddRange(genoma1, genoma2);

        await db.SaveChangesAsync();
        return Results.NoContent();
      }
    );
  }
}
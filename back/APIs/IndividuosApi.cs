using Microsoft.EntityFrameworkCore;

public static class IndividuosApi
{
  public static void MapIndividuosApi(this WebApplication app)
  {
    var group = app.MapGroup("/individuos");

    group.MapGet("/", async (BancoDeDados db) =>
      {
        return await db.Individuos.ToListAsync();
      }
    );

    group.MapGet("/{id}", async (int id, BancoDeDados db) =>
      {
        var individuo = await db.Individuos.FindAsync(id);

        if (individuo != null)
        {
          return Results.Ok(individuo);
        }
        else
        {
          return Results.NotFound();
        }
      }
    );

    group.MapPost("/", async (Individuo individuo, BancoDeDados db) =>
      {
        db.Individuos.Add(individuo);
        await db.SaveChangesAsync();
        return Results.Created($"/individuos/{individuo.Id}", individuo);
      }
    );

    group.MapPut("/{id}", async (int id, Individuo individuoAlterado, BancoDeDados db) =>
     {
       var individuo = await db.Individuos.FindAsync(id);
       if (individuo is null)
       {
         return Results.NotFound();
       }
       individuo.Nome = individuoAlterado.Nome;

       await db.SaveChangesAsync();
       return Results.NoContent();
     }
   );

    group.MapDelete("/{id}", async (int id, BancoDeDados db) =>
      {
        if (await db.Individuos.FindAsync(id) is Individuo individuo)
        {
          db.Individuos.Remove(individuo);
          await db.SaveChangesAsync();
          return Results.NoContent();
        }
        return Results.NotFound();
      }
    );

    group.MapGet("/carga", async (BancoDeDados db) =>
    {
      foreach (var individuo in await db.Individuos.ToListAsync())
      {
        db.Individuos.Remove(individuo);
      }

      Individuo individuo1 = new Individuo
      {
        Nome = "Ana"
      };

      Individuo individuo2 = new Individuo
      {
        Nome = "Carlos"
      };

      db.Individuos.AddRange(individuo1, individuo2);

      await db.SaveChangesAsync();
      return Results.NoContent();
    }
  );
  }
}
using System.Threading.Tasks;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public interface IProAgilRepository
    {
        // Geral
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();

        // Eventos

        Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrantes);
        Task<Evento[]> GetAllEventoAsync(bool includePalestrantes);
        Task<Evento> GetEventoAsyncById(int EnventoId, bool includePalestrantes);

        //Palestrante
        Task<Palestrante> GetPalestranteAsyncById(int PalestranteId, bool includeEventos);
        Task<Palestrante[]> GetAllPalestranteAsync(string name, bool includeEventos);



    }
}
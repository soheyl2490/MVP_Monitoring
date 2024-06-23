using MVP_Monitoring.Domain.Entities.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Domain.Repositories.Common
{
    public interface IRepository<T> where T : BaseEntity
    {
        Task InsertAsync(T entity);

        Task UpdateAsync(T entity);

        Task DeleteAsync(T entity);

        Task<bool> DeleteByIdAsync(long id);

        //Query

        Task<T> GetByIdAsync(long id);

        Task<IList<T>> GetAllAsync();

        Task<T> GetAsync(Expression<Func<T, bool>> where);
        Task<TF> GetAsync<TF>(Expression<Func<T, bool>> where, Expression<Func<T, TF>> select);

        Task<IList<T>> GetManyAsync(int skip, int take, params string[] includeProperties);
        Task<IList<T>> GetManyAsync(Expression<Func<T, bool>> where, params string[] includeProperties);
        Task<IList<T>> GetManyAsync(Expression<Func<T, bool>> where, int skip, int take, params string[] includeProperties);
        Task<IList<TF>> GetManyAsync<TF>(Expression<Func<T, bool>> where, Expression<Func<T, TF>> select, params string[] includeProperties);
        Task<IList<TF>> GetManyAsync<TF>(Expression<Func<T, bool>> where, Expression<Func<T, TF>> select, int skip, int take, params string[] includeProperties);

        Task<bool> GetAnyAsync(Expression<Func<T, bool>> where);

        Task<int> GetCountAsync();
        Task<int> GetCountAsync(Expression<Func<T, bool>> where);
    }
}

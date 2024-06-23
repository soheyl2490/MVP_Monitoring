using Microsoft.EntityFrameworkCore;
using MVP_Monitoring.Domain.Entities.Common;
using MVP_Monitoring.Domain.Repositories.Common;
using MVP_Monitoring.Infra.Data.Common.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MVP_Monitoring.Infra.Data.Common.Repositories
{
    public abstract class Repository<T> : IRepository<T> where T : BaseEntity
    {
        protected internal Repository(DataBaseContext databaseContext) : base()
        {
            DatabaseContext =
                databaseContext ??
                throw new ArgumentNullException(paramName: nameof(databaseContext));

            DbSet = DatabaseContext.Set<T>();
        }

        // **********
        public DbSet<T> DbSet { get; }
        // **********

        // **********
        public DataBaseContext DatabaseContext { get; }
        // **********

        public virtual async Task InsertAsync(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(paramName: nameof(entity));
            }

            await DbSet.AddAsync(entity);
        }
        public virtual async Task InsertRangeAsync(List<T> entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(paramName: nameof(entity));
            }

            await DbSet.AddRangeAsync(entity);
        }
        protected virtual void Update(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(paramName: nameof(entity));
            }

            DbSet.Update(entity);
        }

        public virtual async Task UpdateAsync(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(paramName: nameof(entity));
            }

            await Task.Run(() =>
            {
                DbSet.Update(entity);
            });
        }

        public virtual async Task DeleteAsync(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(paramName: nameof(entity));
            }

            entity.IsDeleted = true;

            await Task.Run(() =>
            {
                DbSet.Update(entity);
            });
        }

        public virtual async Task<T> GetByIdAsync(long id)
        {
            return await DbSet.FindAsync(keyValues: id);
        }

        public virtual async Task<bool> DeleteByIdAsync(long id)
        {
            T entity =
                await GetByIdAsync(id);

            if (entity == null)
            {
                return false;
            }

            await DeleteAsync(entity);

            return true;
        }

        public virtual async Task<IList<T>> GetAllAsync()
        {
            // ToListAsync -> Extension Method -> using Microsoft.EntityFrameworkCore;
            var result =
                await
                DbSet
                .Where(p => p.IsDeleted == false)
                .OrderByDescending(x => x.Id)
                .ToListAsync()
                ;

            return result;
        }

        public virtual async Task<T> GetAsync(Expression<Func<T, bool>> where)
        {
            return await DbSet
                .Where(p => p.IsDeleted == false)
                .Where(where)
                .OrderByDescending(x => x.Id)
                .FirstOrDefaultAsync();
        }

        public virtual async Task<TF> GetAsync<TF>(Expression<Func<T, bool>> where, Expression<Func<T, TF>> select)
        {
            return await DbSet
                .Where(p => p.IsDeleted == false)
                .Where(where)
                .OrderByDescending(x => x.Id)
                .Select(select)
                .FirstOrDefaultAsync();
        }

        public virtual async Task<IList<T>> GetManyAsync(int skip, int take, params string[] includeProperties)
        {
            var query = DbSet.AsQueryable();

            foreach (var include in includeProperties)
            {
                query = query.Include(include);
            }

            return await query
               .Where(p => p.IsDeleted == false)
               .OrderByDescending(x => x.Id)
               .Skip(skip)
               .Take(take)
               .ToListAsync();
        }

        public virtual async Task<IList<T>> GetManyAsync(Expression<Func<T, bool>> where, params string[] includeProperties)
        {
            try
            {
                var query = DbSet.AsQueryable();

                foreach (var include in includeProperties)
                {
                    query = query.Include(include);
                }

                return await query
                    .Where(p => p.IsDeleted == false)
                    .Where(where)
                    .OrderByDescending(x => x.Id)
                    .ToListAsync();

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public virtual async Task<IList<T>> GetManyAsync(Expression<Func<T, bool>> where, int skip, int take, params string[] includeProperties)
        {
            var query = DbSet.AsQueryable();

            try
            {
                foreach (var include in includeProperties)
                {
                    query = query.Include(include);
                }

                return await query
                    .Where(p => p.IsDeleted == false)
                    .Where(where)
                    .OrderByDescending(x => x.Id)
                    .Skip(skip)
                    .Take(take)
                    .ToListAsync();

            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public virtual async Task<IList<TF>> GetManyAsync<TF>(Expression<Func<T, bool>> where, Expression<Func<T, TF>> select, params string[] includeProperties)
        {
            var query = DbSet.AsQueryable();

            foreach (var include in includeProperties)
            {
                query = query.Include(include);
            }

            return await query
                .Where(p => p.IsDeleted == false)
                .Where(where)
                .OrderByDescending(x => x.Id)
                .Select(select)
                .ToListAsync();
        }

        public virtual async Task<IList<TF>> GetManyAsync<TF>(Expression<Func<T, bool>> where, Expression<Func<T, TF>> select, int skip, int take, params string[] includeProperties)
        {
            var query = DbSet.AsQueryable();

            foreach (var include in includeProperties)
            {
                query = query.Include(include);
            }

            return await query
                .Where(p => p.IsDeleted == false)
                .Where(where)
                .OrderByDescending(x => x.Id)
                .Select(select)
                .Skip(skip)
                .Take(take)
                .ToListAsync();
        }

        public virtual async Task<bool> GetAnyAsync(Expression<Func<T, bool>> where)
        {
            return await DbSet
                .Where(p => p.IsDeleted == false)
                .OrderByDescending(x => x.Id)
                .AnyAsync(where);
        }

        public virtual async Task<int> GetCountAsync(Expression<Func<T, bool>> where)
        {
            return await DbSet
                .Where(p => p.IsDeleted == false)
                .CountAsync(where);
        }

        public virtual async Task<int> GetCountAsync()
        {
            return await DbSet
                .Where(p => p.IsDeleted == false)
                .CountAsync();
        }
    }
}

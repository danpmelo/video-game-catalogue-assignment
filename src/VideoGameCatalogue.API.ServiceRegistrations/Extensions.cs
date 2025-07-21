using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using VideoGameCatalogue.API.Interfaces;
using VideoGameCatalogue.App.Interfaces;
using VideoGameCatalogue.App.Services;
using VideoGameCatalogue.Repository;
using VideoGameCatalogue.Repository.Repositories;

namespace VideoGameCatalogue.API.ServiceRegistrations;
public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddServices(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(connectionString, b => b.MigrationsAssembly("VideoGameCatalogue.API")));

        //Services
        services.AddScoped<IVideoGameService, VideoGameService>();

        //Repositories
        services.AddScoped<IVideoGameRepository, VideoGameRepository>();
        return services;
    }
}
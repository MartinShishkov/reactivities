Creating a gitignore file:
dotnet new gitignore

Starting the API:
dotnet watch --no-hot-reload

Running EF migrations:
dotnet ef migrations add <migration-name> -s <starter project name> -p <name of project where the data context is located>
Example: dotnet ef migrations add InitialCreate -s API -p Persistence

Getting a fresh database:
1. Drop: dotnet ef database drop -s API -p Persistence

Getting Identity tables:
After we've inherited our DataContext from IdentityDbContext<AppUser>
dotnet ef migrations add <migration-name> -p <name of project where the data context is located> -s <starter project name>




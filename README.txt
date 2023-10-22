Creating a gitignore file:
dotnet new gitignore

Running EF migrations:
dotnet ef migrations add <migration-name> -s <starter project name> -p <name of project where the data context is located>
Example: dotnet ef migrations add InitialCreate -s API -p Persistence

Starting the API:
dotnet watch --no-hot-reload
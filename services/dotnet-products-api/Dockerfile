FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS restore
WORKDIR /src
COPY ["ProductsApi.csproj", "."]
RUN dotnet restore "ProductsApi.csproj"

FROM restore AS publish
ARG BUILD_CONFIGURATION=Release
COPY . .
WORKDIR "/src"
RUN dotnet publish "ProductsApi.csproj" -c $BUILD_CONFIGURATION -o /app/publish --no-restore /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ProductsApi.dll"]

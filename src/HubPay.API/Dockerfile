# Build stage
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY HubPay.slnx ./
COPY src/HubPay.Domain/HubPay.Domain.csproj src/HubPay.Domain/
COPY src/HubPay.Application/HubPay.Application.csproj src/HubPay.Application/
COPY src/HubPay.Infrastructure/HubPay.Infrastructure.csproj src/HubPay.Infrastructure/
COPY src/HubPay.API/HubPay.API.csproj src/HubPay.API/

RUN dotnet restore src/HubPay.API/HubPay.API.csproj

COPY . .
RUN dotnet publish src/HubPay.API/HubPay.API.csproj -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 8080

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "HubPay.API.dll"]

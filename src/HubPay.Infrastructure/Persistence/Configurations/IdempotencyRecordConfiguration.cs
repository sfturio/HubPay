using HubPay.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HubPay.Infrastructure.Persistence.Configurations;

public class IdempotencyRecordConfiguration : IEntityTypeConfiguration<IdempotencyRecord>
{
    public void Configure(EntityTypeBuilder<IdempotencyRecord> builder)
    {
        builder.ToTable("idempotency_records");

        builder.HasKey(r => r.Id);

        builder.Property(r => r.MerchantId)
            .IsRequired();

        builder.Property(r => r.Key)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(r => r.RequestHash)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(r => r.ResponseBody)
            .IsRequired();

        builder.Property(r => r.StatusCode)
            .IsRequired();

        builder.Property(r => r.CreatedAt)
            .IsRequired();

        builder.HasIndex(r => new { r.MerchantId, r.Key })
            .IsUnique();
    }
}


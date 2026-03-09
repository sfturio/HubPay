using HubPay.Domain.Entities;
using HubPay.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HubPay.Infrastructure.Persistence.Configurations;

public class MerchantConfiguration : IEntityTypeConfiguration<Merchant>
{
    public void Configure(EntityTypeBuilder<Merchant> builder)
    {
        builder.ToTable("merchants");

        builder.HasKey(m => m.Id);

        builder.Property(m => m.Name)
            .IsRequired()
            .HasMaxLength(200);

        builder.OwnsOne(m => m.Document, document =>
        {
            document.Property(d => d.Value)
                .HasColumnName("document")
                .IsRequired()
                .HasMaxLength(50);
        });

        builder.OwnsOne(m => m.Email, email =>
        {
            email.Property(e => e.Value)
                .HasColumnName("email")
                .IsRequired()
                .HasMaxLength(200);
        });

        builder.Property(m => m.Status)
            .IsRequired();

        builder.Property(m => m.CreatedAt)
            .IsRequired();
    }
}
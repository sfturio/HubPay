using HubPay.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HubPay.Infrastructure.Persistence.Configurations;

public class PaymentEventConfiguration : IEntityTypeConfiguration<PaymentEvent>
{
    public void Configure(EntityTypeBuilder<PaymentEvent> builder)
    {
        builder.ToTable("payment_events");

        builder.HasKey(e => e.Id);

        builder.Property(e => e.PaymentId)
            .IsRequired();

        builder.Property(e => e.PreviousStatus)
            .IsRequired();

        builder.Property(e => e.NewStatus)
            .IsRequired();

        builder.Property(e => e.Description)
            .HasMaxLength(500);

        builder.Property(e => e.CreatedAt)
            .IsRequired();

        builder.HasIndex(e => e.PaymentId);
    }
}


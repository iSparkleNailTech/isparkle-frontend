const RefundCancellationPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-3xl px-4 py-16 space-y-10">
        <header className="space-y-4">
          <h1 className="text-3xl font-heading font-semibold">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-muted-foreground">
            At iSparkle, we are committed to delivering high-quality nail, spa,
            and beauty services, as well as authentic cosmetic products. Please
            review our refund and cancellation policy below.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">
            1. Service Appointments
          </h2>

          <h3 className="text-lg font-medium">Appointment Confirmation</h3>
          <p className="text-muted-foreground">
            Appointments are confirmed upon fixed payment (GHS 100) via our
            approved payment channels.
          </p>

          <h3 className="text-lg font-medium">Cancellations &amp; Rescheduling</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>
              Clients may reschedule an appointment at least 24 hours prior to
              the scheduled time at no extra charge.
            </li>
            <li>
              Cancellations made less than 24 hours before the appointment may
              attract a cancellation fee.
            </li>
            <li>No-shows are non-refundable.</li>
          </ul>

          <h3 className="text-lg font-medium">Service Satisfaction</h3>
          <p className="text-muted-foreground">
            If you are unsatisfied with a service received, please notify us
            within 24 hours of your appointment. We will assess the concern and
            may offer:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>A correction appointment at no additional charge, or</li>
            <li>A partial refund at management&apos;s discretion.</li>
          </ul>
          <p className="text-muted-foreground">
            Refunds are not granted after services have been fully rendered
            unless there is a verified service error.
          </p>
        </section>

        <hr className="border-border" />

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">
            2. Product Purchases
          </h2>
          <p className="text-muted-foreground">
            We take pride in selling authentic and high-quality beauty products.
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>
              Products may be returned within 48 hours of purchase if unopened,
              unused, and in original packaging.
            </li>
            <li>
              Opened or used products cannot be returned due to hygiene and
              safety reasons.
            </li>
            <li>
              Refunds (where approved) will be processed via the original
              payment method within 3–5 working days.
            </li>
          </ul>
        </section>

        <hr className="border-border" />

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">
            3. Payment Disputes
          </h2>
          <p className="text-muted-foreground">
            Customers are encouraged to contact iSparkle directly before
            initiating a chargeback. We are committed to resolving concerns
            promptly and will provide transaction records and communication
            history if required during the payment processor&apos;s review
            process.
          </p>
        </section>

        <hr className="border-border" />

        <section className="space-y-3">
          <h2 className="text-xl font-heading font-semibold">
            4. Processing of Refunds
          </h2>
          <p className="text-muted-foreground">
            Approved refunds will be processed back to the original payment
            method used at checkout. Processing timelines may vary depending on
            the customer&apos;s bank.
          </p>
        </section>
      </div>
    </div>
  );
};

export default RefundCancellationPolicy;

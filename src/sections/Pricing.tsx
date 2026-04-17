import { useEffect, useRef, useState } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';

const STRIPE_PRICING_SCRIPT = 'https://js.stripe.com/v3/pricing-table.js';

function loadStripePricingScript(): Promise<void> {
  if (document.querySelector(`script[src="${STRIPE_PRICING_SCRIPT}"]`)) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = STRIPE_PRICING_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Stripe Pricing Table script'));
    document.body.appendChild(script);
  });
}

const tableHostClass =
  'w-full min-h-[480px] flex justify-center [&_stripe-pricing-table]:w-full';

export function Pricing() {
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(
    () => !!document.querySelector(`script[src="${STRIPE_PRICING_SCRIPT}"]`),
  );
  const [embedError, setEmbedError] = useState<string | null>(null);

  const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;
  const pricingTableId = import.meta.env.VITE_STRIPE_PRICING_TABLE_ID as string | undefined;
  const pricingTableId2 = import.meta.env.VITE_STRIPE_PRICING_TABLE_ID_2 as string | undefined;

  const pk = publishableKey?.trim();
  const id1 = pricingTableId?.trim();
  const id2 = pricingTableId2?.trim();

  useEffect(() => {
    if (!pk || !id1) return;

    let cancelled = false;
    loadStripePricingScript()
      .then(() => {
        if (!cancelled) setScriptReady(true);
      })
      .catch(() => {
        if (!cancelled) setEmbedError('Could not load pricing table. Check your connection and try again.');
      });

    return () => {
      cancelled = true;
    };
  }, [pk, id1]);

  useEffect(() => {
    if (!scriptReady || !pk || !id1) return;

    if (primaryRef.current) {
      primaryRef.current.innerHTML = '';
      const el = document.createElement('stripe-pricing-table');
      el.setAttribute('pricing-table-id', id1);
      el.setAttribute('publishable-key', pk);
      primaryRef.current.appendChild(el);
    }

    if (secondaryRef.current) {
      secondaryRef.current.innerHTML = '';
      if (id2) {
        const el2 = document.createElement('stripe-pricing-table');
        el2.setAttribute('pricing-table-id', id2);
        el2.setAttribute('publishable-key', pk);
        secondaryRef.current.appendChild(el2);
      }
    }
  }, [scriptReady, pk, id1, id2]);

  const missingConfig = !pk || !id1;

  return (
    <section id="pricing" className="section-padding halftone-bg">
      <div className="container-max mx-auto">
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block bg-white border-[2px] border-dark rounded-full px-4 py-2 text-sm font-body font-semibold mb-4">
            Pricing
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-dark max-w-3xl mx-auto mb-4">
            Simple,{' '}
            <span className="text-teikos-blue">Transparent</span> Pricing
          </h2>
          <p className="font-body text-lg text-dark/70 max-w-2xl mx-auto">
            Choose the plan that fits your team. Prices and features are managed in Stripe.
          </p>
        </ScrollReveal>

        {missingConfig ? (
          <ScrollReveal>
            <div className="max-w-xl mx-auto bg-white border-[3px] border-dark rounded-xl p-8 text-center">
              <p className="font-body text-dark font-semibold mb-2">Stripe pricing table is not configured yet</p>
              <p className="font-body text-sm text-dark/70 leading-relaxed">
                Add{' '}
                <code className="font-mono text-xs bg-dark/5 px-1 py-0.5 rounded">VITE_STRIPE_PUBLISHABLE_KEY</code>{' '}
                and{' '}
                <code className="font-mono text-xs bg-dark/5 px-1 py-0.5 rounded">VITE_STRIPE_PRICING_TABLE_ID</code>{' '}
                to your <code className="font-mono text-xs">.env</code> file (Stripe Dashboard → Product catalog →
                Pricing tables). For the optional second table (Agency-only monthly products), add{' '}
                <code className="font-mono text-xs bg-dark/5 px-1 py-0.5 rounded">
                  VITE_STRIPE_PRICING_TABLE_ID_2
                </code>
                . Then restart the dev server.
              </p>
            </div>
          </ScrollReveal>
        ) : embedError ? (
          <ScrollReveal>
            <p className="font-body text-center text-teikos-coral">{embedError}</p>
          </ScrollReveal>
        ) : (
          <>
            <ScrollReveal>
              <div ref={primaryRef} className={tableHostClass} />
            </ScrollReveal>
            {id2 ? (
              <ScrollReveal className="mt-16">
                <div className="max-w-3xl mx-auto mb-8 px-4 text-center">
                  <span className="inline-block bg-teikos-coral/15 border-[2px] border-teikos-coral rounded-full px-4 py-1.5 text-xs font-body font-semibold text-teikos-coral-deep mb-3">
                    Active Agency subscribers only
                  </span>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-dark">
                    Agency monthly add-ons
                  </h3>
                  <p className="font-body text-sm sm:text-base text-dark/70 mt-3 leading-relaxed">
                    The plans in this table are three monthly products reserved for customers with an{' '}
                    <span className="font-semibold text-dark">active Agency subscription</span>. Purchase
                    eligibility is enforced in Stripe and your TEIKOS account—not by this page alone.
                  </p>
                </div>
                <div ref={secondaryRef} className={tableHostClass} />
              </ScrollReveal>
            ) : null}
          </>
        )}

        <ScrollReveal className="mt-12 text-center" delay={0.2}>
          <div className="font-body text-sm text-dark/70 max-w-md mx-auto space-y-1 leading-relaxed">
            <p>Need more than the listed plans?</p>
            <p>
              <a
                href="mailto:hello@teikos.io?subject=TEIKOS%20pricing%20question"
                className="text-teikos-blue font-semibold hover:underline"
              >
                Send us a message
              </a>
              , we believe in creative solutions!
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

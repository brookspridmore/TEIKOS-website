import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { CONTACT_MAILTO_URL } from '@/config/appUrls';

const footerLinks = {
  product: [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Integrations', href: '/#integrations' },
  ],
  resources: [
    { label: 'Documentation', href: '/docs', isRoute: true },
    { label: 'Onboarding', href: '/docs/onboarding', isRoute: true },
    { label: 'Tools reference', href: '/docs/tools-reference', isRoute: true },
  ],
  integrations: [
    { label: 'Overview', href: '/docs/overview', isRoute: true },
    { label: 'Vapi', href: '/integrations/vapi', isRoute: true },
    { label: 'Retell AI', href: '/integrations/retell', isRoute: true },
    { label: 'n8n', href: '/integrations/n8n', isRoute: true },
    { label: 'Webhook / HTTP', href: '/integrations/webhook', isRoute: true },
  ],
  company: [
    { label: 'Why TEIKOS', href: '/docs/why-teikos', isRoute: true },
    { label: 'Contact', href: CONTACT_MAILTO_URL, external: true },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
];

function FooterLink({
  href,
  label,
  isRoute,
  external,
}: {
  href: string;
  label: string;
  isRoute?: boolean;
  external?: boolean;
}) {
  const className = 'font-body text-white/70 hover:text-white transition-colors';
  if (isRoute) {
    return (
      <Link to={href} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} className={className} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {label}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="bg-dark text-white py-16">
      <div className="container-max mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 relative">
                <img
                  src="/images/logo-cube.png"
                  alt="TEIKOS"
                  width={40}
                  height={40}
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-heading font-bold text-xl text-white">TEIKOS</span>
            </Link>
            <p className="font-body text-white/60 mb-6 max-w-sm">
              Infrastructure-grade scheduling for AI voice agents, AI voice receptionists, and the agencies that build them.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-heading font-bold text-sm uppercase tracking-wider text-white/40 mb-4">Product</h2>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading font-bold text-sm uppercase tracking-wider text-white/40 mb-4">Resources</h2>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading font-bold text-sm uppercase tracking-wider text-white/40 mb-4">Integrations</h2>
            <ul className="space-y-3">
              {footerLinks.integrations.map((link) => (
                <li key={link.label}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading font-bold text-sm uppercase tracking-wider text-white/40 mb-4">Company</h2>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-white/40">© 2026 TEIKOS. All rights reserved.</p>
          <p className="font-body text-sm text-white/40">
            <a href="/llms.txt" className="hover:text-white/70">
              llms.txt
            </a>
            {' · '}
            Made with <span className="text-teikos-coral">♥</span> for voice AI builders.
          </p>
        </div>
      </div>
    </footer>
  );
}

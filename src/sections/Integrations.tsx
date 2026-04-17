import { motion } from 'framer-motion';
import { Check, Copy, Webhook } from 'lucide-react';
import { useState } from 'react';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ScrollReveal';

const integrations = [
  {
    name: 'Vapi',
    type: 'Native Playbook',
    status: 'Live',
    color: '#6366f1',
  },
  {
    name: 'Retell',
    type: 'Native Playbook',
    status: 'Live',
    color: '#8b5cf6',
  },
  {
    name: 'n8n',
    type: 'Automation Playbook',
    status: 'Live',
    color: '#ff6d5a',
  },
  {
    name: 'Webhook / HTTP',
    type: 'Universal',
    status: 'Live',
    color: '#10b981',
  },
];

const codeSnippet = `// One POST request. Deterministic result.
const response = await fetch('https://api.teikos.io/v1/availability_check', {
  method: 'POST',
  headers: { 
    'Authorization': 'Bearer YOUR_TOKEN' 
  },
  body: JSON.stringify({
    account_id: 'acc_123',
    requested_date: '2024-01-15'
  })
});`;

export function Integrations() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max mx-auto">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block bg-teikos-coral/20 border-[2px] border-teikos-coral rounded-full px-4 py-2 text-sm font-body font-semibold text-teikos-coral-deep mb-4">
            Integrations
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-dark max-w-3xl mx-auto mb-4">
            Integrates With Your{' '}
            <span className="text-teikos-coral">Voice Stack</span>
          </h2>
          <p className="font-body text-lg text-dark/70 max-w-2xl mx-auto">
            Native playbooks for leading platforms. Universal webhook support for everything else.
          </p>
        </ScrollReveal>

        {/* Integration Cards */}
        <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {integrations.map((integration, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="teikos-card text-center group cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <div 
                  className="w-16 h-16 border-[3px] border-dark rounded-xl flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:shadow-lg"
                  style={{ backgroundColor: integration.color }}
                >
                  {integration.name === 'Webhook / HTTP' ? (
                    <Webhook className="w-8 h-8 text-white" />
                  ) : (
                    <span className="font-heading font-bold text-2xl text-white">
                      {integration.name[0]}
                    </span>
                  )}
                </div>
                <h3 className="font-heading font-bold text-lg text-dark mb-1">
                  {integration.name}
                </h3>
                <p className="font-body text-sm text-dark/60 mb-3">
                  {integration.type}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="font-body text-xs font-medium text-green-600">
                    {integration.status}
                  </span>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        {/* Code Snippet */}
        <ScrollReveal delay={0.3}>
          <div className="max-w-3xl mx-auto">
            <div className="bg-dark border-[3px] border-dark rounded-xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-dark border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="font-mono text-xs text-white/50">example.js</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="font-body text-xs">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="font-body text-xs">Copy</span>
                    </>
                  )}
                </button>
              </div>
              {/* Code */}
              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm text-white/90 leading-relaxed">
                  <code>{codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Universal Integration Note */}
        <ScrollReveal className="mt-8 text-center" delay={0.4}>
          <p className="font-body text-sm text-dark/60">
            The &quot;any webhook-capable system&quot; angle means Make, Zapier, custom backends, 
            and any future voice platform can integrate without waiting for native support.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

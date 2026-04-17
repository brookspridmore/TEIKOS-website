import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { ProblemSolution } from './sections/ProblemSolution';
import { APIFlow } from './sections/APIFlow';
import { Features } from './sections/Features';
import { Integrations } from './sections/Integrations';
import { Architecture } from './sections/Architecture';
import { Pricing } from './sections/Pricing';
import { Demo } from './sections/Demo';
import { FAQ } from './sections/FAQ';
import { CTABanner } from './sections/CTABanner';
import { Footer } from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <ProblemSolution />
        <APIFlow />
        <Features />
        <Integrations />
        <Architecture />
        <Pricing />
        <Demo />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}

export default App;

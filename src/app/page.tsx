import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import AdvantagesSection from '@/components/landing/AdvantagesSection';
import ServicesSection from '@/components/landing/ServicesSection';
import TeamSection from '@/components/landing/TeamSection';
import ReviewsSection from '@/components/landing/ReviewsSection';
import ContactSection from '@/components/landing/ContactSection';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AdvantagesSection />
        <ServicesSection />
        <TeamSection />
        <ReviewsSection />
        <ContactSection />
      </main>
    </>
  );
}

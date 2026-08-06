import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Areas from '../components/Areas';
import Method from '../components/Method';
import Office from '../components/Office';
import Faq from '../components/Faq';
import BlogSection from '../components/BlogSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

/**
 * Strona główna – sekcje ułożone jak puzzle:
 * Hero → O mnie → Obszary pomocy → Metoda pracy → Gabinet → FAQ → Blog → Kontakt.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="tresc">
        <Hero />
        <About />
        <Areas />
        <Method />
        <Office />
        <Faq />
        <BlogSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

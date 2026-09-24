import React, { useState } from "react";
import { FiArrowUp, FiCode, FiCoffee, FiFacebook, FiGithub, FiGlobe, FiHeart, FiLinkedin, FiMail, FiMenu, FiStar, FiX, FiYoutube } from "react-icons/fi";
import About from "./components/about";
import MovieWatchlist from "./components/movieWatchList";
import ScrollToTopButton from "./components/scrollToTopButton";

const links = [
    { label: "Portfolio", href: "https://www.ashishranjan.net/", icon: FiGlobe },
    { label: "GitHub", href: "https://github.com/a2rp", icon: FiGithub },
    { label: "CodePen", href: "https://codepen.io/ash1198", icon: FiCode },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aashishranjan", icon: FiLinkedin },
    { label: "Facebook", href: "https://www.facebook.com/theash.ashish/", icon: FiFacebook },
    { label: "YouTube", href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", icon: FiYoutube },
    { label: "Email", href: "mailto:ash.ranjan09@gmail.com", icon: FiMail },
];
const support = [
    { label: "Support", href: "https://a2rp-donation-page.netlify.app/", icon: FiHeart },
    { label: "Buy Me a Coffee", href: "https://buymeacoffee.com/a2rp", icon: FiCoffee },
    { label: "Patreon", href: "https://patreon.com/a2rp", icon: FiStar },
];
const FooterLinks = ({ items }) => <div className="footerLinks">{items.map(({ label, href, icon }) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={label} title={label}>{icon && <span>{React.createElement(icon)}</span>}</a>)}</div>;

const App = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const closeMenu = () => setMenuOpen(false);
    return <div className="appShell">
        <header className="siteHeader"><a className="siteBrand" href="#watchlist" onClick={closeMenu}><img src={`${import.meta.env.BASE_URL}logo.png`} alt="Ashish Ranjan logo" /><span><small>A2RP COLLECTION</small><strong>Movie Watchlist</strong></span></a><nav className={`siteNav ${menuOpen ? "siteNavOpen" : ""}`} aria-label="Main navigation"><a href="#watchlist" onClick={closeMenu}>Watchlist</a><a href="#about" onClick={closeMenu}>About</a><a href="#footer" onClick={closeMenu}>Links</a></nav><button className="menuButton" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <FiX /> : <FiMenu />}</button></header>
        <main className="siteMain"><section id="watchlist"><MovieWatchlist /></section><section id="about"><About /></section></main>
        <footer id="footer" className="siteFooter"><div className="footerIntro"><span className="eyebrow">KEEP EXPLORING</span><h2>Build a collection worth coming back to.</h2></div><div className="footerColumns"><div><span className="footerLabel">Links</span><FooterLinks items={links} /></div><div><span className="footerLabel">Support</span><FooterLinks items={support} /></div></div><div className="footerBottom"><span>Copyright &copy; {new Date().getFullYear()} <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></span><button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Go to top"><FiArrowUp /></button></div></footer>
        <ScrollToTopButton />
    </div>;
};

export default App;
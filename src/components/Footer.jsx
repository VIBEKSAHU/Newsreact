



import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaEnvelope, FaRocket, FaCode, FaHeart } from "react-icons/fa";

export default function ModernFooter() {
    const currentYear = new Date().getFullYear();
    
    const quickLinks = [
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Use', href: '/terms' }
    ];
    
    const categories = [
        { name: 'General', href: '/?category=general' },
        { name: 'Technology', href: '/?category=technology' },
        { name: 'Sports', href: '/?category=sports' },
        { name: 'Business', href: '/?category=business' }
    ];
    
    const socialLinks = [
        { 
            name: 'GitHub', 
            href: 'https://github.com/VIBEKSAHU', 
            icon: FaGithub,
            color: '#333'
        },
        { 
            name: 'LinkedIn', 
            href: 'https://linkedin.com/in/vibeksahu', 
            icon: FaLinkedin,
            color: '#0077b5'
        },
        { 
            name: 'Instagram', 
            href: 'https://instagram.com/vibeksahu_', 
            icon: FaInstagram,
            color: '#e4405f'
        },
        { 
            name: 'Twitter', 
            href: 'https://twitter.com/vibeksahu', 
            icon: FaTwitter,
            color: '#1da1f2'
        }
    ];

    return (
        <footer className="modern-footer">
            <div className="footer-content">
                {/* Brand Section */}
                <div className="footer-section brand-section">
                    <div className="footer-brand">
                        <h2 className="footer-logo">
                            <span>N</span>ewsReact
                        </h2>
                        <p className="footer-tagline">
                            Stay informed with the latest news from around the world. 
                            Built with React and powered by modern web technologies.
                        </p>
                    </div>
                    
                    <div className="newsletter-signup">
                        <h4>Stay Updated</h4>
                        <div className="newsletter-form">
                            <input 
                                type="email" 
                                placeholder="Enter your email"
                                className="newsletter-input"
                            />
                            <button className="newsletter-btn">
                                <FaRocket />
                            </button>
                        </div>
                        <p className="newsletter-note">
                            Get notified about new features and updates
                        </p>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        {quickLinks.map((link, index) => (
                            <li key={index}>
                                <a href={link.href}>{link.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* News Categories */}
                <div className="footer-section">
                    <h3>Categories</h3>
                    <ul className="footer-links">
                        {categories.map((category, index) => (
                            <li key={index}>
                                <a href={category.href}>{category.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact & Social */}
                <div className="footer-section">
                    <h3>Connect With Me</h3>
                    <div className="contact-info">
                        <p className="contact-item">
                            <FaEnvelope className="contact-icon" />
                            <a href="mailto:vibeksahu055@gmail.com">
                                vibeksahu055@gmail.com
                            </a>
                        </p>
                        <p className="contact-item">
                            <FaCode className="contact-icon" />
                            <span>Full Stack Developer</span>
                        </p>
                    </div>
                    
                    <div className="social-icons">
                        {socialLinks.map((social, index) => {
                            const IconComponent = social.icon;
                            return (
                                <a 
                                    key={index}
                                    href={social.href}
                                    className="social-icon"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Follow on ${social.name}`}
                                    style={{ '--hover-color': social.color }}
                                >
                                    <IconComponent />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p className="copyright">
                        © {currentYear} NewsReact by Vibek Sahu. Made with{' '}
                        <FaHeart className="heart-icon" /> in India
                    </p>
                    
                    <div className="tech-stack">
                        <span className="tech-badge">React</span>
                        <span className="tech-badge">Netlify</span>
                        <span className="tech-badge">CurrentsAPI</span>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <button 
                className="back-to-top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
            >
                ↑
            </button>

            <style jsx>{`
                .modern-footer {
                    background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
                    color: white;
                    margin-top: auto;
                    position: relative;
                    overflow: hidden;
                }

                .modern-footer::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #667eea, transparent);
                }

                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 4rem 1.5rem 2rem;
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }

                .brand-section {
                    grid-column: 1 / -1;
                }

                .footer-logo {
                    font-size: 2rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 1rem;
                }

                .footer-logo span {
                    font-size: 2.5rem;
                }

                .footer-tagline {
                    color: #a0aec0;
                    line-height: 1.6;
                    margin-bottom: 2rem;
                    max-width: 400px;
                }

                .newsletter-signup h4 {
                    color: white;
                    margin-bottom: 1rem;
                    font-weight: 600;
                }

                .newsletter-form {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                    max-width: 300px;
                }

                .newsletter-input {
                    flex: 1;
                    padding: 0.75rem;
                    border: 1px solid #4a5568;
                    border-radius: 0.5rem;
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                    font-size: 0.875rem;
                }

                .newsletter-input::placeholder {
                    color: #a0aec0;
                }

                .newsletter-input:focus {
                    outline: none;
                    border-color: #667eea;
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
                }

                .newsletter-btn {
                    padding: 0.75rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                    border-radius: 0.5rem;
                    color: white;
                    cursor: pointer;
                    transition: transform 0.2s ease;
                }

                .newsletter-btn:hover {
                    transform: translateY(-2px);
                }

                .newsletter-note {
                    color: #718096;
                    font-size: 0.75rem;
                }

                .footer-section h3 {
                    font-size: 1.25rem;
                    margin-bottom: 1.5rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    font-weight: 600;
                }

                .footer-links {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .footer-links a {
                    color: #a0aec0;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    padding: 0.25rem 0;
                }

                .footer-links a:hover {
                    color: white;
                    transform: translateX(8px);
                }

                .contact-info {
                    margin-bottom: 1.5rem;
                }

                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 0.75rem;
                    color: #a0aec0;
                }

                .contact-icon {
                    color: #667eea;
                    font-size: 1rem;
                }

                .contact-item a {
                    color: #a0aec0;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .contact-item a:hover {
                    color: white;
                }

                .social-icons {
                    display: flex;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .social-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 2.5rem;
                    height: 2.5rem;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    color: white;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    font-size: 1.1rem;
                }

                .social-icon:hover {
                    background: var(--hover-color, #667eea);
                    transform: translateY(-4px) scale(1.1);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
                }

                .footer-bottom {
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 1.5rem;
                }

                .footer-bottom-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .copyright {
                    color: #a0aec0;
                    font-size: 0.875rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .heart-icon {
                    color: #f56565;
                    animation: heartbeat 1.5s ease-in-out infinite;
                }

                @keyframes heartbeat {
                    0%, 50%, 100% { transform: scale(1); }
                    25%, 75% { transform: scale(1.1); }
                }

                .tech-stack {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .tech-badge {
                    padding: 0.25rem 0.75rem;
                    background: rgba(102, 126, 234, 0.2);
                    border: 1px solid rgba(102, 126, 234, 0.3);
                    border-radius: 1rem;
                    font-size: 0.75rem;
                    color: #a0aec0;
                    font-weight: 500;
                }

                .back-to-top {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    width: 3rem;
                    height: 3rem;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                    border-radius: 50%;
                    color: white;
                    font-size: 1.25rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    z-index: 1000;
                }

                .back-to-top:hover {
                    transform: translateY(-4px) scale(1.1);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
                }

                @media (min-width: 768px) {
                    .footer-content {
                        grid-template-columns: 2fr 1fr 1fr 1.5fr;
                        gap: 3rem;
                    }

                    .brand-section {
                        grid-column: 1;
                    }
                }

                @media (min-width: 1024px) {
                    .footer-content {
                        padding: 5rem 2rem 3rem;
                    }
                }

                @media (max-width: 767px) {
                    .footer-bottom-content {
                        flex-direction: column;
                        text-align: center;
                        gap: 1rem;
                    }

                    .back-to-top {
                        bottom: 1rem;
                        right: 1rem;
                        width: 2.5rem;
                        height: 2.5rem;
                        font-size: 1rem;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .heart-icon {
                        animation: none;
                    }
                    
                    .back-to-top:hover {
                        transform: none;
                    }
                }
            `}</style>
        </footer>
    );
}




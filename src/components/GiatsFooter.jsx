import { portfolio } from '../data/portfolio'
import { AppearTitle } from './motion/AppearTitle'
import { LinkText } from './motion/LinkText'
import { Time } from './motion/Time'
import { GoTop } from './motion/GoTop'
import { synth } from '../utils/audioSynth'

export function GiatsFooter({ onNavigate }) {
  const menuLinks = [
    { title: 'Home', href: '/' },
    { title: 'Identity', href: '/#about' },
    { title: 'Tech Stack', href: '/#skills' },
    { title: 'Project Lab', href: '/projects' },
    { title: 'Live ML Lab', href: '/#mllab' },
    { title: 'Analytics', href: '/#analytics' },
    { title: 'Ask AI Assistant', href: '/#ask-ai' },
    { title: 'Experience', href: '/#experience' },
    { title: 'Contact', href: '/#contact' },
  ]

  const socialLinks = [
    { title: 'GitHub', href: portfolio.personal.github, external: true },
    { title: 'LinkedIn', href: portfolio.personal.linkedin, external: true },
    { title: 'Resume (PDF)', href: portfolio.personal.resumeUrl, external: true },
    { title: 'Direct Email', href: `mailto:${portfolio.personal.email}`, external: false },
  ]

  const handleLinkClick = (href, e) => {
    if (href.startsWith('http') || href.startsWith('mailto:') || href.endsWith('.pdf')) {
      return
    }
    e.preventDefault()
    synth.playClick()
    if (onNavigate) {
      onNavigate(href)
    } else {
      const hash = href.includes('#') ? href.split('#')[1] : ''
      if (hash) {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  return (
    <footer className="giats-footer-root" role="contentinfo">
      {/* Subtle architectural grid pattern underlay */}
      <div className="giats-footer-backdrop" aria-hidden="true" />

      <div className="giats-footer-container">
        {/* Top 3-Column Section */}
        <div className="giats-footer-top-grid">
          {/* 1. Sitemap Column */}
          <div className="giats-footer-col">
            <AppearTitle isFooter>
              <h4 className="giats-col-title">Sitemap</h4>
              <div className="giats-links-stack">
                {menuLinks.map((link) => (
                  <LinkText
                    key={link.title}
                    href={link.href}
                    onClick={(e) => handleLinkClick(link.href, e)}
                  >
                    {link.title}
                  </LinkText>
                ))}
              </div>
            </AppearTitle>
          </div>

          {/* 2. Follow Me Column */}
          <div className="giats-footer-col">
            <AppearTitle isFooter>
              <h4 className="giats-col-title">Follow Me</h4>
              <div className="giats-links-stack">
                {socialLinks.map((link) => (
                  <LinkText
                    key={link.title}
                    href={link.href}
                    target={link.external}
                  >
                    {link.title}
                  </LinkText>
                ))}
              </div>
            </AppearTitle>
          </div>

          {/* 3. Work With Me / Hero Interactive Email Link */}
          <div className="giats-footer-col giats-email-col">
            <AppearTitle isFooter>
              <h4 className="giats-col-title giats-work-title">Work With Me:</h4>
              <div className="giats-email-wrapper">
                <a
                  className="giats-email-link"
                  href={`mailto:${portfolio.personal.email}`}
                  onClick={() => synth.playClick()}
                  onMouseEnter={() => synth.playHover()}
                  aria-label={`Send email to ${portfolio.personal.email}`}
                >
                  <span className="giats-email-text">{portfolio.personal.email}</span>

                  {/* Giats signature animated continuous wavy SVG path underline */}
                  <svg
                    className="giats-wavy-graphic"
                    width="300%"
                    height="100%"
                    viewBox="0 0 1200 60"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0" />
                  </svg>
                </a>
              </div>
              <p className="giats-email-subtext">
                Available for ML engineering, Computer Vision, Generative AI pipelines, and full-time technical roles.
              </p>
            </AppearTitle>
          </div>
        </div>

        {/* Middle Telemetry / Attribution Strip */}
        <div className="giats-footer-middle-grid">
          {/* Location & Live Clock */}
          <div className="giats-middle-item">
            <AppearTitle isFooter>
              <span className="middle-heading">Location &amp; Local Time</span>
              <div className="middle-desc">
                <span>Based in {portfolio.personal.location}</span>
                <Time />
              </div>
            </AppearTitle>
          </div>

          {/* Availability */}
          <div className="giats-middle-item">
            <AppearTitle isFooter>
              <span className="middle-heading">Current Availability</span>
              <div className="middle-desc availability-desc">
                <span className="pulse-green-dot" />
                <span>Open for high-impact AI/ML engineering roles &amp; research</span>
              </div>
            </AppearTitle>
          </div>

          {/* Copyright & University */}
          <div className="giats-middle-item giats-middle-right">
            <AppearTitle isFooter>
              <span className="middle-heading">Architectural Credits</span>
              <div className="middle-desc">
                <span>&copy; {new Date().getFullYear()} &middot; {portfolio.personal.name}</span>
                <small>{portfolio.personal.university}</small>
              </div>
            </AppearTitle>
          </div>
        </div>

        {/* Bottom Giant Typographic Banner & GoTop Button */}
        <div className="giats-footer-bottom-row">
          <div className="giats-giant-brand" aria-label={portfolio.personal.name}>
            <span className="giant-brand-text">NAGENDRA</span>
          </div>

          <div className="giats-gotop-container">
            <GoTop />
          </div>
        </div>
      </div>
    </footer>
  )
}

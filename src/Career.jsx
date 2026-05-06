import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Career.css'

function useInView(options = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.1, ...options })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, isInView]
}

function Reveal({ children, delay = 0 }) {
  const [ref, isInView] = useInView()

  return (
    <div
      ref={ref}
      className={`reveal ${isInView ? 'revealed' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function Career() {
  const WHATSAPP_URL = "https://wa.me/601166800882"

  const positions = [
    {
      title: 'Preschool Teacher',
      type: 'Full-time',
      location: 'Jade Hills, Kajang',
      requirements: [
        'Diploma/Degree in Early Childhood Education',
        'Minimum 2 years teaching experience',
        'Passionate about working with children ages 3-6',
        'Creative and innovative teaching approach',
        'Good communication skills (English & Malay)'
      ],
      benefits: [
        'Professional development opportunities',
        'Supportive and friendly work environment',
        'EPF, SOCSO, EIS',
        'Annual leave & medical benefits',
        'Performance bonus'
      ]
    },
    {
      title: 'Assistant Teacher',
      type: 'Full-time / Part-time',
      location: 'Jade Hills, Kajang',
      requirements: [
        'SPM/Diploma in any field',
        'Experience working with children is a plus',
        'Patient, caring, and enthusiastic',
        'Good communication skills',
        'Willing to learn and grow'
      ],
      benefits: [
        'On-the-job training provided',
        'Friendly team environment',
        'EPF, SOCSO, EIS',
        'Flexible working hours (part-time)',
        'Career growth opportunities'
      ]
    }
  ]

  return (
    <div className="career-page">
      {/* Navigation */}
      <nav className="career-nav">
        <div className="container">
          <Link to="/" className="nav-logo">
            <span className="logo-icon">⭐</span>
            <span className="logo-text">Little Glory</span>
          </Link>
          <Link to="/" className="btn btn-nav">← Back to Home</Link>
        </div>
      </nav>

      {/* Header */}
      <header className="career-header">
        <div className="container">
          <Reveal>
            <h1>Join Our <span className="gradient-text">Team</span></h1>
            <p className="career-subtitle">
              We're looking for passionate educators to help shape the future of our children.
            </p>
          </Reveal>
        </div>
      </header>

      {/* Positions */}
      <section className="positions">
        <div className="container">
          {positions.map((position, i) => (
            <Reveal key={i} delay={i * 200}>
              <div className="position-card">
                <div className="position-header">
                  <div className="position-badge">🎯 Hiring Now</div>
                  <h2>{position.title}</h2>
                  <div className="position-meta">
                    <span>📍 {position.location}</span>
                    <span>⏰ {position.type}</span>
                    <span> Competitive Salary</span>
                  </div>
                </div>

                <div className="position-content">
                  <div className="position-section">
                    <h3>Requirements</h3>
                    <ul>
                      {position.requirements.map((req, idx) => (
                        <li key={idx}>✅ {req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="position-section">
                    <h3>We Offer</h3>
                    <ul>
                      {position.benefits.map((benefit, idx) => (
                        <li key={idx}>🌟 {benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary btn-lg pulse-btn"
                >
                   Apply via WhatsApp
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why Join Us */}
      <section className="why-join">
        <div className="container">
          <Reveal>
            <h2 className="section-title">Why Work With Us?</h2>
          </Reveal>
          <div className="benefits-grid">
            {[
              { icon: '🌱', title: 'Grow With Us', desc: 'Continuous professional development and career advancement opportunities' },
              { icon: '❤️', title: 'Supportive Culture', desc: 'Friendly, collaborative team that values your wellbeing' },
              { icon: '🎓', title: 'Make an Impact', desc: 'Shape young minds and create lasting positive change' },
              { icon: '🏆', title: 'Recognition', desc: 'Your hard work is valued and rewarded' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="benefit-card">
                  <div className="benefit-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="career-cta">
        <div className="container">
          <Reveal>
            <div className="cta-content">
              <h2>Ready to Join Our Team?</h2>
              <p>Send us your resume and let's start a conversation!</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg pulse-btn">
                📱 Contact Us: 011-6680 0882
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

export default Career

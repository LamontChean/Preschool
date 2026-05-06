import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import VideoSection from './VideoSection'

// Hook for Intersection Observer
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

// Animated counter
function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [ref, isInView] = useInView()

  useEffect(() => {
    if (!isInView) return
    const numericTarget = parseInt(target.replace(/[^0-9.]/g, ''))
    if (isNaN(numericTarget)) { setCount(target); return }

    let start = 0
    const increment = numericTarget / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= numericTarget) {
        clearInterval(timer)
        setCount(numericTarget)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return <span ref={ref}>{typeof count === 'number' ? count : target}</span>
}

// Reveal wrapper
function Reveal({ children, delay = 0, direction = 'up' }) {
  const [ref, isInView] = useInView()
  const directionClass = `reveal-${direction}`

  return (
    <div
      ref={ref}
      className={`reveal ${directionClass} ${isInView ? 'revealed' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// Floating elements
function FloatingElements() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="floating-elements">
      <span className="float-item float-1" style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}>⭐</span>
      <span className="float-item float-2" style={{ transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)` }}></span>
      <span className="float-item float-3" style={{ transform: `translate(${mousePos.x * 0.7}px, ${mousePos.y * 0.4}px)` }}></span>
      <span className="float-item float-4" style={{ transform: `translate(${mousePos.x * -0.4}px, ${mousePos.y * 0.6}px)` }}>📚</span>
      <span className="float-item float-5" style={{ transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * -0.5}px)` }}>🎵</span>
    </div>
  )
}

function App() {
  const WHATSAPP_URL = "https://wa.me/601166800882"
  const FACEBOOK_URL = "https://www.facebook.com/LittleGloryPreschool"

  const [typedText, setTypedText] = useState('')
  const fullText = 'Enrolment Open Now!'

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 80)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">⭐</span>
            <span className="logo-text">Little Glory</span>
          </div>
          <ul className="nav-links">
            <li><a href="#programmes">Programmes</a></li>
            <li><a href="#features">Why Us</a></li>
            <li><Link to="/career">Career</Link></li>
            <li><a href="#testimonials">Parents Say</a></li>
            <li><a href="#contact">Contact</a></li>
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-nav">
                WhatsApp Us
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <FloatingElements />
        <div className="hero-content">
          <Reveal>
            <div className="hero-badge">
              🎓 Jade Hills, Kajang — Ages 3-6 Years Old
            </div>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="typing-text">
              {typedText}
              <span className="cursor">|</span>
            </h1>
          </Reveal>
          <Reveal delay={400}>
            <p className="hero-subtitle">
              Growing with character... A nurturing environment where your child thrives through play-based learning and holistic development.
            </p>
          </Reveal>
          <Reveal delay={600}>
            <div className="hero-buttons">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary pulse-btn">
                📱 Enquire Now
              </a>
              <a href="#programmes" className="btn btn-secondary">
                📖 View Programmes
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <Reveal>
            <h2 className="section-title">Why Choose <span className="gradient-text">Little Glory?</span></h2>
          </Reveal>
          <div className="features-grid">
            {[
              { icon: '👶', title: 'Child-Centred Approach', desc: 'Every child is unique. We tailor learning to your child\'s pace and interests.' },
              { icon: '🎨', title: 'Theme-Based Learning', desc: 'Engaging themed activities that make learning fun and memorable.' },
              { icon: '🌟', title: 'Holistic Development', desc: 'Nurturing cognitive, emotional, social, and physical growth.' },
              { icon: '👩🏫', title: 'Qualified Teachers', desc: 'Experienced educators passionate about early childhood education.' },
              { icon: '🧠', title: 'Clinical Psychologists', desc: 'In-house support for your child\'s emotional and developmental needs.' },
              { icon: '📚', title: 'Primary Readiness', desc: 'Preparing your child for a smooth transition to primary school.' },
            ].map((feature, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programmes Section */}
      <section id="programmes" className="programmes">
        <div className="container">
          <Reveal>
            <h2 className="section-title">Our <span className="gradient-text">Programmes</span></h2>
          </Reveal>
          <div className="programmes-grid">
            {[
              { name: 'Childcare Programme', desc: 'Full-day care with structured learning activities', icon: '🏫' },
              { name: 'Enrichment Programmes', desc: 'Art, music, languages, and motor skills development', icon: '🎵' },
              { name: 'Holiday Programmes', desc: 'Fun-filled camps and themed activities during school breaks', icon: '🎪' },
            ].map((prog, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="programme-card">
                  <div className="programme-icon">{prog.icon}</div>
                  <h3>{prog.name}</h3>
                  <p>{prog.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {[
              { number: '10+', label: 'Years Experience', icon: '🎓' },
              { number: '500+', label: 'Happy Children', icon: '😊' },
              { number: '15+', label: 'Expert Teachers', icon: '👩‍' },
              { number: '98%', label: 'Parent Satisfaction', icon: '⭐' },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="stat-item">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-number"><AnimatedCounter target={stat.number} /></div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <VideoSection />


      {/* Testimonials */}
      <section id="testimonials" className="testimonials">
        <div className="container">
          <Reveal>
            <h2 className="section-title">What <span className="gradient-text">Parents Say</span></h2>
          </Reveal>
          <div className="testimonials-grid">
            {[
              { name: 'Sarah M.', role: 'Parent of Aisha (4 yrs)', text: 'My daughter loves going to school every day! The teachers are so caring and the activities are wonderful.', rating: 5, image: 'https://picsum.photos/seed/parent1/400/300' },
              { name: 'Ahmad R.', role: 'Parent of Daniel (5 yrs)', text: 'Little Glory has helped my son develop confidence and social skills. Highly recommended!', rating: 5, image: 'https://picsum.photos/seed/parent2/400/300' },
              { name: 'Mei Ling T.', role: 'Parent of Chloe (3 yrs)', text: 'The holistic approach really shows. My child is thriving both academically and emotionally.', rating: 5, image: 'https://picsum.photos/seed/parent3/400/300' },
            ].map((testimonial, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="testimonial-card">
                  <div className="testimonial-image">
                    <img src={testimonial.image} alt={`${testimonial.name}'s review`} />
                  </div>
                  <div className="testimonial-stars">
                    {'⭐'.repeat(testimonial.rating)}
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{testimonial.name[0]}</div>
                    <div>
                      <div className="author-name">{testimonial.name}</div>
                      <div className="author-role">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="cta">
        <div className="container">
          <Reveal>
            <div className="cta-content">
              <h2>Ready to Give Your Child the Best Start?</h2>
              <p>Limited slots available! Contact us today to schedule a school tour.</p>
              <div className="cta-buttons">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg pulse-btn">
                  📱 WhatsApp: 011-6680 0882
                </a>
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
                  👍 Visit Our Facebook
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">⭐ Little Glory Preschool</div>
              <p>Growing with character...</p>
            </div>
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p>📍 Jade Hills, Kajang, Selangor</p>
              <p>📱 011-6680 0882</p>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.3148!2d101.7584!3d2.9926464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdcb59990cb31d%3A0x5029ebb445c2c673!2sLittle%20Glory%20Preschool!5e0!3m2!1sen!2smy!4v1234567890"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Little Glory Preschool Location"
                ></iframe>
              </div>
            </div>
            <div className="footer-social">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="social-btn wa">
                  WhatsApp
                </a>
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="social-btn fb">
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Little Glory Preschool. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App

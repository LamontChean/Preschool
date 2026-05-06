import './VideoSection.css'

function VideoSection() {
  return (
    <section className="video-section">
      <div className="container">
        <div className="video-container">
          <h3>🎥 Take a Virtual Tour</h3>
          <p style={{ textAlign: 'center', color: 'var(--gray)', marginBottom: '2rem' }}>
            See our school environment and activities in action
          </p>
          <div className="video-wrapper">
            <video controls>
              <source src="/mv.mov" type="video/quicktime" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoSection

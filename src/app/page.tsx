import './home.css'
import FeaturedSection from './components/featuredsection'

/**
 * TODO:
 * Create a standings on the page that is updated every week
 */
export default function Home(){
  return (
    <main className = "min-h-screen bg-[#ffffff]">
      Home
      <div className="section-header">
        <span className="featured">Featured</span>
      </div>
      <div className= "featured-section">
          <FeaturedSection />
      </div>
    </main>
  )
}
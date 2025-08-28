import './home.css'
import FeaturedSection from './components/featuredsection'
import Standings from './components/standings'

/**
 * TODO:
 * Create a standings on the page that is updated every week
 */
export default function Home(){
  return (
    <>
      <main className = "min-h-screen bg-[#ffffff]">
        Home
        <div className="flex max-w-6xl mx-auto">
          
          <div className="w-2/3 pr-6 border-r border-gray-200">
            <div className="section-header">
              <span className="featured">Featured</span>
            </div>
            <div className="featured-section">
              <FeaturedSection />
            </div>
          </div>

          <div className="w-1/3 pl-6">
            <Standings />
          </div>
        </div>
      </main>
    </>
  )
}
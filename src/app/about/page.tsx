import "./styles.css"
export default function About(){
    return (
      <main className = "min-h-screen bg-[#ffffff]">
        <div className="text-box-1">
          <h1 className="header-1">About WFL</h1>
          <p>
            The WFL is a fantasy football league born during the height of the
            COVID-19 pandemic in 2021, forged through nightly Call of Duty: Warzone
            sessions among friends. The Haaretz has claimed "we're a vibrant and rich universe".
          </p>
          <p>
            Originally composed of 10 members, the league had a merger with the WBWA
            to include 12 teams. The roster of managers includes: Johnny, Drew, Jack, Ale,
            Fabian, Jere, Eric, Daniel, Andres, Mesa, Parker, Andy, and Jonah.
          </p>
        </div>
        <div className="text-box-2">
          <h1 className="header-1">Hall of Champions</h1>
          <ul>
            <li>
              2024-2025: The Kingsmen
            </li>
            <li>
              2023-2024: Clout International
            </li>
            <li>
              2022-2023: Shitter Inc.
            </li>
            <li>
              2021-2022: The Good Brothers
            </li>
          </ul>
        </div>
      </main>
    )
  }
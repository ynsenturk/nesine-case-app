import "./App.css";
import { Betslip } from "./components";
import { BetContextProvider } from "./contexts/BetContext";
import { Tournament } from "./pages";

function App() {
  return (
    <BetContextProvider>
      <div className="container">
        <Tournament />
        <Betslip />
      </div>
    </BetContextProvider>
  );
}

export default App;

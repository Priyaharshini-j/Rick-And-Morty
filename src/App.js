import "./App.css";
import { Route, Link, Routes } from "react-router-dom";
import CharacterComponent from "./components/CharacterComponent/CharacterComponent";
import StateEffectCharacterComponent from "./components/StateEffectCharacterComponent/StateEffectCharacterComponent";
import QueryCharacterComponent from "./components/QueryCharacterComponent/QueryCharacterComponent";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <div className="App">
      <div className="navigation">
        <h3>Rick And Morty</h3>
        <nav>
          <ul>
            <li>
              <Link className="link" to="/">
                UseQuery
              </Link>
            </li>
            <li>
              <Link className="link" to="/StateEffectCharacterComponent">
                UseState & UseEffect
              </Link>
            </li>
            <li>
              <Link className="link" to="/QueryCharacterComponent">
                UseQuery-Pagination
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <header className="App-header">
        <Routes>
          <Route
            path="/"
            element={
              <QueryClientProvider client={queryClient}>
                <CharacterComponent />
              </QueryClientProvider>
            }
          />
          <Route
            path="/StateEffectCharacterComponent"
            element={<StateEffectCharacterComponent />}
          />
          <Route
            path="/QueryCharacterComponent"
            element={
              <QueryClientProvider client={queryClient}>
                <QueryCharacterComponent />
              </QueryClientProvider>
            }
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;

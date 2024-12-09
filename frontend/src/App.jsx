import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <nav>navbar </nav>
      <main className="min-h-screen">
        <Outlet />
      </main>

      <footer> footer </footer>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import DahboardPage from "./pages/DahboardPage";
import VaultsPage from "./pages/VaultsPage";
import VaultDetailsPage from "./pages/VaultDetailsPage";
import NavBar from "./components/NavBar";


function App() {
  return (
    <div className="bg-slate-50 h-screen w-full">
      <NavBar />
      <Routes>
        <Route path="/" element={<VaultsPage />} />
        <Route path="/vaults" element={<VaultsPage />} />
        <Route path="/vaults/:vaultId" element={<VaultDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;

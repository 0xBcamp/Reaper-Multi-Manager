import { Route, Routes } from "react-router-dom";
import DahboardPage from "./pages/DahboardPage";
import VaultsPage from "./pages/VaultsPage";
import VaultDetailsPage from "./pages/VaultDetailsPage";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { useState } from "react";


function App() {

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="bg-slate-50 h-screen w-full flex flex-row">
      {!sidebarCollapsed && <div className={`w-[260px]`}>
        <SideBar />
      </div>}
      <div className="flex-1">
        <NavBar 
          menuButtonToggled={() => setSidebarCollapsed(prev => !prev)}
        />
        <Routes>
          <Route path="/" element={<VaultsPage />} />
          <Route path="/vaults" element={<VaultsPage />} />
          <Route path="/vaults/:vaultId" element={<VaultDetailsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

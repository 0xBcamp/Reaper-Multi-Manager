import { Route, Routes } from "react-router-dom";
import VaultsPage from "./pages/VaultsPage";
import VaultDetailsPage from "./pages/VaultDetailsPage";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import { useState } from "react";


function App() {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="bg-slate-50 h-screen w-full flex flex-row">
      <div className={`w-[${isSidebarCollapsed ? "0" : "260"}px] transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap`}>
        {!isSidebarCollapsed && <SideBar />}
      </div>
      <div className="flex-1">
        <NavBar
          menuButtonToggled={() => setIsSidebarCollapsed(prev => !prev)}
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

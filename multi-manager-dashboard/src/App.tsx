import { Route, Routes } from "react-router-dom";
import VaultsPage from "./pages/VaultsPage";
import VaultDetailsPage from "./pages/VaultDetails/index";
import NavBar from "./components/NavBar";
import SideBar from "./components/sidebar/SideBar";
import { useState } from "react";
import DahboardPage from "./pages/DahboardPage";
import StrategiesPage from "./pages/StrategiesPage";
import TransactionsPage from "./pages/TransactionsPage";
import UsersPage from "./pages/UsersPage";


function App() {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="bg-slate-50 h-screen w-full flex flex-row">
      <div className={`overflow-hidden w-[${isSidebarCollapsed ? "0" : "260"}px] transition-all duration-300 ease-in-out whitespace-nowrap`}>
        {!isSidebarCollapsed && <SideBar />}
      </div>
      <div className="flex-1">
        <NavBar
          menuButtonToggled={() => setIsSidebarCollapsed(prev => !prev)}
        />
        <Routes>
          <Route path="/" element={<DahboardPage />} />
          <Route path="/vaults" element={<VaultsPage />} />
          <Route path="/vaults/:vaultId" element={<VaultDetailsPage />} />
          <Route path="/strategies" element={<StrategiesPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

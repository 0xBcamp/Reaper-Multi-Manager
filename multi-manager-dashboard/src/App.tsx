import { createWeb3Modal, defaultWagmiConfig, useWeb3ModalState } from '@web3modal/wagmi/react'
import { arbitrum, localhost, mainnet, optimism } from 'wagmi/chains'
import { Route, Routes } from "react-router-dom";
import VaultDetailsPage from "./pages/Vault/VaultPage";
import SideBar from "./components/layout/sidebar/SideBar";
import { useState } from "react";
import DahboardPage from "./pages/Dashboard/DahboardPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import NavBar from "./components/layout/NavBar";
import StrategyPage from "./pages/Strategy/StrategyPage";
import VaultDeployPage from "./pages/Vault/Deploy";
import { WagmiConfig } from 'wagmi';

const projectId = process.env.REACT_APP_WALLET_CONNECT_PROJECTID

const metadata = {
  name: 'Web3Modal',
  description: 'Reaper Dashboard',
}

const chains = [optimism]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains })

function App() {

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <WagmiConfig config={wagmiConfig}>
      <Provider store={store}>
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
              <Route path="/vaults/deploy" element={<VaultDeployPage />} />
              <Route path="/vaults/:vaultAddress" element={<VaultDetailsPage />} />
              <Route path="/vaults/:vaultAddress/strategy/:strategyAddress" element={<StrategyPage />} />
            </Routes>
          </div>
        </div>
      </Provider>
    </WagmiConfig>


  );
}

export default App;

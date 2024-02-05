import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Loader from '../../components/layout/Loader';
import { selectChain, selectStrategiesByChain, selectVaultsByChain, selectWallet } from '../../redux/selectors';
import DashboardVaultSummary from './components/DashboardVaultSummary';
import SnapshotContainer from '../../components/SnapshotCard/SnapshotContainer';
import UnsupportedChain from '../../components/UnsupportedChain';
import NoWalletConnected from '../../components/NoWalletConnected';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Dropdown, { DropdownOptionType } from '../../components/form/Dropdown';
import { Vault } from '../../redux/slices/vaultsSlice';
import VaultStrategySummary from '../Vault/components/VaultStrategySummary';
import { Strategy } from '../../redux/slices/strategiesSlice';

const DahboardPage = () => {
    const isInitialized = useSelector((state: RootState) => state.app.isInitialized);

    const vaults = useSelector(selectVaultsByChain);
    const chain = useSelector(selectChain);
    const wallet = useSelector(selectWallet);
    const strategies = useSelector(selectStrategiesByChain);

    const [sortedVaults, setSortedVaults] = useState<Vault[]>([]);
    const [sortedStrategies, setSortedStrategies] = useState<Strategy[]>([]);

    const [dashboardViewOptions] = useState([
        { label: "Vaults", key: "vaults" },
        { label: "Strategies (Overview)", key: "strategies-overview" },
        { label: "Strategies (Detailed)", key: "strategies-detailed" }
    ]);

    const [dashboardFilterProtocolOptions] = useState([
        { label: "All Protocols", key: "all" },
        { label: "Granary", key: "granary" },
        { label: "Sonne", key: "compound" },
        // { label: "Yearn", key: "yearn" },
        // { label: "Other", key: "other" }
    ]);

    const [dashboardFilterAssetsOptions] = useState([
        { label: "All Assets", key: "all" },
        { label: "WETH", key: "weth" },
        { label: "WBTC", key: "wbtc" },
        { label: "OP", key: "op" },
        { label: "ERN", key: "ern" },
        { label: "DAI", key: "dai" },
        { label: "USDC", key: "usdc" },
        { label: "USDT", key: "usdt" },
        { label: "wstETH", key: "wsteth" }
    ]);

    const [vaultSortOptions] = useState([
        { label: "TVL", key: "tvl" },
        { label: "Health Score", key: "health" },
        { label: "Name", key: "name" },
        { label: "APR", key: "apr" },
    ]);

    const [strategySortOptions] = useState([
        // { label: "Vault", key: "vault" },
        // { label: "Protocol", key: "Protocol" },
        { label: "Since last harvest", key: "last-harvest" },
        { label: "Name", key: "name" },
        { label: "APR", key: "apr" },
        { label: "Profit", key: "profit" },
        { label: "Harvests", key: "harvests" },
        // { label: "Pending Profit", key: "pending-profit" },
        
    ]);

    const [vaultSortSelectedKey, setVaultSortSelectedKey] = useState<string>("tvl");
    const [strategySortSelectedKey, setStrategySortSelectedKey] = useState<string>("last-harvest");
    const [dashboardViewSelectedKey, setDashboardViewSelectedKey] = useState<string>("vaults");
    const [dashboardFilterProtocolSelectedKey, setDashboardFilterProtocolSelectedKey] = useState<string>("all");
    const [dashboardilterAssetsSelectedKey, setDashboardAssetsSelectedKey] = useState<string>("all");

    // Effect to sort vaults whenever the vaults or selected sort key changes
    useEffect(() => {
        if (dashboardViewSelectedKey === "vaults") {
            const sorted = [...vaults].sort((a, b) => {
                switch (vaultSortSelectedKey) {
                    case 'name':
                        return a.name.localeCompare(b.name);
                    case 'tvl':
                        return b.lastSnapShot.usd.tvl - a.lastSnapShot.usd.tvl;
                    case 'health':
                        return b.healthScore - a.healthScore;
                    case 'apr':
                        return b.totalAPR - a.totalAPR;
                    default:
                        return 0;
                }
            });
            setSortedVaults(sorted);
        }
    }, [vaults, dashboardViewSelectedKey, vaultSortSelectedKey]);

    // Effect to sort vaults whenever the vaults or selected sort key changes
    useEffect(() => {
        if (dashboardViewSelectedKey.includes("strategies")) {
            let sorted = [...strategies];
            if (dashboardFilterProtocolSelectedKey !== "all") {
                sorted = [...sorted].filter(x => x.protocol?.fork.toLowerCase() === dashboardFilterProtocolSelectedKey)
            }

            sorted = [...sorted].sort((a, b) => {
                switch (strategySortSelectedKey) {
                    case 'last-harvest':
                        return b.timeSinceLastHarvest - a.timeSinceLastHarvest;
                    case 'name':
                        return a.strategyName.toLocaleLowerCase().localeCompare(b.strategyName.toLocaleLowerCase());
                    case 'profit':
                        return b.last30daysHarvestProfit - a.last30daysHarvestProfit;
                    case 'harvests':
                        return b.harvestCount - a.harvestCount;
                    case 'apr':
                        // Ensure APR values are numbers and default to 0 if undefined
                        const aprA = Number(a.APR) || 0;
                        const aprB = Number(b.APR) || 0;
                        return aprB - aprA;
                    default:
                        return 0;
                }
            });

            setSortedStrategies(sorted);
        }
    }, [strategies, dashboardViewSelectedKey, strategySortSelectedKey, dashboardFilterProtocolSelectedKey]);

    return (
        <div>
            {!isInitialized && <Loader />}

            {isInitialized && chain && wallet.status === "connected" &&
                <div>
                    <div className="bg-white p-3 shadow-md">
                        <div className="flex justify-between items-center">
                            <div className="text-gray-600 font-bold">Dashboard</div>
                            <div className="space-x-4">
                                <Link to={"/vaults/deploy"} className="text-blue-500 hover:text-blue-700" >Add Vault</Link>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4 p-4'>
                        <SnapshotContainer
                            title="TVL"
                            data={chain.last30SnapShots}
                            dataKey="tvl"
                            deltas={chain.lastSnapShotDelta.tvl}
                            type='usd'
                            customTooltip={<TVLTooltip />}
                        />
                        <SnapshotContainer
                            title="Total users"
                            data={chain.last30SnapShots}
                            dataKey="totalUsers"
                            deltas={chain.lastSnapShotDelta.totalUsers}
                            type='number'
                            customTooltip={<UsersTooltip />}
                        />
                    </div>

                    <div className='flex justify-between px-4 py-2 text-gray-800 text-lg items-center'>
                        <div className='flex flex-row gap-x-1'>
                            <Dropdown options={dashboardViewOptions} onChange={setDashboardViewSelectedKey} selectedKey={dashboardViewSelectedKey} />
                            {dashboardViewSelectedKey.includes("strategies") && <Dropdown options={dashboardFilterProtocolOptions} onChange={setDashboardFilterProtocolSelectedKey} selectedKey={dashboardFilterProtocolSelectedKey} />}
                            {/* {dashboardViewSelectedKey.includes("strategies") && <Dropdown options={dashboardFilterAssetsOptions} onChange={setDashboardAssetsSelectedKey} selectedKey={dashboardilterAssetsSelectedKey} />} */}

                        </div>
                        <div>
                            {dashboardViewSelectedKey === "vaults" && <Dropdown options={vaultSortOptions} onChange={setVaultSortSelectedKey} selectedKey={vaultSortSelectedKey} />}
                            {dashboardViewSelectedKey.includes("strategies") && <Dropdown options={strategySortOptions} onChange={setStrategySortSelectedKey} selectedKey={strategySortSelectedKey} />}
                        </div>
                    </div>
                    {dashboardViewSelectedKey === "vaults" && <div className='grid grid-cols-4 gap-4 px-4'>
                        {sortedVaults.map((vault) => {
                            return (
                                <DashboardVaultSummary vault={vault} key={vault._id} />
                            )
                        })}
                    </div>}
                    {dashboardViewSelectedKey.includes("strategies") && <div className="grid grid-cols-4 gap-4 px-4">
                        {sortedStrategies.map((strategy) => {
                            const currentVault = vaults.find((vault) => vault.strategies.find((s) => s._id === strategy._id));
                            return (
                                // Change strategy border colour if it has not harvested in 2 days
                                <div className={`h-full ${strategy.isStale ? 'border border-red-500' : 'border border-gray-200'}`} key={strategy._id}>
                                    <Link to={`vaults/${strategy.vaultAddress}/strategy/${strategy?.address}`}>
                                        <VaultStrategySummary strategy={strategy} vault={currentVault} showDetails={dashboardViewSelectedKey === "strategies-detailed"} />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>}
                </div>

            }
            <UnsupportedChain />
            <NoWalletConnected />

        </div>
    )
}

export const TVLTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {

        const date = new Date(label * 1000);
        const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
        const formattedDate = formatter.format(date);

        return (
            <div className="p-2 bg-white shadow rounded border border-gray-300">
                <div className="text-sm text-gray-700 mb-2 font-semibold">{`${formattedDate}`}</div>
                <div className="text-sm text-blue-500 mb-1">{`TVL: $${Number(payload[0].value.toFixed(0)).toLocaleString()}`}</div>
            </div>
        );
    }
    return null;
};

export const UsersTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {

        const date = new Date(label * 1000);
        const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
        const formattedDate = formatter.format(date);

        return (
            <div className="p-2 bg-white shadow rounded border border-gray-300">
                <div className="text-sm text-gray-700 mb-2 font-semibold">{`${formattedDate}`}</div>
                <div className="text-sm text-blue-500 mb-1">{`Users: ${Number(payload[0].value.toFixed(0)).toLocaleString()}`}</div>
            </div>
        );
    }
    return null;
};

export default DahboardPage
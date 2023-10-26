import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Loader from '../../components/layout/Loader';
import { selectChain, selectVaultsByChain, selectWallet } from '../../redux/selectors';
import DashboardVaultSummary from './components/DashboardVaultSummary';
import SnapshotContainer from '../../components/SnapshotCard/SnapshotContainer';
import UnsupportedChain from '../../components/UnsupportedChain';
import NoWalletConnected from '../../components/NoWalletConnected';
import { Link } from 'react-router-dom';

const DahboardPage = () => {
    const isInitialized = useSelector((state: RootState) => state.app.isInitialized);

    const vaults = useSelector(selectVaultsByChain);
    const chain = useSelector(selectChain);
    const wallet = useSelector(selectWallet);

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

                    <div className='px-4 py-2 text-gray-800 text-lg'>
                        Vaults
                    </div>
                    <div className='grid grid-cols-4 gap-4 px-4'>
                        {vaults.map((vault) => {
                            return (
                                <DashboardVaultSummary vault={vault} key={vault._id} />
                            )
                        })}
                    </div>
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
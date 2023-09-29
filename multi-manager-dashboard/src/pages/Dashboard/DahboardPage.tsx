import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Loader from '../../components/layout/Loader';
import { selectChain, selectVaultsByChain } from '../../redux/selectors';
import DashboardVaultSummary from './components/DashboardVaultSummary';
import SnapshotContainer from '../../components/SnapshotCard/SnapshotContainer';

const DahboardPage = () => {
    const isInitialized = useSelector((state: RootState) => state.app.isInitialized);

    const vaults = useSelector(selectVaultsByChain);
    const chain = useSelector(selectChain);

    return (
        <div className='p-4'>
            {!isInitialized && <Loader />}

            {isInitialized && <>
                <div className='grid grid-cols-2 gap-4 '>
                    <SnapshotContainer
                        title="TVL"
                        data={chain.last30SnapShots}
                        dataKey="tvl"
                        deltas={chain.lastSnapShotDelta.tvl}
                        type='usd'
                    />
                    <SnapshotContainer
                        title="Total users"
                        data={chain.last30SnapShots}
                        dataKey="totalUsers"
                        deltas={chain.lastSnapShotDelta.totalUsers}
                        type='number'
                    />
                </div>

                <div className='p-2 text-gray-800 text-lg'>
                    Vaults
                </div>
                <div className='grid grid-cols-4 gap-4 '>
                    {vaults.map((vault) => {
                        return (
                            <DashboardVaultSummary vault={vault} key={vault._id} />
                        )
                    })}
                </div>
            </>}

        </div>
    )
}

export default DahboardPage
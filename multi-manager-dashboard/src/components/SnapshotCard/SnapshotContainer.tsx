import { ISnapshot_Delta } from "../../redux/slices/vaultsSlice";
import SnapshotsCardArea from "./SnapshotsCardArea";
import SnapshotsDeltas from "./SnapshotsDeltas";

interface ISnapshotContainerProps {
    title: string;
    data: any[]; 
    dataKey: string;
    deltas: ISnapshot_Delta;
    type: 'usd' | 'number';
}

const SnapshotContainer: React.FC<ISnapshotContainerProps> = ({ title, data, dataKey, deltas, type }) => {
    return (
        <div className='grid grid-cols-12 bg-white border border-gray-200 mb-8'>
            <div className='col-span-10 flex flex-col'>
                <div className='p-3 text-gray-600 font-semibold'>
                    {title}
                </div>
                <SnapshotsCardArea data={data} dataKey={dataKey} />
            </div>
            <div className='col-span-2 mr-2'>
                <SnapshotsDeltas deltas={deltas} type={type} total={data[data.length - 1][dataKey]} />
            </div>
        </div>
    );
}

export default SnapshotContainer;
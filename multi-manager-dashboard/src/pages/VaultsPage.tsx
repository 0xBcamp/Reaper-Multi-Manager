import React from 'react'
import { VaultListDocument, VaultListQuery } from '../gql/graphql';
import { executeGQL } from '../lib/excecuteGraphQL';
import { Link } from 'react-router-dom';
import { vaults } from '../utils/vaults';

const VaultsPage = () => {

    // const [data, setData] = React.useState<VaultListQuery>();
    
    // React.useEffect(() => {
    //     (async () => {
    //         setData(await executeGQL(VaultListDocument));
    //     })();
    // }, []);

    // const filteredVaults = data?.vaults.filter(vault =>
    //     vaults.some(configVault => configVault.address === vault.id && configVault.name)
    // );

    return (
        <div className='grid grid-cols-4 gap-4 m-4'>
            {/* {filteredVaults?.map(vault => {
                return (
                    <Link to={`${vault.id}`} key={vault.id}>
                        <div className="shadow-md rounded-lg p-6 text-center bg-white">
                            <h2 className="text-sm mb-4"><span className="text-gray-600">{vaults.find(x => x.address === vault.id).name}</span></h2>
                            <div className='flex flex-row justify-between'>
                                <div className='flex-1'>
                                    <div className="text-gray-500">Current APR:</div>
                                    <div className="text-green-500 font-bold text-2xl">{vault.apr / 100}%</div>
                                </div>
                                <div className='flex-1'>
                                    <div className="text-gray-500">Strategies</div>
                                    <div className="text-gray-400 text-2xl">{vault.nrOfStrategies}</div>
                                </div>
                            </div>

                        </div>
                    </Link>

                )
            })} */}

        </div>
    )
}

export default VaultsPage
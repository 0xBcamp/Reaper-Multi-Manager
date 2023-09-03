import React from 'react'
import { useParams } from 'react-router-dom';
import { executeGQL } from '../lib/excecuteGraphQL';
import { VaultDocument, VaultQuery } from '../gql/graphql';
import CurveFitChart, { CurveFitData, CurveFitGraph } from '../components/charts/CurveFitChart';
import Card from '../components/cards/Card';
import { vaults } from '../utils/vaults';
import { timeStamp } from 'console';

const VaultDetailsPage = () => {
  let { vaultId } = useParams();

  const [graphs, setGraphs] = React.useState<CurveFitGraph[]>([]);
  const [vault, setVault] = React.useState<VaultQuery>();

  React.useEffect(() => {
    (async () => {
      const data = await executeGQL(VaultDocument, { vaultId: vaultId });
      setVault(data);

      const curveFitGraphs = data.vault.strategies.map((strategy) => {
        const graph: CurveFitGraph = {
          name: strategy.id,
          data: strategy.reports.map((report, index) => {
            const data: CurveFitData = {
              index,
              apr: report.results?.apr ? report.results?.apr : 0,
              timestamp: report.results?.timestamp ? report.results?.timestamp : 0
            }
            return data;
          })
        }

        return graph;
      });

      setGraphs(curveFitGraphs);
    })();
  }, [])

  return (
    <>
      <div className='p-4'>
        <span className='text-lg'>{vaults.find(x => x.address === vault?.vault?.id)?.name}</span>
      </div>
      <div className='grid grid-cols-4 gap-4 m-4'>
        {graphs?.map((graph, index) => {
          return (
            <Card key={index} title={graph.name}>
              <CurveFitChart graph={graph}/>
            </Card>
          )
        })}

      </div>
    </>

  )
}

export default VaultDetailsPage
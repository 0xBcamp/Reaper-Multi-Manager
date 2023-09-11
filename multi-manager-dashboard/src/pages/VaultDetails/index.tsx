import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { executeGQL } from '../../lib/excecuteGraphQL';
import { VaultDocument } from '../../gql/graphql';
import CurveFitChart from '../../components/charts/CurveFitChart';
import Card from '../../components/cards/Card';
import LastHarvest from '../../components/cards/LastHarvest';
import { vaults } from '../../utils/vaults';
import { CURRENT_UNIX_TIME, TIMESTAMP_ONE_MONTH_AGO, defaultStdDevThreshold } from '../../utils/constants';
import { CurveFitGraph } from '../../components/charts/types';

const VaultDetailsPage = () => {
  let { vaultId } = useParams();

  const [graphs, setGraphs] = useState<CurveFitGraph[]>([]);
  const [vault, setVault] = useState(null);

  useEffect(() => {
    if (vaultId) {
      fetchData();
    }
  }, [vaultId]);

  const fetchData = async () => {
    const data = await executeGQL(VaultDocument, {
      vaultId: vaultId,
      currentUnixTime: CURRENT_UNIX_TIME,
      timestampOneMonthAgo: TIMESTAMP_ONE_MONTH_AGO,
    });
    setVault(data);

    const curveFitGraphs = data?.vault?.strategies.map((strategy) => {
      const graph: CurveFitGraph = {
        name: strategy.id,
        data: strategy.reports.map((report, index) => ({
          index,
          timestamp: report.results?.timestamp || 0,
          gain: report?.gain || 0,
          loss: report?.loss || 0,
          allocated: report?.allocated || 0,
          duration: report.results?.duration || 0,
        })),
        threshold: defaultStdDevThreshold
      };

      return graph;
    });

    setGraphs(curveFitGraphs);
  };

  const handleGraphUpdate = (updatedGraph: CurveFitGraph) => {
    const updatedGraphs = graphs.map(graph => {
      if (graph.name === updatedGraph.name) {
        return updatedGraph;
      }
      return graph;
    });
  
    setGraphs(updatedGraphs);
  };

  const vaultName = vaults.find((x) => x.address === vault?.vault?.id)?.name;

  return (
    <>
      <div className="p-4">
        <span className="text-lg">{vaultName}</span>
      </div>
      <div className="grid grid-cols-4 gap-4 m-4">
        {graphs.filter(x => x.data?.length > 0)?.map((graph, index) => (
          <Card key={index} title={graph.name}>
            <div>
              <LastHarvest graph={graph}/>
              <CurveFitChart graph={graph} graphUpdated={handleGraphUpdate} />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default VaultDetailsPage;

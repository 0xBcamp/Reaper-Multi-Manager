import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { executeGQL } from '../../lib/excecuteGraphQL';
import { VaultDocument } from '../../gql/graphql';
import CurveFitChart from '../../components/charts/CurveFitChart';
import Card from '../../components/cards/Card';
import LastHarvest from '../../components/cards/LastHarvest';
import { vaults } from '../../utils/vaults';
import { CURRENT_UNIX_TIME, TIMESTAMP_ONE_MONTH_AGO } from '../../utils/constants';

const VaultDetailsPage = () => {
  let { vaultId } = useParams();

  const [graphs, setGraphs] = useState([]);
  const [vault, setVault] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await executeGQL(VaultDocument, {
        vaultId: vaultId,
        currentUnixTime: CURRENT_UNIX_TIME,
        timestampOneMonthAgo: TIMESTAMP_ONE_MONTH_AGO,
      });
      setVault(data);

      const curveFitGraphs = data?.vault?.strategies.map((strategy) => {
        const graph = {
          name: strategy.id,
          data: strategy.reports.map((report, index) => ({
            index,
            timestamp: report.results?.timestamp || 0,
            gain: report?.gain || 0,
            loss: report?.loss || 0,
            allocated: report?.allocated || 0,
            duration: report.results?.duration || 0,
          })),
        };

        return graph;
      });

      setGraphs(curveFitGraphs);
    };

    fetchData();
  }, [vaultId]);

  const vaultName = vaults.find((x) => x.address === vault?.vault?.id)?.name;

  return (
    <>
      <div className="p-4">
        <span className="text-lg">{vaultName}</span>
      </div>
      <div className="grid grid-cols-4 gap-4 m-4">
        {graphs?.map((graph, index) => (
          <Card key={index} title={graph.name}>
            <div>
              <LastHarvest />
              <CurveFitChart graph={graph} />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default VaultDetailsPage;

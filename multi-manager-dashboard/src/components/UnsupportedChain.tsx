import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { selectChain, selectWallet } from '../redux/selectors';
import Button from './form/Button';
import { useSwitchNetwork } from 'wagmi'
import { setWalletChainId } from '../redux/slices/blockchainSlice';


const UnsupportedChain = () => {
  const dispatch = useDispatch();
  
  const isInitialized = useSelector((state: RootState) => state.app.isInitialized);
  const selectedChain = useSelector(selectChain);
  const wallet = useSelector(selectWallet);

  const { chains, isLoading, pendingChainId } = useSwitchNetwork();

  const network = useSwitchNetwork({
    onSuccess(data) {
      dispatch(setWalletChainId(data.id));
    },
  })

  return (
    <>
      {isInitialized && !selectedChain && wallet.status === "connected" && <>
        <div className='text-xl text-gray-500 flex flex-col text-center pt-10'>
          <div className='pb-5'>Unsupported chain</div>
          <div className='flex flex-row gap-2 justify-center'>
            {chains.map((x) => (
              <div key={x.id}>
                <Button text={`${x.name} ${isLoading && pendingChainId === x.id ? " (switching)" : ""}`} color='primary' variant='outlined' onClick={() => network.switchNetwork?.(x.id)} />
              </div>

            ))}
          </div>
        </div>


      </>}
    </>
  )
}

export default UnsupportedChain
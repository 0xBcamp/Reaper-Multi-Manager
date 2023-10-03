import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { selectWallet } from '../redux/selectors';

const NoWalletConnected = () => {
  const isInitialized = useSelector((state: RootState) => state.app.isInitialized);
  const wallet = useSelector(selectWallet);

  return (
    <>
      {isInitialized && wallet.status === "disconnected" && <>
        <div className='text-xl text-gray-500 flex flex-col text-center pt-10'>
          <div className='pb-5'>No Wallet Connected</div>
        </div>
      </>}
    </>
  )
}

export default NoWalletConnected
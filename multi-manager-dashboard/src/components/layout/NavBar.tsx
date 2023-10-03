import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLoadData } from '../../hooks/useLoadData';
import { disconnectWallet, setSelectedChain, setWalletAddress, setWalletChainId, setWalletStatus } from '../../redux/slices/blockchainSlice';
import { RootState } from '../../redux/store';
import WalletConnect from '../WalletConnect';
import { useWeb3ModalState } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { selectWallet } from '../../redux/selectors';

interface INavBarProps {
  menuButtonToggled: () => void;
}

const NavBar: React.FC<INavBarProps> = ({ menuButtonToggled }) => {
  const dispatch = useDispatch();

  const chains = useSelector((state: RootState) => state.blockchain.chains);
  const wallet = useSelector(selectWallet);
 
  const { selectedNetworkId } = useWeb3ModalState();
 
  const account = useAccount({
    onConnect() {
      if (selectedNetworkId) {
        dispatch(setWalletChainId(selectedNetworkId));
      }
    },
    onDisconnect() {
      dispatch(disconnectWallet())
      dispatch(setSelectedChain(undefined));
    },
  })

  useEffect(() => {
    dispatch(setWalletStatus(account.status))
  }, [account.status])

  useEffect(() => {
    dispatch(setWalletAddress(account.address))
  }, [account.address])

  useEffect(() => {
      dispatch(setWalletChainId(selectedNetworkId));
}, [selectedNetworkId])

  useEffect(() => {
    if (chains?.length > 0 && wallet.chainId) {
      const selectedChain = chains.find(x => x.chainId === wallet.chainId);
      dispatch(setSelectedChain(selectedChain));
    }
  }, [wallet.chainId, chains]);

  useLoadData();

  return (
    <div className='flex flex-row justify-between w-full py-3 px-6 bg-white shadow-slate-200 text-xl text-slate-800 border-b-gray-200 border-b'>
      <button onClick={menuButtonToggled} aria-label="Toggle Menu">
        <img src={`${process.env.PUBLIC_URL}/icons/icons8-hamburger-menu-50.png`} alt="Menu Icon" className='h-[25px] hover:cursor-pointer' />
      </button>
      <WalletConnect />
    </div>
  )
}

export default NavBar

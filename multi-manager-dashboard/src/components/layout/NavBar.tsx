import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoadData } from '../../hooks/useLoadData';
import { disconnectWallet, setSelectedChain, setWalletAddress, setWalletChainId, setWalletStatus } from '../../redux/slices/blockchainSlice';
import { RootState } from '../../redux/store';
import WalletConnect from '../WalletConnect';
import { useWeb3ModalState } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { selectWallet } from '../../redux/selectors';
import Dropdown, { DropdownOptionType } from '../form/Dropdown';

interface INavBarProps {
  menuButtonToggled: () => void;
}

const NavBar: React.FC<INavBarProps> = ({ menuButtonToggled }) => {
  const dispatch = useDispatch();

  const chains = useSelector((state: RootState) => state.blockchain.chains);
  const wallet = useSelector(selectWallet);

  const { selectedNetworkId } = useWeb3ModalState();

  const [chainOptions, setChainOptions] = useState<DropdownOptionType[]>([]);
  const selectedChain = useSelector((state: RootState) => state.blockchain.selectedChain);

  useEffect(() => {
    setChainOptions(chains.map(chain => {
      return {
        label: chain.name,
        key: chain.chainId.toString()
      }
    }));
  }, [chains])

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
      if (wallet.chainId === 1337) {
        const selectedChain = chains.find(x => x.chainId === 10);
        dispatch(setSelectedChain(selectedChain));
      } else {
        const selectedChain = chains.find(x => x.chainId === wallet.chainId);
        dispatch(setSelectedChain(selectedChain));
      }

    }
  }, [wallet.chainId, chains]);

  const handleDropdownChange = (key: string) => {
    dispatch(setSelectedChain(chains.find(x => x.chainId.toString() === key)))
  };

  useLoadData();

  return (
    <div className='flex flex-row justify-between w-full py-2 px-6 bg-white shadow-slate-200 text-xl text-slate-800 border-b-gray-200 border-b'>
      {/* <button onClick={menuButtonToggled} aria-label="Toggle Menu">
        <img src={`/icons/icons8-hamburger-menu-50.png`} alt="Menu Icon" className='h-[25px] hover:cursor-pointer' />
      </button> */}
      <Link to="/">
        <div className='flex flex-row space-x-2 items-center hover:text-gray-500 transition-colors duration-200'>
          <img src={`${process.env.PUBLIC_URL}/icons/strategy-development.png`} alt='project logo' className='h-[35px] hover:cursor-pointer' />
          <div>Reaper Dashboard</div>
        </div>
      </Link>
      {/* <WalletConnect />*/}
      <Dropdown options={chainOptions} onChange={handleDropdownChange} selectedKey={selectedChain?.chainId.toString()}/> 
    </div>
  )
}

export default NavBar

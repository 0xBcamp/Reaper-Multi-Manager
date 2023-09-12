import React, { useEffect, useState } from 'react'
import Dropdown, { DropdownOptionType } from './global/Dropdown';
import { RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChain } from '../redux/slices/blockchainSlice';
import { useLoadData } from '../hooks/useLoadData';

interface INavBarProps {
  menuButtonToggled: () => void;
}

const NavBar: React.FC<INavBarProps> = ({ menuButtonToggled }) => {
  const dispatch = useDispatch();

  const chains = useSelector((state: RootState) => state.blockchain.chains);
  const selectedChain = useSelector((state: RootState) => state.blockchain.selectedChain);
  const [chainOptions, setChainOptions] = useState<DropdownOptionType[]>([]);
  
  useLoadData();

  useEffect(() => {
    setChainOptions(chains.map(chain => {
      return {
        label: chain.name,
        key: chain.chainId.toString()
      }
    }));
  }, [chains])
  
  const handleDropdownChange = (key: string) => {
    dispatch(setSelectedChain(chains.find(x => x.chainId.toString() === key)))
  };

  return (
    <div className='flex flex-row justify-between w-full py-3 px-6 bg-white shadow-slate-200 text-xl text-slate-800 border-b-gray-200 border-b'>
      <button onClick={menuButtonToggled} aria-label="Toggle Menu">
        <img src="icons/icons8-hamburger-menu-50.png" alt="Menu Icon" className='h-[25px] hover:cursor-pointer' />
      </button>
      <Dropdown options={chainOptions} onChange={handleDropdownChange} selectedKey={selectedChain?.chainId.toString()}/>
    </div>
  )
}

export default NavBar
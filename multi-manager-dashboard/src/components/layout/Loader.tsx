import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLoadData } from '../../hooks/useLoadData';
import { setSelectedChain } from '../../redux/slices/blockchainSlice';
import { RootState } from '../../redux/store';
import Dropdown, { DropdownOptionType } from '../form/Dropdown';
import { useNavigate } from 'react-router-dom';

interface ILoaderProps {
}

const Loader: React.FC<ILoaderProps> = ({ }) => {
  return (
      <div className="flex h-full justify-center mt-32 text-lg text-gray-400">
        <div className="mt-2 mr-3 animate-spin rounded-full h-3 w-3 border-t-2 border-blue-500 "></div>
          Loading dashboard data...
      </div>
  )
}

export default Loader
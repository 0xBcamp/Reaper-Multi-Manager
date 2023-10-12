import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Loader from '../../components/layout/Loader';
import { selectChain, selectTokensByChain, selectWallet } from '../../redux/selectors';
import Dropdown, { DropdownOptionType } from '../../components/form/Dropdown';
import { useEffect, useState } from 'react';
import TextField from '../../components/form/TextField';
import Label from '../../components/form/Label';
import FormLink from '../../components/form/FormLink';
import Button from '../../components/form/Button';
import { useAccount, useSwitchNetwork } from 'wagmi';
import { VAULT_V2_ABI } from '../../abi/vaultV2Abi';
import { useNavigate, useParams } from 'react-router-dom';

import reaperVaultV2 from "../../abi/out/ReaperVaultV2.json";
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { IVaultCreateRequest, addVault } from '../../services/vaultService';
import { setLastRefetch } from '../../redux/slices/appSlice';

interface DeployVaultForm {
    tokenAddress: string;
    name?: string;
    symbol?: string;
    tvlCap?: number;
    treasury?: string;
    strategists?: string[];
    multisigs?: string[];
}

const VaultDeployPage = () => {
    let { vaultAddress } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isInitialized = useSelector((state: RootState) => state.app.isInitialized);

    const tokens = useSelector(selectTokensByChain);
    const wallet = useSelector(selectWallet);
    const chain = useSelector(selectChain);

    const [tokenOptions, setTokenOptions] = useState<DropdownOptionType[]>([]);
    const [isDeploying, setIsdeploying] = useState(false);

    const initialValues: DeployVaultForm = {
        tokenAddress: "",
        name: "",
        symbol: "",
        tvlCap: undefined,
        treasury: "",
        strategists: [],
        multisigs: []
    };

    const { address } = useAccount();
    const provider = new ethers.BrowserProvider(window.ethereum as any);



    const [formState, setFormState] = useState<DeployVaultForm>(initialValues);

    useEffect(() => {
        if (tokens?.length > 0) {
            setTokenOptions(tokens.map(token => {
                return {
                    label: token.name,
                    key: token.address
                }
            }));
        }
    }, [tokens]);

    const handleTokenChange = (key: string) => {
        setFormState(prev => {
            return {
                ...prev,
                tokenAddress: key
            }
        })
    };

    return (
        <>
            {!isInitialized && <Loader />}
            {isInitialized &&
                <>
                    <div className='bg-white w-[30%] mx-auto mt-5'>
                        <div className='border border-b-gray-200 py-4 px-2 flex flex-row justify-between items-center'>
                            <div className='text-base text-gray-900'>Deploy New Vault</div>

                        </div>
                        <div className='flex flex-col gap-4 p-4 border border-gray-200'>
                            <div className=''>
                                <Dropdown label='Token' options={tokenOptions} onChange={handleTokenChange} selectedKey={formState?.tokenAddress} />
                            </div>
                            <div className=''>
                                <TextField label='Name' value={formState.name} onChange={(value: string) => setFormState(prevState => ({ ...prevState, name: value }))} />
                            </div>
                            <div className=''>
                                <TextField label='Symbol' value={formState.symbol} onChange={(value: string) => setFormState(prevState => ({ ...prevState, symbol: value }))} />
                            </div>
                            <div className=''>
                                <TextField label='TVL Cap' type='number' value={formState.tvlCap} onChange={(value: number) => setFormState(prevState => ({ ...prevState, tvlCap: value }))} />
                            </div>
                            <div className=''>
                                <TextField label='Treasury address' value={formState.treasury} onChange={(value: string) => setFormState(prevState => ({ ...prevState, treasury: value }))} />
                            </div>
                            <div className=''>
                                <Label text='Strategist addresses' />
                                {formState.strategists.map((item, index) => {
                                    return (
                                        <div key={index} className='mb-2'>
                                            <TextField
                                                value={item}
                                                onChange={(value: string) => {
                                                    setFormState(prevState => ({
                                                        ...prevState,
                                                        strategists: prevState.strategists.map((strategist, idx) => {
                                                            if (idx === index) {
                                                                return value;
                                                            }
                                                            return strategist;
                                                        })
                                                    }))
                                                }}
                                            />
                                        </div>
                                    )
                                })}
                                <FormLink
                                    text='Add'
                                    clicked={() => setFormState(prevState => ({
                                        ...prevState,
                                        strategists: [...prevState.strategists, '']
                                    }))}
                                />
                            </div>
                            <div className=''>
                                <Label text='Multisig role addresses' />
                                {formState.multisigs.map((item, index) => {
                                    return (
                                        <div key={index} className='mb-2'>
                                            <TextField
                                                value={item}
                                                onChange={(value: string) => {
                                                    setFormState(prevState => ({
                                                        ...prevState,
                                                        multisigs: prevState.multisigs.map((multisig, idx) => {
                                                            if (idx === index) {
                                                                return value;
                                                            }
                                                            return multisig;
                                                        })
                                                    }))
                                                }}
                                            />
                                        </div>
                                    )
                                })}
                                <FormLink
                                    text='Add'
                                    clicked={() => setFormState(prevState => ({
                                        ...prevState,
                                        multisigs: [...prevState.multisigs, '']
                                    }))}
                                />
                            </div>
                            <div className='flex flex-row justify-between items-center'>
                                <Button text={isDeploying ? `Deploying...` : `Deploy Vault`} color='primary' variant='contained' onClick={async () => {
                                    try {
                                        console.log("formState", formState)
                                        setIsdeploying(true);
                                        const signer = await provider.getSigner(address)
                                        const factory = new ethers.ContractFactory(VAULT_V2_ABI, reaperVaultV2.bytecode, signer);
                                        const contract = await factory.deploy(formState.tokenAddress, formState.name, formState.symbol, formState.tvlCap, formState.treasury, formState.strategists, formState.multisigs); // 123 is the _value argument for the constructor
                                        await contract.waitForDeployment();
                                        const deployedAddress = await contract.getAddress();

                                        const request: IVaultCreateRequest = {
                                            address: deployedAddress,
                                            chainId: chain.chainId,
                                        }

                                        toast.success("Vault deployed! Updating indexer...")
                                        await addVault(request);

                                        setTimeout(() => {
                                            dispatch(setLastRefetch());
                                            toast.success("Indexer succesfully updated")
                                            navigate(`/vaults/${deployedAddress}`);
                                            setIsdeploying(false);
                                        }, 4000);

                                    } catch (error) {
                                        setIsdeploying(false);

                                        let jsonString = error.message.match(/\[ethjs-query\] while formatting outputs from RPC '(.+?)'/)[1];
                                        let cleanedJsonString = jsonString.replace(/\\\"/g, '"');

                                        // Parse the JSON string
                                        let parsedObj;
                                        try {
                                            parsedObj = JSON.parse(cleanedJsonString);
                                        } catch (error) {
                                            console.error("Error parsing JSON:", error);
                                            return;
                                        }

                                        // Extract the desired message
                                        let desiredMessage = parsedObj.value.data.message;
                                        toast.error(desiredMessage);
                                    }

                                }} />
                                <Button text='Reset' color='default' variant='outlined' onClick={() => setFormState(initialValues)} />
                            </div>

                        </div>

                        {/* <div className=''>
                            Deploy vault
                        </div>
                        <div className=''>
                            Deploy vault
                        </div>
                        <div className=''>
                            Deploy vault
                        </div> */}
                    </div>
                </>
            }
        </>

    )
}

export default VaultDeployPage
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Loader from '../../components/layout/Loader';
import { selectReaperTokensByChain, selectVaultsByChain } from '../../redux/selectors';
import Dropdown, { DropdownOptionType } from '../../components/form/Dropdown';
import { useEffect, useState } from 'react';
import TextField from '../../components/form/TextField';
import Label from '../../components/form/Label';
import FormLink from '../../components/form/FormLink';
import Button from '../../components/form/Button';

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

    const isInitialized = useSelector((state: RootState) => state.app.isInitialized);

    const reaperTokens = useSelector(selectReaperTokensByChain);

    const [reaperTokenOptions, setReaperTokenOptions] = useState<DropdownOptionType[]>([]);

    const initialValues: DeployVaultForm = {
        tokenAddress: "",
        name: "",
        symbol: "",
        tvlCap: undefined,
        treasury: "",
        strategists: [],
        multisigs: []
    };

    const [formState, setFormState] = useState<DeployVaultForm>(initialValues);

    useEffect(() => {
        if (reaperTokens?.length > 0) {
            setReaperTokenOptions(reaperTokens.map(token => {
                return {
                    label: token.name,
                    key: token.address
                }
            }));
        }
    }, [reaperTokens]);

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
                                <Dropdown label='Token' options={reaperTokenOptions} onChange={handleTokenChange} selectedKey={formState?.tokenAddress} />
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
                                <Button text='Deploy Vault' color='primary' variant='contained' />
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
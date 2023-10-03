
type Props = {
    title: string;
    children: JSX.Element;
}

function Card({ title, children }: Props) {
    return (
        <div className='bg-white flex flex-col p-1 border-gray-200 border'>
            <div className='p-2 text-gray-400 overflow-hidden text-ellipsis text-xs mb-1'>{title}</div>
            <div className='min-h-[100px]'>
                {children}
            </div>
        </div>
    )
}

export default Card
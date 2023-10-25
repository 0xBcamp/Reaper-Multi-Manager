import React from 'react'

type Props = {
    title: string;
    percentage: number;
    percentageDisplay: string;
    showPercentage?: boolean;
    colorScheme?: 'primary' | 'secondary' | 'tertiary';
}

const ProgressBar = ({ title, percentage, percentageDisplay, showPercentage = true, colorScheme = 'primary' }: Props) => {
    const getColorClasses = () => {
        switch (colorScheme) {
            case 'primary':
                return {
                    text: 'text-teal-600',
                    bg: 'bg-teal-200',
                    progress: 'bg-teal-500',
                };
            case 'secondary':
                return {
                    text: 'text-blue-600',
                    bg: 'bg-blue-200',
                    progress: 'bg-blue-500',
                };
            case 'tertiary':
                return {
                    text: 'text-orange-600',
                    bg: 'bg-orange-200',
                    progress: 'bg-orange-500',
                };
            default:
                return {
                    text: 'text-teal-600',
                    bg: 'bg-teal-200',
                    progress: 'bg-teal-500',
                };
        }
    }

    const colorClasses = getColorClasses();

    return (
        <div className="relative pt-1">
            <div className="flex mb-1 items-center justify-between">
                <div>
                    <span className={`text-xs font-semibold inline-block py-1 px-1 text-gray-500`}>
                        {title}
                    </span>
                </div>
                <div className="text-right">
                    <span className={`text-xs font-semibold inline-block ${colorClasses.text}`}>
                        {`${percentageDisplay}${showPercentage ? "%" : ""}`}
                    </span>
                </div>
            </div>
            <div className={`overflow-hidden h-2 mb-4 text-xs flex rounded ${colorClasses.bg}`}>
                <div
                    style={{ width: `${percentage}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${colorClasses.progress}`}
                ></div>
            </div>
        </div>
    )
}

export default ProgressBar
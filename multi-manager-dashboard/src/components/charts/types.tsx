export type CurveFitGraph = {
    name: string;
    data: CurveFitData[];
    threshold: number;
};

export type CurveFitData = {
    index: number;
    timestamp: number;
    gain: number;
    loss: number;
    allocated: number;
    allocationAdded: number;
    duration: number;
};
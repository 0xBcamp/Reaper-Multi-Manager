export type CurveFitGraph = {
    name: string;
    data: CurveFitData[];
};

export type CurveFitData = {
    index: number;
    timestamp: number;
    gain: number;
    loss: number;
    allocated: number;
    duration: number;
};
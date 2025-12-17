export interface ComplexityResult {
  band: {
    min: number;
    max: number;
  };
  dominantDrivers: string[];
  justification: string;
  assumptions: string[];
}
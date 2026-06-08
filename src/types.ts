export interface QualityTool {
  id: string;
  title: string;
  description: string;
  category: string;
  primaryOutcome: string;
}

export type Category = 
  | 'QA plans'
  | 'QC checks'
  | 'Batch consistency'
  | 'Sampling and inspection'
  | 'Supplier quality'
  | 'Contamination risk'
  | 'Release readiness'
  | 'Traceability';

import { QualityTool } from './types';

export const TOOLS: QualityTool[] = [
  {
    id: 'batch-consistency-tracker',
    title: 'Batch Consistency Tracker',
    description: 'Monitor variations across production batches to ensure uniform quality standards.',
    category: 'Batch consistency',
    primaryOutcome: 'Reduced batch variability'
  },
  {
    id: 'qc-inspection-checklist',
    title: 'QC Inspection Checklist',
    description: 'Standardized checklist for routine quality control inspections on the floor.',
    category: 'QC checks',
    primaryOutcome: 'Consistent field inspections'
  },
  {
    id: 'sampling-plan-builder',
    title: 'Sampling Plan Builder',
    description: 'Design statistically valid sampling plans for incoming materials and finished goods.',
    category: 'Sampling and inspection',
    primaryOutcome: 'Optimized sampling rates'
  },
  {
    id: 'supplier-quality-scorecard',
    title: 'Supplier Quality Scorecard',
    description: 'Evaluate and track vendor performance based on defect rates and compliance.',
    category: 'Supplier quality',
    primaryOutcome: 'Improved supplier reliability'
  },
  {
    id: 'contamination-risk-checker',
    title: 'Contamination Risk Checker',
    description: 'Identify potential cross-contamination points in processing, storage, and handling.',
    category: 'Contamination risk',
    primaryOutcome: 'Reduced contamination events'
  },
  {
    id: 'release-readiness-checklist',
    title: 'Release Readiness Checklist',
    description: 'Final verification steps to ensure product meets all criteria before shipping.',
    category: 'Release readiness',
    primaryOutcome: 'Safe product release'
  },
  {
    id: 'product-standards-tracker',
    title: 'Product Standards Tracker',
    description: 'Log and compare key product metrics against required baseline standards.',
    category: 'QA plans',
    primaryOutcome: 'Maintained product standards'
  },
  {
    id: 'qa-logbook',
    title: 'QA Logbook',
    description: 'Centralized digital log for recording deviations, corrective actions, and QA alerts.',
    category: 'Traceability',
    primaryOutcome: 'Complete QA audit trail'
  }
];

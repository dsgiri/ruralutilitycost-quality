# Calculators & Tools Blueprint

This document defines the key features, required inputs, and expected outputs for each of the 8 Quality Assurance tools within the Quality Hub.

## 1. Batch Consistency Tracker
**Goal:** Monitor variations across production batches to ensure uniform quality standards.
*   **Key Features:**
    *   **Input Fields:** Batch ID, production date, target weight/volume, actual weight/volume, temperature logs, pH levels, visual inspection score (1-10).
    *   **Logic:** Calculates standard deviation across batches. Flags batches that fall outside acceptable variance ranges (e.g., +/- 2%).
    *   **Outputs:** Consistency score, "Pass/Review/Reject" status, variance percentage, and a trend line warning if 3 consecutive batches drift from the mean.

## 2. QC Inspection Checklist
**Goal:** Standardized checklist for routine quality control inspections on the floor.
*   **Key Features:**
    *   **Input Fields:** Inspector name, area/zone, equipment sanitization status (Yes/No), PPE compliance, pest control status.
    *   **Logic:** Dynamic scoring based on critical vs. non-critical criteria. Any "No" on a critical control point (CCP) instantly flags a failure.
    *   **Outputs:** Final Inspection Score (%), Compliance Status (Compliant, Conditional, Failed), and auto-generated action items for failed checks.

## 3. Sampling Plan Builder
**Goal:** Design statistically valid sampling plans for incoming materials and finished goods.
*   **Key Features:**
    *   **Input Fields:** Total lot size, acceptable quality limit (AQL level), inspection level (I, II, III).
    *   **Logic:** Implements standard MIL-STD-105E / ANSI/ASQ Z1.4 sampling logic to determine the required sample size and accept/reject criteria.
    *   **Outputs:** Sample size required, maximum number of defective units allowed to accept the lot, minimum defective units to reject the lot.

## 4. Supplier Quality Scorecard
**Goal:** Evaluate and track vendor performance based on defect rates and compliance.
*   **Key Features:**
    *   **Input Fields:** Supplier name, total units received, units rejected, on-time delivery (%), documentation accuracy (1-5 scale).
    *   **Logic:** Weighted scoring model (e.g., Defect rate = 50%, Delivery = 30%, Docs = 20%).
    *   **Outputs:** Overall Supplier Grade (A, B, C, D), percentage score, and recommendation (e.g., "Approved Vendor", "Requires Probation").

## 5. Contamination Risk Checker
**Goal:** Identify potential cross-contamination points in processing, storage, and handling.
*   **Key Features:**
    *   **Input Fields:** Product type (Raw/Cooked/Feed), storage proximity, shared equipment usage (Yes/No), allergen presence (List), worker crossover frequency.
    *   **Logic:** Risk matrix calculation (Severity x Likelihood). Presence of allergens on shared equipment without validated cleaning triggers a High Risk alert.
    *   **Outputs:** Risk Level (Low, Medium, High, Critical), heat-mapped risk summary, and specific mitigation recommendations.

## 6. Release Readiness Checklist
**Goal:** Final verification steps to ensure product meets all criteria before shipping.
*   **Key Features:**
    *   **Input Fields:** Lab results verified (Yes/No), QA sign-off complete, labels correct, metal detector passed, temperature during storage maintained.
    *   **Logic:** Boolean gate logic. ALL critical inputs must be true to allow release.
    *   **Outputs:** "READY FOR RELEASE" (Green) or "HOLD" (Red) with missing dependencies highlighted.

## 7. Product Standards Tracker
**Goal:** Log and compare key product metrics against required baseline standards.
*   **Key Features:**
    *   **Input Fields:** Product category, moisture content (%), protein content (%), density, visual grade.
    *   **Logic:** Compares inputted lab results against pre-loaded standard specs for the selected product category.
    *   **Outputs:** Spec Deviation Report (identifying exact parameters out of bounds), quality tier classification (e.g., Premium, Standard, Sub-standard).

## 8. QA Logbook
**Goal:** Centralized digital log for recording deviations, corrective actions, and QA alerts.
*   **Key Features:**
    *   **Input Fields:** Date/Time, reported by, incident type (Deviation, Audit finding, Customer complaint), description, immediate action taken, root cause (if known).
    *   **Logic:** Categorizes and timestamp-locks entries. Escalates based on incident type severity.
    *   **Outputs:** Chronological audit trail, printable shift report, and open issues counter.

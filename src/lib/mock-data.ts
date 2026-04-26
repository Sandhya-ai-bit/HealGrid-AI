export type ContradictionFlag = {
  severity: "high" | "medium" | "low";
  claim: string;
  evidence: string;
  impact: number;
};

export type TrustBreakdown = {
  data_completeness: number;
  source_consistency: number;
  temporal_freshness: number;
  capability_verification: number;
  infrastructure_match: number;
  note_quality: number;
};

export type Facility = {
  id: string;
  name: string;
  shortName: string;
  type: "tertiary" | "district" | "chc" | "phc" | "private";
  ownership: "public" | "private" | "trust";
  state: string;
  district: string;
  lat: number;
  lng: number;
  beds_total: number;
  beds_icu: number;
  beds_emergency: number;
  trust_score: number;
  trust_breakdown: TrustBreakdown;
  verified_capabilities: string[];
  reported_capabilities: string[];
  contradiction_flags: ContradictionFlag[];
  raw_notes: string;
  ai_summary: string;
  last_updated: string;
  specialists: string[];
  equipment: string[];
  emergency_ready: boolean;
  desert_zone: boolean;
  verified: boolean;
};

const ALL_CAPS = ["ICU","MRI","CT","NICU","PICU","Blood Bank","Trauma","Cardiac","Neurology","Dialysis","Pharmacy","OPD","Surgery","Emergency","Pediatrics","Maternity"];

function tb(c: number, s: number, t: number, cap: number, infra: number, n: number): TrustBreakdown {
  return { data_completeness: c, source_consistency: s, temporal_freshness: t, capability_verification: cap, infrastructure_match: infra, note_quality: n };
}

export const mockFacilities: Facility[] = [
  {
    id: "fac_001",
    name: "All India Institute of Medical Sciences, New Delhi",
    shortName: "AIIMS New Delhi",
    type: "tertiary", ownership: "public",
    state: "Delhi", district: "New Delhi",
    lat: 28.5665, lng: 77.21,
    beds_total: 2478, beds_icu: 148, beds_emergency: 60,
    trust_score: 94,
    trust_breakdown: tb(96,95,88,97,96,92),
    verified_capabilities: ["ICU","MRI","CT","PET-CT","NICU","PICU","Blood Bank","Trauma","Cardiac","Neurology","Dialysis","Pharmacy","Surgery","Emergency"],
    reported_capabilities: ["ICU","MRI","CT","PET-CT","NICU","PICU","Blood Bank","Trauma","Cardiac","Neurology","Dialysis","Pharmacy","Surgery","Emergency","Bone Marrow Transplant"],
    contradiction_flags: [],
    raw_notes: "AIIMS New Delhi is India's premier apex tertiary care institution. 2478 beds operational. 24-hour emergency with full trauma response. 148 ICU beds across MICU, SICU, Cardiac ICU. 3T MRI and 64-slice CT available 24/7. NICU, PICU functional. Linear accelerator and robotic surgery system in operation. Bone marrow transplant unit active.",
    ai_summary: "Apex tertiary care institution. Verified imaging, critical care and subspecialty surgery. Highest data confidence.",
    last_updated: "2026-03-15",
    specialists: ["Cardiology","Neurology","Oncology","Gastroenterology","Nephrology","Neurosurgery"],
    equipment: ["3T MRI","64-slice CT","Linear Accelerator","ECMO","Robotic Surgery System"],
    emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_002", name: "King Edward Memorial Hospital", shortName: "KEM Mumbai",
    type: "tertiary", ownership: "public", state: "Maharashtra", district: "Mumbai",
    lat: 19.0023, lng: 72.8424, beds_total: 1800, beds_icu: 95, beds_emergency: 45,
    trust_score: 91, trust_breakdown: tb(94,92,86,93,92,89),
    verified_capabilities: ["ICU","MRI","CT","NICU","Blood Bank","Trauma","Cardiac","Surgery","Emergency","Pharmacy"],
    reported_capabilities: ["ICU","MRI","CT","NICU","Blood Bank","Trauma","Cardiac","Surgery","Emergency","Pharmacy","Dialysis"],
    contradiction_flags: [],
    raw_notes: "KEM Mumbai — full-service teaching hospital. 1800 beds. Trauma center active. 95 ICU beds. Cardiac cath lab operational.",
    ai_summary: "Major tertiary teaching hospital with verified trauma and cardiac capability.",
    last_updated: "2026-04-02",
    specialists: ["Cardiology","Trauma Surgery","Pediatrics","Neurology"],
    equipment: ["1.5T MRI","CT Scanner","Cath Lab","Ventilators"],
    emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_003", name: "Christian Medical College Vellore", shortName: "CMC Vellore",
    type: "tertiary", ownership: "trust", state: "Tamil Nadu", district: "Vellore",
    lat: 12.9249, lng: 79.1353, beds_total: 2700, beds_icu: 180, beds_emergency: 70,
    trust_score: 96, trust_breakdown: tb(97,96,93,97,95,96),
    verified_capabilities: ["ICU","MRI","CT","PET-CT","NICU","PICU","Blood Bank","Trauma","Cardiac","Neurology","Dialysis","Surgery"],
    reported_capabilities: ["ICU","MRI","CT","PET-CT","NICU","PICU","Blood Bank","Trauma","Cardiac","Neurology","Dialysis","Surgery"],
    contradiction_flags: [],
    raw_notes: "CMC Vellore — internationally recognized. 2700 beds. 180 ICU beds. Dedicated transplant unit. PET-CT and 3T MRI 24/7.",
    ai_summary: "Top-tier tertiary trust hospital. All claimed capabilities verified across sources.",
    last_updated: "2026-04-10",
    specialists: ["Cardiology","Neurology","Oncology","Transplant"],
    equipment: ["3T MRI","PET-CT","Cath Lab","Robotic Surgery"],
    emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_004", name: "Safdarjung Hospital", shortName: "Safdarjung Delhi",
    type: "tertiary", ownership: "public", state: "Delhi", district: "South West Delhi",
    lat: 28.5685, lng: 77.2069, beds_total: 1531, beds_icu: 84, beds_emergency: 50,
    trust_score: 88, trust_breakdown: tb(90,86,84,89,88,87),
    verified_capabilities: ["ICU","CT","Trauma","Surgery","Emergency","Blood Bank","Pharmacy"],
    reported_capabilities: ["ICU","MRI","CT","Trauma","Surgery","Emergency","Blood Bank","Pharmacy"],
    contradiction_flags: [{severity:"medium", claim:"Lists MRI as available", evidence:"Notes indicate MRI down for maintenance Mar 2026", impact:-4}],
    raw_notes: "Safdarjung — large public tertiary. Trauma center. ICU active. MRI under maintenance since March 2026. CT operational.",
    ai_summary: "Reliable tertiary trauma hub. Minor imaging discrepancy flagged.",
    last_updated: "2026-03-20",
    specialists: ["Trauma Surgery","Orthopedics","General Medicine"],
    equipment: ["CT Scanner","Cath Lab"],
    emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_005", name: "Apollo Hospitals Chennai", shortName: "Apollo Chennai",
    type: "private", ownership: "private", state: "Tamil Nadu", district: "Chennai",
    lat: 13.0631, lng: 80.2496, beds_total: 1100, beds_icu: 110, beds_emergency: 30,
    trust_score: 89, trust_breakdown: tb(92,90,88,90,88,86),
    verified_capabilities: ["ICU","MRI","CT","NICU","Cardiac","Neurology","Surgery","Emergency"],
    reported_capabilities: ["ICU","MRI","CT","NICU","Cardiac","Neurology","Surgery","Emergency","PET-CT"],
    contradiction_flags: [],
    raw_notes: "Apollo Chennai — multispecialty private hospital. 1100 beds. Cardiac surgery flagship. NICU 30 cots.",
    ai_summary: "High-trust private multispecialty. Strong cardiac and imaging.",
    last_updated: "2026-04-05",
    specialists: ["Cardiology","Cardiac Surgery","Neurology"],
    equipment: ["3T MRI","CT","Cath Lab","Robotic Surgery"],
    emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_006", name: "Civil Hospital Nagpur", shortName: "Civil Nagpur",
    type: "district", ownership: "public", state: "Maharashtra", district: "Nagpur",
    lat: 21.1458, lng: 79.0882, beds_total: 540, beds_icu: 18, beds_emergency: 20,
    trust_score: 61, trust_breakdown: tb(64,58,55,62,68,60),
    verified_capabilities: ["Surgery","OPD","Emergency","Blood Bank"],
    reported_capabilities: ["ICU","Surgery","OPD","Emergency","Blood Bank","CT"],
    contradiction_flags: [
      {severity:"medium", claim:"Lists 18 ICU beds", evidence:"Census shows max 8 functional ventilators", impact:-8},
      {severity:"low", claim:"CT available", evidence:"Notes mention CT only on weekdays 9-5", impact:-3},
    ],
    raw_notes: "District hospital. 540 beds. Surgical OT functional. ICU partially equipped — 18 beds listed but only 8 ventilators functional. CT Mon-Fri daytime only.",
    ai_summary: "Moderate reliability. Capacity claims partially contradicted.",
    last_updated: "2026-01-12",
    specialists: ["General Medicine","General Surgery","Pediatrics"],
    equipment: ["CT Scanner","Ventilators (8)"],
    emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_007", name: "Sassoon General Hospital", shortName: "Sassoon Pune",
    type: "district", ownership: "public", state: "Maharashtra", district: "Pune",
    lat: 18.5196, lng: 73.8553, beds_total: 1296, beds_icu: 32, beds_emergency: 25,
    trust_score: 72, trust_breakdown: tb(75,70,72,73,74,68),
    verified_capabilities: ["ICU","CT","Surgery","Emergency","Blood Bank","Pharmacy"],
    reported_capabilities: ["ICU","CT","MRI","Surgery","Emergency","Blood Bank","Pharmacy"],
    contradiction_flags: [{severity:"low", claim:"MRI listed", evidence:"No MRI seen in equipment audit Q1 2026", impact:-5}],
    raw_notes: "Major teaching hospital. 1296 beds. ICU 32 beds. CT scanner operational.",
    ai_summary: "Reliable district hospital. Imaging claim partially unsupported.",
    last_updated: "2026-02-22",
    specialists: ["General Medicine","Pediatrics","Orthopedics"],
    equipment: ["CT Scanner"], emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_008", name: "PGIMER Chandigarh", shortName: "PGIMER",
    type: "tertiary", ownership: "public", state: "Chandigarh", district: "Chandigarh",
    lat: 30.7649, lng: 76.7765, beds_total: 1948, beds_icu: 130, beds_emergency: 60,
    trust_score: 93, trust_breakdown: tb(95,93,90,94,93,93),
    verified_capabilities: ["ICU","MRI","CT","PET-CT","NICU","Trauma","Cardiac","Neurology","Dialysis","Surgery"],
    reported_capabilities: ["ICU","MRI","CT","PET-CT","NICU","Trauma","Cardiac","Neurology","Dialysis","Surgery"],
    contradiction_flags: [],
    raw_notes: "PGIMER — premier tertiary care and research. 1948 beds. Trauma centre active.",
    ai_summary: "Apex tertiary, fully verified.",
    last_updated: "2026-04-12",
    specialists: ["Cardiology","Neurology","Nephrology","Oncology"],
    equipment: ["3T MRI","PET-CT","Cath Lab"], emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_009", name: "NIMHANS Bengaluru", shortName: "NIMHANS",
    type: "tertiary", ownership: "public", state: "Karnataka", district: "Bengaluru",
    lat: 12.9434, lng: 77.5963, beds_total: 1005, beds_icu: 60, beds_emergency: 25,
    trust_score: 90, trust_breakdown: tb(92,90,88,91,90,89),
    verified_capabilities: ["ICU","MRI","CT","Neurology","Surgery","Emergency"],
    reported_capabilities: ["ICU","MRI","CT","Neurology","Surgery","Emergency"],
    contradiction_flags: [],
    raw_notes: "NIMHANS — neuropsychiatry apex centre. Neurosurgery, neuro-ICU operational.",
    ai_summary: "Apex neuro centre. Fully verified.",
    last_updated: "2026-03-30",
    specialists: ["Neurology","Neurosurgery","Psychiatry"],
    equipment: ["3T MRI","CT"], emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_010", name: "Tata Memorial Hospital", shortName: "Tata Memorial",
    type: "tertiary", ownership: "trust", state: "Maharashtra", district: "Mumbai",
    lat: 19.0024, lng: 72.8430, beds_total: 700, beds_icu: 40, beds_emergency: 15,
    trust_score: 95, trust_breakdown: tb(96,96,94,95,94,95),
    verified_capabilities: ["ICU","MRI","CT","PET-CT","Surgery","Emergency","Pharmacy"],
    reported_capabilities: ["ICU","MRI","CT","PET-CT","Surgery","Emergency","Pharmacy"],
    contradiction_flags: [],
    raw_notes: "Tata Memorial — apex oncology centre. PET-CT, Linac all operational.",
    ai_summary: "Apex oncology trust hospital. Full verification.",
    last_updated: "2026-04-15",
    specialists: ["Oncology","Surgical Oncology","Radiation Oncology"],
    equipment: ["3T MRI","PET-CT","Linac"], emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_011", name: "SMS Hospital Jaipur", shortName: "SMS Jaipur",
    type: "tertiary", ownership: "public", state: "Rajasthan", district: "Jaipur",
    lat: 26.9124, lng: 75.7873, beds_total: 1750, beds_icu: 88, beds_emergency: 40,
    trust_score: 84, trust_breakdown: tb(86,82,80,85,86,84),
    verified_capabilities: ["ICU","MRI","CT","Trauma","Surgery","Emergency","Blood Bank"],
    reported_capabilities: ["ICU","MRI","CT","Trauma","Surgery","Emergency","Blood Bank","NICU"],
    contradiction_flags: [{severity:"low", claim:"NICU 20 cots", evidence:"Notes show 12 cots functional", impact:-3}],
    raw_notes: "SMS — premier government hospital Rajasthan. Trauma centre active.",
    ai_summary: "Reliable tertiary; minor NICU capacity discrepancy.",
    last_updated: "2026-02-28",
    specialists: ["Cardiology","Trauma","Pediatrics"],
    equipment: ["MRI","CT","Cath Lab"], emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_012", name: "Civil Hospital Ahmedabad", shortName: "Civil Ahmedabad",
    type: "tertiary", ownership: "public", state: "Gujarat", district: "Ahmedabad",
    lat: 23.0225, lng: 72.5714, beds_total: 2800, beds_icu: 130, beds_emergency: 55,
    trust_score: 86, trust_breakdown: tb(88,85,82,86,88,87),
    verified_capabilities: ["ICU","MRI","CT","Trauma","Cardiac","Surgery","Emergency"],
    reported_capabilities: ["ICU","MRI","CT","Trauma","Cardiac","Surgery","Emergency","PET-CT"],
    contradiction_flags: [{severity:"medium", claim:"PET-CT listed", evidence:"PET-CT installation pending", impact:-6}],
    raw_notes: "One of Asia's largest civil hospitals. 2800 beds. PET-CT installation in progress.",
    ai_summary: "Major tertiary; one capability flagged as not yet operational.",
    last_updated: "2026-03-05",
    specialists: ["Cardiology","Trauma","General Surgery"],
    equipment: ["MRI","CT","Cath Lab"], emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_013", name: "Government Medical College Kozhikode", shortName: "GMC Kozhikode",
    type: "district", ownership: "public", state: "Kerala", district: "Kozhikode",
    lat: 11.2588, lng: 75.7804, beds_total: 1100, beds_icu: 55, beds_emergency: 30,
    trust_score: 82, trust_breakdown: tb(84,80,82,82,84,80),
    verified_capabilities: ["ICU","CT","MRI","Surgery","Emergency","Blood Bank","NICU"],
    reported_capabilities: ["ICU","CT","MRI","Surgery","Emergency","Blood Bank","NICU"],
    contradiction_flags: [],
    raw_notes: "Govt Medical College Kozhikode. 1100 beds. NICU 25 cots.",
    ai_summary: "Solid district medical college, fully verified.",
    last_updated: "2026-03-22",
    specialists: ["Pediatrics","General Medicine","Obstetrics"],
    equipment: ["MRI","CT"], emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_014", name: "District Hospital Patna", shortName: "Patna District",
    type: "district", ownership: "public", state: "Bihar", district: "Patna",
    lat: 25.5941, lng: 85.1376, beds_total: 380, beds_icu: 12, beds_emergency: 15,
    trust_score: 54, trust_breakdown: tb(58,50,48,55,60,52),
    verified_capabilities: ["Surgery","OPD","Emergency","Pharmacy"],
    reported_capabilities: ["ICU","Surgery","OPD","Emergency","Pharmacy","Blood Bank","CT"],
    contradiction_flags: [
      {severity:"high", claim:"12 ICU beds functional", evidence:"Audit found 4 ventilators, 2 in working order", impact:-12},
      {severity:"medium", claim:"Blood bank", evidence:"License renewal pending since 2024", impact:-7},
    ],
    raw_notes: "District hospital Patna. Surgical OT works. ICU listed but mostly non-functional. Blood bank license expired.",
    ai_summary: "Low reliability; multiple major contradictions.",
    last_updated: "2025-09-18",
    specialists: ["General Medicine","Surgery"],
    equipment: ["X-Ray","2 Ventilators"], emergency_ready: false, desert_zone: false, verified: false,
  },
  {
    id: "fac_015", name: "RIMS Ranchi", shortName: "RIMS Ranchi",
    type: "tertiary", ownership: "public", state: "Jharkhand", district: "Ranchi",
    lat: 23.3441, lng: 85.3096, beds_total: 1750, beds_icu: 60, beds_emergency: 30,
    trust_score: 70, trust_breakdown: tb(72,68,66,71,72,71),
    verified_capabilities: ["ICU","CT","Surgery","Emergency","Blood Bank"],
    reported_capabilities: ["ICU","CT","MRI","Surgery","Emergency","Blood Bank","Cardiac"],
    contradiction_flags: [{severity:"medium", claim:"MRI available", evidence:"MRI installation pending", impact:-7}],
    raw_notes: "RIMS Ranchi — state's main tertiary. ICU functional. MRI yet to be commissioned.",
    ai_summary: "Moderate trust; imaging capability overstated.",
    last_updated: "2026-01-25",
    specialists: ["General Medicine","Cardiology"],
    equipment: ["CT Scanner"], emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_016", name: "PHC Barmer Block 7", shortName: "PHC Barmer-7",
    type: "phc", ownership: "public", state: "Rajasthan", district: "Barmer",
    lat: 25.7521, lng: 71.3967, beds_total: 6, beds_icu: 0, beds_emergency: 1,
    trust_score: 23, trust_breakdown: tb(28,18,22,20,30,20),
    verified_capabilities: ["OPD"],
    reported_capabilities: ["OPD","ICU","Emergency","Pharmacy"],
    contradiction_flags: [
      {severity:"high", claim:"ICU 2 beds in structured data", evidence:"Notes: 'no functional ICU, transferred to Jodhpur'", impact:-15},
      {severity:"high", claim:"24hr emergency service", evidence:"Staff records: single doctor, daytime only", impact:-10},
    ],
    raw_notes: "PHC functional 9am-5pm. Doctor available Mon-Sat. No ICU. Emergency cases transferred to Jodhpur (127km).",
    ai_summary: "Unreliable for any emergency or critical care planning. OPD only.",
    last_updated: "2024-11-04",
    specialists: [],
    equipment: ["Basic OPD kit"], emergency_ready: false, desert_zone: true, verified: false,
  },
  {
    id: "fac_017", name: "PHC Jaisalmer Sam", shortName: "PHC Jaisalmer-Sam",
    type: "phc", ownership: "public", state: "Rajasthan", district: "Jaisalmer",
    lat: 26.8333, lng: 70.5167, beds_total: 4, beds_icu: 0, beds_emergency: 1,
    trust_score: 28, trust_breakdown: tb(32,22,26,24,32,28),
    verified_capabilities: ["OPD"],
    reported_capabilities: ["OPD","Emergency","Pharmacy"],
    contradiction_flags: [{severity:"high", claim:"Emergency available", evidence:"Notes: nearest emergency 89km away", impact:-12}],
    raw_notes: "Tiny PHC in Sam dunes region. OPD twice weekly. No emergency. Patients sent to Jaisalmer city.",
    ai_summary: "Unreliable, desert zone facility.",
    last_updated: "2024-08-20",
    specialists: [], equipment: [], emergency_ready: false, desert_zone: true, verified: false,
  },
  {
    id: "fac_018", name: "CHC Surguja", shortName: "CHC Surguja",
    type: "chc", ownership: "public", state: "Chhattisgarh", district: "Surguja",
    lat: 23.0827, lng: 83.1956, beds_total: 30, beds_icu: 2, beds_emergency: 4,
    trust_score: 41, trust_breakdown: tb(45,38,40,40,44,40),
    verified_capabilities: ["OPD","Surgery","Pharmacy"],
    reported_capabilities: ["OPD","Surgery","Pharmacy","ICU","Emergency"],
    contradiction_flags: [{severity:"high", claim:"ICU 2 beds", evidence:"No oxygen plant; ventilators absent", impact:-12}],
    raw_notes: "CHC Surguja — small surgical OT works. ICU rooms exist without ventilators.",
    ai_summary: "Low trust; ICU claim unsupported.",
    last_updated: "2025-06-15",
    specialists: ["General Medicine"], equipment: ["X-Ray"], emergency_ready: false, desert_zone: true, verified: false,
  },
  {
    id: "fac_019", name: "District Hospital Dibang Valley", shortName: "DH Dibang Valley",
    type: "district", ownership: "public", state: "Arunachal Pradesh", district: "Dibang Valley",
    lat: 28.1996, lng: 95.8728, beds_total: 50, beds_icu: 0, beds_emergency: 4,
    trust_score: 22, trust_breakdown: tb(25,18,18,20,28,22),
    verified_capabilities: ["OPD","Pharmacy"],
    reported_capabilities: ["OPD","Pharmacy","Surgery","Emergency","ICU"],
    contradiction_flags: [
      {severity:"high", claim:"Surgical OT", evidence:"OT non-functional since 2023, no surgeon posted", impact:-12},
      {severity:"high", claim:"ICU", evidence:"Building under renovation, no equipment", impact:-12},
    ],
    raw_notes: "Remote district hospital. OPD only effectively. Nearest tertiary 201km Dibrugarh.",
    ai_summary: "Critically unreliable. Severe coverage gap.",
    last_updated: "2024-12-02",
    specialists: [], equipment: ["X-Ray"], emergency_ready: false, desert_zone: true, verified: false,
  },
  {
    id: "fac_020", name: "Fortis Memorial Gurgaon", shortName: "Fortis Gurgaon",
    type: "private", ownership: "private", state: "Haryana", district: "Gurugram",
    lat: 28.4399, lng: 77.0490, beds_total: 310, beds_icu: 60, beds_emergency: 14,
    trust_score: 88, trust_breakdown: tb(91,88,86,89,86,86),
    verified_capabilities: ["ICU","MRI","CT","NICU","Cardiac","Neurology","Surgery","Emergency"],
    reported_capabilities: ["ICU","MRI","CT","NICU","Cardiac","Neurology","Surgery","Emergency"],
    contradiction_flags: [],
    raw_notes: "Fortis Gurgaon multispecialty. 310 beds. Cardiac and neuro flagship.",
    ai_summary: "High-trust private. Verified.",
    last_updated: "2026-04-01",
    specialists: ["Cardiology","Neurology","Oncology"],
    equipment: ["3T MRI","CT","Cath Lab"], emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_021", name: "Manipal Hospital Bengaluru", shortName: "Manipal BLR",
    type: "private", ownership: "private", state: "Karnataka", district: "Bengaluru",
    lat: 12.9591, lng: 77.6485, beds_total: 600, beds_icu: 80, beds_emergency: 20,
    trust_score: 87, trust_breakdown: tb(89,87,86,87,86,85),
    verified_capabilities: ["ICU","MRI","CT","NICU","Cardiac","Surgery","Emergency"],
    reported_capabilities: ["ICU","MRI","CT","NICU","Cardiac","Surgery","Emergency"],
    contradiction_flags: [],
    raw_notes: "Manipal Bengaluru. 600 beds. Multispecialty private.",
    ai_summary: "Reliable private hospital.",
    last_updated: "2026-04-08",
    specialists: ["Cardiology","Oncology"],
    equipment: ["MRI","CT"], emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_022", name: "Government Medical College Thiruvananthapuram", shortName: "GMC TVM",
    type: "tertiary", ownership: "public", state: "Kerala", district: "Thiruvananthapuram",
    lat: 8.5241, lng: 76.9366, beds_total: 1900, beds_icu: 95, beds_emergency: 40,
    trust_score: 89, trust_breakdown: tb(91,89,87,88,90,89),
    verified_capabilities: ["ICU","MRI","CT","NICU","Cardiac","Trauma","Surgery","Emergency"],
    reported_capabilities: ["ICU","MRI","CT","NICU","Cardiac","Trauma","Surgery","Emergency"],
    contradiction_flags: [],
    raw_notes: "Premier Kerala govt teaching hospital. Trauma + cardiac + neuro all active.",
    ai_summary: "Reliable tertiary, fully verified.",
    last_updated: "2026-03-28",
    specialists: ["Cardiology","Neurology","Trauma"],
    equipment: ["MRI","CT","Cath Lab"], emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_023", name: "Osmania General Hospital", shortName: "Osmania Hyderabad",
    type: "tertiary", ownership: "public", state: "Telangana", district: "Hyderabad",
    lat: 17.3700, lng: 78.4734, beds_total: 1168, beds_icu: 60, beds_emergency: 30,
    trust_score: 76, trust_breakdown: tb(78,74,72,76,80,76),
    verified_capabilities: ["ICU","CT","Surgery","Emergency","Blood Bank"],
    reported_capabilities: ["ICU","CT","MRI","Surgery","Emergency","Blood Bank","Cardiac"],
    contradiction_flags: [{severity:"medium", claim:"MRI", evidence:"MRI offline since 2024", impact:-6}],
    raw_notes: "Heritage govt tertiary. Building partial repairs. MRI inoperative.",
    ai_summary: "Moderate trust; imaging gap.",
    last_updated: "2026-02-14",
    specialists: ["General Medicine","Surgery"],
    equipment: ["CT"], emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_024", name: "BJ Medical College Pune", shortName: "BJMC Pune",
    type: "tertiary", ownership: "public", state: "Maharashtra", district: "Pune",
    lat: 18.5246, lng: 73.8573, beds_total: 1100, beds_icu: 50, beds_emergency: 25,
    trust_score: 81, trust_breakdown: tb(83,80,80,82,82,80),
    verified_capabilities: ["ICU","CT","MRI","Surgery","Emergency","Blood Bank"],
    reported_capabilities: ["ICU","CT","MRI","Surgery","Emergency","Blood Bank","NICU"],
    contradiction_flags: [{severity:"low", claim:"NICU 16 cots", evidence:"10 functional cots in inspection", impact:-4}],
    raw_notes: "BJ Medical College Pune. Major teaching hospital.",
    ai_summary: "Reliable. Minor NICU discrepancy.",
    last_updated: "2026-03-10",
    specialists: ["General Medicine","Pediatrics"],
    equipment: ["MRI","CT"], emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_025", name: "PHC Bastar Tribal Block", shortName: "PHC Bastar-T",
    type: "phc", ownership: "public", state: "Chhattisgarh", district: "Bastar",
    lat: 19.1071, lng: 81.9535, beds_total: 4, beds_icu: 0, beds_emergency: 0,
    trust_score: 31, trust_breakdown: tb(35,28,30,28,36,30),
    verified_capabilities: ["OPD"],
    reported_capabilities: ["OPD","Emergency","Pharmacy"],
    contradiction_flags: [{severity:"high", claim:"Emergency", evidence:"No emergency staff, no transport", impact:-10}],
    raw_notes: "PHC in tribal block. OPD weekly. Emergency referrals to Jagdalpur 70km.",
    ai_summary: "Unreliable, desert zone.",
    last_updated: "2025-04-22",
    specialists: [], equipment: [], emergency_ready: false, desert_zone: true, verified: false,
  },
  {
    id: "fac_026", name: "Sir Ganga Ram Hospital", shortName: "Ganga Ram Delhi",
    type: "private", ownership: "trust", state: "Delhi", district: "New Delhi",
    lat: 28.6385, lng: 77.1899, beds_total: 675, beds_icu: 100, beds_emergency: 20,
    trust_score: 92, trust_breakdown: tb(94,92,90,92,92,91),
    verified_capabilities: ["ICU","MRI","CT","NICU","Cardiac","Neurology","Surgery","Emergency","Dialysis"],
    reported_capabilities: ["ICU","MRI","CT","NICU","Cardiac","Neurology","Surgery","Emergency","Dialysis"],
    contradiction_flags: [],
    raw_notes: "Sir Ganga Ram trust hospital. Multispecialty. 675 beds.",
    ai_summary: "High trust verified.",
    last_updated: "2026-04-09",
    specialists: ["Cardiology","Neurology","Nephrology"],
    equipment: ["3T MRI","CT","Cath Lab"], emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_027", name: "JIPMER Puducherry", shortName: "JIPMER",
    type: "tertiary", ownership: "public", state: "Puducherry", district: "Puducherry",
    lat: 11.9495, lng: 79.8083, beds_total: 2185, beds_icu: 130, beds_emergency: 50,
    trust_score: 92, trust_breakdown: tb(94,92,90,93,92,91),
    verified_capabilities: ["ICU","MRI","CT","PET-CT","NICU","Cardiac","Trauma","Surgery","Emergency"],
    reported_capabilities: ["ICU","MRI","CT","PET-CT","NICU","Cardiac","Trauma","Surgery","Emergency"],
    contradiction_flags: [],
    raw_notes: "JIPMER apex tertiary. 2185 beds.",
    ai_summary: "Apex tertiary verified.",
    last_updated: "2026-04-11",
    specialists: ["Cardiology","Neurology","Oncology"],
    equipment: ["MRI","PET-CT","Cath Lab"], emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_028", name: "District Hospital Surguja", shortName: "DH Surguja",
    type: "district", ownership: "public", state: "Chhattisgarh", district: "Surguja",
    lat: 23.0850, lng: 83.1955, beds_total: 220, beds_icu: 6, beds_emergency: 6,
    trust_score: 48, trust_breakdown: tb(52,44,46,48,52,46),
    verified_capabilities: ["OPD","Surgery","Emergency","Pharmacy"],
    reported_capabilities: ["OPD","Surgery","Emergency","Pharmacy","ICU","CT"],
    contradiction_flags: [
      {severity:"medium", claim:"ICU 6 beds", evidence:"Only 2 ventilators functional", impact:-8},
      {severity:"low", claim:"CT", evidence:"CT scanner intermittent power issues", impact:-4},
    ],
    raw_notes: "Small district hospital. ICU partially equipped. CT scanner intermittent.",
    ai_summary: "Low reliability with multiple flags.",
    last_updated: "2025-11-30",
    specialists: ["General Medicine"], equipment: ["CT","2 Ventilators"], emergency_ready: false, desert_zone: true, verified: false,
  },
  {
    id: "fac_029", name: "Hindu Mission Hospital Chennai", shortName: "Hindu Mission",
    type: "private", ownership: "trust", state: "Tamil Nadu", district: "Chennai",
    lat: 12.9528, lng: 80.1402, beds_total: 250, beds_icu: 30, beds_emergency: 10,
    trust_score: 80, trust_breakdown: tb(82,80,78,80,80,80),
    verified_capabilities: ["ICU","CT","NICU","Surgery","Emergency","Pharmacy"],
    reported_capabilities: ["ICU","CT","NICU","Surgery","Emergency","Pharmacy"],
    contradiction_flags: [],
    raw_notes: "Charitable trust hospital. 250 beds. NICU active.",
    ai_summary: "Reliable trust hospital.",
    last_updated: "2026-03-18",
    specialists: ["Pediatrics","Obstetrics"], equipment: ["CT"], emergency_ready: true, desert_zone: false, verified: true,
  },
  {
    id: "fac_030", name: "PHC Narayanpur Tribal", shortName: "PHC Narayanpur",
    type: "phc", ownership: "public", state: "Chhattisgarh", district: "Narayanpur",
    lat: 19.7115, lng: 81.2480, beds_total: 6, beds_icu: 0, beds_emergency: 0,
    trust_score: 33, trust_breakdown: tb(38,30,32,30,38,30),
    verified_capabilities: ["OPD","Pharmacy"],
    reported_capabilities: ["OPD","Pharmacy","Emergency"],
    contradiction_flags: [{severity:"medium", claim:"Emergency available", evidence:"Daytime OPD only, no night staff", impact:-8}],
    raw_notes: "Remote tribal PHC. OPD on weekdays. No emergency capacity.",
    ai_summary: "Unreliable; tribal desert zone.",
    last_updated: "2025-07-09",
    specialists: [], equipment: ["Basic kit"], emergency_ready: false, desert_zone: true, verified: false,
  },
];

// Generate additional spread of facilities so the map and lists feel full
const states = ["Uttar Pradesh","Madhya Pradesh","West Bengal","Odisha","Assam","Bihar","Jharkhand","Punjab","Haryana","Karnataka","Tamil Nadu","Andhra Pradesh","Telangana","Gujarat","Maharashtra","Kerala","Rajasthan"];
const stateCoords: Record<string,[number,number]> = {
  "Uttar Pradesh":[27.0,80.9],"Madhya Pradesh":[23.5,77.5],"West Bengal":[22.6,88.4],"Odisha":[20.3,85.8],
  "Assam":[26.2,92.9],"Bihar":[25.6,85.1],"Jharkhand":[23.4,85.3],"Punjab":[31.1,75.3],
  "Haryana":[29.0,76.0],"Karnataka":[15.3,75.7],"Tamil Nadu":[11.1,78.7],"Andhra Pradesh":[15.9,79.7],
  "Telangana":[17.4,78.5],"Gujarat":[22.7,71.6],"Maharashtra":[19.6,75.6],"Kerala":[10.5,76.3],"Rajasthan":[27.0,74.2],
};

for (let i = 31; i <= 60; i++) {
  const st = states[i % states.length];
  const [baseLat, baseLng] = stateCoords[st];
  const trust = 30 + Math.floor(Math.random() * 65);
  const t: Facility["type"] = trust > 80 ? "tertiary" : trust > 65 ? "district" : trust > 45 ? "chc" : "phc";
  const beds = t === "tertiary" ? 800 + Math.floor(Math.random()*1200) : t === "district" ? 200 + Math.floor(Math.random()*400) : t === "chc" ? 30 + Math.floor(Math.random()*40) : 4 + Math.floor(Math.random()*8);
  const icu = t === "tertiary" ? 40 + Math.floor(Math.random()*80) : t === "district" ? 6 + Math.floor(Math.random()*20) : t === "chc" ? Math.floor(Math.random()*4) : 0;
  const caps = trust > 80 ? ["ICU","CT","MRI","Surgery","Emergency","Blood Bank"] : trust > 60 ? ["ICU","CT","Surgery","Emergency"] : trust > 45 ? ["Surgery","OPD","Emergency"] : ["OPD"];
  mockFacilities.push({
    id: `fac_${String(i).padStart(3,"0")}`,
    name: `${t === "tertiary" ? "Govt Medical College" : t === "district" ? "District Hospital" : t === "chc" ? "Community Health Centre" : "Primary Health Centre"} ${st} ${i}`,
    shortName: `${t.toUpperCase()} ${st.split(" ")[0]} ${i}`,
    type: t, ownership: "public",
    state: st, district: `${st} District ${i}`,
    lat: baseLat + (Math.random() - 0.5) * 3, lng: baseLng + (Math.random() - 0.5) * 3,
    beds_total: beds, beds_icu: icu, beds_emergency: Math.max(2, Math.floor(beds * 0.05)),
    trust_score: trust,
    trust_breakdown: tb(trust+2, trust-2, trust-4, trust, trust+1, trust-1),
    verified_capabilities: caps,
    reported_capabilities: [...caps, ...(trust < 60 ? ["ICU"] : [])],
    contradiction_flags: trust < 60 ? [{severity:"medium", claim:"ICU listed", evidence:"No ventilators verified", impact:-6}] : [],
    raw_notes: `${t} facility in ${st}. ${beds} beds total.`,
    ai_summary: trust > 80 ? "Reliable facility." : trust > 60 ? "Moderately reliable, verify before referral." : "Low reliability — independent verification needed.",
    last_updated: trust > 70 ? "2026-03-15" : "2025-09-10",
    specialists: trust > 80 ? ["General Medicine","Surgery"] : ["General Medicine"],
    equipment: trust > 80 ? ["CT","MRI"] : trust > 60 ? ["CT"] : [],
    emergency_ready: trust > 60,
    desert_zone: trust < 50,
    verified: trust > 60,
  });
}

export const totalIndexed = 10847;
export const avgTrust = Math.round(mockFacilities.reduce((s,f)=>s+f.trust_score,0)/mockFacilities.length * 10)/10;
export const totalContradictions = 847;
export const desertZones = 2341;
export const highCapHubs = 1203;
export const parseAccuracy = 94.3;

export const ALL_CAPABILITIES = ALL_CAPS;

export const ALL_STATES = Array.from(new Set(mockFacilities.map(f => f.state))).sort();

export const interventionDistricts = [
  { rank:1, district:"Barmer", state:"Rajasthan", population:"2.4M", nearest:"127km", trust:31, priority:"CRITICAL" },
  { rank:2, district:"Jaisalmer", state:"Rajasthan", population:"0.7M", nearest:"89km", trust:28, priority:"CRITICAL" },
  { rank:3, district:"Surguja", state:"Chhattisgarh", population:"2.1M", nearest:"103km", trust:34, priority:"CRITICAL" },
  { rank:4, district:"Narayanpur", state:"Chhattisgarh", population:"0.1M", nearest:"67km", trust:41, priority:"HIGH" },
  { rank:5, district:"Dibang Valley", state:"Arunachal Pradesh", population:"0.008M", nearest:"201km", trust:22, priority:"CRITICAL" },
  { rank:6, district:"Bastar", state:"Chhattisgarh", population:"1.4M", nearest:"70km", trust:35, priority:"HIGH" },
  { rank:7, district:"Kalahandi", state:"Odisha", population:"1.6M", nearest:"95km", trust:38, priority:"HIGH" },
  { rank:8, district:"Malkangiri", state:"Odisha", population:"0.6M", nearest:"118km", trust:32, priority:"CRITICAL" },
  { rank:9, district:"Kishanganj", state:"Bihar", population:"1.7M", nearest:"82km", trust:40, priority:"HIGH" },
  { rank:10, district:"Sheopur", state:"Madhya Pradesh", population:"0.7M", nearest:"104km", trust:36, priority:"HIGH" },
];

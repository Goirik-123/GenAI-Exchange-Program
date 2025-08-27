import type { DocumentType } from './types';

export const mockDocuments: DocumentType[] = [
  {
    id: '1',
    title: 'Commercial Lease Agreement',
    createdAt: '2023-10-26',
    riskLevel: 'Medium',
    summary: {
      facts: 'This agreement is between "Landlord Inc." and "Tenant Corp." for the property at 123 Business Rd, commencing Nov 1, 2023 for 5 years.',
      obligations: 'Tenant Corp. must pay $5000/month rent, maintain the property, and hold liability insurance. Landlord Inc. must maintain structural integrity and provide essential services.',
      rights: 'Tenant Corp. has the right to quiet enjoyment and a first right of refusal on adjacent space. Landlord Inc. has the right to inspect the property with 24-hour notice.',
      deadlines: 'Rent is due on the 1st of each month. A 90-day notice is required for lease renewal.',
    },
    risks: {
      whatIfScenarios: [
        'What if the tenant defaults on rent? Landlord can initiate eviction after a 10-day cure period.',
        'What if the property is damaged by a natural disaster? Lease may be terminated if repairs exceed 60 days.',
      ],
    },
    relatedLaws: ['State Commercial Tenancy Act', 'Zoning Ordinance B-2', 'Fire Safety Code 101'],
    negotiationPoints: {
      points: ['Annual rent increase cap', 'Subletting rights', 'Termination clause penalties'],
      improvements: [
        'Suggest adding a force majeure clause to cover unforeseen events.',
        'Clarify the terms for "reasonable wear and tear".',
      ],
    },
    fullText: 'This Commercial Lease Agreement ("Lease") is made and effective October 26, 2023, by and between Landlord Inc. ("Landlord") and Tenant Corp. ("Tenant"). Landlord is the owner of land and improvements commonly known and numbered as 123 Business Rd, Commerce City. Landlord makes available for lease a portion of the Building designated as Suite 100 ("Leased Premises")...'
  },
  {
    id: '2',
    title: 'Software Development Contract',
    createdAt: '2023-11-15',
    riskLevel: 'High',
    summary: {
      facts: 'Agreement between "ClientCo" and "DevsRUs" for the creation of a mobile application.',
      obligations: 'DevsRUs must deliver the app by March 1, 2024. ClientCo must provide all necessary assets and pay in milestones.',
      rights: 'ClientCo owns the final source code upon full payment. DevsRUs can showcase the project in their portfolio.',
      deadlines: 'Alpha version due Jan 15, 2024. Final payment due March 15, 2024.',
    },
    risks: {
      whatIfScenarios: [
        'What if the project scope changes? A formal change order process must be initiated, potentially affecting cost and timeline.',
        'What if a critical bug is found after launch? DevsRUs is obligated to provide support for 60 days post-launch.',
      ],
    },
    relatedLaws: ['Intellectual Property Act', 'Digital Millennium Copyright Act (DMCA)'],
    negotiationPoints: {
      points: ['Liability cap for damages', 'Intellectual property ownership of pre-existing code', 'Post-launch support period'],
      improvements: [
        'Define "project completion" with specific, measurable acceptance criteria.',
        'Include a clear dispute resolution clause (e.g., mediation).',
      ],
    },
    fullText: 'This Software Development Agreement (the "Agreement") is entered into as of November 15, 2023, by and between ClientCo, with offices at 456 Innovation Ave, and DevsRUs, a company based at 789 Code Lane. ClientCo engages DevsRUs to design, develop, and test a mobile application as specified in Exhibit A...'
  },
  {
    id: '3',
    title: 'Non-Disclosure Agreement (NDA)',
    createdAt: '2023-12-01',
    riskLevel: 'Low',
    summary: {
      facts: 'A unilateral NDA where "Disclosing Party" shares confidential information with "Receiving Party".',
      obligations: 'Receiving Party must protect the information and not disclose it to third parties for a period of 3 years.',
      rights: 'Disclosing Party retains all rights to its confidential information.',
      deadlines: 'The agreement is effective immediately and obligations survive for 3 years post-termination.',
    },
    risks: {
      whatIfScenarios: [
        'What if the Receiving Party accidentally discloses information? They must notify the Disclosing Party immediately and take steps to mitigate damage.',
      ],
    },
    relatedLaws: ['Uniform Trade Secrets Act'],
    negotiationPoints: {
      points: ['Definition of "Confidential Information"', 'Duration of the confidentiality obligation', 'Jurisdiction for legal disputes'],
      improvements: [
        'Specifically list any exceptions to confidential information (e.g., publicly known information).',
        'Specify return or destruction of materials upon termination.',
      ],
    },
    fullText: 'This Non-Disclosure Agreement (the "Agreement") is made on December 1, 2023, between Disclosing Party and Receiving Party. For the purpose of evaluating a potential business relationship, Disclosing Party may disclose certain confidential information to Receiving Party. Receiving Party agrees to hold such information in strict confidence...'
  },
];

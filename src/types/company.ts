export interface CompanyBreakdownItem {
    questionId: string;
    question: string;
    breakdownScore: number;
}

export interface CompanyRemark {
    remark: string;
    uniqueId: string;
    date: string;
    contact: {
        title: string;
        firstName: string;
        lastName: string;
        contactRole: string;
        companyId: string;
        email: string;
        number: string;
        id: string;
        dateCreated: string;
        lastUpdated: string;
        tenantUID: string;
        status: string;
        uniqueId: string;
        createdBy: string;
    } | null;
    remarkPublic: boolean;
    showAsTestimonial: boolean;
}

export interface CompanyScoreBreakdown {
    score: number;
    totalReviews: number;
    breakdown: CompanyBreakdownItem[];
    remarks: CompanyRemark[];
}

export interface Company {
    companyName: string;
    companyCategory: string | null;
    companyId: string;
    emailAddress: string;
    brandLogoUID: string | null;
    brandWebsite: string | null;
    brandContactNumber: string | null;
    brandCountry: string | null;
    score: number;
    scoreBreakdown: CompanyScoreBreakdown;
}

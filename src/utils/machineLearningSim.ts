
// Lawyer data interface
export interface LawyerData {
  id: string;
  first_name: string;
  last_name: string;
  age?: number;
  gender: string;
  experience: number;
  total_cases?: number;
  cases_won?: number;
  domain: string;
  fees_per_hearing: number;
  rating: number;
  city: string;
  law_school?: string;
  bar_association?: string;
  profileImage?: string;
  address?: string;
  contact_number?: string;
}

// Constants for dropdowns
export const DOMAINS = [
  "Corporate Law",
  "Criminal Law",
  "Family Law",
  "Civil Law",
  "Intellectual Property",
  "Real Estate Law",
  "Tax Law",
  "Constitutional Law",
  "Environmental Law",
  "Immigration Law",
];

export const CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Pune",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Kochi",
];

export const LAW_SCHOOLS = [
  "National Law School of India University, Bangalore",
  "NALSAR University of Law, Hyderabad",
  "The West Bengal National University of Juridical Sciences, Kolkata",
  "National Law University, Delhi",
  "ILS Law College, Pune",
  "Faculty of Law, Delhi University",
  "Government Law College, Mumbai",
  "Symbiosis Law School, Pune",
  "Jindal Global Law School, Sonipat",
  "Faculty of Law, Banaras Hindu University"
];

export const BAR_ASSOCIATIONS = [
  "Bar Council of India",
  "Supreme Court Bar Association",
  "Delhi Bar Association",
  "Mumbai Bar Association",
  "Calcutta Bar Association",
  "Chennai Bar Association",
  "Bangalore Bar Association",
  "Hyderabad Bar Association",
  "Punjab Bar Council",
  "Gujarat Bar Council"
];

// Generate random lawyer data
const generateLawyerData = (count = 5000): LawyerData[] => {
  const firstNames = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Reyansh", "Ayaan", "Atharva", "Krishna", "Ishaan", "Shaurya", "Advait", "Dhruv", "Kabir", "Ritvik", "Aarush", "Kayaan", "Darsh", "Veer", "Samar", "Siddharth", "Arnav", "Divit", "Pranav", "Pranay", "Anirudh", "Aahil", "Aaryan", "Zayan", "Pranit", "Neel", "Samarth", "Aayan", "Dhruvin", "Rudra", "Shreyas", "Aryan", "Reyansh", "Yuvraj", "Yash", "Advik"];
  const femaleNames = ["Aanya", "Aadhya", "Aaradhya", "Ananya", "Pari", "Anika", "Navya", "Diya", "Saanvi", "Myra", "Sara", "Iraa", "Ahana", "Anvi", "Prisha", "Riya", "Aarohi", "Anjali", "Anaya", "Siya", "Divya", "Avni", "Krisha", "Neha", "Shreya", "Tanvi", "Trisha", "Ishita", "Kiara", "Sanjana", "Shravya", "Vanya", "Rhea", "Shanaya", "Tanisha", "Meera", "Ritika", "Snigdha", "Kyra", "Kavya", "Shivani"];
  const lastNames = ["Sharma", "Verma", "Patel", "Gupta", "Singh", "Kaur", "Shah", "Kumar", "Joshi", "Pandey", "Reddy", "Rao", "Chatterjee", "Banerjee", "Mukherjee", "Kapoor", "Das", "Saxena", "Srivastava", "Malhotra", "Bose", "Sen", "Khanna", "Mehta", "Jain", "Chopra", "Bhat", "Chauhan", "Bhatia", "Agarwal", "Trivedi", "Maheshwari", "Patil", "Mangal", "Arora", "Garg", "Menon", "Talwar", "Nair", "Iyer"];

  const lawyers: LawyerData[] = [];
  
  for (let i = 0; i < count; i++) {
    const gender = Math.random() > 0.5 ? "Male" : "Female";
    const firstName = gender === "Male" 
      ? firstNames[Math.floor(Math.random() * firstNames.length)]
      : femaleNames[Math.floor(Math.random() * femaleNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    const experience = Math.floor(Math.random() * 30) + 1;
    const age = Math.floor(Math.random() * 30) + 30; // Age between 30 and 59
    const totalCases = Math.floor(Math.random() * 500) + 50; // Between 50 and 549 cases
    const casesWon = Math.floor(Math.random() * totalCases);
    const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)];
    const fees = Math.floor(Math.random() * 40000) + 5000; // Between 5000 and 45000
    const rating = parseFloat((Math.random() * 2 + 3).toFixed(1)); // Rating between 3.0 and 5.0
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    const lawSchool = LAW_SCHOOLS[Math.floor(Math.random() * LAW_SCHOOLS.length)];
    const barAssociation = BAR_ASSOCIATIONS[Math.floor(Math.random() * BAR_ASSOCIATIONS.length)];
    
    lawyers.push({
      id: `lawyer-${i + 1}`,
      first_name: firstName,
      last_name: lastName,
      age,
      gender,
      experience,
      total_cases: totalCases,
      cases_won: casesWon,
      domain,
      fees_per_hearing: fees,
      rating,
      city,
      law_school: lawSchool,
      bar_association: barAssociation,
      // Use a placeholder image service - in a real app you would use avatars from a proper API
      profileImage: `https://api.dicebear.com/7.x/personas/svg?seed=${firstName}${lastName}${gender}`,
    });
  }
  
  return lawyers;
};

// In-memory storage for lawyer data
let lawyerDatabase: LawyerData[] = [];

// Get lawyer data - initialize if not already done
export const getLawyerData = (): LawyerData[] => {
  if (lawyerDatabase.length === 0) {
    lawyerDatabase = generateLawyerData();
  }
  return lawyerDatabase;
};

// Filter lawyers based on criteria
export const filterLawyers = (
  lawyers: LawyerData[],
  filters: {
    domain?: string;
    city?: string;
    gender?: string;
    minExperience?: number;
    minRating?: number;
    maxFees?: number;
  }
): LawyerData[] => {
  return lawyers.filter((lawyer) => {
    if (filters.domain && filters.domain !== "all" && lawyer.domain !== filters.domain) {
      return false;
    }
    
    if (filters.city && filters.city !== "all" && lawyer.city !== filters.city) {
      return false;
    }
    
    if (filters.gender && filters.gender !== "any" && lawyer.gender !== filters.gender) {
      return false;
    }
    
    if (filters.minExperience && lawyer.experience < filters.minExperience) {
      return false;
    }
    
    if (filters.minRating && lawyer.rating < filters.minRating) {
      return false;
    }
    
    if (filters.maxFees && lawyer.fees_per_hearing > filters.maxFees) {
      return false;
    }
    
    return true;
  });
};

// Simple TF-IDF-inspired algorithm to match legal issues with lawyers
export const recommendLawyers = (
  query: string,
  lawyers: LawyerData[],
  limit: number = 20
): LawyerData[] => {
  // If no query, return the original list
  if (!query.trim()) {
    return lawyers;
  }
  
  const queryLower = query.toLowerCase();
  
  // Keywords related to different legal domains
  const domainKeywords: Record<string, string[]> = {
    "Corporate Law": ["corporate", "business", "company", "merger", "acquisition", "contract", "shareholder", "board", "director", "investor", "startup", "llc", "incorporation", "trademark", "copyright", "patent"],
    "Criminal Law": ["criminal", "crime", "theft", "murder", "assault", "battery", "prosecution", "defendant", "victim", "arrest", "jail", "prison", "bail", "felony", "misdemeanor"],
    "Family Law": ["divorce", "custody", "alimony", "child support", "marriage", "separation", "adoption", "spouse", "domestic", "prenuptial", "guardianship", "paternity"],
    "Civil Law": ["civil", "lawsuit", "damages", "injury", "compensation", "negligence", "liability", "plaintiff", "defendant", "settlement", "dispute", "mediation", "claim"],
    "Intellectual Property": ["intellectual", "patent", "copyright", "trademark", "infringement", "invention", "creator", "author", "innovation", "design", "trade secret"],
    "Real Estate Law": ["property", "real estate", "land", "tenant", "landlord", "lease", "rent", "eviction", "mortgage", "title", "deed", "zoning", "foreclosure"],
    "Tax Law": ["tax", "irs", "audit", "deduction", "income", "taxation", "evasion", "compliance", "filing", "return", "property tax"],
    "Constitutional Law": ["constitution", "rights", "amendment", "freedom", "speech", "religion", "due process", "equal protection", "civil rights", "liberty", "fundamental"],
    "Environmental Law": ["environment", "pollution", "climate", "epa", "conservation", "waste", "energy", "sustainability", "compliance", "contamination", "natural resources"],
    "Immigration Law": ["immigration", "visa", "citizenship", "naturalization", "green card", "deportation", "asylum", "refugee", "alien", "foreign", "passport", "border"]
  };
  
  // Score each lawyer based on domain relevance to the query
  const scoredLawyers = lawyers.map(lawyer => {
    let score = 0;
    
    // Check domain relevance
    const domainTerms = domainKeywords[lawyer.domain] || [];
    for (const term of domainTerms) {
      if (queryLower.includes(term.toLowerCase())) {
        score += 5;  // Higher weight for exact domain match
      }
    }
    
    // Add points for experience
    score += lawyer.experience / 5;
    
    // Add points for success rate
    if (lawyer.cases_won && lawyer.total_cases) {
      const successRate = lawyer.cases_won / lawyer.total_cases;
      score += successRate * 10;
    }
    
    // Add points for rating
    score += lawyer.rating;
    
    return { lawyer, score };
  });
  
  // Sort by score (descending) and return the top N lawyers
  return scoredLawyers
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.lawyer);
};

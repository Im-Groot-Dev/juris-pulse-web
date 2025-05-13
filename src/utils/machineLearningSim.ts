// This file simulates machine learning functionalities for lawyer segmentation
// Constants shared by components

// Export constants that were previously only defined locally
export const DOMAINS = [
  "Criminal Law",
  "Family Law",
  "Corporate Law",
  "Intellectual Property",
  "Real Estate",
  "Tax Law",
  "Immigration Law",
  "Employment Law",
  "Environmental Law",
  "Constitutional Law",
  "Consumer Protection",
  "Bankruptcy Law",
];

export const LAW_SCHOOLS = [
  "National Law School of India University, Bangalore",
  "NALSAR University of Law, Hyderabad",
  "The West Bengal National University of Juridical Sciences, Kolkata",
  "National Law University, Delhi",
  "ILS Law College, Pune",
  "Faculty of Law, Delhi University, Delhi",
  "Symbiosis Law School, Pune",
  "Government Law College, Mumbai",
  "Jindal Global Law School, Sonipat",
  "Faculty of Law, Aligarh Muslim University",
];

export const BAR_ASSOCIATIONS = [
  "Supreme Court Bar Association",
  "Bar Council of India",
  "Delhi Bar Association",
  "Bombay Bar Association",
  "Madras Bar Association",
  "Calcutta Bar Association",
  "Karnataka State Bar Council",
  "Punjab Bar Council",
  "Gujarat Bar Council",
  "Rajasthan Bar Council",
];

export const CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Chandigarh",
  "Lucknow",
  "Guwahati",
  "Kochi",
  "Bhopal",
  "Nagpur",
];

// Generate random data for demonstration purposes
export const generateLawyerData = (count: number = 5000): LawyerData[] => {
  const lawyers: LawyerData[] = [];
  
  for (let i = 0; i < count; i++) {
    const gender = Math.random() > 0.65 ? "Male" : "Female";
    const firstName = gender === "Male"
      ? ["Raj", "Vikram", "Arjun", "Amit", "Rahul", "Deepak", "Sanjay", "Ravi", "Aditya", "Karan"][Math.floor(Math.random() * 10)]
      : ["Priya", "Anjali", "Neha", "Pooja", "Meera", "Sonia", "Ritu", "Divya", "Aisha", "Kavita"][Math.floor(Math.random() * 10)];
    
    const lastName = ["Sharma", "Patel", "Singh", "Kumar", "Joshi", "Verma", "Gupta", "Mehta", "Reddy", "Nair"][Math.floor(Math.random() * 10)];
    const experience = Math.floor(Math.random() * 30) + 1; // 1 to 30 years
    const totalCases = Math.floor(Math.random() * 500) + 10; // 10 to 510 cases
    const casesWon = Math.floor(Math.random() * totalCases); // Won cases cannot exceed total cases
    const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)];
    const feesPerHearing = Math.floor(Math.random() * 50000) + 5000; // 5k to 55k
    const rating = (Math.random() * 3 + 2).toFixed(1); // 2.0 to 5.0
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    const lawSchool = LAW_SCHOOLS[Math.floor(Math.random() * LAW_SCHOOLS.length)];
    const barAssociation = BAR_ASSOCIATIONS[Math.floor(Math.random() * BAR_ASSOCIATIONS.length)];
    
    lawyers.push({
      id: `law-${i + 1}`,
      first_name: firstName,
      last_name: lastName,
      age: Math.floor(Math.random() * 45) + 25, // 25 to 70 years old
      gender,
      experience,
      total_cases: totalCases,
      cases_won: casesWon,
      domain,
      fees_per_hearing: feesPerHearing,
      rating: parseFloat(rating),
      city,
      bar_association: barAssociation,
      law_school: lawSchool,
      profileImage: `https://api.dicebear.com/7.x/personas/svg?seed=${firstName}${lastName}${i}&background=%230a0e17`,
    });
  }
  
  return lawyers;
};

// Simulate ML-based lawyer segmentation
export const segmentLawyers = (lawyers: LawyerData[], segments: number = 4) => {
  // This is a simplified k-means clustering simulation
  // In reality, you would use actual ML libraries for this
  
  // Create segments based on experience and rating
  const segments_result = [];
  
  for (let i = 0; i < segments; i++) {
    segments_result.push({
      id: `segment-${i + 1}`,
      name: i === 0 ? "Elite Attorneys" 
        : i === 1 ? "Experienced Professionals" 
        : i === 2 ? "Rising Stars" 
        : "Growing Practitioners",
      lawyers: []
    });
  }
  
  // Simple segmentation based on experience and rating
  lawyers.forEach(lawyer => {
    // Calculate a score based on experience, rating, and success rate
    const successRate = lawyer.cases_won / lawyer.total_cases;
    const score = (lawyer.experience * 0.5) + (lawyer.rating * 2) + (successRate * 10);
    
    // Assign to segment based on score
    if (score > 25) {
      segments_result[0].lawyers.push(lawyer);
    } else if (score > 15) {
      segments_result[1].lawyers.push(lawyer);
    } else if (score > 10) {
      segments_result[2].lawyers.push(lawyer);
    } else {
      segments_result[3].lawyers.push(lawyer);
    }
  });
  
  return segments_result;
};

// Simulate AI recommendation based on legal query
export const recommendLawyers = (query: string, lawyers: LawyerData[], count: number = 5) => {
  // In a real app, this would use NLP and ML to understand the query and match with lawyers
  
  // For demonstration, do simple keyword matching
  const queryLower = query.toLowerCase();
  
  const keywordMap: Record<string, string[]> = {
    "corporate": ["Corporate Law", "Intellectual Property"],
    "company": ["Corporate Law", "Tax Law"],
    "business": ["Corporate Law", "Tax Law"],
    "startup": ["Corporate Law", "Intellectual Property"],
    "crime": ["Criminal Law"],
    "criminal": ["Criminal Law"],
    "murder": ["Criminal Law"],
    "theft": ["Criminal Law"],
    "family": ["Family Law"],
    "divorce": ["Family Law"],
    "custody": ["Family Law"],
    "child": ["Family Law"],
    "property": ["Real Estate Law", "Civil Law"],
    "land": ["Real Estate Law", "Civil Law"],
    "house": ["Real Estate Law"],
    "apartment": ["Real Estate Law"],
    "patent": ["Intellectual Property"],
    "copyright": ["Intellectual Property"],
    "trademark": ["Intellectual Property"],
    "tax": ["Tax Law"],
    "income": ["Tax Law"],
    "gst": ["Tax Law"],
    "constitution": ["Constitutional Law"],
    "rights": ["Constitutional Law", "Civil Law"],
    "environment": ["Environmental Law"],
    "pollution": ["Environmental Law"],
    "immigration": ["Immigration Law"],
    "visa": ["Immigration Law"],
    "civil": ["Civil Law"],
    "dispute": ["Civil Law"],
  };
  
  // Find matching domains
  let matchingDomains: string[] = [];
  
  // Check for keyword matches
  Object.entries(keywordMap).forEach(([keyword, domains]) => {
    if (queryLower.includes(keyword)) {
      matchingDomains.push(...domains);
    }
  });
  
  // Deduplicate domains
  matchingDomains = [...new Set(matchingDomains)];
  
  // If no matching domains found, return random top-rated lawyers
  if (matchingDomains.length === 0) {
    return lawyers
      .sort((a, b) => b.rating - a.rating)
      .slice(0, count);
  }
  
  // Filter lawyers by matching domains and sort by rating and experience
  const matchingLawyers = lawyers
    .filter(lawyer => matchingDomains.includes(lawyer.domain))
    .sort((a, b) => {
      // Sort by rating first, then by experience
      if (b.rating !== a.rating) {
        return b.rating - a.rating;
      }
      return b.experience - a.experience;
    })
    .slice(0, count);
  
  return matchingLawyers;
};

// Create and store sample data in localStorage
export const initializeSampleData = () => {
  const existingLawyers = localStorage.getItem("lawyersData");
  if (!existingLawyers) {
    const lawyers = generateLawyerData(5000);
    localStorage.setItem("lawyersData", JSON.stringify(lawyers));
    return lawyers;
  }
  return JSON.parse(existingLawyers);
};

// Get sample data from localStorage or generate if not exists
export const getLawyerData = (): LawyerData[] => {
  return initializeSampleData();
};

// Filter lawyers by criteria
export const filterLawyers = (
  lawyers: LawyerData[],
  filters: {
    domain?: string;
    city?: string;
    minExperience?: number;
    maxFees?: number;
    minRating?: number;
    gender?: string;
  }
) => {
  return lawyers.filter(lawyer => {
    const domainMatch = !filters.domain || lawyer.domain === filters.domain;
    const cityMatch = !filters.city || lawyer.city === filters.city;
    const experienceMatch = !filters.minExperience || lawyer.experience >= filters.minExperience;
    const feesMatch = !filters.maxFees || lawyer.fees_per_hearing <= filters.maxFees;
    const ratingMatch = !filters.minRating || lawyer.rating >= filters.minRating;
    const genderMatch = !filters.gender || lawyer.gender === filters.gender;
    
    return domainMatch && cityMatch && experienceMatch && feesMatch && ratingMatch && genderMatch;
  });
};

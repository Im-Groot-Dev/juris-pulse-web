
// This file simulates machine learning data for matching lawyers with clients

// Define legal domains
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

// Define law schools
export const LAW_SCHOOLS = [
  "National Law School of India University, Bangalore",
  "Faculty of Law, Delhi University",
  "ILS Law College, Pune",
  "Jindal Global Law School, Sonipat",
  "Symbiosis Law School, Pune",
  "Government Law College, Mumbai",
  "Campus Law Centre, Delhi",
  "NALSAR University of Law, Hyderabad",
  "West Bengal National University of Juridical Sciences, Kolkata",
  "Gujarat National Law University, Gandhinagar",
  "The WB National University of Juridical Sciences, Kolkata",
  "National Law University, Delhi",
  "Rajiv Gandhi National University of Law, Patiala",
  "Chanakya National Law University, Patna",
  "National Law University Odisha, Cuttack",
];

// Define bar associations
export const BAR_ASSOCIATIONS = [
  "Bar Council of India",
  "Supreme Court Bar Association",
  "Bar Council of Delhi",
  "Bar Council of Maharashtra and Goa",
  "Bombay Bar Association",
  "Delhi Bar Association",
  "Karnataka State Bar Council",
  "Tamil Nadu Bar Council",
  "Madras Bar Association",
  "Kerala Bar Council",
  "Punjab Bar Council",
  "Bar Council of Uttar Pradesh",
  "Calcutta High Court Bar Association",
  "Gujarat Bar Council",
];

// Define cities
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

// Sample lawyer data for demonstration
export const SAMPLE_LAWYERS = [
  {
    id: "lawyer1",
    first_name: "Rajesh",
    last_name: "Kumar",
    email: "rajesh.kumar@example.com",
    gender: "male",
    experience: 12,
    domain: "Corporate Law",
    fees_per_hearing: 5000,
    rating: 4.8,
    cases_won: 87,
    total_cases: 95,
    city: "Mumbai",
    law_school: "National Law School of India University, Bangalore",
    bar_association: "Bar Council of Maharashtra and Goa",
  },
  {
    id: "lawyer2",
    first_name: "Priya",
    last_name: "Sharma",
    email: "priya.sharma@example.com",
    gender: "female",
    experience: 8,
    domain: "Family Law",
    fees_per_hearing: 3500,
    rating: 4.7,
    cases_won: 145,
    total_cases: 160,
    city: "Delhi",
    law_school: "Faculty of Law, Delhi University",
    bar_association: "Delhi Bar Association",
  },
  {
    id: "lawyer3",
    first_name: "Avinash",
    last_name: "Mehta",
    email: "avinash.mehta@example.com",
    gender: "male",
    experience: 15,
    domain: "Criminal Law",
    fees_per_hearing: 7000,
    rating: 4.9,
    cases_won: 210,
    total_cases: 230,
    city: "Bangalore",
    law_school: "ILS Law College, Pune",
    bar_association: "Karnataka State Bar Council",
  },
];

// Define LawyerData type for use throughout the app
export interface LawyerData {
  id: string;
  name: string;
  first_name: string;  // Changed from optional to required
  last_name: string;   // Changed from optional to required
  profileImage?: string;
  email: string;
  domain: string;
  experience: number;
  fees_per_hearing: number;
  rating: number;
  cases_won: number;
  total_cases: number;
  city: string;
  bio?: string;
  contact_number?: string;
  law_school?: string;
  bar_association?: string;
  gender: string;      // Changed from optional to required
  age?: number;
}

// Function to initialize sample data in localStorage
export const initializeSampleData = () => {
  // Check if sample data already exists
  const sampleDataExists = localStorage.getItem('sampleDataInitialized');
  if (sampleDataExists) return;
  
  // Initialize sample lawyers
  SAMPLE_LAWYERS.forEach((lawyer) => {
    const lawyerId = lawyer.id;
    const profile = {
      ...lawyer,
      appointments: [],
      clients: [],
      reviews: [],
      profileImage: `https://api.dicebear.com/7.x/personas/svg?seed=${lawyer.first_name}${lawyer.email}`,
    };
    
    localStorage.setItem(`lawyer_${lawyerId}`, JSON.stringify(profile));
  });
  
  // Mark as initialized
  localStorage.setItem('sampleDataInitialized', 'true');
};

// Function to match lawyers based on user query
export const findMatchingLawyers = (query: string) => {
  // In a real app, this would use ML algorithms
  // For demo, we'll do simple keyword matching
  query = query.toLowerCase();
  
  return SAMPLE_LAWYERS.filter(lawyer => 
    lawyer.domain.toLowerCase().includes(query) ||
    lawyer.city.toLowerCase().includes(query) ||
    `${lawyer.first_name} ${lawyer.last_name}`.toLowerCase().includes(query)
  );
};

// Function to get all lawyer data (from both sample data and localStorage)
export const getLawyerData = (): LawyerData[] => {
  // First, ensure sample data is initialized
  initializeSampleData();
  
  // Get all lawyers from localStorage
  const allLawyers: LawyerData[] = [];
  
  // First collect sample lawyers
  SAMPLE_LAWYERS.forEach(lawyer => {
    const storedData = localStorage.getItem(`lawyer_${lawyer.id}`);
    if (storedData) {
      try {
        const parsedLawyer = JSON.parse(storedData);
        allLawyers.push({
          id: parsedLawyer.id,
          name: `${parsedLawyer.first_name} ${parsedLawyer.last_name}`,
          profileImage: parsedLawyer.profileImage || `https://api.dicebear.com/7.x/personas/svg?seed=${parsedLawyer.first_name}${parsedLawyer.email}`,
          email: parsedLawyer.email,
          domain: parsedLawyer.domain,
          experience: parsedLawyer.experience,
          fees_per_hearing: parsedLawyer.fees_per_hearing,
          rating: parsedLawyer.rating || 4.5,
          cases_won: parsedLawyer.cases_won,
          total_cases: parsedLawyer.total_cases,
          city: parsedLawyer.city,
          bio: parsedLawyer.bio || `${parsedLawyer.first_name} is a specialized ${parsedLawyer.domain} lawyer with ${parsedLawyer.experience} years of experience.`,
          contact_number: parsedLawyer.contact_number,
          law_school: parsedLawyer.law_school,
          bar_association: parsedLawyer.bar_association,
          gender: parsedLawyer.gender || 'Not specified', // Ensure gender is always defined
          first_name: parsedLawyer.first_name,
          last_name: parsedLawyer.last_name
        });
      } catch (error) {
        console.error("Failed to parse lawyer data:", error);
      }
    }
  });
  
  // Then find any additional lawyers in localStorage (newly registered)
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("lawyer_") && !key.endsWith("_appointments")) {
      const id = key.replace("lawyer_", "");
      // Skip if we already have this lawyer from the sample data
      if (allLawyers.some(lawyer => lawyer.id === id)) {
        continue;
      }
      
      try {
        const storedData = localStorage.getItem(key);
        if (storedData) {
          const parsedLawyer = JSON.parse(storedData);
          allLawyers.push({
            id: parsedLawyer.id,
            name: `${parsedLawyer.first_name} ${parsedLawyer.last_name}`,
            profileImage: parsedLawyer.profileImage || `https://api.dicebear.com/7.x/personas/svg?seed=${parsedLawyer.first_name}${parsedLawyer.email}`,
            email: parsedLawyer.email,
            domain: parsedLawyer.domain,
            experience: parsedLawyer.experience,
            fees_per_hearing: parsedLawyer.fees_per_hearing,
            rating: parsedLawyer.rating || 4.5,
            cases_won: parsedLawyer.cases_won || 0,
            total_cases: parsedLawyer.total_cases || 0,
            city: parsedLawyer.city,
            bio: parsedLawyer.bio || `${parsedLawyer.first_name} is a specialized ${parsedLawyer.domain} lawyer with ${parsedLawyer.experience} years of experience.`,
            contact_number: parsedLawyer.contact_number,
            law_school: parsedLawyer.law_school,
            bar_association: parsedLawyer.bar_association,
            gender: parsedLawyer.gender || 'Not specified', // Ensure gender is always defined
            first_name: parsedLawyer.first_name,
            last_name: parsedLawyer.last_name
          });
        }
      } catch (error) {
        console.error("Failed to parse lawyer data:", error);
      }
    }
  }
  
  return allLawyers;
};

// Function to filter lawyers based on criteria
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
) => {
  return lawyers.filter(lawyer => {
    // Domain filter
    if (filters.domain && filters.domain !== "all" && lawyer.domain !== filters.domain) {
      return false;
    }
    
    // City filter
    if (filters.city && filters.city !== "all" && lawyer.city !== filters.city) {
      return false;
    }
    
    // Gender filter
    if (filters.gender && filters.gender !== "any" && 
        lawyer.gender?.toLowerCase() !== filters.gender.toLowerCase()) {
      return false;
    }
    
    // Experience filter
    if (filters.minExperience && lawyer.experience < filters.minExperience) {
      return false;
    }
    
    // Rating filter
    if (filters.minRating && lawyer.rating < filters.minRating) {
      return false;
    }
    
    // Fees filter
    if (filters.maxFees && lawyer.fees_per_hearing > filters.maxFees) {
      return false;
    }
    
    return true;
  });
};

// Function to recommend lawyers based on user query
export const recommendLawyers = (
  query: string, 
  lawyers: LawyerData[],
  limit = 10
): LawyerData[] => {
  // In a real ML system, this would use NLP and recommendation algorithms
  // For our demo, we'll do basic keyword matching with scoring
  
  if (!query) return lawyers;
  
  query = query.toLowerCase();
  const queryWords = query.split(/\s+/).filter(word => word.length > 2);
  
  // If no meaningful query words, return all lawyers
  if (queryWords.length === 0) return lawyers;
  
  // Score each lawyer based on relevance to query
  const scoredLawyers = lawyers.map(lawyer => {
    let score = 0;
    
    // Check domain match (highest priority)
    if (lawyer.domain.toLowerCase().includes(query)) {
      score += 100;
    }
    
    // Check name match
    if (lawyer.name.toLowerCase().includes(query)) {
      score += 80;
    }
    
    // Check city match
    if (lawyer.city.toLowerCase().includes(query)) {
      score += 60;
    }
    
    // Check word-by-word matches
    queryWords.forEach(word => {
      // Domain word matches
      if (lawyer.domain.toLowerCase().includes(word)) {
        score += 30;
      }
      
      // Name word matches
      if (lawyer.name.toLowerCase().includes(word)) {
        score += 25;
      }
      
      // Law school matches
      if (lawyer.law_school?.toLowerCase().includes(word)) {
        score += 20;
      }
      
      // Bar association matches
      if (lawyer.bar_association?.toLowerCase().includes(word)) {
        score += 15;
      }
      
      // City word matches
      if (lawyer.city.toLowerCase().includes(word)) {
        score += 10;
      }
    });
    
    // Boost by experience and rating
    score += lawyer.experience * 2;
    score += lawyer.rating * 10;
    
    return { lawyer, score };
  });
  
  // Sort by score (descending) and return the lawyers
  return scoredLawyers
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.lawyer);
};

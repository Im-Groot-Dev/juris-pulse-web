
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

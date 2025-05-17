
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
  "Dr. Ram Manohar Lohiya National Law University, Lucknow",
  "Hidayatullah National Law University, Raipur",
  "Maharashtra National Law University, Mumbai",
  "National Law Institute University, Bhopal",
  "Tamil Nadu National Law University, Tiruchirappalli",
  "Damodaram Sanjivayya National Law University, Visakhapatnam",
  "Maharashtra National Law University, Nagpur",
  "Maharashtra National Law University, Aurangabad",
  "Himachal Pradesh National Law University, Shimla",
  "Dharmashastra National Law University, Jabalpur",
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
  "Rajasthan Bar Council",
  "Odisha Bar Council",
  "Telangana Bar Council",
  "Andhra Pradesh Bar Council",
  "Bihar Bar Council",
  "Jharkhand Bar Council",
  "Chhattisgarh Bar Council",
  "Haryana Bar Council",
  "Himachal Pradesh Bar Council",
  "Uttarakhand Bar Council",
  "Madhya Pradesh Bar Council",
  "Jammu & Kashmir Bar Council",
  "Assam Bar Council",
  "Northeast Bar Council",
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
  "Guwahati",
  "Bhopal",
  "Indore",
  "Nagpur",
  "Coimbatore",
  "Surat",
  "Patna",
  "Ranchi",
  "Visakhapatnam",
  "Vadodara",
  "Thiruvananthapuram",
  "Dehradun",
  "Raipur",
];

// Sample lawyer data for demonstration
export const SAMPLE_LAWYERS = [
  // Original sample lawyers
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
  // Generating more lawyers for each domain
  ...generateLawyers()
];

// Function to generate additional lawyers
function generateLawyers() {
  const lawyers = [];
  let idCounter = 4; // Start after the original 3 lawyers
  
  // List of first names
  const maleFirstNames = [
    "Amit", "Vikram", "Suresh", "Rohit", "Rahul", "Sanjay", "Deepak", "Ajay", "Vijay", "Nitin", 
    "Prakash", "Anil", "Sunil", "Rakesh", "Vivek", "Mahesh", "Dinesh", "Rajiv", "Manoj", "Ashok", 
    "Pankaj", "Vinod", "Manish", "Ravi", "Jayesh", "Bharat", "Sachin", "Surya", "Aditya", "Karan", 
    "Siddharth", "Rohan", "Neeraj", "Tushar", "Arun", "Arjun", "Kartik", "Vikas", "Anand", "Alok",
    "Sanjeev", "Aniket", "Abhishek", "Dhruv", "Gaurav", "Harish", "Ishaan", "Jatin", "Krishna", "Lalit",
    "Mukesh", "Naveen", "Pranav", "Ramesh", "Sameer", "Tarun", "Uday", "Varun", "Yash", "Zubin",
    "Aakash", "Chirag", "Dev", "Farhan", "Girish", "Hitesh", "Imran", "Jai", "Kamal", "Lokesh"
  ];
    
  const femaleFirstNames = [
    "Sneha", "Anjali", "Kritika", "Kavita", "Divya", "Pooja", "Anamika", "Neha", "Meera", "Sunita", 
    "Radha", "Smita", "Nandini", "Anita", "Swati", "Jaya", "Ritu", "Preeti", "Seema", "Shreya", 
    "Aarti", "Monica", "Varsha", "Rekha", "Jyoti", "Shikha", "Sarika", "Manisha", "Ananya", "Ishita", 
    "Nidhi", "Garima", "Shweta", "Deepika", "Shilpa", "Aditi", "Bhavna", "Chitra", "Dipti", "Eesha",
    "Falguni", "Gayatri", "Himani", "Isha", "Juhi", "Kalpana", "Lata", "Mala", "Naina", "Pallavi",
    "Rachna", "Sandhya", "Tanvi", "Uma", "Vidya", "Aparna", "Barkha", "Chhaya", "Disha", "Ekta",
    "Falak", "Gauri", "Hina", "Indira", "Jasmine", "Kamala", "Leela", "Meghna", "Nisha", "Ojaswi"
  ];
    
  // List of last names
  const lastNames = [
    "Patel", "Shah", "Reddy", "Singh", "Kumar", "Joshi", "Sharma", "Verma", "Gupta", "Nair", 
    "Iyer", "Deshmukh", "Patil", "Agarwal", "Choudhury", "Malhotra", "Kapoor", "Bhat", "Hegde", "Chatterjee", 
    "Banerjee", "Kaur", "Trivedi", "Goyal", "Saxena", "Sethi", "Arora", "Mehta", "Das", "Chopra", 
    "Khanna", "Rao", "Menon", "Bose", "Naidu", "Kulkarni", "Jain", "Chakraborty", "Sengupta", "Bhatia", 
    "Yadav", "Rathore", "Chauhan", "Dubey", "Pillai", "Krishnamurthy", "Venkatesh", "Shukla", "Mishra", "Tiwari",
    "Pandey", "Roy", "Dutta", "Biswas", "Ganguly", "Mukherjee", "Sarkar", "Sinha", "Thapar", "Mahajan",
    "Chahal", "Basu", "Goel", "Mathur", "Lal", "Khurana", "Bajaj", "Dhawan", "Grewal", "Nagpal",
    "Khatri", "Anand", "Bhalla", "Vishnoi", "Chawla", "Sanghvi", "Dewan", "Ahuja", "Bhargava", "Grover"
  ];

  // Genrate unique interests based on legal domains
  const interestsByDomain = {
    "Corporate Law": ["Mergers & Acquisitions", "Securities Regulation", "Corporate Governance", "International Business Law", "Compliance", "Venture Capital", "Financial Regulations", "Joint Ventures", "Shareholder Rights", "Capital Markets"],
    "Criminal Law": ["White Collar Crime", "Criminal Defense", "Cybercrime", "Juvenile Justice", "Forensic Evidence", "Appeals", "Drug Offenses", "Criminal Procedure", "Domestic Violence", "MCOCA"],
    "Family Law": ["Divorce", "Child Custody", "Adoption", "Domestic Violence", "Alimony", "Child Support", "Paternity", "Guardian Law", "Prenuptial Agreements", "Succession Planning"],
    "Civil Law": ["Personal Injury", "Torts", "Medical Malpractice", "Product Liability", "Consumer Protection", "Contract Disputes", "Civil Procedure", "Alternative Dispute Resolution", "Negligence", "Property Disputes"],
    "Intellectual Property": ["Patent Law", "Trademark Law", "Copyright", "Trade Secrets", "IP Litigation", "Technology Licensing", "Entertainment Law", "Media Law", "IP Portfolio Management", "Domain Name Disputes"],
    "Real Estate Law": ["Land Acquisition", "Property Registration", "Rental Agreements", "Construction Law", "Zoning", "Environmental Compliance", "Title Disputes", "Real Estate Finance", "Commercial Leasing", "Affordable Housing"],
    "Tax Law": ["Direct Taxation", "GST", "International Taxation", "Tax Planning", "Tax Disputes", "Corporate Taxation", "Income Tax Appeals", "Tax Compliance", "Tax Audits", "Cross-border Taxation"],
    "Constitutional Law": ["Fundamental Rights", "Public Interest Litigation", "Administrative Law", "Election Law", "Constitutional Remedies", "Interpretation of Statutes", "Federal Disputes", "Separation of Powers", "Civil Liberties", "Judicial Review"],
    "Environmental Law": ["Climate Change Litigation", "Environmental Compliance", "Natural Resources", "Wildlife Protection", "Pollution Control", "Environmental Impact Assessment", "Energy Law", "Forest Conservation", "Water Rights", "Green Regulations"],
    "Immigration Law": ["Visas", "Citizenship", "Asylum", "Deportation Defense", "Work Permits", "Family Immigration", "Business Immigration", "Immigration Compliance", "Refugee Law", "Student Visas"]
  };
  
  // Generate realistic bios for lawyers based on their domain and experience
  function generateBio(lawyer) {
    const { first_name, last_name, domain, experience, law_school, city, gender } = lawyer;
    const pronoun = gender === 'male' ? 'He' : 'She';
    const possessive = gender === 'male' ? 'his' : 'her';
    
    const domainInterests = interestsByDomain[domain] || [];
    const specializations = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * domainInterests.length);
      if (!specializations.includes(domainInterests[randomIndex])) {
        specializations.push(domainInterests[randomIndex]);
      }
    }
    
    const specializationText = specializations.length > 0 
      ? `specializing in ${specializations.slice(0, -1).join(", ")} ${specializations.length > 1 ? 'and ' + specializations[specializations.length - 1] : specializations[0]}`
      : '';
    
    const introTemplates = [
      `${first_name} ${last_name} is an accomplished ${domain} attorney with ${experience} years of experience ${specializationText}.`,
      `With ${experience} years of legal expertise, ${first_name} ${last_name} is a dedicated ${domain} lawyer ${specializationText}.`,
      `${first_name} is a respected ${domain} practitioner with ${experience} years in the field ${specializationText}.`
    ];
    
    const educationTemplates = [
      `${pronoun} graduated from ${law_school} and has built a strong reputation in the legal community.`,
      `A proud alumnus of ${law_school}, ${pronoun.toLowerCase()} has established ${possessive} practice with integrity and dedication.`,
      `After completing ${possessive} education at ${law_school}, ${pronoun.toLowerCase()} has become a prominent figure in ${city}'s legal circles.`
    ];
    
    const achievementTemplates = [
      `${pronoun} has successfully represented clients in numerous landmark cases and is known for ${possessive} thorough approach.`,
      `Known for ${possessive} strategic thinking and attention to detail, ${pronoun.toLowerCase()} has achieved favorable outcomes for clients in complex legal matters.`,
      `${pronoun} has built a track record of success through ${possessive} diligent preparation and passionate advocacy.`
    ];
    
    const conclusionTemplates = [
      `Based in ${city}, ${first_name} is committed to providing personalized legal solutions tailored to each client's unique needs.`,
      `From ${possessive} office in ${city}, ${first_name} continues to offer exceptional legal counsel with a client-centered approach.`,
      `${first_name} practices in ${city} and is dedicated to achieving the best possible outcomes while maintaining the highest ethical standards.`
    ];
    
    const intro = introTemplates[Math.floor(Math.random() * introTemplates.length)];
    const education = educationTemplates[Math.floor(Math.random() * educationTemplates.length)];
    const achievement = achievementTemplates[Math.floor(Math.random() * achievementTemplates.length)];
    const conclusion = conclusionTemplates[Math.floor(Math.random() * conclusionTemplates.length)];
    
    return `${intro} ${education} ${achievement} ${conclusion}`;
  }
  
  // Generate random contact numbers in Indian format
  function generateContactNumber() {
    const prefixes = ['70', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const remainingDigits = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    return `+91 ${prefix}${remainingDigits}`;
  }
  
  // Generate lawyers for each domain
  DOMAINS.forEach(domain => {
    // Generate 100-120 lawyers per domain for a total of 1000+ lawyers
    const numLawyers = Math.floor(Math.random() * 21) + 100;
    
    for (let i = 0; i < numLawyers; i++) {
      const gender = Math.random() > 0.5 ? "male" : "female";
      const firstName = gender === "male" 
        ? maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)]
        : femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      
      // Generate unique email
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 999)}@example.com`;
      
      // Generate random experience between 3 and 40 years
      const experience = Math.floor(Math.random() * 37) + 3;
      
      // Generate age based on experience (typically starts practicing at 25)
      const age = experience + 25 + Math.floor(Math.random() * 3);
      
      // Generate fees based on experience and domain
      let baseFee = 0;
      switch (domain) {
        case "Corporate Law":
        case "Intellectual Property":
          baseFee = 5000;
          break;
        case "Criminal Law":
        case "Constitutional Law":
          baseFee = 4000;
          break;
        case "Tax Law":
        case "Environmental Law":
          baseFee = 4500;
          break;
        default:
          baseFee = 3000;
      }
      const fees = baseFee + (experience * 200) + (Math.floor(Math.random() * 1000));
      
      // Generate random rating between 3.0 and 5.0
      const rating = (Math.random() * 2 + 3).toFixed(1);
      
      // Generate cases won and total cases
      const successRate = Math.random() * 0.3 + 0.65; // 65% to 95%
      const totalCases = Math.floor((experience * 15) * (Math.random() * 0.5 + 0.75));
      const casesWon = Math.floor(totalCases * successRate);
      
      // Get random city, law school and bar association
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      const lawSchool = LAW_SCHOOLS[Math.floor(Math.random() * LAW_SCHOOLS.length)];
      const barAssociation = BAR_ASSOCIATIONS[Math.floor(Math.random() * BAR_ASSOCIATIONS.length)];
      
      const lawyerData = {
        id: `lawyer${idCounter++}`,
        first_name: firstName,
        last_name: lastName,
        email: email,
        gender: gender,
        age: age,
        experience: experience,
        domain: domain,
        fees_per_hearing: fees,
        rating: parseFloat(rating),
        cases_won: casesWon,
        total_cases: totalCases,
        city: city,
        law_school: lawSchool,
        bar_association: barAssociation
      };

      // Add a contact number
      lawyerData.contact_number = generateContactNumber();
      
      lawyers.push(lawyerData);
    }
  });
  
  return lawyers;
}

// Define LawyerData type for use throughout the app
export interface LawyerData {
  id: string;
  name?: string;
  profileImage?: string;
  email: string;
  domain: string;
  experience: number;
  fees_per_hearing: number;
  rating: number;
  cases_won?: number;
  total_cases?: number;
  city: string;
  bio?: string;
  contact_number?: string;
  law_school?: string;
  bar_association?: string;
  gender?: string;
  first_name?: string;
  last_name?: string;
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
    
    // Generate a bio if one doesn't exist
    const bio = lawyer.bio || generateBio(lawyer);
    
    // Generate a seed for consistent avatar generation
    const avatarSeed = `${lawyer.first_name}${lawyer.email}`;
    
    const profile = {
      ...lawyer,
      bio: bio,
      appointments: [],
      clients: [],
      reviews: [],
      profileImage: `https://api.dicebear.com/7.x/personas/svg?seed=${avatarSeed}`,
    };
    
    localStorage.setItem(`lawyer_${lawyerId}`, JSON.stringify(profile));
  });
  
  // Mark as initialized
  localStorage.setItem('sampleDataInitialized', 'true');
};

// Helper function to generate a bio for a lawyer
function generateBio(lawyer) {
  const { first_name, last_name, domain, experience, law_school, city, gender } = lawyer;
  const pronoun = gender === 'male' ? 'He' : 'She';
  const possessive = gender === 'male' ? 'his' : 'her';
  
  const domainInterests = {
    "Corporate Law": ["Mergers & Acquisitions", "Securities Regulation", "Corporate Governance"],
    "Criminal Law": ["White Collar Crime", "Criminal Defense", "Cybercrime"],
    "Family Law": ["Divorce", "Child Custody", "Adoption"],
    "Civil Law": ["Personal Injury", "Torts", "Medical Malpractice"],
    "Intellectual Property": ["Patent Law", "Trademark Law", "Copyright"],
    "Real Estate Law": ["Land Acquisition", "Property Registration", "Rental Agreements"],
    "Tax Law": ["Direct Taxation", "GST", "International Taxation"],
    "Constitutional Law": ["Fundamental Rights", "Public Interest Litigation", "Administrative Law"],
    "Environmental Law": ["Climate Change Litigation", "Environmental Compliance", "Natural Resources"],
    "Immigration Law": ["Visas", "Citizenship", "Asylum"]
  };
  
  const interests = domainInterests[domain] || [];
  const specialization = interests[Math.floor(Math.random() * interests.length)];
  
  return `${first_name} ${last_name} is a specialized ${domain} lawyer with ${experience} years of experience, focusing on ${specialization}. ${pronoun} graduated from ${law_school} and practices primarily in ${city}. With a track record of success and dedication to clients, ${pronoun.toLowerCase()} provides expert legal counsel and representation.`;
}

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
          bio: parsedLawyer.bio || generateBio(parsedLawyer),
          contact_number: parsedLawyer.contact_number,
          law_school: parsedLawyer.law_school,
          bar_association: parsedLawyer.bar_association,
          gender: parsedLawyer.gender,
          first_name: parsedLawyer.first_name,
          last_name: parsedLawyer.last_name,
          age: parsedLawyer.age
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
            cases_won: parsedLawyer.cases_won,
            total_cases: parsedLawyer.total_cases,
            city: parsedLawyer.city,
            bio: parsedLawyer.bio || generateBio(parsedLawyer),
            contact_number: parsedLawyer.contact_number,
            law_school: parsedLawyer.law_school,
            bar_association: parsedLawyer.bar_association,
            gender: parsedLawyer.gender,
            first_name: parsedLawyer.first_name,
            last_name: parsedLawyer.last_name,
            age: parsedLawyer.age
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
    const fullName = lawyer.name || `${lawyer.first_name} ${lawyer.last_name}`;
    if (fullName.toLowerCase().includes(query)) {
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
      if (fullName.toLowerCase().includes(word)) {
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

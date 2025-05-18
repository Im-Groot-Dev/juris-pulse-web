
import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const resources = {
    articles: [
      {
        id: "article1",
        title: "Understanding Contract Law Basics",
        category: "Contract Law",
        image: "/placeholder.svg",
        excerpt: "Learn the fundamental principles of contract law and how they apply to everyday agreements.",
        date: "May 10, 2025",
        readTime: "5 min read",
        content: `
          <h1>Understanding Contract Law Basics</h1>
          
          <p>Contract law is one of the most fundamental areas of legal practice that affects both individuals and businesses. At its core, a contract is a legally binding agreement between two or more parties that creates mutual obligations enforceable by law.</p>
          
          <h2>Essential Elements of a Valid Contract</h2>
          
          <p>For a contract to be legally binding, it must include these key elements:</p>
          
          <ul>
            <li><strong>Offer:</strong> A clear proposal made by one party to another, showing willingness to enter into an agreement on specified terms.</li>
            <li><strong>Acceptance:</strong> The unqualified agreement to the terms of the offer.</li>
            <li><strong>Consideration:</strong> Something of value exchanged between the parties (money, goods, services, etc.).</li>
            <li><strong>Intention to create legal relations:</strong> Both parties must intend to enter into a legally binding agreement.</li>
            <li><strong>Capacity:</strong> All parties must have the legal capacity to enter into a contract.</li>
            <li><strong>Legality:</strong> The purpose of the contract must be legal.</li>
          </ul>
          
          <h2>Types of Contracts</h2>
          
          <p>Contracts can be categorized in several ways:</p>
          
          <ul>
            <li><strong>Express vs. Implied Contracts:</strong> Express contracts are agreed upon through written or spoken words, while implied contracts are formed through actions or behavior.</li>
            <li><strong>Bilateral vs. Unilateral Contracts:</strong> Bilateral contracts involve promises from both parties, while unilateral contracts involve a promise from only one party.</li>
            <li><strong>Void, Voidable, and Unenforceable Contracts:</strong> These distinctions relate to the validity and enforceability of contracts under different circumstances.</li>
          </ul>
          
          <h2>Common Contract Issues</h2>
          
          <p>Even with careful drafting, contracts can lead to disputes. Common issues include:</p>
          
          <ul>
            <li><strong>Breach of Contract:</strong> When one party fails to fulfill their contractual obligations.</li>
            <li><strong>Misrepresentation:</strong> False statements made during contract negotiations.</li>
            <li><strong>Mistake:</strong> When one or both parties enter the contract under a misunderstanding.</li>
            <li><strong>Duress or Undue Influence:</strong> When a contract is formed under pressure or improper persuasion.</li>
          </ul>
          
          <h2>Practical Tips for Contract Management</h2>
          
          <ul>
            <li>Always read contracts thoroughly before signing.</li>
            <li>Ensure all terms are clearly defined.</li>
            <li>Document any changes to the contract in writing.</li>
            <li>Keep copies of all contracts and related communications.</li>
            <li>Consider seeking legal advice for complex or high-value contracts.</li>
          </ul>
          
          <p>Understanding these basics can help individuals and businesses navigate contractual relationships more effectively and avoid costly disputes.</p>
        `
      },
      {
        id: "article2",
        title: "Employee Rights in the Workplace",
        category: "Employment Law",
        image: "/placeholder.svg",
        excerpt: "A comprehensive guide to understanding your rights as an employee under Indian labor laws.",
        date: "May 5, 2025",
        readTime: "8 min read",
        content: `
          <h1>Employee Rights in the Workplace: Understanding Indian Labor Laws</h1>
          
          <p>Indian labor laws provide various protections to employees across different sectors. Understanding these rights is essential for both employees and employers to maintain a fair and legal working environment.</p>
          
          <h2>Fundamental Rights Under Indian Labor Laws</h2>
          
          <h3>1. Right to Fair Wages and Equal Remuneration</h3>
          <p>The Minimum Wages Act, 1948 and the Equal Remuneration Act, 1976 ensure that workers receive fair compensation for their work and prohibit discrimination in payment based on gender.</p>
          
          <h3>2. Right to Safe Working Conditions</h3>
          <p>The Factories Act, 1948 and various other industry-specific regulations mandate employers to provide safe and hygienic working conditions.</p>
          
          <h3>3. Protection Against Unfair Dismissal</h3>
          <p>Under the Industrial Disputes Act, 1947, employers must follow proper procedures before terminating employment and provide valid reasons for dismissal.</p>
          
          <h3>4. Social Security Benefits</h3>
          <p>Various legislations like the Employees' Provident Fund Act, Employees' State Insurance Act, and Payment of Gratuity Act ensure that employees receive social security benefits.</p>
          
          <h3>5. Protection Against Harassment</h3>
          <p>The Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 provides protection against sexual harassment at the workplace.</p>
          
          <h2>Emerging Workplace Rights</h2>
          
          <p>As the nature of work evolves, new rights and protections are emerging:</p>
          
          <ul>
            <li><strong>Remote Work Regulations:</strong> With the increase in remote work, new guidelines regarding working hours, equipment provision, and work-life balance are developing.</li>
            <li><strong>Gig Economy Protections:</strong> Recent judicial interpretations are extending certain employment protections to gig workers.</li>
            <li><strong>Data Privacy Rights:</strong> Employees have rights regarding the collection, storage, and use of their personal data by employers.</li>
          </ul>
          
          <h2>When Your Rights Are Violated</h2>
          
          <p>If you believe your workplace rights have been violated, you may:</p>
          
          <ol>
            <li>Raise the issue with your immediate supervisor or HR department</li>
            <li>File a complaint with the labor department</li>
            <li>Approach the labor court or industrial tribunal</li>
            <li>Seek assistance from trade unions if applicable</li>
            <li>Consult with a labor law specialist</li>
          </ol>
          
          <p>Understanding and asserting your rights as an employee can help ensure fair treatment in the workplace and contribute to a healthier work environment for all.</p>
        `
      },
      {
        id: "article3",
        title: "Property Registration Process in India",
        category: "Real Estate",
        image: "/placeholder.svg",
        excerpt: "Step-by-step guide to navigate the property registration process in different Indian states.",
        date: "April 28, 2025",
        readTime: "10 min read",
        content: `
          <h1>Property Registration Process in India: A Comprehensive Guide</h1>
          
          <p>Property registration is a crucial legal process that validates the transfer of ownership from the seller to the buyer. This guide outlines the standard procedure followed across most Indian states, although specific requirements may vary by location.</p>
          
          <h2>Pre-Registration Steps</h2>
          
          <h3>1. Title Verification</h3>
          <p>Before proceeding with any property transaction, verify the seller's ownership by:</p>
          <ul>
            <li>Examining the chain of ownership documents</li>
            <li>Conducting an encumbrance certificate search</li>
            <li>Checking for any pending legal disputes</li>
            <li>Verifying property tax payment status</li>
          </ul>
          
          <h3>2. Document Preparation</h3>
          <p>Essential documents for property registration include:</p>
          <ul>
            <li>Sale deed/transfer deed</li>
            <li>Agreement to sell</li>
            <li>Property tax receipts</li>
            <li>NOC from housing society (if applicable)</li>
            <li>Building plan approval</li>
            <li>Identity proof of both parties</li>
          </ul>
          
          <h2>Registration Procedure</h2>
          
          <h3>1. Stamp Duty Payment</h3>
          <p>Pay the appropriate stamp duty as per state regulations, typically ranging from 3-7% of the property value. E-stamping facilities are available in most states.</p>
          
          <h3>2. Execute the Sale Deed</h3>
          <p>The sale deed must be executed on stamp paper of appropriate value and signed by both the seller and buyer in the presence of two witnesses.</p>
          
          <h3>3. Schedule Registration Appointment</h3>
          <p>Book an appointment with the sub-registrar's office in whose jurisdiction the property is located. Many states now offer online appointment booking.</p>
          
          <h3>4. Physical Registration</h3>
          <p>On the appointed day, both buyer and seller (or their authorized representatives) must appear before the sub-registrar with:</p>
          <ul>
            <li>Original sale deed</li>
            <li>Identity proof</li>
            <li>Passport-sized photographs</li>
            <li>Property documents</li>
          </ul>
          
          <h3>5. Registration Fee Payment</h3>
          <p>Pay the registration fee (typically 1% of the property value, subject to state-specific caps) at the sub-registrar's office.</p>
          
          <h3>6. Document Verification and Biometrics</h3>
          <p>The sub-registrar will verify all documents, record statements, and collect biometric information before completing the registration process.</p>
          
          <h2>Post-Registration Steps</h2>
          
          <h3>1. Collect Registered Documents</h3>
          <p>After processing, collect the registered original sale deed with the registration number and official seal.</p>
          
          <h3>2. Property Record Update</h3>
          <p>Ensure the property records are updated in municipal records and with the local development authority.</p>
          
          <h3>3. Transfer Utilities</h3>
          <p>Transfer electricity, water, and gas connections to the new owner's name.</p>
          
          <h2>State-Specific Variations</h2>
          
          <p>While the basic process remains similar, certain requirements vary by state:</p>
          
          <ul>
            <li><strong>Maharashtra:</strong> Requires property registration card and RERA registration for new properties</li>
            <li><strong>Karnataka:</strong> Mandates Khata transfer after registration</li>
            <li><strong>Tamil Nadu:</strong> Requires guideline value verification before registration</li>
            <li><strong>Delhi:</strong> Needs clearance from land and development office for certain properties</li>
          </ul>
          
          <p>Property registration, while seeming complex, is a straightforward process when approached methodically. For smoother transactions, consider consulting a property lawyer familiar with local regulations.</p>
        `
      },
      {
        id: "article4",
        title: "Filing Income Tax Returns: A Guide",
        category: "Tax Law",
        image: "/placeholder.svg",
        excerpt: "Everything you need to know about filing your income tax returns correctly and on time.",
        date: "April 22, 2025",
        readTime: "7 min read",
        content: `
          <h1>Filing Income Tax Returns: A Comprehensive Guide</h1>
          
          <p>Filing income tax returns (ITR) is an annual obligation for eligible individuals and entities in India. This guide aims to simplify the process and help you understand the key aspects of ITR filing.</p>
          
          <h2>Understanding Income Tax Return Forms</h2>
          
          <p>The Income Tax Department provides different ITR forms based on your income sources and status:</p>
          
          <ul>
            <li><strong>ITR-1 (Sahaj):</strong> For individuals with income up to ₹50 lakhs from salary, one house property, and other sources</li>
            <li><strong>ITR-2:</strong> For individuals and HUFs with income from salary, house property, capital gains, and other sources</li>
            <li><strong>ITR-3:</strong> For individuals and HUFs having income from business or profession</li>
            <li><strong>ITR-4 (Sugam):</strong> For presumptive income from business or profession</li>
            <li><strong>ITR-5:</strong> For firms, LLPs, AOPs, and BOIs</li>
            <li><strong>ITR-6:</strong> For companies other than those claiming exemption under section 11</li>
            <li><strong>ITR-7:</strong> For trusts, political parties, and charitable institutions</li>
          </ul>
          
          <h2>Documents Required for ITR Filing</h2>
          
          <p>Before starting the filing process, gather these essential documents:</p>
          
          <ul>
            <li>PAN and Aadhaar card details</li>
            <li>Form 16 from employer(s)</li>
            <li>Form 26AS (Tax Credit Statement)</li>
            <li>Bank statements showing interest earned</li>
            <li>Investment proofs for tax deductions</li>
            <li>Property sale/purchase documents (if applicable)</li>
            <li>Details of other income sources</li>
          </ul>
          
          <h2>Step-by-Step Filing Process</h2>
          
          <h3>1. Register/Login to the Income Tax Portal</h3>
          <p>Visit the official Income Tax e-filing portal at <a href="https://www.incometax.gov.in">incometax.gov.in</a> and login with your PAN and password.</p>
          
          <h3>2. Select the Appropriate ITR Form</h3>
          <p>Based on your income sources, select the correct ITR form. The portal may suggest the appropriate form based on your previous filings and Form 26AS details.</p>
          
          <h3>3. Fill in the Required Details</h3>
          <p>Enter personal information, income details, tax deductions, and tax payments. The portal often pre-fills much of this information from Form 26AS and AIS (Annual Information Statement).</p>
          
          <h3>4. Calculate Tax Liability</h3>
          <p>The system will calculate your tax liability based on the information provided. Verify this against your own calculations.</p>
          
          <h3>5. Pay Any Remaining Tax Due</h3>
          <p>If there's any balance tax payable, make the payment through the portal before submitting your return.</p>
          
          <h3>6. Verify Your Return</h3>
          <p>After submission, verify your return using one of these methods:</p>
          <ul>
            <li>Aadhaar OTP</li>
            <li>Net banking</li>
            <li>Digital Signature Certificate (DSC)</li>
            <li>Electronic Verification Code (EVC)</li>
            <li>Physical verification by sending the signed ITR-V to CPC, Bengaluru</li>
          </ul>
          
          <h2>Common Deductions and Exemptions</h2>
          
          <p>Maximize your tax savings by claiming applicable deductions:</p>
          
          <ul>
            <li><strong>Section 80C:</strong> Investments up to ₹1.5 lakhs (PPF, ELSS, insurance premiums, etc.)</li>
            <li><strong>Section 80D:</strong> Health insurance premiums</li>
            <li><strong>Section 80G:</strong> Charitable donations</li>
            <li><strong>Section 24:</strong> Interest on home loan (up to ₹2 lakhs for self-occupied property)</li>
            <li><strong>Section 80E:</strong> Interest on education loan</li>
          </ul>
          
          <h2>Important Deadlines and Penalties</h2>
          
          <p>Filing your ITR by the due date (typically July 31 for most individuals) is crucial to avoid:</p>
          
          <ul>
            <li>Late filing fees under Section 234F</li>
            <li>Interest charges under Section 234A</li>
            <li>Loss of certain carry-forward benefits</li>
            <li>Potential scrutiny by tax authorities</li>
          </ul>
          
          <p>Regular and accurate filing of income tax returns not only fulfills your legal obligation but also helps maintain a clean financial record that's beneficial for loan approvals, visa applications, and other financial transactions.</p>
        `
      }
    ],
    guides: [
      {
        id: "guide1",
        title: "Starting a Business in India",
        category: "Business Law",
        image: "/placeholder.svg",
        excerpt: "A comprehensive legal guide to establishing your business entity in India.",
        downloadLink: "#",
        content: `
          <h1>Starting a Business in India: Legal Guide</h1>
          
          <p>This comprehensive guide walks entrepreneurs through the legal aspects of establishing a business in India, covering entity selection, registration requirements, compliance considerations, and more.</p>
          
          <h2>Choosing the Right Business Structure</h2>
          
          <p>India offers several business structures, each with distinct legal and tax implications:</p>
          
          <h3>1. Sole Proprietorship</h3>
          <ul>
            <li><strong>Best for:</strong> Small businesses with single owners</li>
            <li><strong>Registration:</strong> Minimal formal registration; trade license may be required</li>
            <li><strong>Liability:</strong> Unlimited personal liability</li>
            <li><strong>Taxation:</strong> Income taxed as personal income</li>
          </ul>
          
          <h3>2. Partnership Firm</h3>
          <ul>
            <li><strong>Best for:</strong> Professional services with multiple partners</li>
            <li><strong>Registration:</strong> Partnership deed registration recommended but optional</li>
            <li><strong>Liability:</strong> Unlimited personal liability for all partners</li>
            <li><strong>Taxation:</strong> Income taxed at the partner level</li>
          </ul>
          
          <h3>3. Limited Liability Partnership (LLP)</h3>
          <ul>
            <li><strong>Best for:</strong> Small to medium businesses seeking liability protection</li>
            <li><strong>Registration:</strong> Mandatory registration with MCA</li>
            <li><strong>Liability:</strong> Limited to partners' contributions</li>
            <li><strong>Taxation:</strong> Transparent taxation at partner level</li>
          </ul>
          
          <h3>4. Private Limited Company</h3>
          <ul>
            <li><strong>Best for:</strong> Medium to large businesses seeking external funding</li>
            <li><strong>Registration:</strong> Mandatory incorporation with MCA</li>
            <li><strong>Liability:</strong> Limited to shareholders' investments</li>
            <li><strong>Taxation:</strong> Corporate tax on company profits</li>
          </ul>
          
          <h3>5. One Person Company (OPC)</h3>
          <ul>
            <li><strong>Best for:</strong> Solo entrepreneurs seeking corporate benefits</li>
            <li><strong>Registration:</strong> Mandatory incorporation with MCA</li>
            <li><strong>Liability:</strong> Limited to owner's investment</li>
            <li><strong>Taxation:</strong> Corporate tax structure</li>
          </ul>
          
          <h2>Registration Process for Private Limited Company</h2>
          
          <p>As the most popular structure for scalable businesses, here's a detailed overview of the incorporation process:</p>
          
          <ol>
            <li><strong>Obtain Digital Signature Certificate (DSC)</strong> for proposed directors</li>
            <li><strong>Apply for Director Identification Number (DIN)</strong> for all directors</li>
            <li><strong>Reserve Company Name</strong> through SPICe+ form</li>
            <li><strong>Draft Memorandum of Association (MOA) and Articles of Association (AOA)</strong></li>
            <li><strong>File Incorporation Documents</strong> via SPICe+ form</li>
            <li><strong>Obtain Certificate of Incorporation</strong> with Corporate Identity Number (CIN)</li>
            <li><strong>Apply for PAN and TAN</strong> (usually issued with incorporation)</li>
            <li><strong>Open Corporate Bank Account</strong> with the incorporation certificate</li>
          </ol>
          
          <h2>Essential Compliance Requirements</h2>
          
          <h3>1. Tax Registrations</h3>
          <ul>
            <li><strong>GST Registration:</strong> Mandatory if turnover exceeds ₹20 lakhs (₹10 lakhs for special category states)</li>
            <li><strong>Professional Tax Registration:</strong> Required in certain states</li>
            <li><strong>Shop and Establishment License:</strong> Mandatory for physical premises</li>
          </ul>
          
          <h3>2. Labor Compliances</h3>
          <ul>
            <li><strong>Provident Fund Registration:</strong> Mandatory if employing 20+ employees</li>
            <li><strong>ESI Registration:</strong> Required if employing 10+ employees with salaries under ₹21,000</li>
          </ul>
          
          <h3>3. Sector-Specific Licenses</h3>
          <p>Depending on your business activity, you may need industry-specific licenses:</p>
          <ul>
            <li>FSSAI license for food businesses</li>
            <li>RERA registration for real estate projects</li>
            <li>Import-Export Code for international trade</li>
          </ul>
          
          <h2>Ongoing Compliance Calendar</h2>
          
          <h3>Monthly Compliances</h3>
          <ul>
            <li>GST returns filing</li>
            <li>TDS/TCS deposit</li>
            <li>PF/ESI contributions</li>
          </ul>
          
          <h3>Annual Compliances</h3>
          <ul>
            <li>Annual GST return</li>
            <li>Income tax return filing</li>
            <li>Annual return filing with MCA</li>
            <li>Financial statement preparation and audit (if applicable)</li>
          </ul>
          
          <h2>Foreign Investment Considerations</h2>
          
          <p>For businesses seeking foreign investment:</p>
          <ul>
            <li>Understand FDI regulations for your sector</li>
            <li>Determine entry route (Automatic vs. Government approval)</li>
            <li>Comply with FEMA regulations</li>
            <li>File necessary declarations with RBI</li>
          </ul>
          
          <h2>Intellectual Property Protection</h2>
          
          <p>Secure your business innovations through:</p>
          <ul>
            <li>Trademark registration for brand names and logos</li>
            <li>Patent registration for inventions</li>
            <li>Copyright protection for creative works</li>
            <li>Design registration for unique product designs</li>
          </ul>
          
          <p>Starting a business in India involves navigating complex regulatory requirements, but with proper planning and compliance, entrepreneurs can establish a strong foundation for sustainable growth. Consider consulting with legal and tax professionals to ensure your business setup aligns with current regulations.</p>
        `
      },
      {
        id: "guide2",
        title: "Family Law Handbook",
        category: "Family Law",
        image: "/placeholder.svg",
        excerpt: "Everything you need to know about marriage, divorce, and child custody laws.",
        downloadLink: "#",
        content: `
          <h1>Family Law Handbook: Marriage, Divorce, and Child Custody in India</h1>
          
          <p>This handbook provides a comprehensive overview of family law in India, covering marriage laws, divorce procedures, child custody arrangements, and other related matters across different personal laws.</p>
          
          <h2>Marriage Laws in India</h2>
          
          <p>Marriage laws in India vary based on religion and personal laws:</p>
          
          <h3>Hindu Marriage</h3>
          <p>Governed by the Hindu Marriage Act, 1955, which applies to Hindus, Buddhists, Jains, and Sikhs.</p>
          <ul>
            <li><strong>Legal Age:</strong> 21 years for males and 18 years for females</li>
            <li><strong>Registration:</strong> Optional but recommended</li>
            <li><strong>Conditions:</strong> Both parties must be of sound mind, not already married (unless permitted by custom), and not within prohibited degrees of relationship</li>
          </ul>
          
          <h3>Muslim Marriage</h3>
          <p>Governed by Muslim personal law with specific provisions under the Muslim Personal Law (Shariat) Application Act, 1937.</p>
          <ul>
            <li><strong>Legal Age:</strong> Puberty (generally interpreted as 15 years) for girls and 21 years for boys</li>
            <li><strong>Registration:</strong> Not mandatory under personal law but required in some states</li>
            <li><strong>Types:</strong> Includes Nikah (regular marriage) and various forms under different schools of Islamic law</li>
          </ul>
          
          <h3>Christian Marriage</h3>
          <p>Governed by the Indian Christian Marriage Act, 1872.</p>
          <ul>
            <li><strong>Legal Age:</strong> 21 years for males and 18 years for females</li>
            <li><strong>Registration:</strong> Mandatory</li>
            <li><strong>Procedure:</strong> Requires publication of banns or obtaining a license before solemnization</li>
          </ul>
          
          <h3>Special Marriage</h3>
          <p>The Special Marriage Act, 1954 allows interfaith marriages and civil marriages without religious ceremonies.</p>
          <ul>
            <li><strong>Legal Age:</strong> 21 years for males and 18 years for females</li>
            <li><strong>Registration:</strong> Mandatory</li>
            <li><strong>Procedure:</strong> Requires 30-day notice period and no objections from the public</li>
          </ul>
          
          <h2>Divorce Procedures</h2>
          
          <h3>Hindu Law Divorce</h3>
          <p>Under the Hindu Marriage Act, divorce can be obtained on grounds including:</p>
          <ul>
            <li>Adultery</li>
            <li>Cruelty (physical or mental)</li>
            <li>Desertion for at least two years</li>
            <li>Conversion to another religion</li>
            <li>Mental disorder</li>
            <li>Communicable disease</li>
            <li>Presumption of death</li>
            <li>Mutual consent (after 1 year of marriage)</li>
          </ul>
          
          <h3>Muslim Law Divorce</h3>
          <p>Several forms of divorce exist under Muslim law:</p>
          <ul>
            <li><strong>Talaq:</strong> Divorce initiated by the husband</li>
            <li><strong>Khula:</strong> Divorce initiated by the wife with husband's consent</li>
            <li><strong>Mubarat:</strong> Divorce by mutual consent</li>
            <li><strong>Judicial Divorce:</strong> Available under the Dissolution of Muslim Marriages Act, 1939</li>
          </ul>
          
          <h3>Christian Law Divorce</h3>
          <p>Under the Indian Divorce Act, 1869 (as amended), grounds include:</p>
          <ul>
            <li>Adultery</li>
            <li>Cruelty</li>
            <li>Desertion for at least two years</li>
            <li>Conversion to another religion</li>
            <li>Unsound mind</li>
            <li>Communicable venereal disease</li>
            <li>Mutual consent (after 1 year of marriage)</li>
          </ul>
          
          <h2>Child Custody and Guardianship</h2>
          
          <h3>Guardianship Laws</h3>
          <p>The Guardians and Wards Act, 1890 is the universal law regarding guardianship, with specific provisions under personal laws:</p>
          <ul>
            <li><strong>Hindu Law:</strong> The Hindu Minority and Guardianship Act, 1956 provides that the father is the natural guardian, followed by the mother</li>
            <li><strong>Muslim Law:</strong> The father is considered the natural guardian, though the mother has the right of hizanat (custody) during the child's early years</li>
          </ul>
          
          <h3>Types of Custody</h3>
          <ul>
            <li><strong>Physical Custody:</strong> Where the child resides</li>
            <li><strong>Legal Custody:</strong> Right to make decisions about the child's upbringing</li>
            <li><strong>Joint Custody:</strong> Shared arrangement between both parents</li>
            <li><strong>Sole Custody:</strong> Exclusive custody to one parent</li>
          </ul>
          
          <h3>Best Interests of the Child</h3>
          <p>Courts primarily consider the child's welfare when determining custody, considering factors such as:</p>
          <ul>
            <li>Age and gender of the child</li>
            <li>Child's preferences (if old enough)</li>
            <li>Parents' abilities to provide care</li>
            <li>Home environment</li>
            <li>Parental conduct</li>
            <li>Any history of domestic violence</li>
          </ul>
          
          <h2>Maintenance and Alimony</h2>
          
          <h3>Maintenance During Marriage</h3>
          <p>Section 125 of the Criminal Procedure Code provides for maintenance to wives, minor children, and parents unable to maintain themselves.</p>
          
          <h3>Alimony and Maintenance After Divorce</h3>
          <ul>
            <li><strong>Hindu Law:</strong> Provided under Section 25 of the Hindu Marriage Act</li>
            <li><strong>Muslim Law:</strong> Limited to iddat period (approximately 3 months) unless specified in marriage contract</li>
            <li><strong>Christian Law:</strong> Provided under the Indian Divorce Act</li>
          </ul>
          
          <h3>Factors Determining Maintenance Amount</h3>
          <ul>
            <li>Income and financial status of both parties</li>
            <li>Duration of marriage</li>
            <li>Age and health of the parties</li>
            <li>Standard of living during marriage</li>
            <li>Custodial responsibilities</li>
          </ul>
          
          <h2>Domestic Violence and Protection</h2>
          
          <p>The Protection of Women from Domestic Violence Act, 2005 provides remedies including:</p>
          <ul>
            <li>Protection orders</li>
            <li>Residence orders</li>
            <li>Monetary relief</li>
            <li>Custody orders</li>
            <li>Compensation orders</li>
          </ul>
          
          <h2>Adoption Laws</h2>
          
          <p>Adoption laws vary by religion:</p>
          <ul>
            <li><strong>Hindu Adoption:</strong> Governed by the Hindu Adoptions and Maintenance Act, 1956</li>
            <li><strong>Other Religions:</strong> May adopt under the Juvenile Justice (Care and Protection of Children) Act, 2015</li>
          </ul>
          
          <p>This handbook aims to provide a general overview of family law in India. Given the complexity and personal nature of family matters, it's advisable to consult a family law specialist for guidance specific to your situation.</p>
        `
      },
      {
        id: "guide3",
        title: "Intellectual Property Protection Guide",
        category: "IP Law",
        image: "/placeholder.svg",
        excerpt: "Learn how to protect your innovations, creative works, and brand identity.",
        downloadLink: "#",
        content: `
          <h1>Intellectual Property Protection Guide: Safeguarding Your Creations in India</h1>
          
          <p>This comprehensive guide explains the various forms of intellectual property protection available in India, helping creators, innovators, and businesses understand how to secure their intangible assets.</p>
          
          <h2>Understanding Intellectual Property Rights</h2>
          
          <p>Intellectual Property (IP) refers to creations of the mind that have commercial value and are protectable under law. The four primary categories of IP rights in India are:</p>
          
          <ul>
            <li>Patents</li>
            <li>Trademarks</li>
            <li>Copyrights</li>
            <li>Industrial Designs</li>
          </ul>
          
          <h2>Patent Protection</h2>
          
          <h3>What Can Be Patented?</h3>
          <p>In India, patents are granted for inventions that are:</p>
          <ul>
            <li>Novel (new)</li>
            <li>Involve an inventive step (non-obvious)</li>
            <li>Capable of industrial application</li>
          </ul>
          
          <h3>What Cannot Be Patented?</h3>
          <ul>
            <li>Discoveries of natural phenomena</li>
            <li>Abstract theories or mathematical methods</li>
            <li>Aesthetic creations</li>
            <li>Methods of medical treatment</li>
            <li>Plants and animals</li>
            <li>Business methods and computer programs per se</li>
          </ul>
          
          <h3>Patent Application Process</h3>
          <ol>
            <li><strong>Prior Art Search:</strong> Determine if your invention is truly novel</li>
            <li><strong>Filing Application:</strong> Submit application to Indian Patent Office with specifications, claims, drawings, and abstract</li>
            <li><strong>Publication:</strong> Application published after 18 months from filing date</li>
            <li><strong>Request for Examination:</strong> Must be filed within 48 months of priority date</li>
            <li><strong>Examination:</strong> Patent examiner reviews application</li>
            <li><strong>Response to Objections:</strong> Address any objections raised by examiner</li>
            <li><strong>Grant of Patent:</strong> If approved, patent is granted for 20 years from filing date</li>
          </ol>
          
          <h3>Patent Maintenance</h3>
          <p>Annual renewal fees must be paid to maintain patent protection.</p>
          
          <h2>Trademark Protection</h2>
          
          <h3>What Can Be Trademarked?</h3>
          <p>Trademarks can include:</p>
          <ul>
            <li>Words, names, and phrases</li>
            <li>Logos and symbols</li>
            <li>Colors and color combinations</li>
            <li>Shapes</li>
            <li>Sounds</li>
            <li>Packaging</li>
          </ul>
          
          <h3>Trademark Registration Process</h3>
          <ol>
            <li><strong>Trademark Search:</strong> Check if similar marks exist in your category</li>
            <li><strong>Filing Application:</strong> Submit application to Trademark Registry</li>
            <li><strong>Examination:</strong> Application examined for distinctiveness and conflicts</li>
            <li><strong>Publication:</strong> If accepted, mark published in Trade Marks Journal</li>
            <li><strong>Opposition Period:</strong> Third parties have 4 months to oppose registration</li>
            <li><strong>Registration:</strong> If no opposition or opposition resolved, trademark registered</li>
          </ol>
          
          <h3>Classification System</h3>
          <p>India follows the Nice Classification system with 45 classes (34 for goods, 11 for services). Registration is specific to classes applied for.</p>
          
          <h3>Trademark Validity</h3>
          <p>Trademark registration is valid for 10 years and can be renewed indefinitely for subsequent 10-year periods.</p>
          
          <h2>Copyright Protection</h2>
          
          <h3>Works Protected by Copyright</h3>
          <ul>
            <li>Literary works</li>
            <li>Dramatic works</li>
            <li>Musical works</li>
            <li>Artistic works</li>
            <li>Cinematograph films</li>
            <li>Sound recordings</li>
            <li>Computer programs</li>
          </ul>
          
          <h3>Copyright Registration</h3>
          <p>Copyright protection is automatic upon creation in India, but registration provides stronger evidence of ownership.</p>
          
          <ol>
            <li><strong>Filing Application:</strong> Submit application to Copyright Office</li>
            <li><strong>Examination:</strong> Application reviewed</li>
            <li><strong>Publication:</strong> Notice of application published</li>
            <li><strong>Opposition Period:</strong> 30 days for objections</li>
            <li><strong>Registration:</strong> If no objections or objections resolved, copyright registered</li>
          </ol>
          
          <h3>Duration of Copyright</h3>
          <ul>
            <li><strong>Literary, dramatic, musical, and artistic works:</strong> Lifetime of author + 60 years</li>
            <li><strong>Photographs, cinematograph films, sound recordings, and works of government:</strong> 60 years from publication</li>
          </ul>
          
          <h2>Industrial Design Protection</h2>
          
          <h3>What Can Be Protected as a Design?</h3>
          <p>Features of shape, configuration, pattern, ornament, or composition of lines or colors applied to any article through industrial process, which are:</p>
          <ul>
            <li>Novel or original</li>
            <li>Not previously published in India</li>
            <li>Appealing to and judged solely by the eye</li>
          </ul>
          
          <h3>Design Registration Process</h3>
          <ol>
            <li><strong>Filing Application:</strong> Submit application with representations of the design</li>
            <li><strong>Examination:</strong> Application examined for novelty and originality</li>
            <li><strong>Registration:</strong> If approved, design registered and certificate issued</li>
          </ol>
          
          <h3>Duration of Design Protection</h3>
          <p>Design registration is valid for 10 years, extendable for another 5 years.</p>
          
          <h2>Trade Secrets Protection</h2>
          
          <p>Unlike other forms of IP, trade secrets are not registered but protected through:</p>
          <ul>
            <li>Non-disclosure agreements</li>
            <li>Confidentiality clauses in employment contracts</li>
            <li>Physical and digital security measures</li>
            <li>Access restrictions</li>
          </ul>
          
          <h2>Geographical Indications</h2>
          
          <p>Geographical Indications (GIs) identify goods originating from a specific geographical location with qualities attributable to that origin (e.g., Darjeeling Tea, Basmati Rice).</p>
          
          <p>GIs are registered for 10 years and can be renewed indefinitely.</p>
          
          <h2>Enforcement of IP Rights</h2>
          
          <h3>Civil Remedies</h3>
          <ul>
            <li>Injunctions</li>
            <li>Damages</li>
            <li>Account of profits</li>
            <li>Delivery and destruction of infringing goods</li>
          </ul>
          
          <h3>Criminal Remedies</h3>
          <p>Available for trademark counterfeiting and copyright piracy:</p>
          <ul>
            <li>Imprisonment</li>
            <li>Fines</li>
            <li>Seizure of infringing goods</li>
          </ul>
          
          <h3>Border Measures</h3>
          <p>Customs officials can seize suspected counterfeit or pirated goods at borders.</p>
          
          <h2>International IP Protection</h2>
          
          <p>For protection beyond India, consider:</p>
          <ul>
            <li><strong>Paris Convention:</strong> Priority filing in member countries</li>
            <li><strong>Patent Cooperation Treaty (PCT):</strong> Simplified patent filing in multiple countries</li>
            <li><strong>Madrid Protocol:</strong> International trademark registration</li>
            <li><strong>Berne Convention:</strong> International copyright protection</li>
            <li><strong>Hague Agreement:</strong> International design registration</li>
          </ul>
          
          <p>This guide provides a foundation for understanding IP protection in India. Given the complexity and technical nature of IP law, consulting with an IP attorney is recommended for specific situations.</p>
        `
      }
    ],
    templates: [
      {
        id: "template1",
        title: "Rental Agreement",
        category: "Real Estate",
        description: "Standard template for residential property rental agreements.",
        downloadLink: "#",
        content: `
          <h1>RESIDENTIAL RENTAL AGREEMENT</h1>
          
          <p><strong>THIS RENTAL AGREEMENT</strong> (hereinafter referred to as the "Agreement") is made and executed on this [DAY] day of [MONTH], [YEAR] at [PLACE].</p>
          
          <p><strong>BETWEEN</strong></p>
          
          <p>[LANDLORD NAME], [Age], [Occupation], son/daughter/wife of [FATHER/HUSBAND NAME], resident of [COMPLETE ADDRESS] (hereinafter referred to as the "LANDLORD", which expression shall, unless repugnant to the context or meaning thereof, be deemed to include his/her heirs, executors, administrators, legal representatives and assigns) of the ONE PART;</p>
          
          <p><strong>AND</strong></p>
          
          <p>[TENANT NAME], [Age], [Occupation], son/daughter/wife of [FATHER/HUSBAND NAME], resident of [COMPLETE ADDRESS] (hereinafter referred to as the "TENANT", which expression shall, unless repugnant to the context or meaning thereof, be deemed to include his/her heirs, executors, administrators, legal representatives and assigns) of the OTHER PART.</p>
          
          <p>The LANDLORD and TENANT are hereinafter collectively referred to as "Parties" and individually as a "Party".</p>
          
          <p><strong>WHEREAS:</strong></p>
          
          <ol type="A">
            <li>The LANDLORD is the absolute and lawful owner of the residential premises bearing No. [HOUSE/FLAT NUMBER], [FLOOR], [BUILDING NAME/NUMBER], [COLONY/STREET], [LOCALITY], [CITY], [PIN CODE], [STATE] (hereinafter referred to as the "Premises");</li>
            
            <li>The LANDLORD has agreed to let out and the TENANT has agreed to take on rent the said Premises for residential purposes on the terms and conditions as set out hereinafter.</li>
          </ol>
          
          <p><strong>NOW THIS AGREEMENT WITNESSETH AND IT IS HEREBY AGREED BY AND BETWEEN THE PARTIES HERETO AS FOLLOWS:</strong></p>
          
          <p><strong>1. PREMISES</strong></p>
          <p>1.1 The LANDLORD hereby lets out to the TENANT and the TENANT hereby takes on rent from the LANDLORD, the Premises for a period of [DURATION] months/years commencing from [START DATE] and ending on [END DATE] (hereinafter referred to as the "Term").</p>
          
          <p>1.2 The Premises consists of [NUMBER] bedroom(s), [NUMBER] bathroom(s), living room, kitchen, and [OTHER AREAS] with a total covered area of approximately [AREA] square feet.</p>
          
          <p><strong>2. RENT AND DEPOSIT</strong></p>
          <p>2.1 The monthly rent for the Premises shall be Rs. [AMOUNT IN FIGURES]/- (Rupees [AMOUNT IN WORDS] only), payable in advance on or before the [DAY] day of each month.</p>
          
          <p>2.2 The TENANT has paid to the LANDLORD a sum of Rs. [AMOUNT IN FIGURES]/- (Rupees [AMOUNT IN WORDS] only) as interest-free security deposit (hereinafter referred to as the "Security Deposit"), the receipt of which the LANDLORD hereby acknowledges.</p>
          
          <p>2.3 The Security Deposit shall be refunded by the LANDLORD to the TENANT at the time of vacating the Premises after deducting therefrom any amounts towards:</p>
          <ul>
            <li>Unpaid rent, maintenance charges, or utility bills;</li>
            <li>Cost of repairs beyond normal wear and tear;</li>
            <li>Any other amounts due from the TENANT under this Agreement.</li>
          </ul>
          
          <p><strong>3. MAINTENANCE AND REPAIRS</strong></p>
          <p>3.1 The TENANT shall maintain the Premises in good and tenantable condition and shall not cause any damage to the Premises or any part thereof.</p>
          
          <p>3.2 The TENANT shall be responsible for minor repairs and maintenance of the Premises, including but not limited to faucets, switches, electrical fixtures, and glass breakage.</p>
          
          <p>3.3 The LANDLORD shall be responsible for major repairs, including but not limited to structural repairs, roof leakage, major plumbing issues, and electrical wiring defects.</p>
          
          <p><strong>4. UTILITIES AND TAXES</strong></p>
          <p>4.1 The TENANT shall be liable to pay all charges for electricity, water, gas, telecommunications, and other utilities consumed in the Premises during the Term based on actual consumption.</p>
          
          <p>4.2 The LANDLORD shall be responsible for payment of property tax and any other taxes levied by local authorities on the Premises.</p>
          
          <p><strong>5. USE OF PREMISES</strong></p>
          <p>5.1 The Premises shall be used solely for residential purposes by the TENANT and his/her family members, namely [NAMES OF FAMILY MEMBERS], and not for any commercial, illegal, or immoral purposes.</p>
          
          <p>5.2 The TENANT shall not sublet, assign, or part with possession of the Premises or any part thereof to any person without prior written consent of the LANDLORD.</p>
          
          <p>5.3 The TENANT shall not carry out any structural alterations or additions to the Premises without prior written consent of the LANDLORD.</p>
          
          <p><strong>6. TERMINATION</strong></p>
          <p>6.1 Either Party may terminate this Agreement by giving [NUMBER] months' prior written notice to the other Party.</p>
          
          <p>6.2 The LANDLORD shall have the right to terminate this Agreement forthwith in case of:</p>
          <ul>
            <li>Non-payment of rent for [NUMBER] consecutive months;</li>
            <li>Breach of any terms and conditions of this Agreement by the TENANT;</li>
            <li>Use of the Premises for purposes other than residential.</li>
          </ul>
          
          <p><strong>7. LANDLORD'S RIGHT TO INSPECTION</strong></p>
          <p>The LANDLORD or his/her authorized representative shall have the right to enter and inspect the Premises at reasonable times during daytime after giving prior notice of at least 24 hours to the TENANT, except in case of emergency.</p>
          
          <p><strong>8. INVENTORY</strong></p>
          <p>An inventory of furniture, fixtures, and fittings provided by the LANDLORD in the Premises is annexed hereto as Annexure-A and signed by both Parties.</p>
          
          <p><strong>9. DISPUTE RESOLUTION</strong></p>
          <p>9.1 Any dispute arising out of or in connection with this Agreement shall be resolved amicably between the Parties.</p>
          
          <p>9.2 If the dispute cannot be resolved amicably, it shall be referred to arbitration in accordance with the provisions of the Arbitration and Conciliation Act, 1996. The place of arbitration shall be [CITY] and the language of arbitration shall be English.</p>
          
          <p><strong>10. NOTICES</strong></p>
          <p>Any notice required to be served under this Agreement shall be deemed to have been duly served if delivered personally or sent by registered post or speed post to the Parties at their respective addresses mentioned above.</p>
          
          <p><strong>11. GOVERNING LAW</strong></p>
          <p>This Agreement shall be governed by and construed in accordance with the laws of India.</p>
          
          <p><strong>12. REGISTRATION</strong></p>
          <p>This Agreement shall be registered with the appropriate Sub-Registrar of Assurances at the cost of the [LANDLORD/TENANT].</p>
          
          <p><strong>13. MISCELLANEOUS</strong></p>
          <p>13.1 This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior agreements or understandings, if any.</p>
          
          <p>13.2 Any amendments to this Agreement shall be in writing and signed by both Parties.</p>
          
          <p>IN WITNESS WHEREOF, the Parties hereto have executed this Agreement as of the day and year first above written.</p>
          
          <p>
          <strong>SIGNED AND DELIVERED</strong><br>
          by the within named LANDLORD<br>
          [LANDLORD NAME]<br>
          in the presence of:
          </p>
          
          <p>
          <strong>SIGNED AND DELIVERED</strong><br>
          by the within named TENANT<br>
          [TENANT NAME]<br>
          in the presence of:
          </p>
          
          <p><strong>WITNESSES:</strong></p>
          
          <p>
          1. [Name and Address of Witness 1]<br>
          Signature:
          </p>
          
          <p>
          2. [Name and Address of Witness 2]<br>
          Signature:
          </p>
          
          <p><strong>ANNEXURE-A</strong><br>INVENTORY OF FURNITURE, FIXTURES, AND FITTINGS</p>
        `
      },
      {
        id: "template2",
        title: "Employment Contract",
        category: "Employment Law",
        description: "Comprehensive employment agreement template with customizable clauses.",
        downloadLink: "#",
        content: `
          <h1>EMPLOYMENT AGREEMENT</h1>
          
          <p><strong>THIS EMPLOYMENT AGREEMENT</strong> (hereinafter referred to as the "Agreement") is made and executed on this [DAY] day of [MONTH], [YEAR] at [PLACE].</p>
          
          <p><strong>BETWEEN</strong></p>
          
          <p>[COMPANY NAME], a company incorporated under the Companies Act, 2013, having its registered office at [COMPLETE ADDRESS], represented by its [DESIGNATION] Mr./Ms. [NAME] (hereinafter referred to as the "EMPLOYER", which expression shall, unless repugnant to the context or meaning thereof, be deemed to include its successors and assigns) of the ONE PART;</p>
          
          <p><strong>AND</strong></p>
          
          <p>Mr./Ms. [EMPLOYEE NAME], son/daughter of [FATHER'S NAME], residing at [COMPLETE ADDRESS], holding Aadhaar No. [AADHAAR NUMBER] and PAN [PAN NUMBER] (hereinafter referred to as the "EMPLOYEE", which expression shall, unless repugnant to the context or meaning thereof, be deemed to include his/her heirs, executors and administrators) of the OTHER PART;</p>
          
          <p>The EMPLOYER and the EMPLOYEE are hereinafter collectively referred to as "Parties" and individually as a "Party".</p>
          
          <p><strong>WHEREAS:</strong></p>
          
          <ol type="A">
            <li>The EMPLOYER is engaged in the business of [NATURE OF BUSINESS];</li>
            <li>The EMPLOYER wishes to employ the EMPLOYEE in the capacity of [DESIGNATION] and the EMPLOYEE has agreed to accept the employment on the terms and conditions set forth herein.</li>
          </ol>
          
          <p><strong>NOW THIS AGREEMENT WITNESSETH AND IT IS HEREBY AGREED BY AND BETWEEN THE PARTIES HERETO AS FOLLOWS:</strong></p>
          
          <p><strong>1. APPOINTMENT AND TERM</strong></p>
          
          <p>1.1 The EMPLOYER hereby employs the EMPLOYEE and the EMPLOYEE hereby accepts employment with the EMPLOYER as [DESIGNATION] with effect from [START DATE] (hereinafter referred to as the "Effective Date").</p>
          
          <p>1.2 The EMPLOYEE shall be on probation for a period of [DURATION] months from the Effective Date. During this probation period, either Party may terminate this Agreement by giving [DURATION] days' written notice.</p>
          
          <p>1.3 Upon successful completion of the probation period, the EMPLOYEE shall be confirmed in service, and thereafter, this Agreement may be terminated as provided in Clause 11 hereof.</p>
          
          <p><strong>2. JOB TITLE AND DUTIES</strong></p>
          
          <p>2.1 The EMPLOYEE shall serve the EMPLOYER in the capacity of [DESIGNATION] and shall report to [REPORTING MANAGER/DESIGNATION].</p>
          
          <p>2.2 The EMPLOYEE shall perform the following duties and responsibilities:</p>
          <ul>
            <li>[LIST OF KEY RESPONSIBILITIES]</li>
            <li>[...]</li>
            <li>[...]</li>
          </ul>
          
          <p>2.3 The EMPLOYEE shall also perform such other duties as may be assigned to him/her from time to time by the EMPLOYER that are consistent with his/her position.</p>
          
          <p>2.4 The EMPLOYEE shall devote his/her full time, attention, and abilities to the business of the EMPLOYER during the term of his/her employment and shall not, without prior written consent of the EMPLOYER, be engaged in any other business activity, whether or not such business activity is pursued for gain, profit or other pecuniary advantage.</p>
          
          <p><strong>3. PLACE OF WORK</strong></p>
          
          <p>3.1 The EMPLOYEE shall be based at the EMPLOYER's office located at [OFFICE ADDRESS].</p>
          
          <p>3.2 The EMPLOYEE may be required to travel within India and abroad as may be necessary for the proper discharge of his/her duties.</p>
          
          <p>3.3 The EMPLOYER reserves the right to transfer the EMPLOYEE to any of its other offices or establishments, existing or future.</p>
          
          <p><strong>4. WORKING HOURS AND HOLIDAYS</strong></p>
          
          <p>4.1 The normal working hours shall be from [START TIME] to [END TIME], [NUMBER] days a week.</p>
          
          <p>4.2 The EMPLOYEE shall be entitled to [NUMBER] days of paid leave per annum as per the EMPLOYER's leave policy.</p>
          
          <p>4.3 The EMPLOYEE shall be entitled to all public holidays declared by the EMPLOYER.</p>
          
          <p>4.4 The EMPLOYER may require the EMPLOYEE to work additional hours as may be necessary for the proper performance of his/her duties without any additional remuneration.</p>
          
          <p><strong>5. COMPENSATION AND BENEFITS</strong></p>
          
          <p>5.1 The EMPLOYEE shall receive a gross salary of Rs. [AMOUNT IN FIGURES]/- (Rupees [AMOUNT IN WORDS] only) per month, payable on or before the [DAY] day of the following month.</p>
          
          <p>5.2 The salary shall be subject to deductions for income tax, professional tax, provident fund, and any other statutory deductions as applicable.</p>
          
          <p>5.3 The EMPLOYEE shall be eligible for the following benefits:</p>
          <ul>
            <li>Provident Fund as per the Employees' Provident Fund and Miscellaneous Provisions Act, 1952;</li>
            <li>Gratuity as per the Payment of Gratuity Act, 1972;</li>
            <li>Health Insurance coverage for self and dependents as per the EMPLOYER's policy;</li>
            <li>[ANY OTHER BENEFITS]</li>
          </ul>
          
          <p>5.4 The EMPLOYEE's performance shall be reviewed annually, and the salary may be revised based on performance and the EMPLOYER's policies.</p>
          
          <p><strong>6. CONFIDENTIALITY</strong></p>
          
          <p>6.1 The EMPLOYEE shall, during the term of this Agreement and thereafter, keep confidential all information relating to the business, products, affairs and finances of the EMPLOYER and its associated companies, collectively referred to as "Confidential Information".</p>
          
          <p>6.2 The EMPLOYEE shall not, except in the proper course of his/her duties, disclose to any person or use for his/her own purpose any Confidential Information which he/she may acquire during his/her employment.</p>
          
          <p>6.3 The obligations under this clause shall survive the termination or expiration of this Agreement.</p>
          
          <p><strong>7. INTELLECTUAL PROPERTY</strong></p>
          
          <p>7.1 All intellectual property rights, including patents, copyrights, trademarks, designs, and trade secrets, in any work created, developed or modified by the EMPLOYEE during the course of his/her employment shall be the absolute property of the EMPLOYER.</p>
          
          <p>7.2 The EMPLOYEE hereby assigns to the EMPLOYER all right, title, and interest in and to any such intellectual property.</p>
          
          <p><strong>8. NON-COMPETITION AND NON-SOLICITATION</strong></p>
          
          <p>8.1 The EMPLOYEE agrees that during his/her employment and for a period of [DURATION] months thereafter, he/she shall not:</p>
          <ul>
            <li>Be engaged in any business which is competitive with the business of the EMPLOYER;</li>
            <li>Solicit or entice away any customer, client or supplier of the EMPLOYER;</li>
            <li>Solicit or entice away any employee of the EMPLOYER.</li>
          </ul>
          
          <p><strong>9. CODE OF CONDUCT</strong></p>
          
          <p>9.1 The EMPLOYEE shall comply with all rules, regulations, policies and procedures of the EMPLOYER as may be in force from time to time.</p>
          
          <p>9.2 The EMPLOYEE shall not engage in any conduct that may bring disrepute to the EMPLOYER or affect its reputation or goodwill.</p>
          
          <p><strong>10. PERFORMANCE EVALUATION</strong></p>
          
          <p>10.1 The EMPLOYEE's performance shall be evaluated periodically as per the EMPLOYER's performance evaluation policy.</p>
          
          <p>10.2 The EMPLOYEE shall participate in setting performance objectives and shall make best efforts to achieve the same.</p>
          
          <p><strong>11. TERMINATION</strong></p>
          
          <p>11.1 After confirmation, either Party may terminate this Agreement by giving [DURATION] months' written notice or salary in lieu thereof.</p>
          
          <p>11.2 The EMPLOYER may terminate this Agreement forthwith without notice or payment in lieu of notice if the EMPLOYEE:</p>
          <ul>
            <li>Commits any serious or persistent breach of any term of this Agreement;</li>
            <li>Is guilty of any gross misconduct or negligence in the discharge of his/her duties;</li>
            <li>Is convicted of any criminal offense (except minor traffic violations);</li>
            <li>Becomes of unsound mind or physically incapable of performing his/her duties for a continuous period of [DURATION] days.</li>
          </ul>
          
          <p>11.3 Upon termination of employment, the EMPLOYEE shall immediately return to the EMPLOYER all property, documents, and materials in his/her possession or under his/her control that belong to the EMPLOYER.</p>
          
          <p><strong>12. DISPUTE RESOLUTION</strong></p>
          
          <p>12.1 Any dispute arising out of or in connection with this Agreement shall be resolved amicably between the Parties.</p>
          
          <p>12.2 If the dispute cannot be resolved amicably, it shall be referred to arbitration in accordance with the provisions of the Arbitration and Conciliation Act, 1996. The place of arbitration shall be [CITY] and the language of arbitration shall be English.</p>
          
          <p><strong>13. GOVERNING LAW</strong></p>
          
          <p>This Agreement shall be governed by and construed in accordance with the laws of India.</p>
          
          <p><strong>14. ENTIRE AGREEMENT</strong></p>
          
          <p>This Agreement constitutes the entire understanding between the Parties with respect to the subject matter hereof and supersedes all prior agreements, understandings, or negotiations.</p>
          
          <p><strong>15. AMENDMENTS</strong></p>
          
          <p>No amendment, change, or modification of this Agreement shall be valid unless in writing and signed by both Parties.</p>
          
          <p><strong>16. SEVERABILITY</strong></p>
          
          <p>If any provision of this Agreement is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced.</p>
          
          <p>IN WITNESS WHEREOF, the Parties hereto have executed this Agreement as of the day and year first above written.</p>
          
          <p>
          <strong>For and on behalf of [COMPANY NAME]</strong><br>
          <br>
          <br>
          _____________________________<br>
          [Name and Designation]<br>
          Authorized Signatory
          </p>
          
          <p>
          <strong>EMPLOYEE</strong><br>
          <br>
          <br>
          _____________________________<br>
          [EMPLOYEE NAME]
          </p>
          
          <p><strong>WITNESSES:</strong></p>
          
          <p>
          1. _____________________________<br>
          [Name and Address of Witness 1]
          </p>
          
          <p>
          2. _____________________________<br>
          [Name and Address of Witness 2]
          </p>
        `
      },
      {
        id: "template3",
        title: "NDA Template",
        category: "Business Law",
        description: "Non-disclosure agreement to protect sensitive business information.",
        downloadLink: "#",
        content: `
          <h1>NON-DISCLOSURE AGREEMENT</h1>
          
          <p><strong>THIS NON-DISCLOSURE AGREEMENT</strong> (hereinafter referred to as the "Agreement") is made and entered into on this [DAY] day of [MONTH], [YEAR] (the "Effective Date"),</p>
          
          <p><strong>BETWEEN</strong></p>
          
          <p>[COMPANY NAME], a company incorporated under the Companies Act, 2013, having its registered office at [COMPLETE ADDRESS], represented by its [DESIGNATION] Mr./Ms. [NAME] (hereinafter referred to as the "Disclosing Party", which expression shall, unless repugnant to the context or meaning thereof, be deemed to include its successors and assigns) of the ONE PART;</p>
          
          <p><strong>AND</strong></p>
          
          <p>[COMPANY/INDIVIDUAL NAME], [a company incorporated under the Companies Act, 2013, having its registered office at [COMPLETE ADDRESS], represented by its [DESIGNATION] Mr./Ms. [NAME]] OR [an individual residing at [COMPLETE ADDRESS]] (hereinafter referred to as the "Receiving Party", which expression shall, unless repugnant to the context or meaning thereof, be deemed to include its successors and assigns) of the OTHER PART;</p>
          
          <p>The Disclosing Party and the Receiving Party are hereinafter collectively referred to as "Parties" and individually as a "Party".</p>
          
          <p><strong>WHEREAS:</strong></p>
          
          <ol type="A">
            <li>The Parties are exploring/entering into a business relationship concerning [DESCRIBE PURPOSE OF RELATIONSHIP] (the "Purpose");</li>
            <li>In connection with the Purpose, the Disclosing Party may disclose to the Receiving Party certain confidential and proprietary information;</li>
            <li>The Parties wish to ensure that such confidential and proprietary information is maintained in strict confidence.</li>
          </ol>
          
          <p><strong>NOW THEREFORE, in consideration of the mutual covenants contained herein, the Parties agree as follows:</strong></p>
          
          <p><strong>1. DEFINITION OF CONFIDENTIAL INFORMATION</strong></p>
          
          <p>1.1 "Confidential Information" means any information disclosed by the Disclosing Party to the Receiving Party, either directly or indirectly, in writing, orally, by inspection of tangible objects, or by any other means, which:</p>
          <ul>
            <li>is designated as "Confidential," "Proprietary," or some similar designation; or</li>
            <li>is of such a nature that a reasonable person would understand it to be confidential or proprietary; or</li>
            <li>is disclosed in circumstances under which a reasonable person would understand it to be confidential or proprietary.</li>
          </ul>
          
          <p>1.2 Confidential Information may include, but is not limited to:</p>
          <ul>
            <li>Trade secrets;</li>
            <li>Business plans, strategies, forecasts, and analyses;</li>
            <li>Financial information and pricing;</li>
            <li>Customer and supplier information;</li>
            <li>Marketing plans and materials;</li>
            <li>Research and development information;</li>
            <li>Product designs, specifications, and documentation;</li>
            <li>Software, hardware, and systems information;</li>
            <li>Processes, know-how, and algorithms;</li>
            <li>Inventions, devices, and improvements;</li>
            <li>Employee and personnel information;</li>
            <li>Any other information that gives the Disclosing Party a competitive advantage.</li>
          </ul>
          
          <p>1.3 Confidential Information does not include information that:</p>
          <ul>
            <li>was publicly known and made generally available in the public domain prior to the time of disclosure by the Disclosing Party;</li>
            <li>becomes publicly known and made generally available after disclosure by the Disclosing Party through no action or inaction of the Receiving Party;</li>
            <li>is already in the possession of the Receiving Party at the time of disclosure by the Disclosing Party as shown by the Receiving Party's files and records;</li>
            <li>is obtained by the Receiving Party from a third party without a breach of such third party's obligations of confidentiality;</li>
            <li>is independently developed by the Receiving Party without use of or reference to the Disclosing Party's Confidential Information, as shown by the Receiving Party's documents or other competent evidence.</li>
          </ul>
          
          <p><strong>2. NON-DISCLOSURE AND NON-USE OBLIGATIONS</strong></p>
          
          <p>2.1 The Receiving Party shall:</p>
          <ul>
            <li>hold the Confidential Information in strict confidence;</li>
            <li>not disclose such Confidential Information to any third party without the prior written consent of the Disclosing Party;</li>
            <li>protect such Confidential Information from unauthorized use, disclosure, or dissemination with the same degree of care that it uses to protect its own confidential information of a similar nature, but in no event with less than reasonable care;</li>
            <li>use the Confidential Information solely for the Purpose and not for any other purpose;</li>
            <li>not reverse engineer, disassemble, or decompile any prototypes, software, or other tangible objects which embody the Confidential Information;</li>
            <li>take all necessary precautions to prevent unauthorized disclosure or use of the Confidential Information.</li>
          </ul>
          
          <p>2.2 The Receiving Party may disclose Confidential Information to its directors, officers, employees, consultants, advisors, and agents (collectively, "Representatives") who:</p>
          <ul>
            <li>have a need to know such information for the Purpose;</li>
            <li>have been informed of the confidential nature of the information;</li>
            <li>are bound by confidentiality obligations no less restrictive than those contained herein.</li>
          </ul>
          
          <p>2.3 The Receiving Party shall be responsible for any breach of this Agreement by its Representatives.</p>
          
          <p><strong>3. REQUIRED DISCLOSURE</strong></p>
          
          <p>3.1 The Receiving Party may disclose Confidential Information if required to do so by law, regulation, court order, or other legal process, provided that:</p>
          <ul>
            <li>the Receiving Party gives the Disclosing Party prompt written notice of such requirement prior to the disclosure;</li>
            <li>the Receiving Party provides the Disclosing Party with reasonable assistance in seeking a protective order or other appropriate remedy;</li>
            <li>the Receiving Party discloses only that portion of the Confidential Information which is legally required to be disclosed;</li>
            <li>the Receiving Party uses reasonable efforts to ensure that such Confidential Information is treated confidentially by the recipient.</li>
          </ul>
          
          <p><strong>4. OWNERSHIP OF CONFIDENTIAL INFORMATION</strong></p>
          
          <p>4.1 All Confidential Information shall remain the property of the Disclosing Party.</p>
          
          <p>4.2 The disclosure of Confidential Information shall not be construed as granting any license or rights under any patent, copyright, trademark, or other intellectual property right, nor shall it be construed as granting any right of ownership in the Confidential Information.</p>
          
          <p><strong>5. RETURN OR DESTRUCTION OF CONFIDENTIAL INFORMATION</strong></p>
          
          <p>5.1 Upon the earlier of:</p>
          <ul>
            <li>the completion or termination of the Purpose;</li>
            <li>the termination of this Agreement; or</li>
            <li>a written request by the Disclosing Party,</li>
          </ul>
          <p>the Receiving Party shall promptly:</p>
          <ul>
            <li>return to the Disclosing Party all tangible materials containing Confidential Information; or</li>
            <li>destroy all such materials and certify in writing to the Disclosing Party that such destruction has occurred.</li>
          </ul>
          
          <p>5.2 Notwithstanding the foregoing, the Receiving Party may retain one copy of the Confidential Information in its confidential files for the sole purpose of maintaining a record of the information that was disclosed, provided that such information shall remain subject to the terms of this Agreement.</p>
          
          <p><strong>6. TERM AND TERMINATION</strong></p>
          
          <p>6.1 This Agreement shall commence on the Effective Date and shall continue for a period of [DURATION] years thereafter, unless earlier terminated by mutual written agreement of the Parties.</p>
          
          <p>6.2 The obligations of confidentiality and non-use under this Agreement shall survive any termination or expiration of this Agreement for a period of [DURATION] years thereafter.</p>
          
          <p><strong>7. REMEDIES</strong></p>
          
          <p>7.1 The Receiving Party acknowledges that any breach of this Agreement may cause irreparable harm to the Disclosing Party for which monetary damages may be inadequate.</p>
          
          <p>7.2 In the event of a breach or threatened breach of this Agreement, the Disclosing Party shall be entitled to seek injunctive relief, specific performance, and any other equitable remedies without the necessity of posting a bond or proving actual damages, in addition to all other remedies available at law or in equity.</p>
          
          <p><strong>8. NO WARRANTY</strong></p>
          
          <p>8.1 All Confidential Information is provided "AS IS" without any warranty, express or implied, regarding its accuracy, completeness, or performance.</p>
          
          <p><strong>9. NO OBLIGATION</strong></p>
          
          <p>9.1 Nothing in this Agreement shall obligate either Party to proceed with any transaction or relationship.</p>
          
          <p>9.2 Nothing in this Agreement shall be construed as creating a joint venture, partnership, employment, or agency relationship between the Parties.</p>
          
          <p><strong>10. NO PUBLICITY</strong></p>
          
          <p>10.1 Neither Party shall disclose the existence or content of this Agreement or the discussions between the Parties without the prior written consent of the other Party.</p>
          
          <p><strong>11. GENERAL PROVISIONS</strong></p>
          
          <p>11.1 <u>Governing Law</u>. This Agreement shall be governed by and construed in accordance with the laws of India without regard to its conflict of law provisions.</p>
          
          <p>11.2 <u>Dispute Resolution</u>. Any dispute arising out of or in connection with this Agreement shall be resolved through arbitration in accordance with the Arbitration and Conciliation Act, 1996. The place of arbitration shall be [CITY] and the language of arbitration shall be English.</p>
          
          <p>11.3 <u>Entire Agreement</u>. This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior agreements, understandings, or negotiations.</p>
          
          <p>11.4 <u>Amendments</u>. This Agreement may not be amended except by a written instrument signed by both Parties.</p>
          
          <p>11.5 <u>Severability</u>. If any provision of this Agreement is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced.</p>
          
          <p>11.6 <u>Waiver</u>. No failure or delay by either Party in exercising any right under this Agreement shall operate as a waiver thereof.</p>
          
          <p>11.7 <u>Assignment</u>. Neither Party may assign this Agreement or any rights or obligations hereunder without the prior written consent of the other Party.</p>
          
          <p>11.8 <u>Counterparts</u>. This Agreement may be executed in counterparts, each of which shall be deemed an original, but all of which together shall constitute one and the same instrument.</p>
          
          <p>IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.</p>
          
          <p>
          <strong>For and on behalf of [DISCLOSING PARTY NAME]</strong><br>
          <br>
          <br>
          _____________________________<br>
          [Name and Designation]<br>
          Authorized Signatory
          </p>
          
          <p>
          <strong>For and on behalf of [RECEIVING PARTY NAME]</strong><br>
          <br>
          <br>
          _____________________________<br>
          [Name and Designation]<br>
          Authorized Signatory
          </p>
          
          <p><strong>WITNESSES:</strong></p>
          
          <p>
          1. _____________________________<br>
          [Name and Address of Witness 1]
          </p>
          
          <p>
          2. _____________________________<br>
          [Name and Address of Witness 2]
          </p>
        `
      },
      {
        id: "template4",
        title: "Will and Testament",
        category: "Estate Planning",
        description: "Basic template for creating a legally valid will document.",
        downloadLink: "#",
        content: `
          <h1>LAST WILL AND TESTAMENT</h1>
          
          <p><strong>I, [FULL NAME], son/daughter of [FATHER'S NAME], residing at [COMPLETE ADDRESS], aged about [AGE] years, do hereby revoke all former Wills, Codicils, and testamentary dispositions made by me and declare this to be my last Will and Testament.</strong></p>
          
          <p><strong>1. PRELIMINARY DECLARATIONS</strong></p>
          
          <p>1.1 I am of sound mind and memory and am making this Will voluntarily and without any undue influence or coercion.</p>
          
          <p>1.2 I am married to [SPOUSE'S NAME] and we have [NUMBER] children, namely [NAMES OF CHILDREN WITH AGES].</p>
          
          <p>1.3 This Will disposes of all my property and assets, both movable and immovable, which I own or to which I may be entitled at the time of my death.</p>
          
          <p><strong>2. APPOINTMENT OF EXECUTORS</strong></p>
          
          <p>2.1 I hereby appoint [NAME OF EXECUTOR], residing at [ADDRESS OF EXECUTOR], as the Executor of this Will.</p>
          
          <p>2.2 In the event that [NAME OF EXECUTOR] predeceases me or is unable or unwilling to act as the Executor, I appoint [NAME OF ALTERNATE EXECUTOR], residing at [ADDRESS OF ALTERNATE EXECUTOR], as the alternate Executor of this Will.</p>
          
          <p>2.3 I direct that no security or bond shall be required of my Executor in any jurisdiction.</p>
          
          <p><strong>3. PAYMENT OF DEBTS AND EXPENSES</strong></p>
          
          <p>3.1 I direct my Executor to pay all my just debts, funeral expenses, and the expenses of administering my estate as soon as practicable after my death.</p>
          
          <p><strong>4. BEQUESTS OF SPECIFIC ASSETS</strong></p>
          
          <p>4.1 I give, devise, and bequeath the following specific assets to the following persons:</p>
          
          <p><u>Real Estate Properties:</u></p>
          <ul>
            <li>The residential house bearing No. [HOUSE NUMBER], situated at [COMPLETE ADDRESS], together with all furniture and fixtures therein, to my [RELATIONSHIP] [NAME].</li>
            <li>The agricultural land measuring [AREA] situated at [LOCATION], Survey No. [SURVEY NUMBER], to my [RELATIONSHIP] [NAME].</li>
          </ul>
          
          <p><u>Bank Accounts and Investments:</u></p>
          <ul>
            <li>The balance in my savings account No. [ACCOUNT NUMBER] with [BANK NAME], [BRANCH], to my [RELATIONSHIP] [NAME].</li>
            <li>My fixed deposit No. [FD NUMBER] with [BANK/FINANCIAL INSTITUTION] to my [RELATIONSHIP] [NAME].</li>
            <li>My investment in mutual funds/shares/bonds [SPECIFY DETAILS] to my [RELATIONSHIP] [NAME].</li>
          </ul>
          
          <p><u>Vehicles:</u></p>
          <ul>
            <li>My [MAKE AND MODEL] car bearing Registration No. [REGISTRATION NUMBER] to my [RELATIONSHIP] [NAME].</li>
          </ul>
          
          <p><u>Jewelry and Valuables:</u></p>
          <ul>
            <li>My gold ornaments and jewelry items as detailed in Schedule A annexed hereto to my [RELATIONSHIP] [NAME].</li>
            <li>My collection of [SPECIFY COLLECTION] to my [RELATIONSHIP] [NAME].</li>
          </ul>
          
          <p><u>Other Specific Bequests:</u></p>
          <ul>
            <li>[DESCRIBE SPECIFIC ITEM] to my [RELATIONSHIP] [NAME].</li>
          </ul>
          
          <p><strong>5. RESIDUARY ESTATE</strong></p>
          
          <p>5.1 All the rest, residue, and remainder of my estate, property, and effects of whatsoever nature and wheresoever situated, not hereinbefore specifically disposed of (hereinafter referred to as "my Residuary Estate"), I give, devise, and bequeath to [NAME(S) OF BENEFICIARY(IES)], in the following manner:</p>
          <ul>
            <li>[PERCENTAGE/PROPORTION] to my [RELATIONSHIP] [NAME].</li>
            <li>[PERCENTAGE/PROPORTION] to my [RELATIONSHIP] [NAME].</li>
          </ul>
          
          <p>5.2 If any beneficiary named in this Will predeceases me, then the share of such deceased beneficiary shall devolve upon his/her legal heirs in equal shares/[ALTERNATE BENEFICIARY].</p>
          
          <p><strong>6. GUARDIAN FOR MINOR CHILDREN</strong></p>
          
          <p>6.1 In the event that at the time of my death any of my children are minors, I appoint [NAME OF GUARDIAN], residing at [ADDRESS OF GUARDIAN], as the guardian of the person and property of such minor children.</p>
          
          <p>6.2 In the event that [NAME OF GUARDIAN] predeceases me or is unable or unwilling to act as guardian, I appoint [NAME OF ALTERNATE GUARDIAN], residing at [ADDRESS OF ALTERNATE GUARDIAN], as the alternate guardian.</p>
          
          <p><strong>7. TRUSTS FOR MINORS</strong></p>
          
          <p>7.1 If any beneficiary entitled to receive any benefit under this Will is a minor at the time such benefit becomes distributable, I direct my Executor to hold such benefit in trust for such minor until he/she attains the age of majority.</p>
          
          <p>7.2 During the period of such trust, the Executor shall have the power to apply the income and, if necessary, the capital of the trust for the maintenance, education, and benefit of such minor.</p>
          
          <p><strong>8. POWERS OF EXECUTOR</strong></p>
          
          <p>8.1 I grant to my Executor the following powers, to be exercised according to his/her judgment without further authorization from any court:</p>
          <ul>
            <li>To sell, transfer, and dispose of any asset of my estate at public or private sale for cash or on credit and on such terms as he/she may deem advisable;</li>
            <li>To invest and reinvest the funds of my estate in such manner as he/she may deem appropriate;</li>
            <li>To settle, compromise, or submit to arbitration any debt, claim, or dispute relating to my estate;</li>
            <li>To employ such legal, accounting, and other professional assistance as he/she may deem necessary;</li>
            <li>To distribute my estate in cash or in kind, or partly in cash and partly in kind;</li>
            <li>Generally, to take all such actions as he/she may deem necessary or advisable for the proper administration and distribution of my estate.</li>
          </ul>
          
          <p><strong>9. INTERPRETATION AND GOVERNING LAW</strong></p>
          
          <p>9.1 In the interpretation of this Will, the masculine shall include the feminine and the singular shall include the plural and vice versa where the context so admits or requires.</p>
          
          <p>9.2 This Will shall be construed and take effect in accordance with the laws of India.</p>
          
          <p><strong>10. MISCELLANEOUS</strong></p>
          
          <p>10.1 I request that, if possible, my funeral be conducted in accordance with [SPECIFY ANY PARTICULAR WISHES].</p>
          
          <p>10.2 I direct that my Executor shall have the authority to donate such organs of mine as may be medically suitable for transplantation to save human life, in accordance with the Transplantation of Human Organs Act, 1994.</p>
          
          <p><strong>IN WITNESS WHEREOF</strong>, I, [FULL NAME], the Testator, have signed this Will in the presence of the undersigned witnesses, who have witnessed this Will at my request, in my presence, and in the presence of each other, on this [DAY] day of [MONTH], [YEAR] at [PLACE].</p>
          
          <p>
          <br>
          <br>
          ____________________________<br>
          [TESTATOR'S FULL NAME]<br>
          (Testator)
          </p>
          
          <p><strong>SIGNED</strong> by the above-named Testator as his/her last Will in our presence, who in his/her presence and in the presence of each other, have hereunto subscribed our names as witnesses:</p>
          
          <p>
          <strong>WITNESSES:</strong>
          </p>
          
          <p>
          1. _____________________________<br>
          Name: [WITNESS 1 FULL NAME]<br>
          Address: [WITNESS 1 COMPLETE ADDRESS]<br>
          Occupation: [WITNESS 1 OCCUPATION]
          </p>
          
          <p>
          2. _____________________________<br>
          Name: [WITNESS 2 FULL NAME]<br>
          Address: [WITNESS 2 COMPLETE ADDRESS]<br>
          Occupation: [WITNESS 2 OCCUPATION]
          </p>
          
          <p><strong>SCHEDULE A</strong><br>
          [DETAILED DESCRIPTION OF JEWELRY AND VALUABLE ITEMS]</p>
        `
      }
    ]
  };

  // Filter resources based on search query
  const filterResources = (items) => {
    if (!searchQuery) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  // Handle article click
  const handleResourceClick = (resourceType, resourceId) => {
    let resource;
    
    switch (resourceType) {
      case 'article':
        resource = resources.articles.find(item => item.id === resourceId);
        break;
      case 'guide':
        resource = resources.guides.find(item => item.id === resourceId);
        break;
      case 'template':
        resource = resources.templates.find(item => item.id === resourceId);
        break;
      default:
        return;
    }
    
    if (resource) {
      // In a real app, this might navigate to a detailed view
      // For this implementation, we'll just show a toast and log the content
      toast.success(`Viewing ${resource.title}`);
      navigate(`/resources/${resourceType}/${resourceId}`, { 
        state: { resource } 
      });
    }
  };

  return (
    <PageLayout>
      <section className="bg-gradient-to-b from-secondary/40 to-background py-24">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display">Legal Resources</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Access free legal articles, guides, and document templates to help you navigate common legal situations.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="articles" className="w-full">
              <TabsList className="w-full max-w-md flex justify-between rounded-full bg-muted/50 p-1 mx-auto mb-8">
                <TabsTrigger value="articles" className="rounded-full">
                  Articles
                </TabsTrigger>
                <TabsTrigger value="guides" className="rounded-full">
                  Guides
                </TabsTrigger>
                <TabsTrigger value="templates" className="rounded-full">
                  Templates
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="articles">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filterResources(resources.articles).map((article, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                        <div className="aspect-video bg-muted/50 relative">
                          <div className="absolute top-2 right-2 bg-primary/90 text-white text-xs py-1 px-2 rounded-full">
                            {article.category}
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle 
                            className="hover:text-primary cursor-pointer transition-colors"
                            onClick={() => handleResourceClick('article', article.id)}
                          >
                            {article.title}
                          </CardTitle>
                          <CardDescription>
                            <div className="flex items-center text-xs gap-2">
                              <span>{article.date}</span>
                              <span>•</span>
                              <span>{article.readTime}</span>
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{article.excerpt}</p>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            variant="link" 
                            className="px-0"
                            onClick={() => handleResourceClick('article', article.id)}
                          >
                            Read more →
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                {filterResources(resources.articles).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No articles found matching your search.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="guides">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {filterResources(resources.guides).map((guide, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                      <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
                        <div className="aspect-[3/2] bg-muted/50 relative">
                          <div className="absolute top-2 right-2 bg-primary/90 text-white text-xs py-1 px-2 rounded-full">
                            {guide.category}
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle 
                            className="hover:text-primary cursor-pointer transition-colors"
                            onClick={() => handleResourceClick('guide', guide.id)}
                          >
                            {guide.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-muted-foreground text-sm">{guide.excerpt}</p>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleResourceClick('guide', guide.id)}
                          >
                            View Guide
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                {filterResources(resources.guides).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No guides found matching your search.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="templates">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filterResources(resources.templates).map((template, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                      <Card className="h-full hover:shadow-md transition-all">
                        <CardHeader className="pb-2">
                          <div className="text-xs font-medium text-primary mb-1">
                            {template.category}
                          </div>
                          <CardTitle className="text-lg">{template.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-muted-foreground text-sm">{template.description}</p>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => handleResourceClick('template', template.id)}
                          >
                            View Template
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                {filterResources(resources.templates).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No templates found matching your search.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
      
      <section className="py-24 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 font-display">Need Personalized Legal Help?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our resources provide general information, but every legal situation is unique.
              Connect with a qualified lawyer for advice tailored to your specific needs.
            </p>
            <Button 
              size="lg" 
              className="animate-pulse"
              onClick={() => navigate("/find-lawyer")}
            >
              Find Your Legal Match
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ResourcesPage;

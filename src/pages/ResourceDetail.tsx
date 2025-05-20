
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, Clock3Icon, BookmarkIcon, ArrowLeft, BookOpenIcon, FileTextIcon, FileIcon, Link } from "lucide-react";
import { toast } from "sonner";

// Mock resources data - in a real app this would come from an API
const resources = [
  {
    id: "1",
    type: "article",
    title: "Understanding Legal Rights in Property Disputes",
    description: "Learn about the fundamental legal rights you have when dealing with property disputes in India. This comprehensive article covers key aspects of property law and common issues faced by property owners.",
    category: "Property Law",
    date: "May 15, 2025",
    readTime: "10 min read",
    content: `
      <h2>Introduction to Property Disputes</h2>
      <p>Property disputes are common in India, arising from various factors such as unclear titles, boundary issues, inheritance conflicts, and more. Understanding your legal rights is crucial to protecting your property interests.</p>
      
      <h2>Common Types of Property Disputes</h2>
      <p>Property disputes in India typically fall into several categories:</p>
      <ul>
        <li><strong>Boundary disputes</strong> - Disagreements about where one property ends and another begins</li>
        <li><strong>Title disputes</strong> - Conflicts about who actually owns a piece of property</li>
        <li><strong>Inheritance disputes</strong> - Disagreements among heirs about property distribution</li>
        <li><strong>Tenant-landlord disputes</strong> - Conflicts between property owners and tenants</li>
        <li><strong>Encroachment issues</strong> - When someone builds or extends structures onto neighboring property</li>
      </ul>
      
      <h2>Key Legal Rights in Property Matters</h2>
      <p>As a property owner in India, you have several fundamental rights protected by law:</p>
      <ul>
        <li>The right to possess and enjoy your property peacefully</li>
        <li>The right to exclude others from entering or using your property</li>
        <li>The right to transfer ownership through sale, gift, or will</li>
        <li>The right to reasonable use of your property within zoning laws</li>
        <li>The right to seek legal remedies for property violations</li>
      </ul>
      
      <h2>Important Property Laws in India</h2>
      <p>Several key laws govern property rights and disputes in India:</p>
      <ul>
        <li>The Transfer of Property Act, 1882</li>
        <li>The Registration Act, 1908</li>
        <li>The Indian Succession Act, 1925</li>
        <li>The Specific Relief Act, 1963</li>
        <li>Various state-specific property and tenancy laws</li>
      </ul>
      
      <h2>Legal Documents for Property Protection</h2>
      <p>To protect your property rights, ensure you have these key documents:</p>
      <ul>
        <li>Sale deed or title deed</li>
        <li>Property tax receipts</li>
        <li>Survey documents with clear boundaries</li>
        <li>Mutation records showing your name in government records</li>
        <li>Encumbrance certificate showing no outstanding loans on the property</li>
      </ul>
      
      <h2>Resolving Property Disputes</h2>
      <p>When facing a property dispute, you have several options:</p>
      <ul>
        <li><strong>Negotiation</strong> - Direct discussion with the opposing party</li>
        <li><strong>Mediation</strong> - Using a neutral third party to facilitate agreement</li>
        <li><strong>Legal notice</strong> - Formal communication through a lawyer</li>
        <li><strong>Civil lawsuit</strong> - Filing a case in the appropriate civil court</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Understanding your legal rights in property disputes is essential for protecting your interests. When facing any property-related conflict, it's advisable to consult with a qualified property law expert to assess your specific situation and recommend the most appropriate course of action.</p>
    `,
    relatedResources: ["2", "9", "3"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop",
    gradient: "bg-gradient-to-r from-blue-50 to-indigo-100"
  },
  {
    id: "2",
    type: "guide",
    title: "Complete Guide to Filing a Consumer Complaint",
    description: "A step-by-step guide to help you navigate the process of filing a consumer complaint under the Consumer Protection Act. Includes templates and examples for effective complaints.",
    category: "Consumer Law",
    date: "May 10, 2025",
    readTime: "15 min read",
    gradient: "bg-gradient-to-r from-emerald-50 to-teal-100",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
    content: `
      <h2>Understanding Consumer Rights</h2>
      <p>Before filing a complaint, it's important to understand your rights as a consumer under the Consumer Protection Act, 2019.</p>
      
      <h2>When to File a Consumer Complaint</h2>
      <p>You can file a consumer complaint when:</p>
      <ul>
        <li>You've purchased defective goods</li>
        <li>Services rendered were deficient</li>
        <li>You've been charged more than the displayed price</li>
        <li>Products don't meet advertised claims</li>
        <li>Unfair trade practices were used</li>
      </ul>
      
      <h2>Step 1: Gather Evidence</h2>
      <p>Collect and organize all relevant documents:</p>
      <ul>
        <li>Purchase receipts or invoices</li>
        <li>Warranty cards</li>
        <li>Product packaging</li>
        <li>Photographs of defective products</li>
        <li>Communication with the seller/service provider</li>
      </ul>
      
      <h2>Step 2: Contact the Business</h2>
      <p>Before escalating, try to resolve the issue directly with the business:</p>
      <ul>
        <li>Visit or call the customer service department</li>
        <li>Send a formal complaint email</li>
        <li>Escalate to management if necessary</li>
      </ul>
      
      <h2>Step 3: Draft Your Complaint</h2>
      <p>A well-crafted complaint should include:</p>
      <ul>
        <li>Your personal details</li>
        <li>Details of the product/service</li>
        <li>Clear description of the issue</li>
        <li>Chronology of events</li>
        <li>Steps already taken to resolve the issue</li>
        <li>Specific relief sought (refund, replacement, compensation)</li>
      </ul>
      
      <h2>Step 4: Choose the Right Forum</h2>
      <p>Based on the value of goods or services and compensation claimed:</p>
      <ul>
        <li>District Commission: Up to ₹1 crore</li>
        <li>State Commission: Between ₹1 crore and ₹10 crores</li>
        <li>National Commission: Above ₹10 crores</li>
      </ul>
      
      <h2>Step 5: File the Complaint</h2>
      <p>The complaint can be filed:</p>
      <ul>
        <li>In person at the relevant consumer forum</li>
        <li>By post</li>
        <li>Online through the consumer helpline portal</li>
      </ul>
      
      <h2>Step 6: Attend Hearings</h2>
      <p>Be prepared with all documents and evidence during hearings. You may represent yourself or hire a lawyer.</p>
      
      <h2>Example Template</h2>
      <p>Below is a sample format for a consumer complaint letter that you can adapt for your situation.</p>
      
      <h2>Conclusion</h2>
      <p>Filing a consumer complaint may seem daunting, but with the right approach and documentation, you can effectively seek redress for your grievances.</p>
    `,
    relatedResources: ["7", "5", "9"],
  },
  {
    id: "3",
    type: "template",
    title: "Employment Agreement Template for Small Businesses",
    description: "A legally sound employment agreement template crafted for small business owners in India. Includes all essential clauses and is compliant with current labor laws.",
    category: "Employment Law",
    date: "May 5, 2025",
    readTime: "5 min read",
    gradient: "bg-gradient-to-r from-amber-50 to-yellow-100",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop",
    content: `
      <h2>Introduction</h2>
      <p>This employment agreement template is designed for small businesses in India and covers all the essential elements required by Indian labor laws. Before using this template, we recommend consulting with a legal professional to ensure it meets your specific business needs.</p>
      
      <h2>How to Use This Template</h2>
      <p>Replace all placeholder text (indicated by [square brackets]) with your specific information. Customize clauses as needed for your business.</p>
      
      <h2>Employment Agreement Template</h2>
      <div class="template-content">
        <p><strong>EMPLOYMENT AGREEMENT</strong></p>
        <p>This Employment Agreement (the "Agreement") is made and entered into on [DATE] by and between:</p>
        <p>[COMPANY NAME], a company incorporated under the Companies Act, with its registered office at [ADDRESS] (hereinafter referred to as the "Company")</p>
        <p>AND</p>
        <p>[EMPLOYEE NAME], residing at [EMPLOYEE ADDRESS] (hereinafter referred to as the "Employee")</p>
        
        <p><strong>1. EMPLOYMENT</strong></p>
        <p>1.1. The Company hereby employs the Employee, and the Employee hereby accepts employment with the Company, on the terms and conditions set forth in this Agreement.</p>
        <p>1.2. The Employee shall be employed in the position of [JOB TITLE].</p>
        <p>1.3. The Employee shall report directly to [REPORTING MANAGER POSITION].</p>
        
        <p><strong>2. TERM</strong></p>
        <p>2.1. This Agreement shall commence on [START DATE] and shall continue until terminated in accordance with the provisions of this Agreement.</p>
        <p>2.2. The first [PROBATION PERIOD] months of employment shall be considered a probationary period. During this period, either party may terminate this Agreement with [PROBATION NOTICE PERIOD] days' notice.</p>
        
        <p><strong>3. DUTIES AND RESPONSIBILITIES</strong></p>
        <p>3.1. The Employee shall perform the duties and responsibilities as outlined in Schedule A attached hereto.</p>
        <p>3.2. The Employee shall devote their full time, attention, and skills to the business of the Company during working hours.</p>
        <p>3.3. The Employee shall comply with all Company policies, procedures, and regulations.</p>
        
        <p><strong>4. COMPENSATION</strong></p>
        <p>4.1. Salary: The Company shall pay the Employee a gross monthly salary of ₹[AMOUNT] (Rupees [AMOUNT IN WORDS]).</p>
        <p>4.2. Salary shall be paid monthly by [PAYMENT METHOD] on or before the [DAY] of each month.</p>
        <p>4.3. The Company shall deduct income tax at source and other statutory deductions as required by law.</p>
        
        <p><strong>5. WORKING HOURS</strong></p>
        <p>5.1. The Employee shall work [NUMBER] hours per week, [DAY] through [DAY], from [START TIME] to [END TIME].</p>
        <p>5.2. The Employee may be required to work additional hours as necessary to fulfill their responsibilities.</p>
        
        <p><strong>6. LEAVE ENTITLEMENT</strong></p>
        <p>6.1. The Employee shall be entitled to [NUMBER] days of paid annual leave.</p>
        <p>6.2. The Employee shall be entitled to sick leave and other statutory leaves as per applicable labor laws.</p>
        
        <p><strong>7. CONFIDENTIALITY</strong></p>
        <p>7.1. The Employee shall not, during or after their employment, disclose any confidential information relating to the Company, its business, clients, or employees.</p>
        
        <p><strong>8. INTELLECTUAL PROPERTY</strong></p>
        <p>8.1. All intellectual property created by the Employee during the course of employment shall belong to the Company.</p>
        
        <p><strong>9. TERMINATION</strong></p>
        <p>9.1. After completion of the probation period, either party may terminate this Agreement by giving [NOTICE PERIOD] days' written notice or salary in lieu thereof.</p>
        <p>9.2. The Company may terminate this Agreement immediately without notice for cause, including but not limited to:</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;a) Breach of this Agreement;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;b) Misconduct;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;c) Negligence;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;d) Dishonesty;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;e) Violation of Company policies.</p>
        
        <p><strong>10. GOVERNING LAW</strong></p>
        <p>10.1. This Agreement shall be governed by the laws of India.</p>
        <p>10.2. Any dispute arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts in [CITY].</p>
        
        <p><strong>11. MISCELLANEOUS</strong></p>
        <p>11.1. This Agreement constitutes the entire understanding between the parties and supersedes all prior agreements or understandings.</p>
        <p>11.2. Any changes or modifications to this Agreement must be in writing and signed by both parties.</p>
        
        <p>IN WITNESS WHEREOF, the parties have executed this Agreement on the date first above written.</p>
        
        <p>For [COMPANY NAME]</p>
        <p>_________________________</p>
        <p>Authorized Signatory</p>
        <p>Name:</p>
        <p>Designation:</p>
        
        <p>EMPLOYEE</p>
        <p>_________________________</p>
        <p>[EMPLOYEE NAME]</p>
      </div>
      
      <h2>Schedule A: Job Description</h2>
      <p>[Add detailed job description here]</p>
      
      <h2>Important Notes</h2>
      <p>This template should be adapted to meet specific requirements of your business and the nature of employment. It's advisable to have the final document reviewed by a legal professional specializing in employment law.</p>
    `,
    relatedResources: ["6", "5", "4"],
  },
  {
    id: "4",
    type: "article",
    title: "The Role of Mediation in Family Law Cases",
    description: "Discover how mediation can be a powerful alternative to litigation in family law disputes. This article explains the benefits, process, and outcomes of mediation.",
    category: "Family Law",
    date: "April 28, 2025",
    readTime: "12 min read", 
    gradient: "bg-gradient-to-r from-pink-50 to-rose-100",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
    content: `
      <h2>Introduction to Family Law Mediation</h2>
      <p>Family law disputes can be emotionally challenging and financially draining when handled through traditional litigation. Mediation offers an alternative approach that can lead to more amicable resolutions while preserving relationships, especially important when children are involved.</p>
      
      <h2>What is Family Mediation?</h2>
      <p>Family mediation is a voluntary dispute resolution process in which a neutral third party, the mediator, helps conflicting parties communicate effectively and reach mutually acceptable agreements. Unlike a judge, the mediator doesn't impose decisions but facilitates productive conversations.</p>
      
      <h2>Types of Family Disputes Suitable for Mediation</h2>
      <p>Several family law matters can benefit from mediation:</p>
      <ul>
        <li>Divorce settlements</li>
        <li>Child custody and visitation arrangements</li>
        <li>Division of marital property</li>
        <li>Spousal and child support</li>
        <li>Modifications to existing court orders</li>
        <li>Grandparent visitation rights</li>
      </ul>
      
      <h2>Benefits of Family Mediation</h2>
      <p>Choosing mediation over litigation offers several advantages:</p>
      <ul>
        <li><strong>Cost-effectiveness</strong> - Typically costs 40-60% less than litigation</li>
        <li><strong>Time efficiency</strong> - Can be resolved in weeks rather than months or years</li>
        <li><strong>Confidentiality</strong> - Discussions remain private unlike court proceedings</li>
        <li><strong>Control over outcomes</strong> - Parties make decisions rather than a judge</li>
        <li><strong>Preservation of relationships</strong> - Fosters communication and cooperation</li>
        <li><strong>Reduced emotional trauma</strong> - Less adversarial than courtroom battles</li>
        <li><strong>Higher compliance rates</strong> - People tend to follow agreements they helped create</li>
      </ul>
      
      <h2>The Mediation Process in Family Law</h2>
      <p>Family mediation typically follows these steps:</p>
      <ol>
        <li><strong>Initial consultation</strong> - The mediator explains the process and answers questions</li>
        <li><strong>Information gathering</strong> - Both parties share relevant financial and personal information</li>
        <li><strong>Issue identification</strong> - The mediator helps identify areas of agreement and disagreement</li>
        <li><strong>Negotiation sessions</strong> - Guided discussions to explore options and find common ground</li>
        <li><strong>Agreement drafting</strong> - The mediator helps document the terms agreed upon</li>
        <li><strong>Legal review</strong> - Each party has their attorney review the agreement</li>
        <li><strong>Finalization</strong> - The agreement is submitted to court for approval if required</li>
      </ol>
      
      <h2>Role of Lawyers in Family Mediation</h2>
      <p>While lawyers may not always be present during mediation sessions, they play important roles:</p>
      <ul>
        <li>Advising clients about legal rights before and during mediation</li>
        <li>Reviewing mediated agreements before finalization</li>
        <li>Preparing necessary court documents</li>
        <li>Representing clients in court for agreement approval</li>
      </ul>
      
      <h2>When Mediation May Not Be Appropriate</h2>
      <p>Despite its benefits, mediation may not work in all situations:</p>
      <ul>
        <li>Cases involving domestic violence or power imbalances</li>
        <li>Situations where one party refuses to disclose financial information</li>
        <li>When there's a history of substance abuse affecting negotiation capacity</li>
        <li>If one party has mental health issues that impact decision-making</li>
      </ul>
      
      <h2>Finding a Qualified Family Mediator</h2>
      <p>Look for these qualifications when selecting a family mediator:</p>
      <ul>
        <li>Professional background in law, psychology, or social work</li>
        <li>Specialized training in family mediation</li>
        <li>Experience with similar cases</li>
        <li>Good reputation and testimonials from previous clients</li>
        <li>Membership in professional mediation associations</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Mediation offers a more collaborative and holistic approach to resolving family disputes than traditional litigation. By focusing on communication, mutual respect, and cooperative problem-solving, mediation can help families navigate challenging transitions while minimizing emotional and financial costs. If you're facing a family law issue, consider consulting with both a family law attorney and a qualified mediator to explore whether mediation might be right for your situation.</p>
    `,
    relatedResources: ["6", "8", "7"],
  },
  {
    id: "5",
    type: "guide",
    title: "Navigating the Corporate Compliance Requirements",
    description: "A comprehensive guide for businesses to understand and meet their compliance obligations under various corporate laws in India.",
    category: "Corporate Law",
    date: "April 22, 2025",
    readTime: "20 min read",
    gradient: "bg-gradient-to-r from-purple-50 to-violet-100",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    content: `
      <h2>Introduction to Corporate Compliance</h2>
      <p>Corporate compliance refers to the systems and processes a company implements to ensure adherence to laws, regulations, and internal policies. In India's complex regulatory environment, staying compliant is essential for avoiding penalties and maintaining business reputation.</p>
      
      <h2>Key Corporate Compliance Areas</h2>
      <p>Businesses in India must navigate compliance requirements across multiple dimensions:</p>
      
      <h3>1. Company Law Compliance</h3>
      <p>Under the Companies Act, 2013:</p>
      <ul>
        <li>Annual filings (Form AOC-4, MGT-7)</li>
        <li>Board meeting requirements (minimum 4 per year)</li>
        <li>Maintenance of statutory registers</li>
        <li>Director-related compliances (DIN, DIR filings)</li>
        <li>CSR compliance for eligible companies</li>
        <li>Related party transaction disclosures</li>
      </ul>
      
      <h3>2. Tax Compliance</h3>
      <ul>
        <li>Income Tax returns and advance tax payments</li>
        <li>TDS (Tax Deducted at Source) filing and payments</li>
        <li>GST registration, returns, and payments</li>
        <li>Professional tax (state-specific)</li>
      </ul>
      
      <h3>3. Labor Law Compliance</h3>
      <ul>
        <li>Provident Fund registration and contributions</li>
        <li>ESI (Employee State Insurance) registration and contributions</li>
        <li>Labor welfare fund contributions</li>
        <li>Gratuity provisions</li>
        <li>Shop and establishment registrations</li>
      </ul>
      
      <h3>4. Industry-Specific Compliance</h3>
      <ul>
        <li>RBI compliance for financial institutions</li>
        <li>FSSAI for food-related businesses</li>
        <li>Environmental clearances for manufacturing units</li>
        <li>SEBI regulations for listed entities</li>
      </ul>
      
      <h2>Compliance Calendar for Indian Businesses</h2>
      <p>A well-organized compliance calendar helps businesses stay on track:</p>
      
      <h3>Monthly Compliances</h3>
      <ul>
        <li>GST returns (GSTR-1, GSTR-3B)</li>
        <li>TDS/TCS payments</li>
        <li>PF/ESI payments</li>
        <li>Professional tax payments (state-specific)</li>
      </ul>
      
      <h3>Quarterly Compliances</h3>
      <ul>
        <li>TDS returns (Form 24Q, 26Q, 27Q)</li>
        <li>GST returns (for composition dealers)</li>
        <li>Foreign Liabilities and Assets reporting (if applicable)</li>
      </ul>
      
      <h3>Annual Compliances</h3>
      <ul>
        <li>Filing of financial statements with ROC</li>
        <li>Annual return filing (MGT-7)</li>
        <li>Income tax returns</li>
        <li>Annual GST return (GSTR-9)</li>
        <li>Directors' report and board report</li>
        <li>Financial statement preparation</li>
        <li>Annual general meeting</li>
      </ul>
      
      <h2>Building an Effective Corporate Compliance System</h2>
      <p>To develop a robust compliance framework:</p>
      
      <h3>1. Create a Compliance Team</h3>
      <ul>
        <li>Designate compliance officers for different areas</li>
        <li>Train employees on compliance requirements</li>
        <li>Establish clear reporting structures</li>
      </ul>
      
      <h3>2. Document Policies and Procedures</h3>
      <ul>
        <li>Create a compliance manual</li>
        <li>Develop standard operating procedures</li>
        <li>Implement conflict of interest policies</li>
      </ul>
      
      <h3>3. Implement Monitoring Systems</h3>
      <ul>
        <li>Use compliance management software</li>
        <li>Conduct regular internal audits</li>
        <li>Set up automated reminders for due dates</li>
      </ul>
      
      <h3>4. Risk Assessment</h3>
      <ul>
        <li>Identify high-risk compliance areas</li>
        <li>Develop mitigation strategies</li>
        <li>Conduct periodic risk reviews</li>
      </ul>
      
      <h2>Managing Non-Compliance</h2>
      <p>When violations occur:</p>
      <ul>
        <li>Self-reporting to authorities when required</li>
        <li>Implementing corrective actions</li>
        <li>Conducting root cause analysis</li>
        <li>Updating procedures to prevent recurrence</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Corporate compliance shouldn't be viewed merely as a legal obligation but as a business practice that ensures sustainability and builds stakeholder trust. By implementing systematic approaches to compliance management, businesses can navigate India's regulatory environment effectively while focusing on their core operations.</p>
    `,
    relatedResources: ["3", "2", "9"],
  },
  {
    id: "6",
    type: "template",
    title: "Last Will and Testament Document Template",
    description: "A properly structured template for creating a legally valid will that ensures your assets are distributed according to your wishes after your passing.",
    category: "Estate Planning",
    date: "April 15, 2025",
    readTime: "8 min read",
    gradient: "bg-gradient-to-r from-blue-50 to-sky-100",
    image: "https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=2070&auto=format&fit=crop",
    content: `
      <h2>Introduction</h2>
      <p>A Last Will and Testament is a legal document that communicates your final wishes regarding your assets and dependents. This template will help you create a legally valid will under Indian law. While this template covers the essentials, we recommend consulting with a legal professional to ensure your will addresses your specific situation.</p>
      
      <h2>How to Use This Template</h2>
      <p>Replace all placeholder text (indicated by [square brackets]) with your specific information. Customize clauses as needed for your personal situation.</p>
      
      <h2>Last Will and Testament Template</h2>
      <div class="template-content">
        <p><strong>LAST WILL AND TESTAMENT</strong></p>
        <p>I, [FULL NAME], son/daughter of [FATHER'S NAME], residing at [COMPLETE ADDRESS], being of sound mind and memory, do hereby make, publish, and declare this to be my Last Will and Testament, hereby revoking all wills and codicils previously made by me.</p>
        
        <p><strong>1. DECLARATION</strong></p>
        <p>1.1. I declare that I am of legal age to make this Will and of sound mind, and that this Last Will and Testament expresses my wishes without undue influence or duress.</p>
        <p>1.2. I am married to [SPOUSE'S NAME] and have [NUMBER] children, namely [NAMES OF CHILDREN WITH AGES].</p>
        
        <p><strong>2. APPOINTMENT OF EXECUTOR</strong></p>
        <p>2.1. I hereby appoint [EXECUTOR'S NAME] of [EXECUTOR'S ADDRESS] as the Executor of this my Will.</p>
        <p>2.2. In the event that [EXECUTOR'S NAME] is unable or unwilling to act as Executor, I appoint [ALTERNATE EXECUTOR'S NAME] of [ALTERNATE EXECUTOR'S ADDRESS] as the alternate Executor of this my Will.</p>
        <p>2.3. I direct that no bond or other security shall be required of my Executor in any jurisdiction.</p>
        
        <p><strong>3. PAYMENT OF DEBTS AND EXPENSES</strong></p>
        <p>3.1. I direct my Executor to pay all my just debts, funeral expenses, and the expenses of administering my estate as soon as practicable after my death.</p>
        
        <p><strong>4. DISPOSITION OF PROPERTY</strong></p>
        <p>4.1. Real Property</p>
        <p>a) I give, devise, and bequeath my property located at [ADDRESS OF PROPERTY 1] to [BENEFICIARY NAME AND RELATIONSHIP].</p>
        <p>b) I give, devise, and bequeath my property located at [ADDRESS OF PROPERTY 2] to [BENEFICIARY NAME AND RELATIONSHIP].</p>
        
        <p>4.2. Bank Accounts and Cash</p>
        <p>a) I give and bequeath all monies held in my savings account number [ACCOUNT NUMBER] with [BANK NAME] to [BENEFICIARY NAME AND RELATIONSHIP].</p>
        <p>b) I give and bequeath all monies held in my fixed deposit account number [ACCOUNT NUMBER] with [BANK NAME] to [BENEFICIARY NAME AND RELATIONSHIP].</p>
        
        <p>4.3. Investments</p>
        <p>a) I give and bequeath all my shares and securities to [BENEFICIARY NAME AND RELATIONSHIP].</p>
        <p>b) I give and bequeath my mutual fund investments to [BENEFICIARY NAME AND RELATIONSHIP].</p>
        
        <p>4.4. Personal Effects</p>
        <p>a) I give and bequeath my personal effects, including furniture, household items, clothing, jewelry, and personal ornaments to [BENEFICIARY NAME AND RELATIONSHIP].</p>
        <p>b) I specifically bequeath [SPECIFIC ITEM] to [BENEFICIARY NAME AND RELATIONSHIP].</p>
        
        <p>4.5. Residuary Estate</p>
        <p>I give, devise, and bequeath all the rest, residue, and remainder of my estate, both real and personal, of whatever kind and wherever situated, to [BENEFICIARY NAME AND RELATIONSHIP].</p>
        
        <p><strong>5. GUARDIAN FOR MINOR CHILDREN</strong></p>
        <p>5.1. In the event my spouse does not survive me, I appoint [GUARDIAN'S NAME] of [GUARDIAN'S ADDRESS] as the guardian of the person and property of my minor children.</p>
        <p>5.2. If [GUARDIAN'S NAME] is unable or unwilling to act as guardian, I appoint [ALTERNATE GUARDIAN'S NAME] of [ALTERNATE GUARDIAN'S ADDRESS] as the alternate guardian.</p>
        
        <p><strong>6. TRUSTS FOR MINORS</strong></p>
        <p>6.1. If any beneficiary under this Will is under the age of 18 years at the time of my death, I direct that the share of such beneficiary shall be held in trust by my Executor until such beneficiary attains the age of 18 years.</p>
        <p>6.2. During the trust period, my Executor shall use such portion of the income and principal as necessary for the beneficiary's health, education, maintenance, and support.</p>
        
        <p><strong>7. GENERAL PROVISIONS</strong></p>
        <p>7.1. If any provision of this Will is held invalid, the other provisions shall continue to be fully effective.</p>
        <p>7.2. Words importing the masculine gender shall include the feminine and neuter genders and vice versa.</p>
        <p>7.3. Words in the singular shall include the plural and vice versa.</p>
        
        <p>IN WITNESS WHEREOF, I have hereunto set my hand to this my Last Will and Testament on this [DAY] day of [MONTH], [YEAR] at [PLACE].</p>
        
        <p>[TESTATOR'S NAME & SIGNATURE]</p>
        
        <p><strong>ATTESTATION CLAUSE</strong></p>
        <p>SIGNED by the above-named Testator as his/her Last Will and Testament in our presence, who being present at the same time and in the presence of each other, have hereunto subscribed our names as witnesses.</p>
        
        <p>Witness 1:</p>
        <p>Name: _________________________</p>
        <p>Address: _________________________</p>
        <p>Signature: _________________________</p>
        
        <p>Witness 2:</p>
        <p>Name: _________________________</p>
        <p>Address: _________________________</p>
        <p>Signature: _________________________</p>
      </div>
      
      <h2>Important Notes</h2>
      <ul>
        <li>This will must be signed by you in the presence of at least two witnesses.</li>
        <li>The witnesses should not be beneficiaries under your will.</li>
        <li>Each page of the will should be initialed by you and the witnesses.</li>
        <li>Keep the original will in a safe place and inform your executor of its location.</li>
        <li>Registration of will is not mandatory but recommended for added legal validity.</li>
        <li>Review and update your will periodically, especially after major life events.</li>
      </ul>
      
      <h2>Legal Disclaimer</h2>
      <p>This template is provided for informational purposes only and does not constitute legal advice. Laws regarding wills vary by state in India. We recommend consulting with a qualified legal professional to ensure your will meets all legal requirements and addresses your specific situation.</p>
    `,
    relatedResources: ["4", "8", "9"],
  },
  {
    id: "7",
    type: "article",
    title: "Digital Rights and Privacy Laws in India",
    description: "An overview of the evolving landscape of digital rights and privacy laws in India, including the Personal Data Protection Bill and its implications.",
    category: "Cyber Law",
    date: "April 8, 2025",
    readTime: "14 min read",
    gradient: "bg-gradient-to-r from-teal-50 to-cyan-100",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
    content: `
      <h2>Introduction to Digital Rights in India</h2>
      <p>As India rapidly digitizes with over 800 million internet users, the question of digital rights and privacy has become increasingly important. This article explores the current legal framework governing digital rights in India and upcoming legislative changes that will shape the future of privacy protection in the digital age.</p>
      
      <h2>Current Legal Framework</h2>
      <p>India's digital rights and privacy landscape is currently governed by several laws:</p>
      
      <h3>Information Technology Act, 2000 (IT Act)</h3>
      <p>The IT Act provides the primary legislative framework for addressing cyber crimes and electronic commerce in India. Key provisions include:</p>
      <ul>
        <li>Section 43A - Compensation for failure to protect sensitive personal data</li>
        <li>Section 72A - Punishment for disclosure of information in breach of contract</li>
        <li>IT Rules, 2011 - Guidelines for collection, storage, and handling of sensitive personal data</li>
      </ul>
      
      <h3>The Right to Privacy as a Fundamental Right</h3>
      <p>In the landmark judgment of Justice K.S. Puttaswamy v. Union of India (2017), the Supreme Court of India recognized the right to privacy as a fundamental right under Article 21 of the Constitution. Key aspects of the judgment include:</p>
      <ul>
        <li>Recognition that privacy includes personal intimacies, personal choices, and informational privacy</li>
        <li>Establishment of a three-fold test for privacy infringement: legality, legitimate aim, and proportionality</li>
        <li>Acknowledgment that data protection is an essential aspect of informational privacy</li>
      </ul>
      
      <h2>The Personal Data Protection Bill (PDPB)</h2>
      <p>India is on the verge of implementing comprehensive data protection legislation through the Personal Data Protection Bill. Key features include:</p>
      
      <h3>1. Data Classification</h3>
      <ul>
        <li><strong>Personal Data</strong> - Information that can identify an individual</li>
        <li><strong>Sensitive Personal Data</strong> - Financial data, health data, biometric data, etc.</li>
        <li><strong>Critical Personal Data</strong> - To be defined by the government, with stringent processing requirements</li>
      </ul>
      
      <h3>2. Rights of Data Principals (Individuals)</h3>
      <ul>
        <li>Right to confirmation and access</li>
        <li>Right to correction and erasure</li>
        <li>Right to data portability</li>
        <li>Right to be forgotten</li>
        <li>Right to object to automated decision-making</li>
      </ul>
      
      <h3>3. Obligations of Data Fiduciaries (Entities Processing Data)</h3>
      <ul>
        <li>Purpose limitation and collection limitation</li>
        <li>Lawful processing based on consent</li>
        <li>Data quality and storage limitation</li>
        <li>Accountability and transparency measures</li>
        <li>Implementation of security safeguards</li>
      </ul>
      
      <h3>4. Data Localization Requirements</h3>
      <ul>
        <li>Mandating storage of a copy of all personal data in India</li>
        <li>Requirement to store sensitive personal data only in India with limited cross-border transfer permissions</li>
        <li>Prohibition on transferring critical personal data outside India</li>
      </ul>
      
      <h2>Digital Rights Challenges in India</h2>
      <p>Despite legislative progress, several challenges remain:</p>
      
      <h3>1. Surveillance and State Access</h3>
      <p>Government surveillance powers under Section 69 of the IT Act and the Telegraph Act raise concerns about excessive monitoring without adequate oversight mechanisms.</p>
      
      <h3>2. Internet Shutdowns</h3>
      <p>India leads globally in government-mandated internet shutdowns, raising questions about proportionality and impact on digital rights.</p>
      
      <h3>3. Intermediary Liability</h3>
      <p>The IT Rules 2021 impose significant compliance requirements on social media platforms, potentially affecting free speech and privacy.</p>
      
      <h3>4. Digital Divide</h3>
      <p>Unequal access to digital literacy creates asymmetric understanding of digital rights across socioeconomic groups.</p>
      
      <h2>Comparison with Global Standards</h2>
      <p>India's approach to digital privacy can be compared with international frameworks:</p>
      <ul>
        <li><strong>GDPR (EU)</strong> - More comprehensive rights and higher penalties than India's proposed framework</li>
        <li><strong>CCPA (California)</strong> - More consumer-focused with opt-out rights for data sale</li>
        <li><strong>PIPL (China)</strong> - Similar data localization requirements but with stronger state access provisions</li>
      </ul>
      
      <h2>Best Practices for Organizations</h2>
      <p>Organizations operating in India should:</p>
      <ul>
        <li>Develop comprehensive privacy policies and notices</li>
        <li>Implement data minimization and purpose limitation practices</li>
        <li>Establish mechanisms for honoring data subject rights</li>
        <li>Conduct regular privacy impact assessments</li>
        <li>Train employees on privacy compliance</li>
        <li>Prepare for data localization requirements</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>India stands at a critical juncture in defining its approach to digital rights and privacy. The forthcoming Personal Data Protection law will significantly reshape the digital landscape, potentially bringing India closer to global privacy standards while addressing unique national priorities. Both individuals and organizations must stay informed about these evolving legal frameworks to effectively navigate the changing digital rights ecosystem in India.</p>
    `,
    relatedResources: ["2", "8", "5"],
  },
  {
    id: "8",
    type: "guide",
    title: "How to File RTI Applications Effectively",
    description: "Learn the proper way to file Right to Information (RTI) applications to get the information you need from government bodies.",
    category: "Constitutional Law",
    date: "April 1, 2025",
    readTime: "18 min read",
    gradient: "bg-gradient-to-r from-orange-50 to-amber-100",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2012&auto=format&fit=crop",
    content: `
      <h2>Understanding the Right to Information</h2>
      <p>The Right to Information (RTI) Act, 2005 empowers citizens to request information from public authorities, promoting transparency and accountability in governance. This guide will walk you through the process of filing effective RTI applications to maximize your chances of getting the information you seek.</p>
      
      <h2>When to Use RTI</h2>
      <p>The RTI Act can be used to:</p>
      <ul>
        <li>Access government records and documents</li>
        <li>Monitor government spending and decision-making</li>
        <li>Obtain certified copies of documents</li>
        <li>Inspect government works, documents, and records</li>
        <li>Get information about decisions affecting you personally</li>
        <li>Obtain status updates on applications and petitions</li>
      </ul>
      
      <h2>Information Exempt from Disclosure</h2>
      <p>Certain categories of information are exempt under Section 8 of the RTI Act:</p>
      <ul>
        <li>Information that would prejudicially affect India's sovereignty and integrity</li>
        <li>Information expressly forbidden by courts or tribunals</li>
        <li>Information that would breach parliamentary privilege</li>
        <li>Commercial confidential information or trade secrets</li>
        <li>Information received in confidence from foreign governments</li>
        <li>Information that would endanger someone's life or physical safety</li>
        <li>Cabinet papers including deliberations of ministers</li>
        <li>Personal information with no public interest</li>
      </ul>
      
      <h2>Before Filing an RTI</h2>
      <p>Take these preparatory steps:</p>
      <ol>
        <li>Identify the correct public authority that likely holds the information</li>
        <li>Check if the information is already available on the authority's website</li>
        <li>Frame clear, specific questions rather than making broad requests</li>
        <li>Research whether similar RTIs have been filed previously</li>
        <li>Understand the specific information you need and why</li>
      </ol>
      
      <h2>Step-by-Step Guide to Filing an RTI</h2>
      
      <h3>Step 1: Drafting Your RTI Application</h3>
      <p>Your application should include:</p>
      <ul>
        <li>Your full name and contact information</li>
        <li>Clear subject line mentioning "Application under RTI Act, 2005"</li>
        <li>Specific questions numbered sequentially</li>
        <li>Time period for which information is sought</li>
        <li>Format in which you want the information (electronic/photocopy)</li>
        <li>Statement that you're an Indian citizen (if filing physically)</li>
      </ul>
      
      <h3>Step 2: Filing Methods</h3>
      <p>You can file an RTI application through multiple channels:</p>
      
      <h4>A. Offline Method</h4>
      <ol>
        <li>Write your application on plain paper</li>
        <li>Attach application fee (₹10 via postal order/demand draft/court fee stamp)</li>
        <li>Send by registered post or deliver in person to the Public Information Officer (PIO)</li>
        <li>Keep a copy of your application and proof of sending</li>
      </ol>
      
      <h4>B. Online Method</h4>
      <ol>
        <li>Visit the RTI Online Portal (https://rtionline.gov.in/)</li>
        <li>Register and create an account</li>
        <li>Select the appropriate public authority</li>
        <li>Complete the application form with your questions</li>
        <li>Pay the fee online (₹10)</li>
        <li>Submit and note your registration number</li>
      </ol>
      
      <h4>C. RTI NGO Services</h4>
      <p>Several NGOs and online platforms can file RTIs on your behalf for a nominal fee.</p>
      
      <h3>Step 3: Fee Structure</h3>
      <ul>
        <li>Application fee: ₹10</li>
        <li>Additional fee for receiving information:
          <ul>
            <li>₹2 per page for A4/A3 size paper</li>
            <li>Actual cost for larger paper sizes or samples/models</li>
            <li>₹50 per diskette or floppy</li>
            <li>Fee may be revised by public authorities</li>
          </ul>
        </li>
        <li>No application fee for BPL (Below Poverty Line) cardholders</li>
      </ul>
      
      <h3>Step 4: Timeline and Follow-up</h3>
      <ul>
        <li>The PIO must provide information within 30 days of receiving your request</li>
        <li>If the information concerns life or liberty, the timeline is 48 hours</li>
        <li>If no response is received within 30 days, you can file a first appeal</li>
      </ul>
      
      <h2>Filing Appeals</h2>
      <p>If you're dissatisfied with the response or receive no response:</p>
      
      <h3>First Appeal</h3>
      <ul>
        <li>File with the First Appellate Authority (officer senior to the PIO)</li>
        <li>Must be filed within 30 days of PIO's response or the 30-day deadline</li>
        <li>Provide details of your original RTI and reasons for appeal</li>
        <li>No fee for first appeal</li>
        <li>Decision should come within 30 days</li>
      </ul>
      
      <h3>Second Appeal</h3>
      <ul>
        <li>If still dissatisfied, file with the Information Commission</li>
        <li>Must be filed within 90 days of first appeal decision</li>
        <li>Include copies of all previous correspondence</li>
        <li>Commission's decision is binding</li>
      </ul>
      
      <h2>Sample RTI Application Template</h2>
      <div class="template-content">
        <p>To,<br>
        The Public Information Officer<br>
        [Name of Public Authority]<br>
        [Complete Address]</p>
        
        <p>Subject: Application under Right to Information Act, 2005</p>
        
        <p>Sir/Madam,</p>
        
        <p>I wish to seek information under the provisions of the Right to Information Act, 2005. The details of the information required are as follows:</p>
        
        <ol>
          <li>[Your specific question 1]</li>
          <li>[Your specific question 2]</li>
          <li>[Your specific question 3]</li>
        </ol>
        
        <p>I request that the information be provided in [specify format: electronic/hard copy/inspection of documents]. I am enclosing an IPO/DD/Court Fee Stamp of ₹10 as the application fee.</p>
        
        <p>I hereby state that I am a citizen of India.</p>
        
        <p>Yours faithfully,</p>
        
        <p>[Your Name]<br>
        [Your Address]<br>
        [Your Contact Number]<br>
        [Your Email]</p>
        
        <p>Date: [Date]<br>
        Place: [Place]</p>
      </div>
      
      <h2>Tips for Effective RTI Applications</h2>
      <ul>
        <li><strong>Be precise:</strong> Ask specific questions rather than making general inquiries</li>
        <li><strong>Break down complex requests:</strong> Split into multiple numbered questions</li>
        <li><strong>Avoid opinions:</strong> Ask for facts and records, not opinions or explanations</li>
        <li><strong>Specify time periods:</strong> Include the date range for the information sought</li>
        <li><strong>Request inspection first:</strong> For voluminous documents, request inspection before asking for copies</li>
        <li><strong>Stay courteous:</strong> Maintain a respectful tone in your application</li>
        <li><strong>Keep records:</strong> Maintain copies of all communications</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>The RTI Act is a powerful tool for citizens to promote transparency and accountability in governance. By following the guidelines in this document, you can file effective RTI applications that maximize your chances of obtaining the information you seek. Remember that persistence and attention to detail are key to successfully navigating the RTI process.</p>
    `,
    relatedResources: ["7", "2", "5"],
  },
  {
    id: "9",
    type: "template",
    title: "Rental Agreement Template with All Essential Clauses",
    description: "A comprehensive rental agreement template that protects both landlords and tenants with all necessary legal clauses and conditions.",
    category: "Real Estate Law",
    date: "March 25, 2025",
    readTime: "7 min read",
    gradient: "bg-gradient-to-r from-lime-50 to-green-100",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop",
    content: `
      <h2>Introduction</h2>
      <p>This rental agreement template is designed for residential properties in India and includes all essential clauses to protect both landlord and tenant interests. Before using this template, we recommend consulting with a legal professional to ensure it complies with local rental laws, which can vary by state.</p>
      
      <h2>How to Use This Template</h2>
      <p>Replace all placeholder text (indicated by [square brackets]) with your specific information. Customize clauses as needed for your rental situation.</p>
      
      <h2>Rental Agreement Template</h2>
      <div class="template-content">
        <p><strong>RENTAL AGREEMENT</strong></p>
        <p>This Rental Agreement (hereinafter referred to as the "Agreement") is made and executed on this [DAY] day of [MONTH], [YEAR] at [PLACE].</p>
        
        <p><strong>BETWEEN</strong></p>
        <p>[LANDLORD'S NAME], [Age], son/daughter of [FATHER'S NAME], residing at [LANDLORD'S ADDRESS], hereinafter referred to as the "LESSOR" (which expression shall, unless repugnant to the context or meaning thereof, be deemed to include his/her heirs, executors, administrators, and legal representatives) of the ONE PART;</p>
        
        <p><strong>AND</strong></p>
        <p>[TENANT'S NAME], [Age], son/daughter of [FATHER'S NAME], residing at [TENANT'S PERMANENT ADDRESS], hereinafter referred to as the "LESSEE" (which expression shall, unless repugnant to the context or meaning thereof, be deemed to include his/her heirs, executors, administrators, and legal representatives) of the OTHER PART.</p>
        
        <p>The LESSOR and LESSEE are hereinafter collectively referred to as "Parties" and individually as a "Party".</p>
        
        <p><strong>WHEREAS</strong>:</p>
        <p>The LESSOR is the absolute owner and in possession of the property situated at [COMPLETE ADDRESS OF RENTAL PROPERTY], admeasuring [AREA] square feet, comprising of [NUMBER] bedroom(s), [NUMBER] bathroom(s), [DESCRIPTION OF OTHER ROOMS/AREAS] (hereinafter referred to as the "Premises").</p>
        <p>The LESSOR has agreed to let out and the LESSEE has agreed to take on rent the Premises on the terms and conditions hereinafter appearing.</p>
        
        <p><strong>NOW THIS AGREEMENT WITNESSETH AS FOLLOWS</strong>:</p>
        
        <p><strong>1. TERM OF TENANCY</strong></p>
        <p>1.1. The LESSOR hereby lets and the LESSEE hereby takes on rent the Premises for a period of [NUMBER] months/years commencing from [START DATE] and ending on [END DATE] (the "Term").</p>
        <p>1.2. The Term may be extended for further periods as may be mutually agreed between the Parties in writing at least [NUMBER] months prior to the expiry of the Term or any extended term.</p>
        
        <p><strong>2. RENT AND DEPOSIT</strong></p>
        <p>2.1. Rent: The LESSEE shall pay to the LESSOR a monthly rent of Rs. [AMOUNT IN FIGURES] (Rupees [AMOUNT IN WORDS] only), payable in advance on or before the [DAY] of each month.</p>
        <p>2.2. Security Deposit: The LESSEE has paid to the LESSOR a sum of Rs. [AMOUNT IN FIGURES] (Rupees [AMOUNT IN WORDS] only) as interest-free refundable security deposit, the receipt of which the LESSOR hereby acknowledges.</p>
        <p>2.3. The security deposit shall be refunded by the LESSOR to the LESSEE at the time of vacating the Premises, after deducting any amounts toward unpaid rent, damages beyond normal wear and tear, or other amounts due under this Agreement.</p>
        
        <p><strong>3. PAYMENT OF UTILITIES AND MAINTENANCE CHARGES</strong></p>
        <p>3.1. The LESSEE shall pay for all the electricity consumed as per the meter reading and the actual bills received from the electricity department.</p>
        <p>3.2. The LESSEE shall pay for water charges of Rs. [AMOUNT] per month.</p>
        <p>3.3. The LESSEE shall pay the maintenance charges of the society/apartment complex amounting to Rs. [AMOUNT] per month.</p>
        <p>3.4. The LESSOR shall be responsible for payment of property tax and other statutory levies pertaining to the Premises.</p>
        
        <p><strong>4. PURPOSE OF RENTAL</strong></p>
        <p>4.1. The Premises shall be used by the LESSEE exclusively for residential purposes only and for no other purpose.</p>
        <p>4.2. The LESSEE shall not use the Premises for any illegal, immoral, or unlawful purposes.</p>
        
        <p><strong>5. OBLIGATIONS OF THE LESSEE</strong></p>
        <p>5.1. The LESSEE shall maintain the Premises in good and tenantable condition.</p>
        <p>5.2. The LESSEE shall not make any structural additions, alterations, or changes to the Premises without prior written consent of the LESSOR.</p>
        <p>5.3. The LESSEE shall permit the LESSOR or his authorized agent to enter the Premises for inspection or repairs at reasonable times after providing prior notice of at least 24 hours, except in case of emergency.</p>
        <p>5.4. The LESSEE shall not sublet, assign, or part with possession of the Premises or any part thereof to any person without the prior written consent of the LESSOR.</p>
        <p>5.5. The LESSEE shall abide by the rules and regulations of the society/apartment complex where the Premises are situated.</p>
        <p>5.6. The LESSEE shall be responsible for minor repairs and maintenance costs up to Rs. [AMOUNT] per instance.</p>
        
        <p><strong>6. OBLIGATIONS OF THE LESSOR</strong></p>
        <p>6.1. The LESSOR shall deliver peaceful and uninterrupted possession of the Premises to the LESSEE during the Term.</p>
        <p>6.2. The LESSOR shall be responsible for major repairs and structural maintenance of the Premises.</p>
        <p>6.3. The LESSOR shall pay all taxes, levies, and assessments imposed by local authorities on the Premises.</p>
        <p>6.4. The LESSOR shall keep the LESSEE indemnified against all claims arising out of any defect in the title of the Premises.</p>
        
        <p><strong>7. FURNITURE AND FIXTURES</strong></p>
        <p>7.1. The Premises is being let out along with furniture and fixtures as listed in Annexure A attached hereto.</p>
        <p>7.2. The LESSEE shall maintain the furniture and fixtures in good condition and return them in the same condition, subject to normal wear and tear, at the end of the tenancy.</p>
        
        <p><strong>8. LOCK-IN PERIOD</strong></p>
        <p>8.1. The Parties hereby agree to a lock-in period of [NUMBER] months, during which neither Party shall be entitled to terminate this Agreement except for breach of any terms and conditions by the other Party.</p>
        <p>8.2. If the LESSEE terminates the Agreement during the lock-in period, the LESSEE shall be liable to pay the rent for the remaining period of the lock-in period or forfeit the security deposit, at the option of the LESSOR.</p>
        
        <p><strong>9. TERMINATION</strong></p>
        <p>9.1. After the lock-in period, either Party may terminate this Agreement by giving [NUMBER] months' prior written notice to the other Party.</p>
        <p>9.2. The LESSOR may terminate this Agreement immediately if:
          <br>(a) The LESSEE defaults in payment of rent for two consecutive months;
          <br>(b) The LESSEE uses the Premises for illegal or immoral purposes;
          <br>(c) The LESSEE causes substantial damage to the Premises;
          <br>(d) The LESSEE breaches any material term of this Agreement.</p>
        <p>9.3. Upon termination, the LESSEE shall peacefully hand over vacant possession of the Premises along with all furniture and fixtures to the LESSOR in the same condition as they were at the commencement of the tenancy, subject to normal wear and tear.</p>
        
        <p><strong>10. NOTICES</strong></p>
        <p>10.1. Any notice required to be served under this Agreement shall be deemed to have been duly served if sent by registered post or delivered by hand at the address of the Parties mentioned above.</p>
        
        <p><strong>11. GOVERNING LAW AND DISPUTE RESOLUTION</strong></p>
        <p>11.1. This Agreement shall be governed by and construed in accordance with the laws of India.</p>
        <p>11.2. Any dispute arising out of or in connection with this Agreement shall be resolved amicably by the Parties, failing which it shall be referred to arbitration in accordance with the Arbitration and Conciliation Act, 1996.</p>
        
        <p><strong>12. REGISTRATION</strong></p>
        <p>12.1. This Agreement shall be registered with the appropriate Sub-Registrar of Assurances, and the cost of registration shall be borne by [LESSOR/LESSEE/SHARED EQUALLY].</p>
        
        <p>IN WITNESS WHEREOF, the Parties hereto have set their hands on the day, month, and year first above written.</p>
        
        <p>SIGNED AND DELIVERED by the LESSOR</p>
        <p>_________________________</p>
        <p>[LESSOR'S NAME]</p>
        <p>In the presence of:</p>
        <p>Witness 1: _________________________</p>
        <p>Witness 2: _________________________</p>
        
        <p>SIGNED AND DELIVERED by the LESSEE</p>
        <p>_________________________</p>
        <p>[LESSEE'S NAME]</p>
        <p>In the presence of:</p>
        <p>Witness 1: _________________________</p>
        <p>Witness 2: _________________________</p>
        
        <p>ANNEXURE A: LIST OF FURNITURE AND FIXTURES</p>
        <p>[Detailed list with description and condition of each item]</p>
      </div>
      
      <h2>Important Notes</h2>
      <ul>
        <li>This agreement should be printed on non-judicial stamp paper of appropriate value as per state regulations.</li>
        <li>Registration of rental agreements is mandatory in many states for agreements with a term of 12 months or more.</li>
        <li>Additional clauses may be required based on local rent control acts and other applicable laws.</li>
        <li>Both parties should retain original copies of the signed agreement.</li>
        <li>Photographs of the premises and furniture should be taken at the time of possession as evidence of condition.</li>
      </ul>
      
      <h2>Legal Disclaimer</h2>
      <p>This template is provided for informational purposes only and does not constitute legal advice. Rental laws vary by state in India. We recommend consulting with a qualified legal professional to ensure your rental agreement complies with all applicable laws and regulations.</p>
    `,
    relatedResources: ["1", "6", "3"],
  }
];

const ResourceDetail = () => {
  const { type, id } = useParams<{ type: string, id: string }>();
  const navigate = useNavigate();
  const [resource, setResource] = useState<any>(null);
  const [relatedResources, setRelatedResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundResource = resources.find(r => r.id === id && r.type === type);
      
      if (foundResource) {
        setResource(foundResource);
        
        // Get related resources
        if (foundResource.relatedResources) {
          const related = resources.filter(r => 
            foundResource.relatedResources.includes(r.id)
          );
          setRelatedResources(related);
        }
      }
      
      setLoading(false);
    }, 500);
  }, [id, type]);

  // Scroll to top on resource change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, type]);
  
  // Get resource type icon
  const getTypeIcon = () => {
    switch (type) {
      case "article":
        return <FileTextIcon className="h-5 w-5" />;
      case "guide":
        return <BookOpenIcon className="h-5 w-5" />;
      case "template":
        return <FileIcon className="h-5 w-5" />;
      default:
        return <FileTextIcon className="h-5 w-5" />;
    }
  };

  // Handle bookmark toggle
  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(bookmarked ? "Removed from saved items" : "Saved for later reference");
  };
  
  // Handle sharing
  const shareResource = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  // Handle print
  const printResource = () => {
    window.print();
  };
  
  if (loading) {
    return (
      <PageLayout>
        <div className="container py-12">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  if (!resource) {
    return (
      <PageLayout>
        <div className="container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Resource Not Found</h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find the resource you're looking for.
            </p>
            <Button onClick={() => navigate("/resources")}>
              Browse All Resources
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="container py-12">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate("/resources")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Resources
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Resource header */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 items-center mb-3">
                <Badge className="capitalize flex items-center gap-1">
                  {getTypeIcon()}
                  {resource.type}
                </Badge>
                <Badge variant="outline">{resource.category}</Badge>
              </div>
              
              <h1 className="text-3xl font-bold">{resource.title}</h1>
              
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                {resource.date && (
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{resource.date}</span>
                  </div>
                )}
                {resource.readTime && (
                  <div className="flex items-center gap-1">
                    <Clock3Icon className="h-4 w-4" />
                    <span>{resource.readTime}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Resource content */}
            <Card className="mb-8">
              <CardContent className="p-6">
                {resource.image && (
                  <div className="mb-6 rounded-md overflow-hidden">
                    <img 
                      src={resource.image} 
                      alt={resource.title}
                      className="w-full object-cover max-h-[300px]" 
                    />
                  </div>
                )}
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: resource.content }}
                />
              </CardContent>
            </Card>
            
            {/* Action buttons */}
            <div className="flex justify-between items-center">
              <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate("/resources")}>
                <ArrowLeft className="h-4 w-4" />
                Back to Resources
              </Button>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2" onClick={printResource}>
                  <FileTextIcon className="h-4 w-4" />
                  Print
                </Button>
                
                <Button variant="outline" className="flex items-center gap-2" onClick={shareResource}>
                  <Link className="h-4 w-4" />
                  Share
                </Button>
                
                <Button 
                  variant={bookmarked ? "default" : "outline"} 
                  className="flex items-center gap-2" 
                  onClick={toggleBookmark}
                >
                  <BookmarkIcon className="h-4 w-4" />
                  {bookmarked ? "Saved" : "Save"}
                </Button>
              </div>
            </div>
          </motion.div>
          
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-6">
              {/* Related resources */}
              {relatedResources.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
                    <div className="space-y-4">
                      {relatedResources.map(related => (
                        <div 
                          key={related.id}
                          className="border-b pb-3 last:border-0 last:pb-0"
                        >
                          <div className="flex items-start gap-2">
                            <div className="mt-0.5">
                              {related.type === "article" && <FileTextIcon className="h-4 w-4 text-blue-500" />}
                              {related.type === "guide" && <BookOpenIcon className="h-4 w-4 text-emerald-500" />}
                              {related.type === "template" && <FileIcon className="h-4 w-4 text-amber-500" />}
                            </div>
                            <div>
                              <h4 className="font-medium text-sm hover:underline">
                                <button onClick={() => navigate(`/resources/${related.type}/${related.id}`)}>
                                  {related.title}
                                </button>
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs capitalize">
                                  {related.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {related.readTime}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Consultation CTA */}
              <Card className={resource.gradient || "bg-gradient-to-r from-indigo-50 to-blue-50"}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Need Legal Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with experienced lawyers for personalized advice on your legal matters.
                  </p>
                  <Button className="w-full" onClick={() => navigate("/find-lawyer")}>
                    Find a Lawyer
                  </Button>
                </CardContent>
              </Card>
              
              {/* Resource categories */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Resource Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="cursor-pointer" onClick={() => navigate("/resources")}>
                      All Resources
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer" onClick={() => navigate("/resources")}>
                      Property Law
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer" onClick={() => navigate("/resources")}>
                      Family Law
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer" onClick={() => navigate("/resources")}>
                      Consumer Law
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer" onClick={() => navigate("/resources")}>
                      Employment Law
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer" onClick={() => navigate("/resources")}>
                      Corporate Law
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer" onClick={() => navigate("/resources")}>
                      Cyber Law
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ResourceDetail;

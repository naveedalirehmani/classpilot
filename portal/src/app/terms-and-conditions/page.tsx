"use client";

import { useState, useEffect } from "react";
import { ChevronUp, Printer } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "../_components/footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Sections for table of contents
  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "eligibility", title: "Eligibility" },
    { id: "accounts", title: "Accounts and Registration" },
    { id: "subscription", title: "Subscription Plans and Billing" },
    { id: "user-content", title: "User Content" },
    { id: "prohibited", title: "Prohibited Conduct" },
    { id: "intellectual", title: "Intellectual Property" },
    { id: "termination", title: "Termination" },
    { id: "disclaimer", title: "Disclaimer of Warranties" },
    { id: "limitation", title: "Limitation of Liability" },
    { id: "indemnification", title: "Indemnification" },
    { id: "governing", title: "Governing Law" },
    { id: "changes", title: "Changes to These Terms" },
    { id: "contact", title: "Contact Us" },
  ];

  // Handle scroll to track active section and show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      // Show back to top button when scrolled down
      setShowBackToTop(window.scrollY > 300);

      // Update active section based on scroll position
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      );
      
      const currentSection = sectionElements.reduce((closest, section) => {
        if (!section) return closest;
        const sectionTop = section.getBoundingClientRect().top;
        return (sectionTop < 100 && sectionTop > -100) ? section.id : closest;
      }, activeSection);
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, sections]);

  // Scroll to section
  const scrollToSection = (id:string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth"
      });
    }
  };

  // Print terms
  const handlePrint = () => {
    window.print();
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-screen bg-white py-20">
      <Navbar />
      
      <main className="container mx-auto py-16 px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with Table of Contents */}
          <aside className="hidden lg:block sticky top-24 self-start h-[calc(100vh-150px)] overflow-y-auto pr-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h2 className="text-lg font-bold mb-4">Table of Contents</h2>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
              <Separator className="my-4" />
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex items-center justify-center gap-2"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4" />
                <span>Print Terms</span>
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-3">Terms and Conditions</h1>
              <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                <Badge variant="outline" className="text-sm font-normal">
                  Last updated: May 1, 2023
                </Badge>
                <span className="hidden sm:inline">•</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 lg:hidden flex items-center gap-2"
                  onClick={handlePrint}
                >
                  <Printer className="h-4 w-4" />
                  <span>Print</span>
                </Button>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <section id="introduction" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mt-10 mb-4 pb-2 border-b">1. Introduction</h2>
                <p>
                  Welcome to Class Pilot (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of our website, applications, and services (collectively, the &quot;Services&quot;). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
                </p>
              </section>

              <section id="eligibility" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mt-10 mb-4 pb-2 border-b">2. Eligibility</h2>
                <p>
                  You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that you meet this requirement and have the legal capacity to enter into a binding agreement.
                </p>
              </section>

              <section id="accounts" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mt-10 mb-4 pb-2 border-b">3. Accounts and Registration</h2>
                <p>
                  To access certain features of our Services, you may need to register for an account. When registering, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                </p>
              </section>

              <section id="subscription" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mt-10 mb-4 pb-2 border-b">4. Subscription Plans and Billing</h2>
                <div className="pl-4 border-l-2 border-muted my-4">
                  <p className="mb-3">
                    <strong>4.1. Subscription Plans</strong>: We offer various subscription plans, including free and paid options. The features available to you depend on the type of subscription plan you select.
                  </p>
                  <p className="mb-3">
                    <strong>4.2. Billing</strong>: For paid subscription plans, you agree to pay all fees associated with your selected plan. Payments are non-refundable except as specified in our refund policy or as required by applicable law.
                  </p>
                  <p className="mb-3">
                    <strong>4.3. Automatic Renewal</strong>: Subscription plans automatically renew at the end of each billing period unless canceled before the renewal date. You can cancel your subscription at any time through your account settings.
                  </p>
                  <p>
                    <strong>4.4. Price Changes</strong>: We reserve the right to change our subscription fees at any time. If we change the fees for your subscription, we will provide notice of the change on the website or by email at least 30 days before the change takes effect.
                  </p>
                </div>
              </section>

              <section id="user-content" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mt-10 mb-4 pb-2 border-b">5. User Content</h2>
                <div className="pl-4 border-l-2 border-muted my-4">
                  <p className="mb-3">
                    <strong>5.1. Ownership</strong>: You retain ownership of any content you create, upload, or share through our Services (&quot;User Content&quot;).
                  </p>
                  <p className="mb-3">
                    <strong>5.2. License</strong>: By uploading or sharing User Content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute your User Content in connection with providing and improving our Services.
                  </p>
                  <p>
                    <strong>5.3. Responsibility</strong>: You are solely responsible for your User Content and the consequences of uploading or sharing it. You represent and warrant that you have all necessary rights to your User Content and that it does not violate any laws or infringe upon the rights of any third party.
                  </p>
                </div>
              </section>

              <section id="prohibited" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mt-10 mb-4 pb-2 border-b">6. Prohibited Conduct</h2>
                <p>
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 my-4 space-y-2">
                  <li>Use our Services for any illegal purpose or in violation of any laws</li>
                  <li>Infringe upon the intellectual property rights of others</li>
                  <li>Interfere with or disrupt our Services or servers</li>
                  <li>Attempt to gain unauthorized access to any part of our Services</li>
                  <li>Use our Services to send spam or unsolicited communications</li>
                  <li>Impersonate any person or entity or falsely state your affiliation with a person or entity</li>
                  <li>Use automated methods to access or use our Services without our permission</li>
                </ul>
              </section>

              <section id="intellectual" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mt-10 mb-4 pb-2 border-b">7. Intellectual Property</h2>
                <p>
                  Our Services, including all content, features, and functionality, are owned by us or our licensors and are protected by copyright, trademark, and other intellectual property laws. You may not use our trademarks, logos, or other proprietary information without our prior written consent.
                </p>
              </section>

              <section id="termination" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mt-10 mb-4 pb-2 border-b">8. Termination</h2>
                <p>
                  We reserve the right to suspend or terminate your access to our Services at any time, with or without notice, for any reason, including but not limited to a violation of these Terms. Upon termination, your right to use our Services will immediately cease.
                </p>
              </section>

              <section id="disclaimer" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mt-10 mb-4 pb-2 border-b">9. Disclaimer of Warranties</h2>
                <div className="bg-muted/30 p-4 rounded-md">
                  <p>
                    OUR SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                  </p>
                </div>
              </section>

              <section id="limitation" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mt-10 mb-4 pb-2 border-b">10. Limitation of Liability</h2>
                <div className="bg-muted/30 p-4 rounded-md">
                  <p>
                    TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF OR INABILITY TO USE OUR SERVICES.
                  </p>
                </div>
              </section>

              <section id="indemnification" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mt-10 mb-4 pb-2 border-b">11. Indemnification</h2>
                <p>
                  You agree to indemnify, defend, and hold harmless us and our officers, directors, employees, agents, and licensors from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys&apos; fees, arising out of or in any way connected with your access to or use of our Services or your violation of these Terms.
                </p>
              </section>

              <section id="governing" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mt-10 mb-4 pb-2 border-b">12. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.
                </p>
              </section>

              <section id="changes" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mt-10 mb-4 pb-2 border-b">13. Changes to These Terms</h2>
                <p>
                  We reserve the right to modify these Terms at any time. If we make material changes, we will provide notice on our website or by email. Your continued use of our Services after such modifications will constitute your acknowledgment and agreement to the modified Terms.
                </p>
              </section>

              <section id="contact" className="scroll-mt-24">
                <h2 className="text-2xl font-semibold mt-10 mb-4 pb-2 border-b">14. Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="bg-muted/20 p-4 rounded-md mt-4">
                  <p>
                    <strong>Email:</strong> hr@kohminds.com<br />
                    <strong>Address:</strong> Zulfiqar Abad Bridge, Naveed Shaheed Rd, Jutial, Gilgit
                  </p>
                </div>
              </section>
            </div>

            {/* Acceptance Button */}
            <div className="mt-12 mb-8 p-6 border rounded-lg bg-muted/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-muted-foreground text-sm">
                By using our services, you acknowledge that you have read and agree to these Terms and Conditions.
              </p>
              {/* <Button className="min-w-[150px]">
                I Accept
              </Button> */}
            </div>
          </div>
        </div>
      </main>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 print:hidden"
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      {/* Mobile Table of Contents */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-background border-t shadow-lg z-10 print:hidden">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <select
              value={activeSection}
              onChange={(e) => scrollToSection(e.target.value)}
              className="w-full py-2 px-3 bg-muted/50 rounded-md text-sm"
              aria-label="Navigate to section"
            >
              <option value="">Jump to section...</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <Footer />
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          nav, footer, button, .print-hide {
            display: none !important;
          }
          body {
            font-size: 12pt;
          }
          h1 {
            font-size: 18pt;
          }
          h2 {
            font-size: 16pt;
          }
          .container {
            max-width: 100% !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}

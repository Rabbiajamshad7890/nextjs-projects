'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
// Assuming the styles file is named Header.module.css and is correctly imported
import styles from "./Header.module.css"; 
import React from "react";

// 1. Define the TypeScript interface for a dropdown item
interface DropdownItem {
  label: string;
  href: string;
}

// 2. Define the NEW items for the "Ai Agents" Dropdown
// These are kept as requested: Courses, Product, Blogs, Community, Explore Docs
const aiAgentsDropdownItems: DropdownItem[] = [
  { label: "Courses", href: "/courses" },
  { label: "Product", href: "/product" },
  { label: "Blogs", href: "/blogs" },
  { label: "Community", href: "/community" },
  { label: "Explore Docs", href: "/explore-docs" },
];

// 3. Define the functional component with React.FC (Functional Component) type
const Header: React.FC = () => {
  // Split the NEW items into two columns for the dropdown layout
  const col1: DropdownItem[] = aiAgentsDropdownItems.slice(0, 3); 
  const col2: DropdownItem[] = aiAgentsDropdownItems.slice(3);    

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Left Section: Logo + Links */}
        <div className={styles.left}>
          <Link href="/" className={styles.logoLink}>
            <Image 
              src="/favicon.png" 
              alt="P2P Cloud Logo" // Added alt text for accessibility
              width={40} 
              height={40} 
            />
            <span>Home</span>
          </Link>

          <nav className={styles.nav}>
            {/* AI Agents Dropdown - Title KEPT, ITEMS UPDATED */}
            <div className={styles.dropdown}>
              {/* Dropdown Title/Toggle remains "Ai Agents" */}
              <Link href="/ai-agents" className={styles.dropdownToggle}>
                Ai Agents
              </Link>
              {/* Dropdown Menu content uses the NEW list */}
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownCol}>
                  {col1.map((item: DropdownItem) => (
                    <Link key={item.label} href={item.href} className={styles.dropdownItem}>
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className={styles.dropdownCol}>
                  {col2.map((item: DropdownItem) => (
                    <Link key={item.label} href={item.href} className={styles.dropdownItem}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {/* End AI Agents Dropdown */}
            
            {/* Standard Nav Links - REVERTED to LMS, CRM, About as requested ("don't change nav") */}
            <Link href="/lms">LMS</Link>
            <Link href="/crm">CRM</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>

        {/* Right Section: CTAs */}
        <div className={styles.right}>
          {/* Animated Corporate Trainings */}
          <motion.div
            initial={{ opacity: 0.5, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.5,
            }}
          >
            <Link href="/corporate-trainings" className={styles.corporate}>
              Corporate Trainings
            </Link>
          </motion.div>

          {/* Signup Button */}
          <Link href="/signup" className={styles.signup}>
            Signup
          </Link>

          {/* Contact Us Button */}
          <Link href="/contact" className={styles.contact}>
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;

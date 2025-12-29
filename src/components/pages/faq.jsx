import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  FiChevronDown, 
  FiChevronUp, 
  FiHelpCircle,
  FiShoppingCart, 
  FiUser, 
  FiCreditCard, 
  FiUserCheck, 
  FiBell, 
  FiShield, 
  FiAlertTriangle, 
  FiPhone, 
  FiPackage, 
  FiCalendar, 
  FiX,
  FiMail,
  FiSearch,
  FiMessageSquare,
  FiCornerDownRight
} from 'react-icons/fi';
import '../../assets/styles/faq.css';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const searchContainerRef = useRef(null);
  const suggestionsRef = useRef(null);
  const inputRef = useRef(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'How do I order a product?',
      meta: 'Ordering Process',
      answer: 'To place an order, simply add one or more products to your cart and proceed to checkout. At the checkout page, you will be guided to complete any required pre-requisites for each medication (such as a consultation or health questionnaire). Once the requirements are fulfilled, you can securely complete your payment and confirm your order.',
      icon: <FiShoppingCart />,
      category: 'ordering'
    },
    {
      question: 'Do I need to create an account to book?',
      meta: 'Account Setup',
      answer: 'Yes. Creating an account ensures that your medical history, prescriptions, and past orders are securely stored for future visits. This also allows you to manage bookings, view your order history, and receive personalized reminders more easily.',
      icon: <FiUser />,
      category: 'account'
    },
    {
      question: 'When will my card be charged?',
      meta: 'Payment Information',
      answer: 'At the time of placing your order, your card will be charged for the lowest available dose of the prescribed medication, along with the consultation fee and any other applicable lab charges. If your provider prescribes a higher dosage during the consultation, you\'ll be prompted to pay the difference and confirm the updated order.',
      icon: <FiCreditCard />,
      category: 'billing'
    },
    {
      question: 'Can I choose my provider?',
      meta: 'Provider Selection',
      answer: 'In most cases, the platform automatically assigns you to a licensed provider who is available in your state. This helps ensure that your consultation is scheduled quickly and with a qualified professional.',
      icon: <FiUserCheck />,
      category: 'providers'
    },
    {
      question: 'Will I get reminders about my treatment or follow-ups?',
      meta: 'Appointment Management',
      answer: 'Yes. To help you stay on track with your care, you\'ll receive reminders by email or SMS for upcoming consultations, medication refills, and reassessments. These reminders are designed to ensure you never miss an important step in your treatment journey.',
      icon: <FiBell />,
      category: 'notifications'
    },
    {
      question: 'How can I schedule a call with a provider?',
      meta: 'Consultation Options',
      answer: 'Consultation options depend on the protocol set for your program. For asynchronous consults, you may submit your concerns using the questionnaire form provided. Your provider will review your responses and determine the next steps. If the provider deems it necessary, they may request a live video consultation to discuss your case further and adjust your treatment plan as appropriate.',
      icon: <FiPhone />,
      category: 'consultations'
    },
    {
      question: 'What should I do if I experience side effects?',
      meta: 'Health & Safety',
      answer: 'If you experience any side effects, please contact our Customer Support team through the Help Centre for guidance. If you are experiencing severe or urgent symptoms, call 911 or seek immediate medical attention.',
      icon: <FiAlertTriangle />,
      category: 'safety'
    },
    {
      question: 'Is my information safe?',
      meta: 'Privacy & Security',
      answer: 'Absolutely. Your privacy and security are our top priorities. Our platform follows strict healthcare data protection standards and HIPAA compliance standards. This means your personal and medical information is safeguarded at all times and can only be accessed by you and your licensed healthcare provider.',
      icon: <FiShield />,
      category: 'privacy'
    },
    {
      question: 'What if my medication arrives damaged?',
      meta: 'Shipping & Delivery',
      answer: 'If your medication arrives in poor condition or with missing components, contact Customer Support through the Help Centre immediately. We will work directly with the pharmacy on your behalf to resolve the issue and arrange a replacement if necessary.',
      icon: <FiPackage />,
      category: 'shipping'
    },
    {
      question: 'Can I receive more than one month\'s supply?',
      meta: 'Dispensing Policy',
      answer: 'No. To ensure patient safety and compliance with medical protocols, medications are dispensed on a monthly basis only.',
      icon: <FiCalendar />,
      category: 'medication'
    },
    {
      question: 'How do I cancel my order?',
      meta: 'Order Management',
      answer: 'You may cancel your order by visiting the Booking Details page. Please note that cancellations are only possible before your order has been shipped. Once shipped, cancellations cannot be processed.',
      icon: <FiX />,
      category: 'orders'
    },
    {
      question: 'Can I change my delivery address?',
      meta: 'Address Updates',
      answer: 'Yes, but only before completing checkout. Once your order has been shipped, the delivery address cannot be changed.',
      icon: <FiMail />,
      category: 'shipping'
    }
  ];

  // Generate search suggestions based on query
  const searchSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    const suggestions = [];
    
    // Add matching questions first
    faqs.forEach(faq => {
      if (faq.question.toLowerCase().includes(query)) {
        suggestions.push({
          text: faq.question,
          type: 'question',
          icon: faq.icon,
          category: faq.category
        });
      }
    });
    
    // Add matching categories
    const categories = [...new Set(faqs.map(faq => faq.category))];
    categories.forEach(category => {
      if (category.toLowerCase().includes(query)) {
        const faqInCategory = faqs.find(f => f.category === category);
        suggestions.push({
          text: `${category} FAQs`,
          type: 'category',
          icon: faqInCategory?.icon || <FiHelpCircle />,
          category: category
        });
      }
    });
    
    // Add matching meta/tags
    faqs.forEach(faq => {
      if (faq.meta.toLowerCase().includes(query)) {
        suggestions.push({
          text: faq.meta,
          type: 'tag',
          icon: faq.icon,
          category: faq.category
        });
      }
    });
    
    return suggestions.slice(0, 5); // Limit to 5 suggestions
  }, [searchQuery, faqs]);

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    
    const query = searchQuery.toLowerCase();
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query) ||
      faq.meta.toLowerCase().includes(query) ||
      faq.category.toLowerCase().includes(query)
    );
  }, [searchQuery, faqs]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && 
          !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation for suggestions
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        if (showSuggestions && searchSuggestions.length > 0) {
          e.preventDefault();
          setSelectedSuggestionIndex(prev => 
            prev < searchSuggestions.length - 1 ? prev + 1 : 0
          );
        }
        break;
      
      case 'ArrowUp':
        if (showSuggestions && searchSuggestions.length > 0) {
          e.preventDefault();
          setSelectedSuggestionIndex(prev => 
            prev > 0 ? prev - 1 : searchSuggestions.length - 1
          );
        }
        break;
      
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0 && searchSuggestions.length > 0) {
          const suggestion = searchSuggestions[selectedSuggestionIndex];
          handleSuggestionSelect(suggestion);
        }
        break;
      
      case 'Escape':
        e.preventDefault();
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        inputRef.current?.blur();
        break;

      case 'Backspace':
        if (searchQuery.length > 0) {
          setShowSuggestions(true);
        }
        break;
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    
    // Find and open the corresponding FAQ
    const faqIndex = faqs.findIndex(faq => 
      faq.question === suggestion.text || 
      faq.category === suggestion.category
    );
    if (faqIndex !== -1) {
      setActiveIndex(faqIndex);
    }
    
    // Scroll to the selected FAQ item
    setTimeout(() => {
      const selectedElement = document.querySelector(`.faq-item:nth-child(${faqIndex + 1})`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleSuggestionClick = (suggestion, index) => {
    handleSuggestionSelect(suggestion);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    inputRef.current?.focus();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 0);
    setSelectedSuggestionIndex(-1);
  };

  const handleInputFocus = () => {
    if (searchQuery.length > 0) {
      setShowSuggestions(true);
    }
  };

  const EmptyState = () => (
    <div className="faq-empty-state">
      <FiMessageSquare className="empty-icon" />
      <h3>No matching questions found</h3>
      <p>Try searching with different keywords like "ordering", "shipping", or "account"</p>
    </div>
  );

  const getCategoryLabel = (category) => {
    const labels = {
      ordering: 'Ordering',
      account: 'Account',
      billing: 'Billing',
      providers: 'Providers',
      notifications: 'Notifications',
      consultations: 'Consultations',
      safety: 'Safety',
      privacy: 'Privacy',
      shipping: 'Shipping',
      medication: 'Medication',
      orders: 'Orders'
    };
    return labels[category] || category;
  };

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <section className="faq-hero">
        <div className='hero-icon-title-container'>
          <h1 className="faq-title">FAQs</h1>
        </div>
        <p className="faq-subtitle">
          We understand that starting a new treatment or booking healthcare services online can come with questions. 
          Below are some of the most common questions patients ask about using Aaron Arredondo, along with clear answers to help guide you through your experience.
        </p>
        
        {/* Search Bar with Suggestions */}
        <div className="search-container-faq" ref={searchContainerRef}>
          <div className="search-wrapper-faq">
            <FiSearch className="search-icon-faq" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for questions..."
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
              className="search-input-faq"
              aria-label="Search FAQ questions"
            />
            {searchQuery && (
              <button 
                className="clear-search-button"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <FiX />
              </button>
            )}
            
            {/* Search Suggestions Dropdown */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <div 
                className={`search-suggestions ${showSuggestions ? 'active' : ''}`}
                ref={suggestionsRef}
              >
                <div className="suggestions-header">
                  <span className="suggestions-title">Suggestions</span>
                  <button 
                    className="close-suggestions-button"
                    onClick={() => setShowSuggestions(false)}
                    aria-label="Close suggestions"
                  >
                    <FiX />
                  </button>
                </div>
                {searchSuggestions.map((suggestion, index) => (
                  <div
                    key={`${suggestion.type}-${index}`}
                    className={`suggestion-item ${selectedSuggestionIndex === index ? 'selected' : ''}`}
                    onClick={() => handleSuggestionClick(suggestion, index)}
                    onMouseEnter={() => setSelectedSuggestionIndex(index)}
                    onTouchStart={() => setSelectedSuggestionIndex(index)}
                  >
                    <span className="icon">
                      {suggestion.type === 'question' ? <FiCornerDownRight /> : suggestion.icon}
                    </span>
                    <span className="suggestion-text">{suggestion.text}</span>
                    <span className="suggestion-category">
                      {getCategoryLabel(suggestion.category)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <div className="faq-container">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              style={{ '--index': index }}
              id={`faq-${index}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                <div className="question-content">
                  <div className="question-header">
                    <div className="question-icon-wrapper">
                      <div className="question-icon">{faq.icon}</div>
                    </div>
                    <span className="question-text">{faq.question}</span>
                  </div>
                  {faq.meta && (
                    <div className="question-meta">{faq.meta}</div>
                  )}
                </div>
                <div className="question-toggle">
                  {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                </div>
              </button>
              
              <div className="faq-answer">
                <div className="answer-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-header">
          <h3>Still Have Questions?</h3>
          <p className="contact-text">
            Can't find what you're looking for? Our support team is here to help you with any questions or concerns.
          </p>
        </div>
        <div className="contact-buttons">
          <a href="/contact" className="contact-button primary">
            Contact Support
          </a>
          <a href="tel:+1-800-HEALTH" className="contact-button secondary">
            Call Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
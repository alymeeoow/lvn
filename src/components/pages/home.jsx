import React, { useState, useRef, useEffect } from 'react';
import '../../assets/styles/home.css';
import ProductModal from '../modals/ProductModal'; // Import the modal component
import Tirzepatide from "../../assets/images/home/tirzepatide.png"
import Semaglitude  from "../../assets/images/home/semaglitude.png"
import SemaglitudeInj  from "../../assets/images/home/semaglutideInj.png"
import Tablet  from "../../assets/images/home/tablet.jpg"
import OralWeightLoss  from "../../assets/images/home/oral-weight-loss.jpg"
import Liraglutide from "../../assets/images/home/liraglutide.png"


import HairLossOralMedication from "../../assets/images/home/hair-loss-oral-medication.jpg"
import HairLossScalpTopicalMedication from "../../assets/images/home/hair-loss-scalp-topical-medication.png"


import PT141 from "../../assets/images/home/PT141.png"
import OxytocinNasalSpray from "../../assets/images/home/oxytocin-nasal-spray.jpg"
import Oxytocin100IU from "../../assets/images/home/oxytocin-100-iu-troche.png"
import Oxybutynin from "../../assets/images/home/oxybutynin.png"
import Tadalafill from "../../assets/images/home/tadalafill.png"
import ErectileDysfunction from "../../assets/images/home/erectile-dysfunction.png"


import AcneGel from "../../assets/images/home/acne-gel.jpg"
import AcneCream from "../../assets/images/home/acne-cream.jpg"
import Doxycycline from "../../assets/images/home/doxycycline.jpg"

import Nicotinamide from "../../assets/images/home/nicotinamide.png"
import LowDoseNaltrexne from "../../assets/images/home/low-dose-naltrexne.jpg"
import AntiAgingTopicalGel from "../../assets/images/home/anti-aging-topical-gel.jpg"
import NadInjection from "../../assets/images/home/nad-injection.png"
import AntiAgingTopicalCream from "../../assets/images/home/anti-aging-topical-cream.jpg"
import VitaminB12 from "../../assets/images/home/vitamin-b12.png"
import NadPatches from "../../assets/images/home/nad-patches.png"
import NadNasalSpray from "../../assets/images/home/nad-nasal-spray.png"
import Methylene from "../../assets/images/home/methyline-blue-capsule.jpg"
import Gluta from "../../assets/images/home/gluta.png"

import Sermorelin from "../../assets/images/home/sermorelin.png"
import Lcarnitine from "../../assets/images/home/l-carnitine.png"
import SkinnyShotsMicc from "../../assets/images/home/skinny-shots-micc.png"
import SkinnyShots from "../../assets/images/home/skinny-shots.png"

import SermorelinSublingual from "../../assets/images/home/sermorelin-sublingual.jpg"

import PinealonPE22 from "../../assets/images/home/pinealon.png"
import MK677 from "../../assets/images/home/mk-677.png"
import SermorelinInjection from "../../assets/images/home/sermorelin-injection.png"
import CjcIpamorelin from "../../assets/images/home/cjc-ipamorelin.png"
import BP157Tb500 from "../../assets/images/home/bp-157-tb-500.png"
import BPC157Kpvtb500 from "../../assets/images/home/bpc-157-kpv-tb-500.png"
import BPC157 from "../../assets/images/home/bpc-157.png"
import BPC157GhkUKpvTb500 from "../../assets/images/home/bpc-157-ghk-u-kpv-tb-500.png"
import Epitalon from "../../assets/images/home/ghk-cu-epitalon.png"
import BPC157AcetateCapsule from "../../assets/images/home/bpc-157-acetate-capsule.png"
import GhkCu from "../../assets/images/home/ghk-cu.png"
import IgfLr3 from "../../assets/images/home/igf-lr3.png"
import SemaxSelank from "../../assets/images/home/semax-selank.png"
import TesamorelinIpamorelin from "../../assets/images/home/tesamorelin-ipamorelin.png"
       
import { 
  FiTruck, 
  FiStar, 
  FiPlus,
  FiChevronRight,
  FiChevronLeft,
  FiHeart,
  FiShield,
  FiUserCheck,
  FiCheckCircle,
  FiArrowRight,
  FiDroplet,
  FiPackage,
  FiZap,
  FiActivity,
  FiCrosshair,
  FiAward,
  FiTrendingUp
} from 'react-icons/fi';
import {
  GiWeightScale,
  GiHairStrands,
  GiLoveInjection,
  GiStaryu,
  GiAppleSeeds,
  GiChemicalDrop,
  GiSpray,
  GiMedicinePills,
  GiHealthPotion,
  GiHealing,
  GiSyringe,
  GiStomach,
  GiBrain,
  GiMuscleUp,
  GiHeartBeats
} from 'react-icons/gi';
import {
  MdHealthAndSafety,
  MdLocalPharmacy,
  MdOutlineSupportAgent,
  MdOutlineLocalHospital,
  MdOutlineScience,
  MdOutlineMedication,
  MdOutlineSpa,
  MdOutlineHealing,
  MdOutlineVaccines
} from 'react-icons/md';
import {
  FaCapsules,
  FaTablets,
  FaSyringe,
  FaPills,
  FaFlask,
  FaTint,
  FaPrescriptionBottle,
  FaSprayCan,
  FaBandAid,
  FaRegStar,
  FaStar
} from 'react-icons/fa';
import { 
  TbMedicineSyrup, 
  TbPill, 
  TbBandage,
  TbDroplet,
  TbAtom,
  TbBrain,
  TbHeartbeat,
  TbGrowth
} from 'react-icons/tb';

// Product images mapping
const productImages = {
  // Weight Management
  'Tirzepatide': Tirzepatide,
  
  'Semaglutide Sublingual':Semaglitude,
  'Semaglutide Injection': SemaglitudeInj,
  'Phentermine HCl Tablet': Tablet,
  'Metformin HCl ER Tablet': Tablet,
  'Oral Weight Loss Capsules':OralWeightLoss,
  'Liraglutide': Liraglutide,
  
  // Hair Loss
  'Hair Loss Oral Medication': HairLossOralMedication,
  'Hair Loss Scalp Topical Medication': HairLossScalpTopicalMedication,
  
  // Sexual Health
  'PT-141 (bremelanotide) Injectable': PT141,
  'Oxytocin Nasal Spray': OxytocinNasalSpray,

  'Oxytocin 100 IU Troche':  Oxytocin100IU,
  'Oxybutynin': Oxybutynin,

  'Tadalafil + Oxytocin Troche': Tadalafill,
  'Erectile Dysfunction Medication': ErectileDysfunction,
  // Acne
  'Acne Gel':AcneGel,
  'Acne Cream':AcneCream,
  'Doxycycline Hyclate for Acne':Doxycycline,
  
  // Anti-Aging
  'Nicotinamide Riboside (NR) Injectable':Nicotinamide,
  'Low Dose Naltrexone': LowDoseNaltrexne,
  'Anti Aging Topical Gel': AntiAgingTopicalGel,
  'NAD+ Injection': NadInjection,
  'Anti Aging Topical Cream': AntiAgingTopicalCream,
  'Vitamin B12 Injection': VitaminB12,
  'NAD+ Patches': NadPatches,
  'NAD+ Nasal Spray': NadNasalSpray,
  'Methylene Blue Capsules': Methylene,
  'Glutathione': Gluta,
  
  // Appetite Suppressant
  'Sermorelin Troche':Sermorelin,
  'L-Carnitine': Lcarnitine,
  'Skinny Shots - MICC': SkinnyShotsMicc,
  'Skinny Shots': SkinnyShots,
  
  // Peptides
  'Sermorelin Sublingual': SermorelinSublingual,
  'Pinealon/PE22-28/Selank': PinealonPE22,
  'MK-677 (Ibutamoren)': MK677,
  'Sermorelin Injection': SermorelinInjection,
  'CJC/Ipamorelin': CjcIpamorelin,
  'BP-157/TB500': BP157Tb500,
  'BPC-157/KPV/TB500': BPC157Kpvtb500,
  'BPC - 157': BPC157,
  'BPC-157/GHK-U/KPV/TB500': BPC157GhkUKpvTb500,
  'GHK-Cu/Epitalon':Epitalon,
  'BPC-157 ACETATE Capsule': BPC157AcetateCapsule,
  'GHK-Cu': GhkCu,
  'IGF-LR3': IgfLr3,
  'Semax/Selank': SemaxSelank,
  'Tesamorelin / Ipamorelin': TesamorelinIpamorelin,
  'DSIP/BPC/CJC': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format',
  'DSIP': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format',
  'MOTS-C': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format',
  'Epitalon': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format',
  'Thymosin A-1': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format',
  'LL-37': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format',
  'Tesamorelin': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format',
  
  // Default fallback
  'default': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format'
};

// Product type icons mapping with working icons
const typeIcons = {
  'Injection': <GiSyringe />,
  'Tablet': <FaTablets />,
  'Capsule': <GiMedicinePills />,
  'Sublingual': <GiMedicinePills />,
  'Troche': <GiMedicinePills />,
  'Spray': <GiSpray />,
  'Gel': <GiMedicinePills />,
  'Cream': <GiMedicinePills />,
  'Topical': <GiMedicinePills />,
  'Patch': <FaBandAid />,
  'Various': <FaSyringe />,
  'Peptide': <GiChemicalDrop />,
  'Oral': <GiMedicinePills />,
  'Nasal': <GiSpray />
};

const Homepage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState({
    weight: false,
    hair: false,
    sexual: false,
    acne: false,
    aging: false,
    appetite: false,
    peptides: false
  });
  const [canScrollRight, setCanScrollRight] = useState({
    weight: true,
    hair: true,
    sexual: true,
    acne: true,
    aging: true,
    appetite: true,
    peptides: true
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  const handleAddToCart = (product) => {
    alert(`Added ${product.name} to cart!`);
    // Here you would typically add to cart state or context
    handleCloseModal();
  };

  const carouselRefs = {
    weight: useRef(null),
    hair: useRef(null),
    sexual: useRef(null),
    acne: useRef(null),
    aging: useRef(null),
    appetite: useRef(null),
    peptides: useRef(null)
  };

  const [activeSlides, setActiveSlides] = useState({
    weight: 0,
    hair: 0,
    sexual: 0,
    acne: 0,
    aging: 0,
    appetite: 0,
    peptides: 0
  });

  // Product information for modals
  const productInfo = {
    'Tirzepatide': {
      title: 'Tirzepatide for Weight Loss Support',
      description: 'Tirzepatide is a prescriptive weight loss support medication designed to assist you in achieving and maintaining a healthier weight. When combined with a reduced calorie diet and increased physical activity, Tirzepatide can be a powerful tool for sustainable weight loss.',
      benefits: [
        'Enhanced Weight Reduction: Clinical studies show superior results versus other GLP-1 therapies.',
        'Improved Glucose Control: Beneficial for individuals with insulin resistance or prediabetes.',
        'Long-Term Support: Shown to support extended weight loss maintenance over time.'
      ],
      howItWorks: [
        'Step 1: Online Pre-Assessment - Complete a short pre-assessment to determine your eligibility for Tirzepatide therapy.',
        'Step 2: Telehealth Consultation - Book a virtual consultation with a licensed healthcare provider. They will tailor a Tirzepatide program to your specific needs.',
        'Step 3: Order & Start - Once approved, order Tirzepatide through our secure web platform. When it arrives, follow your provider\'s instructions to begin your program.'
      ],
      warnings: [
        'History of Medullary Thyroid Carcinoma (MTC)',
        'History of Multiple Endocrine Neoplasia, type 2 (MEN2)',
        'Allergic reaction to Tirzepatide or its ingredients',
        'Diabetic retinopathy',
        'Pregnant, trying to become pregnant, or breastfeeding',
        'Under 18 years old',
        'Depression with suicidal thoughts',
        'History of pancreatitis',
        'Kidney disease or insufficiency',
        'Stomach issues or GI disorders',
        'Diagnosed with Diabetes (consult your primary care or endocrinologist)'
      ],
      disclaimer: 'Tirzepatide is available by prescription only. This information is for educational purposes and does not replace professional medical advice. Consult your healthcare provider to determine if Tirzepatide is right for you.\n\n© 2025 Healthcare Prosoft Medical Management Company. All rights reserved.'
    },
    // Add more product info as needed
    'Semaglutide Sublingual': {
      title: 'Semaglutide Sublingual for Weight Management',
      description: 'Semaglutide sublingual tablets offer a convenient, needle-free alternative for weight management and glucose control.',
      benefits: [
        'No injections required',
        'Easy sublingual administration',
        'Effective weight loss support'
      ],
      howItWorks: [
        'Step 1: Place tablet under tongue',
        'Step 2: Allow to dissolve completely',
        'Step 3: Avoid eating or drinking for 30 minutes'
      ],
      warnings: [
        'Consult healthcare provider before use',
        'Not for use during pregnancy',
        'Monitor for side effects'
      ],
      disclaimer: 'Prescription medication. Consult your doctor.'
    }
  };

  // Add scroll event listeners to update active slides
  useEffect(() => {
    categories.forEach(category => {
      const carousel = carouselRefs[category.id].current;
      if (carousel) {
        const handleScroll = () => {
          const scrollLeft = carousel.scrollLeft;
          const cardWidth = 350; // Should match CSS
          const slideIndex = Math.round(scrollLeft / cardWidth);
          setActiveSlides(prev => ({
            ...prev,
            [category.id]: Math.max(0, Math.min(slideIndex, Math.min(category.products.length - 1, 5)))
          }));
          
          // Check scroll position for buttons
          const canScrollLeft = carousel.scrollLeft > 0;
          const canScrollRight = carousel.scrollLeft < (carousel.scrollWidth - carousel.clientWidth - 10);
          
          setCanScrollLeft(prev => ({ ...prev, [category.id]: canScrollLeft }));
          setCanScrollRight(prev => ({ ...prev, [category.id]: canScrollRight }));
        };
        
        carousel.addEventListener('scroll', handleScroll);
        return () => carousel.removeEventListener('scroll', handleScroll);
      }
    });
  }, []);

  // Check scroll position for each carousel
  const checkScrollPosition = (categoryId) => {
    const carousel = carouselRefs[categoryId].current;
    if (!carousel) return;

    const canScrollLeft = carousel.scrollLeft > 0;
    const canScrollRight = carousel.scrollLeft < (carousel.scrollWidth - carousel.clientWidth - 10); // Small buffer
    
    setCanScrollLeft(prev => ({ ...prev, [categoryId]: canScrollLeft }));
    setCanScrollRight(prev => ({ ...prev, [categoryId]: canScrollRight }));
  };

  // Hero section
  const HeroSection = () => (
    <section className="hero-section">
      <div className="hero-content">
      
        <h1 className="hero-title">
          Personalized care,<br />delivered to your door
        </h1>
        <p className="hero-subtitle">
          Expert-backed treatments designed just for you—all from the comfort of home.
        </p>
        <div className="hero-cta-group">
          <button className="hero-button primary">
            Get Started <FiChevronRight className="button-icon" />
          </button>
          <button className="hero-button secondary">
            Learn More
          </button>
        </div>
        <div className="hero-features">
          <div className="feature">
            <FiCheckCircle /> Free Delivery
          </div>
          <div className="feature">
            <FiCheckCircle /> Doctor Consultation
          </div>
          <div className="feature">
            <FiCheckCircle /> Personalized Plans
          </div>
        </div>
      </div>
      <div className="hero-image">
        <div className="hero-icon-container">
          <FiTruck className="hero-icon" />
          <div className="delivery-pulse"></div>
        </div>
      </div>
    </section>
  );

  // Category Data with Products - EXACT PRODUCTS AS LISTED
  const categories = [
    {
      id: 'weight',
      title: 'Weight Management',
  
      icon: <GiWeightScale />,
      products: [
        {
          id: 'weight-1',
          name: 'Tirzepatide',
          type: 'Injection',
       
          price: '$299/mo',
          features: ['Weekly Injection', 'FDA Approved', 'Custom Dosage'],
          popular: true
        },
        {
          id: 'weight-2',
          name: 'Semaglutide Sublingual',
          type: 'Sublingual',
    
          price: '$249/mo',
          features: ['Daily Sublingual', 'No Injection Needed', 'Effective Weight Loss'],
          popular: false
        },
        {
          id: 'weight-3',
          name: 'Semaglutide Injection',
          type: 'Injection',
          
          price: '$279/mo',
          features: ['Weekly Injection', 'Proven Results', 'Medical Supervision'],
          popular: true
        },
        {
          id: 'weight-4',
          name: 'Phentermine HCl Tablet',
          type: 'Tablet',
        
          price: '$129/mo',
          features: ['Daily Tablet', 'Fast Acting', '30-Day Supply'],
          popular: false
        },
        {
          id: 'weight-5',
          name: 'Metformin HCl ER Tablet',
          type: 'Tablet',
        
          price: '$89/mo',
          features: ['Extended Release', 'Metabolic Support', 'Affordable'],
          popular: false
        },
        {
          id: 'weight-6',
          name: 'Oral Weight Loss Capsules',
          type: 'Capsule',
     
          price: '$79/mo',
          features: ['Daily Capsule', 'All Natural', 'No Prescription'],
          popular: false
        },
        {
          id: 'weight-7',
          name: 'Liraglutide',
          type: 'Injection',
      
          price: '$269/mo',
          features: ['Daily Injection', 'Flexible Dosing', 'Effective'],
          popular: false
        }
      ]
    },
    {
      id: 'hair',
      title: 'Hair Loss',
      
      icon: <GiHairStrands />,
      products: [
        {
          id: 'hair-1',
          name: 'Hair Loss Oral Medication',
          type: 'Tablet',
     
          price: '$189/mo',
          features: ['Daily Tablet', 'DHT Blocker', 'Clinically Proven'],
          popular: true
        },
        {
          id: 'hair-2',
          name: 'Hair Loss Scalp Topical Medication',
          type: 'Topical',
      
          price: '$149/mo',
          features: ['Daily Application', 'Targeted Treatment', 'No Side Effects'],
          popular: false
        }
      ]
    },
    {
      id: 'sexual',
      title: 'Sexual Health',

      icon: <GiLoveInjection />,
      products: [
        {
          id: 'sexual-1',
          name: 'PT-141 (bremelanotide) Injectable',
          type: 'Injection',
          price: '$349/mo',
          features: ['As Needed', 'Fast Acting', 'High Efficacy'],
          popular: true
        },
        {
          id: 'sexual-2',
          name: 'Oxytocin Nasal Spray',
          type: 'Spray',
        
          price: '$129/mo',
          features: ['Nasal Delivery', 'Quick Absorption', 'Natural Hormone'],
          popular: false
        },
        {
          id: 'sexual-3',
          name: 'Oxytocin 100 IU Troche',
          type: 'Troche',
     
          price: '$119/mo',
          features: ['Sublingual', 'Quick Dissolve', 'Convenient'],
          popular: false
        },
        {
          id: 'sexual-4',
          name: 'Oxybutynin',
          type: 'Tablet',
      
          price: '$99/mo',
          features: ['Daily Tablet', 'Prescription Required', 'Effective'],
          popular: false
        },
        {
          id: 'sexual-5',
          name: 'Tadalafil + Oxytocin Troche',
          type: 'Troche',

          price: '$279/mo',
          features: ['Combo Therapy', 'Quick Dissolve', 'Enhanced Effects'],
          popular: true
        },
        {
          id: 'sexual-6',
          name: 'Erectile Dysfunction Medication',
          type: 'Various',
     
          price: '$199/mo',
          features: ['Multiple Options', 'Doctor Prescribed', 'Customized'],
          popular: false
        }
      ]
    },
    {
      id: 'acne',
      title: 'Acne',
  
      icon: <TbBandage />,
      products: [
        {
          id: 'acne-1',
          name: 'Acne Gel',
          type: 'Gel',
     
          price: '$89/mo',
          features: ['Daily Application', 'Non-Comedogenic', 'Prescription Strength'],
          popular: true
        },
        {
          id: 'acne-2',
          name: 'Acne Cream',
          type: 'Cream',
      
          price: '$79/mo',
          features: ['Moisturizing', 'Acne Fighting', 'Skin Repair'],
          popular: false
        },
        {
          id: 'acne-3',
          name: 'Doxycycline Hyclate for Acne',
          type: 'Tablet',
      
          price: '$99/mo',
          features: ['Daily Tablet', 'Antibiotic', 'Severe Acne'],
          popular: false
        }
      ]
    },
    {
      id: 'aging',
      title: 'Anti-Aging',

      icon: <GiStaryu />,
      products: [
        {
          id: 'aging-1',
          name: 'Nicotinamide Riboside (NR) Injectable',
          type: 'Injection',
    
          price: '$349/mo',
          features: ['Weekly Injection', 'NAD+ Boost', 'Cellular Energy'],
          popular: true
        },
        {
          id: 'aging-2',
          name: 'Low Dose Naltrexone',
          type: 'Tablet',
        
          price: '$89/mo',
          features: ['Daily Tablet', 'Immune Support', 'Anti-Inflammatory'],
          popular: false
        },
        {
          id: 'aging-3',
          name: 'Anti Aging Topical Gel',
          type: 'Gel',
       
          price: '$129/mo',
          features: ['Daily Application', 'Retinol Based', 'Collagen Boost'],
          popular: false
        },
        {
          id: 'aging-4',
          name: 'NAD+ Injection',
          type: 'Injection',
      
          price: '$399/mo',
          features: ['Weekly Injection', 'Cellular Repair', 'Energy Boost'],
          popular: true
        },
        {
          id: 'aging-5',
          name: 'Anti Aging Topical Cream',
          type: 'Cream',
  
          price: '$119/mo',
          features: ['Daily Application', 'Hydrating', 'Skin Firming'],
          popular: false
        },
        {
          id: 'aging-6',
          name: 'Vitamin B12 Injection',
          type: 'Injection',
    
          price: '$79/mo',
          features: ['Weekly/Monthly', 'Energy Boost', 'Metabolic Support'],
          popular: false
        },
        {
          id: 'aging-7',
          name: 'NAD+ Patches',
          type: 'Patch',
          price: '$199/mo',
          features: ['Daily Patch', 'Sustained Release', 'No Injection'],
          popular: false
        },
        {
          id: 'aging-8',
          name: 'NAD+ Nasal Spray',
          type: 'Spray',
   
          price: '$179/mo',
          features: ['Nasal Delivery', 'Quick Absorption', 'Convenient'],
          popular: false
        },
        {
          id: 'aging-9',
          name: 'Methylene Blue Capsules',
          type: 'Capsule',
     
          price: '$149/mo',
          features: ['Daily Capsule', 'Cognitive Support', 'Mitochondrial Health'],
          popular: false
        },
        {
          id: 'aging-10',
          name: 'Glutathione',
          type: 'Injection',
     
          price: '$179/mo',
          features: ['Weekly Injection', 'Detox Support', 'Skin Brightening'],
          popular: true
        }
      ]
    },
    {
      id: 'appetite',
      title: 'Appetite Suppressant',
  
      icon: <GiAppleSeeds />,
      products: [
        {
          id: 'appetite-1',
          name: 'Sermorelin Troche',
          type: 'Troche',
      
          price: '$159/mo',
          features: ['Daily Troche', 'Natural Appetite Control', 'Metabolism Boost'],
          popular: true
        },
        {
          id: 'appetite-2',
          name: 'L-Carnitine',
          type: 'Injection',
      
          price: '$99/mo',
          features: ['Weekly Injection', 'Fat Metabolism', 'Energy Boost'],
          popular: false
        },
        {
          id: 'appetite-3',
          name: 'Skinny Shots - MICC',
          type: 'Injection',
   
          price: '$129/mo',
          features: ['Weekly Injection', 'Multi-Nutrient', 'Metabolism Boost'],
          popular: true
        },
        {
          id: 'appetite-4',
          name: 'Skinny Shots',
          type: 'Injection',
    
          price: '$109/mo',
          features: ['Weekly Injection', 'Energy Support', 'Appetite Control'],
          popular: false
        }
      ]
    },
    {
      id: 'peptides',
      title: 'Peptides',

      icon: <GiChemicalDrop />,
      products: [
        {
          id: 'peptide-1',
          name: 'Sermorelin Sublingual',
          type: 'Sublingual',

          price: '$169/mo',
          features: ['Daily Sublingual', 'Growth Hormone Release', 'Anti-Aging'],
          popular: false
        },
        {
          id: 'peptide-2',
          name: 'Pinealon/PE22-28/Selank',
          type: 'Peptide',

          price: '$229/mo',
          features: ['Cognitive Support', 'Anxiety Reduction', 'Neuroprotection'],
          popular: false
        },
        {
          id: 'peptide-3',
          name: 'MK-677 (Ibutamoren)',
          type: 'Peptide',
     
          price: '$249/mo',
          features: ['Muscle Growth', 'Improved Sleep', 'Increased Appetite'],
          popular: true
        },
        {
          id: 'peptide-4',
          name: 'Sermorelin Injection',
          type: 'Injection',
       
          price: '$279/mo',
          features: ['Daily Injection', 'Anti-Aging', 'Muscle Growth'],
          popular: true
        },
        {
          id: 'peptide-5',
          name: 'CJC/Ipamorelin',
          type: 'Peptide',
 
          price: '$299/mo',
          features: ['Growth Hormone Stimulation', 'Fat Loss', 'Muscle Growth'],
          popular: true
        },
        {
          id: 'peptide-6',
          name: 'BP-157/TB500',
          type: 'Peptide',

          price: '$269/mo',
          features: ['Tissue Repair', 'Anti-Inflammatory', 'Joint Support'],
          popular: false
        },
        {
          id: 'peptide-7',
          name: 'BPC-157/KPV/TB500',
          type: 'Peptide',
 
          price: '$289/mo',
          features: ['Enhanced Healing', 'Gut Health', 'Anti-Inflammatory'],
          popular: false
        },
        {
          id: 'peptide-8',
          name: 'BPC - 157',
          type: 'Peptide',
    
          price: '$229/mo',
          features: ['Gut Healing', 'Tissue Repair', 'Anti-Inflammatory'],
          popular: true
        },
        {
          id: 'peptide-9',
          name: 'BPC-157/GHK-U/KPV/TB500',
          type: 'Peptide',

          price: '$329/mo',
          features: ['Complete Healing', 'Skin Repair', 'Anti-Aging'],
          popular: false
        },
        {
          id: 'peptide-10',
          name: 'GHK-Cu/Epitalon',
          type: 'Peptide',
   
         price: '$299/mo',
          features: ['Skin Rejuvenation', 'Telomere Support', 'Anti-Aging'],
          popular: false
        },
        {
          id: 'peptide-11',
          name: 'BPC-157 ACETATE Capsule',
          type: 'Capsule',
     
          price: '$199/mo',
          features: ['Oral Delivery', 'Systemic Healing', 'Convenient'],
          popular: false
        },
        {
          id: 'peptide-12',
          name: 'GHK-Cu',
          type: 'Peptide',
    
          price: '$219/mo',
          features: ['Skin Rejuvenation', 'Collagen Production', 'Wound Healing'],
          popular: false
        },
        {
          id: 'peptide-13',
          name: 'IGF-LR3',
          type: 'Peptide',
   
          price: '$349/mo',
          features: ['Muscle Growth', 'Recovery', 'Performance'],
          popular: true
        },
        {
          id: 'peptide-14',
          name: 'Semax/Selank',
          type: 'Peptide',
     
          price: '$259/mo',
          features: ['Cognitive Enhancement', 'Anxiety Reduction', 'Focus'],
          popular: false
        },
        {
          id: 'peptide-15',
          name: 'Tesamorelin / Ipamorelin',
          type: 'Peptide',
       
          price: '$319/mo',
          features: ['Growth Hormone Release', 'Fat Loss', 'Anti-Aging'],
          popular: false
        },
        {
          id: 'peptide-16',
          name: 'DSIP/BPC/CJC',
          type: 'Peptide',
     
          price: '$279/mo',
          features: ['Sleep Improvement', 'Healing Support', 'Growth Hormone'],
          popular: false
        },
        {
          id: 'peptide-17',
          name: 'DSIP',
          type: 'Peptide',

          price: '$189/mo',
          features: ['Sleep Improvement', 'Natural Sleep', 'Non-Habit Forming'],
          popular: false
        },
        {
          id: 'peptide-18',
          name: 'MOTS-C',
          type: 'Peptide',
  
          price: '$239/mo',
          features: ['Metabolic Support', 'Exercise Performance', 'Anti-Aging'],
          popular: false
        },
        {
          id: 'peptide-19',
          name: 'Epitalon',
          type: 'Peptide',
      
          price: '$249/mo',
          features: ['Telomere Support', 'Anti-Aging', 'Longevity'],
          popular: false
        },
        {
          id: 'peptide-20',
          name: 'Thymosin A-1',
          type: 'Peptide',
       
          price: '$269/mo',
          features: ['Immune Support', 'Infection Resistance', 'Anti-Viral'],
          popular: false
        },
        {
          id: 'peptide-21',
          name: 'LL-37',
          type: 'Peptide',
 
          price: '$229/mo',
          features: ['Antimicrobial', 'Immune Support', 'Wound Healing'],
          popular: false
        },
        {
          id: 'peptide-22',
          name: 'Tesamorelin',
          type: 'Peptide',
    
          price: '$349/mo',
          features: ['Visceral Fat Reduction', 'Growth Hormone Release', 'Anti-Aging'],
          popular: true
        }
      ]
    }
  ];

 const scrollCarousel = (categoryId, direction) => {
    const carousel = carouselRefs[categoryId].current;
    if (!carousel) return;

    const cardWidth = 350; // Card width + gap
    const visibleCards = Math.floor(carousel.clientWidth / cardWidth);
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const currentScroll = carousel.scrollLeft;
    
    let newScroll;
    if (direction === 'next') {
      newScroll = Math.min(currentScroll + (visibleCards * cardWidth), maxScroll);
    } else {
      newScroll = Math.max(currentScroll - (visibleCards * cardWidth), 0);
    }
    
    carousel.scrollTo({
      left: newScroll,
      behavior: 'smooth'
    });
  };

  // Product Card Component
  const ProductCard = ({ product }) => (
    <div className="product-card">
      <div 
        className="card-image-container" 
        onClick={() => handleProductClick(product)}
        style={{ cursor: 'pointer' }}
      >
        <img 
          src={productImages[product.name] || productImages['default']}
          alt={product.name}
          className="card-image"
          onError={(e) => {
            e.target.src = productImages['default'];
          }}
        />
        <div className="image-overlay">
          <div className="product-type-badge">
            {typeIcons[product.type] || <GiMedicinePills />}
            <span>{product.type}</span>
          </div>
          {product.popular && (
            <div className="popular-badge">
              <FaStar /> Popular
            </div>
          )}
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{product.name}</h3>
      
        <div className="card-features">
          {product.features.map((feature, index) => (
            <span key={index} className="feature-tag">
              <FiCheckCircle /> {feature}
            </span>
          ))}
        </div>
      </div>
      
      <div className="card-footer">
        <div className="price-section">
          <span className="price">{product.price}</span>
          <span className="price-note">Monthly Treatment Plan</span>
        </div>
        <button className="add-button" onClick={() => handleAddToCart(product)}>
          <FiPlus /> Add
        </button>
      </div>
    </div>
  );

  // Category Section Component
  const CategorySection = ({ category }) => (
    <section className="category-section" key={category.id}>
      <div className="category-header">
        <div className="category-title-section">
          <div className="category-icon-title">
            <div className="category-icon">
              {category.icon}
            </div>
            <div>
              <h2 className="section-title">{category.title}</h2>
              <p className="section-subtitle">{category.description}</p>
            </div>
          </div>
          <div className="category-stats">
            <span className="product-count">{category.products.length} Products Available</span>
            <button className="view-all-button">
              View All <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
      
      <div className="category-carousel-container">
        <button 
          className="carousel-button prev" 
          onClick={() => scrollCarousel(category.id, 'prev')}
        >
          <FiChevronLeft />
        </button>
        
        <div className="carousel-wrapper">
          <div 
            className="carousel-track" 
            ref={carouselRefs[category.id]}
          >
            {category.products.map((product) => (
              <div key={product.id} className="carousel-slide">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        
        <button 
          className="carousel-button next" 
          onClick={() => scrollCarousel(category.id, 'next')}
        >
          <FiChevronRight />
        </button>
      </div>
    </section>  );

  // Trust indicators
  const trustIndicators = [
    { icon: <MdHealthAndSafety />, text: 'Doctor-Trusted Treatments' },
    { icon: <FiShield />, text: 'Secure & Confidential' },
    { icon: <FiUserCheck />, text: 'Personalized Plans' },
    { icon: <MdLocalPharmacy />, text: 'Pharmacy Grade' },
    { icon: <FiHeart />, text: 'Patient-Centered Care' },
    { icon: <MdOutlineSupportAgent />, text: '24/7 Support' }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <HeroSection />

      {/* Individual Category Sections */}
      {categories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}

      {/* Trust Section */}
      <section className="trust-section">
        <div className="section-header">
          <h2 className="section-title">Trusted by doctors, made for you</h2>
          <p className="section-subtitle">
            Customized health solutions to fit your lifestyle and goals
          </p>
        </div>
        
        <div className="trust-grid">
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="trust-card">
              <div className="trust-icon">
                {indicator.icon}
              </div>
              <p className="trust-text">{indicator.text}</p>
            </div>
          ))}
        </div>
        
        <div className="cta-section">
          <button className="cta-button primary">
            Get Started Today <FiChevronRight />
          </button>
          <button className="cta-button secondary">
            View All Services
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">
              <FiStar className="footer-icon" /> Personalized Healthcare
            </h3>
            <p className="footer-text">
              Expert-backed treatments designed specifically for your needs, 
              delivered conveniently to your doorstep.
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Our Doctors</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">Contact</h4>
            <ul className="footer-links">
              <li><a href="#">support@healthcare.com</a></li>
              <li><a href="#">(555) 123-4567</a></li>
              <li><a href="#">Live Chat</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2024 Personalized Healthcare. All rights reserved.</p>
        </div>
      </footer>

      {/* Product Modal */}
      {showModal && selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCart}
          productImage={productImages[selectedProduct.name] || productImages['default']}
          productInfo={productInfo[selectedProduct.name] || {}}
        />
      )}
    </div>
  );
};

export default Homepage;
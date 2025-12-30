import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import '../../assets/styles/categories.css';
import ProductModal from '../modals/ProductModal';
import Button from '../ui/button';
import { useCart } from '../context/cartContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

// Import product images
import Tirzepatide from "../../assets/images/home/tirzepatide.png"
import Semaglitude from "../../assets/images/home/semaglitude.png"
import SemaglitudeInj from "../../assets/images/home/semaglutideInj.png"
import Tablet from "../../assets/images/home/tablet.jpg"
import OralWeightLoss from "../../assets/images/home/oral-weight-loss.jpg"
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
import GHKEpitalon from "../../assets/images/home/ghk-cu-epitalon.png"
import BPC157AcetateCapsule from "../../assets/images/home/bpc-157-acetate-capsule.png"
import GhkCu from "../../assets/images/home/ghk-cu.png"
import IgfLr3 from "../../assets/images/home/igf-lr3.png"
import SemaxSelank from "../../assets/images/home/semax-selank.png"
import TesamorelinIpamorelin from "../../assets/images/home/tesamorelin-ipamorelin.png"
import DsipBpcCjc from "../../assets/images/home/dsip-bpc-cjc.png"
import Dsip from "../../assets/images/home/dsip-bpc-cjc.png"
import MotsC from "../../assets/images/home/mots-c.png"
import Epitalon from "../../assets/images/home/epitalon.png"
import ThymosinA1 from "../../assets/images/home/thymosin-a-1.png"
import Ll37 from "../../assets/images/home/ll-37.png"
import Tesamorelin from "../../assets/images/home/tesamorelin.png"

import { 
  FiSearch,
  FiX,
  FiStar,
  FiPlus,
  FiShoppingCart,
  FiHeart,
  FiFilter,
  FiCheck
} from 'react-icons/fi';
import {
  GiWeightScale,
  GiHairStrands,
  GiLoveInjection,
  GiStaryu,
  GiAppleSeeds,
  GiChemicalDrop
} from 'react-icons/gi';
import { TbBandage } from 'react-icons/tb';

// Import all product images
const productImages = {
  'Tirzepatide': Tirzepatide,
  'Semaglutide Sublingual': Semaglitude,
  'Semaglutide Injection': SemaglitudeInj,
  'Phentermine HCl Tablet': Tablet,
  'Metformin HCl ER Tablet': Tablet,
  'Oral Weight Loss Capsules': OralWeightLoss,
  'Liraglutide': Liraglutide,
  'Hair Loss Oral Medication': HairLossOralMedication,
  'Hair Loss Scalp Topical Medication': HairLossScalpTopicalMedication,
  'PT-141 (bremelanotide) Injectable': PT141,
  'Oxytocin Nasal Spray': OxytocinNasalSpray,
  'Oxytocin 100 IU Troche': Oxytocin100IU,
  'Oxybutynin': Oxybutynin,
  'Tadalafil + Oxytocin Troche': Tadalafill,
  'Erectile Dysfunction Medication': ErectileDysfunction,
  'Acne Gel': AcneGel,
  'Acne Cream': AcneCream,
  'Doxycycline Hyclate for Acne': Doxycycline,
  'Nicotinamide Riboside (NR) Injectable': Nicotinamide,
  'Low Dose Naltrexone': LowDoseNaltrexne,
  'Anti Aging Topical Gel': AntiAgingTopicalGel,
  'NAD+ Injection': NadInjection,
  'Anti Aging Topical Cream': AntiAgingTopicalCream,
  'Vitamin B12 Injection': VitaminB12,
  'NAD+ Patches': NadPatches,
  'NAD+ Nasal Spray': NadNasalSpray,
  'Methylene Blue Capsules': Methylene,
  'Glutathione': Gluta,
  'Sermorelin Troche': Sermorelin,
  'L-Carnitine': Lcarnitine,
  'Skinny Shots - MICC': SkinnyShotsMicc,
  'Skinny Shots': SkinnyShots,
  'Sermorelin Sublingual': SermorelinSublingual,
  'Pinealon/PE22-28/Selank': PinealonPE22,
  'MK-677 (Ibutamoren)': MK677,
  'Sermorelin Injection': SermorelinInjection,
  'CJC/Ipamorelin': CjcIpamorelin,
  'BP-157/TB500': BP157Tb500,
  'BPC-157/KPV/TB500': BPC157Kpvtb500,
  'BPC - 157': BPC157,
  'BPC-157/GHK-U/KPV/TB500': BPC157GhkUKpvTb500,
  'GHK-Cu/Epitalon': GHKEpitalon,
  'BPC-157 ACETATE Capsule': BPC157AcetateCapsule,
  'GHK-Cu': GhkCu,
  'IGF-LR3': IgfLr3,
  'Semax/Selank': SemaxSelank,
  'Tesamorelin / Ipamorelin': TesamorelinIpamorelin,
  'DSIP/BPC/CJC': DsipBpcCjc,
  'DSIP': Dsip,
  'MOTS-C': MotsC,
  'Epitalon': Epitalon,
  'Thymosin A-1': ThymosinA1,
  'LL-37': Ll37,
  'Tesamorelin': Tesamorelin,
  'default': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format'
};

// Skeleton Loading Components
const SkeletonSidebar = () => (
  <div className="filters-sidebar skeleton-sidebar">
    <div className="skeleton-header">
      <div className="skeleton-text skeleton-title"></div>
      <div className="skeleton-button skeleton-close"></div>
    </div>
    
    <div className="skeleton-section">
      <div className="skeleton-text skeleton-subtitle"></div>
      <div className="skeleton-category-filters">
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
          <div key={i} className="skeleton-category-btn">
            <div className="skeleton-icon"></div>
            <div className="skeleton-text skeleton-category-name"></div>
            <div className="skeleton-count"></div>
          </div>
        ))}
      </div>
    </div>
    
    <div className="skeleton-section">
      <div className="skeleton-text skeleton-subtitle"></div>
      <div className="skeleton-sort-options">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="skeleton-sort-btn"></div>
        ))}
      </div>
    </div>
  </div>
);

const SkeletonProductCard = () => (
  <div className="product-card skeleton-card">
    <div className="card-image skeleton-image"></div>
    
    <div className="card-content">
      <div className="category-tag skeleton-category-tag"></div>
      
      <div className="skeleton-text skeleton-title-line"></div>
      <div className="skeleton-text skeleton-description-line"></div>
      <div className="skeleton-text skeleton-description-line"></div>
      
      <div className="product-rating skeleton-rating">
        <div className="skeleton-stars"></div>
        <div className="skeleton-review-count"></div>
      </div>

      <div className="product-features skeleton-features">
        <div className="feature-item">
          <span className="feature-dot skeleton-dot"></span>
          <span className="skeleton-text skeleton-feature"></span>
        </div>
        <div className="feature-item">
          <span className="feature-dot skeleton-dot"></span>
          <span className="skeleton-text skeleton-feature"></span>
        </div>
      </div>
      
      <div className="card-footer-categories">
        <div className="price-info">
          <div className="skeleton-price"></div>
        </div>
        
        <div className="card-actions">
          <div className="skeleton-button skeleton-add-to-cart"></div>
        </div>
      </div>
    </div>
  </div>
);

const SkeletonHeader = () => (
  <div className="results-header skeleton-header">
    <div className="results-header-left">
      <div className="skeleton-text skeleton-main-title"></div>
    </div>
    
    <div className="results-header-right">
      <div className="search-container-inline skeleton-search">
        <div className="skeleton-search-icon"></div>
        <div className="skeleton-search-input"></div>
      </div>
    </div>
  </div>
);

const Categories = () => {
  const { cartItems, addToCart, openCart } = useCart(); // Use cart context
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceSort, setPriceSort] = useState('default');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Store a single toast ID to replace previous toasts
  const toastIdRef = useRef(null);
  
  const productsGridRef = useRef(null);
  const prevScrollY = useRef(0);

  // Simulate loading for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate 1.5 second loading time

    // Preload images
    const imageUrls = Object.values(productImages);
    let loadedCount = 0;
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          setImagesLoaded(true);
        }
      };
    });

    // If no images to load, set loaded to true immediately
    if (imageUrls.length === 0) {
      setImagesLoaded(true);
    }

    return () => clearTimeout(timer);
  }, []);

  // Check if a product is in the cart
  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  // Get cart quantity for a product
  const getCartQuantity = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // All 54 products data
  const allProducts = [
    // Weight Management (7 products)
    {
      id: 'weight-1',
      name: 'Tirzepatide',
      category: 'weight',
      price: 299,
      monthlyPrice: '$299/mo',
      rating: 4.9,
      reviewCount: 128,
      description: 'Advanced GLP-1/GIP receptor agonist for weight management',
      inStock: true,
      deliveryTime: '2-3 days',
      features: ['Enhanced Weight Reduction', 'Improved Glucose Control', 'Long-Term Support']
    },
    {
      id: 'weight-2',
      name: 'Semaglutide Sublingual',
      category: 'weight',
      price: 249,
      monthlyPrice: '$249/mo',
      rating: 4.7,
      reviewCount: 94,
      description: 'Needle-free weight management solution',
      inStock: true,
      deliveryTime: '1-2 days',
      features: ['Appetite Regulation', 'Supports Weight Loss', 'Improved Metabolic Health']
    },
    {
      id: 'weight-3',
      name: 'Semaglutide Injection',
      category: 'weight',
      price: 279,
      monthlyPrice: '$279/mo',
      rating: 4.8,
      reviewCount: 156,
      description: 'Injectable GLP-1 receptor agonist',
      inStock: true,
      deliveryTime: '3-4 days',
      features: ['Significant Weight Reduction', 'Improved Metabolic Health', 'Sustainable Results']
    },
    {
      id: 'weight-4',
      name: 'Phentermine HCl Tablet',
      category: 'weight',
      price: 129,
      monthlyPrice: '$129/mo',
      rating: 4.5,
      reviewCount: 87,
      description: 'Appetite suppressant medication',
      inStock: true,
      deliveryTime: '2-3 days',
      features: ['Effective Appetite Suppression', 'Supports Weight Loss', 'Improved Energy']
    },
    {
      id: 'weight-5',
      name: 'Metformin HCl ER Tablet',
      category: 'weight',
      price: 89,
      monthlyPrice: '$89/mo',
      rating: 4.6,
      reviewCount: 103,
      description: 'Extended-release metformin formulation',
      inStock: true,
      deliveryTime: '1-2 days',
      features: ['Effective Blood Sugar Control', 'Improved Insulin Sensitivity', 'Cardiovascular Benefits']
    },
    {
      id: 'weight-6',
      name: 'Oral Weight Loss Capsules',
      category: 'weight',
      price: 79,
      monthlyPrice: '$79/mo',
      rating: 4.4,
      reviewCount: 65,
      description: 'Comprehensive oral weight management',
      inStock: true,
      deliveryTime: '2-3 days',
      features: ['Appetite Regulation', 'Blood Sugar Control', 'Weight Management']
    },
    {
      id: 'weight-7',
      name: 'Liraglutide',
      category: 'weight',
      price: 269,
      monthlyPrice: '$269/mo',
      rating: 4.7,
      reviewCount: 92,
      description: 'Daily GLP-1 receptor agonist injection',
      inStock: true,
      deliveryTime: '3-5 days',
      features: ['Effective Weight Loss', 'Appetite Regulation', 'Improved Metabolic Health']
    },
    
    // Hair Loss (2 products)
    {
      id: 'hair-1',
      name: 'Hair Loss Oral Medication',
      category: 'hair',
      price: 189,
      monthlyPrice: '$189/mo',
      rating: 4.8,
      reviewCount: 142,
      description: 'Oral medication for hair loss treatment',
      inStock: true,
      deliveryTime: '2-3 days',
      features: ['Clinically shown to slow hair loss', 'Once-daily tablet', 'Best paired with topical treatments']
    },
    {
      id: 'hair-2',
      name: 'Hair Loss Scalp Topical Medication',
      category: 'hair',
      price: 149,
      monthlyPrice: '$149/mo',
      rating: 4.6,
      reviewCount: 78,
      description: 'Topical solution for hair restoration',
      inStock: true,
      deliveryTime: '1-2 days',
      features: ['Targets hormonal & vascular causes', 'Reduces scalp irritation', 'Supports thicker, denser hair']
    },
    
    // Sexual Health (6 products)
    {
      id: 'sexual-1',
      name: 'PT-141 (bremelanotide) Injectable',
      category: 'sexual',
      price: 349,
      monthlyPrice: '$349/mo',
      rating: 4.9,
      reviewCount: 167,
      description: 'Injectable peptide for sexual health',
      inStock: true,
      deliveryTime: '3-4 days',
      features: ['Enhances sexual desire & arousal', 'Effective for both men and women', 'Fast-acting']
    },
    {
      id: 'sexual-2',
      name: 'Oxytocin Nasal Spray',
      category: 'sexual',
      price: 129,
      monthlyPrice: '$129/mo',
      rating: 4.5,
      reviewCount: 89,
      description: 'Nasal spray for intimacy enhancement',
      inStock: true,
      deliveryTime: '2-3 days',
      features: ['May enhance emotional bonding & intimacy', 'Supports arousal and satisfaction', 'Fast-acting nasal spray']
    },
    {
      id: 'sexual-3',
      name: 'Oxytocin 100 IU Troche',
      category: 'sexual',
      price: 119,
      monthlyPrice: '$119/mo',
      rating: 4.6,
      reviewCount: 76,
      description: 'Sublingual troche for intimacy',
      inStock: true,
      deliveryTime: '1-2 days',
      features: ['Enhances emotional bonding and sexual arousal', 'Supports positive mood and stress relief', 'Fast-absorbing']
    },
    {
      id: 'sexual-4',
      name: 'Oxybutynin',
      category: 'sexual',
      price: 99,
      monthlyPrice: '$99/mo',
      rating: 4.4,
      reviewCount: 102,
      description: 'Medication for bladder control',
      inStock: true,
      deliveryTime: '2-3 days',
      features: ['Reduces urinary urgency and frequency', 'Helps manage overactive bladder symptoms', 'Improves confidence']
    },
    {
      id: 'sexual-5',
      name: 'Tadalafil + Oxytocin Troche',
      category: 'sexual',
      price: 279,
      monthlyPrice: '$279/mo',
      rating: 4.8,
      reviewCount: 134,
      description: 'Combination troche for sexual health',
      inStock: true,
      deliveryTime: '3-4 days',
      features: ['Improves erectile function and performance', 'Enhances arousal, bonding, and intimacy', 'Fast-acting sublingual absorption']
    },
    {
      id: 'sexual-6',
      name: 'Erectile Dysfunction Medication',
      category: 'sexual',
      price: 199,
      monthlyPrice: '$199/mo',
      rating: 4.7,
      reviewCount: 156,
      description: 'Medication for erectile dysfunction',
      inStock: true,
      deliveryTime: '2-3 days',
      features: ['Long-lasting effect (up to ~36 hours)', 'Improves sexual confidence and satisfaction', 'Convenient oral tablet']
    },
    
    // Acne (3 products)
    {
      id: 'acne-1',
      name: 'Acne Gel',
      category: 'acne',
      price: 89,
      monthlyPrice: '$89/mo',
      rating: 4.7,
      reviewCount: 98,
      description: 'Topical gel for acne treatment',
      inStock: true,
      deliveryTime: '1-2 days',
      features: ['Reduces acne-causing bacteria and inflammation', 'Unclogs pores and controls excess oil', 'Multi-active gel for clearer skin']
    },
    {
      id: 'acne-2',
      name: 'Acne Cream',
      category: 'acne',
      price: 79,
      monthlyPrice: '$79/mo',
      rating: 4.5,
      reviewCount: 67,
      description: 'Cream formulation for acne',
      inStock: true,
      deliveryTime: '1-2 days',
      features: ['Reduces breakouts, inflammation, and excess oil', 'Clears pores and helps fade post-acne marks', 'Gentle care for acne-prone skin']
    },
    {
      id: 'acne-3',
      name: 'Doxycycline Hyclate for Acne',
      category: 'acne',
      price: 99,
      monthlyPrice: '$99/mo',
      rating: 4.6,
      reviewCount: 84,
      description: 'Oral antibiotic for acne treatment',
      inStock: true,
      deliveryTime: '2-3 days',
      features: ['Treats moderate to severe acne', 'Helps manage bacterial skin conditions', 'Convenient once-daily oral tablet']
    },
    
    // Anti-Aging (10 products)
    {
      id: 'aging-1',
      name: 'Nicotinamide Riboside (NR) Injectable',
      category: 'aging',
      price: 349,
      monthlyPrice: '$349/mo',
      rating: 4.9,
      reviewCount: 178,
      description: 'Injectable NAD+ precursor',
      inStock: true,
      deliveryTime: '3-5 days',
      features: ['Boosts cellular energy, metabolism, and vitality', 'Supports healthy aging, DNA repair, and recovery', 'Enhances mental clarity, stamina, and wellness']
    },
    {
      id: 'aging-2',
      name: 'Low Dose Naltrexone',
      category: 'aging',
      price: 89,
      monthlyPrice: '$89/mo',
      rating: 4.7,
      reviewCount: 92,
      description: 'Low dose naltrexone therapy',
      inStock: true,
      deliveryTime: '2-3 days',
      features: ['Regulates immune response', 'Supports autoimmune balance', 'Improves mood, energy, and sleep']
    },
    {
      id: 'aging-3',
      name: 'Anti Aging Topical Gel',
      category: 'aging',
      price: 129,
      monthlyPrice: '$129/mo',
      rating: 4.6,
      reviewCount: 113,
      description: 'Topical anti-aging gel',
      inStock: true,
      deliveryTime: '1-2 days',
      features: ['Targets hyperpigmentation and sun damage', 'Boosts collagen and skin renewal', 'Brightens tone and smooths fine lines']
    },
    {
      id: 'aging-4',
      name: 'NAD+ Injection',
      category: 'aging',
      price: 399,
      monthlyPrice: '$399/mo',
      rating: 4.9,
      reviewCount: 192,
      description: 'Injectable NAD+ therapy',
      inStock: true,
      deliveryTime: '4-6 days',
      features: ['Boosts cellular energy and metabolism', 'Supports cognitive clarity and physical recovery', 'Promotes healthy aging and vitality']
    },
    {
      id: 'aging-5',
      name: 'Anti Aging Topical Cream',
      category: 'aging',
      price: 119,
      monthlyPrice: '$119/mo',
      rating: 4.7,
      reviewCount: 105,
      description: 'Topical anti-aging cream',
      inStock: true,
      deliveryTime: '1-2 days',
      features: ['Reduces fine lines, wrinkles, and dark spots', 'Improves skin tone, texture, and radiance', 'Calms redness while supporting collagen']
    },
    {
      id: 'aging-6',
      name: 'Vitamin B12 Injection',
      category: 'aging',
      price: 79,
      monthlyPrice: '$79/mo',
      rating: 4.5,
      reviewCount: 87,
      description: 'Vitamin B12 injection',
      inStock: true,
      deliveryTime: '2-3 days',
      features: ['Boosts energy, mood, and mental clarity', 'Supports nerve health and cognitive function', 'Promotes healthy red blood cell production']
    },
    {
      id: 'aging-7',
      name: 'NAD+ Patches',
      category: 'aging',
      price: 199,
      monthlyPrice: '$199/mo',
      rating: 4.6,
      reviewCount: 78,
      description: 'Transdermal NAD+ patches',
      inStock: true,
      deliveryTime: '2-3 days',
      features: ['Boosts cellular energy and brain clarity', 'Supports healthy aging and recovery', 'Non-invasive patch format']
    },
    {
      id: 'aging-8',
      name: 'NAD+ Nasal Spray',
      category: 'aging',
      price: 179,
      monthlyPrice: '$179/mo',
      rating: 4.5,
      reviewCount: 64,
      description: 'NAD+ nasal spray',
      inStock: true,
      deliveryTime: '1-2 days',
      features: ['Enhances mental clarity and cognitive performance', 'Boosts energy while supporting healthy aging', 'Fast-absorbing nasal spray']
    },
    {
      id: 'aging-9',
      name: 'Methylene Blue Capsules',
      category: 'aging',
      price: 149,
      monthlyPrice: '$149/mo',
      rating: 4.4,
      reviewCount: 56,
      description: 'Methylene blue supplement',
      inStock: true,
      deliveryTime: '2-3 days',
      features: ['Supports brain focus, memory, and cellular energy', 'Helps immune resilience and infection recovery', 'Protects cells from oxidative stress']
    },
    {
      id: 'aging-10',
      name: 'Glutathione',
      category: 'aging',
      price: 179,
      monthlyPrice: '$179/mo',
      rating: 4.8,
      reviewCount: 142,
      description: 'Glutathione injection',
      inStock: true,
      deliveryTime: '3-4 days',
      features: ['Powerful antioxidant support for cellular protection', 'Aids detoxification, immune health, and cellular repair', 'Promotes brighter skin and overall vitality']
    },
    
    // Appetite Suppressant (4 products)
    {
      id: 'appetite-1',
      name: 'Sermorelin Troche',
      category: 'appetite',
      price: 159,
      monthlyPrice: '$159/mo',
      rating: 4.7,
      reviewCount: 98,
      description: 'Sermorelin sublingual troche',
      inStock: true,
      deliveryTime: '2-3 days',
      features: ['Stimulates growth hormone production', 'Supports deep sleep, recovery, and daily energy', 'Aids fat metabolism and healthy aging']
    },
    {
      id: 'appetite-2',
      name: 'L-Carnitine',
      category: 'appetite',
      price: 99,
      monthlyPrice: '$99/mo',
      rating: 4.5,
      reviewCount: 76,
      description: 'L-Carnitine injection',
      inStock: true,
      deliveryTime: '2-3 days',
      features: ['Enhances fat metabolism and energy production', 'Supports weight management and exercise recovery', 'Promotes cardiovascular and cognitive health']
    },
    {
      id: 'appetite-3',
      name: 'Skinny Shots - MICC',
      category: 'appetite',
      price: 129,
      monthlyPrice: '$129/mo',
      rating: 4.6,
      reviewCount: 89,
      description: 'MICC injection for weight management',
      inStock: true,
      deliveryTime: '1-2 days',
      features: ['Weekly Injection', 'Multi-Nutrient', 'Metabolism Boost']
    },
    {
      id: 'appetite-4',
      name: 'Skinny Shots',
      category: 'appetite',
      price: 109,
      monthlyPrice: '$109/mo',
      rating: 4.4,
      reviewCount: 67,
      description: 'Weight management injection',
      inStock: true,
      deliveryTime: '1-2 days',
      features: ['Weekly Injection', 'Energy Support', 'Appetite Control']
    },
    
    // Peptides (22 products)
    {
      id: 'peptide-1',
      name: 'Sermorelin Sublingual',
      category: 'peptides',
      price: 169,
      monthlyPrice: '$169/mo',
      rating: 4.6,
      reviewCount: 82,
      description: 'Sermorelin sublingual',
      inStock: true,
      deliveryTime: '2-3 days',
      features: ['Naturally stimulates growth hormone production', 'Supports energy, recovery, and better sleep', 'Aids fat metabolism and healthy aging']
    },
    {
      id: 'peptide-2',
      name: 'Pinealon/PE22-28/Selank',
      category: 'peptides',
      price: 229,
      monthlyPrice: '$229/mo',
      rating: 4.5,
      reviewCount: 73,
      description: 'Pinealon peptide combination',
      inStock: true,
      deliveryTime: '3-4 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-3',
      name: 'MK-677 (Ibutamoren)',
      category: 'peptides',
      price: 249,
      monthlyPrice: '$249/mo',
      rating: 4.8,
      reviewCount: 134,
      description: 'MK-677 growth hormone secretagogue',
      inStock: true,
      deliveryTime: '3-5 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-4',
      name: 'Sermorelin Injection',
      category: 'peptides',
      price: 279,
      monthlyPrice: '$279/mo',
      rating: 4.8,
      reviewCount: 145,
      description: 'Sermorelin injection',
      inStock: true,
      deliveryTime: '3-4 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-5',
      name: 'CJC/Ipamorelin',
      category: 'peptides',
      price: 299,
      monthlyPrice: '$299/mo',
      rating: 4.9,
      reviewCount: 167,
      description: 'CJC-1295 with Ipamorelin',
      inStock: true,
      deliveryTime: '4-5 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-6',
      name: 'BP-157/TB500',
      category: 'peptides',
      price: 269,
      monthlyPrice: '$269/mo',
      rating: 4.7,
      reviewCount: 98,
      description: 'BPC-157 with TB500',
      inStock: true,
      deliveryTime: '3-4 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-7',
      name: 'BPC-157/KPV/TB500',
      category: 'peptides',
      price: 289,
      monthlyPrice: '$289/mo',
      rating: 4.6,
      reviewCount: 87,
      description: 'BPC-157 with KPV and TB500',
      inStock: true,
      deliveryTime: '3-4 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-8',
      name: 'BPC - 157',
      category: 'peptides',
      price: 229,
      monthlyPrice: '$229/mo',
      rating: 4.8,
      reviewCount: 156,
      description: 'BPC-157 peptide',
      inStock: true,
      deliveryTime: '3-4 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-9',
      name: 'BPC-157/GHK-U/KPV/TB500',
      category: 'peptides',
      price: 329,
      monthlyPrice: '$329/mo',
      rating: 4.6,
      reviewCount: 78,
      description: 'Multi-peptide combination',
      inStock: true,
      deliveryTime: '4-5 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-10',
      name: 'GHK-Cu/Epitalon',
      category: 'peptides',
      price: 299,
      monthlyPrice: '$299/mo',
      rating: 4.7,
      reviewCount: 89,
      description: 'GHK-Cu with Epitalon',
      inStock: true,
      deliveryTime: '3-4 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-11',
      name: 'BPC-157 ACETATE Capsule',
      category: 'peptides',
      price: 199,
      monthlyPrice: '$199/mo',
      rating: 4.5,
      reviewCount: 72,
      description: 'Oral BPC-157 acetate',
      inStock: true,
      deliveryTime: '2-3 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-12',
      name: 'GHK-Cu',
      category: 'peptides',
      price: 219,
      monthlyPrice: '$219/mo',
      rating: 4.6,
      reviewCount: 83,
      description: 'GHK-Cu copper peptide',
      inStock: true,
      deliveryTime: '3-4 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-13',
      name: 'IGF-LR3',
      category: 'peptides',
      price: 349,
      monthlyPrice: '$349/mo',
      rating: 4.8,
      reviewCount: 142,
      description: 'IGF-1 Long R3',
      inStock: true,
      deliveryTime: '5-7 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-14',
      name: 'Semax/Selank',
      category: 'peptides',
      price: 259,
      monthlyPrice: '$259/mo',
      rating: 4.7,
      reviewCount: 96,
      description: 'Semax with Selank',
      inStock: true,
      deliveryTime: '3-4 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-15',
      name: 'Tesamorelin / Ipamorelin',
      category: 'peptides',
      price: 319,
      monthlyPrice: '$319/mo',
      rating: 4.6,
      reviewCount: 84,
      description: 'Tesamorelin with Ipamorelin',
      inStock: true,
      deliveryTime: '4-5 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-16',
      name: 'DSIP/BPC/CJC',
      category: 'peptides',
      price: 279,
      monthlyPrice: '$279/mo',
      rating: 4.5,
      reviewCount: 73,
      description: 'Delta sleep-inducing peptide combination',
      inStock: true,
      deliveryTime: '3-4 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-17',
      name: 'DSIP',
      category: 'peptides',
      price: 189,
      monthlyPrice: '$189/mo',
      rating: 4.4,
      reviewCount: 68,
      description: 'Delta sleep-inducing peptide',
      inStock: true,
      deliveryTime: '3-4 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-18',
      name: 'MOTS-C',
      category: 'peptides',
      price: 239,
      monthlyPrice: '$239/mo',
      rating: 4.5,
      reviewCount: 76,
      description: 'Mitochondrial-derived peptide',
      inStock: true,
      deliveryTime: '3-4 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-19',
      name: 'Epitalon',
      category: 'peptides',
      price: 249,
      monthlyPrice: '$249/mo',
      rating: 4.6,
      reviewCount: 82,
      description: 'Epitalon peptide',
      inStock: true,
      deliveryTime: '3-4 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-20',
      name: 'Thymosin A-1',
      category: 'peptides',
      price: 269,
      monthlyPrice: '$269/mo',
      rating: 4.7,
      reviewCount: 89,
      description: 'Thymosin Alpha-1',
      inStock: true,
      deliveryTime: '4-5 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-21',
      name: 'LL-37',
      category: 'peptides',
      price: 229,
      monthlyPrice: '$229/mo',
      rating: 4.5,
      reviewCount: 74,
      description: 'LL-37 antimicrobial peptide',
      inStock: true,
      deliveryTime: '3-4 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    },
    {
      id: 'peptide-22',
      name: 'Tesamorelin',
      category: 'peptides',
      price: 349,
      monthlyPrice: '$349/mo',
      rating: 4.8,
      reviewCount: 156,
      description: 'Tesamorelin peptide',
      inStock: true,
      deliveryTime: '4-6 days',
      features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep']
    }
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.features.some(feature => feature.toLowerCase().includes(query))
      );
    }
    
    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }
    
    // Sort
    if (priceSort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (priceSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (priceSort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return filtered;
  }, [searchQuery, selectedCategories, priceSort]);

  // Categories data
  const categories = useMemo(() => [
    {
      id: 'weight',
      name: 'Weight Management',
      icon: <GiWeightScale />,
      productCount: allProducts.filter(p => p.category === 'weight').length,
      color: '#28a745'
    },
    {
      id: 'hair',
      name: 'Hair Loss',
      icon: <GiHairStrands />,
      productCount: allProducts.filter(p => p.category === 'hair').length,
      color: '#007bff'
    },
    {
      id: 'sexual',
      name: 'Sexual Health',
      icon: <GiLoveInjection />,
      productCount: allProducts.filter(p => p.category === 'sexual').length,
      color: '#dc3545'
    },
    {
      id: 'acne',
      name: 'Acne',
      icon: <TbBandage />,
      productCount: allProducts.filter(p => p.category === 'acne').length,
      color: '#ffc107'
    },
    {
      id: 'aging',
      name: 'Anti-Aging',
      icon: <GiStaryu />,
      productCount: allProducts.filter(p => p.category === 'aging').length,
      color: '#17a2b8'
    },
    {
      id: 'appetite',
      name: 'Appetite Suppressant',
      icon: <GiAppleSeeds />,
      productCount: allProducts.filter(p => p.category === 'appetite').length,
      color: '#6f42c1'
    },
    {
      id: 'peptides',
      name: 'Peptides',
      icon: <GiChemicalDrop />,
      productCount: allProducts.filter(p => p.category === 'peptides').length,
      color: '#fd7e14'
    }
  ], [allProducts]);

  // Save scroll position before filter changes
  useEffect(() => {
    if (productsGridRef.current) {
      prevScrollY.current = window.scrollY || productsGridRef.current.scrollTop;
    }
  }, [searchQuery, selectedCategories, priceSort]);

  // Restore scroll position after render
  useEffect(() => {
    const restoreScroll = () => {
      requestAnimationFrame(() => {
        if (prevScrollY.current > 0) {
          window.scrollTo({
            top: prevScrollY.current,
            behavior: 'auto'
          });
        }
      });
    };

    const timer = setTimeout(restoreScroll, 10);
    return () => clearTimeout(timer);
  }, [filteredProducts]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  const showAddToCartConfirmation = (product) => {
    // Create responsive HTML with CSS classes instead of inline styles
    const responsiveHtml = `
      <div class="medical-assessment-steps">
        <div class="assessment-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h4 class="step-title">Answer a few questions</h4>
            <p class="step-description">Tell us about your symptoms, health history, and treatment goals by completing a short medical questionnaire.</p>
          </div>
        </div>
        <div class="step-divider"></div>
        <div class="assessment-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h4 class="step-title">Have a consult</h4>
            <p class="step-description">Discuss your results and health goals with a licensed healthcare provider.</p>
          </div>
        </div>
        <div class="step-divider"></div>
        <div class="assessment-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h4 class="step-title">Order your medication</h4>
            <p class="step-description">If you qualify, you'll be able to order your medication and begin your treatment right away.</p>
          </div>
        </div>
      </div>
    `;
    
    Swal.fire({
      title: 'Medical Assessment Required',
      html: responsiveHtml,
      confirmButtonText: 'Add to Cart',
      confirmButtonColor: 'var(--primary-color, #383938)',
      showCloseButton: true,
      closeButtonHtml: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
      fontSize: '600px',
      customClass: {
        popup: 'custom-swal-popup',
        title: 'custom-swal-title',
        confirmButton: 'custom-swal-confirm-btn',
        closeButton: 'custom-swal-close-btn'
      },
      didOpen: () => {
        const container = document.querySelector('.swal2-container');
        if (container) {
          container.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        }
        
        const style = document.createElement('style');
        style.textContent = `
          /* Modal container */
          .swal2-container {
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }
          
          /* Modal popup */
          .custom-swal-popup {
            border-radius: 12px;
            padding: 30px;
            background: var(--background-card, #ffffff);
            color: var(--text-dark, #1f2937);
            width: auto !important;
            max-width: min(600px, 95vw) !important;
            max-height: 85vh;
            overflow-y: auto;
            margin: 0 20px;
            box-sizing: border-box;
          }
          
          /* Title */
          .custom-swal-title {
            font-size: 24px;
            font-weight: 700;
            color: var(--text-dark, #1f2937);
            text-align: center;
            margin-bottom: 20px;
            padding-right: 30px;
            line-height: 1.3;
          }
          
          /* Confirm button */
          .custom-swal-confirm-btn {
            width: 100%;
            padding: 12px 30px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            background: var(--primary-color, #383938) !important;
            border: none !important;
            margin-top: 10px;
            transition: background-color 0.2s;
          }
          
          .custom-swal-confirm-btn:hover {
            background: var(--primary-dark, #2a2a2a) !important;
          }
          
          /* Close button */
          .custom-swal-close-btn {
            width: 30px !important;
            position: absolute;
            right: 20px;
            top: 20px;
            color: var(--primary-color);
            border: none;
            background: transparent;
            font-size: 20px;
            cursor: pointer;
            padding: 5px;
            transition: color 0.2s;
            z-index: 1001;
          }
          
          .custom-swal-close-btn:hover {
            color: var(--text-dark, #374151);
          }
          
          /* Custom HTML content */
          .medical-assessment-steps {
            text-align: left;
            padding: 20px 0;
          }
          
          .assessment-step {
            display: flex;
            align-items: flex-start;
            margin-bottom: 20px;
            position: relative;
          }
          
          .step-number {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: var(--primary-color, #383938);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 15px;
            flex-shrink: 0;
            font-size: 14px;
          }
          
          .step-content {
            flex: 1;
          }
          
          .step-title {
            margin: 0 0 8px 0;
            color: var(--text-dark, #1f2937);
            font-size: 16px;
            font-weight: 600;
            line-height: 1.3;
          }
          
          .step-description {
            margin: 0;
            color: var(--text-light, #6b7280);
            font-size: 14px;
            line-height: 1.5;
          }
          
          .step-divider {
            height: 20px;
            width: 2px;
            background: var(--border-color, #d1d5db);
            margin-left: 15px;
            margin-bottom: 5px;
          }
          
          /* Mobile styles */
          @media (max-width: 768px) {
            .custom-swal-popup {
              padding: 20px;
              margin: 0 10px;
            }
            
            .custom-swal-title {
              font-size: 18px;
              margin-bottom: 15px;
              padding-right: 30px;
            }
            
            .custom-swal-confirm-btn {
              padding: 12px 20px;
              font-size: 14px;
            }
            
            .custom-swal-close-btn {
              right: 15px;
              top: 15px;
              font-size: 16px;
            }
            
            .medical-assessment-steps {
              padding: 10px 0;
            }
            
            .assessment-step {
              margin-bottom: 15px;
            }
            
            .step-number {
              width: 24px;
              height: 24px;
              margin-right: 10px;
              font-size: 12px;
            }
            
            .step-title {
              font-size: 14px;
              margin-bottom: 5px;
            }
            
            .step-description {
              font-size: 12px;
            }
            
            .step-divider {
              height: 15px;
              margin-left: 12px;
            }
          }
          
          /* Very small screens */
          @media (max-width: 480px) {
            .custom-swal-popup {
              padding: 15px;
              margin: 0 5px;
            }
            
            .custom-swal-title {
              font-size: 16px;
            }
            
            .custom-swal-confirm-btn {
              padding: 10px 15px;
              font-size: 13px;
            }
            
            .step-number {
              width: 22px;
              height: 22px;
              font-size: 11px;
            }
            
            .step-title {
              font-size: 13px;
            }
            
            .step-description {
              font-size: 11px;
            }
          }
        `;
        document.head.appendChild(style);
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Add to cart after confirmation
        actuallyAddToCart(product);
      }
    });
  };

  const actuallyAddToCart = useCallback((product) => {
    const cartProduct = {
      ...product,
      image: productImages[product.name] || productImages['default']
    };
    
    // Get current quantity in cart
    const existingItem = cartItems.find(item => item.id === product.id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    
    // Add to cart
    addToCart(cartProduct, 1);
    
    // Show toast notification
    const message = existingItem 
      ? `${product.name} quantity updated to ${currentQuantity + 1}!`
      : `${product.name} added to cart!`;
    
    if (toastIdRef.current) {
      toast.update(toastIdRef.current, {
        render: message,
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
    } else {
      toastIdRef.current = toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: () => {
          toastIdRef.current = null;
        }
      });
    }
  }, [cartItems, addToCart]);

  const handleAddToCart = useCallback((product, e) => {
    if (e) {
      e.stopPropagation();
    }

    // Check if product is already in cart
    const existingItem = cartItems.find(item => item.id === product.id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    
    // Show confirmation modal for first time adding to cart
    if (!existingItem || currentQuantity === 0) {
      showAddToCartConfirmation(product);
    } else {
      // If already in cart, just add another unit without showing confirmation
      actuallyAddToCart(product);
    }
  }, [cartItems, actuallyAddToCart]);

  const handleCategoryClick = (categoryId) => {
    if (productsGridRef.current) {
      prevScrollY.current = window.scrollY || document.documentElement.scrollTop;
    }
    
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handlePriceSortChange = (newSort) => {
    prevScrollY.current = window.scrollY || document.documentElement.scrollTop;
    setPriceSort(newSort);
  };

  const handleWishlistToggle = (productId, e) => {
    e.stopPropagation();
    const newWishlist = new Set(wishlistItems);
    if (wishlistItems.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlistItems(newWishlist);
  };

  const clearAllFilters = () => {
    prevScrollY.current = window.scrollY || document.documentElement.scrollTop;
    setSelectedCategories([]);
    setSearchQuery('');
    setPriceSort('default');
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FiStar key={i} className="star filled" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FiStar key={i} className="star half" />);
      } else {
        stars.push(<FiStar key={i} className="star" />);
      }
    }
    return stars;
  };

  if (isLoading || !imagesLoaded) {
  return (
    <div className="categories-page skeleton-page">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div
        className="categories-content skeleton-content"
        style={{ marginTop: '6.5rem' }} // ← KEY FIX
      >
        {/* Mobile Filter Skeleton */}
        <div className="mobile-filter-toggle skeleton-mobile-filter">
          <button className="filter-toggle-btn skeleton-button"></button>
          <div className="mobile-sort">
            <div className="sort-select skeleton-select"></div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="filters-sidebar skeleton-sidebar">
          <div className="filters-header">
            <h3 className="filters-title">
              <span className="skeleton-icon"></span>
              <span className="skeleton-text" style={{ width: '60px', height: '20px' }}></span>
            </h3>
          </div>

          <div className="filters-content">
            <div className="filter-section">
              <div className="filter-section-title skeleton-text" style={{ width: '150px', height: '16px' }}></div>

              <div className="category-filters">
                {[1, 2, 3, 4, 5, 6, 7].map(i => (
                  <button key={i} className="category-filter-btn skeleton-category-btn">
                    <span className="category-icon skeleton-icon"></span>
                    <span className="category-name skeleton-text"></span>
                    <span className="category-count skeleton-count"></span>
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <div className="filter-section-title skeleton-text" style={{ width: '80px', height: '16px' }}></div>
              <div className="sort-options">
                {[1, 2, 3, 4, 5].map(i => (
                  <button key={i} className="sort-option-btn skeleton-sort-btn"></button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="products-main">
          <div className="results-header skeleton-results-header">
            <div className="results-header-left">
              <h2>
                <span className="skeleton-text" style={{ width: '200px', height: '30px', display: 'inline-block' }}></span>
                <span className="product-count skeleton-text" style={{ width: '100px', height: '18px', marginLeft: '8px' }}></span>
              </h2>
            </div>

            <div className="results-header-right">
              <div className="search-container-inline skeleton-search">
                <span className="search-icon skeleton-search-icon"></span>
                <div className="search-input skeleton-search-input"></div>
              </div>
            </div>
          </div>

          <div className="products-grid">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="product-card skeleton-card">
                <div className="card-image skeleton-image"></div>

                <div className="card-content">
                  <div className="category-tag skeleton-category-tag"></div>

                  <h3 className="skeleton-text" style={{ width: '80%', height: '22px' }}></h3>

                  <p className="product-description">
                    <span className="skeleton-text" style={{ width: '100%', height: '14px', display: 'block' }}></span>
                    <span className="skeleton-text" style={{ width: '60%', height: '14px', display: 'block' }}></span>
                  </p>

                  <div className="product-rating">
                    <div className="stars skeleton-stars"></div>
                    <span className="review-count skeleton-review-count"></span>
                  </div>

                  <div className="product-features">
                    <div className="feature-item">
                      <span className="feature-dot skeleton-dot"></span>
                      <span className="skeleton-text" style={{ width: '150px', height: '12px' }}></span>
                    </div>
                    <div className="feature-item">
                      <span className="feature-dot skeleton-dot"></span>
                      <span className="skeleton-text" style={{ width: '140px', height: '12px' }}></span>
                    </div>
                  </div>

                  <div className="card-footer-categories">
                    <div className="price skeleton-price"></div>
                    <button className="add-to-cart-btn skeleton-add-to-cart"></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


  return (
    <div className="categories-page">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* Header */}
      <div className="categories-header">
        {/* Header content if any */}
      </div>

      <div className="categories-content">
        {/* Mobile Filter Button */}
        <div className="mobile-filter-toggle">
          <button 
            className="filter-toggle-btn"
            onClick={() => setShowMobileFilters(true)}
          >
            <FiFilter /> Filters
          </button>
          <div className="mobile-sort">
            <select 
              value={priceSort} 
              onChange={(e) => handlePriceSortChange(e.target.value)}
              className="sort-select"
            >
              <option value="default">Sort: Featured</option>
              <option value="name">Name: A to Z</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filters Sidebar */}
        <div className={`filters-sidebar ${showMobileFilters ? 'mobile-open' : ''}`}>
          <div className="filters-header">
            <h3 className="filters-title">
              <FiFilter /> Filters
            </h3>
            <button className="close-filters" onClick={() => setShowMobileFilters(false)}>
              <FiX />
            </button>
          </div>
          
          <div className="filters-content">
            {/* Categories Filter */}
            <div className="filter-section">
              <h4 className="filter-section-title">Treatment Categories</h4>
              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-filter-btn ${selectedCategories.includes(category.id) ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(category.id)}
                    style={{ '--category-color': category.color }}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">{category.productCount}</span>
                    {selectedCategories.includes(category.id) && <FiCheck className="check-icon" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Section */}
            <div className="filter-section">
              <h4 className="filter-section-title">Sort By</h4>
              <div className="sort-options">
                <button 
                  className={`sort-option-btn ${priceSort === 'default' ? 'active' : ''}`}
                  onClick={() => handlePriceSortChange('default')}
                >
                  Featured
                </button>
                <button 
                  className={`sort-option-btn ${priceSort === 'name' ? 'active' : ''}`}
                  onClick={() => handlePriceSortChange('name')}
                >
                  Name: A to Z
                </button>
                <button 
                  className={`sort-option-btn ${priceSort === 'rating' ? 'active' : ''}`}
                  onClick={() => handlePriceSortChange('rating')}
                >
                  Highest Rated
                </button>
                <button 
                  className={`sort-option-btn ${priceSort === 'price-low' ? 'active' : ''}`}
                  onClick={() => handlePriceSortChange('price-low')}
                >
                  Price: Low to High
                </button>
                <button 
                  className={`sort-option-btn ${priceSort === 'price-high' ? 'active' : ''}`}
                  onClick={() => handlePriceSortChange('price-high')}
                >
                  Price: High to Low
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategories.length > 0 || searchQuery || priceSort !== 'default') && (
              <div className="filter-section">
                <div className="active-filters">
                  {selectedCategories.map(categoryId => {
                    const category = categories.find(c => c.id === categoryId);
                    return (
                      <span key={categoryId} className="active-filter">
                        {category?.name}
                        <button onClick={() => handleCategoryClick(categoryId)}>
                          <FiX />
                        </button>
                      </span>
                    );
                  })}
                  {priceSort !== 'default' && (
                    <span className="active-filter">
                      {priceSort === 'rating' ? 'Highest Rated' : 
                       priceSort === 'name' ? 'Name: A to Z' :
                       priceSort === 'price-low' ? 'Price: Low to High' : 
                       'Price: High to Low'}
                      <button onClick={() => handlePriceSortChange('default')}>
                        <FiX />
                      </button>
                    </span>
                  )}
                </div>
                <button className="clear-filters-btn" onClick={clearAllFilters}>
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Overlay */}
        {showMobileFilters && (
          <div className="mobile-overlay" onClick={() => setShowMobileFilters(false)} />
        )}

        {/* Products Main Section with Search */}
        <div className="products-main" ref={productsGridRef}>
          {/* Results Header with Search Bar */}
          <div className="results-header">
            <div className="results-header-left">
              <h2>
                {selectedCategories.length === 0 ? 'All Treatments' : 
                 selectedCategories.length === 1 ? 
                   categories.find(c => c.id === selectedCategories[0])?.name :
                   `${selectedCategories.length} Categories Selected`}
                <span className="product-count"> ({filteredProducts.length} products)</span>
              </h2>
            </div>
            
            <div className="results-header-right">
              <div className="search-container-inline">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search treatments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button 
                    className="clear-search" 
                    onClick={() => {
                      prevScrollY.current = window.scrollY || document.documentElement.scrollTop;
                      setSearchQuery('');
                    }}
                  >
                    <FiX />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">
                <FiSearch />
              </div>
              <h3>No treatments found</h3>
              <p>Try adjusting your search or category filters</p>
              <button className="clear-filters-btn" onClick={clearAllFilters}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => {
                const category = categories.find(c => c.id === product.category);
                const isInCart = isProductInCart(product.id);
                const cartQuantity = getCartQuantity(product.id);
                
                return (
                  <div key={product.id} className="product-card">
                    <div className="card-image" onClick={() => handleProductClick(product)}>
                      <img 
                        src={productImages[product.name] || productImages['default']}
                        alt={product.name}
                        onError={(e) => {
                          e.target.src = productImages['default'];
                        }}
                      />
                      <button 
                        className={`wishlist-btn ${wishlistItems.has(product.id) ? 'active' : ''}`}
                        onClick={(e) => handleWishlistToggle(product.id, e)}
                      >
                        <FiHeart />
                      </button>
                    </div>
                    
                    <div className="card-content">
                      <div className="category-tag" style={{ 
                        '--category-color': category?.color
                      }}>
                        {category?.icon}
                        {category?.name}
                      </div>
                      
                      <h3 onClick={() => handleProductClick(product)}>{product.name}</h3>
                      
                      <p className="product-description">{product.description}</p>
                      
                      <div className="product-rating">
                        <div className="stars">
                          {renderStars(product.rating)}
                          <span className="rating-value">{product.rating}</span>
                        </div>
                        <span className="review-count">({product.reviewCount} reviews)</span>
                      </div>

                      <div className="product-features">
                        {product.features.slice(0, 2).map((feature, index) => (
                          <div key={index} className="feature-item">
                            <span className="feature-dot"></span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="card-footer-categories">
                        <div className="price-info">
                          <div className="price">{product.monthlyPrice}</div>
                        </div>
                        
                        <div className="card-actions">
                          <Button 
                            className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
                            onClick={(e) => handleAddToCart(product, e)}
                          >
                            {isInCart ? (
                              <>
                                <FiCheck /> In cart ({cartQuantity})
                              </>
                            ) : (
                              <>
                                <FiPlus /> Add to Cart
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {showModal && selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={() => handleAddToCart(selectedProduct)}
          productImage={productImages[selectedProduct.name] || productImages['default']}
          productInfo={{
            title: selectedProduct.name,
            description: selectedProduct.description,
            benefits: selectedProduct.features,
            howItWorks: [
              'Complete online assessment',
              'Virtual consultation with healthcare provider',
              'Receive treatment at your doorstep'
            ],
            warnings: [
              'Consult healthcare provider before use',
              'For adult use only',
              'Follow prescribed dosage instructions'
            ],
            disclaimer: 'This product requires medical consultation. Results may vary.'
          }}
        />
      )}
    </div>
  );
};

export default Categories;
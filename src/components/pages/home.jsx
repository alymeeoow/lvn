import React, { useState, useRef, useEffect, useCallback } from 'react';
import '../../assets/styles/home.css';
import ProductModal from '../modals/ProductModal';
import { useCart } from '../context/cartContext';
import Lvn from "../../assets/images/logo/lvn-no-no-pilit.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { flushSync } from 'react-dom';
import Swal from 'sweetalert2';
import { FaUserMd, FaBox, FaHeadset } from "react-icons/fa"

import Button from '../ui/button';

// Import category images
import WeightManagementImg from "../../assets/images/home/weight-management.jpg";
import HairLossImg from "../../assets/images/home/hair-loss.jpg";
import SexualHealthImg from "../../assets/images/home/sexual-health.jpg";
import AcneImg from "../../assets/images/home/acne.jpg";
import AntiAgingImg from "../../assets/images/home/anti-aging.jpg";
import AppetiteImg from "../../assets/images/home/appetite-suppressant.png";
import PeptidesImg from "../../assets/images/home/peptides.jpg";

// Import product images
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
  FiTrendingUp,
  FiCheck,
  FiShoppingCart
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

const categoryImages = {
  'weight': WeightManagementImg || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format',
  'hair': HairLossImg || 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=300&fit=crop&auto=format',
  'sexual': SexualHealthImg || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format',
  'acne': AcneImg || 'https://images.unsplash.com/photo-1556228578-9c360e2d0b4a?w=400&h=300&fit=crop&auto=format',
  'aging': AntiAgingImg || 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop&auto=format',
  'appetite': AppetiteImg || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format',
  'peptides': PeptidesImg || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format'
};

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

// Create a completely static product card component
const StaticProductCard = React.memo(({ 
  product, 
  onProductClick, 
  onAddToCart,
  cartStatus
}) => {
  return (
    <div className="product-card" data-product-id={product.id}>
      <div 
        className="card-image-container" 
        onClick={() => onProductClick(product)}
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
        
        <div className="image-overlay"></div>
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
          <span className="price">{product.monthlyPrice}</span>
          <span className="price-note">Monthly Treatment Plan</span>
        </div>
        <Button
          type="button"
          className={`add-button ${cartStatus?.isInCart ? 'in-cart' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product, e);
          }}
          style={{ 
            cursor: 'pointer'
          }}
        >
          {cartStatus?.isInCart ? (
            <>
              <FiCheck /> In Cart ({cartStatus.quantity})
            </>
          ) : (
            <>
              <FiPlus /> Add
            </>
          )}
        </Button>
      </div>
    </div>
  );
});

StaticProductCard.displayName = 'StaticProductCard';

const CategorySection = React.memo(function CategorySection({
  category,
  categoryRef,
  carouselRef,
  productCartStatus,
  onProductClick,
  onAddToCart,
  scrollCarousel
}) {
  const categoryCartStatus = React.useMemo(() => {
    const status = {};
    category.products.forEach(product => {
      status[product.id] = productCartStatus[product.id] || {
        isInCart: false,
        quantity: 0
      };
    });
    return status;
  }, [category.products, productCartStatus]);

  return (
    <section
      className="category-section"
      id={category.id}
      ref={categoryRef}
    >
      <div className="category-carousel-container">
        <button
          className="carousel-button prev"
          onClick={() => scrollCarousel(category.id, 'prev')}
        >
          <FiChevronLeft />
        </button>

        <div className="carousel-wrapper">
          <div className="carousel-track" ref={carouselRef}>
            {category.products.map(product => (
              <div key={product.id} className="carousel-slide">
                <StaticProductCard
                  product={product}
                  onProductClick={onProductClick}
                  onAddToCart={onAddToCart}
                  cartStatus={categoryCartStatus[product.id]}
                />
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
    </section>
  );
});

const Homepage = () => {
  const { cartItems, addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('weight');
  
  // Store carousel references
  const carouselRefs = {
    weight: useRef(null),
    hair: useRef(null),
    sexual: useRef(null),
    acne: useRef(null),
    aging: useRef(null),
    appetite: useRef(null),
    peptides: useRef(null)
  };

  // Store category section references
  const categoryRefs = {
    weight: useRef(null),
    hair: useRef(null),
    sexual: useRef(null),
    acne: useRef(null),
    aging: useRef(null),
    appetite: useRef(null),
    peptides: useRef(null)
  };

  // Store a single toast ID to replace previous toasts
  const toastIdRef = useRef(null);
  
  // Store cart status per product
  const [productCartStatus, setProductCartStatus] = useState({});
  
  // Initialize cart status
  useEffect(() => {
    const status = {};
    cartItems.forEach(item => {
      status[item.id] = {
        isInCart: true,
        quantity: item.quantity
      };
    });
    setProductCartStatus(status);
  }, [cartItems]);

  const handleProductClick = useCallback((product) => {
    setSelectedProduct(product);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  }, []);

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
      width: '600px',
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
          container.style.backdropFilter = 'blur(8px)';
          container.style.webkitBackdropFilter = 'blur(8px)';
        }
        
        const style = document.createElement('style');
        style.textContent = `
          /* Modal container */
          .swal2-container {
            backdrop-filter: blur(8px) !important;
            -webkit-backdrop-filter: blur(8px) !important;
            background-color: rgba(0, 0, 0, 0.3) !important;
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
    e?.stopPropagation();

  
    const existingItem = cartItems.find(item => item.id === product.id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    
    
    if (!existingItem || currentQuantity === 0) {
      showAddToCartConfirmation(product);
    } else {
   
      actuallyAddToCart(product);
    }
  }, [cartItems, actuallyAddToCart]);

  const scrollToCategory = useCallback((categoryId) => {
    setActiveCategory(categoryId);
    
    if (categoryRefs[categoryId]?.current) {
      categoryRefs[categoryId].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);


  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const categoryId = entry.target.id;
          setActiveCategory(categoryId);
        }
      });
    }, observerOptions);

    Object.values(categoryRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(categoryRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

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

  const HeroSection = useCallback(() => (
  <section className="hero-section">
  <div className="hero-content">


    <h1 className="hero-title">
      Personalized care,<br />
      delivered to your door
    </h1>

    <p className="hero-subtitle">
      Expert-backed treatments designed just for you—all from the comfort of home.
    </p>

    
     <div className="hero-trust">
  <span className="hero-trust-item">
    <FaUserMd className="hero-trust-icon" />
    Licensed providers
  </span>

  <span className="hero-trust-item">
    <FaBox className="hero-trust-icon" />
    Discreet shipping
  </span>

  <span className="hero-trust-item">
    <FaHeadset className="hero-trust-icon" />
    Ongoing support
  </span>
</div>

    <div className="hero-cta-group">
      <button type="button" className="hero-button primary">
        Get Started <FiChevronRight className="button-icon" />
      </button>

      <button type="button" className="hero-button secondary">
        Learn More
      </button>
    </div>

    {/* Optional trust row (makes it feel more “complete” and conversion-friendly) */}
  
  </div>

  <div className="hero-image">
    <div className="hero-image-container">
      <img src={Lvn} alt="Healthcare Services" className="hero-img" />
      <p className="hero-image-caption">Clinician-guided plans • Discreet delivery</p>
    </div>
  </div>
</section>

  ), []);

  const CategoryCardsSection = useCallback(() => {
    const categoryCards = [
      {
        id: 'weight',
        title: 'Weight Management',
        icon: <GiWeightScale />,
        description: 'Comprehensive weight management solutions',
        productCount: 7,
      },
      {
        id: 'hair',
        title: 'Hair Loss',
        icon: <GiHairStrands />,
        description: 'Advanced hair restoration treatments',
        productCount: 2,
      },
      {
        id: 'sexual',
        title: 'Sexual Health',
        icon: <GiLoveInjection />,
        description: 'Confidential intimacy solutions',
        productCount: 6,
      },
      {
        id: 'acne',
        title: 'Acne',
        icon: <TbBandage />,
        description: 'Clear, healthy skin treatments',
        productCount: 3,
      },
      {
        id: 'aging',
        title: 'Anti-Aging',
        icon: <GiStaryu />,
        description: 'Youthful vitality solutions',
        productCount: 10,
      },
      {
        id: 'appetite',
        title: 'Appetite Suppressant',
        icon: <GiAppleSeeds />,
        description: 'Natural appetite control',
        productCount: 4,
      },
      {
        id: 'peptides',
        title: 'Peptides',
        icon: <GiChemicalDrop />,
        description: 'Advanced peptide therapies',
        productCount: 22,
      }
    ];

    return (
      <section className="category-cards-section">
        <div className="section-header">
          <h2 className="section-title">Browse Our Treatment Categories</h2>
          <p className="section-subtitle">
            Click on any category to explore our specialized treatments
          </p>
        </div>
        
        <div className="category-cards-grid">
          {categoryCards.map((category) => (
            <div 
              key={category.id}
              className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => scrollToCategory(category.id)}
            >
              <div className="category-card-image">
                <img 
                  src={categoryImages[category.id]} 
                  alt={category.title}
                  className="category-image"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&auto=format';
                  }}
                />
                <div className="category-image-overlay"></div>
              </div>
              
              <div className="category-card-content">
                <div className="category-card-header">
                  <h3 className="category-card-title">{category.title}</h3>
                </div>
                
                <p className="category-card-description">{category.description}</p>
                
                <div className="category-card-footer">
                  <div className="product-count-badge">
                    <FiPackage className="count-icon" />
                    <span>{category.productCount} Products</span>
                  </div>
                  <button className="explore-button">
                    Explore <FiChevronRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }, [activeCategory, scrollToCategory]);

  const categories = [
    {
      id: 'weight',
      title: 'Weight Management',
      icon: <GiWeightScale />,
      description: 'Comprehensive weight management solutions for sustainable results',
      products: [
        {
          id: 'weight-1',
          name: 'Tirzepatide',
          type: 'Injection',
          price: 299,
          monthlyPrice: '$299/mo',
          category: 'weight',
          features: ['Enhanced Weight Reduction', 'Improved Glucose Control', 'Long-Term Support'],
          popular: true
        },
        {
          id: 'weight-2',
          name: 'Semaglutide Sublingual',
          type: 'Sublingual',
          price: 249,
          monthlyPrice: '$249/mo',
          category: 'weight',
          features: ['Appetite Regulation', 'Supports Weight Loss', 'Improved Metabolic Health'],
          popular: false
        },
        {
          id: 'weight-3',
          name: 'Semaglutide Injection',
          type: 'Injection',
          price: 279,
          monthlyPrice: '$279/mo',
          category: 'weight',
          features: ['Significant Weight Reduction', 'Improved Metabolic Health', 'Sustainable Results'],
          popular: true
        },
        {
          id: 'weight-4',
          name: 'Phentermine HCl Tablet',
          type: 'Tablet',
          price: 129,
          monthlyPrice: '$129/mo',
          category: 'weight',
          features: ['Effective Appetite Suppression', 'Supports Weight Loss', 'Improved Energy'],
          popular: false
        },
        {
          id: 'weight-5',
          name: 'Metformin HCl ER Tablet',
          type: 'Tablet',
          price: 89,
          monthlyPrice: '$89/mo',
          category: 'weight',
          features: ['Effective Blood Sugar Control', 'Improved Insulin Sensitivity', 'Cardiovascular Benefits'],
          popular: false
        },
        {
          id: 'weight-6',
          name: 'Oral Weight Loss Capsules',
          type: 'Capsule',
          price: 79,
          monthlyPrice: '$79/mo',
          category: 'weight',
          features: ['Appetite Regulation', 'Blood Sugar Control', 'Weight Management'],
          popular: false
        },
        {
          id: 'weight-7',
          name: 'Liraglutide',
          type: 'Injection',
          price: 269,
          monthlyPrice: '$269/mo',
          category: 'weight',
          features: ['Effective Weight Loss', 'Appetite Regulation', 'Improved Metabolic Health'],
          popular: false
        }
      ]
    },
    {
      id: 'hair',
      title: 'Hair Loss',
      icon: <GiHairStrands />,
      description: 'Advanced treatments for hair restoration and growth',
      products: [
        {
          id: 'hair-1',
          name: 'Hair Loss Oral Medication',
          type: 'Tablet',
          price: 189,
          monthlyPrice: '$189/mo',
          category: 'hair',
          features: ['Clinically shown to slow hair loss', 'Once-daily tablet', 'Best paired with topical treatments'],
          popular: true
        },
        {
          id: 'hair-2',
          name: 'Hair Loss Scalp Topical Medication',
          type: 'Topical',
          price: 149,
          monthlyPrice: '$149/mo',
          category: 'hair',
          features: ['Targets hormonal & vascular causes', 'Reduces scalp irritation and buildup', 'Supports thicker, denser hair over time'],
          popular: false
        }
      ]
    },
    {
      id: 'sexual',
      title: 'Sexual Health',
      icon: <GiLoveInjection />,
      description: 'Confidential solutions for enhanced intimacy and wellness',
      products: [
        {
          id: 'sexual-1',
          name: 'PT-141 (bremelanotide) Injectable',
          type: 'Injection',
          price: 349,
          monthlyPrice: '$349/mo',
          category: 'sexual',
          features: ['Enhances sexual desire & arousal', 'Effective for both men and women', 'Fast-acting, nitric-oxide independent'],
          popular: true
        },
        {
          id: 'sexual-2',
          name: 'Oxytocin Nasal Spray',
          type: 'Spray',
          price: 129,
          monthlyPrice: '$129/mo',
          category: 'sexual',
          features: ['May enhance emotional bonding & intimacy', 'Supports arousal and satisfaction', 'Fast-acting nasal spray format'],
          popular: false
        },
        {
          id: 'sexual-3',
          name: 'Oxytocin 100 IU Troche',
          type: 'Troche',
          price: 119,
          monthlyPrice: '$119/mo',
          category: 'sexual',
          features: ['Enhances emotional bonding and sexual arousal', 'Supports positive mood and stress relief', 'Fast-absorbing, discreet sublingual troche'],
          popular: false
        },
        {
          id: 'sexual-4',
          name: 'Oxybutynin',
          type: 'Tablet',
          price: 99,
          monthlyPrice: '$99/mo',
          category: 'sexual',
          features: ['Reduces urinary urgency and frequency', 'Helps manage overactive bladder symptoms', 'Improves confidence and daily comfort'],
          popular: false
        },
        {
          id: 'sexual-5',
          name: 'Tadalafil + Oxytocin Troche',
          type: 'Troche',
          price: 279,
          monthlyPrice: '$279/mo',
          category: 'sexual',
          features: ['Improves erectile function and performance', 'Enhances arousal, bonding, and intimacy', 'Fast-acting sublingual absorption'],
          popular: true
        },
        {
          id: 'sexual-6',
          name: 'Erectile Dysfunction Medication',
          type: 'Various',
          price: 199,
          monthlyPrice: '$199/mo',
          category: 'sexual',
          features: ['Long-lasting effect (up to ~36 hours)', 'Improves sexual confidence and satisfaction', 'Convenient, well-tolerated oral tablet'],
          popular: false
        }
      ]
    },
    {
      id: 'acne',
      title: 'Acne',
      icon: <TbBandage />,
      description: 'Effective treatments for clear, healthy skin',
      products: [
        {
          id: 'acne-1',
          name: 'Acne Gel',
          type: 'Gel',
          price: 89,
          monthlyPrice: '$89/mo',
          category: 'acne',
          features: ['Reduces acne-causing bacteria and inflammation', 'Unclogs pores and controls excess oil', 'Multi-active gel for clearer, smoother skin'],
          popular: true
        },
        {
          id: 'acne-2',
          name: 'Acne Cream',
          type: 'Cream',
          price: 79,
          monthlyPrice: '$79/mo',
          category: 'acne',
          features: ['Reduces breakouts, inflammation, and excess oil', 'Clears pores and helps fade post-acne marks', 'Gentle, effective care for acne-prone skin'],
          popular: false
        },
        {
          id: 'acne-3',
          name: 'Doxycycline Hyclate for Acne',
          type: 'Tablet',
          price: 99,
          monthlyPrice: '$99/mo',
          category: 'acne',
          features: ['Treats moderate to severe acne', 'Helps manage bacterial skin conditions', 'Convenient once-daily oral tablet'],
          popular: false
        }
      ]
    },
    {
      id: 'aging',
      title: 'Anti-Aging',
      icon: <GiStaryu />,
      description: 'Science-backed solutions for youthful vitality',
      products: [
        {
          id: 'aging-1',
          name: 'Nicotinamide Riboside (NR) Injectable',
          type: 'Injection',
          price: 349,
          monthlyPrice: '$349/mo',
          category: 'aging',
          features: ['Boosts cellular energy, metabolism, and vitality', 'Supports healthy aging, DNA repair, and recovery', 'Enhances mental clarity, stamina, and overall wellness'],
          popular: true
        },
        {
          id: 'aging-2',
          name: 'Low Dose Naltrexone',
          type: 'Tablet',
          price: 89,
          monthlyPrice: '$89/mo',
          category: 'aging',
          features: ['Regulates immune response', 'Supports autoimmune balance', 'Improves mood, energy, and sleep'],
          popular: false
        },
        {
          id: 'aging-3',
          name: 'Anti Aging Topical Gel',
          type: 'Gel',
          price: 129,
          monthlyPrice: '$129/mo',
          category: 'aging',
          features: ['Targets hyperpigmentation and sun damage', 'Boosts collagen and skin renewal', 'Brightens tone and smooths fine lines'],
          popular: false
        },
        {
          id: 'aging-4',
          name: 'NAD+ Injection',
          type: 'Injection',
          price: 399,
          monthlyPrice: '$399/mo',
          category: 'aging',
          features: ['Boosts cellular energy and metabolism', 'Supports cognitive clarity and physical recovery', 'Promotes healthy aging and overall vitality'],
          popular: true
        },
        {
          id: 'aging-5',
          name: 'Anti Aging Topical Cream',
          type: 'Cream',
          price: 119,
          monthlyPrice: '$119/mo',
          category: 'aging',
          features: ['Reduces fine lines, wrinkles, and dark spots', 'Improves skin tone, texture, and radiance', 'Calms redness while supporting collagen renewal'],
          popular: false
        },
        {
          id: 'aging-6',
          name: 'Vitamin B12 Injection',
          type: 'Injection',
          price: 79,
          monthlyPrice: '$79/mo',
          category: 'aging',
          features: ['Boosts energy, mood, and mental clarity', 'Supports nerve health and cognitive function', 'Promotes healthy red blood cell and DNA production'],
          popular: false
        },
        {
          id: 'aging-7',
          name: 'NAD+ Patches',
          type: 'Patch',
          price: 199,
          monthlyPrice: '$199/mo',
          category: 'aging',
          features: ['Boosts cellular energy and brain clarity', 'Supports healthy aging and recovery', 'Non-invasive patch format with multiple uses'],
          popular: false
        },
        {
          id: 'aging-8',
          name: 'NAD+ Nasal Spray',
          type: 'Spray',
          price: 179,
          monthlyPrice: '$179/mo',
          category: 'aging',
          features: ['Enhances mental clarity and cognitive performance', 'Boosts energy while supporting healthy aging', 'Fast-absorbing, non-invasive nasal spray'],
          popular: false
        },
        {
          id: 'aging-9',
          name: 'Methylene Blue Capsules',
          type: 'Capsule',
          price: 149,
          monthlyPrice: '$149/mo',
          category: 'aging',
          features: ['Supports brain focus, memory, and cellular energy', 'Helps immune resilience and infection recovery protocols', 'Protects cells from oxidative stress for healthy aging'],
          popular: false
        },
        {
          id: 'aging-10',
          name: 'Glutathione',
          type: 'Injection',
          price: 179,
          monthlyPrice: '$179/mo',
          category: 'aging',
          features: ['Powerful antioxidant support for cellular protection', 'Aids detoxification, immune health, and cellular repair', 'Promotes brighter skin and overall vitality'],
          popular: true
        }
      ]
    },
    {
      id: 'appetite',
      title: 'Appetite Suppressant',
      icon: <GiAppleSeeds />,
      description: 'Natural and pharmaceutical appetite control solutions',
      products: [
        {
          id: 'appetite-1',
          name: 'Sermorelin Troche',
          type: 'Troche',
          price: 159,
          monthlyPrice: '$159/mo',
          category: 'appetite',
          features: ['Naturally stimulates growth hormone production', 'Supports deep sleep, recovery, and daily energy', 'Aids fat metabolism and healthy aging'],
          popular: true
        },
        {
          id: 'appetite-2',
          name: 'L-Carnitine',
          type: 'Injection',
          price: 99,
          monthlyPrice: '$99/mo',
          category: 'appetite',
          features: ['Enhances fat metabolism and energy production', 'Supports weight management and exercise recovery', 'Promotes cardiovascular and cognitive health'],
          popular: false
        },
        {
          id: 'appetite-3',
          name: 'Skinny Shots - MICC',
          type: 'Injection',
          price: 129,
          monthlyPrice: '$129/mo',
          category: 'appetite',
          features: ['Weekly Injection', 'Multi-Nutrient', 'Metabolism Boost'],
          popular: true
        },
        {
          id: 'appetite-4',
          name: 'Skinny Shots',
          type: 'Injection',
          price: 109,
          monthlyPrice: '$109/mo',
          category: 'appetite',
          features: ['Weekly Injection', 'Energy Support', 'Appetite Control'],
          popular: false
        }
      ]
    },
    {
      id: 'peptides',
      title: 'Peptides',
      icon: <GiChemicalDrop />,
      description: 'Advanced peptide therapies for optimal health',
      products: [
        {
          id: 'peptide-1',
          name: 'Sermorelin Sublingual',
          type: 'Sublingual',
          price: 169,
          monthlyPrice: '$169/mo',
          category: 'peptides',
          features: ['Naturally stimulates growth hormone production', 'Supports energy, recovery, and better sleep', 'Aids fat metabolism and healthy aging'],
          popular: false
        },
        {
          id: 'peptide-2',
          name: 'Pinealon/PE22-28/Selank',
          type: 'Peptide',
          price: 229,
          monthlyPrice: '$229/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: false
        },
        {
          id: 'peptide-3',
          name: 'MK-677 (Ibutamoren)',
          type: 'Peptide',
          price: 249,
          monthlyPrice: '$249/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: true
        },
        {
          id: 'peptide-4',
          name: 'Sermorelin Injection',
          type: 'Injection',
          price: 279,
          monthlyPrice: '$279/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: true
        },
        {
          id: 'peptide-5',
          name: 'CJC/Ipamorelin',
          type: 'Peptide',
          price: 299,
          monthlyPrice: '$299/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: true
        },
        {
          id: 'peptide-6',
          name: 'BP-157/TB500',
          type: 'Peptide',
          price: 269,
          monthlyPrice: '$269/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: false
        },
        {
          id: 'peptide-7',
          name: 'BPC-157/KPV/TB500',
          type: 'Peptide',
          price: 289,
          monthlyPrice: '$289/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: false
        },
        {
          id: 'peptide-8',
          name: 'BPC - 157',
          type: 'Peptide',
          price: 229,
          monthlyPrice: '$229/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: true
        },
        {
          id: 'peptide-9',
          name: 'BPC-157/GHK-U/KPV/TB500',
          type: 'Peptide',
          price: 329,
          monthlyPrice: '$329/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: false
        },
        {
          id: 'peptide-10',
          name: 'GHK-Cu/Epitalon',
          type: 'Peptide',
          price: 299,
          monthlyPrice: '$299/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: false
        },
        {
          id: 'peptide-11',
          name: 'BPC-157 ACETATE Capsule',
          type: 'Capsule',
          price: 199,
          monthlyPrice: '$199/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: false
        },
        {
          id: 'peptide-12',
          name: 'GHK-Cu',
          type: 'Peptide',
          price: 219,
          monthlyPrice: '$219/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: false
        },
        {
          id: 'peptide-13',
          name: 'IGF-LR3',
          type: 'Peptide',
          price: 349,
          monthlyPrice: '$349/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: true
        },
        {
          id: 'peptide-14',
          name: 'Semax/Selank',
          type: 'Peptide',
          price: 259,
          monthlyPrice: '$259/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: false
        },
        {
          id: 'peptide-15',
          name: 'Tesamorelin / Ipamorelin',
          type: 'Peptide',
          price: 319,
          monthlyPrice: '$319/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: false
        },
        {
          id: 'peptide-16',
          name: 'DSIP/BPC/CJC',
          type: 'Peptide',
          price: 279,
          monthlyPrice: '$279/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: false
        },
        {
          id: 'peptide-17',
          name: 'DSIP',
          type: 'Peptide',
          price: 189,
          monthlyPrice: '$189/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: false
        },
        {
          id: 'peptide-18',
          name: 'MOTS-C',
          type: 'Peptide',
          price: 239,
          monthlyPrice: '$239/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: false
        },
        {
          id: 'peptide-19',
          name: 'Epitalon',
          type: 'Peptide',
          price: 249,
          monthlyPrice: '$249/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: false
        },
        {
          id: 'peptide-20',
          name: 'Thymosin A-1',
          type: 'Peptide',
          price: 269,
          monthlyPrice: '$269/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: false
        },
        {
          id: 'peptide-21',
          name: 'LL-37',
          type: 'Peptide',
          price: 229,
          monthlyPrice: '$229/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: false
        },
        {
          id: 'peptide-22',
          name: 'Tesamorelin',
          type: 'Peptide',
          price: 349,
          monthlyPrice: '$349/mo',
          category: 'peptides',
          features: ['Personalized dosing based on your goals', 'Provider-monitored use and adjustments', 'Integrated with nutrition, movement, and sleep'],
          popular: true
        }
      ]
    }
  ];

  const animateScroll = useCallback((element, to, duration = 140) => {
    const start = element.scrollLeft;
    const change = to - start;
    const startTime = performance.now();

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      element.scrollLeft = start + change * easeOutCubic(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const scrollCarousel = useCallback((categoryId, direction) => {
    const carousel = carouselRefs[categoryId]?.current;
    if (!carousel) return;

    const cardWidth = 350;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const currentScroll = carousel.scrollLeft;

    if (direction === 'next' && currentScroll < maxScroll - 5) {
      carousel.scrollTo({
        left: Math.min(currentScroll + cardWidth, maxScroll),
        behavior: 'smooth'
      });
      return;
    }

    if (direction === 'prev' && currentScroll > 5) {
      carousel.scrollTo({
        left: Math.max(currentScroll - cardWidth, 0),
        behavior: 'smooth'
      });
      return;
    }

    if (direction === 'prev' && currentScroll <= 5) {
      animateScroll(carousel, maxScroll, 140);
    }

    if (direction === 'next' && currentScroll >= maxScroll - 5) {
      animateScroll(carousel, 0, 140);
    }
  }, [animateScroll]);

  const trustIndicators = [
    { icon: <MdHealthAndSafety />, text: 'Doctor-Trusted Treatments' },
    { icon: <FiShield />, text: 'Secure & Confidential' },
    { icon: <FiUserCheck />, text: 'Personalized Plans' },
    { icon: <MdLocalPharmacy />, text: 'Pharmacy Grade' },
    { icon: <FiHeart />, text: 'Patient-Centered Care' },
  ];

  return (
    <div className="homepage">
      {/* Toast Container with single toast support */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        limit={1}
        onClose={() => {
          toastIdRef.current = null;
        }}
      />
      
      <HeroSection />

      <CategoryCardsSection />

      {categories.map(category => (
        <CategorySection
          key={category.id}
          category={category}
          categoryRef={categoryRefs[category.id]}
          carouselRef={carouselRefs[category.id]}
          productCartStatus={productCartStatus}
          onProductClick={handleProductClick}
          onAddToCart={handleAddToCart}
          scrollCarousel={scrollCarousel}
        />
      ))}

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

      {showModal && selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={handleCloseModal}
          onAddToCart={() => handleAddToCart(selectedProduct)}
          productImage={productImages[selectedProduct.name] || productImages['default']}
          productInfo={productInfo[selectedProduct.name] || {}}
        />
      )}
    </div>
  );
};

export default Homepage;
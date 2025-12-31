import React from 'react';
import { FiXCircle, FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';
import { GiMedicinePills } from 'react-icons/gi';
import "../../assets/styles/productModal.css"
import Button from '../ui/button';
const PRODUCT_CONFIGS = {
  'Hair Loss Oral Medication': {
    title: "Provider-selected oral options",
    subtitle: "With a 3-month supply shipped to your door.",
    sections: [
      {
        type: 'prescription_options',
        title: "Prescription Options",
        options: [
          {
            title: "Finasteride Tablets",
            description: "Once-daily oral medication for male pattern hair loss (androgenetic alopecia). Finasteride helps reduce DHT (dihydrotestosterone)—the hormone that miniaturizes hair follicles—supporting thicker, fuller hair over time.",
            strengths: ["1 mg", "5 mg"],
            features: [
              "Clinically shown to slow loss and support regrowth.",
              "Simple once-daily tablet; best combined with topical support."
            ],
            pricingNote: "Final pricing depends on strength and quantity. Provider will determine your 3-month supply."
          },
          {
            title: "Biotin / Minoxidil Capsules (5 mg / 1.25 mg)",
            description: "Biotin supports keratin production while oral Minoxidil helps increase scalp blood flow and awaken dormant follicles—promoting stronger, thicker hair.",
            features: [
              "Helps reduce thinning and shedding.",
              "Encourages new growth with convenient once-daily dosing."
            ],
            pricingNote: "Final pricing may vary by dosage and program length. Provider will determine your 3-month supply."
          },
          {
            title: "Biotin / Minoxidil / Spironolactone Capsules (5 mg / 1.25 mg / 25 mg)",
            description: "Triple-ingredient capsule that supports growth and targets hormone-related thinning. Biotin aids keratin production, Minoxidil stimulates follicles, and Spironolactone helps counter androgen effects.",
            features: [
              "Addresses androgen-related thinning while supporting regrowth.",
              "Once-daily capsule with provider guidance."
            ],
            pricingNote: "Final pricing may vary by dosage and program length. Provider will determine your 3-month supply."
          }
        ]
      },
      {
        type: 'how_it_works',
        title: "How it works",
        steps: [
          {
            title: "Step 1: Online pre-assessment",
            description: "Answer a short medical questionnaire so we understand your hair goals and health history."
          },
          {
            title: "Step 2: Licensed provider review",
            description: "Your provider determines eligibility and selects the best option for you (including strength and formulation). No live consult required unless clinically indicated."
          },
          {
            title: "Step 3: 3-month supply, shipped discreetly",
            description: "We prepare and ship your initial 90-day supply. Ongoing care and refills are managed online."
          }
        ]
      },
      {
        type: 'important_note',
        content: "All medications are by prescription only. The information on this page is educational and not a substitute for professional medical advice. Always follow your licensed provider's directions."
      },
      {
        type: 'faq',
        title: "FAQs",
        items: [
          {
            question: "Who is a good candidate for oral hair-loss therapy?",
            answer: "Adults with androgenetic alopecia or diffuse thinning may benefit. Your provider will review your history, medications, and goals to confirm eligibility and choose a formulation."
          },
          {
            question: "How long until I see results?",
            answer: "Most people begin noticing reduced shedding in 8–12 weeks, with visible density changes over 3–6 months. Consistency matters; results vary by individual."
          },
          {
            question: "Can I combine oral and topical treatments?",
            answer: "Yes—many patients pair oral therapy with topical Minoxidil or low-level laser devices to optimize outcomes. Your provider can guide a combined plan."
          },
          {
            question: "Is lab monitoring required?",
            answer: "Monitoring needs depend on the medication selected and your medical history. Your provider will advise if bloodwork or follow-ups are recommended."
          }
        ]
      }
    ],
    disclaimer: "Prescription products are dispensed only after approval by a licensed provider. This page is for educational purposes and does not replace medical advice."
  },
  
  'Hair Loss Scalp Topical Medication': {
    title: "Prescription-strength scalp treatments",
    description: "Non-oral scalp treatments designed to address pattern hair loss by targeting hormonal, vascular, and scalp-barrier contributors—all in easy, once-daily topicals.",
    sections: [
      {
        type: 'formulations',
        title: "Available Formulations",
        options: [
          {
            title: "Scalp Solution — Finasteride 0.25% / Tretinoin 0.01% in Minoxidil 5%",
            description: "Triple-agent topical designed for hair thinning and pattern loss. Minoxidil 5% promotes follicle activity and blood flow, Finasteride 0.25% helps reduce scalp DHT levels, and Tretinoin 0.01% supports absorption and cellular turnover.",
            features: [
              "Supports regrowth and reduces shedding",
              "Targets hormonal and vascular factors",
              "Improves scalp absorption and health",
              "Non-invasive, easy daily application"
            ]
          },
          {
            title: "Scalp Suspension — Minoxidil 7% / Azelaic Acid 5% / Finasteride 0.1% / Niacinamide 5%",
            description: "Advanced four-ingredient suspension for powerful non-oral support. Minoxidil 7% boosts follicular activity, Azelaic Acid 5% and Finasteride 0.1% act on scalp DHT, while Niacinamide 5% helps calm inflammation and support the skin barrier.",
            features: [
              "Addresses hormonal + vascular drivers of loss",
              "Reduces scalp irritation and buildup",
              "Supports density and thickness over time",
              "Non-systemic DHT-targeting approach"
            ]
          }
        ]
      },
      {
        type: 'how_it_works',
        title: "How It Works",
        steps: [
          {
            title: "Step 1: Complete a brief, secure pre-assessment",
            description: "To confirm eligibility and choose the best formulation."
          },
          {
            title: "Step 2: Licensed provider review",
            description: "A licensed provider reviews your information and, if appropriate, issues a prescription (no live visit required)."
          },
          {
            title: "Step 3: Discreet delivery to your door",
            description: "Apply to the scalp daily as directed; consistent use over months is key."
          }
        ],
        pricingNote: "Final pricing may vary by formulation, fill size, and program duration."
      },
      {
        type: 'safety_info',
        title: "Important Safety Information",
        items: [
          {
            icon: <FiXCircle className="x-icon" />,
            content: "<strong>Finasteride caution:</strong> Teratogenic risk—pregnant or breastfeeding individuals should avoid exposure/handling. Keep away from children."
          },
          {
            icon: <FiXCircle className="x-icon" />,
            content: "Do not use if allergic to any ingredients (Finasteride, Minoxidil, Tretinoin, Azelaic Acid, Niacinamide)."
          },
          {
            icon: <FiXCircle className="x-icon" />,
            content: "Avoid use on broken/irritated skin or with active scalp infection."
          },
          {
            icon: <FiXCircle className="x-icon" />,
            content: "Discuss hormone-sensitive conditions and other medications with your provider before use."
          },
          {
            icon: <FiXCircle className="x-icon" />,
            content: "Topicals may rarely cause local irritation (redness, itching, dryness). Discontinue and contact your provider if severe."
          }
        ],
        note: "These are prescription products. Always follow your provider's instructions and use sunscreen on treated areas as advised."
      }
    ],
    disclaimer: "These medications are available by prescription only. The content on this page is for informational purposes and does not replace medical advice. Consult a licensed provider to determine suitability and dosing."
  }
};
const DEFAULT_CONFIG = {
  title: "Product Information",
  sections: [
    {
      type: 'description',
      title: "Description",
      content: "Detailed information about this product will be available soon."
    },
    {
      type: 'benefits',
      title: "Benefits",
      items: ["Benefit 1", "Benefit 2", "Benefit 3"]
    },
    {
      type: 'how_it_works',
      title: "How It Works",
      steps: [
        {
          title: "Step 1",
          description: "Description for step 1"
        },
        {
          title: "Step 2",
          description: "Description for step 2"
        },
        {
          title: "Step 3",
          description: "Description for step 3"
        }
      ]
    },
    {
      type: 'safety_info',
      title: "Important Safety Information",
      items: ["Warning 1", "Warning 2"]
    }
  ],
  disclaimer: "Consult your healthcare provider for more information."
};


const PrescriptionOptionsSection = ({ options }) => (
  <div className="modal-section prescription-section">
    <h3 className="modal-section-title">Prescription Options</h3>
    {options.map((option, index) => (
      <div key={index} className="prescription-option">
        <h4 className="prescription-title">{option.title}</h4>
        <p className="prescription-description">{option.description}</p>
        
        {option.strengths && (
          <div className="strength-options">
            {option.strengths.map((strength, idx) => (
              <span key={idx} className="strength-tag">{strength}</span>
            ))}
          </div>
        )}
        
        {option.features && (
          <div className="prescription-features">
            {option.features.map((feature, idx) => (
              <div key={idx} className="prescription-feature">
                <FiCheckCircle className="check-icon" /> {feature}
              </div>
            ))}
          </div>
        )}
        
        {option.pricingNote && (
          <div className="pricing-note">
            <FiAlertCircle className='x-icon'/> {option.pricingNote}
          </div>
        )}
      </div>
    ))}
  </div>
);

const FormulationsSection = ({ options }) => (
  <div className="modal-section formulations-section">
    <h3 className="modal-section-title">Available Formulations</h3>
    {options.map((option, index) => (
      <div key={index} className="formulation-option">
        <h4 className="formulation-title">{option.title}</h4>
        <p className="formulation-description">{option.description}</p>
        
        {option.features && (
          <div className="formulation-features">
            {option.features.map((feature, idx) => (
              <div key={idx} className="formulation-feature">
                <FiCheckCircle className='check-icon' /> {feature}
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

const HowItWorksSection = ({ title, steps, pricingNote }) => (
  <div className="modal-section process-section">
    <h3 className="modal-section-title">{title}</h3>
    
    <div className="process-steps">
      {steps.map((step, index) => (
        <div key={index} className="process-step">
          {step.icon}
          <div className="step-content">
            <h4 className="step-title">{step.title}</h4>
            <p className="step-description">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
    
    {pricingNote && (
      <div className="pricing-note">
        <FiAlertCircle className='x-icon' /> {pricingNote}
      </div>
    )}
  </div>
);

const FAQSection = ({ items }) => (
  <div className="modal-section faq-section">
    <h3 className="modal-section-title">FAQs</h3>
    
    {items.map((item, index) => (
      <div key={index} className="faq-item">
        <h4 className="faq-question">{item.question}</h4>
        <p className="faq-answer">{item.answer}</p>
      </div>
    ))}
  </div>
);

const SafetyInfoSection = ({ title, items, note }) => (
  <div className="modal-section safety-section">
    <h3 className="modal-section-title warning-title">{title}</h3>
    
    <div className="safety-list">
      {items.map((item, index) => (
        <div key={index} className="safety-item">
          {item.icon ? item.icon : <FiXCircle className="x-icon" />}
          <span dangerouslySetInnerHTML={{ __html: typeof item === 'object' ? item.content : item }} />
        </div>
      ))}
    </div>
    
    {note && (
      <div className="safety-note">
        <strong>Note:</strong> {note}
      </div>
    )}
  </div>
);

const DefaultSection = ({ type, title, content, items }) => {
  if (type === 'description') {
    return (
      <div className="modal-section">
        <h3 className="modal-section-title">{title}</h3>
        <p className="modal-description">{content}</p>
      </div>
    );
  }
  
  if (type === 'benefits') {
    return (
      <div className="modal-section">
        <h3 className="modal-section-title">{title}</h3>
        <div className="modal-list">
          {items.map((item, index) => (
            <div key={index} className="modal-list-item">
              <FiCheckCircle className="check-icon" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return null;
};

const ProductModal = ({ product, onClose, onAddToCart, productImage, productInfo }) => {
  if (!product) return null;
  const productConfig = PRODUCT_CONFIGS[product.name] || 
    (productInfo ? {
      title: product.name,
      sections: [
        {
          type: 'description',
          title: "Description",
          content: productInfo.description || 'Detailed information about this product will be available soon.'
        },
        ...(productInfo.benefits ? [{
          type: 'benefits',
          title: "Benefits",
          items: productInfo.benefits
        }] : []),
        ...(productInfo.howItWorks ? [{
          type: 'how_it_works',
          title: "How It Works",
          steps: productInfo.howItWorks.map(step => ({
            title: step.title || step,
            description: step.description || ''
          }))
        }] : []),
        ...(productInfo.warnings ? [{
          type: 'safety_info',
          title: "Important Safety Information",
          items: productInfo.warnings
        }] : [])
      ],
      disclaimer: productInfo.disclaimer || 'Consult your healthcare provider for more information.'
    } : DEFAULT_CONFIG);

  const renderSection = (section) => {
    switch (section.type) {
      case 'prescription_options':
        return <PrescriptionOptionsSection options={section.options} />;
      
      case 'formulations':
        return <FormulationsSection options={section.options} />;
      
      case 'how_it_works':
        return (
          <HowItWorksSection 
            title={section.title} 
            steps={section.steps} 
            pricingNote={section.pricingNote} 
          />
        );
      
      case 'faq':
        return <FAQSection items={section.items} />;
      
      case 'safety_info':
        return (
          <SafetyInfoSection 
            title={section.title} 
            items={section.items} 
            note={section.note} 
          />
        );
      
      case 'important_note':
        return (
          <div className="modal-section important-note-section">
            <p className="important-note">
              <strong>Important:</strong> {section.content}
            </p>
          </div>
        );
      
      default:
        return <DefaultSection {...section} />;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
       
                <div className="modal-header">
          <div className="modal-image-container">
            <img 
              src={productImage} 
              alt={product.name}
              className="modal-image"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w-400&h=300&fit=crop&auto=format';
              }}
            />
          </div>
          <div className="modal-header-info">
            <h2 className="modal-title">{product.name}</h2>
            <div className="modal-product-type">
              <GiMedicinePills />
              <span>{product.type}</span>
            </div>
            <div className="modal-price-section">
              <span className="modal-price">{product.price}</span>
              <span className="modal-price-note">Monthly Treatment Plan</span>
            </div>
          </div>
        </div>

                <div className="modal-body">
                    {productConfig.title && (
            <div className="modal-section">
              <h3 className="modal-section-title">{productConfig.title}</h3>
              {productConfig.subtitle && (
                <p className="modal-subtitle">{productConfig.subtitle}</p>
              )}
              {productConfig.description && (
                <p className="modal-description">{productConfig.description}</p>
              )}
            </div>
          )}

                    {productConfig.sections.map((section, index) => (
            <React.Fragment key={index}>
              {renderSection(section)}
            </React.Fragment>
          ))}

                    <div className="modal-section disclaimer-section">
            <p className="modal-disclaimer">
              <strong>Disclaimer:</strong> {productConfig.disclaimer}
            </p>
            <p className="copyright">
              © 2025 Healthcare Prosoft Medical Management Company. All rights reserved.
            </p>
          </div>
        </div>

                <div className="modal-footer">
          <Button
            onClick={() => onAddToCart(product)}
            variant="primary"
            size="medium"
           
          >
            Add to Cart
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            size="medium"
            className="modal-close-btn"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
export { PRODUCT_CONFIGS };
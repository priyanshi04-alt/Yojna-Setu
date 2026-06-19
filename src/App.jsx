import React, { useState } from 'react';
import { 
  Sparkles, Check, ChevronLeft, Search, MessageSquare, ArrowRight,
  Clock, MessageCircle, MapPin, FileText, Send, Zap, ShieldCheck,
  Briefcase, HelpCircle, Info, PhoneCall, ExternalLink, X,
  UserPlus, FileEdit, CheckCircle, CreditCard, Landmark, Home, User, Banknote,
  Compass, Layers, Navigation, ChevronRight
} from 'lucide-react';
import { schemesData } from './data/SchemesData';
import logoImg from './assets/yojnasetu_logo.png';
import successImg from './assets/scheme_success.png';
import supportImg from './assets/support_character.png';
import bunnyGuideImg from './assets/bunny_guide.png';
import farmerBanner from './assets/farmer_banner.png';
import healthBanner from './assets/health_banner.png';
import businessBanner from './assets/business_banner.png';
import studentBanner from './assets/student_banner.png';
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup, useMap, Marker } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

// ==========================================
// VIEW 1: AUTH (Login / Signup)
// ==========================================
const AuthView = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ age: '', income: '', category: '', caste: '', state: '', password: '', email: '', firstName: '', lastName: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      const savedUsers = JSON.parse(localStorage.getItem('yojnasetuUsers') || '{}');
      const user = savedUsers[formData.email];
      if (user && user.password === formData.password) {
        onComplete(user);
      } else {
        alert("Invalid email or password. Please try again or create an account.");
      }
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      const savedUsers = JSON.parse(localStorage.getItem('yojnasetuUsers') || '{}');
      savedUsers[formData.email] = formData;
      localStorage.setItem('yojnasetuUsers', JSON.stringify(savedUsers));
      onComplete(formData);
    }
  };

  return (
    <div className="auth-view">
      <div className="auth-card">
        <div className="auth-sidebar">
          <div className="auth-logo" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logoImg} alt="YojnaSetu Logo" style={{ height: '48px', width: 'auto', objectFit: 'contain', marginRight: '12px' }} /> YojnaSetu
          </div>
          <div className="auth-steps">
            {!isLogin ? (
              <>
                <div className={`auth-step ${step >= 1 ? 'active' : ''}`} onClick={() => setStep(1)}>
                  <div className="step-circle">{step > 1 ? <Check size={16}/> : '1'}</div>
                  Personal Details
                </div>
                <div className={`auth-step ${step >= 2 ? 'active' : ''}`} onClick={() => setStep(2)}>
                  <div className="step-circle">{step > 2 ? <Check size={16}/> : '2'}</div>
                  Eligibility Criteria
                </div>
                <div className={`auth-step ${step >= 3 ? 'active' : ''}`} onClick={() => setStep(3)}>
                  <div className="step-circle">3</div>
                  Summary
                </div>
              </>
            ) : (
              <div className="auth-step active">
                <div className="step-circle"><Check size={16}/></div>
                Login Account
              </div>
            )}
          </div>
        </div>
        
        <div className="auth-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2>{isLogin ? 'Welcome Back' : 'Create account'}</h2>
            <button type="button" onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: '#238b77', fontWeight: 600, cursor: 'pointer' }}>
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {isLogin && (
               <div className="auth-form-grid">
                 <div className="auth-form-group full">
                   <label htmlFor="login-email">Email Address</label>
                   <input id="login-email" name="email" type="email" autoComplete="username" className="auth-input" placeholder="your@email.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                 </div>
                 <div className="auth-form-group full">
                   <label htmlFor="login-password">Password</label>
                   <input id="login-password" name="password" type="password" autoComplete="current-password" className="auth-input" placeholder="••••••••" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                 </div>
               </div>
            )}

            {!isLogin && step === 1 && (
              <div className="auth-form-grid">
                <div className="auth-form-group">
                  <label>First Name</label>
                  <input type="text" className="auth-input" placeholder="First Name" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div className="auth-form-group">
                  <label>Last Name</label>
                  <input type="text" className="auth-input" placeholder="Last Name" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                </div>
                <div className="auth-form-group full">
                  <label htmlFor="reg-email">Email Address</label>
                  <input id="reg-email" name="email" type="email" autoComplete="username" className="auth-input" placeholder="your@email.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="auth-form-group full">
                  <label htmlFor="reg-password">Create Password</label>
                  <input id="reg-password" name="password" type="password" autoComplete="new-password" className="auth-input" placeholder="••••••••" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
                <div className="auth-form-group full">
                  <label>Your State</label>
                  <select className="auth-input" required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})}>
                    <option value="">Select State</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                </div>
              </div>
            )}

            {!isLogin && step === 2 && (
              <div className="auth-form-grid">
                <div className="auth-form-group">
                  <label>Your Age</label>
                  <input type="number" className="auth-input" placeholder="e.g. 22" required value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} />
                </div>
                <div className="auth-form-group">
                  <label>Profession / Role</label>
                  <select className="auth-input" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="">Select Role</option>
                    <option value="student">Student</option>
                    <option value="farmer">Farmer</option>
                    <option value="health">Health</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                <div className="auth-form-group">
                  <label>Caste Category</label>
                  <select className="auth-input" required value={formData.caste} onChange={e => setFormData({...formData, caste: e.target.value})}>
                    <option value="">Select Caste</option>
                    <option value="General">General</option>
                    <option value="OBC">OBC</option>
                    <option value="SC">SC</option>
                    <option value="ST">ST</option>
                    <option value="EWS">EWS</option>
                  </select>
                </div>
                <div className="auth-form-group full">
                  <label>Annual Income (₹)</label>
                  <input type="number" className="auth-input" placeholder="e.g. 250000" required value={formData.income} onChange={e => setFormData({...formData, income: e.target.value})} />
                </div>
              </div>
            )}

            {!isLogin && step === 3 && (
              <div>
                <p style={{ color: '#64748b', marginBottom: '2rem' }}>Please review your details before creating your account.</p>
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <p><strong>Age:</strong> {formData.age}</p>
                  <p><strong>Income:</strong> ₹{formData.income}</p>
                  <p><strong>Role:</strong> {formData.category} | <strong>Caste:</strong> {formData.caste}</p>
                  <p><strong>State:</strong> {formData.state}</p>
                </div>
              </div>
            )}

            <button type="submit" className="btn auth-btn">
              {isLogin ? 'Log In' : (step === 3 ? 'Create Account' : 'Next')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// VIEW 2: HOME (Light Red Theme)
// ==========================================
const HomeView = ({ userProfile, onViewDetails, onOpenChat, onLogout, onLogin, onSearch, onOpenVault }) => {
  const [formData, setFormData] = useState({ 
    category: userProfile?.category || '', 
    caste: userProfile?.caste || '',
    age: userProfile?.age || '', 
    income: userProfile?.income || '', 
    state: userProfile?.state || '' 
  });
  
  React.useEffect(() => {
    if (userProfile) {
      setFormData({
        category: userProfile.category || '', 
        caste: userProfile.caste || '',
        age: userProfile.age || '', 
        income: userProfile.income || '', 
        state: userProfile.state || '' 
      });
    }
  }, [userProfile]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  const age = parseInt(formData.age) || 0;
  const income = parseInt(formData.income) || 0;
  
  let filteredSchemes = schemesData.filter(s => {
    if (!userProfile) return true;
    const matchAge = age >= s.eligibility.minAge && age <= s.eligibility.maxAge;
    const matchIncome = income <= s.eligibility.maxIncome;
    const matchCategory = userProfile.category ? s.category === userProfile.category : true;
    
    // Caste Filtering Logic
    const userCaste = formData.caste || '';
    let matchCaste = true;
    if (userCaste) {
      const text = (s.title + " " + s.description).toLowerCase();
      const isSCSTScheme = text.includes(' sc ') || text.includes(' st ') || text.includes('scheduled caste') || text.includes('tribal') || text.includes('dalit');
      const isMinorityScheme = text.includes('minority') || text.includes('obc') || text.includes('backward class');
      
      if (userCaste === 'General') {
        if (isSCSTScheme || isMinorityScheme) matchCaste = false;
      } else if (userCaste === 'OBC') {
        if (isSCSTScheme) matchCaste = false;
      }
    }

    const userState = formData.state || '';
    let matchState = true;
    if (userState) {
      const schemeText = JSON.stringify(s).toLowerCase();
      const allStates = ['andhra pradesh', 'arunachal pradesh', 'assam', 'bihar', 'chhattisgarh', 'goa', 'gujarat', 'haryana', 'himachal pradesh', 'jharkhand', 'karnataka', 'kerala', 'madhya pradesh', 'maharashtra', 'manipur', 'meghalaya', 'mizoram', 'nagaland', 'odisha', 'punjab', 'rajasthan', 'sikkim', 'tamil nadu', 'telangana', 'tripura', 'uttar pradesh', 'uttarakhand', 'west bengal', 'puducherry', 'delhi', 'chandigarh'];
      const mentionsAnyState = allStates.some(st => schemeText.includes(st));
      matchState = !mentionsAnyState || schemeText.includes(userState.toLowerCase());
    }
    
    return matchAge && matchIncome && matchCategory && matchCaste && matchState;
  });

  const displaySchemes = filteredSchemes.slice(0, 6);

  return (
    <div className="home-view">
      <header className="home-header">
        <div className="container header-content">
          <div className="logo">
            <img src={logoImg} alt="YojnaSetu Logo" style={{ height: '56px', width: 'auto', objectFit: 'contain', marginRight: '12px' }} />
            <div>
              YojnaSetu
              <span className="logo-sub">Your Guide to Government Schemes</span>
            </div>
          </div>
          
          <nav className="nav-links">
            <a href="#" className="active">Home</a>
            <a href="#schemes">Schemes</a>
            <a href="#how-it-works">How It Works</a>
            {userProfile && <a onClick={onOpenVault} style={{ cursor: 'pointer' }}>Documents Vault</a>}
          </nav>
          
          <div className="header-actions">
            {!userProfile ? (
              <button className="btn btn-primary" onClick={onLogin}>Log In / Sign Up</button>
            ) : (
              <button className="btn btn-outline" onClick={onLogout} style={{ color: '#dc2626', borderColor: '#fca5a5' }}>Logout</button>
            )}
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container hero-centered">
          <div className="hero-text">
            <h1>Find Government Schemes <span className="text-gradient">You Are Eligible For</span></h1>
            <p>Personalized scheme recommendations based on your profile in just a few seconds.</p>
            
            <div className="checkmarks">
              <div className="check-item"><Check className="check-icon" size={20}/> 100% Free</div>
              <div className="check-item"><Check className="check-icon" size={20}/> Official Information</div>
              <div className="check-item"><Check className="check-icon" size={20}/> Secure & Reliable</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container floating-form-wrapper">
        <div className="floating-form">
          <div className="form-header">
            <Sparkles size={20} color="#dc2626" /> Check Schemes For You
          </div>
          
          <form className="inline-form" onSubmit={handleSearchSubmit}>
            <div className="input-box">
              <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{width: '120px'}}>
                <option value="" disabled>Profession</option>
                <option value="student">Student</option>
                <option value="farmer">Farmer</option>
                <option value="health">Health</option>
                <option value="business">Business</option>
              </select>
            </div>
            <div className="input-box">
              <select required value={formData.caste} onChange={e => setFormData({...formData, caste: e.target.value})} style={{width: '100px'}}>
                <option value="" disabled>Caste</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>
            </div>
            <div className="input-box">
              <select required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} style={{width: '110px'}}>
                <option value="" disabled>State</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Haryana">Haryana</option>
                <option value="Punjab">Punjab</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
            <div className="input-box">
              <input type="number" required placeholder="Age" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} style={{width: '70px'}} />
            </div>
            <div className="input-box">
              <input type="number" required placeholder="Income" value={formData.income} onChange={e => setFormData({...formData, income: e.target.value})} style={{width: '100px'}} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
              Find My Schemes →
            </button>
          </form>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Choose YojnaSetu?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon icon-green"><Sparkles size={32} /></div>
              <h4>Personalized for You</h4>
              <p>Get schemes that exactly match your profile and eligibility.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon icon-blue"><MessageSquare size={32} /></div>
              <h4>AI-Powered Assistant</h4>
              <p>Understand schemes easily with our smart AI assistant.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon icon-purple"><FileText size={32} /></div>
              <h4>Complete Guidance</h4>
              <p>Get details on benefits, eligibility, documents & how to apply.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon icon-pink"><MapPin size={32} /></div>
              <h4>Nearest Offices</h4>
              <p>Find nearest government offices and support centers.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="schemes" className="section" style={{ background: 'var(--glass-bg)' }}>
        <div className="container">
          <div className="schemes-header">
            <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Top Recommendations</h2>
          </div>
          
          <div className="schemes-grid">
            {displaySchemes.map(scheme => {
              const tagClass = scheme.category === 'student' ? 'tag-student' : scheme.category === 'farmer' ? 'tag-farmer' : 'tag-women';
              const iconClass = scheme.category === 'student' ? 'icon-green' : scheme.category === 'farmer' ? 'icon-blue' : 'icon-purple';

              return (
                <div key={scheme.id} className="scheme-card">
                  <div className="card-top">
                    <div className={`card-icon ${iconClass}`}><scheme.icon size={24} /></div>
                    <div className={`tag ${tagClass}`}>{scheme.target}</div>
                  </div>
                  <h3 className="card-title">{scheme.title}</h3>
                  <p className="card-desc">{scheme.description}</p>
                  
                  {userProfile && (
                    <div style={{ background: '#fef2f2', padding: '0.75rem', borderRadius: '8px', fontSize: '0.85rem', color: '#dc2626', marginBottom: '1.5rem', borderLeft: '3px solid #dc2626' }}>
                      ⭐ <strong>Recommended:</strong> Profile Match
                    </div>
                  )}

                  <div className="card-bottom" style={{ display: 'block' }}>
                    <button className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }} onClick={() => onViewDetails(scheme)}>
                      View Details →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="timeline">
            <div className="timeline-step">
              <div className="step-icon-wrapper"><div className="step-number">1</div><div className="step-icon"><FileText size={28} /></div></div>
              <h4>Tell Us About You</h4>
              <p>Fill a quick form with basic information.</p>
            </div>
            <div className="timeline-step">
              <div className="step-icon-wrapper"><div className="step-number">2</div><div className="step-icon"><Search size={28} /></div></div>
              <h4>Get Matched Schemes</h4>
              <p>We find the best schemes you are eligible for.</p>
            </div>
            <div className="timeline-step">
              <div className="step-icon-wrapper"><div className="step-number">3</div><div className="step-icon"><Check size={28} /></div></div>
              <h4>Explore & Understand</h4>
              <p>Read details, benefits and documents required.</p>
            </div>
            <div className="timeline-step">
              <div className="step-icon-wrapper"><div className="step-number">4</div><div className="step-icon"><Send size={28} /></div></div>
              <h4>Apply with Confidence</h4>
              <p>Follow the application steps and apply easily.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ paddingBottom: '3rem' }}>
        <div className="ai-banner">
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <MessageSquare size={80} color="#dc2626" />
            <div className="ai-banner-text">
              <h3>Have Questions? <span className="text-gradient">Ask Our AI Assistant</span></h3>
              <p>Get instant answers about schemes, eligibility, documents and more.</p>
            </div>
          </div>
          <button className="btn btn-primary btn-large" onClick={onOpenChat}>
            <MessageSquare size={20} /> Chat with AI Assistant →
          </button>
        </div>
      </section>
      
      <footer className="footer">
        <div className="container">
          <div className="copyright">© 2026 YojnaSetu. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

// ==========================================
// VIEW 3: SCHEME DETAILS (Article Card + AI Modes)
// ==========================================
const SchemeDetailsView = ({ scheme, userState, onBack, onOpenChat, uploadedDocs = {}, saveDocument, removeDocument, onApplyOnline, onOpenOfflineGuide, onLogin, userProfile, startScanning }) => {
  const [aiExplanation, setAiExplanation] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [translatedData, setTranslatedData] = useState(null);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const translateText = async (text) => {
    try {
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(text)}`);
      const data = await res.json();
      return data[0].map(x => x[0]).join('');
    } catch (e) {
      return text;
    }
  };

  const translateArray = async (arr) => {
    return Promise.all(arr.map(text => translateText(text)));
  };

  const handleExplain = async (mode) => {
    setIsAiLoading(true);
    setAiExplanation(null);
    
    if (mode === 'simple') {
      setLanguage('en');
      setTimeout(() => {
        setAiExplanation(scheme.simpleExplanation || "This scheme provides financial assistance. Please refer to the benefits section for exact details.");
        setIsAiLoading(false);
      }, 1000);
    } else if (mode === 'kid') {
      setLanguage('en');
      setTimeout(() => {
        setAiExplanation(`Imagine this is a gift from the government! They give you support so you don't have to worry about your daily challenges. All you need to do is apply!`);
        setIsAiLoading(false);
      }, 1000);
    } else if (mode === 'hindi') {
      setLanguage('hi');
      const exp = await translateText(scheme.simpleExplanation || "This scheme provides financial assistance.");
      setAiExplanation(exp);
      
      if (!translatedData) {
        const hindiElig = await translateArray(scheme.details.eligibility);
        const hindiBen = await translateArray(scheme.details.benefits);
        const hindiTitle = await translateText(scheme.title);
        setTranslatedData({
          title: hindiTitle,
          eligibility: hindiElig,
          benefits: hindiBen
        });
      }
      setIsAiLoading(false);
    }
  };

  const currentEligibility = language === 'hi' && translatedData ? translatedData.eligibility : scheme.details.eligibility;
  const currentBenefits = language === 'hi' && translatedData ? translatedData.benefits : scheme.details.benefits;
  const title = language === 'hi' && translatedData ? translatedData.title : scheme.title;

  const handleApplyOnline = () => {
    if (!userProfile) {
      alert("Please Log In or Sign Up first to use YojnaSetu application co-pilot!");
      onLogin();
      return;
    }
    onApplyOnline();
  };

  return (
    <div className="details-view">
      {/* Document Modal */}
      {selectedDoc && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 9999, padding: '2rem'
        }} onClick={() => setSelectedDoc(null)}>
          <div style={{
            background: 'white', padding: '2.5rem', borderRadius: '24px',
            maxWidth: '500px', width: '100%', textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            position: 'relative', animation: 'modalSlide 0.3s ease-out'
          }} onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedDoc(null)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', border: 'none', background: '#f1f5f9', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={20} color="#64748b" />
            </button>
            <div style={{ width: '80px', height: '80px', background: '#fef2f2', color: '#ef4444', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <FileText size={40} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>{selectedDoc}</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Required verification document for this scheme.</p>
            
            {/* Upload Area / File Status */}
            {uploadedDocs[selectedDoc] ? (
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.5rem', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#059669', background: '#ecfdf5', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>✅ Saved in Vault</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{uploadedDocs[selectedDoc].date}</span>
                </div>
                <div style={{ fontWeight: 'bold', color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{uploadedDocs[selectedDoc].name}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>File Size: {uploadedDocs[selectedDoc].size}</div>
                
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <a href={uploadedDocs[selectedDoc].content} download={uploadedDocs[selectedDoc].name} className="btn btn-outline" style={{ flex: 1, textDecoration: 'none', fontSize: '0.85rem', padding: '0.5rem' }}>
                    Download File
                  </a>
                  <button className="btn btn-outline" style={{ flex: 1, color: '#ef4444', borderColor: '#fca5a5', fontSize: '0.85rem', padding: '0.5rem' }} onClick={() => removeDocument(selectedDoc)}>
                    Delete File
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="dropzone">
                  <FileText size={32} color="#cbd5e1" />
                  <p>Drag and drop your file here, or click to upload</p>
                  <label className="dropzone-label">
                    Browse File
                    <input type="file" style={{ display: 'none' }} accept=".pdf,image/*" onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          saveDocument(selectedDoc, {
                            name: file.name,
                            size: (file.size / 1024).toFixed(1) + " KB",
                            type: file.type,
                            date: new Date().toLocaleDateString(),
                            content: reader.result
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }} />
                  </label>
                </div>
                
                <button 
                  className="btn btn-outline" 
                  style={{ width: '100%' }}
                  onClick={() => {
                    setSelectedDoc(null);
                    startScanning(selectedDoc);
                  }}
                >
                  📷 Scan document with camera
                </button>
              </div>
            )}

            <button className="btn btn-primary" style={{ width: '100%', background: '#0f172a' }} onClick={() => setSelectedDoc(null)}>
              Close Window
            </button>
          </div>
        </div>
      )}

      <div className="details-container">
        
        {/* Navigation */}
        <div className="details-nav-header">
          <a onClick={onBack} style={{ color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
            <ChevronLeft size={20} /> Back to Search
          </a>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div style={{ padding: '0.4rem 0.8rem', background: '#fef2f2', color: '#ef4444', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>GOVT FUND</div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="details-hero">
          <div className="details-hero-text">
            <div className="details-category-tag" style={{ position: 'static', display: 'inline-block', marginBottom: '1rem' }}>{scheme.target}</div>
            <h1 className="details-title">{title}</h1>
            <div className="details-subtitle" style={{ marginBottom: '2rem' }}>{language === 'hi' ? 'वह योजना जो आपको सशक्त बनाती है।' : 'The scheme that empowers you.'}</div>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn" style={{ background: 'white', color: '#ef4444', border: '1px solid #ef4444' }} onClick={() => handleExplain('simple')} disabled={isAiLoading}>
                {isAiLoading ? 'Asking AI...' : <><Sparkles size={18} /> Explain Simply</>}
              </button>
              <button className="btn" style={{ background: '#f59e0b', color: 'white' }} onClick={() => handleExplain('kid')} disabled={isAiLoading}>
                Explain like I'm 10
              </button>
              <button className="btn" style={{ background: '#3b82f6', color: 'white' }} onClick={() => handleExplain('hindi')} disabled={isAiLoading}>
                Explain in Hindi
              </button>
            </div>
          </div>
          <div className="details-hero-image">
            <img src={successImg} alt="Illustration" />
          </div>
        </div>

        {aiExplanation && (
          <div className="ai-box">
            <h4 style={{ color: '#ef4444', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} /> {language === 'hi' ? 'AI सरल व्याख्या' : 'AI Simple Explanation'}
            </h4>
            <p style={{ color: '#1e293b', fontSize: '1.1rem', margin: 0 }}>"{aiExplanation}"</p>
          </div>
        )}

        {/* Quick Stats Bar */}
        <div className="details-quick-stats">
          <div className="stat-card">
            <div className="stat-icon"><Check size={20} /></div>
            <div>Full Eligibility <br/><span style={{fontSize: '0.75rem', color: '#64748b'}}>Verified Profile</span></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{background: '#e0f2fe', color: '#0284c7'}}><Zap size={20} /></div>
            <div>Quick Approval <br/><span style={{fontSize: '0.75rem', color: '#64748b'}}>Direct Transfer</span></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{background: '#fef3c7', color: '#d97706'}}><ShieldCheck size={20} /></div>
            <div>Safe & Secure <br/><span style={{fontSize: '0.75rem', color: '#64748b'}}>Govt Protected</span></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{background: '#f3e8ff', color: '#9333ea'}}><Briefcase size={20} /></div>
            <div>Career Support <br/><span style={{fontSize: '0.75rem', color: '#64748b'}}>Future Growth</span></div>
          </div>
        </div>

        {/* How It Works */}
        {scheme.details.apply && scheme.details.apply.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <h3 className="section-heading">How It Works</h3>
            <div className="timeline-horizontal">
              {scheme.details.apply.slice(0, 5).map((step, i) => (
                <div key={i} className="step-h">
                  <div className="step-h-icon">
                    {i === 0 ? <Search size={32} color="#3b82f6"/> : 
                     i === 1 ? <UserPlus size={32} color="#10b981"/> : 
                     i === 2 ? <FileEdit size={32} color="#f59e0b"/> : 
                     i === 3 ? <Clock size={32} color="#6366f1"/> : 
                     <CheckCircle size={32} color="#16a34a"/>}
                  </div>
                  <h5><span className="step-h-number">{i+1}</span> {i === 0 ? 'Eligibility' : i === 1 ? 'Register' : i === 2 ? 'Apply' : i === 3 ? 'Approval' : 'Complete'}</h5>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Benefits & Eligibility Split */}
        <div className="split-layout">
          <div className="benefit-box">
            <div className="box-header"><Check size={24} /> Key Benefits</div>
            <ul className="check-list">
              {currentBenefits.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <div className="box-footer-note">
              <Sparkles size={18} /> Empowering your future. Strengthening our community.
            </div>
          </div>
          <div className="eligibility-box">
            <div className="box-header"><Info size={24} /> Who Can Apply?</div>
            <ul className="check-list">
              {currentEligibility.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
            <div className="box-footer-note">
              <Info size={18} /> Ensure you have all documents ready before starting the process.
            </div>
          </div>
        </div>

        {/* Documents Required */}
        {scheme.details.documents && scheme.details.documents.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <h3 className="section-heading">Documents Required</h3>
            <div className="doc-grid">
              {scheme.details.documents.map((doc, i) => {
                const getDocIcon = (name) => {
                  const lower = name.toLowerCase();
                  if (lower.includes('aadhaar') || lower.includes('id') || lower.includes('card')) return <CreditCard size={32} />;
                  if (lower.includes('bank') || lower.includes('passbook')) return <Landmark size={32} />;
                  if (lower.includes('residence') || lower.includes('address') || lower.includes('shelter') || lower.includes('house')) return <Home size={32} />;
                  if (lower.includes('photo')) return <User size={32} />;
                  if (lower.includes('income') || lower.includes('salary') || lower.includes('caste')) return <FileText size={32} />;
                  return <FileText size={32} />;
                };
                
                const getShortName = (name) => {
                  const words = name.split(' ');
                  if (words.length <= 3) return name;
                  return words.slice(0, 3).join(' ') + '...';
                };
                
                const hasDoc = uploadedDocs[doc] && uploadedDocs[doc].content;

                return (
                  <div key={i} className="doc-card" onClick={() => setSelectedDoc(doc)} style={{ cursor: 'pointer', border: hasDoc ? '2px solid #10b981' : '1px solid #e2e8f0' }}>
                    {hasDoc ? (
                      <span className="vault-badge success">✅ Saved</span>
                    ) : (
                      <span className="vault-badge warning">⚠️ Upload</span>
                    )}
                    <div className="doc-icon" style={{ 
                      background: i % 4 === 0 ? '#eff6ff' : i % 4 === 1 ? '#ecfdf5' : i % 4 === 2 ? '#fff7ed' : '#f5f3ff', 
                      color: i % 4 === 0 ? '#3b82f6' : i % 4 === 1 ? '#10b981' : i % 4 === 2 ? '#f59e0b' : '#8b5cf6' 
                    }}>
                      {getDocIcon(doc)}
                    </div>
                    <h5>{getShortName(doc)}</h5>
                    <p style={{ marginTop: '0.5rem', fontWeight: 600, color: hasDoc ? '#059669' : '#64748b' }}>
                      {hasDoc ? 'Manage File' : 'Click to Upload'}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="details-tip-box">
              <Zap size={18} /> <strong>Tip:</strong> Keep all documents scanned and ready before applying to save time!
            </div>
          </div>
        )}

        {/* Action Footer */}
        <div className="action-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <img src={supportImg} alt="Assistant" className="action-character" style={{ mixBlendMode: 'multiply' }} />
            <div className="action-text">
              <h4>Need help for applying?</h4>
              <p>We're here to assist you!</p>
            </div>
          </div>
          <div className="action-card online" onClick={handleApplyOnline} style={{ cursor: 'pointer' }}>
            <div className="stat-icon" style={{ background: '#dcfce7', color: '#16a34a' }}><Sparkles size={24} /></div>
            <div>
              <div style={{ fontWeight: 'bold' }}>Apply Online Co-Pilot</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Use our smart autofill <br/>assistant to apply</div>
            </div>
          </div>
          <div className="action-card offline" onClick={() => onOpenOfflineGuide(scheme)} style={{ cursor: 'pointer' }}>
            <div className="stat-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}><MapPin size={24} /></div>
            <div>
              <div style={{ fontWeight: 'bold' }}>Offline Guide & CSCs</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Pre-fill offline forms & <br/>locate nearest kiosk</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// ==========================================
// VIEW 4: CHATBOT (Base44 Gradient)
// ==========================================
const getFallbackReply = (userText, prevMessages, userState) => {
  const lower = userText.toLowerCase().trim();
  
  // Conversational Intent Matches (supporting Hindi/English/Hinglish)
  const matchConversationalIntent = () => {
    // 1. How are you / Kya haal hai
    const howAreYou = [
      'how are you', 'how r u', 'how do you do', 'how have you been',
      'aap kaise', 'aap kese', 'tum kaise', 'tum kese', 'sab thik', 'sab badhiya', 'sab badiya',
      'kaise ho', 'kaise h', 'kese ho', 'kese h', 'kesa h', 'kesa hai', 'kaisa h', 'kaisa hai',
      'kya haal', 'kya chal', 'kya chal raha', 'kya chal rha'
    ];
    if (howAreYou.some(h => lower.includes(h))) {
      return "I am doing great, thank you for asking! I'm here to help you navigate and find government schemes easily. What kind of scheme are you looking for today?";
    }
    
    // 2. Who are you / Name
    const whoAreYou = [
      'who are you', 'who r u', 'your name', 'whats your name', 'what is your name',
      'naam kya h', 'naam kya hai', 'kaun ho', 'kon ho', 'apna naam'
    ];
    if (whoAreYou.some(w => lower.includes(w))) {
      return "I am the YojnaSetu Chatbot, your AI co-pilot for finding and applying to Indian government schemes. You can ask me details about scheme benefits, documents needed, or how to apply!";
    }
    
    // 3. Capabilities / Help
    const capabilities = [
      'what can you do', 'help me', 'features', 'kya kar sakte', 'kya kar skte', 'kya karte ho', 'tum kya krte',
      'kaise help', 'kya help', 'kaise madad', 'madad karo'
    ];
    if (capabilities.some(c => lower.includes(c)) || lower === 'help') {
      return "I can help you:\n1. Search for schemes by keyword (e.g., 'farmer subsidy', 'girl scholarship').\n2. Show required documents for any scheme.\n3. Guide you step-by-step on how to apply online or offline.\n\nJust tell me what you need!";
    }
    
    // 4. Thanks / Gratitude
    const thanks = ['thanks', 'thank you', 'dhanyawad', 'shukriya', 'thanku', 'ty', 'thnk u', 'thx'];
    if (thanks.some(t => lower.includes(t))) {
      return "You're very welcome! Let me know if you have any other questions. I'm here to help!";
    }
    
    // 5. Okay / Affirmative
    const okay = ['ok', 'okay', 'thik h', 'thik hai', 'acha', 'achha', 'cool', 'fine', 'great', 'badiya', 'badhiya'];
    if (okay.some(o => lower === o || lower.startsWith(o + ' ') || lower.endsWith(' ' + o))) {
      return "Awesome! Let me know if you want to search for any other schemes or have questions about eligibility.";
    }

    // 6. Greetings / Hi / Hello
    const greetings = [
      'hello', 'hi', 'hey', 'hye', 'hii', 'heyy', 'namaste', 'pranam', 'hola', 'yo',
      'whats up', 'sup', 'whatsup', 'ram ram', 'radhe radhe', 'jai shree krishna'
    ];
    if (greetings.some(g => lower.includes(g)) || lower === 'hi' || lower === 'hye') {
      return "Hello! I am YojnaSetu Chatbot. How can I help you find or apply for government schemes today? You can ask about schemes for farmers, students, women, business, health, or mention your state!";
    }

    return null;
  };

  const intentReply = matchConversationalIntent();
  if (intentReply) return intentReply;
  
  // Check if they want to apply online/offline based on previous context
  const lastBotMessage = prevMessages.length > 0 ? prevMessages.filter(m => m.isBot).pop()?.text : '';
  let currentScheme = "";
  const botMessages = [...prevMessages].filter(m => m.isBot).reverse();
  for (const msg of botMessages) {
    const match = msg.text.match(/"([^"]+)"/) || msg.text.match(/'([^']+)'/);
    if (match) {
      currentScheme = match[1];
      break;
    }
  }

  // Handle yes/show/details of current scheme
  if (lower.includes('yes') || lower.includes('show') || lower.includes('details') || lower.includes('document') || lower.includes('apply')) {
    if (currentScheme) {
      const found = schemesData.find(s => s.title.toLowerCase().includes(currentScheme.toLowerCase()) || currentScheme.toLowerCase().includes(s.title.toLowerCase()));
      if (found) {
        let docsText = "";
        if (found.details?.documents && found.details.documents.length > 0) {
          docsText = found.details.documents.map(d => `- ${d}`).join('\n');
        } else {
          docsText = "- Aadhaar Card\n- Resident Certificate\n- Income Certificate / Caste Certificate (if applicable)";
        }
        
        let benefitsText = "";
        if (found.details?.benefits && found.details.benefits.length > 0) {
          benefitsText = found.details.benefits.map(b => `- ${b}`).join('\n');
        } else {
          benefitsText = `- ${found.benefit || 'Financial assistance and support benefits'}`;
        }

        return `Here are the details for **${found.title}**:\n\n` +
               `**Benefits:**\n${benefitsText}\n\n` +
               `**Required Documents:**\n${docsText}\n\n` +
               `Would you like to apply **online** or **offline**? (Reply with online or offline)`;
      }
    }
  }

  if (currentScheme && (lower.includes('online') || lower.includes('offline') || lower.includes('how to'))) {
    const onlineLink = `https://www.google.com/search?q=Apply+online+for+${encodeURIComponent(currentScheme).replace(/%20/g, '+')}+official+website`;
    const stateQuery = userState ? ` in ${userState}` : '';
    const mapsLink = `https://www.google.com/maps/search/nearest+government+office+or+CSC+center${encodeURIComponent(stateQuery)}`;
    
    if (lower.includes('online')) {
      return `To apply online for **${currentScheme}**, you can proceed to the official department portal here: ${onlineLink}\n\nEnsure you have scanned copies of your Aadhaar Card, Income Certificate, and Bank Details ready for uploading!`;
    } else if (lower.includes('offline')) {
      return `To apply offline for **${currentScheme}**, you can download the application form from the official website and visit the nearest government kiosk or Common Service Center (CSC)${stateQuery}. Locate your nearest kiosk here: ${mapsLink}`;
    } else {
      return `For **${currentScheme}**, you can apply **online** via the official portal: ${onlineLink}\n\nOr apply **offline** by visiting the nearest Common Service Center (CSC): ${mapsLink}\n\nWhich mode do you prefer? (Type 'online' or 'offline')`;
    }
  }

  // Keywords extraction
  const stopWords = ['is', 'a', 'the', 'in', 'of', 'and', 'scheme', 'schemes', 'for', 'to', 'how', 'what', 'show', 'me', 'list', 'any', 'my', 'details', 'about', 'want', 'need', 'i', 'get'];
  const words = lower.split(/[\s,.\-!?]+/).filter(w => w.length > 2 && !stopWords.includes(w));
  
  if (words.length === 0) {
    return "Please tell me what kind of schemes you are looking for (e.g., student scholarships, farmer aids, business loans, health insurance) or mention your state.";
  }

  // Search schemesData for matching records
  const matches = [];
  for (const s of schemesData) {
    let score = 0;
    
    // Check fields
    const titleLower = (s.title || '').toLowerCase();
    const categoryLower = (s.category || '').toLowerCase();
    const targetLower = (s.target || '').toLowerCase();
    const explanationLower = (s.simpleExplanation || '').toLowerCase();
    const detailsText = JSON.stringify(s.details || {}).toLowerCase();
    
    for (const w of words) {
      if (titleLower.includes(w)) score += 10;
      if (categoryLower.includes(w)) score += 8;
      if (targetLower.includes(w)) score += 5;
      if (explanationLower.includes(w)) score += 3;
      if (detailsText.includes(w)) score += 2;
    }
    
    // State contextual boost - ONLY apply if keywords matched!
    if (score > 0) {
      if (userState && JSON.stringify(s).toLowerCase().includes(userState.toLowerCase())) {
        score += 5;
      }
      matches.push({ scheme: s, score });
    }
  }

  // Sort by score descending
  matches.sort((a, b) => b.score - a.score);

  if (matches.length > 0) {
    const topMatches = matches.slice(0, 3);
    let reply = `I found some matches in our database:\n\n`;
    
    topMatches.forEach((m, index) => {
      const s = m.scheme;
      reply += `${index + 1}. **"${s.title}"**\n`;
      reply += `   * **Benefit:** ${s.benefit || 'Financial/Welfare aid'}\n`;
      if (s.eligibility) {
        reply += `   * **Eligibility:** Min Age: ${s.eligibility.minAge || 18}, Max Age: ${s.eligibility.maxAge || 60}, Max Family Income: ₹${s.eligibility.maxIncome?.toLocaleString() || '5,000,000'}\n`;
      }
      reply += `\n`;
    });
    
    // Ask if they want details on the top match
    const firstSchemeTitle = topMatches[0].scheme.title;
    reply += `Would you like to know how to apply or see the required documents for **"${firstSchemeTitle}"**? (Reply with 'yes' or 'details')`;
    return reply;
  }

  // Generic fallback if no specific scheme matches
  return `I couldn't find any direct matches in our database for **"${userText}"**.\n\n` +
         `💡 **Tip:** Ask me about specific categories like farmer, student scholarship, business loan, or health. You can also paste a valid Gemini API Key from Google AI Studio in settings (⚙️ icon above) to chat about anything!`;
};

const ChatbotView = ({ onBack, initialQuery, userState, userProfile }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    const saved = localStorage.getItem('gemini_api_key');
    if (saved === null || saved === '') {
      localStorage.setItem('gemini_api_key', 'Gemini API Key 2');
      return 'Gemini API Key 2';
    }
    return saved;
  });
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = React.useRef(null);
  const initialSent = React.useRef(false);

  const [isListening, setIsListening] = useState(false);
  const [activeSpeechIndex, setActiveSpeechIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  React.useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const userProfileContext = userProfile ? `
User Demographics:
- Name: ${userProfile.firstName || ''} ${userProfile.lastName || ''}
- Age: ${userProfile.age || 'Not specified'} years
- Family Income: ₹${userProfile.income || 'Not specified'}
- Category/Occupation: ${userProfile.category || 'Not specified'}
- Caste: ${userProfile.caste || 'Not specified'}
- State: ${userProfile.state || userState || 'Not specified'}
` : `User State: ${userState || 'Not specified'}`;

  const systemInstructionText = `You are YojnaSetu Chatbot, an expert AI assistant dedicated to helping users find, understand, and apply for government schemes in India.
Be polite, helpful, and concise. Speak in Hindi, English, or Hinglish as preferred by the user.

${userProfileContext}

Guidance:
1. Recommend actual government schemes available in India. If the query aligns with our core categories (Farmers, Students, Small Businesses, Health, Housing), prioritize recommending standard schemes (e.g. PM-Kisan, PM MUDRA, Ayushman Bharat, Scholarships).
2. Answer all user questions contextually. Even if the user asks a general question (e.g. "who is the prime minister?"), answer it, and if possible, relate it back to how they can find benefits or schemes.
3. Use formatted responses: Use **bold** for key terms, make lists with hyphens (-), and format links directly.
4. If they ask about documents or applying, describe what is required (Aadhaar, income certificate, etc.) and guide them to apply online or offline.`;

  React.useEffect(() => {
    if (initialQuery && !initialSent.current) {
      initialSent.current = true;
      setChatStarted(true);
      setMessages([{ text: initialQuery, isBot: false }]);
      setIsTyping(true);

      const activeApiKey = (localStorage.getItem('gemini_api_key') || '').trim();

      if (activeApiKey && activeApiKey !== 'Gemini API Key 2') {
        fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${activeApiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: initialQuery }] }],
            systemInstruction: {
              parts: [{
                text: systemInstructionText
              }]
            }
          })
        })
        .then(async res => {
          if (!res.ok) {
            const errText = await res.text();
            throw new Error(`API call failed with status ${res.status}: ${errText}`);
          }
          return res.json();
        })
        .then(data => {
          const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
          setMessages(prev => [...prev, { text: botReply, isBot: true }]);
          setIsTyping(false);
        })
        .catch(err => {
          console.error(err);
          const fallbackReply = getFallbackReply(initialQuery, [], userState);
          setMessages(prev => [...prev, { text: fallbackReply, isBot: true }]);
          setIsTyping(false);
        });
      } else {
        // Fallback to rules-based reply
        setTimeout(() => {
          const botReply = getFallbackReply(initialQuery, [], userState);
          setMessages(prev => [...prev, { text: botReply, isBot: true }]);
          setIsTyping(false);
        }, 1500);
      }
    }
  }, [initialQuery, userState, systemInstructionText]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const userText = (typeof text === 'string' ? text : input);
    if (!userText.trim()) return;

    // Stop speaking on new input
    window.speechSynthesis.cancel();
    setActiveSpeechIndex(null);

    if (!chatStarted) setChatStarted(true);

    const updatedMessages = [...messages, { text: userText, isBot: false }];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    const activeApiKey = (localStorage.getItem('gemini_api_key') || apiKey || '').trim();

    if (activeApiKey && activeApiKey !== 'Gemini API Key 2') {
      const contents = messages.map(msg => ({
        role: msg.isBot ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));
      contents.push({
        role: 'user',
        parts: [{ text: userText }]
      });

      fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${activeApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: contents,
          systemInstruction: {
            parts: [{
              text: systemInstructionText
            }]
          }
        })
      })
      .then(async res => {
        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`API call failed with status ${res.status}: ${errText}`);
        }
        return res.json();
      })
      .then(data => {
        const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
        setMessages(prev => [...prev, { text: botReply, isBot: true }]);
        setIsTyping(false);
      })
      .catch(err => {
        console.error(err);
        const fallbackReply = getFallbackReply(userText, messages, userState);
        setMessages(prev => [...prev, { text: fallbackReply, isBot: true }]);
        setIsTyping(false);
      });
    } else {
      setTimeout(() => {
        const botReply = getFallbackReply(userText, messages, userState);
        setMessages(prev => [...prev, { text: botReply, isBot: true }]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, Safari, or Firefox.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    
    recognition.onstart = () => {
      setIsListening(true);
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };
    
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };

  const speakMessage = (text, index) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      if (activeSpeechIndex === index) {
        setActiveSpeechIndex(null);
        return;
      }
    }
    
    const cleanText = text
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/https?:\/\/[^\s]+/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*#_\-\[\]()]/g, '');
      
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    if (/[अ-ज्ञ]/.test(text)) {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-IN';
    }
    
    utterance.onstart = () => {
      setActiveSpeechIndex(index);
    };
    
    utterance.onend = () => {
      setActiveSpeechIndex(null);
    };
    
    utterance.onerror = () => {
      setActiveSpeechIndex(null);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
      });
  };

  const renderMessageText = (text) => {
    if (!text) return "";
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const boldParts = line.split(/(\*\*[^*]+\*\*)/g);
      const parsedLine = boldParts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const boldText = part.slice(2, -2);
          return <strong key={partIdx}>{boldText}</strong>;
        }
        
        const urlParts = part.split(urlRegex);
        return urlParts.map((urlPart, urlPartIdx) => {
          if (urlPart.match(urlRegex)) {
            return (
              <a 
                key={`${urlPartIdx}`} 
                href={urlPart} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: 'inherit', textDecoration: 'underline', fontWeight: 'bold' }}
              >
                {urlPart}
              </a>
            );
          }
          return urlPart;
        });
      });

      return (
        <div key={lineIdx} style={{ minHeight: '1.2em', margin: '0.2rem 0' }}>
          {parsedLine}
        </div>
      );
    });
  };

  return (
    <div className="chat-view">
      <header className="chat-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="chat-logo" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={onBack}>
          <img src={logoImg} alt="YojnaSetu Logo" style={{ height: '36px', width: 'auto', objectFit: 'contain', marginRight: '12px' }} /> YojnaSetu
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.25rem', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Settings"
          >
            ⚙️
          </button>
          <button className="btn" style={{ background: 'rgba(255,255,255,0.5)', color: '#1e293b' }} onClick={onBack}>
            Exit Chat
          </button>
        </div>
      </header>

      {showSettings && (
        <div style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '1.25rem 1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', zIndex: 10 }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#334155' }}>Configure Gemini AI API Key (To talk like a real human)</span>
              <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: '#2563eb', textDecoration: 'underline', fontWeight: 'bold' }}>
                Get Free API Key ↗
              </a>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="password"
                value={apiKey}
                onChange={(e) => {
                  const trimmedVal = e.target.value.trim();
                  setApiKey(trimmedVal);
                  localStorage.setItem('gemini_api_key', trimmedVal);
                }}
                placeholder="Paste your Gemini API Key (e.g. AIzaSy...)"
                style={{ flex: 1, border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.5rem 0.75rem', fontSize: '0.85rem', outline: 'none' }}
              />
              <button 
                onClick={() => setShowSettings(false)}
                style={{ background: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem 1.25rem', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Save
              </button>
            </div>
            <p style={{ fontSize: '0.7rem', color: '#64748b', margin: 0 }}>
              💡 **Note:** Once you paste a valid Gemini key, the chatbot will be powered by Google Gemini AI, allowing it to hold a fluid conversation and talk like a real human!
            </p>
          </div>
        </div>
      )}

      {!chatStarted ? (
        <div className="chat-container">
          <h1 className="chat-heading">
            Let's find your scheme.<br/>
            <span className="chat-heading-highlight">Right now.</span>
          </h1>
          
          <p style={{ fontSize: '1.25rem', color: '#475569', margin: '0 auto 2rem auto', maxWidth: '600px' }}>
            YojnaSetu lets you find fully-funded government schemes in minutes with just your words.<br/>
            No complex jargon necessary.
          </p>

          <div className="chat-input-wrapper" style={{ margin: '0 auto', width: '100%' }}>
            <form style={{ position: 'relative' }} onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
              <input 
                type="text" 
                className="chat-input" 
                placeholder="What are you looking for?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ paddingRight: '7rem' }}
              />
              <div style={{ position: 'absolute', right: '1rem', bottom: '1.25rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button 
                  type="button"
                  onClick={startListening}
                  className={`chat-mic-btn ${isListening ? 'listening' : ''}`}
                  style={{
                    background: isListening ? '#ef4444' : 'rgba(0, 0, 0, 0.05)',
                    color: isListening ? 'white' : '#64748b',
                    border: 'none',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontSize: '1.2rem'
                  }}
                  title="Speak to type"
                >
                  {isListening ? '🎙️' : '🎤'}
                </button>
                <button type="submit" style={{ 
                  width: '38px', 
                  height: '38px', 
                  background: '#dc2626', 
                  color: 'white', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  border: 'none', 
                  cursor: 'pointer' 
                }}>
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
            
            <div className="chat-suggestions-title" style={{ marginTop: '2rem' }}>Not sure where to start? Try one of these:</div>
            <div className="chat-suggestions" style={{ justifyContent: 'center' }}>
              <div className="chat-pill" onClick={() => handleSend("Schemes for Farmers")}>Schemes for Farmers</div>
              <div className="chat-pill" onClick={() => handleSend("Education Scholarships")}>Education Scholarships</div>
              <div className="chat-pill" onClick={() => handleSend("Small Business Loans")}>Small Business Loans</div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '800px', margin: '0 auto', width: '100%', padding: '0 1rem' }}>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            


            <div style={{ 
              alignSelf: 'flex-start',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              maxWidth: '85%',
              gap: '0.3rem'
            }}>
              <div style={{ 
                background: 'white', 
                color: '#0f172a',
                padding: '1rem 1.5rem', 
                borderRadius: '20px', 
                borderBottomLeftRadius: '4px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                lineHeight: '1.5',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                width: '100%'
              }}>
                Hi! I am YojnaSetu. I can help you find government schemes in simple words. What are you looking for today?
              </div>
            </div>

            {messages.map((msg, idx) => (
              <div key={idx} style={{ 
                alignSelf: msg.isBot ? 'flex-start' : 'flex-end', 
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.isBot ? 'flex-start' : 'flex-end',
                maxWidth: '85%',
                width: 'fit-content',
                gap: '0.3rem'
              }}>
                <div style={{ 
                  background: msg.isBot ? 'white' : '#dc2626', 
                  color: msg.isBot ? '#0f172a' : 'white',
                  padding: '1rem 1.5rem', 
                  borderRadius: '20px', 
                  borderBottomLeftRadius: msg.isBot ? '4px' : '20px',
                  borderBottomRightRadius: !msg.isBot ? '4px' : '20px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  lineHeight: '1.5',
                  wordBreak: 'break-word',
                  whiteSpace: 'pre-wrap',
                  width: '100%'
                }}>
                  {renderMessageText(msg.text)}
                </div>
                {msg.isBot && (
                  <div style={{ display: 'flex', gap: '0.75rem', marginLeft: '0.5rem', marginTop: '0.1rem' }}>
                    <button 
                      onClick={() => speakMessage(msg.text, idx)}
                      style={{ 
                        background: 'rgba(255,255,255,0.4)', 
                        border: '1px solid rgba(0,0,0,0.05)', 
                        cursor: 'pointer', 
                        fontSize: '0.8rem', 
                        color: '#475569', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.25rem', 
                        padding: '0.2rem 0.5rem', 
                        borderRadius: '6px',
                        transition: 'all 0.2s'
                      }}
                      title="Listen to response"
                      className="msg-action-btn"
                    >
                      {activeSpeechIndex === idx ? '🔇 Stop' : '🔊 Listen'}
                    </button>
                    <button 
                      onClick={() => copyToClipboard(msg.text, idx)}
                      style={{ 
                        background: 'rgba(255,255,255,0.4)', 
                        border: '1px solid rgba(0,0,0,0.05)', 
                        cursor: 'pointer', 
                        fontSize: '0.8rem', 
                        color: '#475569', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.25rem', 
                        padding: '0.2rem 0.5rem', 
                        borderRadius: '6px',
                        transition: 'all 0.2s'
                      }}
                      title="Copy response"
                      className="msg-action-btn"
                    >
                      {copiedIndex === idx ? '✅ Copied' : '📋 Copy'}
                    </button>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div style={{ alignSelf: 'flex-start', background: 'white', padding: '1rem 1.5rem', borderRadius: '20px', borderBottomLeftRadius: '4px', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="typing-dot"></span><span className="typing-dot"></span><span className="typing-dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '1.5rem 0' }}>
            <form className="chat-input-wrapper" style={{ margin: 0, padding: '1rem' }} onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input 
                  type="text" 
                  className="chat-input" 
                  style={{ margin: 0, fontSize: '1.1rem', paddingRight: '7rem' }}
                  placeholder="Type your message here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <button 
                    type="button"
                    onClick={startListening}
                    className={`chat-mic-btn ${isListening ? 'listening' : ''}`}
                    style={{
                      background: isListening ? '#ef4444' : 'rgba(0, 0, 0, 0.05)',
                      color: isListening ? 'white' : '#64748b',
                      border: 'none',
                      borderRadius: '50%',
                      width: '38px',
                      height: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      fontSize: '1.2rem'
                    }}
                    title="Speak to type"
                  >
                    {isListening ? '🎙️' : '🎤'}
                  </button>
                  <button type="submit" style={{ 
                    width: '38px', 
                    height: '38px', 
                    background: '#dc2626', 
                    color: 'white', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    border: 'none', 
                    cursor: 'pointer' 
                  }}>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </form>
          </div>
          
        </div>
      )}
    </div>
  );
};

// ==========================================
// VIEW 2.5: SEARCH RESULTS
// ==========================================
const SearchResultsView = ({ searchParams, onViewDetails, onOpenChat, onLogout, onBack, onOpenVault, userProfile }) => {
  const age = parseInt(searchParams.age) || 0;
  const income = parseInt(searchParams.income) || 0;
  
  let filteredSchemes = schemesData.filter(s => {
    const matchAge = age >= s.eligibility.minAge && age <= s.eligibility.maxAge;
    const matchIncome = income <= s.eligibility.maxIncome;
    const matchCategory = searchParams.category ? s.category === searchParams.category : true;
    
    // Caste Filtering Logic
    const userCaste = searchParams.caste || '';
    let matchCaste = true;
    if (userCaste) {
      const text = (s.title + " " + s.description).toLowerCase();
      const isSCSTScheme = text.includes(' sc ') || text.includes(' st ') || text.includes('scheduled caste') || text.includes('tribal') || text.includes('dalit');
      const isMinorityScheme = text.includes('minority') || text.includes('obc') || text.includes('backward class');
      
      if (userCaste === 'General') {
        if (isSCSTScheme || isMinorityScheme) matchCaste = false;
      } else if (userCaste === 'OBC') {
        if (isSCSTScheme) matchCaste = false;
      }
    }

    const userState = searchParams.state || '';
    let matchState = true;
    if (userState) {
      const schemeText = JSON.stringify(s).toLowerCase();
      const allStates = ['andhra pradesh', 'arunachal pradesh', 'assam', 'bihar', 'chhattisgarh', 'goa', 'gujarat', 'haryana', 'himachal pradesh', 'jharkhand', 'karnataka', 'kerala', 'madhya pradesh', 'maharashtra', 'manipur', 'meghalaya', 'mizoram', 'nagaland', 'odisha', 'punjab', 'rajasthan', 'sikkim', 'tamil nadu', 'telangana', 'tripura', 'uttar pradesh', 'uttarakhand', 'west bengal', 'puducherry', 'delhi', 'chandigarh'];
      const mentionsAnyState = allStates.some(st => schemeText.includes(st));
      matchState = !mentionsAnyState || schemeText.includes(userState.toLowerCase());
    }
    
    return matchAge && matchIncome && matchCategory && matchCaste && matchState;
  });

  const getBanner = (scheme) => {
    const cat = (scheme.category || '').toLowerCase();
    const target = (scheme.target || '').toLowerCase();
    if (cat === 'farmer' || target.includes('agri') || target.includes('farmer') || target.includes('rural')) return farmerBanner;
    if (cat === 'student' || target.includes('educ') || target.includes('learn') || target.includes('school')) return studentBanner;
    if (cat === 'business' || target.includes('busin') || target.includes('entrep') || target.includes('industry')) return businessBanner;
    if (cat === 'health' || target.includes('health') || target.includes('well') || target.includes('medical')) return healthBanner;
    return studentBanner; // Fallback
  };

  return (
    <div className="search-view">
      <header className="home-header">
        <div className="container header-content">
          <div className="logo" onClick={onBack} style={{ cursor: 'pointer' }}>
            <img src={logoImg} alt="YojnaSetu Logo" style={{ height: '56px', width: 'auto', objectFit: 'contain', marginRight: '12px' }} />
            <div>
              YojnaSetu
              <span className="logo-sub">Your Guide to Government Schemes</span>
            </div>
          </div>
          <nav className="nav-links">
            <a onClick={onBack} style={{ cursor: 'pointer' }}>Home</a>
            <a href="#" className="active">Results</a>
            {userProfile && <a onClick={onOpenVault} style={{ cursor: 'pointer' }}>Documents Vault</a>}
          </nav>
          
          <div className="header-actions">
            <button className="btn btn-outline" onClick={onLogout} style={{ color: '#dc2626', borderColor: '#fca5a5' }}>Logout</button>
          </div>
        </div>
      </header>

      <section className="section" style={{ background: 'var(--glass-bg)', minHeight: '80vh', paddingTop: '8rem' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div className="schemes-header">
            <div>
              <a onClick={onBack} style={{ color: '#64748b', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', textDecoration: 'none', fontWeight: 600 }}>
                <ChevronLeft size={16}/> Back to Search
              </a>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Top Recommendations For You</h2>
              <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Found {filteredSchemes.length} schemes for Category: {searchParams.category}, Age: {searchParams.age}, Income: ₹{searchParams.income}</p>
            </div>
          </div>
          
          <div className="recommendation-grid">
            {filteredSchemes.length > 0 ? filteredSchemes.map(scheme => {
              const bannerImg = getBanner(scheme);
              
              return (
                <div key={scheme.id} className="recommendation-card">
                  <div className="rec-content">
                    <div className={`rec-tag ${scheme.category}`}>{scheme.target.split(',')[0]}</div>
                    <h3 className="rec-title">{scheme.title}</h3>
                    <div className="rec-actions">
                      <button className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontWeight: 700, fontSize: '1.1rem', width: '100%' }} onClick={() => onViewDetails(scheme)}>
                        View Details & AI Guide
                      </button>
                    </div>
                  </div>
                  <div className="rec-illustration">
                    <div className="rec-badge"><scheme.icon size={28} /></div>
                    <img src={bannerImg} alt="Category Banner" />
                  </div>
                </div>
              );
            }) : (
              <div style={{ textAlign: 'center', padding: '4rem', width: '100%', background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <Search size={64} color="#94a3b8" style={{ margin: '0 auto 1.5rem auto', opacity: 0.5 }} />
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>No schemes found</h3>
                <p style={{ color: '#64748b' }}>Try adjusting your search criteria to find more schemes.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="copyright">© 2026 YojnaSetu. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

// ==========================================
// DOCUMENTS VAULT VIEW
// ==========================================
const DocumentsVaultView = ({ uploadedDocs, saveDocument, removeDocument, onBack, onLogout, userProfile }) => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [customDocName, setCustomDocName] = useState('');
  const [scanProgress, setScanProgress] = useState(0);

  const standardDocs = [
    { name: "Aadhaar Card", desc: "Proof of Identity and Address issued by UIDAI" },
    { name: "PAN Card", desc: "Permanent Account Number for financial operations" },
    { name: "Caste Certificate", desc: "Required for Category based benefits (SC/ST/OBC)" },
    { name: "Income Certificate", desc: "Verification of annual household income" },
    { name: "Domicile Certificate", desc: "Proof of residence in your state" },
    { name: "Bank Passbook", desc: "Copy of front page showing account details for DBT" },
    { name: "Passport Size Photo", desc: "Recent passport photo (JPG/PNG)" }
  ];

  const uploadedNames = Object.keys(uploadedDocs);
  const standardUploadedCount = standardDocs.filter(d => uploadedNames.includes(d.name)).length;
  const progressPercent = Math.round((standardUploadedCount / standardDocs.length) * 100);

  const handleFileUpload = (name, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      saveDocument(name, {
        name: file.name,
        size: (file.size / 1024).toFixed(1) + " KB",
        type: file.type,
        date: new Date().toLocaleDateString(),
        content: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const startScanning = (name) => {
    setSelectedDoc(name);
    setIsScanning(true);
    setScanProgress(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsScanning(false);
          saveDocument(name, {
            name: `${name.replace(/\s+/g, '_')}_Scanned.pdf`,
            size: "420.5 KB",
            type: "application/pdf",
            date: new Date().toLocaleDateString(),
            content: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          });
          setSelectedDoc(null);
        }, 500);
      }
    }, 200);
  };

  const handleAddCustomDoc = (e) => {
    e.preventDefault();
    if (!customDocName.trim()) return;
    saveDocument(customDocName.trim(), {
      name: "Pending Upload",
      size: "0 KB",
      type: "unknown",
      date: new Date().toLocaleDateString(),
      content: null
    });
    setCustomDocName('');
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
      <header className="home-header">
        <div className="container header-content">
          <div className="logo" onClick={onBack} style={{ cursor: 'pointer' }}>
            <img src={logoImg} alt="YojnaSetu Logo" style={{ height: '56px', width: 'auto', objectFit: 'contain', marginRight: '12px' }} />
            <div>
              YojnaSetu
              <span className="logo-sub">Your Guide to Government Schemes</span>
            </div>
          </div>
          <nav className="nav-links">
            <a onClick={onBack} style={{ cursor: 'pointer' }}>Home</a>
            <a href="#" className="active">Documents Vault</a>
          </nav>
          <div className="header-actions">
            <button className="btn btn-outline" onClick={onLogout} style={{ color: '#dc2626', borderColor: '#fca5a5' }}>Logout</button>
          </div>
        </div>
      </header>

      {isScanning && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 99999
        }}>
          <div style={{ background: 'white', padding: '2.5rem', borderRadius: '24px', maxWidth: '450px', width: '100%', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Scanning {selectedDoc}</h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Align your document with the camera guide below...</p>
            <div className="camera-scan-container">
              <div className="camera-guideline"></div>
              <div className="scan-laser"></div>
              <div style={{ position: 'absolute', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', bottom: '1rem' }}>Camera Active</div>
            </div>
            <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem' }}>
              <div style={{ height: '100%', background: '#dc2626', width: `${scanProgress}%`, transition: 'width 0.2s' }}></div>
            </div>
            <div style={{ fontWeight: 'bold', color: '#dc2626' }}>{scanProgress}% Completed</div>
          </div>
        </div>
      )}

      <div className="vault-container">
        <a onClick={onBack} style={{ color: '#64748b', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontWeight: 600 }}>
          <ChevronLeft size={16}/> Back
        </a>

        <div className="vault-progress-card">
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>Your Secure Document Vault</h2>
          <p style={{ opacity: 0.85, fontSize: '0.95rem' }}>Keep your documents ready here. They will be auto-matched to eligible government schemes and can be copied or filled in one-click.</p>
          <div className="vault-progress-bar-container">
            <div className="vault-progress-bar" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 600 }}>
            <span>Standard Documents Completeness</span>
            <span>{progressPercent}% ({standardUploadedCount}/{standardDocs.length})</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Standard Verification Documents</h2>
        </div>

        <div className="vault-grid">
          {standardDocs.map((doc, idx) => {
            const uploaded = uploadedDocs[doc.name];
            return (
              <div key={idx} className="vault-card">
                {uploaded && uploaded.content ? (
                  <span className="vault-badge success">✅ Saved</span>
                ) : (
                  <span className="vault-badge warning">⚠️ Missing</span>
                )}
                <div className="vault-card-icon" style={{ 
                  background: idx % 4 === 0 ? '#eff6ff' : idx % 4 === 1 ? '#ecfdf5' : idx % 4 === 2 ? '#fff7ed' : '#f5f3ff', 
                  color: idx % 4 === 0 ? '#3b82f6' : idx % 4 === 1 ? '#10b981' : idx % 4 === 2 ? '#f59e0b' : '#8b5cf6' 
                }}>
                  {doc.name.includes('Aadhaar') || doc.name.includes('PAN') ? <CreditCard size={28} /> : 
                   doc.name.includes('Bank') ? <Landmark size={28} /> :
                   doc.name.includes('Caste') || doc.name.includes('Income') ? <FileText size={28} /> :
                   doc.name.includes('Photo') ? <User size={28} /> : <Home size={28} />}
                </div>
                <h3>{doc.name}</h3>
                <p>{doc.desc}</p>
                {uploaded && uploaded.content ? (
                  <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.8rem', border: '1px solid #e2e8f0', width: '100%' }}>
                    <div style={{ fontWeight: 'bold', color: '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{uploaded.name}</div>
                    <div style={{ color: '#64748b', marginTop: '0.2rem' }}>Size: {uploaded.size} | Date: {uploaded.date}</div>
                  </div>
                ) : null}

                <div className="vault-card-actions">
                  {uploaded && uploaded.content ? (
                    <>
                      <a href={uploaded.content} download={uploaded.name} className="btn btn-outline" style={{ flex: 1, textDecoration: 'none', padding: '0.5rem', fontSize: '0.8rem' }}>
                        Download
                      </a>
                      <button className="btn btn-outline" style={{ color: '#ef4444', borderColor: '#fca5a5' }} onClick={() => removeDocument(doc.name)}>
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <label className="btn btn-primary" style={{ flex: 1, margin: 0, padding: '0.5rem', fontSize: '0.8rem' }}>
                        Upload
                        <input type="file" style={{ display: 'none' }} accept=".pdf,image/*" onChange={(e) => handleFileUpload(doc.name, e)} />
                      </label>
                      <button className="btn btn-outline" onClick={() => startScanning(doc.name)}>
                        Scan
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Add Custom Document</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>If a scheme requires any specialized document (e.g. Disability Certificate, Land Records, etc.), you can add it here.</p>
          <form onSubmit={handleAddCustomDoc} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <input 
              type="text" 
              className="auth-input" 
              style={{ flex: 1, minWidth: '250px', margin: 0 }}
              placeholder="e.g. Disability Certificate, Land Registry, etc."
              value={customDocName}
              onChange={(e) => setCustomDocName(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ background: '#0f172a' }}>Add Custom Type</button>
          </form>

          {Object.keys(uploadedDocs).filter(k => !standardDocs.map(d => d.name).includes(k)).length > 0 && (
            <div style={{ marginTop: '2rem' }} className="vault-grid">
              {Object.keys(uploadedDocs).filter(k => !standardDocs.map(d => d.name).includes(k)).map((name, idx) => {
                const uploaded = uploadedDocs[name];
                return (
                  <div key={idx} className="vault-card" style={{ borderStyle: 'dashed' }}>
                    <span className="vault-badge success">✅ Custom Doc</span>
                    <div className="vault-card-icon" style={{ background: '#f5f3ff', color: '#8b5cf6' }}>
                      <FileText size={28} />
                    </div>
                    <h3>{name}</h3>
                    {uploaded && uploaded.content ? (
                      <div style={{ background: '#f8fafc', padding: '0.8rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.8rem', border: '1px solid #e2e8f0', width: '100%' }}>
                        <div style={{ fontWeight: 'bold', color: '#334155' }}>{uploaded.name}</div>
                        <div style={{ color: '#64748b', marginTop: '0.2rem' }}>Size: {uploaded.size} | Date: {uploaded.date}</div>
                      </div>
                    ) : (
                      <p>Custom document placeholder. Upload file to save.</p>
                    )}
                    <div className="vault-card-actions">
                      {uploaded && uploaded.content ? (
                        <>
                          <a href={uploaded.content} download={uploaded.name} className="btn btn-outline" style={{ flex: 1, textDecoration: 'none', padding: '0.5rem', fontSize: '0.8rem' }}>
                            Download
                          </a>
                          <button className="btn btn-outline" style={{ color: '#ef4444', borderColor: '#fca5a5' }} onClick={() => removeDocument(name)}>
                            Delete
                          </button>
                        </>
                      ) : (
                        <>
                          <label className="btn btn-primary" style={{ flex: 1, margin: 0, padding: '0.5rem', fontSize: '0.8rem' }}>
                            Upload
                            <input type="file" style={{ display: 'none' }} accept=".pdf,image/*" onChange={(e) => handleFileUpload(name, e)} />
                          </label>
                          <button className="btn btn-outline" style={{ color: '#ef4444', borderColor: '#fca5a5' }} onClick={() => removeDocument(name)}>
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// APPLICATION CO-PILOT ASSISTANT
// ==========================================
const CoPilotPanel = ({ scheme, userProfile, uploadedDocs, saveDocument, removeDocument, onBack }) => {
  const [extPopupVisible, setExtPopupVisible] = useState(false);
  const [autofillStep, setAutofillStep] = useState(0); 
  const [extActive, setExtActive] = useState(false);
  const [appReference, setAppReference] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isCopied, setIsCopied] = useState({});
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStep, setSyncStep] = useState(0);
  const [syncProgress, setSyncProgress] = useState(0);

  const handleRedirectAndApply = () => {
    setIsSyncing(true);
    setSyncStep(0);
    setSyncProgress(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setSyncProgress(progress);
      
      if (progress >= 25 && progress < 50) setSyncStep(1);
      if (progress >= 50 && progress < 75) setSyncStep(2);
      if (progress >= 75) setSyncStep(3);

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsSyncing(false);
          const portalUrl = `https://www.google.com/search?q=Official+website+to+Apply+online+for+${encodeURIComponent(scheme.title)}`;
          window.open(portalUrl, '_blank');
        }, 500);
      }
    }, 50);
  };

  const triggerCopy = (label, value) => {
    navigator.clipboard.writeText(value);
    setIsCopied(prev => ({ ...prev, [label]: true }));
    setTimeout(() => {
      setIsCopied(prev => ({ ...prev, [label]: false }));
    }, 2000);
  };

  const startAutofillSimulation = () => {
    if (autofillStep > 0) return;
    setExtActive(true);
    setExtPopupVisible(false);
    setAutofillStep(1);
    
    setTimeout(() => {
      setAutofillStep(2); 
      setTimeout(() => {
        setAutofillStep(3); 
        setTimeout(() => {
          setAutofillStep(4); 
          setTimeout(() => {
            setAutofillStep(5); 
            // Automatically launch sync and redirect overlay after 0.8s
            setTimeout(() => {
              handleRedirectAndApply();
            }, 800);
          }, 300);
        }, 300);
      }, 300);
    }, 300);
  };

  const handleSaveStatus = (e) => {
    e.preventDefault();
    if (!appReference.trim()) return;
    setStatusMessage("Application tracked successfully! Status: Under Verification.");
  };

  const getDocNameShort = (fullName) => {
    const matched = Object.keys(uploadedDocs).find(k => k.toLowerCase() === fullName.toLowerCase());
    if (matched && uploadedDocs[matched]) {
      return uploadedDocs[matched].name;
    }
    return `Simulated_${fullName.replace(/\s+/g, '_')}.pdf`;
  };

  return (
    <div className="copilot-layout">
      {isSyncing && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 99999, color: 'white'
        }}>
          <div style={{
            background: '#1e293b', border: '1px solid #334155', padding: '3rem',
            borderRadius: '24px', maxWidth: '500px', width: '90%', textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            position: 'relative'
          }}>
            <div className="laser-sync-container" style={{ margin: '0 auto 2rem', width: '100px', height: '100px', background: 'rgba(59, 130, 246, 0.1)', border: '2px dashed #3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <Sparkles size={48} className="sync-icon-spin" color="#3b82f6" />
              <div className="sync-laser-beam"></div>
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem', color: '#f8fafc' }}>
              Personal Co-Pilot Syncing...
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Transferring your local profile & Vault certificates to the official portal
            </p>

            <div style={{ height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <div style={{ height: '100%', background: '#3b82f6', width: `${syncProgress}%`, transition: 'width 0.1s linear' }}></div>
            </div>

            <div style={{ minHeight: '40px', background: '#0f172a', padding: '0.8rem', borderRadius: '8px', border: '1px solid #334155', fontSize: '0.85rem', color: '#38bdf8', fontFamily: 'monospace' }}>
              {syncStep === 0 && `⌛ [1/4] Scanning Vault: Aadhaar, Certificates...`}
              {syncStep === 1 && `📋 [2/4] Formatting profile: ${userProfile?.firstName || 'Priyanshi'} ${userProfile?.lastName || 'Sharma'}...`}
              {syncStep === 2 && "📡 [3/4] Injected Script: YojnaSetu extension handshake..."}
              {syncStep === 3 && "🚀 [4/4] Connection Ready! Redirecting..."}
            </div>

            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '1.5rem' }}>
              Secure client-side sandbox. No files are uploaded to third-party servers.
            </div>
          </div>
        </div>
      )}
      <div className="copilot-main">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <a onClick={onBack} style={{ color: '#64748b', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
            <ChevronLeft size={16}/> Exit Co-Pilot Apply
          </a>
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Official Applying Guide for {scheme.title}</h2>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem' }}>
          This simulator shows how our Chrome Extension will work when you visit the official government website. Click the extension badge to auto-fill!
        </p>

        <div className="extension-simulator">
          <div className="sim-browser-bar">
            <div className="sim-dots">
              <div className="sim-dot red"></div>
              <div className="sim-dot yellow"></div>
              <div className="sim-dot green"></div>
            </div>
            <div className="sim-address">
              <ShieldCheck size={14} color="#10b981" style={{ flexShrink: 0 }} /> 
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                https://india.gov.in/apply/{scheme.id || 'scheme-portal'}
              </span>
            </div>
            
            <div 
              className={`sim-extension-badge ${autofillStep === 0 ? 'pulse' : ''}`} 
              onClick={() => setExtPopupVisible(!extPopupVisible)}
              title="YojnaSetu Autofill Extension"
              style={{ position: 'relative' }}
            >
              YS
              
              {extPopupVisible && (
                <div className="sim-extension-popup" onClick={e => e.stopPropagation()}>
                  <h4 style={{ color: '#0f172a', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Sparkles size={16} color="#dc2626" /> YojnaSetu Filler
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '1rem' }}>We detected 5 autofillable fields matching your YojnaSetu Vault!</p>
                  
                  <button 
                    className="btn btn-primary" 
                    style={{ width: '100%', fontSize: '0.85rem', padding: '0.5rem 1rem' }} 
                    onClick={startAutofillSimulation}
                    disabled={autofillStep > 0}
                  >
                    🚀 Auto-fill Application
                  </button>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', textAlign: 'center', marginTop: '0.5rem' }}>Secured by local encryption</div>
                </div>
              )}
            </div>
          </div>

          <div className="sim-page-content">
            {autofillStep > 0 && autofillStep < 5 && (
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#dbeafe', border: '1px solid #bfdbfe', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#1e40af', fontWeight: 'bold' }}>
                <Clock size={12} className="typing-dot" /> Auto-filling fields...
              </div>
            )}
            
            {autofillStep === 5 && (
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#d1fae5', border: '1px solid #a7f3d0', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#065f46', fontWeight: 'bold' }}>
                <Check size={12} /> Autofill Complete!
              </div>
            )}

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: '#334155' }}>
              National Portal of India - Scheme Application
            </h3>

            <div className="copilot-grid-2">
              <div className="sim-form-group">
                <label>Applicant Full Name</label>
                <input 
                  type="text" 
                  className={`sim-input ${autofillStep === 1 ? 'highlighted' : ''}`}
                  placeholder="Official Name"
                  disabled 
                  value={autofillStep >= 1 ? `${userProfile?.firstName || 'Priyanshi'} ${userProfile?.lastName || 'Sharma'}` : ''} 
                />
              </div>
              <div className="sim-form-group">
                <label>Email Address</label>
                <input 
                  type="text" 
                  className={`sim-input ${autofillStep === 2 ? 'highlighted' : ''}`} 
                  placeholder="your@email.com"
                  disabled
                  value={autofillStep >= 2 ? (userProfile?.email || 'priyanshi@example.com') : ''}
                />
              </div>
            </div>

            <div className="copilot-grid-3">
              <div className="sim-form-group">
                <label>Age</label>
                <input 
                  type="text" 
                  className={`sim-input ${autofillStep === 3 ? 'highlighted' : ''}`} 
                  disabled
                  value={autofillStep >= 3 ? (userProfile?.age || '22') : ''}
                />
              </div>
              <div className="sim-form-group">
                <label>Annual Income (₹)</label>
                <input 
                  type="text" 
                  className={`sim-input ${autofillStep === 3 ? 'highlighted' : ''}`} 
                  disabled
                  value={autofillStep >= 3 ? `₹${userProfile?.income || '300000'}` : ''}
                />
              </div>
              <div className="sim-form-group">
                <label>Caste Category</label>
                <input 
                  type="text" 
                  className={`sim-input ${autofillStep === 3 ? 'highlighted' : ''}`} 
                  disabled
                  value={autofillStep >= 3 ? (userProfile?.caste || 'OBC') : ''}
                />
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#475569', marginBottom: '0.8rem' }}>Uploaded Verification Certificates</h4>
              <div className="copilot-grid-2">
                <div className="sim-form-group">
                  <label style={{ fontWeight: 'bold', color: '#475569' }}>Aadhaar Card Copy</label>
                  <label className={`sim-file-upload-box ${autofillStep >= 4 ? 'active' : ''}`} style={{ cursor: 'pointer', display: 'block' }}>
                    {autofillStep >= 4 ? (
                      <div>
                        <div>📎 {getDocNameShort('Aadhaar Card')}</div>
                        <div style={{ fontSize: '0.7rem', color: Object.keys(uploadedDocs).find(k => k.toLowerCase().includes('aadhaar')) ? '#10b981' : '#f59e0b', marginTop: '0.2rem', fontWeight: 'bold' }}>
                          {Object.keys(uploadedDocs).find(k => k.toLowerCase().includes('aadhaar')) ? '✅ Injected from Vault' : '⚠️ Click to upload real Aadhaar'}
                        </div>
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>No file chosen (Click here to upload)</div>
                    )}
                    <input 
                      type="file" 
                      style={{ display: 'none' }} 
                      accept=".pdf,image/*" 
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            saveDocument('Aadhaar Card', {
                              name: file.name,
                              size: (file.size / 1024).toFixed(1) + " KB",
                              type: file.type,
                              date: new Date().toLocaleDateString(),
                              content: reader.result
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                  </label>
                </div>

                <div className="sim-form-group">
                  <label style={{ fontWeight: 'bold', color: '#475569' }}>Income Certificate Copy</label>
                  <label className={`sim-file-upload-box ${autofillStep >= 4 ? 'active' : ''}`} style={{ cursor: 'pointer', display: 'block' }}>
                    {autofillStep >= 4 ? (
                      <div>
                        <div>📎 {getDocNameShort('Income Certificate')}</div>
                        <div style={{ fontSize: '0.7rem', color: Object.keys(uploadedDocs).find(k => k.toLowerCase().includes('income')) ? '#10b981' : '#f59e0b', marginTop: '0.2rem', fontWeight: 'bold' }}>
                          {Object.keys(uploadedDocs).find(k => k.toLowerCase().includes('income')) ? '✅ Injected from Vault' : '⚠️ Click to upload real Income Cert'}
                        </div>
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>No file chosen (Click here to upload)</div>
                    )}
                    <input 
                      type="file" 
                      style={{ display: 'none' }} 
                      accept=".pdf,image/*" 
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            saveDocument('Income Certificate', {
                              name: file.name,
                              size: (file.size / 1024).toFixed(1) + " KB",
                              type: file.type,
                              date: new Date().toLocaleDateString(),
                              content: reader.result
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                  </label>
                </div>
              </div>
            </div>

            {autofillStep === 5 && (
              <div style={{ textAlign: 'center', marginTop: '2rem', animation: 'modalSlide 0.3s ease-out' }}>
                <div style={{ display: 'inline-block', background: '#ecfdf5', color: '#059669', padding: '1.5rem', borderRadius: '16px', border: '1px solid #a7f3d0' }}>
                  <CheckCircle size={40} style={{ marginBottom: '0.5rem' }} />
                  <h4 style={{ fontWeight: 800 }}>Autofill Simulation Completed Successfully!</h4>
                  <p style={{ fontSize: '0.85rem', color: '#065f46', marginTop: '0.2rem' }}>All local details and Vault documents were filled in 4.5 seconds.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="copilot-sidebar">
        <h3 className="clipboard-title">
          <Briefcase size={20} color="#dc2626" /> Application Co-Pilot
        </h3>

        <div className="copilot-instruction-box">
          <strong>How to Apply:</strong>
          <ol style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <li>Click <strong>Redirect & Apply</strong> below to sync and open the portal.</li>
            <li>Use the one-click copy buttons below to copy your details.</li>
            <li>Paste them directly into the form fields.</li>
            <li>Use our extension popup to autofill values and files instantly.</li>
          </ol>
        </div>

        <button 
          className="btn btn-primary" 
          style={{ width: '100%', marginBottom: '2rem', background: '#2563eb' }}
          onClick={handleRedirectAndApply}
        >
          🌐 Redirect & Apply on Official Portal <ExternalLink size={14} />
        </button>

        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#334155', marginBottom: '0.8rem' }}>Your Profile Info (One-Click Copy)</h4>
        
        <div className="clipboard-card">
          <div className="clipboard-field">
            <span className="clipboard-label">Applicant Name</span>
            <span className="clipboard-value">{userProfile?.firstName || 'Priyanshi'} {userProfile?.lastName || 'Sharma'}</span>
            <button className="btn-copy-small" onClick={() => triggerCopy('name', `${userProfile?.firstName || 'Priyanshi'} ${userProfile?.lastName || 'Sharma'}`)}>
              {isCopied['name'] ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="clipboard-field">
            <span className="clipboard-label">Age</span>
            <span className="clipboard-value">{userProfile?.age || '22'} Years</span>
            <button className="btn-copy-small" onClick={() => triggerCopy('age', userProfile?.age || '22')}>
              {isCopied['age'] ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="clipboard-field">
            <span className="clipboard-label">Annual Income</span>
            <span className="clipboard-value">₹{userProfile?.income || '300000'}</span>
            <button className="btn-copy-small" onClick={() => triggerCopy('income', userProfile?.income || '300000')}>
              {isCopied['income'] ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="clipboard-field">
            <span className="clipboard-label">State / Caste</span>
            <span className="clipboard-value">{userProfile?.state || 'Puducherry'} ({userProfile?.caste || 'OBC'})</span>
            <button className="btn-copy-small" onClick={() => triggerCopy('state_caste', `${userProfile?.state}, ${userProfile?.caste}`)}>
              {isCopied['state_caste'] ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#334155', marginBottom: '0.8rem' }}>Your Required Files</h4>
        
        <div className="clipboard-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {scheme.details.documents.map((doc, idx) => {
            const uploaded = uploadedDocs[doc];
            return (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', paddingBottom: '0.5rem', borderBottom: idx < scheme.details.documents.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: uploaded ? '#0f172a' : '#64748b', fontWeight: uploaded ? '600' : 'normal' }}>
                    <FileText size={16} color={uploaded ? '#10b981' : '#94a3b8'} />
                    <span style={{ maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc}</span>
                  </div>
                  {uploaded && (
                    <span style={{ fontSize: '0.7rem', color: '#64748b', marginLeft: '1.25rem', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {uploaded.name}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                  {uploaded && uploaded.content ? (
                    <>
                      <a href={uploaded.content} download={uploaded.name} className="btn-copy-small" style={{ textDecoration: 'none', background: '#ecfdf5', color: '#059669', borderColor: '#a7f3d0', padding: '0.2rem 0.4rem' }}>
                        Get
                      </a>
                      <button className="btn-copy-small" style={{ background: '#fef2f2', color: '#ef4444', borderColor: '#fca5a5', padding: '0.2rem 0.4rem' }} onClick={() => removeDocument(doc)}>
                        Del
                      </button>
                    </>
                  ) : (
                    <label className="btn-copy-small" style={{ cursor: 'pointer', background: '#fff7ed', color: '#c2410c', borderColor: '#ffedd5', display: 'flex', alignItems: 'center', gap: '0.2rem', padding: '0.2rem 0.4rem' }}>
                      Upload
                      <input 
                        type="file" 
                        style={{ display: 'none' }} 
                        accept=".pdf,image/*" 
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              saveDocument(doc, {
                                name: file.name,
                                size: (file.size / 1024).toFixed(1) + " KB",
                                type: file.type,
                                date: new Date().toLocaleDateString(),
                                content: reader.result
                              });
                            };
                            reader.readAsDataURL(file);
                          }
                        }} 
                      />
                    </label>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#334155', marginBottom: '0.8rem' }}>Track Submitted Application</h4>
        <div className="clipboard-card">
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.8rem' }}>Once you submit on the official website, paste the Application Reference ID here to track it.</p>
          <form onSubmit={handleSaveStatus} style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              className="auth-input" 
              style={{ margin: 0, padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} 
              placeholder="e.g. AP-98765432"
              value={appReference}
              onChange={e => setAppReference(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>Track</button>
          </form>
          {statusMessage && (
            <div style={{ color: '#059669', fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: 600 }}>{statusMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

const STATE_CENTERS = {
  'andhra pradesh': [16.5062, 80.6480],
  'arunachal pradesh': [27.0844, 93.6053],
  'assam': [26.1445, 91.7362],
  'bihar': [25.5941, 85.1376],
  'chhattisgarh': [21.2787, 81.8661],
  'goa': [15.4909, 73.8278],
  'gujarat': [23.2156, 72.6369],
  'haryana': [30.7333, 76.7794],
  'himachal pradesh': [31.1048, 77.1734],
  'jharkhand': [23.3441, 85.3090],
  'karnataka': [12.9716, 77.5946],
  'kerala': [8.5241, 76.9366],
  'madhya pradesh': [23.2599, 77.4126],
  'maharashtra': [18.9750, 72.8258],
  'manipur': [24.8170, 93.9368],
  'meghalaya': [25.5788, 91.8933],
  'mizoram': [23.7307, 92.7173],
  'nagaland': [25.6751, 94.1086],
  'odisha': [20.2961, 85.8245],
  'punjab': [30.7333, 76.7794],
  'rajasthan': [26.9124, 75.7873],
  'sikkim': [27.3314, 88.6138],
  'tamil nadu': [13.0827, 80.2707],
  'telangana': [17.3850, 78.4867],
  'tripura': [23.8315, 91.2868],
  'uttar pradesh': [26.8467, 80.9462],
  'uttarakhand': [30.3165, 78.0322],
  'west bengal': [22.5726, 88.3639],
  'puducherry': [11.9350, 79.8280],
  'delhi': [28.6139, 77.2090],
  'chandigarh': [30.7333, 76.7794]
};

const getStateCenter = (state) => {
  if (!state) return STATE_CENTERS['puducherry'];
  const key = state.trim().toLowerCase();
  return STATE_CENTERS[key] || STATE_CENTERS['puducherry'];
};

const getOfflineOffices = (state, scheme) => {
  const category = (scheme?.category || '').toLowerCase();
  const title = (scheme?.title || '').toLowerCase();
  
  let mainOfficeName = `Tehsil Office / Taluk Revenue Department - ${state}`;
  let mainOfficeAddress = `45, Main Square, ${state}`;
  let mainOfficeType = "Tehsil Office";
  
  let cscName = `Common Service Centre (CSC) Central - ${state}`;
  let cscAddress = `12, Heritage Market Road, ${state}`;
  
  let deptName = `Social Welfare & Women Empowerment Dept - ${state}`;
  let deptAddress = `8, Beach/Bypass Road Nodal Office, ${state}`;
  let deptType = "Department Office";
  
  // Customize based on category
  if (category === 'farmer' || title.includes('kisan') || title.includes('krishi') || title.includes('farmer') || title.includes('agriculture')) {
    mainOfficeName = `Krishi Bhavan / District Agriculture Department - ${state}`;
    mainOfficeAddress = `45, Krishi Lane, Agricultural Colony, ${state}`;
    mainOfficeType = "Agriculture Dept";
    
    cscName = `CSC Farmer Welfare Kiosk - ${state}`;
    cscAddress = `12, Ananda Ranga St, Near Crop Mandi, ${state}`;
    
    deptName = `Agricultural Technology Management Agency (ATMA) - ${state}`;
    deptAddress = `80, Bypass Road, Opp. Fertilizer Hub, ${state}`;
    deptType = "ATMA Kiosk";
  } else if (category === 'student' || category === 'education' || title.includes('scholarship') || title.includes('student') || title.includes('school')) {
    mainOfficeName = `District Education Office (DEO) / Education Dept - ${state}`;
    mainOfficeAddress = `24, Lal Bahadur St, Near Government School, ${state}`;
    mainOfficeType = "Education Dept";
    
    cscName = `CSC Student & E-Scholarship Helpdesk - ${state}`;
    cscAddress = `8, Needarajapayar St, Opp. Central Library, ${state}`;
    
    deptName = `Directorate of Higher & Technical Education - ${state}`;
    deptAddress = `15, Education Main Road, ${state}`;
    deptType = "Higher Education Dept";
  } else if (category === 'business' || category === 'employment' || title.includes('business') || title.includes('loan') || title.includes('udyog') || title.includes('start')) {
    mainOfficeName = `District Industries Centre (DIC) / MSME Directorate - ${state}`;
    mainOfficeAddress = `56, Industrial Estate Road, ${state}`;
    mainOfficeType = "MSME Office";
    
    cscName = `CSC Entrepreneurship & Mudra Kiosk - ${state}`;
    cscAddress = `30, Mahatma Gandhi Road, Financial Hub, ${state}`;
    
    deptName = `National Small Industries Corporation (NSIC) Help Desk - ${state}`;
    deptAddress = `14, Goubert Avenue, Opp. Commercial Tax Complex, ${state}`;
    deptType = "NSIC Helpdesk";
  } else if (category === 'health' || title.includes('health') || title.includes('medical') || title.includes('ayushman') || title.includes('bima')) {
    mainOfficeName = `Chief Medical Officer (CMO) Office / District Health Dept - ${state}`;
    mainOfficeAddress = `102, Government General Hospital Campus, ${state}`;
    mainOfficeType = "Health Department";
    
    cscName = `CSC Ayushman Bharat Card Enrolment Centre - ${state}`;
    cscAddress = `22, Rangapillai St, Near Primary Health Centre, ${state}`;
    
    deptName = `State Health Agency (SHA) Nodal Desk - ${state}`;
    deptAddress = `44, Nehru Street, Opp. Maternity Hospital, ${state}`;
    deptType = "State Health Agency";
  } else if (category === 'women' || category === 'girl' || title.includes('women') || title.includes('girl') || title.includes('ladli') || title.includes('kanya')) {
    mainOfficeName = `District Women & Child Development (WCD) Office - ${state}`;
    mainOfficeAddress = `18, Roman Rolland St, Near District Court, ${state}`;
    mainOfficeType = "WCD Department";
    
    cscName = `CSC Women Empowerment & Scheme Cell - ${state}`;
    cscAddress = `5, Mission Street, Opp. Main Cathedral, ${state}`;
    
    deptName = `Social Welfare & Women Empowerment Dept - ${state}`;
    deptAddress = `8, Beach/Bypass Road Nodal Office, ${state}`;
    deptType = "Department Office";
  }

  const center = getStateCenter(state);
  return [
    {
      id: 0,
      name: cscName,
      address: cscAddress,
      type: "CSC Kiosk",
      hours: "09:00 AM - 06:00 PM",
      lat: center[0] - 0.0012,
      lng: center[1] + 0.0048
    },
    {
      id: 1,
      name: mainOfficeName,
      address: mainOfficeAddress,
      type: mainOfficeType,
      hours: "10:00 AM - 05:00 PM",
      lat: center[0] + 0.0032,
      lng: center[1] - 0.0028
    },
    {
      id: 2,
      name: deptName,
      address: deptAddress,
      type: deptType,
      hours: "10:00 AM - 05:30 PM",
      lat: center[0] - 0.0038,
      lng: center[1] + 0.0068
    }
  ];
};

const getHaversineDistance = (coords1, coords2) => {
  const R = 6371; // Earth radius in km
  const dLat = (coords2.lat - coords1.lat) * Math.PI / 180;
  const dLng = (coords2.lng - coords1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coords1.lat * Math.PI / 180) * Math.cos(coords2.lat * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const getRouteNodes = (officeId, state) => {
  const center = getStateCenter(state);
  switch (officeId) {
    case 1:
      return [[center[0], center[1]], [center[0] + 0.0032, center[1]], [center[0] + 0.0032, center[1] - 0.0028]];
    case 2:
      return [[center[0], center[1]], [center[0] - 0.0038, center[1]], [center[0] - 0.0038, center[1] + 0.0068]];
    case 0:
    default:
      return [[center[0], center[1]], [center[0] - 0.0012, center[1]], [center[0] - 0.0012, center[1] + 0.0048]];
  }
};

const getInterpolatedCoordinates = (routeNodes, progress) => {
  if (!routeNodes || routeNodes.length === 0) return { x: 11.9350, y: 79.8280, heading: 'left' };
  if (progress <= 0) return { x: routeNodes[0][0], y: routeNodes[0][1], heading: 'left' };
  if (progress >= 100) {
    const lastIdx = routeNodes.length - 1;
    const prevIdx = Math.max(0, lastIdx - 1);
    const dy = routeNodes[lastIdx][1] - routeNodes[prevIdx][1];
    return { x: routeNodes[lastIdx][0], y: routeNodes[lastIdx][1], heading: dy >= 0 ? 'right' : 'left' };
  }

  const totalSegments = routeNodes.length - 1;
  const segmentWeight = 100 / totalSegments;
  const segmentIndex = Math.min(totalSegments - 1, Math.floor(progress / segmentWeight));
  
  const segmentStartNode = routeNodes[segmentIndex];
  const segmentEndNode = routeNodes[segmentIndex + 1];
  
  const segmentProgress = (progress % segmentWeight) / segmentWeight;
  
  const x = segmentStartNode[0] + (segmentEndNode[0] - segmentStartNode[0]) * segmentProgress;
  const y = segmentStartNode[1] + (segmentEndNode[1] - segmentStartNode[1]) * segmentProgress;
  
  const dy = segmentEndNode[1] - segmentStartNode[1];
  const heading = dy >= 0 ? 'right' : 'left';
  
  return { x, y, heading };
};

const getBunnySpeech = (stepIndex, travelMode, officeName, applicantName) => {
  const name = applicantName ? applicantName.split(' ')[0] : 'Priyanshi';
  const modeAction = travelMode === 'walking' ? 'walk 🚶' : travelMode === 'bus' ? 'bus ride 🚌' : travelMode === 'train' ? 'train ride 🚆' : 'car drive 🚗';
  const advice = travelMode === 'walking' 
    ? "It's a beautiful day to walk! Keep an eye on pedestrian crossings. 🌳" 
    : travelMode === 'bus' 
    ? "Hold on tight! Board bus line 10A and enjoy the view. 🚌" 
    : travelMode === 'train' 
    ? "Suburban local line is very fast! Watch the station codes. 🚆" 
    : "Safety first! Put on your seatbelt and drive carefully. 🚗";

  if (stepIndex === 0) {
    return `Hey ${name}! 🐰 I am Hoppy, your trip advisor. We are planning a ${modeAction} to ${officeName}. First, carry your physical Aadhaar Card and summary sheet! Let's start the trip!`;
  }
  if (stepIndex === 1) {
    return `Looking good, ${name}! 🐰 We are turning onto the main avenue now. ${advice} We are 25% completed!`;
  }
  if (stepIndex === 2) {
    return `Halfway there! 🐰 We are cruising smoothly through Heritage Town. I just checked your Vault documents checklist - you are 100% prepared! 📄✨`;
  }
  return `Whoosh! We have arrived at ${officeName}! 🐰🏁 Head inside, submit your pre-filled summary form, pay the ₹30 fee, and let's get your scheme applied! You did great! 🎉`;
};

function MapViewUpdater({ center, zoom, autoFollow, dotCoords }) {
  const map = useMap();
  
  // Follow marker changes when autoFollow is enabled
  React.useEffect(() => {
    if (autoFollow) {
      map.setView([dotCoords.x, dotCoords.y], map.getZoom(), { animate: true });
    }
  }, [dotCoords.x, dotCoords.y, autoFollow, map]);

  // Center on mapCenter changes (e.g. office selected or manual re-centering)
  React.useEffect(() => {
    if (!autoFollow) {
      map.setView([center.x, center.y], zoom, { animate: true });
    }
  }, [center.x, center.y, map]);

  // React to zoom level adjustments
  React.useEffect(() => {
    map.setZoom(zoom);
  }, [zoom, map]);

  return null;
}

function MapEventTracker({ setAutoFollow }) {
  const map = useMap();
  React.useEffect(() => {
    const handleDragStart = () => {
      setAutoFollow(false);
    };
    map.on("dragstart", handleDragStart);
    return () => {
      map.off("dragstart", handleDragStart);
    };
  }, [map, setAutoFollow]);
  return null;
}

const OfflineGuideView = ({ scheme, userProfile, uploadedDocs, onBack }) => {
  const [selectedOffice, setSelectedOffice] = useState(0);
  const [travelMode, setTravelMode] = useState('driving'); 
  const userEmoji = travelMode === 'walking' ? '🚶' : travelMode === 'bus' ? '🚌' : travelMode === 'train' ? '🚆' : '🚗';
  const [isSatellite, setIsSatellite] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(14); // Set Leaflet zoom initially to 14 (balanced view)
  const [rotateDegree, setRotateDegree] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [startLocationText, setStartLocationText] = useState('My Location (Simulated Home)');
  const [destinationText, setDestinationText] = useState('');
  
  // Custom GPS Simulation States
  const [isNavigating, setIsNavigating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Advanced Geolocation & Geolocation Sharing States
  const [useRealGPS, setUseRealGPS] = useState(false);
  const [realGPSCoords, setRealGPSCoords] = useState(null);
  const [gpsError, setGpsError] = useState(null);

  // TTS & Mute Voice state
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Simulation controls state
  const [simSpeedMultiplier, setSimSpeedMultiplier] = useState(1);
  const [trafficCongestion, setTrafficCongestion] = useState(false);
  const [simLogs, setSimLogs] = useState([]);

  // Mobile Collapsible States
  const [showRouteDetails, setShowRouteDetails] = useState(false);
  const [showDocsList, setShowDocsList] = useState(false);
  const [showDirections, setShowDirections] = useState(false);

  const getEmojiIcon = (emoji, size = 32, heading = 'left') => {
    const transform = heading === 'right' ? 'transform: scaleX(-1);' : '';
    return L.divIcon({
      html: `<div style="font-size: ${size}px; line-height: 1; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15)); ${transform}">${emoji}</div>`,
      className: 'custom-emoji-marker',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2]
    });
  };

  const state = userProfile?.state || 'Puducherry';
  const offices = getOfflineOffices(state, scheme);

  // Initialize destinationText once offices are loaded
  React.useEffect(() => {
    if (offices && offices.length > 0 && !destinationText) {
      setDestinationText(offices[0].name);
    }
  }, [offices]);
  
  const filteredOffices = offices.filter(o => 
    o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const currentOffice = offices[selectedOffice] || offices[0];

  const routeNodes = getRouteNodes(selectedOffice, state);

  // Real-time live coordinates distance & ETA
  const liveDistance = useRealGPS && realGPSCoords 
    ? getHaversineDistance(realGPSCoords, { lat: currentOffice.lat, lng: currentOffice.lng })
    : null;

  const liveDistanceFormatted = liveDistance !== null
    ? (liveDistance < 1 ? (liveDistance * 1000).toFixed(0) + " m" : liveDistance.toFixed(2) + " km")
    : null;

  const liveEtaFormatted = liveDistance !== null
    ? (() => {
        const speed = travelMode === 'walking' ? 5 : travelMode === 'driving' ? 30 : travelMode === 'bus' ? 20 : 45; // speed in km/h
        let etaMin = (liveDistance / speed) * 60;
        if (trafficCongestion) etaMin *= 1.8;
        return etaMin < 1 ? "Under 1 min" : Math.round(etaMin) + " mins";
      })()
    : null;

  const activeRouteNodes = useRealGPS && realGPSCoords 
    ? [[realGPSCoords.lat, realGPSCoords.lng], [currentOffice.lat, currentOffice.lng]]
    : routeNodes;

  const dotCoords = isNavigating 
    ? getInterpolatedCoordinates(activeRouteNodes, simProgress)
    : (useRealGPS && realGPSCoords ? { x: realGPSCoords.lat, y: realGPSCoords.lng, heading: 'left' } : getInterpolatedCoordinates(activeRouteNodes, simProgress));

  // Map Panning / Zooming States
  const [mapCenter, setMapCenter] = useState({ x: getStateCenter(state)[0], y: getStateCenter(state)[1] });
  const [autoFollow, setAutoFollow] = useState(true);

  // Floating Bunny position states
  const [bunnyPos, setBunnyPos] = useState({ x: 0, y: 0 });
  const [isDraggingBunny, setIsDraggingBunny] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  React.useEffect(() => {
    setBunnyPos({
      x: Math.max(10, window.innerWidth - 300),
      y: Math.max(10, window.innerHeight - 340)
    });
  }, []);

  const handleBunnyMouseDown = (e) => {
    if (e.button !== 0) return; // Only drag with left mouse click
    setIsDraggingBunny(true);
    setDragOffset({
      x: e.clientX - bunnyPos.x,
      y: e.clientY - bunnyPos.y
    });
  };

  const handleBunnyTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDraggingBunny(true);
    setDragOffset({
      x: touch.clientX - bunnyPos.x,
      y: touch.clientY - bunnyPos.y
    });
  };

  // Helper to add log entries
  const addLog = (message) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setSimLogs(prev => [`[${time}] ${message}`, ...prev.slice(0, 19)]);
  };

  // TTS speak helper
  const speakText = (text, onEndCallback) => {
    if (!window.speechSynthesis) {
      if (onEndCallback) onEndCallback();
      return;
    }
    if (isMuted) {
      if (onEndCallback) onEndCallback();
      return;
    }
    try {
      window.speechSynthesis.cancel();
      setIsSpeaking(true);
      // Remove emojis so voice doesn't read them aloud
      const cleanText = text.replace(/[^\p{L}\p{N}\p{Z}\p{P}]/gu, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.05;
      utterance.pitch = 1.25; // cute voice
      
      utterance.onend = () => {
        setIsSpeaking(false);
        if (onEndCallback) onEndCallback();
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        if (onEndCallback) onEndCallback();
      };
      
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error: ", e);
      setIsSpeaking(false);
      if (onEndCallback) onEndCallback();
    }
  };

  // Global mouse move & touch move listeners for bunny dragging
  React.useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDraggingBunny) return;
      const limitX = window.innerWidth < 768 ? window.innerWidth - 80 : window.innerWidth - 280;
      const limitY = window.innerHeight - 120;
      const newX = Math.max(10, Math.min(limitX, e.clientX - dragOffset.x));
      const newY = Math.max(10, Math.min(limitY, e.clientY - dragOffset.y));
      setBunnyPos({ x: newX, y: newY });
    };

    const handleGlobalMouseUp = () => {
      setIsDraggingBunny(false);
    };

    const handleGlobalTouchMove = (e) => {
      if (!isDraggingBunny) return;
      if (e.cancelable) {
        e.preventDefault();
      }
      const touch = e.touches[0];
      const limitX = window.innerWidth < 768 ? window.innerWidth - 80 : window.innerWidth - 280;
      const limitY = window.innerHeight - 120;
      const newX = Math.max(10, Math.min(limitX, touch.clientX - dragOffset.x));
      const newY = Math.max(10, Math.min(limitY, touch.clientY - dragOffset.y));
      setBunnyPos({ x: newX, y: newY });
    };

    if (isDraggingBunny) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      window.addEventListener('touchend', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, [isDraggingBunny, dragOffset]);

  // Cancel voice on component unmount
  React.useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Update mapCenter when dotCoords changes if autoFollow is enabled
  React.useEffect(() => {
    if (autoFollow) {
      setMapCenter(prev => {
        if (prev.x === dotCoords.x && prev.y === dotCoords.y) return prev;
        return dotCoords;
      });
    }
  }, [dotCoords.x, dotCoords.y, autoFollow]);

  // If selectedOffice or state changes, reset camera to start node and autoFollow to true
  React.useEffect(() => {
    const route = getRouteNodes(selectedOffice, state);
    if (route && route.length > 0) {
      setMapCenter({ x: route[0][0], y: route[0][1] });
    }
    setAutoFollow(true);
  }, [selectedOffice, state]);

  // Watch position continuously if using real GPS
  React.useEffect(() => {
    let watchId = null;
    if (useRealGPS && realGPSCoords && navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setRealGPSCoords({ lat, lng });
          if (autoFollow) {
            setMapCenter({ x: lat, y: lng });
          }
        },
        (error) => {
          addLog(`GPS location update failed: ${error.message}`);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    }
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [useRealGPS, realGPSCoords, autoFollow]);

  // GPS animation effect
  React.useEffect(() => {
    let timer;
    if (isNavigating && isPlaying && !isSpeaking) {
      timer = setInterval(() => {
        setSimProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            addLog(`Trip complete! Arrived at ${currentOffice.name}.`);
            return 100;
          }
          const speedFactor = travelMode === 'driving' ? 0.8 : travelMode === 'walking' ? 0.25 : travelMode === 'bus' ? 0.5 : 0.6;
          const trafficFactor = trafficCongestion ? 0.4 : 1.0;
          const delta = speedFactor * simSpeedMultiplier * trafficFactor;
          const nextProgress = Math.min(100, prev + delta);
          
          let stepIndex = 0;
          if (nextProgress >= 100) {
            stepIndex = 3;
          } else if (nextProgress >= 50) {
            stepIndex = 2;
          } else if (nextProgress > 0) {
            stepIndex = 1;
          }
          setActiveStepIndex(stepIndex);
          
          return nextProgress;
        });
      }, 200);
    }
    return () => clearInterval(timer);
  }, [isNavigating, isPlaying, travelMode, simSpeedMultiplier, trafficCongestion, isSpeaking]);

  // Log steps changes
  React.useEffect(() => {
    if (isNavigating) {
      addLog(`Step ${activeStepIndex + 1}: ${modeDetails.steps[activeStepIndex]}`);
    }
  }, [activeStepIndex, isNavigating]);

  // Log traffic delay warnings
  React.useEffect(() => {
    if (trafficCongestion) {
      addLog("⚠️ Congestion alert: Congested traffic. Speed reduced by 60%.");
    } else if (isNavigating) {
      addLog("🟢 Traffic cleared. Resuming normal travel speed.");
    }
  }, [trafficCongestion]);

  const handleStartNavigation = () => {
    setIsNavigating(true);
    setIsPlaying(true);
    setSimProgress(0);
    setActiveStepIndex(0);
    addLog(`Departing to: ${currentOffice.name} via ${travelMode.toUpperCase()}`);
    speakText(`Starting navigation route to ${currentOffice.name}. Let's go!`);
  };

  const handlePauseNavigation = () => {
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);
    if (!nextPlaying && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    addLog(nextPlaying ? "Navigation simulation resumed." : "Navigation simulation paused.");
    speakText(nextPlaying ? "Resuming route." : "Navigation paused.");
  };

  const handleStopNavigation = () => {
    setIsNavigating(false);
    setIsPlaying(false);
    setIsSpeaking(false);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSimProgress(0);
    setActiveStepIndex(0);
    addLog("Navigation stopped. Returning to standby.");
    speakText("Navigation stopped.");
  };

  const getProgressForStep = (step) => {
    if (step === 0) return 0;
    if (step === 1) return 33;
    if (step === 2) return 66;
    return 100;
  };

  const handleNextStep = () => {
    if (activeStepIndex < 3) {
      const nextStep = activeStepIndex + 1;
      setActiveStepIndex(nextStep);
      setSimProgress(getProgressForStep(nextStep));
    }
  };

  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      const prevStep = activeStepIndex - 1;
      setActiveStepIndex(prevStep);
      setSimProgress(getProgressForStep(prevStep));
    }
  };

  const handleToggleRealGPS = () => {
    if (useRealGPS) {
      setUseRealGPS(false);
      setRealGPSCoords(null);
      setStartLocationText('My Location (Simulated Home)');
      addLog("Real GPS deactivated. Switched back to Puducherry simulation.");
      speakText("Live location sharing turned off. Switched back to simulation mode.");
      return;
    }

    setUseRealGPS(true);
    setRealGPSCoords(null);
    setStartLocationText('My Live Location');
    addLog("Switched to Real-Time GPS Mode. Please click the Share Location button.");
    speakText("Switched to Real-Time GPS Mode. Please click the Share Location button.");
  };

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    addLog("Requesting live GPS location permission...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setRealGPSCoords({ lat, lng });
        setStartLocationText("📍 Live GPS Location (Shared)");
        setMapCenter({ x: lat, y: lng });
        addLog(`Live GPS Active. Current Coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
        speakText("Real-time location sharing enabled! I see you on the map.");
      },
      (error) => {
        setGpsError(error.message);
        alert(`Failed to retrieve location: ${error.message}`);
        addLog(`GPS Error: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const modeDetails = (() => {
    const userLocName = "Your Location";
    switch(travelMode) {
      case 'walking':
        if (selectedOffice === 1) {
          return {
            duration: "12 mins",
            distance: "950 m",
            speed: "5 km/h",
            traffic: "Pedestrian Walkway",
            steps: [
              `Start walking north from ${userLocName} toward Main Office (350m).`,
              "Turn left onto Heritage walkway at the corner (300m).",
              "Walk straight past the community garden on your right.",
              `Arrive at ${currentOffice.name} (on your left).`
            ]
          };
        } else if (selectedOffice === 2) {
          return {
            duration: "15 mins",
            distance: "1.2 km",
            speed: "5 km/h",
            traffic: "Pedestrian Walkway",
            steps: [
              `Start walking south from ${userLocName} toward Department Office (450m).`,
              "Turn right onto park road corner (450m).",
              "Walk straight along the canal sidewalk.",
              `Arrive at ${currentOffice.name} (on your right).`
            ]
          };
        } else { // Office 0
          return {
            duration: "10 mins",
            distance: "800 m",
            speed: "5 km/h",
            traffic: "Pedestrian Walkway",
            steps: [
              `Start walking south from ${userLocName} toward CSC Kiosk (150m).`,
              "Turn right onto shopping avenue sidewalk (500m).",
              "Walk straight past local community hub.",
              `Arrive at ${currentOffice.name} (on your left).`
            ]
          };
        }
      case 'bus':
        if (selectedOffice === 1) {
          return {
            duration: "8 mins",
            distance: "1.5 km",
            speed: "25 km/h",
            traffic: "Light (Bus Lane)",
            steps: [
              "Walk north to the nearest bus stop (100m).",
              "Board Bus Line 5 heading toward North Avenue.",
              "Ride for 2 stops and de-board at Market Square.",
              `Walk 50m west to reach ${currentOffice.name}.`
            ]
          };
        } else if (selectedOffice === 2) {
          return {
            duration: "10 mins",
            distance: "1.9 km",
            speed: "25 km/h",
            traffic: "Light (Bus Lane)",
            steps: [
              "Walk south to the main road bus stop (150m).",
              "Board Bus Line 8 heading toward South Heritage.",
              "Ride for 3 stops and de-board at Civic Center.",
              `Walk 100m east to reach ${currentOffice.name}.`
            ]
          };
        } else { // Office 0
          return {
            duration: "6 mins",
            distance: "1.1 km",
            speed: "25 km/h",
            traffic: "Light (Bus Lane)",
            steps: [
              "Walk to the corner bus stand (80m).",
              "Board Bus Line 3 heading toward Eastern Bypass.",
              "Ride for 2 stops and de-board at Central Library.",
              `Walk 40m east to reach ${currentOffice.name}.`
            ]
          };
        }
      case 'train':
        if (selectedOffice === 1) {
          return {
            duration: "20 mins",
            distance: "4.8 km",
            speed: "45 km/h",
            traffic: "On-time",
            steps: [
              "Go to North Suburban Railway Station (600m).",
              "Board Local Transit Train Line A (Platform 1).",
              "Ride for 1 stop to Central Station.",
              `De-board and walk 250m north to ${currentOffice.name}.`
            ]
          };
        } else if (selectedOffice === 2) {
          return {
            duration: "25 mins",
            distance: "5.5 km",
            speed: "45 km/h",
            traffic: "On-time",
            steps: [
              "Go to Central Suburban Railway Station (800m).",
              "Board Local Transit Train Line B (Platform 3).",
              "Ride for 2 stops to South Station.",
              `De-board and walk 300m east to ${currentOffice.name}.`
            ]
          };
        } else { // Office 0
          return {
            duration: "18 mins",
            distance: "4.2 km",
            speed: "45 km/h",
            traffic: "On-time",
            steps: [
              "Go to Local Station (500m).",
              "Board Local Transit Train Line C (Platform 2).",
              "Ride for 1 stop to East Station.",
              `De-board and walk 150m south to ${currentOffice.name}.`
            ]
          };
        }
      case 'driving':
      default:
        if (selectedOffice === 1) {
          return {
            duration: "4 mins",
            distance: "1.1 km",
            speed: "35 km/h",
            traffic: "Light traffic",
            steps: [
              `Head North on main road from ${userLocName} (350m).`,
              "Turn left at the traffic signal (300m).",
              "Pass public library on your left.",
              `Arrive at ${currentOffice.name} (on your right).`
            ]
          };
        } else if (selectedOffice === 2) {
          return {
            duration: "5 mins",
            distance: "1.3 km",
            speed: "35 km/h",
            traffic: "Light traffic",
            steps: [
              `Head South on bypass road from ${userLocName} (450m).`,
              "Turn left onto service lane (450m).",
              "Pass civic center complex on your left.",
              `Arrive at ${currentOffice.name} (on your right).`
            ]
          };
        } else { // Office 0
          return {
            duration: "3 mins",
            distance: "0.8 km",
            speed: "35 km/h",
            traffic: "Light traffic",
            steps: [
              `Head South on main avenue from ${userLocName} (150m).`,
              "Turn left at the crossroads (500m).",
              "Pass local community center on your right.",
              `Arrive at ${currentOffice.name} (on your left).`
            ]
          };
        }
    }
  })();

  const handleDownloadPrefilledForm = () => {
    const fileContent = `======================================================
YOJNASETU - OFFLINE APPLICATION ASSISTANCE FORM
======================================================
SCHEME APPLIED FOR: ${scheme.title}
TARGET AUDIENCE: ${scheme.target}

APPLICANT PROFILE DETAILS:
------------------------------------------
Name: ${userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : 'Priyanshi Sharma'}
Age: ${userProfile ? userProfile.age : '22'} Years
Annual Income: ₹${userProfile ? userProfile.income : '300000'}
Caste Category: ${userProfile ? userProfile.caste : 'OBC'}
State: ${state}

RECOMMENDED KIOSK:
------------------------------------------
Office: ${currentOffice.name}
Address: ${currentOffice.address}
Travel Mode: ${travelMode.toUpperCase()}
Trip Distance: ${modeDetails.distance}

REQUIRED DOCUMENTS CHECKLIST:
------------------------------------------
${scheme.details.documents.map(doc => {
  const isUploaded = uploadedDocs[doc] ? "YES [ATTACHED FROM VAULT]" : "NO [PLEASE BRING ORIGINAL DOCUMENT]";
  return `- ${doc}: ${isUploaded}`;
}).join('\n')}

======================================================
Thank you for using YojnaSetu - Your Personal Guide
======================================================`;

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `YojnaSetu_Offline_${scheme.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Office route paths inside SVG
  const getOfficePath = (id) => {
    switch (id) {
      case 1: return "M 35 40 L 50 40 L 50 65";
      case 2: return "M 35 40 L 20 40 L 20 15";
      case 0:
      default: return "M 35 40 L 35 25 L 70 25";
    }
  };

  const activePath = getOfficePath(selectedOffice);
  const bunnySpeechText = getBunnySpeech(activeStepIndex, travelMode, currentOffice.name, userProfile ? `${userProfile.firstName} ${userProfile.lastName}` : 'Priyanshi Soni');
  const bunnyText = liveDistanceFormatted !== null 
    ? `We are ${liveDistanceFormatted} away from ${currentOffice.name}! ETA is about ${liveEtaFormatted}. ${bunnySpeechText}`
    : bunnySpeechText;

  // Speak when bunnyText updates
  React.useEffect(() => {
    if (isNavigating || activeStepIndex === 0) {
      speakText(bunnyText);
    }
  }, [bunnyText, isMuted]);

  return (
    <div className="maps-page-layout">
      {/* Left Sidebar */}
      <div className="maps-sidebar">
        <div className="maps-sidebar-header">
          <button onClick={onBack} className="btn-back-maps">
            <ChevronLeft size={16} /> Exit Map Guide
          </button>
          
          <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0.8rem 0 0.4rem' }}>
            {scheme.title}
          </h2>
          <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.8rem' }}>
            Interactive GPS guidance & offline CSC finder.
          </p>

          {!isNavigating && (
            <>
              <div style={{ position: 'relative', marginBottom: '0.8rem' }}>
                <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  className="maps-search-input" 
                  placeholder="Search offices, CSCs..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Travel Mode tabs */}
              <div className="maps-travel-tabs">
                <button className={`maps-travel-tab ${travelMode === 'driving' ? 'active' : ''}`} onClick={() => setTravelMode('driving')}>
                  🚗 Car
                </button>
                <button className={`maps-travel-tab ${travelMode === 'walking' ? 'active' : ''}`} onClick={() => setTravelMode('walking')}>
                  🚶 Walk
                </button>
                <button className={`maps-travel-tab ${travelMode === 'bus' ? 'active' : ''}`} onClick={() => setTravelMode('bus')}>
                  🚌 Bus
                </button>
                <button className={`maps-travel-tab ${travelMode === 'train' ? 'active' : ''}`} onClick={() => setTravelMode('train')}>
                  🚆 Train
                </button>
              </div>
            </>
          )}
        </div>

        <div className="maps-sidebar-content">
          {/* Active Geolocation Trip HUD */}
          {isNavigating && (
            <div style={{ background: '#0f172a', padding: '1.2rem', color: 'white', borderBottom: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
                <span>SPEED: <strong>{isPlaying ? (trafficCongestion ? "12 km/h" : modeDetails.speed) : '0 km/h'}</strong></span>
                <span>TRAFFIC: <strong style={{ color: trafficCongestion ? '#ef4444' : '#22c55e' }}>{trafficCongestion ? "Congested" : modeDetails.traffic}</strong></span>
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8', marginBottom: '0.5rem' }}>
                {useRealGPS ? liveEtaFormatted : modeDetails.duration} ({useRealGPS ? liveDistanceFormatted : modeDetails.distance})
              </div>
              <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '0.8rem' }}>
                Remaining journey to {currentOffice.name}
              </div>
              
              <div style={{ height: '6px', background: '#334155', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: '#38bdf8', width: `${simProgress}%`, transition: 'width 0.2s linear' }}></div>
              </div>
              
              <div style={{ display: 'flex', justifyContext: 'space-between', fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                <span>{simProgress.toFixed(0)}% Completed</span>
                <span style={{ marginLeft: 'auto' }}>GPS Active</span>
              </div>
            </div>
          )}

          {/* Start and Destination Routing Card (Google Maps style) */}
          {!isNavigating && (
            <div style={{ padding: '1.2rem 1.5rem', background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
              <div 
                onClick={() => setShowRouteDetails(!showRouteDetails)} 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem', color: '#1e293b' }}
                className="mobile-only-flex"
              >
                <span>📍 Route Details & Settings</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{showRouteDetails ? 'Hide ▴' : 'Show ▾'}</span>
              </div>
              <div className={`route-details-content ${showRouteDetails ? 'expanded' : 'collapsed'}`}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', position: 'relative', marginTop: '0.8rem' }}>
                  {/* Vertical dotted line connector */}
                  <div style={{
                    position: 'absolute',
                    left: '23px',
                    top: '20px',
                    bottom: '20px',
                    width: '2px',
                    borderLeft: '2px dotted #cbd5e1',
                    zIndex: 1
                  }}></div>

                  {/* Start location field */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', zIndex: 2 }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      background: '#3b82f6',
                      borderRadius: '50%',
                      border: '3.5px solid #dbeafe',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}></div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.65rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '2px' }}>Choose Starting Point</label>
                      <input 
                        type="text"
                        value={startLocationText}
                        onChange={(e) => {
                          setStartLocationText(e.target.value);
                        }}
                        placeholder="Type starting location..."
                        style={{
                          width: '100%',
                          border: '1px solid #cbd5e1',
                          borderRadius: '6px',
                          padding: '0.3rem 0.5rem',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: '#334155',
                          background: '#ffffff',
                          outline: 'none',
                          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
                        }}
                      />
                      {useRealGPS && (
                        <div style={{ marginTop: '4px' }}>
                          {!realGPSCoords ? (
                            <button
                              onClick={handleShareLocation}
                              style={{
                                width: '100%',
                                border: '1.5px solid #10b981',
                                borderRadius: '6px',
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                color: '#065f46',
                                background: '#ecfdf5',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.3rem'
                              }}
                            >
                              📡 Click to Share Live GPS
                            </button>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: '#047857', fontWeight: 'bold', padding: '2px' }}>
                              <span>🟢 GPS connected: {realGPSCoords.lat.toFixed(4)}, {realGPSCoords.lng.toFixed(4)}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Destination field */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', zIndex: 2 }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      background: '#ef4444',
                      borderRadius: '50%',
                      border: '3.5px solid #fee2e2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}></div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.65rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '2px' }}>Destination</label>
                      <input
                        type="text"
                        value={destinationText}
                        onChange={(e) => setDestinationText(e.target.value)}
                        placeholder="Type destination..."
                        style={{
                          width: '100%',
                          border: '1px solid #cbd5e1',
                          borderRadius: '6px',
                          padding: '0.3rem 0.5rem',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: '#1e293b',
                          background: '#ffffff',
                          outline: 'none',
                          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
                          marginBottom: '4px'
                        }}
                      />
                      <select
                        value={selectedOffice}
                        onChange={(e) => {
                          const idx = parseInt(e.target.value);
                          setSelectedOffice(idx);
                          setDestinationText(offices[idx].name);
                          setSimProgress(0);
                          setActiveStepIndex(0);
                          setAutoFollow(true);
                          addLog(`Destination updated to: ${offices[idx].name}`);
                        }}
                        style={{
                          width: '100%',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          padding: '0.2rem 0.4rem',
                          fontSize: '0.72rem',
                          color: '#475569',
                          background: '#f8fafc',
                          outline: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        {offices.map((office, idx) => (
                          <option key={office.id} value={idx}>
                            🏛️ {office.name} {idx === 0 ? "(Recommended)" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mode Selector (Simulation vs. Real-Time GPS) */}
          {!isNavigating && (
            <div style={{ padding: '0.8rem 1.5rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <label style={{ display: 'block', fontSize: '0.65rem', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '6px' }}>Navigation Mode</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => {
                    if (useRealGPS) {
                      setUseRealGPS(false);
                      setRealGPSCoords(null);
                      addLog("Switched to Simulation Mode.");
                      speakText("Switched back to simulation mode.");
                    }
                  }}
                  style={{ 
                    flex: 1,
                    fontSize: '0.8rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '0.3rem',
                    background: !useRealGPS ? '#2563eb' : 'white',
                    color: !useRealGPS ? 'white' : '#475569',
                    border: '1px solid',
                    borderColor: !useRealGPS ? '#2563eb' : '#cbd5e1',
                    borderRadius: '6px',
                    padding: '0.5rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  <span>🤖</span> Simulation
                </button>
                <button 
                  onClick={handleToggleRealGPS}
                  style={{ 
                    flex: 1,
                    fontSize: '0.8rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '0.3rem',
                    background: useRealGPS ? '#10b981' : 'white',
                    color: useRealGPS ? 'white' : '#475569',
                    border: '1px solid',
                    borderColor: useRealGPS ? '#10b981' : '#cbd5e1',
                    borderRadius: '6px',
                    padding: '0.5rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  <span>📍</span> Real-Time GPS
                </button>
              </div>
            </div>
          )}

          {useRealGPS && realGPSCoords && (
            <div style={{ background: '#ecfdf5', padding: '1rem 1.5rem', borderBottom: '1px solid #d1fae5', color: '#065f46' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>📡 LIVE GPS SIGNAL ACTIVE</span>
                <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 8px #10b981', animation: 'gpsPulse 1.5s infinite' }}></div>
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                {liveDistanceFormatted} Away
              </div>
              <div style={{ fontSize: '0.78rem', color: '#047857' }}>
                Estimated arrival: <strong>{liveEtaFormatted}</strong> ({travelMode})
              </div>
            </div>
          )}

          {/* Navigation Controls HUD */}
          {isNavigating ? (
            <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #f1f5f9' }}>
              {!useRealGPS && (
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                  <button className="btn btn-outline" style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }} onClick={handlePrevStep} disabled={activeStepIndex === 0}>
                    ◀ Back
                  </button>
                  <button className="btn btn-primary" style={{ flex: 2, fontSize: '0.8rem', padding: '0.5rem', background: '#ef4444' }} onClick={handlePauseNavigation}>
                    {isPlaying ? '⏸ Pause' : '▶ Resume'}
                  </button>
                  <button className="btn btn-outline" style={{ flex: 1, fontSize: '0.8rem', padding: '0.5rem' }} onClick={handleNextStep} disabled={activeStepIndex === 3}>
                    Next ▶
                  </button>
                </div>
              )}
              <button className="btn btn-outline" style={{ width: '100%', borderColor: '#ef4444', color: '#ef4444', fontSize: '0.85rem', fontWeight: 'bold' }} onClick={handleStopNavigation}>
                🛑 End Trip & Exit HUD
              </button>
            </div>
          ) : (
            <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #f1f5f9' }}>
              <button 
                onClick={handleStartNavigation} 
                className="btn btn-primary" 
                disabled={useRealGPS && !realGPSCoords}
                style={{ 
                  width: '100%', 
                  background: (useRealGPS && !realGPSCoords) ? '#cbd5e1' : '#22c55e', 
                  color: (useRealGPS && !realGPSCoords) ? '#94a3b8' : 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.5rem', 
                  fontWeight: 'bold', 
                  fontSize: '0.9rem', 
                  padding: '0.8rem',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: (useRealGPS && !realGPSCoords) ? 'not-allowed' : 'pointer'
                }}
              >
                <Navigation size={18} /> 
                {useRealGPS ? '🟢 Start GPS Navigation' : '🤖 Start Simulated Guidance'}
              </button>
              {useRealGPS && !realGPSCoords && (
                <p style={{ fontSize: '0.72rem', color: '#ef4444', textAlign: 'center', marginTop: '6px', marginBottom: 0, fontWeight: 'bold' }}>
                  ⚠️ Please share your live GPS location above to start.
                </p>
              )}
            </div>
          )}

          {/* Turn-by-Turn GPS Directions list */}
          <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #f1f5f9' }}>
            <div 
              onClick={() => setShowDirections(!showDirections)} 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem', color: '#1e293b' }}
              className="mobile-only-flex"
            >
              <span>🧭 GPS Directions Summary</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{showDirections ? 'Hide ▴' : 'Show ▾'}</span>
            </div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#334155', marginBottom: '0.8rem' }} className="desktop-only-block">
              GPS Directions Summary
            </h4>
            <div className={`directions-content ${showDirections ? 'expanded' : 'collapsed'}`}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '0.8rem' }}>
                {modeDetails.steps.map((step, idx) => {
                  const isActive = activeStepIndex === idx && isNavigating;
                  return (
                    <div 
                      key={idx} 
                      style={{ 
                        display: 'flex', gap: '0.6rem', fontSize: '0.8rem', 
                        color: isActive ? '#2563eb' : '#475569', 
                        fontWeight: isActive ? 'bold' : 'normal',
                        background: isActive ? '#eff6ff' : 'transparent',
                        padding: isActive ? '0.5rem' : '0',
                        borderRadius: '8px',
                        transition: 'all 0.2s'
                      }}
                    >
                      <span style={{ color: isActive ? '#2563eb' : '#94a3b8', fontWeight: 'bold' }}>{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Document list checks */}
          {!isNavigating && (
            <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #f1f5f9' }}>
              <div 
                onClick={() => setShowDocsList(!showDocsList)} 
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem', color: '#1e293b' }}
                className="mobile-only-flex"
              >
                <span>📄 Required Documents Checklist</span>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{showDocsList ? 'Hide ▴' : 'Show ▾'}</span>
              </div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#334155', marginBottom: '0.6rem' }} className="desktop-only-block">
                📄 Required Documents Checklist
              </h4>
              <div className={`docs-list-content ${showDocsList ? 'expanded' : 'collapsed'}`}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.8rem', marginBottom: '1rem' }}>
                  {scheme.details.documents.map((doc, idx) => {
                    const uploaded = uploadedDocs[doc];
                    return (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
                        <span style={{ color: '#475569', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc}</span>
                        {uploaded ? (
                          <span style={{ color: '#059669', fontWeight: 'bold', background: '#ecfdf5', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.75rem' }}>✓ Vault Ready</span>
                        ) : (
                          <span style={{ color: '#b45309', fontWeight: 'bold', background: '#fffbeb', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.75rem' }}>⚠️ Bring Original</span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <button onClick={handleDownloadPrefilledForm} className="btn btn-outline" style={{ width: '100%', fontSize: '0.8rem' }}>
                  📥 Download pre-filled summary form
                </button>
              </div>
            </div>
          )}

          {/* List of relevant offices initially shown */}
          {!isNavigating && (
            <div style={{ padding: '1.2rem 1.5rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', marginBottom: '0.6rem' }}>
                Relevant Offices Nearby ({state})
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {filteredOffices.map((office) => (
                  <div 
                    key={office.id} 
                    className={`maps-office-item ${selectedOffice === office.id ? 'active' : ''}`}
                    onClick={() => { setSelectedOffice(office.id); setSimProgress(0); setActiveStepIndex(0); }}
                    style={{ margin: 0 }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span className="maps-office-badge">{office.type}</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>🚗 {modeDetails.distance}</span>
                      </div>
                      <h5 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e293b', margin: '0.3rem 0' }}>
                        {office.name}
                      </h5>
                      <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                        🕒 {office.hours}
                      </p>
                    </div>
                    <ChevronRight size={16} color="#94a3b8" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Map Canvas Container (Custom Vector SVG Google Maps Simulator) */}
      <div className="maps-canvas-container" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Floating Google Maps HUD Search bar */}
        <div className="maps-hud-search" style={{ zIndex: 1000 }}>
          <div style={{ width: '10px', height: '10px', background: isNavigating ? '#22c55e' : '#3b82f6', borderRadius: '50%', marginRight: '8px', boxShadow: '0 0 8px rgba(34,197,94,0.4)', animation: isNavigating ? 'mapPulse 1.5s infinite' : 'none' }}></div>
          <span style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 500 }}>
            {isNavigating ? `📍 GPS Tracking Route: Priyanshi's location moving...` : `Showing nearby offices near Priyanshi's House (${state})`}
          </span>
        </div>

        {/* Re-center camera trigger when autoFollow is disabled */}
        {!autoFollow && (
          <button 
            onClick={() => setAutoFollow(true)} 
            className="maps-recenter-btn"
            style={{ zIndex: 1000 }}
          >
            🎯 Re-center GPS Camera
          </button>
        )}

        <MapContainer
          center={[11.9350, 79.8280]}
          zoom={zoomLevel}
          zoomControl={false}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        >
          <TileLayer
            attribution={isSatellite ? 'Tiles &copy; Esri &mdash; Source: Esri' : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
            url={isSatellite ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
          />

          <MapViewUpdater center={mapCenter} zoom={zoomLevel} autoFollow={autoFollow} dotCoords={dotCoords} />
          <MapEventTracker setAutoFollow={setAutoFollow} />

          {/* Active Navigation Route */}
          <Polyline 
            positions={activeRouteNodes} 
            pathOptions={{ color: '#2563eb', weight: 6, opacity: 0.8, lineCap: 'round', lineJoin: 'round' }} 
          />
          {/* Animated Route overlay */}
          <Polyline 
            positions={activeRouteNodes} 
            pathOptions={{ color: '#60a5fa', weight: 4, opacity: 0.9, dashArray: '10, 15', lineCap: 'round', lineJoin: 'round' }} 
          />

          {/* Start Location (Home / Origin) Marker */}
          <Marker 
            position={[activeRouteNodes[0][0], activeRouteNodes[0][1]]} 
            icon={getEmojiIcon("🏠", 30)}
          >
            <Popup>
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Start Position</div>
            </Popup>
          </Marker>

          {/* User Location Marker (Moving Pulse Emoji) */}
          <Marker
            position={[dotCoords.x, dotCoords.y]}
            icon={getEmojiIcon(userEmoji, 34, dotCoords.heading)}
          >
            <Popup>
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Your Position</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>GPS coordinates: {dotCoords.x.toFixed(5)}, {dotCoords.y.toFixed(5)}</div>
            </Popup>
          </Marker>

          {/* Office Markers */}
          {offices.map((office) => {
            const isSelected = selectedOffice === office.id;
            return (
              <Marker
                key={office.id}
                position={[office.lat, office.lng]}
                icon={getEmojiIcon(isSelected ? "🏛️" : "🏢", isSelected ? 36 : 28)}
                eventHandlers={{
                  click: () => {
                    setSelectedOffice(office.id);
                    setSimProgress(0);
                    setActiveStepIndex(0);
                    setAutoFollow(true);
                  }
                }}
              >
                <Popup>
                  <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#1e293b' }}>{office.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#4b5563', margin: '0.2rem 0' }}>{office.address}</div>
                  <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>🕒 Hours: {office.hours}</div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Floating HUD Controls */}
        <div className="maps-hud-controls" style={{ zIndex: 1000 }}>
          <button onClick={() => setZoomLevel(prev => Math.min(18, prev + 1))} className="maps-hud-btn" title="Zoom In">
            ＋
          </button>
          <button onClick={() => setZoomLevel(prev => Math.max(10, prev - 1))} className="maps-hud-btn" title="Zoom Out">
            －
          </button>
          <button onClick={() => setIsSatellite(!isSatellite)} className="maps-hud-btn" title="Toggle Satellite View" style={{ background: isSatellite ? '#3b82f6' : 'white', color: isSatellite ? 'white' : '#1e293b' }}>
            <Layers size={14} />
          </button>
          <button onClick={() => setRotateDegree(prev => (prev + 90) % 360)} className="maps-hud-btn" title="Rotate Compass" style={{ transform: `rotate(${rotateDegree}deg)`, transition: 'transform 0.3s' }}>
            <Compass size={14} />
          </button>
        </div>
      </div>

      {/* Floating Draggable Bunny Agent Widget */}
      <div 
        className={`floating-bunny-agent ${isDraggingBunny ? 'dragging' : ''}`}
        style={{ 
          position: 'fixed', 
          left: `${bunnyPos.x}px`, 
          top: `${bunnyPos.y}px`, 
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: isDraggingBunny ? 'grabbing' : 'grab',
          userSelect: 'none'
        }}
        onMouseDown={handleBunnyMouseDown}
        onTouchStart={handleBunnyTouchStart}
      >
        {/* Floating Speech Bubble above the bunny */}
        <div className="floating-bunny-bubble">
          <div style={{ fontWeight: 'bold', fontSize: '0.78rem', marginBottom: '0.15rem', color: '#0284c7', display: 'flex', alignItems: 'center', gap: '0.3rem', width: '100%' }}>
            <span>🐰 Hoppy:</span>
            <span style={{ fontSize: '0.65rem', background: '#dbeafe', color: '#1e40af', padding: '0.02rem 0.25rem', borderRadius: '4px', fontWeight: 'normal' }}>Drag Me!</span>
            
            {/* Voice Mute Toggle */}
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                const nextMuted = !isMuted;
                setIsMuted(nextMuted); 
                if (nextMuted && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
              }} 
              style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px', outline: 'none' }}
              title={isMuted ? "Unmute Voice" : "Mute Voice"}
            >
              {isMuted ? <span style={{ fontSize: '0.9rem' }}>🔇</span> : <span style={{ fontSize: '0.9rem' }}>🔊</span>}
            </button>
          </div>
          <p style={{ margin: 0, fontSize: '0.8rem', lineHeight: '1.3', color: '#334155' }}>
            "{bunnyText}"
          </p>
          <button
            onClick={() => speakText(bunnyText)}
            style={{
              marginTop: '8px',
              width: '100%',
              background: '#0284c7',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              padding: '0.35rem 0.6rem',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.3rem',
              boxShadow: '0 2px 5px rgba(2, 132, 199, 0.2)',
              transition: 'all 0.2s',
              outline: 'none'
            }}
          >
            🔊 Read Aloud
          </button>
        </div>
        
        {/* Bunny Circular Avatar Frame (CSS Dynamic Bunny Mascot) */}
        <div className="bunny-avatar-wrapper">
          
          <div className="css-bunny">
            {/* Green Beanie Cap */}
            <div className="bunny-beanie">
              <div className="beanie-pompon"></div>
              <div className="beanie-brim"></div>
            </div>
            
            {/* Ears */}
            <div className="bunny-ear left">
              <div className="inner-ear"></div>
            </div>
            <div className="bunny-ear right">
              <div className="inner-ear"></div>
            </div>
            
            {/* Face & Head */}
            <div className="bunny-face">
              {/* Eyeglasses */}
              <div className="bunny-glasses">
                <div className="lens left"></div>
                <div className="lens right"></div>
                <div className="glasses-bridge"></div>
              </div>
              
              {/* Eyes */}
              <div className="bunny-eye left">
                <div className="eye-pupil"></div>
              </div>
              <div className="bunny-eye right">
                <div className="eye-pupil"></div>
              </div>
              
              {/* Nose and Mouth */}
              <div className="bunny-nose"></div>
              <div className="bunny-mouth">
                <div className="lip left"></div>
                <div className="lip right"></div>
              </div>
              
              {/* Blush Cheeks */}
              <div className="bunny-cheek left"></div>
              <div className="bunny-cheek right"></div>
            </div>
            
            {/* Body and Notepad */}
            <div className="bunny-body">
              <div className="bunny-hand left"></div>
              <div className="bunny-notepad">
                <div className="notepad-cover">
                  <div className="notepad-page"></div>
                </div>
              </div>
              <div className="bunny-hand right"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN APP ROUTER
// ==========================================
export default function App() {
  const [currentView, setCurrentView] = useState('home'); 
  const [userProfile, setUserProfile] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [searchParams, setSearchParams] = useState(null);
  const [initialChatQuery, setInitialChatQuery] = useState('');

  const [uploadedDocs, setUploadedDocs] = useState(() => {
    try {
      const docs = localStorage.getItem('yojnasetu_docs');
      return docs ? JSON.parse(docs) : {};
    } catch (e) {
      return {};
    }
  });

  const saveDocument = (name, docObj) => {
    setUploadedDocs(prev => {
      const updated = { ...prev, [name]: docObj };
      localStorage.setItem('yojnasetu_docs', JSON.stringify(updated));
      return updated;
    });
  };

  const removeDocument = (name) => {
    setUploadedDocs(prev => {
      const updated = { ...prev };
      delete updated[name];
      localStorage.setItem('yojnasetu_docs', JSON.stringify(updated));
      return updated;
    });
  };

  const [modalScanningDoc, setModalScanningDoc] = useState(null);
  const [isModalScanning, setIsModalScanning] = useState(false);
  const [modalScanProgress, setModalScanProgress] = useState(0);

  const startScanningFromModal = (docName) => {
    setModalScanningDoc(docName);
    setIsModalScanning(true);
    setModalScanProgress(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setModalScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsModalScanning(false);
          saveDocument(docName, {
            name: `${docName.replace(/\s+/g, '_')}_Scanned.pdf`,
            size: "380.2 KB",
            type: "application/pdf",
            date: new Date().toLocaleDateString(),
            content: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          });
          setModalScanningDoc(null);
        }, 500);
      }
    }, 200);
  };

  React.useEffect(() => {
    const activeSession = localStorage.getItem('yojnasetuSession');
    if (activeSession) {
      setUserProfile(JSON.parse(activeSession));
    }
  }, []);

  React.useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash || '#/';
      const [pathPart, queryPart] = hash.split('?');
      const path = pathPart.replace(/^#/, '') || '/';
      
      const params = new URLSearchParams(queryPart || '');
      const id = params.get('id') || '';
      const query = params.get('query') || '';
      
      return { path, id, query, params };
    };

    const handleHashChange = () => {
      const { path, id, query, params } = parseHash();
      
      if (path === '/') {
        setCurrentView('home');
      } else if (path === '/auth') {
        setCurrentView('auth');
      } else if (path === '/search') {
        setCurrentView('search');
        const urlSearchParams = {
          category: params.get('category') || '',
          age: params.get('age') || '',
          income: params.get('income') || '',
          state: params.get('state') || '',
          caste: params.get('caste') || ''
        };
        const hasUrlParams = urlSearchParams.category || urlSearchParams.age || urlSearchParams.income;
        if (hasUrlParams) {
          setSearchParams(urlSearchParams);
          sessionStorage.setItem('yojnasetu_searchParams', JSON.stringify(urlSearchParams));
        } else {
          const stored = sessionStorage.getItem('yojnasetu_searchParams');
          if (stored) {
            setSearchParams(JSON.parse(stored));
          }
        }
      } else if (path === '/details' || path === '/copilot' || path === '/offline_guide') {
        setCurrentView(path.replace('/', ''));
        if (id) {
          const scheme = schemesData.find(s => s.id === id);
          if (scheme) {
            setSelectedScheme(scheme);
          }
        }
      } else if (path === '/chat') {
        setCurrentView('chat');
        if (query) {
          setInitialChatQuery(decodeURIComponent(query));
        } else {
          setInitialChatQuery('');
        }
      } else if (path === '/vault') {
        setCurrentView('vault');
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAuthComplete = (profile) => {
    setUserProfile(profile);
    localStorage.setItem('yojnasetuSession', JSON.stringify(profile));
    window.location.hash = '#/';
  };

  const handleViewDetails = (scheme) => {
    window.location.hash = `#/details?id=${scheme.id}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('yojnasetuSession');
    setUserProfile(null);
    window.location.hash = '#/';
  };

  return (
    <div style={{ scrollBehavior: 'smooth' }}>
      {isModalScanning && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 99999
        }}>
          <div style={{ background: 'white', padding: '2.5rem', borderRadius: '24px', maxWidth: '450px', width: '100%', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>Scanning {modalScanningDoc}</h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>Align your document with the camera guide below...</p>
            <div className="camera-scan-container">
              <div className="camera-guideline"></div>
              <div className="scan-laser"></div>
              <div style={{ position: 'absolute', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', bottom: '1rem' }}>Camera Active</div>
            </div>
            <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem' }}>
              <div style={{ height: '100%', background: '#dc2626', width: `${modalScanProgress}%`, transition: 'width 0.2s' }}></div>
            </div>
            <div style={{ fontWeight: 'bold', color: '#dc2626' }}>{modalScanProgress}% Completed</div>
          </div>
        </div>
      )}

      {currentView === 'auth' && <AuthView onComplete={handleAuthComplete} />}
      {currentView === 'home' && <HomeView userProfile={userProfile} onViewDetails={handleViewDetails} onOpenChat={() => { window.location.hash = '#/chat'; }} onLogout={handleLogout} onLogin={() => { window.location.hash = '#/auth'; }} onSearch={(params) => { const q = new URLSearchParams(params).toString(); window.location.hash = `#/search?${q}`; }} onOpenVault={() => { window.location.hash = '#/vault'; }} />}
      {currentView === 'search' && <SearchResultsView searchParams={searchParams} onViewDetails={handleViewDetails} onOpenChat={() => { window.location.hash = '#/chat'; }} onLogout={handleLogout} onBack={() => { window.location.hash = '#/'; }} onOpenVault={() => { window.location.hash = '#/vault'; }} userProfile={userProfile} />}
      {currentView === 'details' && <SchemeDetailsView scheme={selectedScheme} userState={searchParams?.state || userProfile?.state || ''} onBack={() => { const stored = sessionStorage.getItem('yojnasetu_searchParams'); if (stored) { const params = JSON.parse(stored); const q = new URLSearchParams(params).toString(); window.location.hash = `#/search?${q}`; } else { window.location.hash = '#/'; } }} onOpenChat={(query) => { window.location.hash = `#/chat?query=${encodeURIComponent(query)}`; }} uploadedDocs={uploadedDocs} saveDocument={saveDocument} removeDocument={removeDocument} onApplyOnline={() => { window.location.hash = `#/copilot?id=${selectedScheme?.id}`; }} onOpenOfflineGuide={() => { window.location.hash = `#/offline_guide?id=${selectedScheme?.id}`; }} onLogin={() => { window.location.hash = '#/auth'; }} userProfile={userProfile} startScanning={startScanningFromModal} />}
      {currentView === 'chat' && <ChatbotView onBack={() => { window.location.hash = '#/'; }} initialQuery={initialChatQuery} userState={searchParams?.state || userProfile?.state || ''} userProfile={userProfile} />}
      {currentView === 'vault' && <DocumentsVaultView uploadedDocs={uploadedDocs} saveDocument={saveDocument} removeDocument={removeDocument} onBack={() => { window.location.hash = '#/'; }} onLogout={handleLogout} userProfile={userProfile} />}
      {currentView === 'copilot' && <CoPilotPanel scheme={selectedScheme} userProfile={userProfile} uploadedDocs={uploadedDocs} saveDocument={saveDocument} removeDocument={removeDocument} onBack={() => { window.location.hash = `#/details?id=${selectedScheme?.id}`; }} />}
      {currentView === 'offline_guide' && <OfflineGuideView scheme={selectedScheme} userProfile={userProfile} uploadedDocs={uploadedDocs} onBack={() => { window.location.hash = `#/details?id=${selectedScheme?.id}`; }} />}

      {currentView !== 'chat' && currentView !== 'auth' && currentView !== 'copilot' && currentView !== 'offline_guide' && (
        <button 
          className="floating-chat-btn" 
          onClick={() => { window.location.hash = '#/chat'; }}
          title="Ask AI Assistant"
        >
          <MessageSquare size={28} />
        </button>
      )}
    </div>
  );
}

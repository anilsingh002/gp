/**
 * IQA HOSPITALITY ADVISORY
 * Master Interactive Logic & Dynamic Web Application Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initPageViewSwitcher();
  initHeaderScroll();
  initMobileNavigation();
  initAnimatedCounters();
  initFrameworkStepper();
  initAuditScorecard();
  initTrainingSelector();
  initDiagnosticQuiz();
  initModals();
  initContactForm();
});

/* ==========================================================================
   1. DYNAMIC PAGE VIEW SWITCHER (SPA Architecture)
   ========================================================================== */
function initPageViewSwitcher() {
  const views = document.querySelectorAll('.page-view');
  const desktopNavLinks = document.querySelectorAll('.main-nav .nav-link');
  const drawerLinks = document.querySelectorAll('.drawer-links .drawer-link');
  const viewTriggers = document.querySelectorAll('[data-view-target]');

  const viewSeoData = {
    'about': {
      title: 'IQA Hospitality Advisory | Independent Quality & Operations Advisory',
      description: 'Better Operations. Better People. Better Guest Experiences. Independent hospitality quality audits, operational excellence, and leadership training.'
    },
    'audits': {
      title: 'Independent Quality Audits & Scorecards | IQA Hospitality Advisory',
      description: 'Evidence-based quality audits for independent hotels and dining venues. Unannounced mystery-guest evaluations, weighted scorecards, and 30/60/90-day roadmaps.'
    },
    'framework': {
      title: '5-Phase Consulting Framework & Pre-Opening F&B | IQA Hospitality Advisory',
      description: 'Structured 5-step methodology (Discover, Diagnose, Design, Develop, Deliver) and pre-opening restaurant consulting for hospitality properties.'
    },
    'training': {
      title: 'Core Hospitality Training & Leadership Solutions | IQA Hospitality Advisory',
      description: 'Supervisory excellence and practical floor leadership programmes designed for hospitality teams. Service excellence, guest recovery, and train-the-trainer.'
    },
    'education': {
      title: 'Hospitality Education Advisory & Curriculum Review | IQA Hospitality Advisory',
      description: 'Support for hotel schools, universities, and vocational institutes. Practical competency frameworks, curriculum reviews, and guest masterclasses.'
    },
    'diagnostic': {
      title: 'Indicative Self-Assessment & Audit Readiness Index | IQA Hospitality Advisory',
      description: 'Assess your property operational maturity across SOPs, guest journeys, supervisory routines, and audit readiness in under 2 minutes.'
    },
    'disclaimer': {
      title: 'Scope of Engagement and Statutory Disclaimer | IQA Hospitality Advisory',
      description: 'Clear statutory parameters governing IQA Hospitality Advisory consulting engagements, quality audits, training services, and statutory compliance.'
    }
  };

  function switchView(targetViewId) {
    if (targetViewId === 'diagnostic') {
      targetViewId = 'framework';
      setTimeout(() => {
        const diagElem = document.getElementById('framework-diagnostic-section');
        if (diagElem) diagElem.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
    // Default to 'about' if invalid
    const targetElement = document.getElementById(`view-${targetViewId}`);
    if (!targetElement) targetViewId = 'about';

    // Hide all views & show target
    views.forEach(v => {
      v.classList.remove('active');
    });

    const activeView = document.getElementById(`view-${targetViewId}`);
    if (activeView) {
      activeView.classList.add('active');
    }

    // Update desktop nav
    desktopNavLinks.forEach(link => {
      const linkTarget = link.getAttribute('data-view-target');
      if (linkTarget === targetViewId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update drawer nav
    drawerLinks.forEach(link => {
      const linkTarget = link.getAttribute('data-view-target');
      if (linkTarget === targetViewId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update URL hash without jumping
    if (window.location.hash !== `#${targetViewId}`) {
      history.pushState(null, '', `#${targetViewId}`);
    }

    // Dynamic SEO Title & Meta Description update
    const seo = viewSeoData[targetViewId] || viewSeoData['about'];
    document.title = seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', seo.description);

    // Smooth scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Re-trigger counter animation if switched to about view
    if (targetViewId === 'about') {
      triggerCounterAnimation();
    }
  }

  // Handle click on all triggers with data-view-target
  viewTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const target = trigger.getAttribute('data-view-target');
      if (target) {
        switchView(target);
      }
    });
  });

  const backToTopBtn = document.getElementById('back-to-top-link');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Handle URL hash on load
  function handleHash() {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash && document.getElementById(`view-${hash}`)) {
      switchView(hash);
    } else {
      switchView('about');
    }
  }

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash && document.getElementById(`view-${hash}`)) {
      switchView(hash);
    }
  });

  // Initial call
  handleHash();
}

/* ==========================================================================
   2. STICKY HEADER SCROLL SHADOW & SIZING
   ========================================================================== */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-footer button');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}


/* ==========================================================================
   4. ANIMATED NUMBERS COUNTER
   ========================================================================== */
let countersAnimated = false;
function triggerCounterAnimation() {
  const counters = document.querySelectorAll('.counter');
  if (countersAnimated) return;
  countersAnimated = true;

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const duration = 1600;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current).toLocaleString();
      }
    }, stepTime);
  });
}

function initAnimatedCounters() {
  const metricsSection = document.querySelector('.hero-metrics');
  if (!metricsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        triggerCounterAnimation();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(metricsSection);
}


/* ==========================================================================
   5. 5-STEP CONSULTING FRAMEWORK STEPPER
   ========================================================================== */
function initFrameworkStepper() {
  const stepBtns = document.querySelectorAll('.step-nav-btn');
  const stepCards = document.querySelectorAll('.framework-card');

  stepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const stepNum = btn.getAttribute('data-step');

      stepBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      stepCards.forEach(card => {
        card.classList.remove('active');
        if (card.id === `step-card-${stepNum}`) {
          card.classList.add('active');
        }
      });
    });
  });
}


/* ==========================================================================
   6. LIVE SAMPLE AUDIT SCORECARD SIMULATOR
   ========================================================================== */
const sampleAuditScenarios = [
  {
    title: "Simulated Boutique Heritage Hotel (80 Keys)",
    overall: "89.4% (Tier 1 Excellence)",
    departments: [
      { name: "Front Office & Concierge", score: 94 },
      { name: "Housekeeping & Turn-Down", score: 86 },
      { name: "Food & Beverage Dining", score: 92 },
      { name: "Guest Journey & Recovery", score: 95 },
      { name: "Safety, Hygiene & HACCP", score: 98 },
      { name: "Online Reputation & OTA Sync", score: 90 }
    ]
  },
  {
    title: "Simulated Island Resort (140 Keys)",
    overall: "84.2% (Strong / Moderate Gaps)",
    departments: [
      { name: "Front Office & Concierge", score: 90 },
      { name: "Housekeeping & Villa Care", score: 82 },
      { name: "F&B / Pool Club Operations", score: 88 },
      { name: "Guest Journey & Arrival", score: 89 },
      { name: "Safety, Pool & Recreation", score: 94 },
      { name: "Online Reputation & OTA Sync", score: 83 }
    ]
  },
  {
    title: "Simulated High-Volume Urban Hotel (280 Keys)",
    overall: "91.8% (Benchmark Tier)",
    departments: [
      { name: "Front Office Check-in Speed", score: 96 },
      { name: "Housekeeping & Room Linen", score: 89 },
      { name: "All-Day Dining Breakfast Flow", score: 91 },
      { name: "Guest Experience Consistency", score: 94 },
      { name: "Safety & Back-of-House", score: 97 },
      { name: "OTA Sentiment & Response", score: 92 }
    ]
  }
];

let currentScenarioIndex = 0;

function initAuditScorecard() {
  const container = document.getElementById('scorecard-bars-container');
  const refreshBtn = document.getElementById('refresh-sample-data-btn');
  if (!container) return;

  function renderScenario(index) {
    const scenario = sampleAuditScenarios[index];
    const titleElem = document.querySelector('.scorecard-title-group h4');
    const scoreElem = document.querySelector('.scorecard-title-group .score-highlight');

    if (titleElem) titleElem.textContent = scenario.title;
    if (scoreElem) scoreElem.textContent = scenario.overall;

    container.innerHTML = '';
    scenario.departments.forEach(dept => {
      const barItem = document.createElement('div');
      barItem.className = 'score-bar-item';
      barItem.innerHTML = `
        <div class="score-bar-labels">
          <span class="score-dept-name">${dept.name}</span>
          <span class="score-pct-val">${dept.score}%</span>
        </div>
        <div class="score-progress-track">
          <div class="score-progress-fill" style="width: 0%;"></div>
        </div>
      `;
      container.appendChild(barItem);

      setTimeout(() => {
        const fill = barItem.querySelector('.score-progress-fill');
        if (fill) fill.style.width = `${dept.score}%`;
      }, 80);
    });
  }

  renderScenario(0);

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      currentScenarioIndex = (currentScenarioIndex + 1) % sampleAuditScenarios.length;
      renderScenario(currentScenarioIndex);
    });
  }
}


/* ==========================================================================
   7. TRAINING PROGRAM SELECTOR & DEEP DIVE
   ========================================================================== */
const trainingProgramsData = {
  'service-excellence': {
    badge: 'Frontline & Guest Contact Teams',
    title: 'Service Excellence & Guest Journey Mastery',
    duration: '1 to 2 Days Interactive Workshop',
    desc: 'Empowering service teams with intuitive guest anticipation, refined verbal etiquette, empathetic body language, and signature brand storytelling.',
    outcomes: [
      'Mastering first-impression psychology and refined greeting standards',
      'Reading unstated guest cues, micro-expressions, and preferences',
      'Elevating sequence of service from mechanical tasks to memorable moments',
      'Personal empowerment standards for instant issue de-escalation'
    ]
  },
  'hospitality-leadership': {
    badge: 'Department Heads & Senior Managers',
    title: 'Hospitality Leadership & Strategic Agility',
    duration: '2-Day Executive Masterclass',
    desc: 'Developing visionary operational leaders capable of breaking departmental silos, optimizing labor productivity, and sustaining rigorous service culture.',
    outcomes: [
      'Strategic tea modelling and operational cost control without guest compromise',
      'Cross-departmental collaboration between F&B, Rooms, and Sales',
      'Transformational coaching techniques for high-retention teams',
      'Designing self-sustaining quality inspection routines'
    ]
  },
  'supervisory-excellence': {
    badge: 'Shift Supervisors & Assistant Managers',
    title: 'Supervisory Excellence: The Floor Leadership Bridge',
    duration: '2-Day Intensive Coaching',
    desc: 'Targeting the most critical operational layer. Equipping shift leads with daily floor briefing mastery, on-the-spot feedback skills, and standard enforcement.',
    outcomes: [
      'Conducting impactful, energized 10-minute daily pre-shift briefings',
      'The art of "Praise in Public, Coach in Private" floor correction',
      'Shift handover discipline and logbook accuracy',
      'Handling sudden peak volume surges and queue management'
    ]
  },
  'guest-recovery': {
    badge: 'All Guest-Facing Hospitality Staff',
    title: 'Guest Experience & High-Impact Service Recovery',
    duration: '1-Day Intensive Workshop',
    desc: 'Turning guest friction into lifelong brand advocacy through structured recovery frameworks, emotional empathy, and empowered problem resolution.',
    outcomes: [
      'The HEAR Framework (Hear, Empathize, Acknowledge, Resolve)',
      'Frontline financial empowerment thresholds for instant amenities',
      'Documenting and analyzing incident patterns to prevent recurrence',
      'Overcoming personal defensiveness during heated guest confrontations'
    ]
  },
  'fnb-excellence': {
    badge: 'Restaurant, Bar & Banquet Service Staff',
    title: 'F&B Service Excellence & Dining Choreography',
    duration: '2-Day Floor Workshop',
    desc: 'Refining fine-dining etiquette, beverage upselling with grace, kitchen pass communication, and smooth table pacing during peak seatings.',
    outcomes: [
      'Precision sequence of service: table greeting, order pacing, clearing etiquette',
      'Consultative menu pairing and unobtrusive upselling techniques',
      'Kitchen pass coordination: expediting speed and order accuracy'
    ]
  },
  'train-the-trainer': {
    badge: 'Departmental Trainers & Quality Champions',
    title: 'Train-the-Trainer: Sustainable In-House Capability',
    duration: '3-Day Certification Program',
    desc: 'Equipping internal champions to design, deliver, and evaluate micro-training sessions, ensuring operational standards live perpetually.',
    outcomes: [
      'Adult learning theory simplified for fast-paced hospitality teams',
      'Designing engaging 15-minute standard refresher modules',
      'Job Breakdown Sheets (JBS) and 4-step skill instruction methodology',
      'Evaluating training ROI through measurable floor audit scoring'
    ]
  },
  'manager-development': {
    badge: 'Assistant Managers & Operations Leads',
    title: 'Manager Development: Operational Agility & Ownership',
    duration: '2-Day Practical Module',
    desc: 'Transitioning operational supervisors into confident managers with sharp problem-solving capabilities, roster planning, and KPI ownership.',
    outcomes: [
      'Effective delegation, time management, and floor oversight',
      'Conducting constructive 1-on-1 performance and disciplinary reviews',
      'Smart shift scheduling aligned with revenue and occupancy forecasts',
      'Team morale management and reducing early-stage turnover'
    ]
  },
  'custom-programmes': {
    badge: 'Tailored to Specific Property Requirements',
    title: 'Custom Modular Programmes (Audit-Based Design)',
    duration: 'Custom Schedule / Modular Rollout',
    desc: 'Bespoke curricula created directly from your independent quality audit findings, pre-opening countdown milestones, or repositioning objectives.',
    outcomes: [
      'Targeting specific audited vulnerabilities with zero wasted generic content',
      'Modular workshops designed around property shift schedules',
      'Combined floor coaching with classroom roleplay simulation',
      'Post-training verification re-audit to measure exact KPI uplift'
    ]
  }
};

function initTrainingSelector() {
  const trainingItems = document.querySelectorAll('.training-card-item');
  if (!trainingItems.length) return;

  trainingItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // If clicking inside the button or link, do not toggle accordion
      if (e.target.closest('button') || e.target.closest('a')) return;

      const isCurrentlyActive = item.classList.contains('active');

      // Collapse all other cards
      trainingItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBody = other.querySelector('.t-expanded-body');
          if (otherBody) otherBody.style.maxHeight = null;
        }
      });

      // Toggle current card
      if (isCurrentlyActive) {
        item.classList.remove('active');
        const body = item.querySelector('.t-expanded-body');
        if (body) body.style.maxHeight = null;
      } else {
        item.classList.add('active');
        const body = item.querySelector('.t-expanded-body');
        if (body) {
          body.style.maxHeight = (body.scrollHeight + 30) + 'px';
        }
      }
    });
  });

  // Attach inquiry button triggers inside cards
  document.querySelectorAll('[data-training-inquire]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const progTitle = btn.getAttribute('data-training-inquire');
      openContactModalWithPrefill(
        'Training & Leadership Development',
        `I am interested in scheduling or discussing the "${progTitle}" programme for our property team.`,
        'Inquire About This Programm'
      );
    });
  });

  // Ensure initial active card is sized properly
  const initialActive = document.querySelector('.training-card-item.active');
  if (initialActive) {
    const initialBody = initialActive.querySelector('.t-expanded-body');
    if (initialBody) {
      initialBody.style.maxHeight = (initialBody.scrollHeight + 30) + 'px';
    }
  }
}


/* ==========================================================================
   9. INTERACTIVE OPERATIONS DIAGNOSTIC QUIZ
   ========================================================================== */
function initDiagnosticQuiz() {
  const qCards = document.querySelectorAll('.quiz-question-card');
  const prevBtn = document.getElementById('quiz-prev-btn');
  const nextBtn = document.getElementById('quiz-next-btn');
  const progressFill = document.getElementById('quiz-progress-fill');
  const stepIndicators = document.querySelectorAll('.q-step');
  const quizBody = document.getElementById('quiz-container');
  const resultsContainer = document.getElementById('quiz-results');

  let currentQuestion = 1;
  const totalQuestions = 5;
  const userAnswers = {};

  function updateQuizView() {
    qCards.forEach(c => {
      c.classList.remove('active');
      if (+c.getAttribute('data-question') === currentQuestion) {
        c.classList.add('active');
      }
    });

    stepIndicators.forEach(s => {
      const q = +s.getAttribute('data-qstep');
      if (q === currentQuestion) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });

    if (progressFill) {
      progressFill.style.width = `${(currentQuestion / totalQuestions) * 100}%`;
    }

    if (prevBtn) prevBtn.disabled = currentQuestion === 1;
    if (nextBtn) {
      nextBtn.textContent = currentQuestion === totalQuestions ? 'Calculate Index Score →' : 'Next Question →';
    }
  }

  // Record selection on radio change
  document.querySelectorAll('.q-options input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      const qName = e.target.name;
      userAnswers[qName] = +e.target.value;
    });
  });

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const radio = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
      if (!radio) {
        alert('Please select an option to continue the indicative self-assessment.');
        return;
      }
      userAnswers[`q${currentQuestion}`] = +radio.value;

      if (currentQuestion < totalQuestions) {
        currentQuestion++;
        updateQuizView();
      } else {
        calculateAndRenderResults();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentQuestion > 1) {
        currentQuestion--;
        updateQuizView();
      }
    });
  }

  function calculateAndRenderResults() {
    let totalPoints = 0;
    for (let i = 1; i <= totalQuestions; i++) {
      totalPoints += (userAnswers[`q${i}`] || 20);
    }
    // Scale 50..200 to 0..100
    const finalScore = Math.min(100, Math.max(20, Math.round(((totalPoints - 50) / 150) * 80 + 20)));

    if (quizBody) quizBody.style.display = 'none';
    if (resultsContainer) resultsContainer.style.display = 'block';

    const scoreNum = document.getElementById('final-score-num');
    const scoreTier = document.getElementById('final-score-tier');
    const narrative = document.getElementById('results-narrative');
    const barsContainer = document.getElementById('results-breakdown-bars');
    const actionList = document.getElementById('results-action-list');

    if (scoreNum) scoreNum.textContent = finalScore;

    let tierLabel = '';
    let narrativeText = '';
    let actions = [];

    if (finalScore >= 85) {
      tierLabel = 'Tier 1: Benchmark Excellence';
      narrativeText = `Your property demonstrates exceptional operational discipline and benchmark-level consistency. Opportunities remain in institutionalizing supervisor micro-briefings and fine-tuning guest emotional anticipation during peak periods.`;
      actions = [
        'Calibrate internal supervisory scorecards to prevent standards drift.',
        'Implement advanced consultative F&B upselling frameworks.',
        'Schedule a verification mystery audit to prepare for peak season.'
      ];
    } else if (finalScore >= 65) {
      tierLabel = 'Tier 2: Robust Operations with Key Departmental Gaps';
      narrativeText = `Core standards and documentation exist, but inter-departmental consistency varies across shifts. Floor supervisors operate reactively rather than coaching proactively, leading to avoidable service friction.`;
      actions = [
        'Conduct a 360° Independent Quality Audit across Rooms and F&B to identify root friction causes.',
        'Roll out a 2-Day Supervisory Excellence floor briefing and inspection routine.',
        'Establish an empowered 5-minute frontline service recovery threshold.'
      ];
    } else {
      tierLabel = 'Tier 3: High Friction & Operational Risk Profile';
      narrativeText = `Urgent operational vulnerabilities identified in standard adherence, guest service recovery, and supervisor floor leadership. Frontline teams lack clear empowerment and consistent coaching routines.`;
      actions = [
        'Urgent on-site quality audit and SOP gap assessment.',
        'Immediate supervisory leadership intervention to stabilize shift handovers and floor briefings.',
        'Establish standardized daily housekeeping and front office quality inspection checklists.'
      ];
    }

    if (scoreTier) scoreTier.textContent = tierLabel;
    if (narrative) narrative.textContent = narrativeText;

    if (barsContainer) {
      const categories = [
        { name: "SOP & Standards Operationalization", score: Math.min(100, (userAnswers.q1 || 20) * 2.5) },
        { name: "Guest Recovery & Frontline Empowerment", score: Math.min(100, (userAnswers.q2 || 20) * 2.5) },
        { name: "Supervisory Floor Leadership", score: Math.min(100, (userAnswers.q3 || 20) * 2.5) },
        { name: "F&B Sequence & Pass Coordination", score: Math.min(100, (userAnswers.q4 || 20) * 2.5) },
        { name: "Independent Audit Rigour & Tracking", score: Math.min(100, (userAnswers.q5 || 20) * 2.5) }
      ];

      barsContainer.innerHTML = categories.map(cat => `
        <div class="score-bar-item">
          <div class="score-bar-labels">
            <span>${cat.name}</span>
            <span class="score-pct-val">${cat.score}%</span>
          </div>
          <div class="score-progress-track">
            <div class="score-progress-fill" style="width: ${cat.score}%;"></div>
          </div>
        </div>
      `).join('');
    }

    if (actionList) {
      actionList.innerHTML = actions.map(act => `
        <div class="action-item-pill">
          <strong>Priority:</strong> ${act}
        </div>
      `).join('');
    }
  }

  // Transfer diagnostic results to consultation modal
  const transferBtn = document.getElementById('transfer-diagnostic-to-contact');
  if (transferBtn) {
    transferBtn.addEventListener('click', () => {
      const score = document.getElementById('final-score-num')?.textContent || 'N/A';
      const tier = document.getElementById('final-score-tier')?.textContent || '';
      openContactModalWithPrefill(
        'Indicative Self-Assessment & Review',
        `I have completed the Indicative Self-Assessment with an indicative Maturity Score of ${score}/100 (${tier}). I would like to schedule an advisory debrief for our property.`,
        'Request Advisory Debrief'
      );
    });
  }

  // Restart diagnostic
  const restartBtn = document.getElementById('restart-diagnostic-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      currentQuestion = 1;
      document.querySelectorAll('.q-options input[type="radio"]').forEach(r => r.checked = false);
      if (resultsContainer) resultsContainer.style.display = 'none';
      if (quizBody) quizBody.style.display = 'block';
      updateQuizView();
    });
  }
}



/* ==========================================================================
   8. MODALS & ADVISORY CONSULTATION INQUIRY
   ========================================================================== */
function initModals() {
  // Contact Modal
  const contactModal = document.getElementById('contact-modal');
  const closeContactBtn = document.getElementById('close-contact-modal');
  const openContactButtons = [
    { el: document.getElementById('open-contact-modal-btn'), action: 'Get in Touch' },
    { el: document.getElementById('mobile-contact-btn'), action: 'Get in Touch' },
    { el: document.getElementById('drawer-contact-item-btn'), action: 'Get in Touch' },
    { el: document.getElementById('footer-contact-btn'), action: 'Schedule Briefing' }
  ];

  openContactButtons.forEach(item => {
    if (item.el) {
      item.el.addEventListener('click', () => {
        openContactModalWithPrefill(null, null, item.action);
      });
    }
  });

  if (closeContactBtn) {
    closeContactBtn.addEventListener('click', () => {
      closeModal(contactModal);
    });
  }

  // Audit Sample Modal
  const auditModal = document.getElementById('audit-modal');
  const openAuditBtn = document.getElementById('open-sample-report-btn');
  const closeAuditBtn = document.getElementById('close-audit-modal');
  const modalCloseCta = document.getElementById('modal-close-cta');
  const modalAuditCta = document.getElementById('modal-audit-cta');

  if (openAuditBtn) {
    openAuditBtn.addEventListener('click', () => {
      openModal(auditModal);
    });
  }

  if (closeAuditBtn) closeAuditBtn.addEventListener('click', () => closeModal(auditModal));
  if (modalCloseCta) modalCloseCta.addEventListener('click', () => closeModal(auditModal));
  if (modalAuditCta) {
    modalAuditCta.addEventListener('click', () => {
      closeModal(auditModal);
      openContactModalWithPrefill('Independent Quality Audit', 'I would like to commission an Independent Quality Audit for our property.', 'Commission Audit');
    });
  }

  // Global prefill triggers across the entire site (tracks action source button)
  document.querySelectorAll('[data-open-contact-prefill]').forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceName = btn.getAttribute('data-open-contact-prefill');
      let actionSource = btn.textContent.replace(/[→↗]/g, '').trim();
      if (!actionSource) actionSource = 'Get in Touch';
      openContactModalWithPrefill(
        serviceName,
        `I would like to explore your ${serviceName} advisory services for our property.`,
        actionSource
      );
    });
  });

  // Close modals on clicking backdrop
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      closeModal(e.target);
    }
  });

  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(m => closeModal(m));
    }
  });
}

function openModal(modalElem) {
  if (!modalElem) return;
  modalElem.classList.add('open');
  modalElem.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalElem) {
  if (!modalElem) return;
  modalElem.classList.remove('open');
  modalElem.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function openContactModalWithPrefill(serviceType, messageText, actionSource = 'Get in Touch') {
  const contactModal = document.getElementById('contact-modal');
  openModal(contactModal);

  // Set action source in hidden input
  const sourceInput = document.getElementById('contact-source-action');
  if (sourceInput) {
    sourceInput.value = actionSource;
  }

  const modalBadge = document.querySelector('.modal-badge');
  if (modalBadge) {
    modalBadge.textContent = actionSource ? `IQA Advisory · ${actionSource}` : 'IQA Hospitality Advisory';
  }

  // Check matching checkbox
  if (serviceType) {
    document.querySelectorAll('input[name="interest"]').forEach(cb => {
      if (cb.value.toLowerCase().includes(serviceType.toLowerCase()) || serviceType.toLowerCase().includes(cb.value.toLowerCase())) {
        cb.checked = true;
      }
    });
  }

  // Prefill message
  const msgInput = document.getElementById('contact-message');
  if (msgInput && messageText) {
    msgInput.value = messageText;
  }
}

/* ==========================================================================
   9. CONSULTATION INQUIRY FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('consultation-form');
  const successCard = document.getElementById('form-success-message');
  const resetBtn = document.getElementById('reset-form-btn');
  const userNameElem = document.getElementById('success-user-name');
  const mailtoBtn = document.getElementById('mailto-direct-btn');
  const submitBtn = document.getElementById('submit-form-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value.trim() || 'Valued Partner';
    const property = document.getElementById('contact-property')?.value.trim() || 'Property';
    const title = document.getElementById('contact-title')?.value.trim() || 'Hospitality Leader';
    const email = document.getElementById('contact-email')?.value.trim() || '';
    const phone = document.getElementById('contact-phone')?.value.trim() || 'Not provided';
    const location = document.getElementById('contact-location')?.value.trim() || 'Hospitality Venue';
    const message = document.getElementById('contact-message')?.value.trim() || 'Inquiry initiated via web platform.';
    const sourceAction = document.getElementById('contact-source-action')?.value.trim() || 'Get in Touch';

    const selectedInterests = [];
    document.querySelectorAll('input[name="interest"]:checked').forEach(cb => {
      selectedInterests.push(cb.value);
    });

    // 1. Construct prefilled mailto URL to iqahospitalityadvisory@gmail.com
    const mailtoSubject = encodeURIComponent(`[IQA Advisory - ${sourceAction}] ${name} from ${property}`);
    const mailtoBody = encodeURIComponent(
      `IQA HOSPITALITY ADVISORY - CONSULTATION INQUIRY\n` +
      `===================================================\n\n` +
      `Action / Triggering Button: ${sourceAction}\n` +
      `Full Name: ${name}\n` +
      `Job Title / Role: ${title}\n` +
      `Property / Venue Name: ${property}\n` +
      `Location / Property Type: ${location}\n` +
      `Work Email: ${email}\n` +
      `Phone / WhatsApp: ${phone}\n` +
      `Areas of Interest: ${selectedInterests.join(', ') || 'General Consultation'}\n\n` +
      `Operational Context & Objectives:\n` +
      `${message}\n\n` +
      `---------------------------------------------------\n` +
      `Timestamp: ${new Date().toLocaleString()}\n` +
      `Recipient: iqahospitalityadvisory@gmail.com`
    );
    const mailtoUrl = `mailto:iqahospitalityadvisory@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    if (mailtoBtn) {
      mailtoBtn.href = mailtoUrl;
    }

    // 2. Visual loading state on button
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Notification to iqahospitalityadvisory@gmail.com...</span>`;
    }

    // 3. Asynchronously trigger email to iqahospitalityadvisory@gmail.com via FormSubmit AJAX
    const payload = {
      _subject: `[IQA Advisory - ${sourceAction}] ${name} (${property})`,
      _replyto: email,
      _cc: 'iqahospitalityadvisory@gmail.com',
      _template: 'table',
      _captcha: 'false',
      'Triggered Button / Action': sourceAction,
      'Full Name': name,
      'Job Title / Role': title,
      'Work Email': email,
      'Phone / WhatsApp': phone,
      'Property / Venue': property,
      'Property Type / Location': location,
      'Areas of Interest': selectedInterests.join(', ') || 'General Advisory',
      'Operational Context & Objectives': message,
      'Submission Timestamp': new Date().toLocaleString()
    };

    try {
      await fetch('https://formsubmit.co/ajax/iqahospitalityadvisory@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      console.log('Consultation email triggered successfully to iqahospitalityadvisory@gmail.com');
    } catch (err) {
      console.warn('FormSubmit background notification error (fallback active):', err);
    }

    // 4. Also trigger local email client
    setTimeout(() => {
      try {
        window.location.href = mailtoUrl;
      } catch (e) {
        console.log('Mail client invocation:', e);
      }
    }, 450);

    // 5. Update and show success card
    if (userNameElem) {
      userNameElem.textContent = `Thank you, ${name} (${title} at ${property}).`;
    }

    form.style.display = 'none';
    if (successCard) successCard.style.display = 'block';

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Send Consultation Request</span>`;
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      if (successCard) successCard.style.display = 'none';
    });
  }
}

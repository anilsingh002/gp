/**
 * GAURAV PANDEY | Hospitality Operations & Performance Consultant
 * Master Interactive Logic & Dynamic Web Application Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initThemeToggle();
  initMobileNavigation();
  initAnimatedCounters();
  initFrameworkStepper();
  initAuditScorecard();
  initTrainingSelector();
  initServiceFilters();
  initDiagnosticQuiz();
  initRoiCalculator();
  initModals();
  initContactForm();
  initSmoothScrollLinks();
});

/* ==========================================================================
   1. LIVE SINGAPORE TIME & REGIONAL STATUS
   ========================================================================== */
function initLiveClock() {
  const timeDisplay = document.getElementById('live-time-display');
  if (!timeDisplay) return;

  function updateTime() {
    const now = new Date();
    // Format for Singapore Standard Time (SGT, UTC+8)
    const options = {
      timeZone: 'Asia/Singapore',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const formatter = new Intl.DateTimeFormat([], options);
    timeDisplay.textContent = `Singapore (SGT): ${formatter.format(now)}`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/* ==========================================================================
   2. THEME TOGGLE (DARK / LIGHT LUXURY)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('gp_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('gp_theme', newTheme);
  });
}

/* ==========================================================================
   3. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-footer a');

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
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1800; // ms
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
    });
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.hero-metrics');
  if (metricsSection) observer.observe(metricsSection);
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
    title: "Simulated Island Luxury Resort (150 Villas)",
    overall: "84.2% (Strong / Moderate Gaps)",
    departments: [
      { name: "Front Office & Concierge", score: 90 },
      { name: "Housekeeping & Villa Care", score: 82 },
      { name: "F&B / Beach Club Operations", score: 88 },
      { name: "Guest Journey & Transfers", score: 89 },
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
      }, 100);
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
    desc: 'Empowering service teams with intuitive guest anticipation, refined verbal communication, empathetic body language, and signature brand storytelling.',
    outcomes: [
      'Mastering first-impression psychology and 3-step luxury greeting',
      'Reading unstated guest cues, micro-expressions, and preferences',
      'Elevating sequence of service from mechanical tasks to memorable moments',
      'Personal empowerment standards for instant issue de-escalation'
    ]
  },
  'hospitality-leadership': {
    badge: 'Department Heads, GMs & Senior Managers',
    title: 'Hospitality Leadership & Strategic Agility',
    duration: '2-Day Executive Masterclass',
    desc: 'Developing visionary operational leaders capable of breaking departmental silos, optimizing labor productivity, and sustaining rigorous service culture.',
    outcomes: [
      'Strategic labor modeling and operational cost control without guest compromise',
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
      'Frontline financial empowerment thresholds for instant comps and amenities',
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
      'Kitchen pass coordination: expediting speed and order accuracy',
      'Wine & cocktail presentation standards and glassware care'
    ]
  },
  'train-the-trainer': {
    badge: 'Departmental Trainers & Quality Champions',
    title: 'Train-the-Trainer: Sustainable In-House Capability',
    duration: '3-Day Certification Program',
    desc: 'Certifying internal champions to design, deliver, and evaluate micro-training sessions, ensuring operational standards live perpetually.',
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
    duration: 'Custom Schedule / Multi-Week Rollout',
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
  const deepdiveBody = document.getElementById('deepdive-content');
  if (!deepdiveBody) return;

  function renderDeepdive(key) {
    const data = trainingProgramsData[key];
    if (!data) return;

    deepdiveBody.innerHTML = `
      <div>
        <span class="deepdive-badge">${data.badge}</span>
        <h3 class="deepdive-title">${data.title}</h3>
        <p class="deepdive-desc">${data.desc}</p>
        <div class="deepdive-outcomes-title">Key Learning Outcomes & Impact</div>
        <ul class="deepdive-outcomes">
          ${data.outcomes.map(o => `<li>${o}</li>`).join('')}
        </ul>
      </div>
      <div>
        <a href="#contact" class="btn btn-primary btn-sm btn-block" data-training-inquire="${data.title}">
          Inquire About This Programme →
        </a>
      </div>
    `;

    // Attach dynamic click to CTA
    const cta = deepdiveBody.querySelector('[data-training-inquire]');
    if (cta) {
      cta.addEventListener('click', (e) => {
        prefillContactForTraining(data.title);
      });
    }
  }

  // Initial render
  renderDeepdive('service-excellence');

  trainingItems.forEach(item => {
    item.addEventListener('click', () => {
      trainingItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const key = item.getAttribute('data-program');
      renderDeepdive(key);
    });
  });
}

function prefillContactForTraining(programName) {
  const msgInput = document.getElementById('contact-message');
  const trainingCheckbox = document.querySelector('input[name="interest"][value="Training & Leadership Development"]');
  if (trainingCheckbox) trainingCheckbox.checked = true;
  if (msgInput) {
    msgInput.value = `I am interested in scheduling or discussing the "${programName}" programme for our property teams.`;
  }
}

/* ==========================================================================
   8. SERVICES PORTFOLIO CATEGORY FILTER
   ========================================================================== */
function initServiceFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      serviceCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Pre-select via data attribute on overview links
  document.querySelectorAll('[data-service-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
      const filterVal = link.getAttribute('data-service-filter');
      const targetBtn = document.querySelector(`.filter-btn[data-filter="${filterVal}"]`);
      if (targetBtn) targetBtn.click();
    });
  });

  // Contact pre-selection from service cards
  document.querySelectorAll('[data-service-select]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const serviceName = btn.getAttribute('data-service-select');
      const checkboxes = document.querySelectorAll('input[name="interest"]');
      checkboxes.forEach(cb => {
        if (cb.value.includes(serviceName) || serviceName.includes(cb.value)) {
          cb.checked = true;
        }
      });
    });
  });
}

/* ==========================================================================
   9. INTERACTIVE OPERATIONS DIAGNOSTIC QUIZ
   ========================================================================== */
function initDiagnosticQuiz() {
  let currentQuestion = 1;
  const totalQuestions = 5;
  const answers = {};

  const prevBtn = document.getElementById('quiz-prev-btn');
  const nextBtn = document.getElementById('quiz-next-btn');
  const progressFill = document.getElementById('quiz-progress-fill');
  const stepIndicators = document.querySelectorAll('.q-step');
  const questionCards = document.querySelectorAll('.quiz-question-card');
  const quizBody = document.getElementById('quiz-body');
  const quizResults = document.getElementById('quiz-results');

  // Option selection handling
  document.querySelectorAll('.q-option-label').forEach(label => {
    label.addEventListener('click', () => {
      const radio = label.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
        const qNum = radio.name.replace('q', '');
        answers[qNum] = parseInt(radio.value, 10);

        // Update styling
        const parentCard = label.closest('.quiz-question-card');
        if (parentCard) {
          parentCard.querySelectorAll('.q-option-label').forEach(l => l.classList.remove('selected'));
          label.classList.add('selected');
        }
      }
    });
  });

  function showQuestion(qNum) {
    questionCards.forEach(card => {
      card.classList.remove('active');
      if (parseInt(card.getAttribute('data-question'), 10) === qNum) {
        card.classList.add('active');
      }
    });

    // Update progress
    const pct = (qNum / totalQuestions) * 100;
    if (progressFill) progressFill.style.width = `${pct}%`;

    stepIndicators.forEach((step, idx) => {
      if (idx + 1 === qNum) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    if (prevBtn) prevBtn.disabled = qNum === 1;
    if (nextBtn) {
      nextBtn.textContent = qNum === totalQuestions ? 'Calculate Maturity Score →' : 'Next Question →';
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentQuestion > 1) {
        currentQuestion--;
        showQuestion(currentQuestion);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      // Check if current question is answered
      if (!answers[currentQuestion]) {
        // default select option 2 if not selected
        const currentCard = document.querySelector(`.quiz-question-card[data-question="${currentQuestion}"]`);
        const firstRadio = currentCard.querySelector('input[type="radio"]');
        if (firstRadio) {
          firstRadio.checked = true;
          answers[currentQuestion] = parseInt(firstRadio.value, 10);
        }
      }

      if (currentQuestion < totalQuestions) {
        currentQuestion++;
        showQuestion(currentQuestion);
      } else {
        // Calculate & display results
        calculateAndDisplayResults();
      }
    });
  }

  function calculateAndDisplayResults() {
    let totalScore = 0;
    for (let i = 1; i <= totalQuestions; i++) {
      totalScore += (answers[i] || 20);
    }
    // Max is 5 * 40 = 200 => scale to 100
    const scaledScore = Math.round((totalScore / 200) * 100);

    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) quizContainer.style.display = 'none';
    if (quizResults) quizResults.style.display = 'block';

    const scoreNumElem = document.getElementById('final-score-num');
    const scoreTierElem = document.getElementById('final-score-tier');
    const narrativeElem = document.getElementById('results-narrative');
    const actionListElem = document.getElementById('results-action-list');
    const barsElem = document.getElementById('results-breakdown-bars');

    if (scoreNumElem) scoreNumElem.textContent = scaledScore;

    let tier = '';
    let narrative = '';
    let actions = [];

    if (scaledScore >= 80) {
      tier = 'Tier 1: High Operational Maturity';
      narrative = 'Your property displays strong foundations with structured SOPs and solid guest awareness. To reach world-class luxury consistency, focus on institutionalizing independent mystery audits and empowering shift supervisors to lead floor briefings daily.';
      actions = [
        'Establish biannual independent quality mystery audits to eliminate hidden blindspots.',
        'Implement advanced Train-the-Trainer certification for department heads.',
        'Refine F&B dining sequence and luxury beverage upselling choreography.'
      ];
    } else if (scaledScore >= 55) {
      tier = 'Tier 2: Moderate Friction / Actionable Gaps';
      narrative = 'Your operation possesses capable talent, but suffers from procedural inconsistency between shifts and reactive service recovery. Floor supervisors frequently step in as individual workers rather than coaching frontline teams.';
      actions = [
        'Execute a comprehensive 360° Independent Quality & Operations Audit.',
        'Conduct a 2-day Supervisory Excellence Workshop for all shift leads.',
        'Modernize departmental SOP checklists and establish 5-minute guest recovery empowerment.'
      ];
    } else {
      tier = 'Tier 3: Critical Vulnerability / Priority Overhaul';
      narrative = 'Your property is experiencing significant service friction, unstandardized workflows, and supervisory gaps that are likely depressing online review scores and inflating labor turnover costs.';
      actions = [
        'Urgent on-site operational diagnosis and baseline quality scorecard mapping.',
        'Full SOP review and digitization across Front Office, Housekeeping, and F&B.',
        'Roll out a prioritized 30/60/90-day stabilization roadmap with leadership coaching.'
      ];
    }

    if (scoreTierElem) scoreTierElem.textContent = tier;
    if (narrativeElem) narrativeElem.textContent = narrative;

    if (actionListElem) {
      actionListElem.innerHTML = actions.map((act, i) => `
        <div class="action-item">
          <span class="action-num">0${i + 1}</span>
          <span>${act}</span>
        </div>
      `).join('');
    }

    if (barsElem) {
      const dimensions = [
        { name: 'SOPs & Procedural Adherence', score: (answers[1] || 20) * 2.5 },
        { name: 'Guest Journey & Recovery', score: (answers[2] || 20) * 2.5 },
        { name: 'Supervisory Leadership Strength', score: (answers[3] || 20) * 2.5 },
        { name: 'F&B Operational Workflow', score: (answers[4] || 20) * 2.5 },
        { name: 'Quality Audit Tracking', score: (answers[5] || 20) * 2.5 }
      ];

      barsElem.innerHTML = dimensions.map(d => `
        <div class="score-bar-item">
          <div class="score-bar-labels">
            <span class="score-dept-name">${d.name}</span>
            <span class="score-pct-val">${Math.round(d.score)}%</span>
          </div>
          <div class="score-progress-track">
            <div class="score-progress-fill" style="width: ${d.score}%;"></div>
          </div>
        </div>
      `).join('');
    }

    // Transfer button
    const transferBtn = document.getElementById('transfer-diagnostic-to-contact');
    if (transferBtn) {
      transferBtn.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });

        const msgInput = document.getElementById('contact-message');
        if (msgInput) {
          msgInput.value = `Diagnostic Assessment Results:\n• Overall Maturity Score: ${scaledScore}/100 (${tier})\n• Focus Areas: SOPs (${dimensions[0].score}%), Supervisory (${dimensions[2].score}%), Audits (${dimensions[4].score}%)\n\nI would like to schedule a 30-minute debrief with Gaurav Pandey to discuss practical next steps.`;
        }
      });
    }

    // Restart button
    const restartBtn = document.getElementById('restart-diagnostic-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        if (quizResults) quizResults.style.display = 'none';
        if (quizContainer) quizContainer.style.display = 'block';
        currentQuestion = 1;
        showQuestion(1);
      });
    }
  }
}

/* ==========================================================================
   10. INTERACTIVE ROI & AUDIT VALUE CALCULATOR
   ========================================================================== */
function initRoiCalculator() {
  const propType = document.getElementById('prop-type');
  const propKeys = document.getElementById('prop-keys');
  const propAdr = document.getElementById('prop-adr');
  const propOcc = document.getElementById('prop-occupancy');

  const keysValDisplay = document.getElementById('keys-val-display');
  const adrValDisplay = document.getElementById('adr-val-display');
  const occValDisplay = document.getElementById('occ-val-display');

  const revUpliftElem = document.getElementById('roi-rev-uplift');
  const wasteSavingsElem = document.getElementById('roi-waste-savings');
  const retentionSavingsElem = document.getElementById('roi-retention-savings');
  const totalImpactElem = document.getElementById('roi-total-impact');

  if (!propKeys || !propAdr || !propOcc) return;

  function calculate() {
    const keys = parseInt(propKeys.value, 10);
    const adr = parseInt(propAdr.value, 10);
    const occ = parseInt(propOcc.value, 10) / 100;

    if (keysValDisplay) keysValDisplay.textContent = `${keys} Keys`;
    if (adrValDisplay) adrValDisplay.textContent = `$${adr}`;
    if (occValDisplay) occValDisplay.textContent = `${Math.round(occ * 100)}%`;

    // Annual room revenue baseline
    const annualRoomNights = keys * 365 * occ;
    const baseRevenue = annualRoomNights * adr;

    // Projected Uplifts:
    // 1. Review Rank Uplift (+0.3 to +0.5 stars boosts RevPAR by ~3.2%)
    const revUplift = Math.round(baseRevenue * 0.032);

    // 2. Labor Productivity & Operational Waste Reduction (~$600 per key/year)
    const wasteSavings = Math.round(keys * 580);

    // 3. Staff Retention & Onboarding Velocity (~$450 per key/year)
    const retentionSavings = Math.round(keys * 420);

    const totalImpact = revUplift + wasteSavings + retentionSavings;

    function fmt(num) {
      return '+$' + num.toLocaleString();
    }

    if (revUpliftElem) revUpliftElem.textContent = fmt(revUplift);
    if (wasteSavingsElem) wasteSavingsElem.textContent = fmt(wasteSavings);
    if (retentionSavingsElem) retentionSavingsElem.textContent = fmt(retentionSavings);
    if (totalImpactElem) totalImpactElem.textContent = fmt(totalImpact) + ' / year';
  }

  propKeys.addEventListener('input', calculate);
  propAdr.addEventListener('input', calculate);
  propOcc.addEventListener('input', calculate);

  if (propType) {
    propType.addEventListener('change', () => {
      const val = propType.value;
      if (val === 'boutique') {
        propKeys.value = 65;
        propAdr.value = 280;
        propOcc.value = 75;
      } else if (val === 'resort') {
        propKeys.value = 160;
        propAdr.value = 420;
        propOcc.value = 78;
      } else if (val === 'restaurant') {
        propKeys.value = 40; // represents equivalent covers
        propAdr.value = 140;
        propOcc.value = 82;
      } else if (val === 'hotel-chain') {
        propKeys.value = 320;
        propAdr.value = 210;
        propOcc.value = 70;
      }
      calculate();
    });
  }

  calculate();
}

/* ==========================================================================
   11. MODAL WINDOWS (AUDIT PREVIEW & ARTICLES)
   ========================================================================== */
const articlesData = {
  '1': {
    title: 'The 30/60/90-Day Audit Roadmap: Turning Inspection into Lasting Culture',
    category: 'Quality Audits & Standards',
    content: `
      <p>Independent mystery audits in the hospitality sector often follow a familiar, tragic arc: an external expert spends three days scrutinizing the property, produces a 90-page binder filled with red flags, presents the executive summary to the General Manager, and within three weeks, the binder sits forgotten on a high shelf.</p>
      
      <h4>Why Most Quality Audits Fail to Create Lasting Change</h4>
      <p>Traditional audits treat quality as a static snapshot rather than a behavioral muscle. Frontline staff view auditors with anxiety, supervisors become defensive, and management tries to fix 60 issues simultaneously without clear prioritization or operational accountability.</p>

      <h4>The 3-Phase Transformation Architecture</h4>
      <p>To convert diagnostic findings into permanent operational muscle, Gaurav Pandey employs a phased 30/60/90-day roadmap:</p>
      
      <p><strong>Days 1–30: Elimination of Friction & Daily Checklists</strong><br>
      Immediate correction of procedural lapses that require zero capital investment. Housekeeping turn-down protocols, front desk arrival greetings, and shift handover logbooks are standardized into one-page visual aids.</p>

      <p><strong>Days 31–60: Supervisory Coaching & Empowerment</strong><br>
      Middle management undergoes targeted floor coaching. Shift leads are trained to conduct high-energy 10-minute briefings and practice immediate on-the-spot coaching rather than waiting for monthly reviews.</p>

      <p><strong>Days 61–90: Verification Re-Audit & Cultural Calibration</strong><br>
      A follow-up mini audit measures specific delta improvements, rewarding top-performing teams and embedding internal supervisory audit routines to safeguard standards forever.</p>
    `
  },
  '2': {
    title: 'Bridging the Supervisory Gap in Southeast Asian Luxury Hospitality',
    category: 'Leadership & People Development',
    content: `
      <p>Throughout hotels and dining venues across Singapore, Bali, Bangkok, and Kuala Lumpur, the most vulnerable link in the operational chain is almost always the same: <em>The First-Time Shift Supervisor</em>.</p>

      <h4>The "Star Performer" Promotion Trap</h4>
      <p>Typically, the best waiter becomes the F&B supervisor; the fastest room attendant becomes the housekeeping floor supervisor. Yet the skill set required to clean a room or serve a table is entirely different from the psychological and operational skills required to lead, coach, and hold peers accountable.</p>

      <h4>Transforming Firefighters into Floor Coaches</h4>
      <p>When sudden guest rushes occur, untrained supervisors instinctively revert to doing frontline tasks themselves ("firefighting"), leaving the wider floor unmanaged and quality uninspected.</p>

      <p>Our Supervisory Excellence curriculum focuses on three core shifts:</p>
      <p>1. <strong>The 80/20 Floor Presence Rule:</strong> Spending 80% of shift time observing, anticipating bottlenecks, and praising standards.<br>
      2. <strong>Constructive Real-Time Feedback:</strong> Mastering non-threatening floor correction methods.<br>
      3. <strong>Incident De-escalation:</strong> Equipping supervisors with financial authority and emotional intelligence to resolve guest friction before it becomes an online review.</p>
    `
  },
  '3': {
    title: 'Modern F&B Engineering: Balancing Guest Delight with Labor Productivity',
    category: 'F&B & Restaurant Operations',
    content: `
      <p>With rising labor costs, tighter work pass regulations, and shifting diner expectations across Southeast Asia, food & beverage operators face a delicate dilemma: how to elevate guest intimacy and culinary sophistication without ballooning labor expenses.</p>

      <h4>Engineering the Kitchen-to-Floor Pass</h4>
      <p>Over 70% of restaurant guest dissatisfaction stems not from food quality, but from pacing friction: delayed drinks, cold dishes lingering under heat lamps, and erratic ticket times during peak seatings.</p>

      <h4>Strategic Interventions for High-Performance Dining</h4>
      <p>By restructuring the service flow, establishing clear station zoning, and deploying dedicated "expediter" protocols between kitchen and service runners, venues achieve up to 25% faster table turns while simultaneously increasing guest satisfaction scores.</p>

      <p>Furthermore, training waitstaff in consultative, story-driven menu guidance increases beverage and dessert average check sizes by 14–18% without feeling pushy.</p>
    `
  }
};

function initModals() {
  // Audit Modal
  const openAuditBtn = document.getElementById('open-sample-report-btn');
  const closeAuditBtn = document.getElementById('close-audit-modal');
  const modalCloseCta = document.getElementById('modal-close-cta');
  const modalAuditCta = document.getElementById('modal-audit-cta');
  const auditModal = document.getElementById('audit-modal');

  function openModal(modal) {
    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (openAuditBtn) openAuditBtn.addEventListener('click', () => openModal(auditModal));
  if (closeAuditBtn) closeAuditBtn.addEventListener('click', () => closeModal(auditModal));
  if (modalCloseCta) modalCloseCta.addEventListener('click', () => closeModal(auditModal));
  if (modalAuditCta) {
    modalAuditCta.addEventListener('click', () => {
      closeModal(auditModal);
      const auditCb = document.querySelector('input[name="interest"][value="Independent Quality Audit"]');
      if (auditCb) auditCb.checked = true;
    });
  }

  // Article Modal
  const articleModal = document.getElementById('article-modal');
  const closeArticleModalBtn = document.getElementById('close-article-modal');
  const closeArticleBtn = document.getElementById('close-article-btn');
  const articleCategoryElem = document.getElementById('article-modal-category');
  const articleTitleElem = document.getElementById('article-modal-title');
  const articleContentElem = document.getElementById('article-modal-content');

  document.querySelectorAll('.read-article-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const artId = btn.getAttribute('data-article');
      const data = articlesData[artId];
      if (data) {
        if (articleCategoryElem) articleCategoryElem.textContent = data.category;
        if (articleTitleElem) articleTitleElem.textContent = data.title;
        if (articleContentElem) articleContentElem.innerHTML = data.content;
        openModal(articleModal);
      }
    });
  });

  if (closeArticleModalBtn) closeArticleModalBtn.addEventListener('click', () => closeModal(articleModal));
  if (closeArticleBtn) closeArticleBtn.addEventListener('click', () => closeModal(articleModal));

  // Click outside to close
  [auditModal, articleModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
      });
    }
  });

  // Esc key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(auditModal);
      closeModal(articleModal);
    }
  });
}

/* ==========================================================================
   12. CONSULTATION CONTACT FORM LOGIC
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('consultation-form');
  const successCard = document.getElementById('form-success-message');
  const userNameElem = document.getElementById('success-user-name');
  const resetBtn = document.getElementById('reset-form-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const title = document.getElementById('contact-title').value.trim();
    const property = document.getElementById('contact-property').value.trim();

    if (userNameElem) {
      userNameElem.textContent = `Thank you, ${name} (${title} at ${property}).`;
    }

    form.style.display = 'none';
    if (successCard) successCard.style.display = 'block';
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      if (successCard) successCard.style.display = 'none';
    });
  }
}

/* ==========================================================================
   13. SMOOTH SCROLLING & ACTIVE SECTION HIGHLIGHTING
   ========================================================================== */
function initSmoothScrollLinks() {
  const navLinks = document.querySelectorAll('.nav-link, .brand-logo, .footer-links a, .hero-actions a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Active section observer for main nav
  const sections = document.querySelectorAll('section[id], header[id]');
  const mainNavLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    mainNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

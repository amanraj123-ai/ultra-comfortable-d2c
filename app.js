// Initialize Feather Icons
feather.replace();

// --- 1. Preloader Screen ---
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  // Delay slightly to showcase the smooth calibration calibration loop
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 800);
  }, 1200);
});

// --- 2. Custom Cursor Glow & Coordinate Tracking ---
const mouseGlow = document.getElementById('mouse-glow');
window.addEventListener('mousemove', (e) => {
  mouseGlow.style.left = `${e.clientX}px`;
  mouseGlow.style.top = `${e.clientY}px`;
});

// --- 3. Viewport Scroll Reveal Observer ---
const revealElements = document.querySelectorAll('.reveal-element');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// --- 4. Header Scroll State ---
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Navigation Scroll Helper
function scrollToQuiz() {
  const quizSection = document.getElementById('quiz');
  if (quizSection) {
    quizSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// --- 5. Exploded Anatomy Hotspots ---
const hotspots = document.querySelectorAll('.hotspot');
const anatomyFeatures = document.querySelectorAll('.anatomy-feature');

hotspots.forEach(hotspot => {
  hotspot.addEventListener('mouseenter', () => {
    const layer = hotspot.getAttribute('data-layer');
    activateFeature(layer);
  });
});

anatomyFeatures.forEach(feature => {
  feature.addEventListener('mouseenter', () => {
    const layer = feature.getAttribute('data-layer');
    activateFeature(layer);
  });
});

function activateFeature(layerNum) {
  anatomyFeatures.forEach(f => f.classList.remove('active'));
  hotspots.forEach(h => h.style.transform = 'scale(1)');

  const targetFeature = document.querySelector(`.anatomy-feature[data-layer="${layerNum}"]`);
  const targetHotspot = document.querySelector(`.hotspot[data-layer="${layerNum}"]`);

  if (targetFeature) targetFeature.classList.add('active');
  if (targetHotspot) targetHotspot.style.transform = 'scale(1.4)';
}

// --- 6. Companion App Simulator Logic ---
const appSimulatorData = {
  sleep: {
    score: 89,
    label: 'Sleep Index',
    color: '#00e5ff',
    glowColor: 'radial-gradient(circle, rgba(0, 229, 255, 0.06) 0%, transparent 70%)',
    description: 'Your deep sleep stage was extended by 22 minutes last night. Excellent recovery rate.',
    chartTitle: 'Deep Sleep Cycles',
    chartMetric: '2.8 hrs',
    bars: [
      { label: 'Mon', value: 70 },
      { label: 'Tue', value: 85 },
      { label: 'Wed', value: 90 },
      { label: 'Thu', value: 65 },
      { label: 'Fri', value: 80 },
      { label: 'Sat', value: 95 },
      { label: 'Sun', value: 89 }
    ]
  },
  recovery: {
    score: 94,
    label: 'Recovery Score',
    color: '#ae47ff',
    glowColor: 'radial-gradient(circle, rgba(174, 71, 255, 0.06) 0%, transparent 70%)',
    description: 'HRV is at 88ms (high) and resting heart rate dropped to 48 bpm. You are primed for high strain today.',
    chartTitle: 'Average HRV Trend',
    chartMetric: '88 ms',
    bars: [
      { label: 'Mon', value: 60 },
      { label: 'Tue', value: 75 },
      { label: 'Wed', value: 88 },
      { label: 'Thu', value: 94 },
      { label: 'Fri', value: 82 },
      { label: 'Sat', value: 90 },
      { label: 'Sun', value: 94 }
    ]
  },
  circadian: {
    score: 84,
    label: 'Circadian Index',
    color: '#00ff87',
    glowColor: 'radial-gradient(circle, rgba(0, 255, 135, 0.06) 0%, transparent 70%)',
    description: 'Sunlight exposure alignment was optimal. Coffee curfew respected (8.5h before sleep).',
    chartTitle: 'Alignment Score',
    chartMetric: 'Optimal',
    bars: [
      { label: 'Mon', value: 80 },
      { label: 'Tue', value: 75 },
      { label: 'Wed', value: 85 },
      { label: 'Thu', value: 90 },
      { label: 'Fri', value: 78 },
      { label: 'Sat', value: 82 },
      { label: 'Sun', value: 84 }
    ]
  }
};

const simTabBtns = document.querySelectorAll('.sim-tab-btn');
const radialFill = document.getElementById('radial-fill');
const scoreNumber = document.getElementById('score-number');
const scoreLabel = document.getElementById('score-label');
const scoreDescription = document.getElementById('score-card-description');
const chartTitle = document.getElementById('chart-title');
const chartMetric = document.getElementById('chart-metric');
const barChartContainer = document.getElementById('bar-chart-container');

simTabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    simTabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tabName = btn.getAttribute('data-tab');
    updateSimulator(tabName);
  });
});

function updateSimulator(tabName) {
  const data = appSimulatorData[tabName];
  if (!data) return;

  // Sync cursor glow color with active health tab theme
  mouseGlow.style.background = data.glowColor;

  // Animate Radial Score Circle (Circumference: 2 * PI * 60 ~ 377)
  const circumference = 2 * Math.PI * 60;
  const offset = circumference - (data.score / 100) * circumference;
  
  radialFill.style.strokeDashoffset = offset;
  radialFill.style.stroke = data.color;

  // Update Texts
  scoreNumber.innerText = data.score;
  scoreLabel.innerText = data.label;
  scoreDescription.innerText = data.description;
  chartTitle.innerText = data.chartTitle;
  chartMetric.innerText = data.chartMetric;

  // Render Bar Charts
  barChartContainer.innerHTML = '';
  data.bars.forEach(bar => {
    const barWrapper = document.createElement('div');
    barWrapper.className = 'chart-bar-wrapper';

    const barEl = document.createElement('div');
    barEl.className = 'chart-bar';
    barEl.style.backgroundColor = data.color;
    barEl.style.height = '0%';

    const labelEl = document.createElement('span');
    labelEl.className = 'chart-label';
    labelEl.innerText = bar.label;

    barWrapper.appendChild(barEl);
    barWrapper.appendChild(labelEl);
    barChartContainer.appendChild(barWrapper);

    setTimeout(() => {
      barEl.style.height = `${bar.value}%`;
    }, 50);
  });
}

// Initial Simulator State
updateSimulator('sleep');


// --- 7. REDESIGN: PowerPlugs Customizer Configurator ---
const powerPlugStates = {
  caffeine: true, // Default installed
  jetlag: false,
  waste: false
};

const plugDefinitions = {
  caffeine: {
    title: 'Caffeine Curfew',
    metric: 'Adenosine Clear',
    color: 'green',
    text: 'Caffeine threshold active. Restrict beverage intake after 2:40 PM to allow restful deep sleep staging.'
  },
  jetlag: {
    title: 'Jetlag Shifter',
    metric: 'Rhythm Sync',
    color: 'purple',
    text: 'Circadian phase shift logged. Advance melatonin timing by 45 minutes to align with destination time.'
  },
  waste: {
    title: 'Brain Clearance',
    metric: 'Glymphatic Flow',
    color: 'blue',
    text: 'Glymphatic clearance cycles are optimal during restorative REM stage. Zero metabolic debris accumulated.'
  }
};

function togglePowerPlug(plugId) {
  powerPlugStates[plugId] = !powerPlugStates[plugId];
  
  const plugCard = document.getElementById(`plug-${plugId}`);
  const statusSpan = plugCard.querySelector('.plug-install-status span');
  const statusIcon = plugCard.querySelector('.plug-install-status i');

  if (powerPlugStates[plugId]) {
    plugCard.classList.add('installed');
    statusSpan.innerText = 'Installed';
    plugCard.querySelector('.plug-install-status').innerHTML = `<i data-feather="check-circle" style="width: 14px; height: 14px;"></i> <span>Installed</span>`;
  } else {
    plugCard.classList.remove('installed');
    statusSpan.innerText = 'Add Plug';
    plugCard.querySelector('.plug-install-status').innerHTML = `<i data-feather="plus-circle" style="width: 14px; height: 14px;"></i> <span>Add Plug</span>`;
  }

  feather.replace();
  renderAppWidgets();
}

function renderAppWidgets() {
  // Remove previously rendered dynamic plug widgets from app container
  const container = document.getElementById('app-widgets-container');
  const existingWidgets = container.querySelectorAll('.sim-app-widget');
  existingWidgets.forEach(w => w.remove());

  // Inject installed widgets
  Object.keys(powerPlugStates).forEach(plugId => {
    if (powerPlugStates[plugId]) {
      const def = plugDefinitions[plugId];
      const widget = document.createElement('div');
      widget.className = `sim-app-widget ${def.color}`;
      widget.innerHTML = `
        <div class="widget-header-row">
          <span class="widget-title">${def.title}</span>
          <span class="widget-metric">${def.metric}</span>
        </div>
        <p class="widget-body-text">${def.text}</p>
      `;
      container.appendChild(widget);
    }
  });
}

// Initial installation rendering
renderAppWidgets();


// --- 8. REDESIGN: Durability & Stress Tester ---
let currentStressMode = 'scratch';
const stressData = {
  scratch: {
    label: 'Scrape Friction',
    maxVal: '180 Newtons',
    color: '#00ff87',
    glowColor: 'radial-gradient(circle, rgba(0, 255, 135, 0.08) 0%, transparent 70%)',
    overlayId: 'overlay-laser'
  },
  water: {
    label: 'Pressure Depth',
    maxVal: '100 Meters (10 ATM)',
    color: '#00e5ff',
    glowColor: 'radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%)',
    overlayId: 'overlay-water'
  },
  heat: {
    label: 'Thermal Intensity',
    maxVal: '140° Fahrenheit',
    color: '#ff9100',
    glowColor: 'radial-gradient(circle, rgba(255, 145, 0, 0.08) 0%, transparent 70%)',
    overlayId: 'overlay-heat'
  }
};

function switchStressMode(mode) {
  currentStressMode = mode;
  
  // Set active buttons
  document.querySelectorAll('.tester-select-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`btn-stress-${mode}`).classList.add('active');

  const config = stressData[mode];
  document.getElementById('stress-slider-label').innerText = config.label;
  
  // Reset slider
  const slider = document.getElementById('stress-slider');
  slider.value = 0;
  updateStressVal(0);
}

function updateStressVal(val) {
  const config = stressData[currentStressMode];
  const percentage = val / 100;
  
  // Update slider label value text
  let finalValStr = '';
  if (currentStressMode === 'scratch') {
    finalValStr = `${Math.round(percentage * 180)} N`;
  } else if (currentStressMode === 'water') {
    finalValStr = `${Math.round(percentage * 100)} m`;
  } else {
    finalValStr = `${Math.round(percentage * 140)}° F`;
  }
  document.getElementById('stress-slider-val').innerText = finalValStr;

  // Clear all stress glows
  document.querySelectorAll('.stress-glow-overlay').forEach(o => o.style.opacity = '0');
  
  // Activate selected stress overlay with dynamic opacity
  const activeOverlay = document.getElementById(config.overlayId);
  activeOverlay.style.opacity = percentage;

  // Set specific visual attributes
  if (currentStressMode === 'scratch') {
    const laserBeam = document.getElementById('laser-beam');
    laserBeam.style.width = `${percentage * 280}px`;
    laserBeam.style.backgroundColor = config.color;
  } else if (currentStressMode === 'water') {
    const waterWave = document.getElementById('water-wave');
    waterWave.style.transform = `scale(${0.8 + percentage * 0.4})`;
  } else if (currentStressMode === 'heat') {
    const heatGlow = document.getElementById('heat-glow');
    heatGlow.style.filter = `blur(${20 + percentage * 20}px)`;
  }

  // Adjust cursor glow to coordinate with stress color
  mouseGlow.style.background = config.glowColor;
}


// --- 9. REDESIGN: Biological "Ultra Age" Calculator ---
const ageMetricsToggles = {
  hrv: true,
  sleep: true
};

function toggleAgeMetric(metricId) {
  ageMetricsToggles[metricId] = !ageMetricsToggles[metricId];
  
  const metricCard = document.getElementById(`age-metric-${metricId}`);
  if (ageMetricsToggles[metricId]) {
    metricCard.classList.add('selected');
  } else {
    metricCard.classList.remove('selected');
  }
  updateAgeCalculator();
}

function updateAgeCalculator() {
  const chronoAgeInput = document.getElementById('input-chrono-age');
  const chronoVal = parseInt(chronoAgeInput.value);
  document.getElementById('age-chrono-label').innerText = chronoVal;

  // Determine reduction modifiers
  let reduction = 0;
  if (ageMetricsToggles.hrv) reduction += 2;
  if (ageMetricsToggles.sleep) reduction += 2;

  const bioAge = Math.max(18, chronoVal - reduction);
  document.getElementById('results-bio-age').innerText = bioAge;

  // Radial ring animations (circumference for r=90 is ~565)
  const ringCircumference = 2 * Math.PI * 90;
  
  // Chronological circle indicator (always displays max scale)
  const ringChrono = document.getElementById('ring-chrono');
  const chronoOffset = ringCircumference - (chronoVal / 70) * ringCircumference;
  ringChrono.style.strokeDashoffset = chronoOffset;

  // Biological circle indicator
  const ringBio = document.getElementById('ring-bio');
  const bioOffset = ringCircumference - (bioAge / 70) * ringCircumference;
  ringBio.style.strokeDashoffset = bioOffset;

  // Update verdict text
  const verdictEl = document.getElementById('results-age-verdict');
  if (reduction > 0) {
    verdictEl.innerText = `Biological Age is ${reduction} years younger!`;
    verdictEl.style.color = 'var(--accent-purple)';
  } else {
    verdictEl.innerText = `Biological Age matches chronological age.`;
    verdictEl.style.color = 'var(--text-secondary)';
  }
}

// Initial calculation
updateAgeCalculator();


// --- 10. Diagnostic Personalization Quiz Flow ---
let currentQuizStep = 1;
const totalQuizSteps = 3;
const quizSelections = {
  goals: 'sleep',
  finish: 'Space Gray',
  sizing: 'sizing-kit-needed'
};

const quizStepElements = document.querySelectorAll('.quiz-step');
const prevBtn = document.getElementById('quiz-prev-btn');
const nextBtn = document.getElementById('quiz-next-btn');
const progressIndicator = document.getElementById('quiz-progress-indicator');
const navigationFooter = document.getElementById('quiz-navigation-footer');

function selectQuizOption(optionCard) {
  const optionsWrapper = optionCard.parentElement;
  optionsWrapper.querySelectorAll('.quiz-option-card').forEach(card => {
    card.classList.remove('selected');
  });
  
  optionCard.classList.add('selected');
  
  const stepVal = optionCard.getAttribute('data-value');
  const parentStep = optionCard.closest('.quiz-step');
  const stepNum = parentStep.getAttribute('data-step');

  if (stepNum === '1') {
    quizSelections.goals = stepVal;
  } else if (stepNum === '2') {
    quizSelections.finish = stepVal;
  } else if (stepNum === '3') {
    quizSelections.sizing = stepVal;
  }
}

function nextQuizStep() {
  if (currentQuizStep < totalQuizSteps) {
    currentQuizStep++;
    renderQuizStep();
  } else if (currentQuizStep === totalQuizSteps) {
    currentQuizStep++;
    renderResults();
  }
}

function prevQuizStep() {
  if (currentQuizStep > 1) {
    currentQuizStep--;
    renderQuizStep();
  }
}

function renderQuizStep() {
  navigationFooter.style.display = 'flex';

  quizStepElements.forEach(step => {
    step.classList.remove('active');
    if (step.getAttribute('data-step') == currentQuizStep) {
      step.classList.add('active');
    }
  });

  if (currentQuizStep === 1) {
    prevBtn.style.visibility = 'hidden';
  } else {
    prevBtn.style.visibility = 'visible';
  }

  nextBtn.innerHTML = `Next Step <i data-feather="chevron-right" style="vertical-align: middle;"></i>`;
  feather.replace();

  const progressPercent = ((currentQuizStep - 1) / totalQuizSteps) * 100 + 33.3;
  progressIndicator.style.width = `${progressPercent}%`;
}

function renderResults() {
  navigationFooter.style.display = 'none';
  
  quizStepElements.forEach(step => step.classList.remove('active'));
  document.getElementById('quiz-step-results').classList.add('active');

  const summaryText = `${quizSelections.goals.toUpperCase()} FOCUS & ${quizSelections.finish.toUpperCase()} CASING`;
  document.getElementById('results-profile-summary').innerText = summaryText;

  const powerPlugsWrapper = document.getElementById('results-powerplugs-container');
  powerPlugsWrapper.innerHTML = '';

  let plugs = [];
  if (quizSelections.goals === 'sleep') {
    plugs = [
      { name: 'HRV Dynamics', color: 'purple' },
      { name: 'Sleep Cycle Estimator', color: 'blue' },
      { name: 'Bedtime Window Guide', color: 'green' }
    ];
  } else if (quizSelections.goals === 'circadian') {
    plugs = [
      { name: 'Circadian Light Nudge', color: 'green' },
      { name: 'Caffeine Curfew Window', color: 'blue' },
      { name: 'Jetlag Shifter', color: 'purple' }
    ];
  } else {
    plugs = [
      { name: 'Movement Intensity Index', color: 'green' },
      { name: 'Cardiac Output Monitor', color: 'purple' },
      { name: 'VO2 Max Predictor', color: 'blue' }
    ];
  }

  plugs.forEach(p => {
    const plugTag = document.createElement('span');
    plugTag.className = `powerplug-tag ${p.color}`;
    plugTag.innerHTML = `<i data-feather="box" style="width: 14px; height: 14px;"></i> ${p.name}`;
    powerPlugsWrapper.appendChild(plugTag);
  });

  progressIndicator.style.width = '100%';
  feather.replace();
}


// --- 11. Premium Cart Drawer Logic ---
let cart = [];
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
const cartItemsWrapper = document.getElementById('cart-items-wrapper');
const cartCounter = document.getElementById('cart-counter');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartTotalEl = document.getElementById('cart-total');

openCartBtn.addEventListener('click', toggleCartDrawer);
closeCartBtn.addEventListener('click', toggleCartDrawer);
cartDrawerOverlay.addEventListener('click', (e) => {
  if (e.target === cartDrawerOverlay) toggleCartDrawer();
});

function toggleCartDrawer() {
  cartDrawerOverlay.classList.toggle('active');
}

function addConfiguredToCart() {
  const finishName = quizSelections.finish;
  const sizeOption = quizSelections.sizing === 'sizing-kit-needed' ? 'Free Sizing Kit' : 'US Size 8';
  
  const cartItem = {
    id: `ring-${finishName.toLowerCase().replace(' ', '-')}`,
    name: `UC Ring Air — ${finishName}`,
    meta: `Finish: ${finishName} / Sizing: ${sizeOption}`,
    price: 299.00,
    qty: 1,
    img: 'uc_ring_hero_1779540630281.png'
  };

  const existingItem = cart.find(item => item.id === cartItem.id);
  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push(cartItem);
  }

  if (quizSelections.sizing === 'sizing-kit-needed') {
    const kitItem = {
      id: 'sizing-kit-free',
      name: 'Free UC Sizing Kit',
      meta: 'Sizing tools included',
      price: 0.00,
      qty: 1,
      img: 'uc_ring_hero_1779540630281.png'
    };
    if (!cart.find(item => item.id === kitItem.id)) {
      cart.push(kitItem);
    }
  }

  renderCart();
  toggleCartDrawer();
}

function renderCart() {
  cartItemsWrapper.innerHTML = '';

  if (cart.length === 0) {
    cartItemsWrapper.innerHTML = '<p class="cart-empty-message">Your shopping cart is currently empty.</p>';
    cartCounter.innerText = 0;
    cartSubtotalEl.innerText = '$0.00';
    cartTotalEl.innerText = '$0.00';
    return;
  }

  let totalQty = 0;
  let subtotal = 0;

  cart.forEach(item => {
    totalQty += item.qty;
    subtotal += item.price * item.qty;

    const itemCard = document.createElement('div');
    itemCard.className = 'cart-item';
    itemCard.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <div>
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-meta">${item.meta}</div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateItemQty('${item.id}', -1)">-</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="updateItemQty('${item.id}', 1)">+</button>
          </div>
          <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeCartItem('${item.id}')" aria-label="Remove item">
        <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
      </button>
    `;
    cartItemsWrapper.appendChild(itemCard);
  });

  cartCounter.innerText = totalQty;
  cartSubtotalEl.innerText = `$${subtotal.toFixed(2)}`;
  cartTotalEl.innerText = `$${subtotal.toFixed(2)}`;
  
  feather.replace();
}

function updateItemQty(itemId, change) {
  const item = cart.find(item => item.id === itemId);
  if (item) {
    item.qty += change;
    if (item.qty <= 0) {
      removeCartItem(itemId);
    } else {
      renderCart();
    }
  }
}

function removeCartItem(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  const ringItems = cart.filter(item => item.id !== 'sizing-kit-free');
  if (ringItems.length === 0) {
    cart = [];
  }
  renderCart();
}

function checkoutAlert() {
  if (cart.length === 0) return;
  alert(`Thank you for testing Ultra Comfortable! In a production deployment, this would direct you to Stripe checkout to pre-order for a total of ${cartTotalEl.innerText}.`);
}

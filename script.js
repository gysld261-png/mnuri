/* ==========================================================================
   문화누리카드 (Munhwa Nuri Card) - Interactive Logic
   Figma Node 2326-1439 Implementation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initEventCarousel();
  initHeader();
});

/* --------------------------------------------------------------------------
   1. Hero Banner Slider (Figma: main_hero, 3 slides)
   -------------------------------------------------------------------------- */
let currentHeroIndex = 0;
const totalHeroSlides = 3;

function initHeroSlider() {
  const track = document.getElementById('hero_track');
  const prevBtn = document.getElementById('hero_prev_btn');
  const nextBtn = document.getElementById('hero_next_btn');

  if (!track) return;

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      handleHeroSlideChange(track, currentHeroIndex > 0 ? currentHeroIndex - 1 : totalHeroSlides - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      handleHeroSlideChange(track, currentHeroIndex < totalHeroSlides - 1 ? currentHeroIndex + 1 : 0);
    });
  }
}

function handleHeroSlideChange(track, nextIndex) {
  currentHeroIndex = nextIndex;

  const slides = track.querySelectorAll('.hero_slide');
  slides.forEach((slide, idx) => {
    slide.classList.toggle('is_active', idx === currentHeroIndex);
  });

  track.style.transform = `translateX(-${currentHeroIndex * 100}%)`;

  const slideNumEl = document.getElementById('hero_current_num');
  if (slideNumEl) {
    const displayNum = currentHeroIndex + 1;
    slideNumEl.textContent = displayNum < 10 ? `0${displayNum}` : displayNum;
  }
}

/* --------------------------------------------------------------------------
   3. Merchant Selection & Map Interactivity
   -------------------------------------------------------------------------- */
function selectMerchant(element, name, lat, lng) {
  // Update active state in merchant list
  const allItems = document.querySelectorAll('.merchant-item');
  allItems.forEach(item => item.classList.remove('active'));
  element.classList.add('active');

  // Highlight map markers
  const markers = document.querySelectorAll('.map-marker');
  markers.forEach(m => m.classList.remove('active'));

  if (name.includes('메가박스')) {
    document.querySelector('.marker-1')?.classList.add('active');
  } else if (name.includes('영풍문고')) {
    document.querySelector('.marker-2')?.classList.add('active');
  } else if (name.includes('알파')) {
    document.querySelector('.marker-3')?.classList.add('active');
  }

  // Smooth visual feedback on map
  const mapBg = document.getElementById('mapBgImg');
  if (mapBg) {
    mapBg.style.transform = 'scale(1.05)';
    setTimeout(() => {
      mapBg.style.transform = 'scale(1)';
    }, 300);
  }
}

let mapScale = 1;
function zoomMap(factor) {
  mapScale *= factor;
  if (mapScale < 0.8) mapScale = 0.8;
  if (mapScale > 1.5) mapScale = 1.5;
  const mapBg = document.getElementById('mapBgImg');
  if (mapBg) {
    mapBg.style.transform = `scale(${mapScale})`;
  }
}

function resetUserLocation() {
  document.getElementById('currentLocationText').textContent = '서울시 강남구';
  showModal('위치 재설정', '현재 위치가 [서울시 강남구] 기준으로 업데이트 되었습니다.');
}

function openLocationChangeModal() {
  showModal('지역 변경', '주변 가맹점을 찾고자 하는 동/구 이름을 검색하여 변경할 수 있습니다.');
}

/* --------------------------------------------------------------------------
   4. Header (Figma: Component 4 — 전체메뉴 토글 + 큰글씨/가맹주 모드 토글)
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.getElementById('site_header');
  const hamBtn = document.getElementById('header_ham_btn');
  const closeBtn = document.getElementById('header_menu_close_btn');
  const menuPanel = document.getElementById('header_menu_panel');
  const largeTextToggle = document.getElementById('large_text_toggle');
  const merchantModeToggle = document.getElementById('merchant_mode_toggle');

  if (hamBtn && closeBtn && menuPanel && header) {
    hamBtn.addEventListener('click', () => handleHeaderMenuToggle(header, hamBtn, menuPanel, true));
    closeBtn.addEventListener('click', () => handleHeaderMenuToggle(header, hamBtn, menuPanel, false));
  }

  if (largeTextToggle) {
    largeTextToggle.addEventListener('click', () => handleHeaderToggleClick(largeTextToggle));
  }

  if (merchantModeToggle) {
    merchantModeToggle.addEventListener('click', () => handleHeaderToggleClick(merchantModeToggle));
  }
}

function handleHeaderMenuToggle(header, hamBtn, menuPanel, isOpen) {
  header.classList.toggle('is_menu_open', isOpen);
  menuPanel.hidden = !isOpen;
  hamBtn.setAttribute('aria-expanded', String(isOpen));
}

function handleHeaderToggleClick(toggleEl) {
  const isPressed = toggleEl.getAttribute('aria-pressed') === 'true';
  toggleEl.setAttribute('aria-pressed', String(!isPressed));
}

/* --------------------------------------------------------------------------
   5. Event Carousel
   -------------------------------------------------------------------------- */
let currentEventIndex = 0;

function initEventCarousel() {
  const track = document.getElementById('eventTrack');
  const prevBtn = document.getElementById('eventPrevBtn');
  const nextBtn = document.getElementById('eventNextBtn');
  const dots = document.querySelectorAll('#eventDots .dot');

  if (!track) return;

  function updateCarousel() {
    const cardWidth = track.querySelector('.event-card').offsetWidth + 24; // width + gap
    track.style.transform = `translateX(-${currentEventIndex * cardWidth}px)`;

    dots.forEach((dot, idx) => {
      if (idx === currentEventIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentEventIndex < 2) {
        currentEventIndex++;
      } else {
        currentEventIndex = 0;
      }
      updateCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentEventIndex > 0) {
        currentEventIndex--;
      } else {
        currentEventIndex = 2;
      }
      updateCarousel();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentEventIndex = index;
      updateCarousel();
    });
  });
}

/* --------------------------------------------------------------------------
   6. FAQ Accordion Toggle
   -------------------------------------------------------------------------- */
function toggleFaq(buttonEl) {
  const faqItem = buttonEl.closest('.faq-item');
  const isOpen = faqItem.classList.contains('open');

  // Close all other items
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('open');
    const stateText = item.querySelector('.faq-toggle-state');
    if (stateText) {
      stateText.innerHTML = '열기 <span class="material-symbols-outlined arrow-icon">expand_more</span>';
    }
  });

  if (!isOpen) {
    faqItem.classList.add('open');
    const stateText = buttonEl.querySelector('.faq-toggle-state');
    if (stateText) {
      stateText.innerHTML = '닫기 <span class="material-symbols-outlined arrow-icon">expand_more</span>';
    }
  }
}

/* --------------------------------------------------------------------------
   7. Chatbot Modal & Messaging
   -------------------------------------------------------------------------- */
function toggleChatbotModal() {
  const modal = document.getElementById('chatbotModal');
  if (modal) {
    modal.classList.toggle('open');
  }
}

function handleChatSubmit(e) {
  if (e.key === 'Enter' && e.target.value.trim() !== '') {
    askChatbot(e.target.value.trim());
    e.target.value = '';
  }
}

function askChatbot(questionText) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;

  // Add User Message
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-msg user-msg';
  userBubble.innerHTML = `<p>${questionText}</p>`;
  chatMessages.appendChild(userBubble);

  // Generate AI Response after slight delay
  setTimeout(() => {
    const botBubble = document.createElement('div');
    botBubble.className = 'chat-msg bot-msg';
    
    let answerText = '궁금하신 사항에 대해 안내 도와드리겠습니다. 추가 문의사항은 1544-3412로 전화 부탁드립니다.';
    if (questionText.includes('분실')) {
      answerText = '카드를 분실하셨군요! [카드 확인] > [분실신고 및 재발급] 메뉴에서 즉시 신고 및 재발급 신청을 하실 수 있습니다.';
    } else if (questionText.includes('사용') || questionText.includes('가맹점')) {
      answerText = '문화누리카드는 전국 공연장, 영화관, 서점, 음반판매점, 놀이공원, 국내 여행사, 체육시설 등에서 사용하실 수 있습니다.';
    } else if (questionText.includes('양도')) {
      answerText = '문화누리카드는 본인 전용 카드로 타인 양도 및 매매가 금지되어 있습니다.';
    }

    botBubble.innerHTML = `<p>${answerText}</p>`;
    chatMessages.appendChild(botBubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 400);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* --------------------------------------------------------------------------
   8. Generic Modal Helpers & Auth
   -------------------------------------------------------------------------- */
function showModal(title, bodyContent) {
  const modal = document.getElementById('genericModal');
  const titleEl = document.getElementById('modalTitle');
  const bodyEl = document.getElementById('modalBody');

  if (modal && titleEl && bodyEl) {
    titleEl.textContent = title;
    bodyEl.innerHTML = bodyContent;
    modal.classList.add('open');
  }
}

function closeGenericModal() {
  const modal = document.getElementById('genericModal');
  if (modal) {
    modal.classList.remove('open');
  }
}

function openAuthModal(type) {
  if (type === 'login') {
    showModal('로그인', '주민번호/본인인증 또는 간편 인증을 통해 로그인하실 수 있습니다.');
  } else {
    showModal('회원가입', '문화누리카드 대상자 확인 후 빠른 회원가입이 진행됩니다.');
  }
}

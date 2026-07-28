/* ==========================================================================
   문화누리카드 (Munhwa Nuri Card) - Interactive Logic
   Figma Node 2326-1439 Implementation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initHeader();
  initMerchantSection();
  initHowTabs();
  initEventTabs();
  initHelpSearch();
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
   3. Merchant Finder (Figma: shop, node 1:185)
   -------------------------------------------------------------------------- */
const REGION_GUGUN_MAP = {
  seoul: ['강남구', '서초구', '마포구'],
  gyeonggi: ['수원시', '성남시', '고양시'],
  busan: ['해운대구', '수영구', '동래구'],
};

function initMerchantSection() {
  initMerchantCategories();
  initMerchantRegionSelect();
  initMerchantMapButtons();
}

function initMerchantCategories() {
  const buttons = document.querySelectorAll('.merchant_category_btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('is_active'));
      btn.classList.add('is_active');
    });
  });
}

function initMerchantRegionSelect() {
  const sidoSelect = document.getElementById('region_sido_select');
  const gugunSelect = document.getElementById('region_gugun_select');
  const searchBtn = document.getElementById('merchant_search_btn');
  if (!sidoSelect || !gugunSelect || !searchBtn) return;

  sidoSelect.addEventListener('change', () => {
    const gugunList = REGION_GUGUN_MAP[sidoSelect.value] || [];
    gugunSelect.innerHTML = '<option value="">구/군 선택</option>';
    gugunList.forEach((gugun) => {
      const option = document.createElement('option');
      option.value = gugun;
      option.textContent = gugun;
      gugunSelect.appendChild(option);
    });
    gugunSelect.disabled = gugunList.length === 0;
    gugunSelect.value = '';
    searchBtn.disabled = true;
  });

  gugunSelect.addEventListener('change', () => {
    searchBtn.disabled = gugunSelect.value === '';
  });
}

function initMerchantMapButtons() {
  const locationBtn = document.getElementById('merchant_map_location_btn');
  const changeBtn = document.getElementById('merchant_map_change_btn');

  if (locationBtn) {
    locationBtn.addEventListener('click', () => {
      showModal('위치 재설정', '현재 위치가 [서울시 강남구] 기준으로 업데이트 되었습니다.');
    });
  }

  if (changeBtn) {
    changeBtn.addEventListener('click', () => {
      showModal('지역 변경', '주변 가맹점을 찾고자 하는 동/구 이름을 검색하여 변경할 수 있습니다.');
    });
  }
}

/* --------------------------------------------------------------------------
   3-1. Card Application Tabs (Figma: how, node 1:323)
   -------------------------------------------------------------------------- */
function initHowTabs() {
  const tabButtons = document.querySelectorAll('.how_tab_btn');
  const panels = document.querySelectorAll('.how_panel');
  if (!tabButtons.length) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => {
        b.classList.remove('is_active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is_active');
      btn.setAttribute('aria-selected', 'true');

      panels.forEach((panel) => {
        panel.hidden = panel.dataset.panel !== btn.dataset.tab;
        panel.classList.toggle('is_active', panel.dataset.panel === btn.dataset.tab);
      });
    });
  });
}

/* --------------------------------------------------------------------------
   3-2. News/Events Tabs (Figma: event, node 1:345)
   -------------------------------------------------------------------------- */
function initEventTabs() {
  const tabButtons = document.querySelectorAll('.event_tab_btn');
  const list = document.querySelector('.event_list');
  const emptyTxt = document.querySelector('.event_empty_txt');
  if (!tabButtons.length) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => {
        b.classList.remove('is_active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is_active');
      btn.setAttribute('aria-selected', 'true');

      const isEventTab = btn.dataset.eventTab === 'event';
      if (list) list.hidden = !isEventTab;
      if (emptyTxt) emptyTxt.hidden = isEventTab;
    });
  });
}

/* --------------------------------------------------------------------------
   3-3. FAQ Search (Figma: help, node 1:426)
   -------------------------------------------------------------------------- */
function initHelpSearch() {
  const form = document.getElementById('help_search_form');
  const input = document.getElementById('help_search_input');
  const chips = document.querySelectorAll('.help_chip');

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value.trim() === '') return;
      askChatbot(input.value.trim());
      input.value = '';
    });
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('is_active'));
      chip.classList.add('is_active');
    });
  });
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
   5. Chatbot Modal & Messaging
   -------------------------------------------------------------------------- */
function toggleChatbotModal() {
  const modal = document.getElementById('chatbotModal');
  if (modal) {
    modal.classList.toggle('open');
  }
}

function openChatbotModal() {
  const modal = document.getElementById('chatbotModal');
  if (modal) {
    modal.classList.add('open');
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

  openChatbotModal();

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

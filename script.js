/* ==========================================================================
   문화누리카드 (Munhwa Nuri Card) - Interactive Logic
   Figma Node 2326-1439 Implementation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initHeader();
  initHeaderScrollBehavior();
  initHeaderMenuAccordion();
  initMerchantSection();
  initHowTabs();
  initStepCards();
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
  if (!tabButtons.length) return;

  // 온라인 신청 탭 콘텐츠가 아직 없어서(Figma 미확정), 탭 버튼의 선택 표시만 토글하고
  // 카드 패널은 전환하지 않음(항상 방문 신청 5단계 카드가 보이는 상태 유지)
  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => {
        b.classList.remove('is_active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is_active');
      btn.setAttribute('aria-selected', 'true');
    });
  });
}

/* --------------------------------------------------------------------------
   3-1-1. Step Card Selection (Figma엔 없는 UX 개선 — 클릭한 카드만 활성화)
   기본값은 1번 카드가 활성화된 상태로 시작(HTML의 is_active 클래스 그대로 사용).
   -------------------------------------------------------------------------- */
function initStepCards() {
  const stepCards = document.querySelectorAll('.how_step');
  stepCards.forEach((card) => {
    card.addEventListener('click', () => handleStepCardClick(card));
  });
}

function handleStepCardClick(cardEl) {
  const stepCards = cardEl.closest('.how_steps').querySelectorAll('.how_step');
  stepCards.forEach((card) => {
    const isTarget = card === cardEl;
    card.classList.toggle('is_active', isTarget);
    card.setAttribute('aria-pressed', String(isTarget));
  });
}

/* --------------------------------------------------------------------------
   3-2. News/Events Tabs (Figma: event, node 1:345)
   -------------------------------------------------------------------------- */
function initEventTabs() {
  const tabButtons = document.querySelectorAll('.event_tab_btn');
  if (!tabButtons.length) return;

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach((b) => {
        b.classList.remove('is_active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is_active');
      btn.setAttribute('aria-selected', 'true');
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
  const menuDim = document.getElementById('header_menu_dim');
  const largeTextToggle = document.getElementById('large_text_toggle');
  const merchantModeToggle = document.getElementById('merchant_mode_toggle');

  if (hamBtn && closeBtn && menuPanel && header) {
    hamBtn.addEventListener('click', () => handleHeaderMenuToggle(header, hamBtn, menuPanel, true));
    closeBtn.addEventListener('click', () => handleHeaderMenuToggle(header, hamBtn, menuPanel, false));

    if (menuDim) {
      menuDim.addEventListener('click', () => handleHeaderMenuToggle(header, hamBtn, menuPanel, false));
    }
  }

  if (largeTextToggle) {
    largeTextToggle.addEventListener('click', () => handleHeaderToggleClick(largeTextToggle));
  }

  if (merchantModeToggle) {
    merchantModeToggle.addEventListener('click', () => handleHeaderToggleClick(merchantModeToggle));
  }
}

/* 태블릿/모바일은 패널이 position:fixed 슬라이드 애니메이션(transition)을 타므로,
   hidden 속성을 애니메이션 전후로 지연시켜야 자연스럽게 재생됨.
   데스크톱은 transition이 없어(0s) 기존처럼 즉시 전환됨 — CSS transition-duration을
   그대로 읽어와 판단하므로 브레이크포인트를 JS에 하드코딩하지 않음. */
function handleHeaderMenuToggle(header, hamBtn, menuPanel, isOpen) {
  hamBtn.setAttribute('aria-expanded', String(isOpen));

  if (isOpen) {
    menuPanel.hidden = false;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        header.classList.add('is_menu_open');
      });
    });
  } else {
    header.classList.remove('is_menu_open');
    const durationSec = parseFloat(getComputedStyle(menuPanel).transitionDuration) || 0;
    if (durationSec > 0) {
      window.setTimeout(() => {
        menuPanel.hidden = true;
      }, durationSec * 1000);
    } else {
      menuPanel.hidden = true;
    }
  }
}

/* Figma엔 없는 UX 개선 — 데스크톱(1920px↑) 전용 스크롤 방향 감지 헤더 숨김/노출.
   CSS(.header.is_hidden)가 1920px 미만에서는 아무 효과가 없으므로,
   태블릿/모바일(햄버거+오버레이 구조)은 이 로직이 실행돼도 화면엔 영향 없음. */
function initHeaderScrollBehavior() {
  const header = document.getElementById('site_header');
  if (!header) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeaderVisibility() {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 0) {
      header.classList.remove('is_hidden');
    } else if (currentScrollY > lastScrollY) {
      header.classList.add('is_hidden');
    } else if (currentScrollY < lastScrollY) {
      header.classList.remove('is_hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeaderVisibility);
      ticking = true;
    }
  });
}

function handleHeaderToggleClick(toggleEl) {
  const isPressed = toggleEl.getAttribute('aria-pressed') === 'true';
  toggleEl.setAttribute('aria-pressed', String(!isPressed));
}

/* --------------------------------------------------------------------------
   4-1. 전체메뉴 카테고리 아코디언 (Figma엔 없는 UX 개선 추가 — design-analysis.md 기록)
   태블릿/모바일: 클릭한 카테고리만 펼침/접힘 토글, 여러 개 동시 펼침 가능.
   데스크톱(1024px↑)은 CSS에서 항상 펼침으로 고정되므로 이 로직과 무관하게 항상 보임.
   -------------------------------------------------------------------------- */
function initHeaderMenuAccordion() {
  const groups = document.querySelectorAll('.header_menu_group');
  groups.forEach((group) => {
    const titBtn = group.querySelector('.header_menu_group_tit');
    if (titBtn) {
      titBtn.addEventListener('click', () => handleAccordionToggle(group));
    }
  });
}

function handleAccordionToggle(groupEl) {
  const isOpen = groupEl.classList.toggle('is_open');
  const titBtn = groupEl.querySelector('.header_menu_group_tit');
  if (titBtn) {
    titBtn.setAttribute('aria-expanded', String(isOpen));
  }
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

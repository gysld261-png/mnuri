# [문화누리카드] 디자인 분석표

## 확인한 자료

- 디자인 원본: [@https://www.figma.com/design/JmA4ZBkTP4KdGJtAERcaX4/%EB%B0%95%ED%9A%A8%EB%AF%BC?node-id=2336-1489&m=dev]
- 확인한 화면: [메인홈,모바일메인홈 등]
- 실제 에셋 위치: [asset 등]

## 화면 목록

| 화면 | 목적 | 주요 행동 | 필요한 상태 |
|---|---|---|---|
| [화면명] | [사용자가 해결할 일] | [클릭·입력·이동] | [기본·로딩·빈 상태·오류] |

## 공통 영역

- 헤더: [로고, 메뉴, 현재 메뉴 표시 방식]
- 푸터: [링크, 저작권, 고정 정보]
- 공통 버튼: [기본, hover, focus, disabled]
- 공통 카드: [구조와 반복 규칙]

## 디자인 토큰

- 배경색: [확인한 색상값 또는 변수명]
- 본문색: [확인한 색상값 또는 변수명]
- 강조색: [확인한 색상값 또는 변수명]
- 제목 폰트: [실제 폰트명과 굵기]
- 본문 폰트: [실제 폰트명과 굵기]
- 기본 간격: [4px, 8px 등 확인한 규칙]
- 라운드: [버튼, 카드, 입력창 값]
- 그림자: [사용 위치와 값]

## 반응형

- 360px: [한 열 배치, 숨김 또는 이동하는 요소]
- 768px: [태블릿 배치]
- 1280px: [데스크톱 최대 폭과 열 구성]

## 인터랙션

- 메뉴: [열기·닫기·현재 위치]
- 버튼: [hover·pressed·disabled]
- 스크롤: [디자인에 실제로 있는 동작만 기록]
- 애니메이션: [대상·시작 조건·종료 상태]

## 에셋

- 로고: [실제 파일 경로]
- 이미지: [실제 파일 경로]
- 아이콘: [실제 파일 또는 사용 중인 아이콘 세트]
- 폰트: [실제 파일 또는 공식 로드 주소]

## 확인된 사실

- [디자인과 저장소에서 직접 확인한 내용]
- **(2026-07-29) 태블릿 헤더 전체메뉴 아코디언은 Figma 원본에 없는 UX 개선 추가 사항.**
  Figma 헤더 컴포넌트(Component 5, node 1:1811)의 "속성1=tab, 속성2=nav" 상태에는
  카테고리 4개(문화누리카드/카드관리·잔액/사용처 찾기/소식·공지사항)가 화살표(⌃) 위쪽
  방향으로 항상 펼쳐진 단일 상태만 존재하고, 접힌 상태(화살표 아래, 하위링크 숨김)
  variant는 Figma에 없음. 사용자 요청으로 태블릿/모바일 한정 클릭 시 펼침/접힘
  아코디언 인터랙션을 새로 추가함(여러 카테고리 동시 펼침 가능, 기본은 모두 접힘 시작).
  데스크톱(1024px↑)은 Figma 원본대로 항상 펼침 고정, 화살표 숨김.
  구현: `index.html`(`.header_menu_group_tit` 버튼 + 화살표 SVG),
  `style.css`(`.header_menu_group_list_wrap`의 `grid-template-rows: 0fr → 1fr` 전환),
  `script.js`(`initHeaderMenuAccordion`, `handleAccordionToggle`).
- **(2026-07-29) 태블릿/모바일 헤더 햄버거 메뉴를 "오른쪽 슬라이드 드로어" 방식으로 변경 —
  Figma 원본에 없는 UX 개선 추가 사항.** Figma 헤더 컴포넌트의 "속성1=tab/mobile, 속성2=nav"
  상태는 전체메뉴 패널이 헤더 아래 일반 블록으로 이어지는 형태만 존재하고, 오버레이·슬라이드·
  딤 배경·햄버거↔X 아이콘 모션은 Figma에 없음. 사용자 요청으로 태블릿/모바일 한정
  다음을 추가함: 1)햄버거 클릭 시 패널이 화면 폭 `min(70%, 560px)` x 높이 `100vh`로
  오른쪽에서 슬라이드 인(0.3s ease-out), 2)왼쪽에 딤 배경 표시(클릭 시 닫힘),
  3)햄버거 3줄이 X자로 회전 전환, 4)패널 내부는 세로 콘텐츠가 100vh를 넘으면 스크롤.
  데스크톱(1920px 이상)은 기존 in-flow 즉시 표시/숨김 동작을 그대로 유지(별도 복원 규칙으로 되돌림).
  구현: `index.html`(`.header_menu_dim` 추가), `style.css`(`.header_menu_panel`의
  `position:fixed`+`transform`, `.header_menu_dim`, `.header_ham_line` 회전/투명도,
  1920px 블록의 데스크톱용 복원 규칙), `script.js`(`handleHeaderMenuToggle`이 `hidden`
  속성 타이밍을 실제 CSS `transition-duration` 기준으로 지연 처리, 딤 클릭 시 닫기 리스너 추가).
- **(2026-07-29) 데스크톱(1920px↑) 헤더에 스크롤 방향 감지 숨김/노출 추가 —
  Figma 원본에 없는 UX 개선 추가 사항.** Figma엔 스크롤에 따른 헤더 동작이 정의돼 있지 않음.
  사용자 요청으로 아래로 스크롤하면 헤더가 위로 슬라이드아웃(`translateY(-100%)`)되고,
  위로 스크롤하면 다시 슬라이드인, `scrollY===0`(최상단)이면 방향과 무관하게 항상 노출.
  태블릿/모바일은 이미 다른 헤더 구조(햄버거+오버레이)라 영향 없도록 CSS를 1920px 블록에만 작성.
  구현: `style.css`(1920px 블록의 `.header`/`.header.is_hidden` transform),
  `script.js`(`initHeaderScrollBehavior` — `requestAnimationFrame`으로 스크롤 이벤트 쓰로틀,
  `lastScrollY` 비교로 방향 판단).
- **(2026-07-29) 데스크톱(1920px↑) 전체메뉴 오버레이에 슬라이드 다운/업 모션 + 하위 링크 hover 추가 —
  Figma 원본에 없는 UX 개선 추가 사항.** Figma(Component 9, node 14:823/14:824)엔 off/on 두
  상태만 있고 전환 모션은 정의돼 있지 않음. 최초 구현은 위→아래 슬라이드(`translateY`)였으나
  사용자가 "슬라이드 다운 말고 자연스럽게 스르륵 나오게" 요청해 opacity 페이드(0.3s)로 교체.
  구현: `style.css`(1920px 블록 `.header_menu_panel`의 `position:fixed`+`opacity`,
  `.header_menu_group_list a:hover{color:var(--color-primary-400)}`). script.js는
  기존 `handleHeaderMenuToggle`이 CSS `transition-duration`을 읽어 동작하는 구조라 별도 수정 불필요.
- **(2026-07-29) 데스크톱 전체메뉴 패딩/정렬 재수정 — node 14:823 재검증.** 사용자가
  "X 아이콘과 햄버거 위치가 겹쳐 보여야 하고 menu 정렬이 이상하다"고 지적해 `14:823`을
  다시 확인한 결과, Figma의 outer 컨테이너 padding은 top:0/bottom:30px이고 좌우 70px는
  상단행(로고+닫기)에는 적용되지 않음 — 상단행은 자체적으로 off-state `.header_inner`와
  동일한 `padding:16px 160px`를 가진 별도 레이어(w:1920px, 부모 padding 무시)라서
  햄버거 위치와 정확히 겹침. "전체메뉴" 제목+4열 리스트("menu" 블록)는 별도로 `width:1542px`,
  가운데 정렬. 기존 코드는 `.header_menu_panel` 전체에 `padding:30px 70px`를 균일 적용해서
  상단행이 160px가 아닌 70px 위치로 밀려 햄버거와 어긋났던 것. 추가로 닫기 아이콘
  (`.header_menu_close`)이 40x40이라 60x60인 햄버거와 중심이 안 맞아 60x60으로 통일.
  구현: `style.css`(1920px 블록 — `.header_menu_panel` padding `0 0 30px`로 변경,
  `.header_menu_top`에 `padding:16px 160px` 추가, `.header_menu_close` 60x60,
  `.header_menu_tit`/`.header_menu_grid`에 `max-width:1542px; margin:0 auto;` 추가).
- **(2026-07-29) quickmenu 카드 3개에 호버 확대 인터랙션 추가 — Figma 원본에 없는 UX 개선
  추가 사항.** Figma엔 호버 상태가 정의돼 있지 않음. 사용자 요청으로 `.quickmenu_card`에
  `transform:scale(1.04)` + `box-shadow` 강조, `transition .25s ease`. 브레이크포인트가
  아니라 `@media (hover:hover) and (pointer:fine)`로 감싸서 실제 마우스 호버가 가능한
  기기에서만 적용되고(데스크톱, 마우스 연결 태블릿 등) 터치 전용 기기에는 자동으로 빠짐.
  구현: `style.css`(base 영역, 첫 `@media (min-width:1024px)` 직전 — 브레이크포인트 무관).
- **(2026-07-29) `a:visited` 명시도 버그 수정.** `a:visited{color:inherit}`(지난 세션에
  추가)가 `a:visited` 의사클래스라서 `.quickmenu_card_more{color:white}` 같은 단일 클래스
  컴포넌트 규칙보다 명시도가 높았음 — 그래서 페이지 어디선가 `href="#"` 링크를 한 번이라도
  클릭하면(브라우저는 URL 단위로 방문 여부를 기억하므로, 같은 `href="#"`를 쓰는 다른
  quickmenu 카드도 전부 영향받음) 흰색이 사라지는 버그가 있었음. `a:where(:visited)`로
  바꿔서 명시도를 0으로 만들어 해결(모든 컴포넌트 색 규칙보다 항상 낮은 우선순위 유지).

## 아직 확인하지 못한 내용

- [추정하지 말고 질문하거나 확인해야 할 내용]
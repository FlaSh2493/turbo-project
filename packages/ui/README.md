# @turbo-project/front-core-design

디자인 시스템 UI 라이브러리

## 설치

```bash
# npm
npm install @turbo-project/front-core-design

# pnpm
pnpm add @turbo-project/front-core-design

# yarn
yarn add @turbo-project/front-core-design
```

## 사용법

### 1. 스타일 설정

프로젝트의 메인 CSS 파일에서 디자인 시스템 스타일을 import합니다.

```css
/* styles.css 또는 globals.css */
@import '@turbo-project/front-core-design/styles';

/* 사용하려는 프로젝트의 소스 파일들을 Tailwind가 스캔하도록 설정 */
@source "./src/**/*.{js,ts,jsx,tsx}"; /* 현재 프로젝트에서 디자인시스템을 사용하는 디렉토리 */
@source "./node_modules/@turbo-project/front-core-design/src/**/*.{ts,tsx}"; /* 그대로 추가 바람 */
```

> **중요**: `@source` 지시어는 Tailwind CSS v4에서 해당 디렉토리의 파일들을 스캔하여 사용된 유틸리티 클래스만 CSS에 포함시킵니다.

### 2. 폰트

디자인 시스템은 **Pretendard** 폰트를 사용합니다. CDN을 통해 자동으로 로드되며, 별도 설치가 필요 없습니다.

- Variable 폰트 지원으로 다양한 굵기(100~900) 사용 가능
- Dynamic subset으로 최적화된 용량
- `font-pretendard` 클래스 또는 타이포그래피 유틸리티(`heading1`, `body1` 등) 사용 시 자동 적용

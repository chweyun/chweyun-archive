# Next.js + Tailwind CSS Blog

[chweyun@rchive](https://chweyun-archive.vercel.app)

- 흥미로운 기술을 직접 활용해 개발한 블로그 입니다. 
- 기술적인 내용을 정리하며 공부한 내용을 공유하는 공간으로, 다양한 웹 개발 경험을 담고 있습니다.

## 🚀 실행 방법

레포지토리를 클론받은 후, 패키지를 설치합니다.

```bash
npm install
```

설치가 완료되면 아래의 명령어 중 원하는 작업을 실행할 수 있습니다.

```bash
# 개발 서버 시작 (Turbopack 사용)
next dev --turbopack

# 빌드
next build

# 빌드 완료 후 프로덕션 서버 시작
next start

# 코드 린팅 (코드 스타일 검사)
next lint
```

## 🛠 주요 기술 스택

> 이 프로젝트는 **Next.js**와 **Tailwind CSS**를 활용해 효율적인 개발 환경을 구축하고, **Notion API**를 통해 블로그 콘텐츠를 관리할 수 있는 기능을 제공합니다.

- **Next.js**: 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 지원하는 React 프레임워크로, 효율적인 페이지 로딩과 SEO 최적화를 위해 사용했습니다.
- **Tailwind CSS**: 유틸리티 퍼스트 CSS 프레임워크로, 빠르고 직관적인 디자인 구성을 위해 사용했습니다.
- **Notion API**: Notion의 데이터를 API를 통해 불러와 블로그 콘텐츠를 동적으로 관리하는 데 사용했습니다.
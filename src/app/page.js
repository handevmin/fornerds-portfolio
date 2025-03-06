'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('전체');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) {
          throw new Error('서버 응답 오류: ' + res.status);
        }
        const data = await res.json();
        
        if (data.success) {
          setProjects(data.data);
          setFilteredProjects(data.data);
        } else {
          setError('프로젝트를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        console.error('API 호출 오류:', err);
        setError('서버 연결에 문제가 발생했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
        setMounted(true);
      }
    };
    
    fetchProjects();
  }, []);

  // const projects = [
  //   {
  //     id: 1,
  //     title: 'AI 논문 검색 시스템',
  //     url: 'https://paper-search-system.vercel.app',
  //     description: 'AI를 활용해 PubMed, Perplexity, Claude API 등을 연동하여 학술 논문을 검색하고, 핵심 내용을 3줄로 요약해주는 웹 서비스',
  //     features: [
  //       '검색어 입력 시 관련 논문 리스트 및 3줄 요약 제공',
  //       '키워드 기반 논문 추천',
  //       '관련 논문 자동 추천 알고리즘'
  //     ],
  //     technologies: [
  //       'React / Next.js(프론트엔드)',
  //       'OpenAI API or Claude API(요약 기능)',
  //       'PubMed 등 외부 논문 데이터 소스 연동'
  //     ],
  //     category: '교육/학습',
  //     isEnterprise: false,
  //     icon: '📄'
  //   },
  //   {
  //     id: 2,
  //     title: '멀티 에이전트 아이디어 생성 시스템',
  //     url: 'https://multi-agent-ideation.vercel.app',
  //     description: '여러 AI 에이전트가 협력하여 아이디어를 생성하고, \'Six Thinking Hats\' 기법으로 다양하고 창의적인 제안을 제공',
  //     features: [
  //       '색깔별 \'모자(에이전트)\'가 다양한 시각으로 아이디어 제시',
  //       '사용자 주제 입력 → 다각도 브레인스토밍 결과 출력'
  //     ],
  //     technologies: [
  //       'React(UI) + OpenAI GPT API(아이디어 생성)',
  //       '멀티 에이전트 구조 설계'
  //     ],
  //     category: '콘텐츠 생성',
  //     isEnterprise: false,
  //     icon: '💡'
  //   },
  //   {
  //     id: 3,
  //     title: 'AI K-POP 챗봇',
  //     url: 'https://rt-ai-tutor.vercel.app',
  //     description: 'K-POP 관련 언어 학습 챗봇으로, K-POP 데이터를 활용해 실시간 대화하며 학습을 돕는 시스템',
  //     features: [
  //       'K-POP 기반 대화, 표현/단어 설명',
  //       '가사 해석, 문화적 배경 정보 제공'
  //     ],
  //     technologies: [
  //       'Next.js(테스트 페이지)',
  //       '자연어 처리 모델(ChatGPT API 등)'
  //     ],
  //     category: '교육/학습',
  //     isEnterprise: false,
  //     icon: '🎵'
  //   },
  //   {
  //     id: 4,
  //     title: '관광약자를 위한 맞춤형 챗봇',
  //     url: 'https://my-guide.kro.kr',
  //     description: '관광 취약 계층(고령자, 장애인 등)을 위해 여행 정보를 맞춤형으로 안내하는 챗봇',
  //     features: [
  //       '사용자의 이동 편의, 접근성 정보 제공',
  //       '여행 계획 추천 및 관련 서비스 안내'
  //     ],
  //     technologies: [
  //       'React(프론트) + Node.js(백엔드)',
  //       '자연어 처리 기반 Q&A'
  //     ],
  //     category: '여행/라이프스타일',
  //     isEnterprise: false,
  //     icon: '🧭'
  //   },
  //   {
  //     id: 5,
  //     title: '수학 도우미 챗봇',
  //     url: 'https://hong-math-chatbot.vercel.app',
  //     description: '학생들이 수학 문제를 쉽고 빠르게 이해할 수 있도록 도와주는 챗봇',
  //     features: [
  //       '문제 풀이 힌트, 단계별 설명',
  //       '개념 정리, 추가 연습문제 추천'
  //     ],
  //     technologies: [
  //       'Next.js 웹 인터페이스',
  //       '수학 공식 처리(LaTeX 렌더링, WolframAlpha API 등)',
  //       'OpenAI API를 통한 질의응답'
  //     ],
  //     category: '교육/학습',
  //     isEnterprise: false,
  //     icon: '🧮'
  //   },
  //   {
  //     id: 6,
  //     title: '시세이도 카카오톡 챗봇',
  //     url: 'https://pf.kakao.com/_DxduEn',
  //     description: '카카오 채널을 통해 시세이도 관련 제품 Q&A 및 기본 고객응대 자동화',
  //     features: [
  //       '제품 문의, 사용법, 재고 문의에 대한 실시간 응답',
  //       '프로모션 정보 및 매장 위치 안내'
  //     ],
  //     technologies: [
  //       '카카오톡 채널 챗봇 Builder(플러그인)',
  //       '백엔드 관리 시스템 연동 가능 (상품 정보 업데이트)'
  //     ],
  //     category: '고객 서비스',
  //     isEnterprise: false,
  //     icon: '💬'
  //   },
  //   {
  //     id: 7,
  //     title: 'Culf (문화/여행 관련 큐레이팅 챗봇)',
  //     url: 'https://culf.ai',
  //     description: '문화/여행 컨텐츠를 취향 기반으로 큐레이션하는 챗봇 서비스',
  //     features: [
  //       '여행지, 전시, 공연 추천',
  //       '사용자 피드백 반영해 맞춤 목록 업데이트'
  //     ],
  //     technologies: [
  //       'React(UI) + Node.js(추천 로직)',
  //       'OpenAI API 또는 기타 NLP 모듈로 대화 처리'
  //     ],
  //     category: '여행/라이프스타일',
  //     isEnterprise: false,
  //     icon: '🎭'
  //   },
  //   {
  //     id: 8,
  //     title: '이미지 생성 챗봇',
  //     url: 'https://image-gen-chatbot.vercel.app',
  //     description: '텍스트 프롬프트를 입력하면 AI로 이미지를 생성해주는 웹 챗봇',
  //     features: [
  //       '사용자의 설명에 따라 다양한 스타일/콘셉트 이미지를 자동 생성',
  //       '이미지 다운로드 및 간단한 편집 기능'
  //     ],
  //     technologies: [
  //       'React + Node.js 서버',
  //       'Stable Diffusion or DALLE2 API 등 이미지 생성 모델'
  //     ],
  //     category: '콘텐츠 생성',
  //     isEnterprise: false,
  //     icon: '🖼️'
  //   },
  //   // 기업형 챗봇 프로젝트
  //   {
  //     id: 9,
  //     title: '기업 내부 지식관리 챗봇',
  //     url: '#',
  //     description: '대기업 임직원들을 위한 내부 지식 검색 및 관리 시스템으로, 방대한 기업 내부 자료를 AI로 분석하여 실시간 질의응답을 제공하는 챗봇',
  //     features: [
  //       '기업 내부 문서, 매뉴얼, 정책 등 즉시 검색 및 요약',
  //       '부서별/직급별 맞춤 정보 접근 권한 관리',
  //       '신규 입사자 온보딩 프로세스 자동화'
  //     ],
  //     technologies: [
  //       'React 기반 웹 인터페이스',
  //       'ElasticSearch 기반 문서 인덱싱 시스템',
  //       'Azure OpenAI 통합 및 보안 엔드포인트 구축'
  //     ],
  //     category: '업무 자동화',
  //     isEnterprise: true,
  //     icon: '🔍'
  //   },
  //   {
  //     id: 10,
  //     title: 'HR 인사관리 어시스턴트',
  //     url: '#',
  //     description: '인사팀을 위한 AI 기반 업무 보조 챗봇으로, 직원 정보 관리, 휴가 처리, 급여 문의 등 HR 관련 반복 업무를 자동화',
  //     features: [
  //       '직원 휴가/연차 신청 및 승인 프로세스 자동화',
  //       '급여 명세서 조회 및 세금 관련 질의응답',
  //       '신규 채용 절차 관리 및 면접 일정 조율'
  //     ],
  //     technologies: [
  //       'Node.js 백엔드 + React 프론트엔드',
  //       'SAP/Oracle HR 시스템 연동 API',
  //       '다국어 지원(한/영/중/일) 및 보안 인증 시스템'
  //     ],
  //     category: '업무 자동화',
  //     isEnterprise: true,
  //     icon: '👥'
  //   },
  //   {
  //     id: 11,
  //     title: '제조 공정 모니터링 챗봇',
  //     url: '#',
  //     description: '제조업 공장의 생산 라인을 실시간으로 모니터링하고, 이상 징후를 감지하여 담당자에게 알림을 제공하는 산업용 챗봇',
  //     features: [
  //       '생산 설비 실시간 상태 모니터링 및 이상 감지',
  //       '음성 명령으로 설비 데이터 조회 가능',
  //       '생산 효율성 리포트 자동 생성 및 분석'
  //     ],
  //     technologies: [
  //       'IoT 센서 데이터 분석 및 머신러닝 예측 모델',
  //       'WebSocket 기반 실시간 알림 시스템',
  //       'Microsoft Teams/Slack 통합 알림 시스템'
  //     ],
  //     category: '업무 자동화',
  //     isEnterprise: true,
  //     icon: '🏭'
  //   },
  //   {
  //     id: 12,
  //     title: '금융 컴플라이언스 어드바이저',
  //     url: '#',
  //     description: '금융기관을 위한 규제 준수 및 컴플라이언스 가이드 챗봇으로, 최신 금융 규제를 학습하여 임직원들의 법규 준수를 지원',
  //     features: [
  //       '금융 규제 변경사항 실시간 업데이트 및 알림',
  //       '거래 위험도 평가 및 컴플라이언스 체크',
  //       '감사 대비 문서 자동화 및 리포팅'
  //     ],
  //     technologies: [
  //       'Python 백엔드 + Vue.js 프론트엔드',
  //       '금융 규제 데이터베이스 연동',
  //       '블록체인 기반 감사 추적 시스템'
  //     ],
  //     category: '금융/헬스케어',
  //     isEnterprise: true,
  //     icon: '💼'
  //   },
  //   {
  //     id: 13,
  //     title: '의료 임상시험 어시스턴트',
  //     url: '#',
  //     description: '제약회사와 병원을 위한 임상시험 프로세스 관리 챗봇으로, 환자 모니터링부터 데이터 수집까지 임상시험 전반을 지원',
  //     features: [
  //       '임상시험 참가자 상태 모니터링 및 기록',
  //       '부작용 보고 자동화 및 긴급 알림 시스템',
  //       '임상 데이터 분석 및 패턴 감지'
  //     ],
  //     technologies: [
  //       'HIPAA 규정 준수 보안 아키텍처',
  //       'HL7 FHIR 표준 의료 데이터 통합',
  //       '통계 분석 및 ML 기반 이상치 감지'
  //     ],
  //     category: '금융/헬스케어',
  //     isEnterprise: true,
  //     icon: '🏥'
  //   },
  //   {
  //     id: 14,
  //     title: '유통망 인벤토리 관리 챗봇',
  //     url: '#',
  //     description: '대형 유통기업을 위한 재고 관리 및 공급망 최적화 챗봇으로, 재고 부족 예측 및 자동 발주 기능 제공',
  //     features: [
  //       '실시간 재고 수준 모니터링 및 부족 예측',
  //       '공급업체 자동 발주 및 배송 추적',
  //       '계절성 수요 예측 및 재고 최적화 제안'
  //     ],
  //     technologies: [
  //       'ERP/SCM 시스템 통합',
  //       '수요 예측 알고리즘 및 시계열 분석',
  //       '다중 창고 최적화 알고리즘'
  //     ],
  //     category: '업무 자동화',
  //     isEnterprise: true,
  //     icon: '📦'
  //   }
  // ];

  useEffect(() => {
    setMounted(true);
    setFilteredProjects(projects);
  }, []);

  // 고유한 카테고리 목록 생성
  const uniqueCategories = ['전체', ...new Set(projects.map(project => project.category))];

  useEffect(() => {
    if (activeCategory === '전체') {
      setFilteredProjects(
        projects.filter(project => 
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProjects(
        projects.filter(project => 
          project.category === activeCategory &&
          (project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           project.description.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
    }
  }, [searchQuery, activeCategory]);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoContainer}>
            <img src="/logo.png" alt="ForNerds 로고" className={styles.logo} />
          </div>
          <h1 className={styles.title}>ForNerds</h1>
          <p className={styles.description}>
            AI 챗봇 포트폴리오
          </p>
          
          {/* 검색창 */}
          <div className={styles.searchContainer}>
            <div className={styles.searchIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#5baa9a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 21L16.65 16.65" stroke="#5baa9a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="프로젝트 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className={styles.mainContent}>
        {/* 카테고리 */}
        <div className={styles.categoryContainer}>
          {uniqueCategories.map((category) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${
                activeCategory === category ? styles.activeCategoryButton : ''
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 프로젝트 그리드 */}
        <div className={styles.projectGrid}>
          {filteredProjects.map((project) => (
            project.isEnterprise ? (
              // 기업형 챗봇은 링크 없는 일반 div로 렌더링
              <div 
                key={project.id} 
                className={styles.projectCard}
              >
                <div className={styles.projectHeader}>
                  <div
                    className={styles.projectIcon}
                    style={{ backgroundColor: `var(--fornerds-light-${project.id % 3})` }}
                  >
                    {project.icon}
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                </div>
                <p className={styles.projectDescription}>{project.description}</p>
                
                <div className={styles.projectFeatures}>
                  <h4 className={styles.sectionTitle}>주요 기능</h4>
                  <ul className={styles.featureList}>
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.projectTechnologies}>
                  <h4 className={styles.sectionTitle}>사용 기술</h4>
                  <ul className={styles.technologyList}>
                    {project.technologies.map((tech, index) => (
                      <li key={index}>{tech}</li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.projectFooter}>
                  <span className={styles.projectCategory}>{project.category}</span>
                  <span className={styles.enterpriseBadge}>기업용 비공개</span>
                </div>
              </div>
            ) : (
              // 일반 프로젝트는 링크 있는 a 태그로 렌더링
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                key={project.id} 
                className={styles.projectCard}
              >
                <div className={styles.projectHeader}>
                  <div
                    className={styles.projectIcon}
                    style={{ backgroundColor: `var(--fornerds-light-${project.id % 3})` }}
                  >
                    {project.icon}
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                </div>
                <p className={styles.projectDescription}>{project.description}</p>
                
                <div className={styles.projectFeatures}>
                  <h4 className={styles.sectionTitle}>주요 기능</h4>
                  <ul className={styles.featureList}>
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.projectTechnologies}>
                  <h4 className={styles.sectionTitle}>사용 기술</h4>
                  <ul className={styles.technologyList}>
                    {project.technologies.map((tech, index) => (
                      <li key={index}>{tech}</li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.projectFooter}>
                  <span className={styles.projectCategory}>{project.category}</span>
                  <span className={styles.viewButton}>방문하기 →</span>
                </div>
              </a>
            )
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className={styles.noResults}>
            <p>검색 결과가 없습니다. 다른 키워드로 검색해보세요.</p>
          </div>
        )}

        <footer className={styles.footer}>
          <p>&copy; 2025 ForNerds. All rights reserved.</p>
          <p>AI 챗봇으로 더 스마트한 비즈니스를 만들어보세요.</p>
        </footer>
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Image from 'next/image';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('전체');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [projects, setProjects] = useState([]);

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
  }, [searchQuery, activeCategory, projects]);

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoContainer}>
            <Image
              src="/logo.png"
              alt="ForNerds 로고"
              className={styles.logo}
              width={120}
              height={120}
              priority
            />
          </div>
          <h1 className={styles.title}>ForNerds</h1>
          <p className={styles.description}>
            AI 챗봇 포트폴리오
          </p>

          {/* 검색창 */}
          <div className={styles.searchContainer}>
            <div className={styles.searchIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#5baa9a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 21L16.65 16.65" stroke="#5baa9a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
              className={`${styles.categoryButton} ${activeCategory === category ? styles.activeCategoryButton : ''
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
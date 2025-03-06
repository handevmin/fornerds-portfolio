'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';

export default function AdminPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    title: '',
    url: '',
    description: '',
    features: [''],
    technologies: [''],
    category: '교육/학습',
    isEnterprise: false,
    icon: '🤖',
  });

  // 클라이언트 사이드 마운트 확인
  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'fornerds123!@#') {
      setError(''); // 에러 상태 초기화
      setIsLoggedIn(true);
      fetchProjects();
    } else {
      setError('로그인 정보가 올바르지 않습니다.');
    }
  };

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/projects');
      const { data } = await res.json();
      setProjects(data);
    } catch (error) {
      setError('프로젝트를 불러오는 데 실패했습니다.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentProject({
      ...currentProject,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFeaturesChange = (e) => {
    const features = e.target.value.split('\n').filter(item => item.trim() !== '');
    setCurrentProject({
      ...currentProject,
      features: features.length > 0 ? features : [''],
    });
  };

  const handleTechnologiesChange = (e) => {
    const technologies = e.target.value.split('\n').filter(item => item.trim() !== '');
    setCurrentProject({
      ...currentProject,
      technologies: technologies.length > 0 ? technologies : [''],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentProject),
      });
      
      if (res.ok) {
        setIsAdding(false);
        setCurrentProject({
          title: '',
          url: '',
          description: '',
          features: [''],
          technologies: [''],
          category: '교육/학습',
          isEnterprise: false,
          icon: '🤖',
        });
        fetchProjects();
      } else {
        const { error } = await res.json();
        setError(`프로젝트 저장 중 오류: ${error}`);
      }
    } catch (error) {
      setError('프로젝트 저장 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('정말 이 프로젝트를 삭제하시겠습니까?')) return;
    
    setIsLoading(true);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        fetchProjects();
      } else {
        const { error } = await res.json();
        setError(`프로젝트 삭제 중 오류: ${error}`);
      }
    } catch (error) {
      setError('프로젝트 삭제 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['교육/학습', '여행/라이프스타일', '콘텐츠 생성', '고객 서비스', '업무 자동화', '금융/헬스케어'];
  const icons = ['🤖', '📄', '💡', '🎵', '🧭', '🧮', '💬', '🎭', '🖼️', '🔍', '👥', '🏭', '💼', '🏥', '📦'];

  // 클라이언트 컴포넌트가 마운트되기 전에는 아무것도 렌더링하지 않음
  if (!mounted) {
    return null;
  }

  if (!isLoggedIn) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <h1>ForNerds 관리자 로그인</h1>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label htmlFor="username">아이디</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.loginButton}>로그인</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminHeader}>
        <h1>ForNerds 포트폴리오 관리</h1>
        <div className={styles.adminActions}>
          <button 
            className={styles.addButton}
            onClick={() => setIsAdding(!isAdding)}
          >
            {isAdding ? '취소' : '새 프로젝트 추가'}
          </button>
          <button 
            className={styles.logoutButton}
            onClick={() => setIsLoggedIn(false)}
          >
            로그아웃
          </button>
        </div>
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {isAdding && (
        <div className={styles.formContainer}>
          <h2>새 프로젝트 추가</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="title">프로젝트 제목</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={currentProject.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="url">URL</label>
                <input
                  id="url"
                  name="url"
                  type="text"
                  value={currentProject.url}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="category">카테고리</label>
                <select
                  id="category"
                  name="category"
                  value={currentProject.category}
                  onChange={handleChange}
                  required
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="icon">아이콘</label>
                <select
                  id="icon"
                  name="icon"
                  value={currentProject.icon}
                  onChange={handleChange}
                  required
                >
                  {icons.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className={styles.formGroupFull}>
                <label htmlFor="description">설명</label>
                <textarea
                  id="description"
                  className={styles.textareaField}
                  name="description"
                  value={currentProject.description}
                  onChange={handleChange}
                  required
                  rows={4}
                />
              </div>
              
              <div className={styles.formGroupFull}>
                <label>주요 기능 (한 줄에 하나씩 입력)</label>
                <textarea
                  className={styles.textareaField}
                  value={currentProject.features.join('\n')}
                  onChange={handleFeaturesChange}
                  rows={5}
                  required
                />
              </div>
              
              <div className={styles.formGroupFull}>
                <label>사용 기술 (한 줄에 하나씩 입력)</label>
                <textarea
                  className={styles.textareaField}
                  value={currentProject.technologies.join('\n')}
                  onChange={handleTechnologiesChange}
                  rows={5}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <div className={styles.checkboxGroup}>
                  <input
                    id="isEnterprise"
                    name="isEnterprise"
                    type="checkbox"
                    checked={currentProject.isEnterprise}
                    onChange={handleChange}
                  />
                  <label className={styles.checkLabel} htmlFor="isEnterprise">기업용 비공개 프로젝트</label>
                </div>
              </div>
            </div>
            
            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? '저장 중...' : '프로젝트 저장'}
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setIsAdding(false)}
              >
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.projectsList}>
        <h2>프로젝트 목록</h2>
        {isLoading && !isAdding ? (
          <p>로딩 중...</p>
        ) : projects.length > 0 ? (
          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <div key={project._id || project.id} className={styles.projectCard}>
                <div className={styles.projectCardHeader}>
                  <div className={styles.projectIcon}>{project.icon}</div>
                  <h3>{project.title}</h3>
                </div>
                <p className={styles.projectCategory}>{project.category}</p>
                <p className={styles.projectEnterprise}>
                  {project.isEnterprise ? '기업용 비공개' : '공개 프로젝트'}
                </p>
                <div className={styles.projectCardActions}>
                  <button
                    className={styles.editButton}
                    onClick={() => {
                      setCurrentProject(project);
                      setIsAdding(true);
                    }}
                  >
                    수정
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(project._id || project.id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>등록된 프로젝트가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
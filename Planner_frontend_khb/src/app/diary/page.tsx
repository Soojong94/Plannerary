// src/app/diary/page.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './diary.module.css';
import TabBar from '@/components/util_component/tab_bar';

/**
 * 계획 항목의 인터페이스 정의
 */
interface Plan {
  id: number;
  text: string;
  completed: boolean;
}

/**
 * 다이어리 페이지 컴포넌트
 * 제목, 내용, 계획 목록을 관리하는 메인 페이지
 */
export default function DiaryPage() {
  // TODO: DB에서 다이어리 제목 가져오기
  const [title, setTitle] = useState('DB에서 가져와야하는 다이어리 제목 / placeholder 있음');

  // TODO: DB에서 다이어리 내용 가져오기
  const [content, setContent] = useState(
    'DB에서 가져와야 하는 다이어리 내용입니다 / placeholder 있음  '
  );

  // TODO: DB에서 계획 목록 가져오기
  const [plans, setPlans] = useState<Plan[]>([
    { id: 1, text: 'DB에서 가져오는 계획1', completed: false },
    { id: 2, text: 'DB에서 가져오는 계획2', completed: true },
    { id: 3, text: 'DB에서 가져오는 계획3', completed: false },
  ]);

  // 메뉴 상태 관리
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // TODO: 캘린더에서 선택한 날짜 정보를 가져와야 함
  // 실제 구현 시 prop이나 context로 선택된 날짜를 전달받거나 라우트 파라미터에서 가져와야 함
  const selectedDate = new Date(); // 실제로는 props 또는 context에서 가져옴
  const formattedDate = `${String(selectedDate.getMonth() + 1).padStart(2, '0')}.${String(selectedDate.getDate()).padStart(2, '0')}. ${['일', '월', '화', '수', '목', '금', '토'][selectedDate.getDay()]}요일`;

  // 메뉴 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /**
   * 계획 완료 상태를 토글하는 함수
   * @param id 토글할 계획의 ID
   */
  const togglePlanComplete = (id: number) => {
    setPlans(
      plans.map(plan =>
        plan.id === id ? { ...plan, completed: !plan.completed } : plan
      )
    );
    // TODO: DB에 계획 완료 상태 업데이트
  };

  /**
   * 새 계획을 추가하는 함수
   */
  const addPlan = () => {
    const newId = plans.length > 0 ? Math.max(...plans.map(p => p.id)) + 1 : 1;
    setPlans([...plans, { id: newId, text: `새 계획`, completed: false }]);
    // TODO: DB에 새 계획 추가
  };

  /**
   * 계획 텍스트 수정 함수
   */
  const updatePlanText = (id: number, newText: string) => {
    setPlans(
      plans.map(plan =>
        plan.id === id ? { ...plan, text: newText } : plan
      )
    );
    // TODO: DB에 계획 텍스트 업데이트
  };

  // 다이어리 내용이 변경될 때마다 저장 (실제 구현에서는 debounce 등 사용 권장)
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    // TODO: DB에 다이어리 내용 업데이트
  };

  // 다이어리 제목이 변경될 때마다 저장
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    // TODO: DB에 다이어리 제목 업데이트
  };

  // 뒤로가기 핸들러
  const handleBack = () => {
    // TODO: 캘린더 메인 페이지로 라우팅 처리
    // router.push('/calendar') 또는 history.back() 등으로 구현
    console.log('뒤로가기 버튼 클릭');
  };

  // 메뉴 토글 핸들러
  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  // 다이어리 수정 핸들러
  const handleEdit = () => {
    // TODO: 다이어리 수정 모드로 전환 또는 수정 페이지로 이동
    console.log('다이어리 수정');
    setShowMenu(false);
  };

  // 다이어리 삭제 핸들러
  const handleDelete = () => {
    // TODO: 다이어리 삭제 확인 모달 표시 후 삭제 처리
    if (window.confirm('정말로 이 다이어리를 삭제하시겠습니까?')) {
      console.log('다이어리 삭제');
      // TODO: DB에서 다이어리 삭제 후 캘린더 페이지로 리다이렉트
    }
    setShowMenu(false);
  };

  // 다이어리 공유 핸들러
  const handleShare = () => {
    // TODO: 다이어리 공유 기능 구현
    console.log('다이어리 공유');
    setShowMenu(false);
  };

  // 다이어리 전체 보기 핸들러
  const handleViewAll = () => {
    // TODO: 다이어리 전체 목록 페이지로 라우팅 처리
    // router.push('/diary/all') 등으로 구현
    console.log('다이어리 전체 보기 버튼 클릭');
  };

  return (
    <div className={styles.diaryContainer}>
      <div className={styles.diary}>
        {/* 상단 헤더 */}
        <div className={styles.header}>
          {/* TODO: 뒤로가기 버튼 - 캘린더 메인 페이지로 이동 */}
          <button className={styles.backButton} onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className={styles.headerTitle}>다이어리</h1>
          {/* 메뉴 버튼 - 설정, 수정, 삭제 등의 옵션 메뉴 표시 */}
          <div className={styles.menuContainer} ref={menuRef}>
            <button className={styles.menuButton} onClick={handleMenuToggle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="white" stroke="white" strokeWidth="2" />
                <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" fill="white" stroke="white" strokeWidth="2" />
                <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" fill="white" stroke="white" strokeWidth="2" />
              </svg>
            </button>
            {showMenu && (
              <div className={styles.menuDropdown}>
                <button className={styles.menuItem} onClick={handleEdit}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  수정하기
                </button>
                <button className={styles.menuItem} onClick={handleShare}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.59 13.51L15.42 17.49" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.41 6.51L8.59 10.49" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  공유하기
                </button>
                <button className={styles.menuItem} onClick={handleDelete}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H5H21" stroke="#FF4747" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#FF4747" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  삭제하기
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 날짜 표시 */}
        <div className={styles.dateSection}>
          {/* TODO: 캘린더에서 선택된 날짜 정보를 가져와 표시 */}
          <p className={styles.date}>{formattedDate}</p>
        </div>

        {/* 다이어리 제목 섹션 */}
        <div className={styles.titleSection}>
          <input
            type="text"
            className={styles.titleInput}
            value={title}
            onChange={handleTitleChange}
            placeholder="제목을 입력하세요"
          />
        </div>

        {/* 다이어리 내용 섹션 */}
        <div className={styles.contentSection}>
          <textarea
            className={styles.contentTextarea}
            value={content}
            onChange={handleContentChange}
            placeholder="내용을 입력하세요"
          />
        </div>

        {/* 계획 목록 섹션 */}
        <div className={styles.plansSection}>
          <div className={styles.plansHeader}>
            <h3 className={styles.planTitle}>계획</h3>
            <button className={styles.addPlanButton} onClick={addPlan}>
              추가
            </button>
          </div>
          <div className={styles.plansList}>
            {plans.map((plan) => (
              <div key={plan.id} className={styles.planItem}>
                <input
                  type="checkbox"
                  checked={plan.completed}
                  onChange={() => togglePlanComplete(plan.id)}
                  className={styles.planCheckbox}
                />
                <input
                  type="text"
                  value={plan.text}
                  onChange={(e) => updatePlanText(plan.id, e.target.value)}
                  className={`${styles.planText} ${plan.completed ? styles.completed : ''}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 하단 버튼 - 다이어리 전체 보기 */}
        <div className={styles.viewAllContainer}>
          {/* TODO: 다이어리 전체 목록 페이지로 이동하는 버튼 */}
          <button className={styles.viewAllButton} onClick={handleViewAll}>
            다이어리 전체 보기
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* 하단 탭 바 - 기존 컴포넌트 활용 */}
        {/* TODO: TabBar 컴포넌트는 앱의 전체 네비게이션을 담당하는 기존 컴포넌트 */}
        <TabBar />
      </div>
    </div>
  );
}
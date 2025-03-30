// src/app/diary/page.tsx
"use client";

import React, { useState } from 'react';
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
  // 다이어리 제목 상태 관리
  const [title, setTitle] = useState('나의 일기장');

  // 다이어리 내용 상태 관리
  const [content, setContent] = useState(
    '새벽에 화장실에 가면 강아지가 따라온다는 이야기가 있다.\n난 이 이야기가 참 부담스럽다.'
  );

  // 계획 목록 상태 관리
  const [plans, setPlans] = useState<Plan[]>([
    { id: 1, text: 'Plan1', completed: false },
    { id: 2, text: 'Plan2', completed: false },
    { id: 3, text: 'Plan3', completed: false },
  ]);

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
  };

  /**
   * 새 계획을 추가하는 함수
   */
  const addPlan = () => {
    const newId = plans.length > 0 ? Math.max(...plans.map(p => p.id)) + 1 : 1;
    setPlans([...plans, { id: newId, text: `Plan${newId}`, completed: false }]);
  };

  return (
    <div className={styles.diaryContainer}>
      <div className={styles.diary}>
        {/* 다이어리 제목 섹션 */}
        <div className={styles.titleSection}>
          <h2 className={styles.sectionTitle}>제목</h2>
          <input
            type="text"
            className={styles.titleInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
          />
        </div>

        {/* 다이어리 내용 섹션 */}
        <div className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>내용</h2>
          <textarea
            className={styles.contentTextarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
          />
        </div>

        {/* 계획 목록 섹션 */}
        <div className={styles.plansSection}>
          <h2 className={styles.sectionTitle}>계획</h2>
          <div className={styles.plansHeader}>
            <h3 className={styles.planTitle}>Plans</h3>
            <button className={styles.addPlanButton} onClick={addPlan}>
              + 계획 추가
            </button>
          </div>
          <div className={styles.plansList}>
            {plans.map((plan) => (
              <div key={plan.id} className={styles.planItem}>
                <span className={plan.completed ? styles.completed : ''}>
                  {plan.text}
                </span>
                <input
                  type="checkbox"
                  checked={plan.completed}
                  onChange={() => togglePlanComplete(plan.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 하단 탭 바 */}
        <TabBar />
      </div>
    </div>
  );
}
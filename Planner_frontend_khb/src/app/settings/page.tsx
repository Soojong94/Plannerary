// src/app/settings/page.tsx
"use client";

import React, { useState } from 'react';
import styles from './settings.module.css';
import TabBar from '@/components/util_component/tab_bar';

/**
 * 설정 페이지 컴포넌트
 * 사용자 프로필, 테마, 알림, 데이터 관리 등의 설정을 제공하는 페이지
 */
export default function SettingsPage() {
  // 사용자 이름 상태 관리
  const [username, setUsername] = useState('사용자');

  // 알림 설정 상태 관리
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    weeklyReport: true,
    appUpdates: false,
  });

  // 테마 설정 상태 관리
  const [theme, setTheme] = useState('light');

  /**
   * 알림 설정 토글 함수
   * @param setting 토글할 알림 설정의 키
   */
  const toggleNotification = (setting: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [setting]: !notifications[setting],
    });
  };

  /**
   * 테마 변경 함수
   * @param e 선택 이벤트
   */
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  /**
   * 프로필 이미지 변경 함수 (실제 구현은 추후 추가)
   */
  const handleProfileImageChange = () => {
    alert('프로필 이미지 변경 기능은 개발 중입니다.');
  };

  /**
   * 데이터 초기화 함수
   */
  const handleDataReset = () => {
    if (confirm('정말로 모든 데이터를 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      alert('데이터가 초기화되었습니다.');
    }
  };

  /**
   * 설정 저장 함수
   */
  const saveSettings = () => {
    alert('설정이 저장되었습니다.');
    // 여기에 설정 저장 로직 추가
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settings}>
        {/* 헤더 섹션 */}
        <div className={styles.headerSection}>
          <h2 className={styles.sectionTitle}>설정</h2>
          <p>앱의 설정을 관리하고 개인화합니다.</p>
        </div>

        {/* 프로필 섹션 */}
        <div className={styles.profileSection}>
          <h2 className={styles.sectionTitle}>프로필</h2>

          <div className={styles.profileImageContainer}>
            <div className={styles.profileImage}>
              {/* 프로필 이미지 */}
              <span>👤</span>
            </div>
            <button
              className={styles.changeProfileButton}
              onClick={handleProfileImageChange}
            >
              이미지 변경
            </button>
          </div>

          <div className={styles.settingItem}>
            <div>
              <div className={styles.settingLabel}>사용자 이름</div>
              <div className={styles.settingDescription}>앱에서 표시될 이름</div>
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
        </div>

        {/* 테마 섹션 */}
        <div className={styles.themeSection}>
          <h2 className={styles.sectionTitle}>테마 설정</h2>

          <div className={styles.settingItem}>
            <div>
              <div className={styles.settingLabel}>앱 테마</div>
              <div className={styles.settingDescription}>앱의 외관 모드를 선택하세요</div>
            </div>
            <select
              className={styles.themeSelect}
              value={theme}
              onChange={handleThemeChange}
            >
              <option value="light">밝은 테마</option>
              <option value="dark">어두운 테마</option>
              <option value="system">시스템 설정 따르기</option>
            </select>
          </div>
        </div>

        {/* 알림 섹션 */}
        <div className={styles.notificationsSection}>
          <h2 className={styles.sectionTitle}>알림 설정</h2>

          <div className={styles.settingItem}>
            <div>
              <div className={styles.settingLabel}>일일 리마인더</div>
              <div className={styles.settingDescription}>매일 계획 확인 알림</div>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={notifications.dailyReminder}
                onChange={() => toggleNotification('dailyReminder')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.settingItem}>
            <div>
              <div className={styles.settingLabel}>주간 보고서</div>
              <div className={styles.settingDescription}>일주일 계획 성취도 보고</div>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={notifications.weeklyReport}
                onChange={() => toggleNotification('weeklyReport')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.settingItem}>
            <div>
              <div className={styles.settingLabel}>앱 업데이트</div>
              <div className={styles.settingDescription}>새로운 기능 및 개선사항 알림</div>
            </div>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={notifications.appUpdates}
                onChange={() => toggleNotification('appUpdates')}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        {/* 데이터 관리 섹션 */}
        <div className={styles.dataSection}>
          <h2 className={styles.sectionTitle}>데이터 관리</h2>

          <div className={styles.settingItem}>
            <div>
              <div className={styles.settingLabel}>데이터 초기화</div>
              <div className={styles.settingDescription}>모든 계획과 설정을 초기화합니다</div>
            </div>
            <button
              className={styles.dataButton}
              onClick={handleDataReset}
            >
              초기화
            </button>
          </div>

          <button
            className={styles.saveButton}
            onClick={saveSettings}
          >
            저장
          </button>
        </div>

        {/* 하단 탭 바 */}
        <TabBar />
      </div>
    </div>
  );
}
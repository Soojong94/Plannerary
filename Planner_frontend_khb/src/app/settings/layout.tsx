// src/app/settings/layout.tsx
import React from 'react';

/**
 * 설정 페이지의 레이아웃 컴포넌트
 * 설정 관련 페이지들의 공통 레이아웃을 정의
 * 
 * @param children 자식 컴포넌트
 */
export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}
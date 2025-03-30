// src/app/diary/layout.tsx
import React from 'react';

/**
 * 다이어리 페이지의 레이아웃 컴포넌트
 * 다이어리 관련 페이지들의 공통 레이아웃을 정의
 * 
 * @param children 자식 컴포넌트
 */
export default function DiaryLayout({
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
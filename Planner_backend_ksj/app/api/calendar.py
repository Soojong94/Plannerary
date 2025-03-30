# app/api/calendar.py

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.calendar_service import get_monthly_buckets, get_bucket_detail
import calendar as cal
from datetime import datetime

calendar_bp = Blueprint('calendar', __name__)

@calendar_bp.route('/monthly/<int:year>/<int:month>', methods=['GET'])
@jwt_required()
def get_monthly_calendar(year, month):
    """
    월별 달력 데이터 조회 엔드포인트
    - 해당 월의 모든 날짜와 각 날짜에 해당하는 버킷리스트 정보를 반환
    """
    user_id = get_jwt_identity()
    
    # 해당 월의 날짜 수 계산
    last_day = cal.monthrange(year, month)[1]
    
    # 서비스 계층 호출하여 월별 버킷리스트 데이터 조회
    buckets_by_date = get_monthly_buckets(user_id, year, month)
    
    # 달력 데이터 구성
    calendar_data = []
    for day in range(1, last_day + 1):
        date_str = f"{year}-{month:02d}-{day:02d}"
        
        # 해당 날짜의 버킷리스트 데이터 가져오기
        day_buckets = buckets_by_date.get(date_str, [])
        
        # 각 일자별 데이터 구성
        day_data = {
            "date": date_str,
            "day": day,
            "buckets": [
                {
                    "bucket_id": bucket["bucket_id"],
                    "title": bucket["bucket_title"],
                    "category": bucket["bucket_category"],
                    "achievement_rate": bucket["achievement_rate"]
                }
                for bucket in day_buckets
            ],
            "has_buckets": len(day_buckets) > 0,
            "buckets_count": len(day_buckets)
        }
        
        calendar_data.append(day_data)
    
    # 응답 데이터 구성
    response = {
        "year": year,
        "month": month,
        "days": calendar_data
    }
    
    return jsonify(response)

@calendar_bp.route('/bucket/<int:bucket_id>', methods=['GET'])
@jwt_required()
def get_bucket_details(bucket_id):
    """
    특정 버킷리스트의 상세 정보 조회 엔드포인트
    - 버킷리스트 ID로 상세 정보와 관련 계획들을 조회
    """
    user_id = get_jwt_identity()
    
    # 서비스 계층 호출하여 버킷리스트 상세 정보 조회
    bucket_detail = get_bucket_detail(user_id, bucket_id)
    
    if not bucket_detail:
        return jsonify({"error": "버킷리스트를 찾을 수 없거나 접근 권한이 없습니다."}), 404
    
    return jsonify(bucket_detail)


# ```

# ```javascript
# // src/services/calendarService.js
# import apiClient from './api';

# const calendarService = {
#   // 월별 캘린더 데이터 조회
#   getMonthlyCalendar: async (year, month) => {
#     const response = await apiClient.get(`/calendar/monthly/${year}/${month}`);
#     return response.data;
#   },

#   // 버킷리스트 상세 정보 조회
#   getBucketDetail: async (bucketId) => {
#     const response = await apiClient.get(`/calendar/bucket/${bucketId}`);
#     return response.data;
#   }
# };

# export default calendarService;
# ```

# ```javascript
# // src/hooks/useCalendar.js
# import { useState, useEffect } from 'react';
# import calendarService from '../services/calendarService';

# export const useCalendar = () => {
#   const [date, setDate] = useState(new Date());
#   const [calendarData, setCalendarData] = useState({ days: [] });
#   const [selectedBucket, setSelectedBucket] = useState(null);
#   const [loading, setLoading] = useState(false);
#   const [error, setError] = useState(null);

#   // 월별 캘린더 데이터 조회
#   const fetchCalendarData = async () => {
#     const year = date.getFullYear();
#     const month = date.getMonth() + 1; // JavaScript의 월은 0부터 시작

#     try {
#       setLoading(true);
#       setError(null);
#       const data = await calendarService.getMonthlyCalendar(year, month);
#       setCalendarData(data);
#     } catch (err) {
#       setError('캘린더 데이터를 불러오는 데 실패했습니다.');
#       console.error('캘린더 데이터 조회 오류:', err);
#     } finally {
#       setLoading(false);
#     }
#   };

#   // 버킷리스트 상세 정보 조회
#   const fetchBucketDetail = async (bucketId) => {
#     try {
#       setLoading(true);
#       setError(null);
#       const data = await calendarService.getBucketDetail(bucketId);
#       setSelectedBucket(data);
#     } catch (err) {
#       setError('버킷리스트 정보를 불러오는 데 실패했습니다.');
#       console.error('버킷리스트 조회 오류:', err);
#     } finally {
#       setLoading(false);
#     }
#   };

#   // 날짜 변경 시 캘린더 데이터 다시 조회
#   useEffect(() => {
#     fetchCalendarData();
#   }, [date]);

#   // 버킷리스트 선택 핸들러
#   const handleSelectBucket = (bucketId) => {
#     fetchBucketDetail(bucketId);
#   };

#   // 이전 달로 이동
#   const goToPreviousMonth = () => {
#     setDate(prevDate => {
#       const newDate = new Date(prevDate);
#       newDate.setMonth(newDate.getMonth() - 1);
#       return newDate;
#     });
#   };

#   // 다음 달로 이동
#   const goToNextMonth = () => {
#     setDate(prevDate => {
#       const newDate = new Date(prevDate);
#       newDate.setMonth(newDate.getMonth() + 1);
#       return newDate;
#     });
#   };

#   return {
#     date,
#     calendarData,
#     selectedBucket,
#     loading,
#     error,
#     handleSelectBucket,
#     goToPreviousMonth,
#     goToNextMonth,
#     refreshCalendar: fetchCalendarData
#   };
# };
# ```

# ```jsx
# // src/components/calendar/Calendar.jsx
# import React from 'react';
# import { format } from 'date-fns';
# import { ko } from 'date-fns/locale';
# import { ChevronLeft, ChevronRight } from 'lucide-react';
# import { useCalendar } from '../../hooks/useCalendar';
# import BucketDetail from './BucketDetail';

# const Calendar = () => {
#   const {
#     date,
#     calendarData,
#     selectedBucket,
#     loading,
#     error,
#     handleSelectBucket,
#     goToPreviousMonth,
#     goToNextMonth
#   } = useCalendar();

#   // 요일 배열
#   const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

#   // 달력 그리드 생성
#   const createCalendarGrid = () => {
#     const year = date.getFullYear();
#     const month = date.getMonth();
    
#     // 해당 월의 첫날
#     const firstDayOfMonth = new Date(year, month, 1);
    
#     // 첫날의 요일 (0: 일요일, 6: 토요일)
#     const firstDayOfWeek = firstDayOfMonth.getDay();
    
#     // 이전 달의 마지막 날짜들 계산
#     const prevMonthDays = [];
#     if (firstDayOfWeek > 0) {
#       const prevMonth = new Date(year, month, 0);
#       const prevMonthLastDay = prevMonth.getDate();
      
#       for (let i = firstDayOfWeek - 1; i >= 0; i--) {
#         prevMonthDays.push({
#           day: prevMonthLastDay - i,
#           isCurrentMonth: false,
#           date: new Date(year, month - 1, prevMonthLastDay - i)
#         });
#       }
#     }
    
#     // 현재 달의 날짜들
#     const days = calendarData.days.map(dayData => ({
#       ...dayData,
#       isCurrentMonth: true,
#       date: new Date(dayData.date)
#     }));
    
#     // 다음 달의 날짜들 계산 (6주 캘린더를 채우기 위해)
#     const totalCells = 6 * 7; // 6주 x 7일
#     const nextMonthDays = [];
#     const daysNeeded = totalCells - (prevMonthDays.length + days.length);
    
#     for (let i = 1; i <= daysNeeded; i++) {
#       nextMonthDays.push({
#         day: i,
#         isCurrentMonth: false,
#         date: new Date(year, month + 1, i)
#       });
#     }
    
#     // 모든 날짜 합치기
#     return [...prevMonthDays, ...days, ...nextMonthDays];
#   };

#   // 날짜 셀 렌더링
#   const renderDateCell = (dateData) => {
#     const isToday = dateData.isCurrentMonth && 
#       new Date().toDateString() === dateData.date.toDateString();
    
#     return (
#       <div 
#         key={dateData.date.toString()}
#         className={`
#           border p-1 h-24 md:h-32 overflow-y-auto
#           ${dateData.isCurrentMonth ? 'bg-white' : 'bg-gray-100 text-gray-400'}
#           ${isToday ? 'bg-blue-50' : ''}
#         `}
#       >
#         <div className="flex justify-between">
#           <span className={`text-sm ${isToday ? 'font-bold text-blue-600' : ''}`}>
#             {dateData.day}
#           </span>
#           {dateData.buckets_count > 0 && (
#             <span className="text-xs bg-blue-500 text-white rounded-full px-2">
#               {dateData.buckets_count}
#             </span>
#           )}
#         </div>
        
#         {dateData.buckets && dateData.buckets.map(bucket => (
#           <div 
#             key={bucket.bucket_id}
#             className="mt-1 p-1 text-xs bg-blue-100 rounded cursor-pointer hover:bg-blue-200"
#             onClick={() => handleSelectBucket(bucket.bucket_id)}
#           >
#             <div className="truncate">{bucket.title}</div>
#             <div className="flex justify-between items-center mt-1">
#               <span className="text-xs text-gray-500">{bucket.category}</span>
#               <span className="text-xs font-medium">{bucket.achievement_rate}%</span>
#             </div>
#           </div>
#         ))}
#       </div>
#     );
#   };

#   return (
#     <div className="container mx-auto p-4">
#       {error && <div className="text-red-500 mb-4">{error}</div>}
      
#       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
#         <div className="md:col-span-2">
#           {/* 캘린더 헤더 */}
#           <div className="flex justify-between items-center mb-4">
#             <h2 className="text-xl font-bold">
#               {format(date, 'yyyy년 MM월', { locale: ko })}
#             </h2>
#             <div className="flex space-x-2">
#               <button 
#                 onClick={goToPreviousMonth}
#                 className="p-2 rounded hover:bg-gray-100"
#               >
#                 <ChevronLeft size={20} />
#               </button>
#               <button 
#                 onClick={goToNextMonth}
#                 className="p-2 rounded hover:bg-gray-100"
#               >
#                 <ChevronRight size={20} />
#               </button>
#             </div>
#           </div>
          
#           {/* 요일 헤더 */}
#           <div className="grid grid-cols-7 gap-1 mb-1">
#             {weekdays.map(day => (
#               <div key={day} className="text-center font-medium">
#                 {day}
#               </div>
#             ))}
#           </div>
          
#           {/* 캘린더 그리드 */}
#           {loading ? (
#             <div className="flex justify-center items-center h-96">
#               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
#             </div>
#           ) : (
#             <div className="grid grid-cols-7 gap-1">
#               {createCalendarGrid().map(dateData => renderDateCell(dateData))}
#             </div>
#           )}
#         </div>
        
#         {/* 버킷리스트 상세 정보 */}
#         <div className="md:col-span-1">
#           {selectedBucket ? (
#             <BucketDetail bucket={selectedBucket} />
#           ) : (
#             <div className="bg-gray-50 p-4 rounded-lg h-full flex items-center justify-center">
#               <p className="text-gray-500">버킷리스트를 선택하면 상세 정보가 여기에 표시됩니다.</p>
#             </div>
#           )}
#         </div>
#       </div>
#     </div>
#   );
# };

# export default Calendar;
# ```

# ```jsx
# // src/components/calendar/BucketDetail.jsx
# import React from 'react';
# import { format } from 'date-fns';
# import { Progress } from '@/components/ui/progress';

# const BucketDetail = ({ bucket }) => {
#   if (!bucket) return null;

#   return (
#     <div className="bg-white p-4 rounded-lg shadow">
#       <h2 className="text-xl font-bold mb-2">{bucket.title}</h2>
      
#       {/* 카테고리 */}
#       <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded inline-block mb-4">
#         {bucket.category}
#       </div>
      
#       {/* 기본 정보 */}
#       <div className="space-y-3 mb-4">
#         <div>
#           <p className="text-sm text-gray-500">기간</p>
#           <p className="font-medium">
#             {bucket.start_date && format(new Date(bucket.start_date), 'yyyy년 MM월 dd일')}
#             {bucket.end_date && ` ~ ${format(new Date(bucket.end_date), 'yyyy년 MM월 dd일')}`}
#             {bucket.duration_days && ` (${bucket.duration_days}일)`}
#           </p>
#         </div>
        
#         {/* 예산 정보 */}
#         {bucket.budget && bucket.budget.total > 0 && (
#           <div>
#             <p className="text-sm text-gray-500">예산</p>
#             <div className="flex justify-between">
#               <p className="font-medium">{bucket.budget.total.toLocaleString()}원</p>
#               <p className="text-sm">
#                 사용: {bucket.budget.used.toLocaleString()}원 / 
#                 남은 금액: {bucket.budget.available.toLocaleString()}원
#               </p>
#             </div>
#           </div>
#         )}
        
#         {/* 성공 기준 */}
#         {bucket.success_criteria && (
#           <div>
#             <p className="text-sm text-gray-500">성공 기준</p>
#             <p>{bucket.success_criteria}</p>
#           </div>
#         )}
        
#         {/* 달성률 */}
#         <div>
#           <div className="flex justify-between mb-1">
#             <p className="text-sm text-gray-500">전체 달성률</p>
#             <p className="font-medium">{bucket.achievement_rate}%</p>
#           </div>
#           <Progress value={bucket.achievement_rate} className="h-2" />
#         </div>
#       </div>
      
#       {/* 관련 계획 목록 */}
#       {bucket.plans && bucket.plans.length > 0 && (
#         <div>
#           <h3 className="text-lg font-semibold mb-2">세부 계획</h3>
#           <div className="space-y-2">
#             {bucket.plans.map(plan => (
#               <div key={plan.plan_id} className="border p-3 rounded">
#                 <div className="flex justify-between items-start">
#                   <div>
#                     <p className="font-medium">{plan.title}</p>
#                     {plan.due_date && (
#                       <p className="text-xs text-gray-500">
#                         마감: {format(new Date(plan.due_date), 'yyyy년 MM월 dd일')}
#                       </p>
#                     )}
#                   </div>
#                   <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
#                     {plan.status}
#                   </div>
#                 </div>
                
#                 <div className="mt-2">
#                   <div className="flex justify-between mb-1">
#                     <p className="text-xs text-gray-500">진행률: {plan.achievement_rate}%</p>
#                     {plan.target && (
#                       <p className="text-xs">
#                         {plan.progress} / {plan.target}
#                       </p>
#                     )}
#                   </div>
#                   <Progress value={plan.achievement_rate} className="h-1.5" />
#                 </div>
#               </div>
#             ))}
#           </div>
#         </div>
#       )}
#     </div>
#   );
# };

# export default BucketDetail;
# ```
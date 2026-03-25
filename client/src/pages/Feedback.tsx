// pages/FeedbackForm.tsx
import React, { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/Hook.ts";
import { toast } from "react-toastify";
import Pagination2 from "../components/Pagination2.tsx";
import { TestimonialCard, testimonialStyles } from "../components/TestimonialCarousel.tsx";
import { fetchFeedbacks, submitFeedback } from "../slices/feedbackSlice.ts";
import type { Feedback } from '../types/type';
import Header from "../components/Header.tsx";

export const FeedbackForm = () => {
    const { currentUser } = useAppSelector((state) => state.user);
    const { feedbacks, loading: feedbackLoading } = useAppSelector((state) => state.feedback);
    const dispatch = useAppDispatch();

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    const autoSlideInterval = useRef<number | null>(null);

    useEffect(() => {
        dispatch(fetchFeedbacks());
        return () => {
            if (autoSlideInterval.current) {
                clearInterval(autoSlideInterval.current);
            }
        };
    }, [dispatch]);

    useEffect(() => {
        if (feedbacks.length > 0) {
            if (autoSlideInterval.current) {
                clearInterval(autoSlideInterval.current);
            }
            const interval = window.setInterval(() => {
                setActiveTab((prev) => (prev + 1) % feedbacks.length);
            }, 4000);
            autoSlideInterval.current = interval;
        }
        return () => {
            if (autoSlideInterval.current) {
                clearInterval(autoSlideInterval.current);
            }
        };
    }, [feedbacks.length]);

    // Pagination cho danh sách feedback
    const [currPage, setCurrPage] = useState(1);
    const perPage = 4;
    const totalPages = Math.ceil(feedbacks.length / perPage);
    const start = (currPage - 1) * perPage;
    const end = start + perPage;
    const paginatedFeedback = feedbacks.slice(start, end);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrPage(page);
        }
    };

    const ratingStats = [5, 4, 3, 2, 1].map((star) => {
        const count = feedbacks.filter((fb) => fb.rating === star).length;
        const percentage = feedbacks.length ? Math.round((count / feedbacks.length) * 100) : 0;
        return { star, count, percentage };
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0 || !comment.trim()) {
            toast.warning("Vui lòng chọn số sao và nhập nội dung đánh giá!!", { autoClose: 2000 });
            return;
        }
        setSubmitting(true);
        try {
            const feedbackData = {
                userId: currentUser?.id ? Number(currentUser.id) : null,
                userName: currentUser?.fullName || currentUser?.email || "Khách",
                userAvatar: currentUser?.avatar || null,
                rating,
                comment: comment.trim()
            };
            await dispatch(submitFeedback(feedbackData)).unwrap();
            setRating(0);
            setComment("");
            toast.success("Cảm ơn bạn đã gửi đánh giá!!", { autoClose: 1500 });
            setTimeout(() => {
                setShowModal(false);
            }, 1500);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            toast.error('Lỗi gửi đánh giá! Vui lòng thử lại.');
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString("vi-VN");
    };

    const defaultAvatars = [
        'https://images.unsplash.com/photo-1440589473619-3cde28941638?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1481824429379-07aa5e5b0739?ixlib=rb-4.0.3&auto=format&fit=crop&w=396&q=80',
        'https://images.unsplash.com/photo-1517256673644-36ad11246d21?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80',
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80',
    ];

    const handleAvatarClick = (index: number) => {
        setActiveTab(index);
        if (autoSlideInterval.current) {
            clearInterval(autoSlideInterval.current);
            const newInterval = window.setInterval(() => {
                setActiveTab((prev) => (prev + 1) % feedbacks.length);
            }, 4000);
            autoSlideInterval.current = newInterval;
        }
    };

    return (
       <>
            <Header/>
           <div className="feedback-page">
               <style>{testimonialStyles}</style>
               <style>{`
                .fui-testimonial-1 {
                    margin-top: 30px;
                    padding-top: 33px;
                    position: relative;
                    isolation: isolate;
                }
                .fui-testimonial-1 .testimonialWrap {
                    margin-top: 30px;
                    padding-block: 38px;
                    position: relative;
                }
                .fui-testimonial-1 .testimonialBodyList {
                    position: relative;
                    width: 100%;
                    margin-bottom: 200px;
                    height: 200px;
                    margin-top: -100px;
                }
                .testimoniaPersonalList {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin-top: 50px;
                    flex-wrap: wrap;
                }
                .testimoniaPersonalItem {
                    border-radius: 100rem;
                    position: relative;
                    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    width: 80px;
                    height: 80px;
                }
                .testimoniaPersonalItem:hover {
                    transform: translateY(-5px);
                }
                .testimoniaPersonalItem.active .testimoniaPersonalImage {
                    border-color: #6B7597;
                }
                .testimoniaPersonalItem img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 100rem;
                }
                .testimoniaPersonalImage {
                    width: 100%;
                    height: 100%;
                    border-radius: 100rem;
                    border: 3px solid white;
                    transition: all 0.3s ease;
                }
                .testimoniaPersonalImage:hover {
                    border-color: #6B7597;
                }
                @media (max-width: 1023px) {
                    .fui-testimonial-1 {
                        padding-top: 30px;
                        margin-top: 60px;
                    }
                    .fui-testimonial-1 .testimonialBodyList {
                        height: 100px;
                        margin-top: -75px;
                        margin-bottom: 275px;
                    }
                    .testimonialItem {
                        width: 100% !important;
                        padding-inline: 20px;
                    }
                    .feedback-content {
                        grid-template-columns: 1fr !important;
                    }
                }
                @media (max-width: 739px) {
                    .testimonialBodyPersonal {
                        margin-top: 30px;
                    }
                    .testimonialRate {
                        margin-bottom: 30px;
                    }
                    .fui-testimonial-1 .testimonialBodyList {
                        margin-bottom: 235px;
                    }
                    .testimonialText {
                        font-size: 14px;
                    }
                    .testimonialWrap {
                        padding-bottom: 0;
                    }
                    .testimoniaPersonalItem {
                        width: 60px !important;
                        height: 60px !important;
                    }
                }
            `}</style>

               {/* Testimonial Section */}
               <div className="fui-testimonial-1">
                   <div className="testimonialWrap">
                       <div className="testimonialBodyList">
                           {feedbacks.length > 0 ? (
                               feedbacks.map((feedback: Feedback, index: number) => (
                                   <TestimonialCard
                                       key={feedback.id}
                                       feedback={feedback}
                                       isActive={index === activeTab}
                                   />
                               ))
                           ) : (
                               <TestimonialCard
                                   feedback={{
                                       id: 0,
                                       userName: "UniLife Hub",
                                       rating: 0,
                                       comment: "Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!",
                                       created_at: new Date().toISOString()
                                   }}
                                   isActive={true}
                               />
                           )}
                       </div>

                       {/* Chỉ hiển thị tối đa 3 avatar */}
                       {feedbacks.length > 0 && (
                           <div className="testimoniaPersonalList">
                               {feedbacks.slice(0, 3).map((fb, index) => (
                                   <div
                                       key={fb.id}
                                       className={`testimoniaPersonalItem ${index === activeTab ? 'active' : ''}`}
                                       onClick={() => handleAvatarClick(index)}
                                   >
                                       <div className="testimoniaPersonalImage">
                                           <img
                                               src={fb.userAvatar || defaultAvatars[index % defaultAvatars.length]}
                                               alt={fb.userName}
                                               onError={(e) => {
                                                   e.currentTarget.src = defaultAvatars[index % defaultAvatars.length];
                                               }}
                                           />
                                       </div>
                                   </div>
                               ))}
                           </div>
                       )}
                   </div>
               </div>

               {/* Content Section */}
               <div className="feedback-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
                   <div style={{
                       display: 'flex',
                       justifyContent: 'space-between',
                       alignItems: 'center',
                       marginBottom: '40px',
                       flexWrap: 'wrap',
                       gap: '20px'
                   }}>
                       <div>
                           <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6B7597' }}>
                               Hãy đánh giá trải nghiệm của bạn
                           </p>
                           <p style={{
                               fontFamily: "'Berkshire Swash', cursive",
                               color: "#555",
                               lineHeight: "1.8",
                               fontSize: '1.1rem'
                           }}>
                               Đó là cách chúng tôi ghi nhận và cải tiến UniLife Hub ngày một thân thiện hơn
                           </p>
                       </div>
                       <button
                           className="show-form-btn"
                           onClick={() => setShowModal(true)}
                           style={{
                               background: '#6B7597',
                               color: 'white',
                               border: 'none',
                               padding: '12px 30px',
                               borderRadius: '30px',
                               fontWeight: '600',
                               cursor: 'pointer',
                               transition: '0.3s',
                               fontSize: '1rem',
                               boxShadow: '0 4px 15px rgba(107, 117, 151, 0.3)'
                           }}
                           onMouseEnter={(e) => e.currentTarget.style.background = '#565D7C'}
                           onMouseLeave={(e) => e.currentTarget.style.background = '#6B7597'}
                       >
                           Đánh giá ngay
                       </button>
                   </div>

                   <div style={{
                       display: 'grid',
                       gridTemplateColumns: '1fr 2fr',
                       gap: '40px',
                       marginBottom: '40px'
                   }}>
                       {/* Rating Statistics */}
                       <div style={{
                           background: 'white',
                           padding: '25px',
                           borderRadius: '15px',
                           boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                       }}>
                           <h3 style={{
                               color: '#6B7597',
                               marginBottom: '20px',
                               fontSize: '1.5rem'
                           }}>
                               Thống kê đánh giá
                           </h3>
                           {ratingStats.map((stat) => (
                               <div key={stat.star} style={{
                                   display: 'flex',
                                   alignItems: 'center',
                                   gap: '15px',
                                   marginBottom: '12px'
                               }}>
                                <span style={{
                                    minWidth: '40px',
                                    fontWeight: 'bold',
                                    color: '#6B7597'
                                }}>
                                    {stat.star} ★
                                </span>
                                   <div style={{
                                       flex: 1,
                                       height: '10px',
                                       background: '#eee',
                                       borderRadius: '5px',
                                       overflow: 'hidden'
                                   }}>
                                       <div
                                           style={{
                                               height: '100%',
                                               background: '#EAC248',
                                               width: `${stat.percentage}%`,
                                               transition: 'width 0.5s ease'
                                           }}
                                       />
                                   </div>
                                   <span style={{
                                       minWidth: '50px',
                                       textAlign: 'right',
                                       fontSize: '0.9rem',
                                       color: '#666'
                                   }}>
                                    {stat.count} đánh giá
                                </span>
                               </div>
                           ))}
                           <div style={{
                               marginTop: '20px',
                               paddingTop: '15px',
                               borderTop: '1px solid #eee',
                               textAlign: 'center'
                           }}>
                               <p style={{ fontSize: '0.9rem', color: '#666' }}>
                                   Tổng: <strong>{feedbacks.length}</strong> đánh giá
                               </p>
                           </div>
                       </div>

                       {/* Feedback List */}
                       <div style={{
                           background: 'white',
                           borderRadius: '15px',
                           padding: '25px',
                           boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                       }}>
                           <h3 style={{
                               color: '#6B7597',
                               marginBottom: '20px',
                               fontSize: '1.5rem'
                           }}>
                               Phản hồi của người dùng
                           </h3>
                           {feedbacks.length === 0 ? (
                               <p style={{
                                   textAlign: 'center',
                                   color: '#777',
                                   fontStyle: 'italic',
                                   padding: '40px 0'
                               }}>
                                   Chưa có đánh giá nào.
                               </p>
                           ) : feedbackLoading ? (
                               <p style={{
                                   textAlign: 'center',
                                   color: '#666',
                                   padding: '40px 0'
                               }}>
                                   Đang tải đánh giá...
                               </p>
                           ) : (
                               <>
                                   {paginatedFeedback.map((fb) => (
                                       <div key={fb.id} style={{
                                           background: '#f8f9fa',
                                           borderRadius: '10px',
                                           padding: '20px',
                                           marginBottom: '15px',
                                           borderLeft: '4px solid #6B7597'
                                       }}>
                                           <div style={{
                                               display: 'flex',
                                               justifyContent: 'space-between',
                                               alignItems: 'flex-start',
                                               marginBottom: '10px'
                                           }}>
                                               <div style={{
                                                   display: 'flex',
                                                   alignItems: 'center',
                                                   gap: '10px'
                                               }}>
                                                   {fb.userAvatar && (
                                                       <img
                                                           src={fb.userAvatar}
                                                           alt="avatar"
                                                           style={{
                                                               width: '40px',
                                                               height: '40px',
                                                               borderRadius: '50%',
                                                               objectFit: 'cover',
                                                               border: '2px solid #6B7597'
                                                           }}
                                                           onError={(e) => {
                                                               e.currentTarget.style.display = 'none';
                                                           }}
                                                       />
                                                   )}
                                                   <div>
                                                    <span style={{
                                                        fontWeight: 'bold',
                                                        color: '#6B7597',
                                                        display: 'block'
                                                    }}>
                                                        {fb.userName}
                                                    </span>
                                                       <span style={{
                                                           color: '#666',
                                                           fontSize: '0.9rem',
                                                           display: 'flex',
                                                           alignItems: 'center',
                                                           gap: '5px'
                                                       }}>
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <span
                                                                key={i}
                                                                style={{
                                                                    color: i < fb.rating ? '#EAC248' : '#ddd',
                                                                    fontSize: '1rem'
                                                                }}
                                                            >
                                                                ★
                                                            </span>
                                                        ))}
                                                    </span>
                                                   </div>
                                               </div>
                                               <span style={{
                                                   fontSize: '0.8rem',
                                                   color: '#888'
                                               }}>
                                                {formatDate(fb.created_at)}
                                            </span>
                                           </div>
                                           <p style={{
                                               color: 'black',
                                               lineHeight: '1.6',
                                               marginBottom: '0'
                                           }}>
                                               {fb.comment}
                                           </p>
                                       </div>
                                   ))}
                                   {totalPages > 1 && (
                                       <div style={{ marginTop: '30px' }}>
                                           <Pagination2
                                               currPage={currPage}
                                               totalPages={totalPages}
                                               onChangePage={handlePageChange}
                                           />
                                       </div>
                                   )}
                               </>
                           )}
                       </div>
                   </div>
               </div>

               {/* Feedback Modal */}
               {showModal && (
                   <div className="modal-overlay" onClick={() => setShowModal(false)}>
                       <div
                           className="modal-content"
                           onClick={(e) => e.stopPropagation()}
                           style={{
                               background: 'white',
                               padding: '30px',
                               borderRadius: '15px',
                               maxWidth: '500px',
                               width: '90%',
                               textAlign: 'center',
                               boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                           }}
                       >
                           <h2 style={{
                               color: '#6B7597',
                               marginBottom: '20px',
                               fontSize: '1.8rem'
                           }}>
                               Đánh giá website UniLife Hub
                           </h2>
                           <div style={{
                               fontSize: '2.5rem',
                               marginBottom: '15px',
                               display: 'flex',
                               justifyContent: 'center',
                               gap: '5px'
                           }}>
                               {[1, 2, 3, 4, 5].map((star) => (
                                   <span
                                       key={star}
                                       style={{
                                           cursor: 'pointer',
                                           color: star <= (hover || rating) ? '#EAC248' : '#ddd',
                                           transition: '0.2s',
                                           textShadow: star <= (hover || rating) ? '0 0 10px rgba(234, 194, 72, 0.5)' : 'none',
                                           fontSize: '3rem'
                                       }}
                                       onClick={() => setRating(star)}
                                       onMouseEnter={() => setHover(star)}
                                       onMouseLeave={() => setHover(0)}
                                   >
                                    ★
                                </span>
                               ))}
                           </div>
                           <p style={{
                               fontSize: '1rem',
                               color: '#666',
                               marginBottom: '20px',
                               minHeight: '24px'
                           }}>
                               {rating ? `Bạn đã chọn: ${"★".repeat(rating)}` : "Vui lòng chọn số sao"}
                           </p>
                           <form onSubmit={handleSubmit}>
                            <textarea
                                rows={5}
                                placeholder="Nhập nhận xét của bạn..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                disabled={submitting}
                                style={{
                                    width: '100%',
                                    border: '1px solid #ddd',
                                    borderRadius: '10px',
                                    padding: '15px',
                                    fontSize: '1rem',
                                    resize: 'none',
                                    marginBottom: '20px',
                                    outline: 'none',
                                    fontFamily: 'inherit',
                                    transition: 'border-color 0.3s'
                                }}
                            />
                               <div style={{ display: 'flex', gap: '10px' }}>
                                   <button
                                       type="button"
                                       onClick={() => setShowModal(false)}
                                       style={{
                                           flex: 1,
                                           background: '#f0f0f0',
                                           color: '#333',
                                           border: 'none',
                                           borderRadius: '8px',
                                           padding: '12px',
                                           fontWeight: '600',
                                           cursor: 'pointer',
                                           transition: '0.3s'
                                       }}
                                   >
                                       Hủy
                                   </button>
                                   <button
                                       type="submit"
                                       disabled={submitting}
                                       style={{
                                           flex: 1,
                                           background: submitting ? '#ccc' : '#6B7597',
                                           color: 'white',
                                           border: 'none',
                                           borderRadius: '8px',
                                           padding: '12px',
                                           fontWeight: '600',
                                           cursor: submitting ? 'not-allowed' : 'pointer',
                                           transition: '0.3s'
                                       }}
                                   >
                                       {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
                                   </button>
                               </div>
                           </form>
                       </div>
                   </div>
               )}

               <style>{`
                .modal-overlay {
                    position: fixed;
                    top: 0; left: 0;
                    width: 100vw; height: 100vh;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }
            `}</style>
           </div>
       </>
    );
};
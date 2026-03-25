import React from 'react';
import type { Feedback } from '../types/type';

interface TestimonialCardProps {
    feedback: Feedback;
    isActive: boolean;
    onClick?: () => void;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
                                                                    feedback,
                                                                    isActive,
                                                                    onClick
                                                                }) => {
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <svg
                key={index}
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.5 18L4.44658 21.7082L5.79366 13.8541L0.0873218 8.2918L7.97329 7.1459L11.5 0L15.0267 7.1459L22.9127 8.2918L17.2063 13.8541L18.5534 21.7082L11.5 18Z"
                    fill={index < rating ? "#EAC248" : "transparent"}
                    stroke={index < rating ? "#EAC248" : "#1E1B16"}
                    strokeWidth="1.5"
                />
            </svg>
        ));
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

    const getRandomAvatar = (index: number) => {
        return defaultAvatars[index % defaultAvatars.length];
    };

    return (
        <div
            className={`testimonialItem ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            <div className="testimonialContent">
                <div className="testimonialRate">
                    <span>{feedback.rating}.0</span>
                    <div className="testimonialRateIconList">
                        {renderStars(feedback.rating)}
                    </div>
                </div>
                <p className="testimonialText">
                    {feedback.comment}
                </p>
                <div className="testimonialBodyPersonal">
                    <div className="testimonialBodyPersonalImg">
                        <img
                            src={feedback.userAvatar || getRandomAvatar(feedback.id)}
                            alt={feedback.userName}
                            onError={(e) => {
                                e.currentTarget.src = getRandomAvatar(feedback.id);
                            }}
                        />
                    </div>
                    <h4 className="testimonialBodyPersonalName">
                        {feedback.userName}
                    </h4>
                </div>
            </div>
        </div>
    );
};

export const testimonialStyles = `
.testimonialItem {
    opacity: 0;
    transition: all 1s cubic-bezier(0.5, -0.01, 0, 1.005);
    position: absolute;
    top: 50%;
    left: 50%;
    width: 520px;
    height: 100%;
    transform: translateX(-50%) translateY(100%) rotateX(-70deg);
}
.testimonialItem.active {
    transform: translateX(-50%) translateY(0%) rotateX(0deg);
    opacity: 1;
}
.testimonialContent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.testimonialRate {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 46px;
    font-size: 20px;
    font-weight: 500;
    color: #6B7597;
}
.testimonialRateIconList {
    display: flex;
    align-items: center;
    gap: 10px;
}
.testimonialText {
    font-weight: 500;
    text-align: center;
    font-size: 1.1rem;
    line-height: 1.6;
    color: black;
    margin: 0;
    padding: 0 20px;
}
.testimonialBodyPersonal {
    margin-top: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 18px;
}
.testimonialBodyPersonalImg {
    width: 54px;
    height: 54px;
    border-radius: 100rem;
    border: 2px solid #6B7597;
    overflow: hidden;
}
.testimonialBodyPersonalImg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100rem;
}
.testimonialBodyPersonalName {
    font-size: 20px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #6B7597;
    margin: 0;
}
/* Responsive styles */
@media (max-width: 768px) {
    .testimonialItem {
        width: 90% !important;
        padding: 0 10px;
    }
    .testimonialText {
        font-size: 0.95rem;
        padding: 0 10px;
    }
    .testimonialRate {
        margin-bottom: 30px;
        font-size: 18px;
    }
    .testimonialBodyPersonal {
        margin-top: 30px;
    }
    .testimonialBodyPersonalImg {
        width: 45px;
        height: 45px;
    }
    .testimonialBodyPersonalName {
        font-size: 18px;
    }
}
@media (max-width: 480px) {
    .testimonialRate {
        flex-direction: column;
        gap: 8px;
    }
    .testimonialBodyPersonal {
        flex-direction: column;
        gap: 10px;
        text-align: center;
    }
}
`;
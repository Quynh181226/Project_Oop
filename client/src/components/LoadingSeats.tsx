import styled from 'styled-components';
import { useState, useEffect } from 'react';

const LoadingSeats = () => {
    const [showLoader, setShowLoader] = useState(true);
    const [showSeats, setShowSeats] = useState(false);

    useEffect(() => {
        // Sau 800ms, ẩn loader chính
        const timer1 = setTimeout(() => {
            setShowLoader(false);
            setShowSeats(true);
        }, 1500);

        // // Sau 1.5s (tổng thời gian), component sẽ unmount
        // const timer2 = setTimeout(() => {
        //     // Component sẽ unmount bởi parent
        // }, 2500);

        return () => {
            clearTimeout(timer1);
            // clearTimeout(timer2);
        };
    }, []);

    return (
        <StyledWrapper>
            <div className="loading-container">
                {showLoader ? (
                    <div className="loader" />
                ) : showSeats ? (
                    <div className="simple-seats-grid">
                        {Array.from({ length: 30 }).map((_, index) => (
                            <div
                                key={index}
                                className="seat-simple"
                                style={{
                                    animationDelay: `${index * 0.10}s`,
                                    '--index': index
                                } as React.CSSProperties}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 400px;
    }

    .loader {
        position: relative;
        width: 2.5em;
        height: 2.5em;
        transform: rotate(165deg);
    }

    .loader:before, .loader:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        width: 0.5em;
        height: 0.5em;
        border-radius: 0.25em;
        transform: translate(-50%, -50%);
    }

    .loader:before {
        animation: before8 2s infinite;
    }

    .loader:after {
        animation: after6 2s infinite;
    }

    @keyframes before8 {
        0% {
            width: 0.5em;
            box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
        }

        35% {
            width: 2.5em;
            box-shadow: 0 -0.5em rgba(225, 20, 98, 0.75), 0 0.5em rgba(111, 202, 220, 0.75);
        }

        70% {
            width: 0.5em;
            box-shadow: -1em -0.5em rgba(225, 20, 98, 0.75), 1em 0.5em rgba(111, 202, 220, 0.75);
        }

        100% {
            box-shadow: 1em -0.5em rgba(225, 20, 98, 0.75), -1em 0.5em rgba(111, 202, 220, 0.75);
        }
    }

    @keyframes after6 {
        0% {
            height: 0.5em;
            box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
        }

        35% {
            height: 2.5em;
            box-shadow: 0.5em 0 rgba(61, 184, 143, 0.75), -0.5em 0 rgba(233, 169, 32, 0.75);
        }

        70% {
            height: 0.5em;
            box-shadow: 0.5em -1em rgba(61, 184, 143, 0.75), -0.5em 1em rgba(233, 169, 32, 0.75);
        }

        100% {
            box-shadow: 0.5em 1em rgba(61, 184, 143, 0.75), -0.5em -1em rgba(233, 169, 32, 0.75);
        }
    }

    /* Grid ghế đơn giản - giống y như bạn muốn */
    .simple-seats-grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 0.5rem;
        justify-content: center;
    }

    .seat-simple {
        width: 2rem;
        height: 2rem;
        background: #374151;
        border-radius: 0.375rem;
        animation: gentlePulse 1.2s ease-in-out infinite;
        opacity: 0.7;

        /* Hiệu ứng ánh sáng nhẹ nhàng lướt qua */
        &:hover {
            background: #4B5563;
        }

        /* Hiệu ứng wave theo index */
        animation-delay: calc(var(--index) * 0.03s);
    }

    @keyframes gentlePulse {
        0%, 100% {
            opacity: 0.4;
            transform: scale(0.95);
            background: #374151;
            box-shadow: 0 0 0 rgba(59, 130, 246, 0);
        }
        50% {
            opacity: 1;
            transform: scale(1.05);
            background: #4B5563;
            box-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
        }
    }

    /* Responsive */
    @media (max-width: 640px) {
        .simple-seats-grid {
            grid-template-columns: repeat(8, 1fr);
            gap: 0.375rem;
        }

        .seat-simple {
            width: 1.25rem;
            height: 1.25rem;
        }
    }
`;

export default LoadingSeats;
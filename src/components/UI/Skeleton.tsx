import React from 'react';

interface SkeletonProps {
    width?: string;
    height?: string;
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular';
}

const Skeleton: React.FC<SkeletonProps> = ({
    width = '100%',
    height = '20px',
    className = '',
    variant = 'rectangular'
}) => {
    const baseClasses = 'animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%]';

    const variantClasses = {
        text: 'rounded',
        circular: 'rounded-full',
        rectangular: 'rounded-md'
    };

    const animationStyle = {
        animation: 'shimmer 1.5s ease-in-out infinite',
    };

    return (
        <>
            <style jsx>{`
                @keyframes shimmer {
                    0% {
                        background-position: 200% 0;
                    }
                    100% {
                        background-position: -200% 0;
                    }
                }
            `}</style>
            <div
                className={`${baseClasses} ${variantClasses[variant]} ${className}`}
                style={{
                    width,
                    height,
                    ...animationStyle
                }}
            />
        </>
    );
};

export default Skeleton;

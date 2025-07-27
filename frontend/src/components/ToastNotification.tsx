import React, { useEffect, useState } from 'react';
import design from '../design.json';

type ToastNotificationProps = {
  message: string;
  visible: boolean;
  onClose: () => void;
};

const ToastNotification: React.FC<ToastNotificationProps> = ({ message, visible, onClose }) => {
  const [progress, setProgress] = useState(100);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsAnimating(true);
      setProgress(100);
      
      // Start progress countdown
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(progressInterval);
            return 0;
          }
          return prev - (100 / 30); // Decrease by 100/30 every 100ms (3 seconds total)
        });
      }, 100);

      // Auto-hide after 3 seconds
      const hideTimeout = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => {
          onClose();
        }, 300); // Wait for slide-out animation
      }, 3000);

      return () => {
        clearInterval(progressInterval);
        clearTimeout(hideTimeout);
      };
    }
  }, [visible, onClose]);

  if (!visible && !isAnimating) {
    return null;
  }

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: design.spacing.lg,
          right: design.spacing.lg,
          backgroundColor: design.colors.background,
          color: design.colors.black,
          border: `1px solid ${design.colors.danger}`,
          borderRadius: design.radius.md,
          padding: design.spacing.md,
          boxShadow: design.shadow.modal,
          fontSize: design.font.sizes.base,
          fontWeight: design.font.weights.medium,
          fontFamily: design.font.family,
          minWidth: '300px',
          maxWidth: '400px',
          zIndex: 1000,
          transform: isAnimating ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          gap: design.spacing.sm,
        }}
      >
        {/* Header with close button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: design.spacing.sm,
            }}
          >
            {/* Error icon */}
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: design.colors.danger,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: design.colors.background,
                fontSize: design.font.sizes.sm,
                fontWeight: design.font.weights.bold,
              }}
            >
              !
            </div>
            <span style={{ fontWeight: design.font.weights.semibold }}>Error</span>
          </div>
          
          {/* Close button */}
          <button
            onClick={() => {
              setIsAnimating(false);
              setTimeout(() => {
                onClose();
              }, 300);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: design.colors.textSecondary,
              cursor: 'pointer',
              fontSize: design.font.sizes.lg,
              fontWeight: design.font.weights.bold,
              padding: '0',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = design.colors.secondary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            ×
          </button>
        </div>

        {/* Message */}
        <div style={{ lineHeight: '1.4' }}>
          {message}
        </div>

        {/* Progress bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            backgroundColor: design.colors.border,
            borderBottomLeftRadius: design.radius.md,
            borderBottomRightRadius: design.radius.md,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              backgroundColor: design.colors.danger,
              width: `${progress}%`,
              transition: 'width 0.1s linear',
            }}
          />
        </div>
      </div>

      {/* CSS for slide animations */}
      <style>
        {`
          @keyframes slideInFromRight {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
          
          @keyframes slideOutToRight {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </>
  );
};

export default ToastNotification; 
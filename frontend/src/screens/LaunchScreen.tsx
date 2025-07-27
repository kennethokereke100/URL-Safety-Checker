import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import design from '../design.json';
import SafetyLogo from '../assets/safetylogo.png';
import { isValidDomain } from '../utils/validation';

interface LaunchScreenProps {
  showToast: (message: string) => void;
}

const LaunchScreen: React.FC<LaunchScreenProps> = ({ showToast }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  
  // Handle scan button click with domain validation
  const handleScanClick = () => {
    const trimmedInput = inputValue.trim();
    
    // Validate domain format using utility function
    if (!isValidDomain(trimmedInput)) {
      showToast('Please enter a valid website address:\nexample.com, www.example.com or http://www.example.com');
      return;
    }
    
    // Navigate to SafetyChecker with the validated URL
    navigate('/safety-checker', { state: { url: trimmedInput } });
  };
  
  return (
    <div
      style={{
        backgroundColor: design.colors.backgroundAlt,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: design.spacing.lg,
      }}
    >
      {/* Floating Logo */}
      <img
        src={SafetyLogo}
        alt="Safety Logo"
        style={{
          width: '80px',
          height: '80px',
          marginBottom: design.spacing.lg,
          animation: 'float 2.5s ease-in-out infinite',
        }}
      />

      {/* Header */}
      <h1
        style={{
          fontSize: design.font.sizes['2xl'],
          fontWeight: design.font.weights.bold,
          color: design.colors.textPrimary,
          margin: 0,
          textAlign: 'center',
        }}
      >
        URL SAFETY CHECKER
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: design.font.sizes.base,
          color: design.colors.textSecondary,
          marginTop: design.spacing.sm,
          marginBottom: 0,
          textAlign: 'center',
        }}
      >
        Check if a URL is safe before you visit it
      </p>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Enter URL to scan..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '400px',
          marginTop: design.spacing.lg,
          padding: design.components.input.padding,
          borderRadius: design.components.input.borderRadius,
          border: `1px solid ${design.components.input.borderColor}`,
          backgroundColor: design.components.input.background,
          fontSize: design.font.sizes.base,
          fontFamily: design.font.family,
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />

      {/* Scan Button */}
      <button
        onClick={handleScanClick}
        style={{
          padding: design.components.button.padding,
          borderRadius: design.components.button.borderRadius,
          fontWeight: design.font.weights.medium,
          textTransform: design.components.button.textTransform as any,
          backgroundColor: design.colors.primary,
          color: '#FFFFFF',
          border: 'none',
          cursor: 'pointer',
          fontSize: design.font.sizes.base,
          fontFamily: design.font.family,
          marginTop: design.spacing.md,
          minWidth: '120px',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = design.colors.primaryHover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = design.colors.primary;
        }}
      >
        Scan
      </button>

      {/* CSS Animation for floating effect */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LaunchScreen;

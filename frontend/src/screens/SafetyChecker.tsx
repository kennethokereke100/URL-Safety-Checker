import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import design from '../design.json';

const SafetyChecker: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const url = location.state?.url || 'http://www.example.com'; // Fallback URL

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Mock data - replace with actual backend data
  const mockData = {
    status: 'safe', // or 'unsafe'
    url: url,
    lastChecked: '2024-01-15T10:30:00Z',
    sources: [
      { name: 'Google Safe Browsing', result: 'safe' },
    ]
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  // Skeleton loading component
  const SkeletonLoader = () => (
    <div
      style={{
        backgroundColor: design.colors.backgroundAlt,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: design.font.family,
        overflowY: 'auto',
      }}
    >
      {/* Back Button Skeleton */}
      <div
        style={{
          padding: design.spacing.lg,
          paddingBottom: design.spacing.md,
        }}
      >
        <Skeleton
          width={80}
          height={20}
          baseColor={design.colors.secondary}
          highlightColor={design.colors.border}
          borderRadius={design.radius.sm}
        />
      </div>

      {/* Main Content Skeleton */}
      <div
        style={{
          flex: 1,
          padding: `0 ${design.spacing.lg} ${design.spacing.lg} ${design.spacing.lg}`,
        }}
      >
        {/* Section 1: Overall Status Skeleton */}
        <div style={{ marginBottom: design.spacing.xl }}>
          <Skeleton
            width={200}
            height={32}
            baseColor={design.colors.secondary}
            highlightColor={design.colors.border}
            borderRadius={design.radius.sm}
            style={{ marginBottom: design.spacing.md }}
          />
          
          <div
            style={{
              backgroundColor: design.components.card.background,
              borderRadius: design.components.card.borderRadius,
              padding: design.components.card.padding,
              boxShadow: design.components.card.shadow,
              textAlign: 'center',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            <Skeleton
              width={100}
              height={28}
              baseColor={design.colors.secondary}
              highlightColor={design.colors.border}
              borderRadius={design.radius.sm}
            />
          </div>
        </div>

        {/* Divider Skeleton */}
        <div
          style={{
            height: '1px',
            backgroundColor: design.colors.border,
            margin: `${design.spacing.xl} 0`,
          }}
        />

        {/* Section 2: URL Info Skeleton */}
        <div style={{ marginBottom: design.spacing.xl }}>
          <Skeleton
            width={150}
            height={28}
            baseColor={design.colors.secondary}
            highlightColor={design.colors.border}
            borderRadius={design.radius.sm}
            style={{ marginBottom: design.spacing.md }}
          />
          
          <div
            style={{
              backgroundColor: design.components.card.background,
              borderRadius: design.components.card.borderRadius,
              padding: design.components.card.padding,
              boxShadow: design.components.card.shadow,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: design.spacing.sm,
              }}
            >
              <Skeleton
                width={60}
                height={16}
                baseColor={design.colors.secondary}
                highlightColor={design.colors.border}
                borderRadius={design.radius.sm}
              />
              <Skeleton
                width={200}
                height={16}
                baseColor={design.colors.secondary}
                highlightColor={design.colors.border}
                borderRadius={design.radius.sm}
              />
            </div>
            
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Skeleton
                width={100}
                height={16}
                baseColor={design.colors.secondary}
                highlightColor={design.colors.border}
                borderRadius={design.radius.sm}
              />
              <Skeleton
                width={120}
                height={16}
                baseColor={design.colors.secondary}
                highlightColor={design.colors.border}
                borderRadius={design.radius.sm}
              />
            </div>
          </div>
        </div>

        {/* Divider Skeleton */}
        <div
          style={{
            height: '1px',
            backgroundColor: design.colors.border,
            margin: `${design.spacing.xl} 0`,
          }}
        />

        {/* Section 3: Detailed Source Results Skeleton */}
        <div>
          <Skeleton
            width={250}
            height={28}
            baseColor={design.colors.secondary}
            highlightColor={design.colors.border}
            borderRadius={design.radius.sm}
            style={{ marginBottom: design.spacing.md }}
          />
          
          <div
            style={{
              backgroundColor: design.components.card.background,
              borderRadius: design.components.card.borderRadius,
              padding: design.components.card.padding,
              boxShadow: design.components.card.shadow,
            }}
          >
            {/* Table Header Skeleton */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: design.spacing.sm,
                marginBottom: design.spacing.sm,
                borderBottom: `1px solid ${design.colors.border}`,
              }}
            >
              <Skeleton
                width={80}
                height={16}
                baseColor={design.colors.secondary}
                highlightColor={design.colors.border}
                borderRadius={design.radius.sm}
              />
              <Skeleton
                width={60}
                height={16}
                baseColor={design.colors.secondary}
                highlightColor={design.colors.border}
                borderRadius={design.radius.sm}
              />
            </div>

            {/* Table Rows Skeleton */}
            {[1, 2, 3].map((index) => (
              <div key={index}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: `${design.spacing.sm} 0`,
                  }}
                >
                  <Skeleton
                    width={180}
                    height={16}
                    baseColor={design.colors.secondary}
                    highlightColor={design.colors.border}
                    borderRadius={design.radius.sm}
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: design.spacing.xs,
                    }}
                  >
                    <Skeleton
                      width={12}
                      height={12}
                      baseColor={design.colors.secondary}
                      highlightColor={design.colors.border}
                      borderRadius="50%"
                    />
                    <Skeleton
                      width={60}
                      height={16}
                      baseColor={design.colors.secondary}
                      highlightColor={design.colors.border}
                      borderRadius={design.radius.sm}
                    />
                  </div>
                </div>
                
                {/* Row divider (except for last row) */}
                {index < 3 && (
                  <div
                    style={{
                      height: '1px',
                      backgroundColor: design.colors.border,
                      margin: `${design.spacing.sm} 0`,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return loading ? <SkeletonLoader /> : (
    <div
      style={{
        backgroundColor: design.colors.backgroundAlt,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: design.font.family,
        overflowY: 'auto',
      }}
    >
      {/* Back Button */}
      <div
        style={{
          padding: design.spacing.lg,
          paddingBottom: design.spacing.md,
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: design.colors.primary,
            cursor: 'pointer',
            fontSize: design.font.sizes.base,
            fontWeight: design.font.weights.medium,
            fontFamily: design.font.family,
            display: 'flex',
            alignItems: 'center',
            gap: design.spacing.xs,
            padding: design.spacing.sm,
            borderRadius: design.radius.sm,
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = design.colors.primaryLight;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          ← Back
        </button>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: `0 ${design.spacing.lg} ${design.spacing.lg} ${design.spacing.lg}`,
        }}
      >
      {/* Section 1: Overall Status */}
      <div style={{ marginBottom: design.spacing.xl }}>
        <h1
          style={{
            fontSize: design.font.sizes['2xl'],
            fontWeight: design.font.weights.bold,
            color: design.colors.textPrimary,
            margin: 0,
            marginBottom: design.spacing.md,
            textAlign: 'center',
          }}
        >
          Overall Status
        </h1>
        
        <div
          style={{
            backgroundColor: design.components.card.background,
            borderRadius: design.components.card.borderRadius,
            padding: design.components.card.padding,
            boxShadow: design.components.card.shadow,
            textAlign: 'center',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <span
            style={{
              fontSize: design.font.sizes.xl,
              fontWeight: design.font.weights.bold,
              color: mockData.status === 'safe' ? design.colors.success : design.colors.danger,
            }}
          >
            {mockData.status === 'safe' ? 'Safe' : 'Unsafe'}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          backgroundColor: design.colors.border,
          margin: `${design.spacing.xl} 0`,
        }}
      />

      {/* Section 2: URL Info */}
      <div style={{ marginBottom: design.spacing.xl }}>
        <h2
          style={{
            fontSize: design.font.sizes.xl,
            fontWeight: design.font.weights.semibold,
            color: design.colors.textPrimary,
            margin: 0,
            marginBottom: design.spacing.md,
          }}
        >
          URL Info
        </h2>
        
        <div
          style={{
            backgroundColor: design.components.card.background,
            borderRadius: design.components.card.borderRadius,
            padding: design.components.card.padding,
            boxShadow: design.components.card.shadow,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: design.spacing.sm,
            }}
          >
            <span
              style={{
                fontSize: design.font.sizes.base,
                color: design.colors.textSecondary,
                fontWeight: design.font.weights.medium,
              }}
            >
              URL:
            </span>
            <span
              style={{
                fontSize: design.font.sizes.base,
                color: design.colors.textPrimary,
                fontWeight: design.font.weights.normal,
              }}
            >
              {mockData.url}
            </span>
          </div>
          
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: design.font.sizes.base,
                color: design.colors.textSecondary,
                fontWeight: design.font.weights.medium,
              }}
            >
              Last Checked:
            </span>
            <span
              style={{
                fontSize: design.font.sizes.base,
                color: design.colors.textPrimary,
                fontWeight: design.font.weights.normal,
              }}
            >
              {formatDate(mockData.lastChecked)}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          backgroundColor: design.colors.border,
          margin: `${design.spacing.xl} 0`,
        }}
      />

      {/* Section 3: Detailed Source Results */}
      <div>
        <h2
          style={{
            fontSize: design.font.sizes.xl,
            fontWeight: design.font.weights.semibold,
            color: design.colors.textPrimary,
            margin: 0,
            marginBottom: design.spacing.md,
          }}
        >
          Detailed Source Results
        </h2>
        
        <div
          style={{
            backgroundColor: design.components.card.background,
            borderRadius: design.components.card.borderRadius,
            padding: design.components.card.padding,
            boxShadow: design.components.card.shadow,
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: design.spacing.sm,
              marginBottom: design.spacing.sm,
              borderBottom: `1px solid ${design.colors.border}`,
            }}
          >
            <span
              style={{
                fontSize: design.font.sizes.base,
                fontWeight: design.font.weights.semibold,
                color: design.colors.textPrimary,
              }}
            >
              Source
            </span>
            <span
              style={{
                fontSize: design.font.sizes.base,
                fontWeight: design.font.weights.semibold,
                color: design.colors.textPrimary,
              }}
            >
              Result
            </span>
          </div>

          {/* Table Rows */}
          {mockData.sources.map((source, index) => (
            <div key={index}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: `${design.spacing.sm} 0`,
                }}
              >
                <span
                  style={{
                    fontSize: design.font.sizes.base,
                    color: design.colors.textPrimary,
                    fontWeight: design.font.weights.normal,
                  }}
                >
                  {source.name}
                </span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: design.spacing.xs,
                  }}
                >
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: source.result === 'safe' ? design.colors.success : design.colors.danger,
                    }}
                  />
                  <span
                    style={{
                      fontSize: design.font.sizes.base,
                      color: source.result === 'safe' ? design.colors.success : design.colors.danger,
                      fontWeight: design.font.weights.medium,
                    }}
                  >
                    {source.result === 'safe' ? 'Safe' : 'Unsafe'}
                  </span>
                </div>
              </div>
              
              {/* Row divider (except for last row) */}
              {index < mockData.sources.length - 1 && (
                <div
                  style={{
                    height: '1px',
                    backgroundColor: design.colors.border,
                    margin: `${design.spacing.sm} 0`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default SafetyChecker;
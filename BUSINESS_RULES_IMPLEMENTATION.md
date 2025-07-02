# Business Rules Implementation Summary

This document outlines the implementation of the specified business rules for the investment platform.

## 1. Maximum 3 Active Investment Plans

**Rule**: A user can only have a maximum of three (3) active plans.

**Implementation**:
- **Backend**: Added validation in `InvestmentsService.createFromRequest()` method
  - Checks active investments count before creating new investment
  - Throws `BadRequestException` if limit exceeded
- **Frontend**: Added client-side validation in `InvestmentsPage`
  - Shows warning message if user tries to create 4th investment
  - Displays active plans counter (X/3) in header
  - Prevents investment creation if limit reached

**Files Modified**:
- `backend/src/investments/investments.service.ts`
- `src/app/dashboard/investments/page.tsx`

## 2. Referral Code System

**Rule**: Each user has a referral code they can share with other customers on signup.

**Implementation**:
- **Backend**: 
  - Updated `User` schema with referral fields
  - Added `generateReferralCode()` method in `UsersService`
  - Auto-generates unique 8-character referral codes on registration
  - Added referral validation and relationship tracking
- **Frontend**:
  - Created profile page with referral code display
  - Added copy-to-clipboard functionality
  - Added share functionality (native sharing or fallback)
  - Auto-populates referral code from URL parameters (`?ref=CODE`)

**Files Modified**:
- `backend/src/users/schemas/user.schema.ts`
- `backend/src/users/users.service.ts`
- `backend/src/users/dto/create-user.dto.ts`
- `src/app/dashboard/profile/page.tsx`
- `src/app/auth/register/page.tsx`
- `src/lib/hooks/useAuth.ts`

## 3. Bonus Withdrawal 15-Day Rule

**Rule**: Bonuses can only be withdrawn after 15 days of first active investment. After first withdrawal, next activation cycle is 15 days from last withdrawal.

**Implementation**:
- **Backend**:
  - Added bonus withdrawal tracking fields to User schema
  - Created `canWithdrawBonus()` method with 15-day logic
  - Added `withdrawBonus()` endpoint in investments controller
  - Implemented `recordBonusWithdrawal()` method
  - Added `setFirstActiveInvestmentDate()` method
- **Frontend**:
  - Created `useWithdrawBonus` hook
  - Updated ROI page to use real API instead of mock data
  - Shows countdown timer and eligibility status
  - Handles success/error responses with toast notifications

**Files Modified**:
- `backend/src/users/schemas/user.schema.ts`
- `backend/src/users/users.service.ts`
- `backend/src/investments/investments.service.ts`
- `backend/src/investments/investments.controller.ts`
- `backend/src/investments/investments.module.ts`
- `src/app/dashboard/roi/page.tsx`
- `src/lib/hooks/useBonus.ts`

## 4. Active Investment Requirement for Referral Bonus

**Rule**: There must be an active investment before referral bonus would be earned.

**Implementation**:
- **Backend**: 
  - Referral bonus is only processed when creating investments
  - Bonus calculation happens in `createFromRequest()` method
  - Referrer gets bonus added to their profit wallet
  - Creates transaction record for referral bonus
- **Frontend**:
  - Shows referral count and earnings in profile
  - Displays referral statistics in dashboard

**Files Modified**:
- `backend/src/investments/investments.service.ts`
- `backend/src/investments/investments.module.ts`
- `src/app/dashboard/profile/page.tsx`

## 5. Welcome and Referral Bonuses in Investment Plans

**Rule**: Welcome bonus and referral bonus is already attached to the investment plans.

**Implementation**:
- **Backend**:
  - Investment plans already have `welcomeBonus` and `referralBonus` fields
  - Bonuses are calculated as percentages of investment amount
  - Welcome bonus is stored with each investment
  - Referral bonus is paid to referrer when investment is created
- **Frontend**:
  - Shows bonus percentages in investment plan cards
  - Displays total bonus amount in ROI dashboard
  - Calculates bonus eligibility based on active investments

**Files Modified**:
- `backend/src/investments/investments.service.ts`
- `src/app/dashboard/roi/page.tsx`
- `src/app/dashboard/investments/page.tsx`

## 6. Empty State Messages for Tables

**Rule**: Show appropriate messages when tables are empty to improve user experience.

**Implementation**:
- **Dashboard Page**:
  - Added empty state for recent transactions with call-to-action to start investing
  - Added empty state for "All Transactions" dialog with filter-aware messaging
- **ROI Page**:
  - Added empty state for ROI transactions with investment encouragement
  - Added empty state for "All Transactions" dialog with contextual messaging
- **Investments Page**:
  - Added empty state for investment plans with filter-aware messaging
  - Enhanced existing empty state for active investments
- **Wallet Page**:
  - Added empty state for wallet transactions with deposit/investment options
  - Added empty state for "All Transactions" dialog with action buttons
- **Withdrawals Page**:
  - Added empty state for withdrawal transactions with investment encouragement
  - Added empty state for "All Withdrawals" dialog with filter-aware messaging

**Features**:
- Contextual messaging based on filters applied
- Call-to-action buttons to guide users to relevant actions
- Consistent design with platform branding
- Responsive layout for mobile and desktop
- Smooth animations and transitions

**Files Modified**:
- `src/app/dashboard/page.tsx`
- `src/app/dashboard/roi/page.tsx`
- `src/app/dashboard/investments/page.tsx`
- `src/app/dashboard/wallet/page.tsx`
- `src/app/dashboard/withdrawals/page.tsx`

## 7. Email Service Implementation

**Rule**: Comprehensive email service with multiple providers and templates for all application events.

**Implementation**:
- **Backend**: Created complete email service architecture
  - **Multiple Providers**: Brevo (primary), Nodemailer (fallback), Console (development)
  - **Provider Toggle**: Easy switching via `EMAIL_PROVIDER` environment variable
  - **Template System**: 10 pre-built email templates for all major events
  - **Automatic Fallback**: Seamless fallback between providers
  - **Admin Testing**: Admin endpoints for testing email functionality
  - **Integration**: Email sending integrated into user registration and investment creation

**Email Templates**:
1. **Welcome Email**: Sent on user registration
2. **Password Reset**: Sent on password reset request
3. **Investment Confirmation**: Sent on new investment creation
4. **ROI Payment**: Sent when ROI payments are received
5. **Transaction Confirmation**: Sent on transaction completion
6. **Investment Completion**: Sent when investment plan completes
7. **Referral Bonus**: Sent when referral bonus is earned
8. **Welcome Bonus**: Sent when welcome bonus is credited
9. **Account Verification**: Sent for email verification
10. **Security Alert**: Sent for security-related events

**Configuration**:
```bash
# Email Provider Selection
EMAIL_PROVIDER=brevo  # Options: brevo, nodemailer, console

# Brevo Configuration
BREVO_API_KEY=YOUR_BREVO_API_KEY_HERE
BREVO_SENDER_EMAIL=noreply@kltmines.com
BREVO_SENDER_NAME=KLT Mines Investment Platform

# SMTP Configuration (Alternative)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**Files Created/Modified**:
- `backend/src/email/email-templates.ts` - Email templates
- `backend/src/email/email-provider.interface.ts` - Provider interface
- `backend/src/email/providers/brevo.provider.ts` - Brevo provider
- `backend/src/email/providers/nodemailer.provider.ts` - Nodemailer provider
- `backend/src/email/providers/console.provider.ts` - Console provider
- `backend/src/email/email.service.ts` - Main email service
- `backend/src/email/email.controller.ts` - Admin endpoints
- `backend/src/email/email.module.ts` - Email module
- `backend/src/auth/guards/roles.guard.ts` - Roles guard
- `backend/src/auth/decorators/roles.decorator.ts` - Roles decorator
- `backend/src/users/users.service.ts` - Added welcome email
- `backend/src/users/users.module.ts` - Added email module
- `backend/src/investments/investments.service.ts` - Added investment confirmation email
- `backend/src/investments/investments.module.ts` - Added email module
- `backend/env.example` - Updated with email configuration
- `EMAIL_SERVICE_DOCUMENTATION.md` - Comprehensive documentation

**API Endpoints**:
- `GET /email/status` - Get email service status
- `POST /email/test` - Send test email (Admin only)
- `POST /email/send-template` - Send template email (Admin only)
- `POST /email/send-custom` - Send custom email (Admin only)

**Features**:
- Provider-agnostic design with easy switching
- Automatic fallback between providers
- Comprehensive error handling and logging
- Admin testing capabilities
- Template-based email system
- Integration with existing business logic

## Technical Implementation Details

### Database Schema Changes
- Added referral fields to User schema
- Added bonus withdrawal tracking fields
- Added indexes for referral code lookups

### API Endpoints
- `POST /investments/withdraw-bonus` - Withdraw bonuses with 15-day validation
- Updated `POST /investments` - Now includes 3-plan limit and referral bonus processing
- Updated `POST /auth/register` - Now handles referral codes and generates user referral codes

### Frontend Features
- Real-time active plans counter
- Referral code sharing and copying
- Bonus withdrawal with countdown timer
- Profile page with referral statistics
- URL parameter handling for referral codes
- Comprehensive empty state messages for all tables

### Error Handling
- Proper validation messages for all business rules
- Toast notifications for user feedback
- Graceful fallbacks for sharing functionality
- Contextual empty state messages

## Testing Considerations

1. **3-Plan Limit**: Test creating 4th investment should be blocked
2. **Referral System**: Test referral code generation and validation
3. **Bonus Withdrawal**: Test 15-day rule with various scenarios
4. **Referral Bonus**: Test bonus distribution when referred users invest
5. **Edge Cases**: Test with invalid referral codes, expired bonuses, etc.
6. **Empty States**: Test all tables with no data and various filter combinations

## Security Considerations

- Referral codes are unique and validated
- Bonus withdrawal has proper authorization checks
- Investment limits are enforced on both frontend and backend
- All user data is properly sanitized and validated 
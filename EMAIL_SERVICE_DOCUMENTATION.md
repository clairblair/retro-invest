# Email Service Documentation

## Overview

The KLT Mines Investment Platform includes a comprehensive email service that supports multiple email providers with automatic fallback capabilities. The service is designed to be flexible, reliable, and easy to configure.

## Features

- **Multiple Email Providers**: Support for Brevo, Nodemailer, and Console providers
- **Automatic Fallback**: If the primary provider fails, automatically falls back to the secondary provider
- **Template System**: Pre-built email templates for all major application events
- **Provider Toggle**: Easy switching between email providers via environment variables
- **Admin Testing**: Admin endpoints for testing email functionality
- **Error Handling**: Graceful error handling that doesn't break application flow

## Email Providers

### 1. Brevo (Primary Provider)
- **Package**: `@sendinblue/client`
- **Configuration**: Uses `BREVO_API_KEY` environment variable
- **Features**: Professional email delivery with high deliverability rates
- **Best for**: Production environments

### 2. Nodemailer (Fallback Provider)
- **Package**: `nodemailer`
- **Configuration**: Uses SMTP settings (Gmail, Outlook, custom SMTP)
- **Features**: Flexible SMTP configuration
- **Best for**: Development and alternative production setups

### 3. Console (Development Provider)
- **Package**: Built-in
- **Configuration**: Uses `CONSOLE_EMAIL_ENABLED` environment variable
- **Features**: Logs emails to console instead of sending
- **Best for**: Development and testing

## Configuration

### Environment Variables

```bash
# Email Provider Selection
EMAIL_PROVIDER=brevo  # Options: brevo, nodemailer, console

# Console Provider
CONSOLE_EMAIL_ENABLED=true

# Brevo Configuration
BREVO_API_KEY=YOUR_BREVO_API_KEY_HERE
BREVO_SENDER_EMAIL=noreply@kltmines.com
BREVO_SENDER_NAME=KLT Mines Investment Platform

# SMTP Configuration (for Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_SENDER_EMAIL=noreply@kltmines.com
SMTP_SENDER_NAME=KLT Mines Investment Platform

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:3000
```

## Email Templates

The system includes the following pre-built email templates:

### 1. Welcome Email (`welcome`)
- **Trigger**: User registration
- **Data**: `userName`, `userEmail`, `dashboardUrl`

### 2. Password Reset (`passwordReset`)
- **Trigger**: Password reset request
- **Data**: `userName`, `userEmail`, `otpCode`, `resetUrl`

### 3. Investment Confirmation (`investmentConfirmation`)
- **Trigger**: New investment creation
- **Data**: `userName`, `userEmail`, `dashboardUrl`, `planName`, `amount`, `currency`, `dailyRoi`, `duration`, `startDate`, `expectedTotalRoi`, `investmentId`

### 4. ROI Payment (`roiPayment`)
- **Trigger**: ROI payment received
- **Data**: `userName`, `userEmail`, `dashboardUrl`, `amount`, `currency`, `investmentName`, `paymentDate`, `paymentType`, `transactionId`

### 5. Transaction Confirmation (`transactionConfirmation`)
- **Trigger**: Transaction completion
- **Data**: `userName`, `userEmail`, `dashboardUrl`, `status`, `type`, `amount`, `currency`, `reference`, `date`, `description`

### 6. Investment Completion (`investmentCompletion`)
- **Trigger**: Investment plan completion
- **Data**: `userName`, `userEmail`, `dashboardUrl`, `planName`, `initialAmount`, `totalRoi`, `currency`, `completionDate`, `duration`, `investmentId`

### 7. Referral Bonus (`referralBonus`)
- **Trigger**: Referral bonus earned
- **Data**: `userName`, `userEmail`, `dashboardUrl`, `bonusAmount`, `currency`, `referredUserName`, `referredInvestmentAmount`, `bonusPercentage`, `dateEarned`, `referralId`

### 8. Welcome Bonus (`welcomeBonus`)
- **Trigger**: Welcome bonus credited
- **Data**: `userName`, `userEmail`, `dashboardUrl`, `bonusAmount`, `currency`, `availableDate`, `userId`

### 9. Account Verification (`accountVerification`)
- **Trigger**: Email verification request
- **Data**: `userName`, `userEmail`, `verificationCode`, `verificationUrl`

### 10. Security Alert (`securityAlert`)
- **Trigger**: Security-related events
- **Data**: `userName`, `userEmail`, `securityUrl`, `alertType`, `alertDate`, `ipAddress`, `location`, `device`, `alertId`

### 11. Login OTP (`loginOtp`)
- **Trigger**: Login verification request
- **Data**: `userName`, `userEmail`, `otpCode`, `loginUrl`, `ipAddress`, `device`

### 12. Withdrawal Request (`withdrawalRequest`)
- **Trigger**: Withdrawal request created
- **Data**: `userName`, `userEmail`, `dashboardUrl`, `amount`, `currency`, `withdrawalMethod`, `reference`, `requestDate`, `accountDetails`

### 13. Withdrawal Completed (`withdrawalCompleted`)
- **Trigger**: Withdrawal processed successfully
- **Data**: `userName`, `userEmail`, `dashboardUrl`, `amount`, `currency`, `withdrawalMethod`, `reference`, `completionDate`, `accountDetails`, `transactionHash`

### 14. Deposit Request (`depositRequest`)
- **Trigger**: Deposit request created
- **Data**: `userName`, `userEmail`, `dashboardUrl`, `amount`, `currency`, `paymentMethod`, `reference`, `requestDate`, `accountDetails`

### 15. Deposit Confirmed (`depositConfirmed`)
- **Trigger**: Deposit confirmed and funds credited
- **Data**: `userName`, `userEmail`, `dashboardUrl`, `amount`, `currency`, `paymentMethod`, `reference`, `confirmationDate`, `transactionHash`

## API Endpoints

### Email Status
```http
GET /email/status
```
Returns the current email service configuration and status.

### Send Test Email (Admin Only)
```http
POST /email/test
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "to": "test@example.com",
  "template": "welcome"  // Optional
}
```

### Send Template Email (Admin Only)
```http
POST /email/send-template
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "to": "user@example.com",
  "template": "passwordReset",
  "data": {
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "otpCode": "123456",
    "resetUrl": "http://localhost:3000/reset-password"
  }
}
```

### Send Custom Email (Admin Only)
```http
POST /email/send-custom
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "to": "user@example.com",
  "subject": "Custom Subject",
  "htmlContent": "<h1>Custom Email</h1><p>Custom content</p>"
}
```

## Usage in Services

### Basic Email Sending
```typescript
// Send a simple email
await this.emailService.sendEmail(
  'user@example.com',
  'Subject',
  '<h1>Content</h1>'
);

// Send template email
await this.emailService.sendTemplateEmail(
  'user@example.com',
  'welcome',
  { userName: 'John', userEmail: 'john@example.com' }
);
```

### Service Integration Examples

#### User Registration
```typescript
// In UsersService.create()
const savedUser = await user.save();

// Send welcome email
try {
  await this.emailService.sendWelcomeEmail(
    savedUser.email, 
    savedUser.firstName || savedUser.email
  );
} catch (error) {
  console.error('Failed to send welcome email:', error);
}
```

#### Investment Creation
```typescript
// In InvestmentsService.createFromRequest()
const investment = await this.create(createInvestmentDto, userId);

// Send investment confirmation email
try {
  await this.emailService.sendInvestmentConfirmation(
    user.email,
    user.firstName || user.email,
    {
      planName: plan.name,
      amount: amount,
      currency: currency,
      // ... other data
    }
  );
} catch (error) {
  console.error('Failed to send investment confirmation email:', error);
}
```

#### Withdrawal Processing
```typescript
// In TransactionsService.create() - for withdrawal requests
if (createTransactionDto.type === TransactionType.WITHDRAWAL) {
  await this.emailService.sendWithdrawalRequestEmail(
    user.email,
    user.firstName || user.email,
    {
      amount: createTransactionDto.amount,
      currency: createTransactionDto.currency,
      withdrawalMethod: 'bank_transfer',
      reference: savedTransaction.reference,
      requestDate: savedTransaction.createdAt,
      accountDetails: createTransactionDto.description,
    }
  );
}

// In TasksService.processWithdrawalTransaction() - for completed withdrawals
await this.emailService.sendWithdrawalCompletedEmail(
  user.email,
  user.firstName || user.email,
  {
    amount: transaction.amount,
    currency: transaction.currency,
    withdrawalMethod: transaction.paymentMethod || 'bank_transfer',
    reference: transaction.reference,
    completionDate: transaction.processedAt,
    accountDetails: transaction.paymentDetails ? JSON.stringify(transaction.paymentDetails) : undefined,
    transactionHash: transaction.externalReference,
  }
);
```

#### Deposit Processing
```typescript
// In TransactionsService.create() - for deposit requests
if (createTransactionDto.type === TransactionType.DEPOSIT) {
  await this.emailService.sendDepositRequestEmail(
    user.email,
    user.firstName || user.email,
    {
      amount: createTransactionDto.amount,
      currency: createTransactionDto.currency,
      paymentMethod: 'bank_transfer',
      reference: savedTransaction.reference,
      requestDate: savedTransaction.createdAt,
      accountDetails: createTransactionDto.description,
    }
  );
}

// In TasksService.processDepositTransaction() - for confirmed deposits
await this.emailService.sendDepositConfirmedEmail(
  user.email,
  user.firstName || user.email,
  {
    amount: transaction.amount,
    currency: transaction.currency,
    paymentMethod: transaction.paymentMethod || 'bank_transfer',
    reference: transaction.reference,
    confirmationDate: transaction.processedAt,
    transactionHash: transaction.externalReference,
  }
);
```

## Error Handling

The email service includes comprehensive error handling:

1. **Provider Configuration Errors**: Logged but don't break application startup
2. **Email Send Failures**: Logged and can optionally throw errors
3. **Template Not Found**: Throws descriptive error
4. **Fallback Mechanism**: Automatically tries secondary provider if primary fails

## Testing

### Development Testing
1. Set `EMAIL_PROVIDER=console` for console logging
2. Set `CONSOLE_EMAIL_ENABLED=true`
3. Emails will be logged to console instead of sent

### Production Testing
1. Use admin endpoints to send test emails
2. Monitor email delivery logs
3. Check provider-specific delivery reports

## Monitoring

### Logs to Monitor
- Email service initialization
- Provider configuration status
- Email send attempts and results
- Fallback provider usage
- Template rendering errors

### Metrics to Track
- Email delivery success rate
- Provider response times
- Template usage frequency
- Error rates by provider

## Security Considerations

1. **API Keys**: Store securely in environment variables
2. **Admin Access**: Email testing endpoints require admin role
3. **Rate Limiting**: Consider implementing rate limits for email sending
4. **Content Validation**: Validate email content before sending
5. **Bounce Handling**: Implement bounce handling for production

## Troubleshooting

### Common Issues

1. **Brevo API Key Invalid**
   - Check `BREVO_API_KEY` environment variable
   - Verify API key permissions

2. **SMTP Connection Failed**
   - Check SMTP credentials
   - Verify network connectivity
   - Check firewall settings

3. **Template Not Found**
   - Verify template name spelling
   - Check template file exists
   - Ensure template data is provided

4. **Email Not Delivered**
   - Check spam folder
   - Verify sender email configuration
   - Check provider delivery reports

### Debug Mode
Enable debug logging by setting log level to debug in your application configuration.

## Future Enhancements

1. **Email Queue**: Implement queuing for high-volume email sending
2. **Template Editor**: Admin interface for editing email templates
3. **Analytics**: Email open/click tracking
4. **A/B Testing**: Template variant testing
5. **Scheduling**: Delayed email sending
6. **Attachments**: File attachment support
7. **Bulk Sending**: Mass email campaigns 
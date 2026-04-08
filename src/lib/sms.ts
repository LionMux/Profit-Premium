/**
 * SMS.ru API client for sending SMS codes
 */

const SMS_API_KEY = process.env.SMS_API_KEY;
const SMS_PROVIDER = process.env.SMS_PROVIDER || 'smsru';

interface SmsSendResponse {
  status: 'OK' | 'ERROR';
  status_code?: number;
  sms?: Record<
    string,
    {
      status: 'OK' | 'ERROR';
      status_code: number;
      sms_id?: string;
      cost?: number;
      status_text?: string;
    }
  >;
  balance?: number;
  error?: string;
}

/**
 * Send SMS via SMS.ru API
 * In development mode, if SMS_API_KEY is not set, logs code to console
 */
export async function sendSMS(
  phone: string,
  code: string
): Promise<{ success: boolean; error?: string }> {
  // Development mode - log to console if no API key
  if (!SMS_API_KEY) {
    console.log(`[DEV SMS] Phone: ${phone}, Code: ${code}`);
    return { success: true };
  }

  // Clean phone number (remove + and any non-digits)
  const cleanPhone = phone.replace(/\D/g, '');

  const message = `Ваш код подтверждения: ${code}. Действителен 5 минут.`;

  try {
    const params = new URLSearchParams({
      api_id: SMS_API_KEY,
      to: cleanPhone,
      msg: message,
      json: '1',
    });

    const response = await fetch(`https://sms.ru/sms/send?${params.toString()}`, {
      method: 'GET',
    });

    if (!response.ok) {
      return { success: false, error: 'SMS service unavailable' };
    }

    const data: SmsSendResponse = await response.json();

    if (data.status === 'OK') {
      const phoneResult = data.sms?.[cleanPhone];
      if (phoneResult?.status === 'OK') {
        return { success: true };
      } else {
        return {
          success: false,
          error: phoneResult?.status_text || 'Failed to send SMS',
        };
      }
    } else {
      return { success: false, error: data.error || 'SMS service error' };
    }
  } catch (error) {
    console.error('SMS send error:', error);
    return { success: false, error: 'Failed to send SMS' };
  }
}

/**
 * Check SMS.ru balance (optional, for monitoring)
 */
export async function getSmsBalance(): Promise<number | null> {
  if (!SMS_API_KEY) {
    return null;
  }

  try {
    const response = await fetch(`https://sms.ru/my/balance?api_id=${SMS_API_KEY}&json=1`);
    const data = await response.json();
    return data.balance || null;
  } catch {
    return null;
  }
}

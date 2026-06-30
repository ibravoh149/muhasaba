import { isAxiosError } from 'axios';

const ERROR_MAP: Record<string, string> = {
  'invalid-credentials': 'auth.invalidCredentials',
  'account-not-verified': 'auth.emailNotVerified',
  'email-already-exists': 'auth.emailAlreadyExists',
  'wrong-auth-method': 'errors.wrongAuthMethod',
  'invalid-verification-token': 'errors.invalidVerificationToken',
  'invalid-refresh-token': 'errors.invalidRefreshToken',
  'refresh-token-expired': 'errors.refreshTokenExpired',
  'invalid-reset-token': 'errors.invalidResetToken',
  'account-not-found': 'errors.accountNotFound',
  'invalid-pin': 'errors.invalidPin',
  'invalid-oauth-state': 'errors.invalidOAuthState',
  'profile-not-found': 'errors.profileNotFound',
  'forbidden': 'errors.forbidden',
  'admin-access-required': 'errors.adminAccessRequired',
  'missing-permissions': 'errors.missingPermissions',
  'insufficient-permissions': 'errors.insufficientPermissions',
  'deed-not-tracked': 'errors.deedNotTracked',
  'challenge-not-found': 'errors.challengeNotFound',
  'contact-update-failed': 'errors.contactUpdateFailed',
  'invalid-resource-id': 'errors.invalidResourceId',
};

export function getApiError(error: unknown): string {
  if (isAxiosError(error)) {
    const code: string =
      (error.response?.data?.code as string | undefined) ??
      (error.response?.data?.error as string | undefined) ??
      '';

    if (code && ERROR_MAP[code]) return ERROR_MAP[code];

    // Fallback for raw MongoDB / unstructured errors
    const message = (error.response?.data?.message as string | undefined) ?? '';
    if (message.includes('duplicate key') || message.includes('E11000')) return 'auth.emailAlreadyExists';
  }
  return 'common.error';
}

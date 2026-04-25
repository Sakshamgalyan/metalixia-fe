export function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const err = error as { response: { data?: { message?: string } } };
    return err.response?.data?.message || 'Something went wrong';
  }
  return error instanceof Error ? error.message : 'Something went wrong';
}

/**
 * Sends a verification code to the given email address.
 *
 * @param email The email address to send the verification code to.
 * @returns A promise that resolves to void.
 */
export async function sendVerificationCode(email: string): Promise<void> {
  // TODO: Implement this by calling an API.
  console.log(`Sending verification code to ${email}`);
}

/**
 * Verifies the given code against the given email address.
 *
 * @param email The email address to verify the code against.
 * @param code The verification code to verify.
 * @returns A promise that resolves to true if the code is valid, false otherwise.
 */
export async function verifyCode(email: string, code: string): Promise<boolean> {
  // TODO: Implement this by calling an API.
  console.log(`Verifying code ${code} for ${email}`);
  return true;
}

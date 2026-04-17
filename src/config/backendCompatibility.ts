// Aligned with the current CodeBazaarApi repository snapshot:
// - Google sign-in uses POST /auth/google/session to exchange a Google access token
//   for a real CodeBazaar session token
// - seller onboarding, profile sync, downloads, seller orders, and seller listings
//   all use the live PostgreSQL-backed API
export const codeBazaarApiCompatibility = {
  realBuyerSessionExchange: true,
  realSellerOnboarding: true,
  realUserProfileSync: true,
  realDownloadLibrary: true,
  realSellerOrders: true,
  realSellerListingSubmission: true,
} as const

export const hasRealSellerApi =
  codeBazaarApiCompatibility.realSellerOnboarding &&
  codeBazaarApiCompatibility.realSellerOrders &&
  codeBazaarApiCompatibility.realSellerListingSubmission

const PROFILE_KEY =
  'travelxxx-traveler-profile'

const ONBOARDING_KEY =
  'travelxxx-onboarding-complete'


export function getTravelerProfile() {
  if (
    typeof window ===
    'undefined'
  ) {
    return null
  }

  const stored =
    localStorage.getItem(
      PROFILE_KEY
    )

  if (!stored) {
    return null
  }

  try {
    return JSON.parse(
      stored
    )
  } catch {
    return null
  }
}


export function saveTravelerProfile(
  profile
) {
  if (
    typeof window ===
    'undefined'
  ) {
    return
  }

  localStorage.setItem(
    PROFILE_KEY,
    JSON.stringify(
      profile
    )
  )

  localStorage.setItem(
    ONBOARDING_KEY,
    'true'
  )
}


export function updateTravelerProfile(
  updates
) {
  const current =
    getTravelerProfile() ??
    {}

  const nextProfile = {
    ...current,
    ...updates,
  }

  saveTravelerProfile(
    nextProfile
  )

  return nextProfile
}


export function hasCompletedOnboarding() {
  if (
    typeof window ===
    'undefined'
  ) {
    return false
  }

  return (
    localStorage.getItem(
      ONBOARDING_KEY
    ) === 'true'
  )
}


export function clearTravelerProfile() {
  if (
    typeof window ===
    'undefined'
  ) {
    return
  }

  localStorage.removeItem(
    PROFILE_KEY
  )

  localStorage.removeItem(
    ONBOARDING_KEY
  )
}
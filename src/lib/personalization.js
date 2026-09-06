/* -------------------------------------------------
   PERSONALIZATION HELPERS
-------------------------------------------------- */


/*
 * Normalize arrays so every matching
 * function can safely work with empty data.
 */
function normalizeArray(
  value
) {
  return Array.isArray(
    value
  )
    ? value
    : []
}


/*
 * Normalize a string so matching
 * is more predictable.
 */
function normalizeValue(
  value
) {
  return String(
    value ?? ''
  )
    .trim()
    .toLowerCase()
}


/* -------------------------------------------------
   PROFILE ACCESSORS
-------------------------------------------------- */


export function getProfilePreferences(
  profile
) {
  return normalizeArray(
    profile?.preferences
  )
}


export function getProfileStayPriorities(
  profile
) {
  return normalizeArray(
    profile?.stayPriorities
  )
}


export function getProfileBudget(
  profile
) {
  return profile?.budget ??
    null
}


/* -------------------------------------------------
   ITEM TAG ACCESSORS
-------------------------------------------------- */


/*
 * Items can expose preference tags
 * using:
 *
 * preferenceTags: [...]
 *
 * This keeps hotels, explore places,
 * and areas on the same taxonomy.
 */
export function getItemPreferenceTags(
  item
) {
  return normalizeArray(
    item?.preferenceTags
  )
}


/*
 * Items can expose stay-related tags
 * using:
 *
 * stayTags: [...]
 *
 * Example:
 * [
 *   'Location',
 *   'Comfort',
 *   'Local atmosphere'
 * ]
 */
export function getItemStayTags(
  item
) {
  return normalizeArray(
    item?.stayTags
  )
}


/* -------------------------------------------------
   PREFERENCE MATCHING
-------------------------------------------------- */


export function getMatchedPreferences(
  item,
  profile
) {
  const preferences =
    getProfilePreferences(
      profile
    )

  const itemTags =
    getItemPreferenceTags(
      item
    )

  if (
    preferences.length === 0 ||
    itemTags.length === 0
  ) {
    return []
  }

  return preferences.filter(
    (preference) =>
      itemTags.includes(
        preference
      )
  )
}


export function getPreferenceScore(
  item,
  profile
) {
  return getMatchedPreferences(
    item,
    profile
  ).length
}


/* -------------------------------------------------
   STAY PRIORITY MATCHING
-------------------------------------------------- */


export function getMatchedStayPriorities(
  item,
  profile
) {
  const priorities =
    getProfileStayPriorities(
      profile
    )

  const itemTags =
    getItemStayTags(
      item
    )

  if (
    priorities.length === 0 ||
    itemTags.length === 0
  ) {
    return []
  }

  return priorities.filter(
    (priority) =>
      itemTags.some(
        (tag) =>
          normalizeValue(
            tag
          ) ===
          normalizeValue(
            priority
          )
      )
  )
}


export function getStayPriorityScore(
  item,
  profile
) {
  return getMatchedStayPriorities(
    item,
    profile
  ).length
}


/* -------------------------------------------------
   BUDGET MATCHING
-------------------------------------------------- */


/*
 * Expected item price fields:
 *
 * price
 *
 * OR
 *
 * pricePerNight
 *
 * Engine accepts either so existing
 * hotel data is easier to integrate.
 */
export function getItemPrice(
  item
) {
  const value =
    item?.pricePerNight ??
    item?.price ??
    null

  if (
    value === null ||
    value === undefined
  ) {
    return null
  }

  const numericValue =
    Number(value)

  return Number.isFinite(
    numericValue
  )
    ? numericValue
    : null
}


export function isWithinBudget(
  item,
  profile
) {
  const budget =
    getProfileBudget(
      profile
    )

  const price =
    getItemPrice(
      item
    )

  /*
   * If either side has no budget data,
   * don't punish the item.
   */
  if (
    !budget ||
    price === null
  ) {
    return true
  }

  const min =
    budget.min ?? null

  const max =
    budget.max ?? null

  if (
    min !== null &&
    price < min
  ) {
    return false
  }

  if (
    max !== null &&
    price > max
  ) {
    return false
  }

  return true
}


/*
 * Budget score is intentionally small.
 *
 * Preference and stay-priority relevance
 * should matter more than price alone.
 */
export function getBudgetScore(
  item,
  profile
) {
  const budget =
    getProfileBudget(
      profile
    )

  const price =
    getItemPrice(
      item
    )

  if (
    !budget ||
    price === null
  ) {
    return 0
  }

  if (
    isWithinBudget(
      item,
      profile
    )
  ) {
    return 1
  }

  return 0
}


/* -------------------------------------------------
   DESTINATION MATCHING
-------------------------------------------------- */


/*
 * Items can optionally use:
 *
 * destinationId: 'yogyakarta'
 *
 * This lets us suppress irrelevant
 * items when multiple destinations
 * are added later.
 */
export function matchesDestination(
  item,
  profile
) {
  const profileDestinationId =
    profile
      ?.destination
      ?.id

  const itemDestinationId =
    item?.destinationId

  if (
    !profileDestinationId ||
    !itemDestinationId
  ) {
    return true
  }

  return (
    profileDestinationId ===
    itemDestinationId
  )
}


/* -------------------------------------------------
   TOTAL MATCH SCORE
-------------------------------------------------- */


/*
 * Weighting:
 *
 * preference match      = 3
 * stay priority match   = 2
 * budget fit            = 1
 *
 * Destination mismatch
 * is handled separately.
 *
 * These weights are deliberately
 * simple and explainable.
 */
export function getPersonalizationScore(
  item,
  profile
) {
  if (!profile) {
    return 0
  }

  if (
    !matchesDestination(
      item,
      profile
    )
  ) {
    return -100
  }

  const preferenceScore =
    getPreferenceScore(
      item,
      profile
    )

  const stayScore =
    getStayPriorityScore(
      item,
      profile
    )

  const budgetScore =
    getBudgetScore(
      item,
      profile
    )

  return (
    preferenceScore *
      3 +
    stayScore *
      2 +
    budgetScore
  )
}


/* -------------------------------------------------
   RANKING
-------------------------------------------------- */


export function rankByProfile(
  items,
  profile
) {
  const normalizedItems =
    normalizeArray(
      items
    )

  if (
    normalizedItems.length === 0
  ) {
    return []
  }

  /*
   * If no profile exists,
   * preserve original order.
   */
  if (!profile) {
    return [
      ...normalizedItems,
    ]
  }

  return [
    ...normalizedItems,
  ].sort(
    (
      first,
      second
    ) => {
      const firstScore =
        getPersonalizationScore(
          first,
          profile
        )

      const secondScore =
        getPersonalizationScore(
          second,
          profile
        )

      /*
       * Higher score first.
       */
      if (
        secondScore !==
        firstScore
      ) {
        return (
          secondScore -
          firstScore
        )
      }

      /*
       * Stable fallback:
       * preserve original order
       * where scores are equal.
       */
      return 0
    }
  )
}


/* -------------------------------------------------
   FILTER + RANK
-------------------------------------------------- */


export function getPersonalizedItems(
  items,
  profile,
  {
    destinationOnly = true,
    budgetOnly = false,
  } = {}
) {
  let result =
    normalizeArray(
      items
    )

  if (
    destinationOnly &&
    profile
  ) {
    result =
      result.filter(
        (item) =>
          matchesDestination(
            item,
            profile
          )
      )
  }

  if (
    budgetOnly &&
    profile
  ) {
    result =
      result.filter(
        (item) =>
          isWithinBudget(
            item,
            profile
          )
      )
  }

  return rankByProfile(
    result,
    profile
  )
}


/* -------------------------------------------------
   EXPLANATION HELPERS
-------------------------------------------------- */


export function getMatchSummary(
  item,
  profile
) {
  const matchedPreferences =
    getMatchedPreferences(
      item,
      profile
    )

  const matchedPriorities =
    getMatchedStayPriorities(
      item,
      profile
    )

  const budgetMatch =
    isWithinBudget(
      item,
      profile
    )

  return {
    score:
      getPersonalizationScore(
        item,
        profile
      ),

    matchedPreferences,

    matchedPriorities,

    budgetMatch,

    preferenceCount:
      matchedPreferences.length,

    priorityCount:
      matchedPriorities.length,
  }
}


/*
 * Portfolio-friendly label.
 *
 * Avoids pretending the prototype
 * has a precise machine-learning
 * confidence percentage.
 */
export function getMatchLabel(
  item,
  profile
) {
  const {
    preferenceCount,
    priorityCount,
    budgetMatch,
  } =
    getMatchSummary(
      item,
      profile
    )

  const totalMatches =
    preferenceCount +
    priorityCount

  if (
    totalMatches >= 4 &&
    budgetMatch
  ) {
    return 'Strong match'
  }

  if (
    totalMatches >= 2
  ) {
    return 'Good match'
  }

  if (
    totalMatches >= 1
  ) {
    return 'Matches your trip'
  }

  return 'Explore this option'
}
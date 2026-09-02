export interface GithubStats {
  login: string
  avatarUrl: string
  name: string | null
  publicRepos: number
  followers: number
  commitsThisYear: number
  lastCommitDate: string | null
  currentStreak: number
  longestStreak: number
}

interface ContributionDay {
  date: string
  count: number
}

/**
 * Récupère les stats publiques GitHub d'un user via l'API REST publique
 * (pas de token requis) + le endpoint de contributions (via un miroir
 * public au format github-contributions) pour les commits/streak.
 */
export async function useGithubStats(username: string) {
  const stats = useState<GithubStats | null>(`gh-stats-${username}`, () => null)
  const pending = useState<boolean>(`gh-stats-pending-${username}`, () => true)
  const error = useState<string | null>(`gh-stats-error-${username}`, () => null)

  const fetchStats = async () => {
    pending.value = true
    error.value = null
    try {
      const user = await $fetch<any>(`https://api.github.com/users/${username}`)

      let commitsThisYear = 0
      let lastCommitDate: string | null = null
      let currentStreak = 0
      let longestStreak = 0

      try {
        const contrib = await $fetch<any>(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
        )
        const days: ContributionDay[] = (contrib?.contributions ?? []).filter(
          (d: ContributionDay) => !!d.date
        )

        const currentYear = new Date().getFullYear()
        commitsThisYear = days
          .filter((d) => d.date.startsWith(String(currentYear)))
          .reduce((sum, d) => sum + d.count, 0)

        const withCommits = days.filter((d) => d.count > 0)
        if (withCommits.length) {
          lastCommitDate = withCommits[withCommits.length - 1].date
        }

        // Calcul des streaks (jours consécutifs avec au moins 1 commit)
        let streak = 0
        let maxStreak = 0
        for (const d of days) {
          if (d.count > 0) {
            streak++
            maxStreak = Math.max(maxStreak, streak)
          } else {
            streak = 0
          }
        }
        longestStreak = maxStreak

        // Streak actuel : on part de la fin (aujourd'hui) et on remonte
        let s = 0
        for (let i = days.length - 1; i >= 0; i--) {
          if (days[i].count > 0) {
            s++
          } else {
            // On tolère que le jour même n'ait pas encore de commit
            if (i === days.length - 1) continue
            break
          }
        }
        currentStreak = s
      } catch {
        // Le service de contributions peut être indisponible : on garde
        // le reste des stats fonctionnel malgré tout.
      }

      stats.value = {
        login: user.login,
        avatarUrl: user.avatar_url,
        name: user.name,
        publicRepos: user.public_repos,
        followers: user.followers,
        commitsThisYear,
        lastCommitDate,
        currentStreak,
        longestStreak,
      }
    } catch (e: any) {
      error.value = e?.message ?? "Impossible de récupérer les stats GitHub"
    } finally {
      pending.value = false
    }
  }

  if (!stats.value) {
    await fetchStats()
  }

  return { stats, pending, error, refresh: fetchStats }
}

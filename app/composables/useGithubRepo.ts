export interface GithubRepoInfo {
  name: string
  fullName: string
  description: string | null
  stars: number
  forks: number
  language: string | null
  updatedAt: string
  url: string
  pages: boolean
  hostedUrl: string | null
}

// Couleurs officielles GitHub par langage (jeu réduit aux plus courants)
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Vue: "#41b883",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Dockerfile: "#384d54",
}

export function languageColor(lang: string | null): string {
  if (!lang) return "#8b8b8b"
  return LANGUAGE_COLORS[lang] ?? "#8b8b8b"
}

/** Extrait "owner/repo" depuis une URL GitHub ou un slug déjà propre. */
function parseRepoSlug(input: string): string | null {
  const trimmed = input.trim()
  const urlMatch = trimmed.match(/github\.com\/([^/]+)\/([^/#?]+)/i)
  if (urlMatch) {
    return `${urlMatch[1]}/${urlMatch[2].replace(/\.git$/, "")}`
  }
  const slugMatch = trimmed.match(/^([\w.-]+)\/([\w.-]+)$/)
  if (slugMatch) return trimmed
  return null
}

export async function fetchGithubRepo(input: string): Promise<GithubRepoInfo> {
  const slug = parseRepoSlug(input)
  if (!slug) throw new Error("Lien de repo invalide")

  const data = await $fetch<any>(`https://api.github.com/repos/${slug}`)

  return {
    name: data.name,
    fullName: data.full_name,
    description: data.description,
    stars: data.stargazers_count,
    forks: data.forks_count,
    language: data.language,
    updatedAt: data.pushed_at ?? data.updated_at,
    url: data.html_url,
    pages: data.has_pages,
    hostedUrl: data.homepage,
  }
}

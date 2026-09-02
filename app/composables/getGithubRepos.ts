import type { GithubRepoInfo } from "@/composables/useGithubRepo"

export async function fetchAllPublicRepos(username: string): Promise<GithubRepoInfo[]> {
  const data = await $fetch<any[]>(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  )

  return data
    .filter((repo) => !repo.fork) 
    .map((repo) => ({
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      updatedAt: repo.pushed_at ?? repo.updated_at,
      url: repo.html_url,
      pages: repo.has_pages,
      hostedUrl: repo.homepage,
    }))
}
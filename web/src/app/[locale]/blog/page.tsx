import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { blogPosts } from '@/data/blog-posts'
import type { AppLocale } from '@/i18n/routing'
import { Calendar, Clock } from 'lucide-react'

type Props = { params: Promise<{ locale: string }> }

export default async function BlogPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('blog')

  return (
    <div className="bg-surface-muted">
      {/* Header */}
      <div className="border-b border-border-light bg-surface py-12">
        <div className="container-main">
          <span className="inline-block rounded-full bg-brand/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand">
            {t('title')}
          </span>
          <h1 className="mt-3 text-2xl font-bold text-text-primary md:text-3xl">
            {t('title')}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-text-secondary">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Blog posts grid */}
      <div className="container-main py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-xl border border-border-light bg-surface shadow-card transition-all hover:shadow-card-hover"
            >
              {/* Image area */}
              <div className="relative aspect-[16/9] overflow-hidden bg-surface-dark">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white/30">
                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                {/* Tags */}
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="rounded-full bg-surface-subtle px-2.5 py-0.5 text-[10px] font-semibold text-text-tertiary">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-base font-bold leading-snug text-text-primary transition-colors group-hover:text-brand">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta + CTA */}
                <div className="mt-4 flex items-center justify-between border-t border-border-light pt-3">
                  <div className="flex items-center gap-3 text-[11px] text-text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-semibold text-brand transition-colors hover:text-brand-dark"
                  >
                    {t('readMore')} &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

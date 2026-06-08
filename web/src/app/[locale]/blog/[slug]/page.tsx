import { notFound } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { blogPosts, type BlogPost } from '@/data/blog-posts'
import type { AppLocale } from '@/i18n/routing'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'

type Props = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations('blog')

  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <div className="bg-surface-muted">
      {/* Back link */}
      <div className="border-b border-border-light bg-surface">
        <div className="container-main py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('backToBlog')}
          </Link>
        </div>
      </div>

      <article className="container-main py-10">
        <div className="mx-auto max-w-3xl">
          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold leading-tight text-text-primary md:text-3xl lg:text-4xl">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
            <span>{t('by')}</span>
          </div>

          {/* Featured image placeholder */}
          <div className="mt-8 aspect-[21/9] overflow-hidden rounded-xl bg-surface-dark">
            <div className="flex h-full items-center justify-center text-white/20">
              <svg className="h-20 w-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose-custom mt-10"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share / CTA */}
          <div className="mt-12 rounded-xl border border-border-light bg-surface p-6">
            <p className="text-sm font-semibold text-text-primary">{t('recentPosts')}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-lg border border-border-light p-4 transition-all hover:border-brand/30 hover:shadow-card-hover"
                >
                  <p className="text-xs text-text-tertiary">{p.date}</p>
                  <p className="mt-1 text-sm font-semibold text-text-primary transition-colors group-hover:text-brand line-clamp-2">
                    {p.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

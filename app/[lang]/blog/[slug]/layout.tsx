import { type AuthorData, blogAuthors } from '@/config/site';
import { blog } from '@/lib/source';
import { getBlogImage, getPageCategory } from '@/lib/utils/blog-utils';
import type { InferPageType } from 'fumadocs-core/source';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

export default async function BlogLayout({
  params,
  children,
}: {
  params: { lang: string; slug: string };
  children: ReactNode;
}) {
  const page = blog.getPage([params.slug]);
  if (!page) notFound();
  const pageCategory = getPageCategory(page);

  return (
    <main
      className="mx-auto w-full max-w-[900px] py-10 sm:py-20"
      itemType="http://schema.org/Article"
      itemScope
    >
      <div className="mb-10 overflow-hidden rounded-2xl bg-gradient-to-b from-primary/10 to-background ">
        <div className="relative h-[250px] w-full">
          <div className="absolute bottom-4 right-4 z-10 flex flex-col flex-wrap items-end gap-2 sm:flex-row sm:items-center">
            <span className="rounded-full bg-white/50 px-3 py-1 text-xs font-medium text-black backdrop-blur-sm">
              <Link href={`./category/${encodeURIComponent(pageCategory)}`}>
                {pageCategory.toUpperCase()}
              </Link>
            </span>
            <span className="rounded-full bg-white/50 px-3 py-1 text-xs text-black backdrop-blur-sm">
              {new Date(page.data.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          <Image
            src={getBlogImage(encodeURI(page.data.title))}
            alt={page.data.title}
            fill
            className="object-cover"
            priority
            itemProp="image"
          />
        </div>
        <div className="px-8 py-6">
          <h1
            className="mb-4 text-4xl font-bold tracking-tight text-foreground"
            itemProp="name"
          >
            {page.data.title}
          </h1>

          {page.data.description && (
            <p
              className="mb-6 text-lg text-muted-foreground"
              itemProp="description"
            >
              {page.data.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 border-t border-border pt-4">
            <div className="flex -space-x-2">
              {page.data.authors.map((author, i) => (
                <div
                  key={i}
                  className="z-[1] hover:z-10"
                  style={{ zIndex: page.data.authors.length - i }}
                >
                  <AuthorAvatar author={blogAuthors[author]} />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-1">
                {page.data.authors.map((author, i) => (
                  <Fragment key={i}>
                    {i !== 0 && (
                      <span className="text-muted-foreground">&</span>
                    )}
                    <span className="font-medium">
                      {blogAuthors[author].name}
                    </span>
                  </Fragment>
                ))}
              </div>
              {page.data.authors.length === 1 && (
                <span className="text-sm text-muted-foreground">
                  {blogAuthors[page.data.authors[0]].title}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="blog-content -mt-4 w-full border-t pt-8">{children}</div>
      <Footer page={page} />
    </main>
  );
}

function AuthorAvatar({ author }: { author: AuthorData }) {
  return (
    <Link
      href={author.url ?? '#'}
      rel="nofollow noreferrer"
      target="_blank"
      itemProp="author"
      className="inline-block"
    >
      {author.image_url != null ? (
        <Image
          alt={`Avatar of ${author.name}`}
          src={author.image_url}
          width={40}
          height={40}
          className="rounded-full border-2 border-background"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
          {author.name.charAt(0)}
        </div>
      )}
    </Link>
  );
}

function SmallAuthor({ author }: { author: AuthorData }) {
  return (
    <Link
      className="flex flex-row items-center gap-1.5 text-foreground"
      href={author.url ?? '#'}
      rel="nofollow noreferrer"
      target="_blank"
      itemProp="author"
    >
      {author.image_url != null && (
        <Image
          alt="avatar"
          src={author.image_url}
          width={25}
          height={25}
          className="h-full rounded-full"
        />
      )}
      {author.name}
    </Link>
  );
}

function Footer({ page }: { page: InferPageType<typeof blog> }) {
  return (
    <div className="mt-[5rem] flex flex-col gap-6">
      {page.data.authors
        .map((author) => blogAuthors[author])
        .map((author, i) => (
          <Link
            key={i}
            className="flex flex-row gap-2 rounded-xl bg-card p-4 text-card-foreground"
            href={author.url ?? '#'}
            target="_blank"
            rel="nofollow noreferrer"
          >
            {author.image_url != null && (
              <Image
                itemProp="image"
                alt="avatar"
                src={author.image_url}
                width={40}
                height={40}
                className="h-full rounded-full"
              />
            )}
            <div>
              <p itemProp="name" className="font-medium">
                {author.name}
              </p>
              <p itemProp="jobTitle" className="text-sm text-muted-foreground">
                {author.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}

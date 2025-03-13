import { generateBlogMetadata } from '@/lib/utils/metadata';
import BlogItem from './components/BlogItem';
import BlogHeader from './components/BlogHeader';
import {
  getCategories,
  getAllTags,
  getSortedBlogPosts,
} from '@/lib/utils/blog-utils';
import BlogGrid from './components/BlogGrid';

interface BlogIndexProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BlogIndex({ searchParams }: BlogIndexProps) {
  const categories = await getCategories();
  const tags = await getAllTags();

  // Extract tags from URL search params
  const selectedTags = searchParams.tag
    ? Array.isArray(searchParams.tag)
      ? searchParams.tag
      : [searchParams.tag]
    : [];

  // Pass selected tags to filter posts
  const posts = getSortedBlogPosts({ tags: selectedTags });

  return (
    <main className="flex flex-1 flex-col pb-20">
      <BlogHeader
        title="Blog"
        description="Sharing our technical insights, product updates and industry news"
        categories={categories}
        tags={tags}
      />

      <BlogGrid posts={posts} />
    </main>
  );
}

export const generateMetadata = generateBlogMetadata;

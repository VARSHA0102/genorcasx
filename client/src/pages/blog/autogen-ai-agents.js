import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';

export default function BlogPage({ content, title }) {
  return (
    <div className="blog-container">
      <h1>{title}</h1>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

// Load Markdown content at build time
export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'blogs', `${params.slug}.md`);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Optional: generate a readable title from slug
  const title = params.slug.replace(/-/g, ' ');

  return { props: { content, title } };
}

// Generate paths for all blogs
export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), 'blogs'));
  const paths = files.map(file => ({
    params: { slug: file.replace('.md', '') },
  }));

  return { paths, fallback: false };
}

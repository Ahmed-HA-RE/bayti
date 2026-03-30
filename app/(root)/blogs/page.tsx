import BlogsListSection from '@/components/blogs-list-section';
import SectionHeader from '@/components/shared/section-header';
import { APP_NAME } from '@/lib/constants';

export const metadata = {
  title: 'Blogs',
  description: `Browse ${APP_NAME} Blogs for real estate insights, home buying tips, rental guides, investment advice, and property market updates.`,
};

const BlogsPage = async () => {
  return (
    <>
      <SectionHeader
        eyebrowTitle={`${APP_NAME} Insights`}
        title='Trusted Knowledge for Smarter Property Decisions'
        subtitle={`Explore our latest blogs, market insights and home-buying guides from the ${APP_NAME} team.`}
      />
      <BlogsListSection />
    </>
  );
};

export default BlogsPage;

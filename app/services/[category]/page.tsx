import { notFound } from 'next/navigation';
import { serviceCategories } from '@/lib/services/data/categories';
import { ServiceList } from '@/components/services/service-list';

// Import the correct types from Next.js
import { Metadata } from 'next';

// Update the props type to match Next.js requirements
interface PageProps {
  params: {
    category: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateStaticParams() {
  return serviceCategories.map((category) => ({
    category: category.id,
  }));
}

// Update the component signature
export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const categoryData = serviceCategories.find((cat) => cat.id === params.category);

  if (!categoryData) {
    notFound();
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="heading-lg mb-8">
        <span className="gold-gradient">{categoryData.name}</span>
      </h1>
      <p className="body-text mb-12 text-gray-300">{categoryData.description}</p>
      <ServiceList services={categoryData.services} />
    </div>
  );
}

// Optionally, you can also add metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = serviceCategories.find((cat) => cat.id === params.category);
  
  return {
    title: category ? `${category.name} | Your Salon Name` : 'Category Not Found',
    description: category?.description || 'Service category page',
  };
}
import { notFound } from 'next/navigation';
import { serviceCategories } from '@/lib/services/data/categories';
import { ServiceList } from '@/components/services/service-list';

// Define the correct type for the params
type CategoryPageProps = {
  params: {
    category: string;
  };
};

export async function generateStaticParams() {
  return serviceCategories.map((category) => ({
    category: category.id,
  }));
}

// Add the type to the component
export default async function CategoryPage({
  params: { category },
}: CategoryPageProps) {
  const categoryData = serviceCategories.find((cat) => cat.id === category);

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
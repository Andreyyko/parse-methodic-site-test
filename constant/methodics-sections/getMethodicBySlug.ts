import { mockMethodics } from "@/constant/methodics-sections/methodics-sections";

export async function getMethodicBySlug(slug: string) {
  for (const section of mockMethodics) {
    const method = section.methods.find((m) => m.slug === slug);
    if (method) {
      return {
        ...method,
        category: section.category,
        sectionTitle: section.title,
        heroImage: section.heroImage,
      };
    }
  }
  return null;
}

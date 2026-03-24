import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { defineCollection } from 'astro:content';

// We probably won't need to edit this file
//   -boneskull

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};

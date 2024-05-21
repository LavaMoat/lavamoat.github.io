import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'LavaMoat',
      social: {
        github: 'https://github.com/LavaMoat/LavaMoat',
      },
      sidebar: [
        {
          label: 'Guides',
          autogenerate: { directory: 'guide' },
        },
        // note: using autogenerate means you cannot control the order of the items
        {
          label: 'Tutorials',
          autogenerate: { directory: 'tutorial' },
        },
        {
          label: 'Understanding LavaMoat',
          autogenerate: { directory: 'about' },
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
});

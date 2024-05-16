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
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Getting Started', link: '/guide/getting-started/' },
          ],
        },
        // note: using autogenerate means you cannot control the order of the items
        {
          label: 'Tutorials',
          autogenerate: { directory: 'tutorials' },
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

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
        // to change the order of items, use the sidebar.order prop
        // of the frontmatter in the .md file
        {
          label: 'Guides',
          items: [
            { label: 'Getting Started', link: '/guide/getting-started/' },
            {
              label: 'allow-scripts',
              link: '/guide/allow-scripts/',
            },
            {
              label: 'lavamoat node runtime',
              link: '/guide/lavamoat-node',
            },
            {
              label: 'lavamoat and webpack',
              link: '/guide/webpack',
            },
            { label: 'Policy File Explained', link: '/guide/policy' },
            {
              label: 'Troubleshooting Common Problems',
              link: '/guide/troubleshooting',
            },
          ],
        },
        // {
        //   label: 'Tutorials',
        //   autogenerate: { directory: 'tutorial' },
        // },
        {
          label: 'Understanding LavaMoat',
          autogenerate: { directory: 'about' },
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
        {
          label: 'For Contributors',
          autogenerate: { directory: 'contributor' },
        },
      ],
      customCss: [
        '@fontsource/radio-canada/400.css',
        '@fontsource/radio-canada/400-italic.css',
        '@fontsource/radio-canada/600.css',
        './src/styles/custom.css',
      ],
    }),
  ],
});

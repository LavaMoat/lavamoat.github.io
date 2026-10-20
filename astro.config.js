import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'LavaMoat',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/LavaMoat/LavaMoat',
        },
      ],
      sidebar: [
        // to change the order of items, use the sidebar.order prop
        // of the frontmatter in the .md file
        {
          label: 'Guides',
          items: [
            { label: 'Getting Started', link: '/guides/getting-started/' },
            {
              label: 'Harden Your Project',
              link: '/guides/harden/',
            },
            {
              label: 'LavaMoat for Node.js',
              link: '/guides/lavamoat-node',
            },
            {
              label: 'LavaMoat with Webpack',
              link: '/guides/webpack',
            },
            { label: 'Policy Files', link: '/guides/policy' },
            { label: 'Reviewing Policy', link: '/guides/policy-diff' },
            {
              label: 'Troubleshooting',
              link: '/guides/troubleshooting',
            },
            {
              label: 'Hardening the Dev Environment',
              link: '/guides/hardening-dev',
            },
            {
              label: 'Legacy Guides',
              link: '/guides/legacy',
            },
          ],
        },
        // {
        //   label: 'Tutorials',
        //   autogenerate: { directory: 'tutorial' },
        // },
        {
          label: 'Understanding LavaMoat',
          items: [{ autogenerate: { directory: 'about' } }],
        },
        {
          label: 'Reference',
          items: [{ autogenerate: { directory: 'reference' } }],
        },
        {
          label: 'For Contributors',
          items: [{ autogenerate: { directory: 'contributor' } }],
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

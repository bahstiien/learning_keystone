//keystone.ts
import { list, config } from '@keystone-6/core';
import { password, text, timestamp, select, relationship } from '@keystone-6/core/fields';
import { withAuth, session } from './auth';

const lists = {
  User: list({
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      posts: relationship({ ref: 'Post.author', many: true }),
      DivingManager: relationship({ ref: 'DivingCenter.Manager', many: true }),
      password: password({ validation: { isRequired: true } })

    },
  }),
  Post: list({
    fields: {
      title: text(),
      slug: text({ isIndexed: 'unique', isFilterable: true }),
      publishedAt: timestamp(),
      status: select({
        options: [
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
        ],
        defaultValue: 'draft',
        ui: { displayMode: 'segmented-control' },
      }),
      author: relationship({ ref: 'User.posts' }),
    },
  }),
    DivingCenter: list({
    fields: {
      title: text(),
      slug: text({ isIndexed: 'unique', isFilterable: true }),
      publishedAt: timestamp(),
      status: select({
        options: [
          { label: 'Open', value: 'open' },
          { label: 'Close', value: 'close' },
        ],
        defaultValue: 'open',
        ui: { displayMode: 'segmented-control' },
      }),
      Manager: relationship({ ref: 'User.DivingManager' }),
    },
  }),
};

export default config(
    withAuth({
      db: {
        provider: 'sqlite',
        url: 'file:./keystone.db',
      },
      lists,
      session,
      ui: {
        isAccessAllowed: (context) => !!context.session?.data,
      },
  })
);
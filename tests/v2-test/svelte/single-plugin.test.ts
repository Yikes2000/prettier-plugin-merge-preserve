import { format } from 'prettier';
import type { Fixture } from 'test-settings';
import { baseOptions } from 'test-settings';
import { describe, expect, test } from 'vitest';

// eslint-disable-next-line import/no-extraneous-dependencies
import * as thisPlugin from '@/packages/v2-plugin';

const options = {
  ...baseOptions,
  parser: 'svelte',
};

const fixtures: Fixture[] = [
  {
    name: 'svelte plugin (1) - standalone use',
    input: `
<script>
function getDate() {
    return new Date();
}

const now = getDate();
</script>

<div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <span>Now: {now}</span>
</div>
`,
    output: `<script>
  function getDate() {
    return new Date();
  }

  const now = getDate();
</script>

<div
  class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl"
>
  <span>Now: {now}</span>
</div>
`,
    options: {
      plugins: ['prettier-plugin-svelte'],
    },
  },
  {
    name: 'svelte plugin (2) - a combination of a single plugin and a merge plugin also has no effect',
    input: `
<script>
function getDate() {
    return new Date();
}

const now = getDate();
</script>

<div class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl">
    <span>Now: {now}</span>
</div>
`,
    output: `<script>
  function getDate() {
    return new Date();
  }

  const now = getDate();
</script>

<div
  class="bg-gray-100/50 border border-zinc-400/30 dark:bg-neutral-900/50 dark:border-neutral-500/30 px-4 py-4 rounded-xl"
>
  <span>Now: {now}</span>
</div>
`,
    options: {
      plugins: ['prettier-plugin-svelte', thisPlugin],
    },
  },
];

describe('svelte/single-plugin', () => {
  for (const fixture of fixtures) {
    test(fixture.name, () => {
      expect(
        format(fixture.input, {
          ...options,
          ...(fixture.options ?? {}),
        }),
      ).toBe(fixture.output);
    });
  }
});

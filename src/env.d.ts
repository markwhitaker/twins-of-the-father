/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module '@pagefind/default-ui' {
  interface PagefindUIOptions {
    element: string;
    showSubResults?: boolean;
    autofocus?: boolean;
  }
  export class PagefindUI {
    constructor(options: PagefindUIOptions);
    triggerSearch(query: string): void;
  }
}

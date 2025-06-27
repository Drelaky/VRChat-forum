import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private readonly themeKey = 'theme';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey);

    if (!savedTheme) {
      localStorage.setItem(this.themeKey, 'dark');
    }

    if (savedTheme === 'dark') {
      this.renderer.addClass(document.body, 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
    }
  }

  toggleTheme(): void {
    const isDark = document.body.classList.contains('dark');

    if (isDark) {
      this.renderer.removeClass(document.body, 'dark');
      localStorage.setItem(this.themeKey, 'light');
    } else {
      this.renderer.addClass(document.body, 'dark');
      localStorage.setItem(this.themeKey, 'dark');
    }
  }

  get currentTheme(): 'light' | 'dark' {
    return document.body.classList.contains('dark') ? 'dark' : 'light';
  }
}

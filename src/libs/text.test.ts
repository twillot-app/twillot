import { escapeHtml, escapeRegExp, highlight, linkify, highlightAndLinkify } from './text';

describe('Text Utilities', () => {
  it('should escape HTML', () => {
    const unsafe = '<div>Test</div>';
    const safe = escapeHtml(unsafe);
    expect(safe).toBe('&lt;div&gt;Test&lt;/div&gt;');
  });

  it('should escape RegExp special characters', () => {
    const string = '.*+?^${}()|[]\\';
    const escaped = escapeRegExp(string);
    expect(escaped).toBe('\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\');
  });

  it('should highlight text', () => {
    const html = 'This is a test';
    const reg = /test/;
    const highlighted = highlight(html, reg);
    expect(highlighted).toBe('This is a <mark>test</mark>');
  });

  it('should linkify text', () => {
    const text = 'Check this out: https://example.com';
    const linkified = linkify(text);
    expect(linkified).toContain('<a href="https://example.com"');
  });

  it('should highlight and linkify text', () => {
    const text = 'Check this out: https://example.com';
    const keywordReg = /example/;
    const result = highlightAndLinkify(text, keywordReg);
    expect(result).toContain('<mark>example</mark>');
    expect(result).toContain('<a href="https://example.com"');
  });
});

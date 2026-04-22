import {
  crowdToMeta,
  escapeHTML,
  projectTypeLabel,
  projectTypeToMeta,
  venueLabel,
} from '../utils/helpers.js';

export function renderCrowdBadge(crowdLevel) {
  const meta = crowdToMeta(crowdLevel);
  return `<span class="badge badge--${meta.tone}">${escapeHTML(meta.jpLabel)}</span>`;
}

export function renderTag(text, tone = 'neutral') {
  return `<span class="tag tag--${tone}">${escapeHTML(text)}</span>`;
}

export function renderProjectTypeTag(projectType) {
  const meta = projectTypeToMeta(projectType);
  return renderTag(projectTypeLabel(projectType), meta.tone);
}

export function renderVenueTag(areaType) {
  return renderTag(venueLabel(areaType), areaType === 'outdoor' ? 'outdoor' : 'indoor');
}

export function renderSectionHeader(title, subtitle = '') {
  return `
    <div class="section-header">
      <div>
        <h2>${escapeHTML(title)}</h2>
        ${subtitle ? `<p>${escapeHTML(subtitle)}</p>` : ''}
      </div>
    </div>
  `;
}

export function renderStatCard(label, value, note = '') {
  return `
    <article class="stat-card">
      <span class="stat-card__label">${escapeHTML(label)}</span>
      <strong class="stat-card__value">${escapeHTML(value)}</strong>
      ${note ? `<span class="stat-card__note">${escapeHTML(note)}</span>` : ''}
    </article>
  `;
}






function renderPictogramIcon(icon) {
  // すべてのアイコンに共通のスタイル（線の太さや色）
  // stroke-width="2" にして、Impactフォントに負けない強さにしています
  const common = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="quick-link__svg"';

  const icons = {
    // 1. マップ（地図・ピン）
    map: `<svg ${common}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,

    // 2. 企画（リスト・虫眼鏡）
    projects: `<svg ${common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,

    // 3. ステージ公演（マイク・波形）
    stage: `<svg ${common}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`,

    // 4. 飲食（カトラリー・フォーク＆ナイフ）
    food: `<svg ${common}><path d="M18 8A6 6 0 0 0 6 8c0 7 6 13 6 13s6-6 6-13z"></path><line x1="12" y1="22" x2="12" y2="8"></line><path d="M9 6H8v4h1Z"></path><path d="M16 6h-1v4h1Z"></path><path d="M12 6h0"></path></svg>`,
    // もし上の「飲食」がピンっぽすぎるなら、こっちの「フォーク＆ナイフ」に差し替えてください
    // food: `<svg ${common}><path d="M18 20l-4-4"></path><path d="M20 18l-4-4"></path><path d="M12 14l1.5-1.5a3 3 0 1 0-4.24-4.24L8 9.76a2 2 0 0 0 0 2.83L11 15"></path><path d="M22 22l-2-2"></path><path d="M4 4l.46 2.67a1.86 1.86 0 0 0 2.89 1.44l1.24-.85a1.86 1.86 0 0 0 .61-2l-.47-2.67M4 4h7"></path></svg>`,

    // 5. お気に入り（星・スター）
    favorite: `<svg ${common}><defs><linearGradient id="starGradient" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stop-color="#ffeb3b"/><stop offset="100%" stop-color="#f44336"/></linearGradient></defs><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="url(#starGradient)"></path></svg>`,
  };

  if (icons[icon]) {
    // 修正：元のコードではここで path だけ返していましたが、
    // 呼び出し元が ${icons[icon]} を SVGタグの中にいれる前提でないなら、SVGタグごと返す必要があります。
    // 元の renderPictogramIcon の実装に合わせて調整してください。
    return icons[icon]; 
  }

  return `<span class="quick-link__letter">${escapeHTML(icon)}</span>`;
}




export function renderQuickLink(label, route, hint, icon) {
    // もともとあったイラスト（icon）を <img> タグとして生成する
    // class="quick-link__img" を付与してCSSで制御できるようにします
    const iconHTML = icon
        ? `<img src="${escapeHTML(icon)}" alt="" class="quick-link__img" />`
        : `<span class="quick-link__initial">${escapeHTML(label.slice(0, 1))}</span>`;

    return `
    <button class="quick-link" data-route="${escapeHTML(route)}">
      <span class="quick-link__icon" aria-hidden="true">
        ${iconHTML}
      </span>
      <span class="quick-link__body">
        <strong class="quick-link__label">
          ${escapeHTML(label)}
        </strong>
        <span class="quick-link__hint">
          ${escapeHTML(hint)}
        </span>
      </span>
    </button>
  `;
}

export function renderMetaRow(label, value) {
  return `
    <div class="meta-row">
      <span class="meta-row__label">${escapeHTML(label)}</span>
      <span class="meta-row__value">${escapeHTML(value)}</span>
    </div>
  `;
}

export function renderEmptyState(title, description, route = '/projects', buttonLabel = '企画一覧へ') {
  return `
    <section class="empty-state">
      <div class="empty-state__icon">○</div>
      <h3>${escapeHTML(title)}</h3>
      <p>${escapeHTML(description)}</p>
      <button class="primary-button" data-route="${escapeHTML(route)}">${escapeHTML(buttonLabel)}</button>
    </section>
  `;
}

export function renderImagePlaceholder(label, aspect = 'square') {
  return `
    <div class="image-placeholder image-placeholder--${escapeHTML(aspect)}" aria-hidden="true">
      <span>${escapeHTML(label)}</span>
    </div>
  `;
}




export function renderMediaFrame({ imageUrl = '', alt = '', label = '画像', aspect = 'square' } = {}) {
  if (imageUrl) {
    return `
      <div class="media-frame media-frame--${escapeHTML(aspect)}">
        <img class="media-frame__image" src="${escapeHTML(imageUrl)}" alt="${escapeHTML(alt || label)}" loading="lazy" />
      </div>
    `;
  }

  return `
    <div class="media-frame media-frame--${escapeHTML(aspect)}">
      ${renderImagePlaceholder(label, aspect)}
    </div>
  `;
}

export function renderThemeIllustration(theme = {}) {
  const normalized = typeof theme === 'string'
    ? { label: theme }
    : {
      imageUrl: theme.imageUrl || '',
      alt: theme.alt || theme.title || theme.placeholderLabel || '今年のテーマイラスト',
      label: theme.placeholderLabel || theme.title || '今年のテーマイラスト',
    };

  if (normalized.imageUrl) {
    return `
      <div class="theme-art theme-art--poster theme-art--media" role="img" aria-label="${escapeHTML(normalized.alt)}">
        <img class="theme-art__image" src="${escapeHTML(normalized.imageUrl)}" alt="${escapeHTML(normalized.alt)}" loading="eager" />
      </div>
    `;
  }

  return `
    <svg class="theme-art theme-art--poster" viewBox="0 0 720 1018.2337649" role="img" aria-label="${escapeHTML(normalized.label)}">
      <defs>
        <linearGradient id="posterBg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#f7fbff" />
        </linearGradient>
        <linearGradient id="posterBlue" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#2563eb" />
          <stop offset="100%" stop-color="#1d4ed8" />
        </linearGradient>
        <linearGradient id="posterRose" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stop-color="#f43f5e" />
          <stop offset="100%" stop-color="#fb7185" />
        </linearGradient>
        <linearGradient id="posterAmber" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#fbbf24" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="720" height="1018.2337649" rx="40" fill="url(#posterBg)" />
      <circle cx="584" cy="138" r="92" fill="#dbeafe" />
      <circle cx="146" cy="862" r="112" fill="#ffe4ec" />
      <circle cx="628" cy="782" r="66" fill="#fef3c7" opacity="0.8" />
      <path d="M86 246C176 170 264 136 360 136C476 136 562 176 654 268L654 318C572 238 476 206 360 206C252 206 170 236 86 300Z" fill="url(#posterBlue)" opacity="0.1" />
      <path d="M68 660C158 580 244 548 344 548C458 548 540 582 646 676L646 730C556 646 460 616 346 616C242 616 164 642 68 716Z" fill="url(#posterRose)" opacity="0.1" />

      <g transform="translate(92 88)">
        <rect x="0" y="0" width="198" height="40" rx="20" fill="#eff6ff" />
        <text x="99" y="26" fill="#1d4ed8" font-size="16" font-weight="800" text-anchor="middle">SFC FESTIVAL THEME</text>
      </g>

      <g transform="translate(90 188)">
        <rect x="0" y="0" width="540" height="564" rx="42" fill="#ffffff" stroke="#e8eef8" stroke-width="2" />
        <path d="M56 370C126 288 206 246 274 246C360 246 430 292 488 376" fill="none" stroke="#0f172a" stroke-width="12" stroke-linecap="round" />
        <path d="M118 396V504" stroke="#0f172a" stroke-width="10" stroke-linecap="round" />
        <path d="M272 270V560" stroke="#0f172a" stroke-width="10" stroke-linecap="round" />
        <path d="M424 396V504" stroke="#0f172a" stroke-width="10" stroke-linecap="round" />
        <rect x="84" y="488" width="68" height="122" rx="24" fill="url(#posterBlue)" />
        <rect x="238" y="456" width="68" height="154" rx="24" fill="url(#posterAmber)" />
        <rect x="392" y="488" width="68" height="122" rx="24" fill="url(#posterRose)" />
        <circle cx="118" cy="504" r="11" fill="#ffffff" opacity="0.96" />
        <circle cx="272" cy="470" r="11" fill="#ffffff" opacity="0.96" />
        <circle cx="426" cy="504" r="11" fill="#ffffff" opacity="0.96" />

        <g opacity="0.92">
          <rect x="56" y="66" width="428" height="132" rx="28" fill="#f8fbff" />
          <text x="82" y="116" fill="#0f172a" font-size="20" font-weight="800">今年のテーマイラスト</text>
          <text x="82" y="152" fill="#64748b" font-size="16">この縦型ビジュアルを、その年のキービジュアルへ差し替える前提です</text>
        </g>
      </g>

      <g transform="translate(88 798)">
        <text x="0" y="0" fill="#0f172a" font-size="34" font-weight="800">${escapeHTML(normalized.label)}</text>
        <text x="0" y="42" fill="#64748b" font-size="17">ホームの先頭で見せるための 1:√2 縦型プレースホルダー</text>
      </g>

      <g transform="translate(90 892)">
        <rect x="0" y="0" width="540" height="74" rx="24" fill="#f8fbff" stroke="#e6eefb" />
        <circle cx="44" cy="37" r="10" fill="url(#posterBlue)" />
        <circle cx="78" cy="37" r="10" fill="url(#posterRose)" />
        <circle cx="112" cy="37" r="10" fill="url(#posterAmber)" />
        <text x="146" y="43" fill="#334155" font-size="16">Festival poster / annual key visual placeholder</text>
      </g>
    </svg>
  `;
}

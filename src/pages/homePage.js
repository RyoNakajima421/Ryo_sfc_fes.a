import { festivalTheme } from '../data/mockData.js';
import { renderQuickLink, renderThemeIllustration } from '../components/ui.js';

export const homePage = {
  render(context) {
    return `


      <section class="quick-grid quick-grid--home">
        ${ renderQuickLink('マップ', '/map', '地図から等aaaaaaaaaの検索が可能です。', "assets/img/map.png")}
        ${renderQuickLink('企画', '/projects', '全ての企画から絞り込み検索が可能です。', "assets/img/kanransya.png")}
        ${renderQuickLink('ステージ公演', '/stage', '公演の時間と場所の確認をすることができます。', "assets/img/schedule.png")}
        ${renderQuickLink('飲食', '/food', 'おいしい。', "assets/img/restourant.png")}
        ${renderQuickLink('お気に入り', '/favorites', '保存した企画', "assets/img/heart.png")}
      </section>
    `;
  },

  bind() {},
};

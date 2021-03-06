
import elementsConstructor from '../../js/utils/elementsConstructor';
import mainPageLink from '../../js/constants/mainPageLink';
import { githubLink } from '../../js/constants/about';
import BaseComponent from '../../js/components/BaseComponent';

const githubIconSvg = require('../../images/footer__icon-github.svg').default;
const githubIconPng = require('../../images/footer__icon-github.png').default;

export default class Footer extends BaseComponent {
  _createDomElement() {
    const domElement = elementsConstructor('div', ['width-corrector', 'footer__container'], [
      elementsConstructor('div', 'footer__element', [
        elementsConstructor('p', 'footer__copyright', '\u00A9 News-Explorer24.ru, Powered by News API'),
      ]),
      elementsConstructor('div', 'footer__element', [
        elementsConstructor('a', ['footer__link', 'footer__link_main'], 'Главная', { name: 'href', value: mainPageLink }),
        elementsConstructor('a', 'footer__link', 'Яндекс.Практикум', [
          { name: 'href', value: 'https://praktikum.yandex.ru/' },
          { name: 'target', value: '_blank' },
        ]),
      ]),
      elementsConstructor('div', 'footer__element', [
        elementsConstructor('a', ['footer__link', 'footer__link-icon'], [
          elementsConstructor('picture', 'footer__picture', [
            elementsConstructor('source', 'footer__picture_source', '', { name: 'srcset', value: `${mainPageLink}${githubIconSvg}` }),
            elementsConstructor('img', 'footer__icon', '', [
              { name: 'title', value: 'Ссылка на GitHub' },
              { name: 'alt', value: 'Ссылка на GitHub' },
              { name: 'src', value: `${mainPageLink}${githubIconPng}` },
            ]),
          ]),
        ], [
          { name: 'href', value: githubLink },
          { name: 'target', value: '_blank' },
        ]),
      ]),
    ]);
    return domElement;
  }

  getWhite() {
    this.style = 'У данного элемента нет стиля, но будет в будущем';
  }
}

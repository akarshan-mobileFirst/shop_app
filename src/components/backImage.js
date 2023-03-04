import {Texts} from '../utils/constants';

function backImage(category) {
  switch (category) {
    case Texts.artWorks:
      return 'https://www.clipartmax.com/png/middle/109-1097604_computer-icons-painting-artist-painter-drawing-painter-icon.png';
    case Texts.beer:
      return 'https://png.pngtree.com/png-vector/20191004/ourlarge/pngtree-beer-icon-png-image_1791305.jpg';
    case Texts.books:
      return 'https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010__340.jpg';
    case Texts.makeup:
      return 'https://cdn.britannica.com/35/222035-050-C68AD682/makeup-cosmetics.jpg';
    default:
      return '';
  }
}

export default backImage;

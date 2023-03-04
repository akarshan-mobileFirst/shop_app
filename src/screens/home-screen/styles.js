import {Colors} from '../../utils/colors';
import {FontSize} from '../../utils/fontsize';

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: FontSize.xSmall,
    color: Colors.blue,
    fontSize: FontSize.mediumLarge,
    fontWeight: 'bold',
  },
  scrollView: {flex: 1, margin: FontSize.xSmall},
  categoryText: {
    color: Colors.blue,
    fontSize: FontSize.large,
    fontWeight: 'bold',
    opacity: 0.7,
  },
  itemTileContainer: {
    flexDirection: 'row',
    paddingHorizontal: FontSize.xSmall,
    paddingVertical: FontSize.base,
    alignItems: 'center',
  },
  itemTileImage: {
    height: FontSize.massiveBig + 5,
    width: FontSize.massiveBig + 5,
    borderRadius: 5.5,
  },
  itemTileTextWrapper: {
    marginHorizontal: FontSize.small,
    flex: 1,
  },
  itemTileTitle: {
    color: Colors.black,
    fontSize: FontSize.base,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  itemTileDescription: {
    color: Colors.black,
    fontSize: FontSize.small,
    textAlign: 'justify',
  },
};

export default styles;
